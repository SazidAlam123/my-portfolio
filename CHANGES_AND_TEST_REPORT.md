# Changes and test report (primary domain: https://www.dataentry.work/)

## Changes made on top of the review pack
1. portfolio.html: replaced 4 old Fiverr short links (fiverr.com/s/...) with the full gig URLs
   (the short links did not open on phones). Nothing else was changed.
All other files are exactly as supplied in the pack (domain already consistent).

## Not changed on purpose (needs your confirmation)
- "80+ orders", "4 years", Fiverr "2 years", "US, UK, Canada, Australia, Europe" claims.
- vercel.json (no redirects there; set redirects only in Vercel Domains settings).

## Tests run locally (served from a local web server, root path)
- 4 pages x 6 screen sizes (1920, 1280, 768, 390, 360, 320): no horizontal scroll, no JS errors, no 404s, all images load.
- Canonical, og:url, og:image, twitter:image = https://www.dataentry.work on every page; sitemap + robots.txt use only the primary domain.
- JSON-LD parses on both pages; FAQ schema matches the 8 visible FAQs; all schema URLs exist.
- Every sitemap URL and all 42 sitemap image URLs exist as files.
- Phone taps: every Fiverr, WhatsApp, LinkedIn and Peblo link goes to the correct URL.
- Navigation, FAQ, review carousel (5s), zoom, lightbox, keyboard skip link, reduced-motion: all pass.
