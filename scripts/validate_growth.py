#!/usr/bin/env python3
"""Apply the established site checks to the production Growth build."""
import validate_v2 as validation
from build_growth import OUTPUT, ASSETS

validation.SITE_ORIGIN = "https://www.wellandgoodgrowth.ca"
validation.ROOT = OUTPUT
validation.ALLOWED_PRICE_PAGES = {"services/websites/index.html", "services/growth/index.html", "website-design-niagara/index.html", "website-design-welland/index.html", "niagara-seo/index.html"}
validation.REQUIRED_FILES = (*ASSETS.values(), "robots.txt", "llms.txt")

if __name__ == "__main__":
    raise SystemExit(validation.main())
