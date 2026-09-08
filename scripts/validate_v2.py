#!/usr/bin/env python3
"""Validate the standalone Well and Good V2 static site."""

from __future__ import annotations

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1] / "site-v2"
SITE_ORIGIN = "https://wellandgoodwebsites.ca"
ALLOWED_PRICE_PAGES = {
    "services/websites/index.html",
    "affordable-website-design/index.html",
    "one-page-websites/index.html",
    "web-design-niagara/index.html",
}
REQUIRED_FILES = ("styles.css", "site.js", "robots.txt", "llms.txt")
NOINDEX_PAGES = {"thank-you/index.html", "404.html"}
FORBIDDEN_WORDS = {
    "seamless",
    "elevate",
    "unlock",
    "transform",
    "supercharge",
    "revolutionary",
    "game-changing",
    "cutting-edge",
    "next-gen",
    "unleash",
    "leverage",
    "delve",
    "tapestry",
}
PLACEHOLDERS = {"lorem ipsum", "todo", "tbd", "coming soon", "placeholder"}
VIRTUAL_PATHS = {"/_vercel/insights/script.js"}


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.title_parts: list[str] = []
        self.visible_parts: list[str] = []
        self.links: list[str] = []
        self.images: list[dict[str, str]] = []
        self.metas: list[dict[str, str]] = []
        self.links_meta: list[dict[str, str]] = []
        self.scripts: list[str] = []
        self.jsonld: list[str] = []
        self.labels_for: set[str] = set()
        self.control_ids: set[str] = set()
        self.ids: list[str] = []
        self.forms: list[dict[str, str]] = []
        self.inputs: list[dict[str, str]] = []
        self.h1_count = 0
        self.lang = ""
        self._in_title = False
        self._in_script = False
        self._script_type = ""
        self._hidden_depth = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = {key: value or "" for key, value in attrs}
        if attr_map.get("id"):
            self.ids.append(attr_map["id"])
        if tag == "form":
            self.forms.append(attr_map)
        if tag == "input":
            self.inputs.append(attr_map)
        if tag == "html":
            self.lang = attr_map.get("lang", "")
        elif tag == "title":
            self._in_title = True
        elif tag == "script":
            self._in_script = True
            self._script_type = attr_map.get("type", "")
            if attr_map.get("src"):
                self.scripts.append(attr_map["src"])
        elif tag == "h1":
            self.h1_count += 1
        elif tag == "a" and attr_map.get("href"):
            self.links.append(attr_map["href"])
        elif tag == "img":
            self.images.append(attr_map)
        elif tag == "meta":
            self.metas.append(attr_map)
        elif tag == "link":
            self.links_meta.append(attr_map)
        elif tag == "label" and attr_map.get("for"):
            self.labels_for.add(attr_map["for"])
        elif tag in {"input", "select", "textarea"} and attr_map.get("id"):
            if attr_map.get("type") != "hidden":
                self.control_ids.add(attr_map["id"])
        if tag in {"style", "template"} or "hidden" in attr_map:
            self._hidden_depth += 1

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)
        if tag in {"style", "template"}:
            self._hidden_depth = max(0, self._hidden_depth - 1)

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self._in_title = False
        elif tag == "script":
            self._in_script = False
            self._script_type = ""
        elif tag in {"style", "template"} and self._hidden_depth:
            self._hidden_depth -= 1

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self.title_parts.append(data)
        if self._in_script:
            if self._script_type == "application/ld+json":
                self.jsonld.append(data)
            return
        if not self._hidden_depth and data.strip():
            self.visible_parts.append(data)

    @property
    def title(self) -> str:
        return " ".join(" ".join(self.title_parts).split())

    @property
    def visible_text(self) -> str:
        return " ".join(" ".join(self.visible_parts).split())


def route_for_file(path: Path) -> str:
    rel = path.relative_to(ROOT)
    if rel.name == "404.html":
        return "/404.html"
    if rel.name == "index.html":
        parent = rel.parent.as_posix()
        return "/" if parent == "." else f"/{parent}/"
    return f"/{rel.as_posix()}"


