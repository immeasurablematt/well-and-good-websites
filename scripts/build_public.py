#!/usr/bin/env python3
"""Publish only website files, keeping research and developer tools private."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
# Matthew approved the Agentic OS-led v2 on September 6, 2026.
SOURCE = ROOT / "site-v2"
OUTPUT = ROOT / "public"
DIRECTORIES = (
    "assets", "icons", "affordable-website-design", "one-page-websites",
    "web-design-niagara", "frank-baggetta", "thank-you", "services",
    "about", "contact", "engagements", "work", "privacy",
)
FILES = ("index.html", "404.html", "robots.txt", "sitemap.xml", "llms.txt", "styles.css", "site.js", "dc-lite.js")

if __name__ == "__main__":
    if not (SOURCE / "index.html").is_file():
        raise SystemExit("Missing source homepage")
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir()
    for name in DIRECTORIES:
        if (SOURCE / name).is_dir():
            shutil.copytree(SOURCE / name, OUTPUT / name, ignore=shutil.ignore_patterns(".DS_Store"))
    for name in FILES:
        if (SOURCE / name).is_file():
            shutil.copy2(SOURCE / name, OUTPUT / name)
    print(f"Built public website from {SOURCE}")
