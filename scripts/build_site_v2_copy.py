#!/usr/bin/env python3
"""Regenerate site-v2-copy.md from the rendered v2 HTML pages."""

from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "site-v2"
OUTPUT = ROOT / "site-v2-copy.md"

PAGE_ORDER = [
    "index.html",
    "services/index.html",
    "services/websites/index.html",
    "services/seo/index.html",
    "services/aeo/index.html",
    "services/automation/index.html",
    "engagements/index.html",
    "work/index.html",
    "frank-baggetta/index.html",
    "about/index.html",
    "contact/index.html",
    "web-design-niagara/index.html",
    "affordable-website-design/index.html",
    "one-page-websites/index.html",
    "privacy/index.html",
    "thank-you/index.html",
    "404.html",
]

BLOCK_TAGS = {"h1", "h2", "h3", "h4", "p", "li", "label", "button", "option", "summary", "figcaption"}
SKIP_TAGS = {"script", "style", "template", "noscript", "svg"}
VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}


def normalize(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


class CopyParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.in_main = False
        self.skip_depth = 0
        self.capture_tag: str | None = None
        self.capture_depth = 0
        self.buffer: list[str] = []
        self.blocks: list[tuple[str, str]] = []
        self.in_title = False
        self.title_parts: list[str] = []
        self.meta_description = ""

    @property
    def title(self) -> str:
        return normalize("".join(self.title_parts))

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_map = dict(attrs)
        if tag in VOID_TAGS:
            if tag == "meta" and attrs_map.get("name") == "description":
                self.meta_description = normalize(attrs_map.get("content") or "")
            if tag == "br" and self.capture_tag:
                self.buffer.append(" ")
            return
        if tag == "title":
            self.in_title = True
        if tag == "main":
            self.in_main = True
            return
        if tag in SKIP_TAGS:
            self.skip_depth += 1
        if not self.in_main or self.skip_depth:
            return
        if self.capture_tag is not None:
            if tag in {"p", "strong", "span"}:
                self.buffer.append(" ")
            self.capture_depth += 1
            return
        if tag in BLOCK_TAGS:
            self.capture_tag = tag
            self.capture_depth = 1
            self.buffer = []

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self.in_title = False
        if self.capture_tag is not None and self.in_main and not self.skip_depth:
            self.capture_depth -= 1
            if self.capture_depth == 0:
                text = normalize("".join(self.buffer))
                if text:
                    self.blocks.append((self.capture_tag, text))
                self.capture_tag = None
                self.buffer = []
        if tag in SKIP_TAGS and self.skip_depth:
            self.skip_depth -= 1
        if tag == "main":
            self.in_main = False
            return

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title_parts.append(data)
        if self.capture_tag is not None and self.in_main and not self.skip_depth:
            self.buffer.append(data)


def route_for(relative: str) -> str:
    if relative == "index.html":
        return "/"
    if relative == "404.html":
        return "/404.html"
    return "/" + relative.removesuffix("index.html")


def render_block(tag: str, text: str) -> str:
    if tag == "h1":
        return f"### {text}"
    if tag in {"h2", "h3", "h4"}:
        return f"#### {text}"
    if tag == "li":
        return f"- {text}"
    if tag == "label":
        return f"**Form label:** {text}"
    if tag == "button":
        return f"**Button:** {text}"
    if tag == "option":
        return f"- **Form option:** {text}"
    if tag == "summary":
        return f"**Summary:** {text}"
    return text


def build() -> str:
    lines = [
        "# Well and Good v2 Copy",
        "",
        "Copy inventory regenerated from `site-v2/`. Edit the builder, then regenerate.",
        "Shared navigation and footer copy are intentionally omitted.",
        "",
    ]
    for relative in PAGE_ORDER:
        path = SITE / relative
        parser = CopyParser()
        parser.feed(path.read_text(encoding="utf-8"))
        route = route_for(relative)
        lines.extend(
            [
                f"## {route}",
                "",
                f"**SEO title:** {parser.title}",
                "",
                f"**Meta description:** {parser.meta_description}",
                "",
            ]
        )
        for tag, text in parser.blocks:
            lines.append(render_block(tag, text))
            lines.append("")
    return "\n".join(lines).rstrip() + "\n"


if __name__ == "__main__":
    OUTPUT.write_text(build(), encoding="utf-8")
    print(f"Saved: {OUTPUT}")