def destination_for_href(source: Path, href: str) -> Path | None:
    parsed = urlparse(href)
    if parsed.scheme or parsed.netloc or href.startswith(("mailto:", "tel:", "#")):
        return None
    path = unquote(parsed.path)
    if not path or path in VIRTUAL_PATHS:
        return None
    if path.startswith("/"):
        candidate = ROOT / path.lstrip("/")
    else:
        candidate = source.parent / path
    if candidate.suffix:
        return candidate.resolve()
    return (candidate / "index.html").resolve()


def meta_value(parser: PageParser, *, name: str = "", prop: str = "") -> str:
    for meta in parser.metas:
        if name and meta.get("name", "").lower() == name.lower():
            return meta.get("content", "")
        if prop and meta.get("property", "").lower() == prop.lower():
            return meta.get("content", "")
    return ""


def canonical_value(parser: PageParser) -> str:
    for link in parser.links_meta:
        if link.get("rel", "").lower() == "canonical":
            return link.get("href", "")
    return ""


def validate_page(path: Path) -> list[str]:
    errors: list[str] = []
    rel = path.relative_to(ROOT).as_posix()
    text = path.read_text(encoding="utf-8")
    parser = PageParser()
    try:
        parser.feed(text)
    except Exception as exc:
        return [f"{rel}: HTML parser failed: {exc}"]

    if parser.lang.lower() != "en":
        errors.append(f"{rel}: missing html lang=en")
    if not parser.title:
        errors.append(f"{rel}: missing title")
    if not meta_value(parser, name="description"):
        errors.append(f"{rel}: missing meta description")
    if not meta_value(parser, name="viewport"):
        errors.append(f"{rel}: missing viewport meta")
    if not meta_value(parser, prop="og:title") or not meta_value(parser, prop="og:description"):
        errors.append(f"{rel}: missing Open Graph title or description")
    if not canonical_value(parser):
        errors.append(f"{rel}: missing canonical link")
    elif canonical_value(parser) != SITE_ORIGIN + route_for_file(path):
        errors.append(f"{rel}: canonical does not match its public route")
    if len(parser.ids) != len(set(parser.ids)):
        errors.append(f"{rel}: duplicate element IDs")
    if parser.h1_count != 1:
        errors.append(f"{rel}: expected one h1, found {parser.h1_count}")

    robots = meta_value(parser, name="robots").lower()
    should_noindex = rel in NOINDEX_PAGES
    if should_noindex and "noindex" not in robots:
        errors.append(f"{rel}: expected noindex robots meta")
    if not should_noindex and "noindex" in robots:
        errors.append(f"{rel}: publishable page is noindex")

    visible = parser.visible_text
    lower = visible.lower()
    if "\u2014" in visible:
        errors.append(f"{rel}: visible copy contains an em dash")
    if "!" in visible:
        errors.append(f"{rel}: visible copy contains an exclamation point")
    for word in sorted(FORBIDDEN_WORDS):
        if re.search(rf"\b{re.escape(word)}\b", lower):
            errors.append(f"{rel}: visible copy contains forbidden hype word '{word}'")
    for marker in sorted(PLACEHOLDERS):
        if re.search(rf"\b{re.escape(marker)}\b", lower):
            errors.append(f"{rel}: visible copy contains placeholder marker '{marker}'")
    if "$" in visible and rel not in ALLOWED_PRICE_PAGES:
        errors.append(f"{rel}: dollar figure appears outside an allowed pricing page")
    if "chatgpt" in lower and "claude" not in lower:
        errors.append(f"{rel}: mentions ChatGPT without Claude on the same page")

    for image in parser.images:
        src = image.get("src", "")
        if not src:
            errors.append(f"{rel}: image is missing src")
        if "alt" not in image:
            errors.append(f"{rel}: image {src or '<unknown>'} is missing alt")
        dest = destination_for_href(path, src)
        if dest and not dest.exists():
            errors.append(f"{rel}: missing image {src}")

    for href in parser.links:
        dest = destination_for_href(path, href)
        if dest and not dest.exists():
            errors.append(f"{rel}: broken internal link {href}")
        parsed = urlparse(href)
        if parsed.fragment and not parsed.scheme and not parsed.netloc:
            target = dest or path
            if target.exists():
                target_parser = PageParser()
                target_parser.feed(target.read_text(encoding="utf-8"))
                if unquote(parsed.fragment) not in target_parser.ids:
                    errors.append(f"{rel}: missing link anchor {href}")

    for stylesheet in parser.links_meta:
        if stylesheet.get("rel") == "stylesheet":
            dest = destination_for_href(path, stylesheet.get("href", ""))
            if dest and not dest.exists():
                errors.append(f"{rel}: missing stylesheet")

    for field in ("description", "twitter:description", "twitter:title"):
        value = meta_value(parser, name=field).lower()
        if "chatgpt" in value and "claude" not in value:
            errors.append(f"{rel}: {field} mentions ChatGPT without Claude")
    for field in ("og:title", "og:description"):
        value = meta_value(parser, prop=field).lower()
        if "chatgpt" in value and "claude" not in value:
            errors.append(f"{rel}: {field} mentions ChatGPT without Claude")

    if parser.forms:
        for form in parser.forms:
            if form.get("action") != "https://formsubmit.co/835081ce825a6a057837907299436066" or form.get("method", "").lower() != "post":
                errors.append(f"{rel}: unexpected form delivery destination or method")
        inputs = {item.get("name"): item for item in parser.inputs}
        if inputs.get("_next", {}).get("value") != SITE_ORIGIN + "/thank-you/":
            errors.append(f"{rel}: incorrect form return URL")
        if "_honey" not in inputs:
            errors.append(f"{rel}: missing spam honeypot")

    for src in parser.scripts:
        dest = destination_for_href(path, src)
        if dest and not dest.exists():
            errors.append(f"{rel}: missing script {src}")

    missing_labels = sorted(parser.control_ids - parser.labels_for)
    for control_id in missing_labels:
        errors.append(f"{rel}: form control #{control_id} has no matching label")

    for payload in parser.jsonld:
        try:
            data = json.loads(payload)
        except json.JSONDecodeError as exc:
            errors.append(f"{rel}: invalid JSON-LD: {exc}")
            continue
        serialized = json.dumps(data).lower()
        if "pricerange" in serialized:
            errors.append(f"{rel}: JSON-LD includes forbidden company-level priceRange")
        if rel not in ALLOWED_PRICE_PAGES and "$" in serialized:
            errors.append(f"{rel}: JSON-LD contains dollar figures outside pricing pages")

    return errors


