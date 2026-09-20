# Roam India — Travel and Tour Management Platform (static)

A frontend mini-project for Group 9, GLA University, Mathura, built with **HTML5 and CSS3 only — no JavaScript, no build step, no dependencies.**

## Run it

There's nothing to install or build. Either:

- Double-click `index.html` to open it directly in a browser, or
- Serve the folder with any static file server, e.g.:

```bat
python -m http.server 8788
```

Then open http://localhost:8788.

## Pages

```text
index.html                        Discover / home
packages.html                     All six sample packages, grouped by category
destination-himalayan-escape.html Package detail page
destination-royal-rajasthan.html  Package detail page
destination-kerala-slow-days.html Package detail page
destination-manali-weekender.html Package detail page
destination-jaipur-weekend.html   Package detail page
destination-alleppey-retreat.html Package detail page
contact.html                      Trip enquiries (mailto links)
assets/
  style.css                       Shared responsive design
  *.png                           Illustrative artwork
_headers                          Static-host security header policy
.gitignore
```

## What changed from the JavaScript version

All client-side JavaScript (`app.js`, `core.js`, `data.js`) and everything it powered have been removed:

- **Search, filter and sort** on the packages page are gone. Instead, `packages.html` groups all six packages under category headings with plain anchor links to jump between them.
- **Save to itinerary / "My trips"** is gone, since it depended on `localStorage`, which needs JavaScript to read and write.
- **The simulated booking form** (traveller details, live total, confirmation, booking history) is gone, since form validation and totals were computed in JavaScript. `contact.html` replaces it with a plain enquiry page: pick a package and it opens a pre-filled `mailto:` link.
- The Content-Security-Policy in `_headers` now sets `script-src 'none'`, since the site no longer runs any scripts.

Everything else — the responsive layout, package artwork, day-by-day itineraries and inclusions — is still here as static markup.

## Current scope

All prices, ratings, itineraries and package inclusions are sample data. Artwork is AI-generated and illustrates a travel mood rather than a verified destination. This project does not check live availability, process payments, send email automatically, authenticate users or create real reservations. The "Email an enquiry" links on the contact page point to a placeholder address (`hello@roamindia.example`) — replace it with a real one before using this beyond the classroom.

## Group

| Member | Roll number |
| --- | --- |
| Mayank Singh | 2415000964 |
| Mudit Tripathi | 2415000996 |
| Mukul Sharma | 2415000999 |
| Nitin Pratap Solanki | 2415001058 |

Supervisor: Satyaprakash Singh. Program: B.Tech CSE 3rd Year.

## Future work

The approved synopsis treats a real backend (booking, payments, availability, authentication) as future work, and would need JavaScript (or a server-rendered stack) again to implement dynamic behaviour on top of this static shell.

## Publish to GitHub

From inside this folder:

```bat
git init
git add .
git commit -m "Static HTML/CSS-only travel and tour platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/travel-tour-platform.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username, and create an empty repository named `travel-tour-platform` on GitHub first (no README/license/gitignore added there, so the push isn't rejected for unrelated histories).