def validate_sitemap(publishable_routes: set[str]) -> list[str]:
    errors: list[str] = []
    sitemap = ROOT / "sitemap.xml"
    if not sitemap.exists():
        return ["sitemap.xml: missing"]
    try:
        tree = ElementTree.parse(sitemap)
    except ElementTree.ParseError as exc:
        return [f"sitemap.xml: invalid XML: {exc}"]
    namespace = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    locations = {
        urlparse(node.text or "").path.rstrip("/") + "/"
        for node in tree.findall("s:url/s:loc", namespace)
    }
    locations = {"/" if route == "//" else route for route in locations}
    if "/thank-you/" in locations or "/404.html/" in locations:
        errors.append("sitemap.xml: includes a noindex route")
    missing = publishable_routes - locations
    extra = locations - publishable_routes
    if missing:
        errors.append(f"sitemap.xml: missing routes {sorted(missing)}")
    if extra:
        errors.append(f"sitemap.xml: unexpected routes {sorted(extra)}")
    return errors


def main() -> int:
    if not ROOT.exists():
        print(f"ERROR: site root does not exist: {ROOT}")
        return 1
    pages = sorted(ROOT.rglob("*.html"))
    if not pages:
        print("ERROR: no HTML pages found")
        return 1

    errors: list[str] = []
    publishable_routes: set[str] = set()
    for page in pages:
        rel = page.relative_to(ROOT).as_posix()
        errors.extend(validate_page(page))
        if rel not in NOINDEX_PAGES:
            publishable_routes.add(route_for_file(page))

    required = [ROOT / name for name in REQUIRED_FILES]
    for file in required:
        if not file.exists():
            errors.append(f"{file.name}: missing required site file")
    errors.extend(validate_sitemap(publishable_routes))

    if errors:
        print(f"V2 validation failed with {len(errors)} issue(s):")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"V2 validation passed: {len(pages)} HTML pages, {len(publishable_routes)} publishable routes")
    return 0


if __name__ == "__main__":
    sys.exit(main())
