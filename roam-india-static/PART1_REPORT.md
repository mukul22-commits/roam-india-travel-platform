# ROAM INDIA — TRAVEL AND TOUR MANAGEMENT PLATFORM
## Phase 1 Academic Evaluation Report: HTML5 & CSS3 Frontend Architecture

**Course:** B.Tech Computer Science & Engineering (3rd Year)  
**Institution:** GLA University, Mathura  
**Faculty Supervisor:** Prof. Satyaprakash Singh  
**Project Group:** Group 9  
**Submission Date:** October 2026  

---

## 1. Project Title

**Roam India — Travel and Tour Management Platform (Static Frontend Phase)**

---

## 2. Objective

The primary objective of this project is to architect and develop an accessible, responsive, modern, and performant travel and tour management web interface focused exclusively on the tourism circuits of India. The platform demonstrates how modern semantic HTML5 and modular CSS3 can produce a commercial-grade, multi-page web platform without reliance on bloated third-party frameworks, CSS compilers, or complex client-side build steps.

Specific objectives include:
- Establishing a unified design system with CSS custom properties (variables) for consistent typography, spacing, elevations, and palette.
- Delivering 14 core operational pages plus 6 preserved and enhanced regional destination portals.
- Designing an intuitive multi-step booking and checkout simulation tailored with Indian Rupee (INR) pricing.
- Ensuring full compliance with WCAG 2.1 Level AA accessibility standards, responsive breakpoints across desktop, tablet, and mobile displays, and high-performance offline/local asset delivery.

---

## 3. Problem Statement

India possesses one of the richest and most geographically diverse travel landscapes in the world—spanning high-altitude Himalayan peaks, royal desert forts, spiritual riverbanks, and tropical backwaters. However, existing online travel portals frequently suffer from:
1. **Visual Clutter & Cognitive Overload:** Bombarding users with pop-ups, fluctuating third-party adverts, and opaque package inclusions.
2. **Framework Heaviness & Dependency Bloat:** Relying excessively on large client-side single-page application (SPA) bundles that suffer from slow initial load times on low-bandwidth Indian cellular connections.
3. **Fragmented Itinerary & Cost Transparency:** Requiring users to navigate multiple external websites to compare what is included (stays, transfers, meals) versus what requires out-of-pocket payment.

Roam India solves these challenges by providing a streamlined, transparent, and aesthetically elegant platform built directly on native web standards.

---

## 4. Technologies Used

- **HTML5:** Semantic document structuring (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<details>`, `<summary>`), robust form inputs with native constraint validation (`type="email"`, `type="tel"`, `type="date"`, `type="number"`, `required`).
- **CSS3:** Custom design tokens utilizing CSS Custom Properties (`:root`), Flexbox for dynamic navigation and alignments, CSS Grid (`grid-template-columns`) for card decks and multi-column layouts, media queries for responsive layouts, and print stylesheets.
- **Vanilla JavaScript (ES6+):** Pure lightweight helper script (`assets/js/main.js`) used strictly for necessary UI interactions (mobile hamburger menu toggle, checkout tab switching, and real-time frontend rate calculation preview). Zero NPM packages, zero frameworks.
- **Local Assets:** High-resolution local image assets and vector SVGs, eliminating external CDN points of failure.
- **Local Server:** Standard Python HTTP server (`python -m http.server 8788`).

---

## 5. Pages Developed

The platform comprises **20 fully interconnected HTML pages**, each sharing a uniform header, navigation system, and footer:

| Page File | Purpose & Architectural Contents |
| :--- | :--- |
| `index.html` | **Homepage:** Hero banner, value propositions, featured destinations, popular packages, sample testimonials, and primary call-to-actions. |
| `destinations.html` | **Destinations Catalog:** Theme-based category filters (Hills, Heritage, Nature, Relaxation) and cards covering North, West, and South India. |
| `destination-details.html` | **Destination Showcase:** In-depth profile for Manali & Solang Valley with elevation facts, seasonal weather breakdown, and itinerary preview. |
| `packages.html` | **Packages Catalog:** Complete listing of all six sample packages with category chips, highlight lists, and direct booking buttons. |
| `package-details.html` | **Package Deep-Dive:** Comprehensive overview of "The Himalayan Escape" featuring itemized inclusions, exclusions, daily schedules, and pricing box. |
| `compare.html` | **Side-by-Side Comparison:** Accessible matrix comparing durations, stays, meals, transit, highlights, and INR tariffs. |
| `itinerary.html` | **Itinerary Showcase:** Interactive timeline featuring morning, afternoon, and evening schedules, essentials, and packing checklists. |
| `booking.html` | **Reservation Form:** Two-column booking form with guest scaling, date pickers, stay tier options, and live pricing sidebar. |
| `payment.html` | **Payment Simulation:** Multi-tab checkout demo supporting UPI/QR code, demo credit/debit cards, and Net Banking options with demo warnings. |
| `booking-confirmation.html` | **Confirmation Voucher:** Receipt view with unique booking ID (`#RI-2026-89421`), next-step checklist, and printable layout. |
| `booking-history.html` | **Account Dashboard:** Overview metric counters, status badges (Upcoming, Completed), and historical reservation cards. |
| `about.html` | **About Platform:** Mission, vision, core values, platform workflow, and GLA University academic project details. |
| `contact.html` | **Contact Portal:** Accessible enquiry form, campus location address, student helpline, and FAQ links. |
| `faq.html` | **FAQ Accordions:** Native `<details>/<summary>` accordions addressing booking, pricing, cancellation, and academic scope. |
| `destination-alleppey-retreat.html` | **Dedicated Tour:** Alleppey Backwater Hideaway (4 Days / 3 Nights · ₹12,900). |
| `destination-himalayan-escape.html` | **Dedicated Tour:** The Himalayan Escape (6 Days / 5 Nights · ₹18,900). |
| `destination-jaipur-weekend.html` | **Dedicated Tour:** The Pink City Weekend (3 Days / 2 Nights · ₹7,900). |
| `destination-kerala-slow-days.html` | **Dedicated Tour:** Kerala, at Your Own Pace (7 Days / 6 Nights · ₹22,500). |
| `destination-manali-weekender.html` | **Dedicated Tour:** A Little Mountain Reset (3 Days / 2 Nights · ₹8,900). |
| `destination-royal-rajasthan.html` | **Dedicated Tour:** A Royal Rajasthan Trail (5 Days / 4 Nights · ₹16,400). |

---

## 6. HTML Implementation

- **Strict Document Type & Meta Tags:** Every page includes `<!doctype html>`, `<html lang="en">`, `<meta charset="utf-8">`, and responsive `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- **Semantic Landmark Tagging:** Content is partitioned using proper landmarks: `<header role="banner">`, `<nav aria-label="Main navigation">`, `<main id="main">`, `<section>`, `<article>`, `<aside>`, and `<footer role="contentinfo">`.
- **Accessible Forms:** All form controls link explicitly to their visual `<label for="...">` elements. Required inputs contain `required` and `aria-required="true"`.
- **Native Accordions:** The FAQ page leverages semantic `<details>` and `<summary>` elements, providing native collapsible behavior without JavaScript requirements.
- **Link Integrity:** All internal links across all 20 pages use clean relative paths with zero broken endpoints or missing references.

---

## 7. CSS Implementation

The platform styling is centralized in `assets/css/style.css` (with `assets/style.css` serving as a root linker):
- **Design Tokens:**
  - *Color Palette:* Primary Deep Green (`#1f5145`), Forest Dark (`#143930`), Lime Accent (`#d7f17d`), Deep Ink Text (`#163832`), Paper Background (`#fafbf8`), Clean Border (`#dfe5dc`).
  - *Typography:* High-readability system sans-serif (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`) for body text paired with elegant serif headings (`Georgia, "Times New Roman"`).
  - *Elevation & Radii:* Modular border radius tokens (`--radius-sm: 6px` to `--radius-full: 9999px`) and soft multi-layer box shadows.
- **Modular Component Styles:** Dedicated styling for cards, price badges, chips, timeline items, comparison tables, receipt vouchers, and form layouts.
- **Clean Focus Indicators:** Standardized `:focus-visible` states with a 3px gold ring (`#b38600`) and 3px offset for keyboard navigability.
- **Print Styles:** Embedded `@media print` rules hiding navigation, buttons, and footers, producing clean printed vouchers.

---

## 8. Responsive Design

The stylesheet applies mobile-first responsive principles tested across primary viewport thresholds:
- **Desktop (> 1024px):** 3-column and 4-column card layouts, sticky reservation summaries, and horizontal navigation bar.
- **Tablet (769px – 1024px):** Grid structures adapt dynamically to 2-column configurations; detail hero sections stack gracefully.
- **Mobile (≤ 768px):** 
  - Main navigation transitions into an accessible collapsible drawer triggered by a 3-bar hamburger icon (`.nav-toggle`).
  - Card grids, form rows, and receipt layouts collapse to single-column vertical flows.
  - The comparison matrix enables horizontal swipe/scroll (`overflow-x: auto`) with visual indicators.
- **Compact Mobile (≤ 480px):** Fluid typography scaling (`clamp()`), full-width action buttons, and adjusted padding prevent horizontal page overflowing.

---

## 9. Accessibility (WCAG 2.1 AA Compliance)

- **Skip Navigation:** Every page includes `<a class="skip" href="#main">Skip to main content</a>` allowing keyboard and screen-reader users to bypass repetitive header navigation.
- **Contrast Ratios:** Contrast between deep ink text (`#163832`) and paper background (`#fafbf8`) exceeds **11.2:1**, well above the WCAG AA minimum threshold of 4.5:1.
- **Alternative Text:** All images have descriptive `alt` tags (e.g. `alt="Snow-capped Himalayan mountains in Manali"`).
- **Semantics & Keyboard Focus:** All interactive elements use standard `<a>` or `<button>` tags with visible focus outlines. Screen-reader assistive labels (`aria-label`, `aria-expanded`, `aria-current="page"`) are provided throughout.

---

## 10. Existing Assets

The project preserves and utilizes local high-resolution artwork:
- `assets/mountains.png`: Used for Himachal Pradesh, Manali, and high-altitude adventure circuits.
- `assets/palace.png`: Used for Rajasthan, Jaipur, Udaipur, and royal cultural corridors.
- `assets/backwaters.png`: Used for Kerala, Alleppey, and tropical nature/wellness retreats.
- `assets/images/`: Assets mirrored to support both flat and directory-based referencing.

---

## 11. Current Limitations

1. **Frontend-Only Persistence:** Form submissions and checkout flows are simulated. Selected traveler counts and date changes on `booking.html` display on the frontend but do not save to a permanent server database.
2. **Static Mock Dataset:** All prices, itineraries, and reviews represent realistic authored sample data rather than live vendor APIs.
3. **No External Payment Gateway:** The payment screen is an educational demonstration sandbox. No banking gateway is connected.

---

## 12. Future JavaScript Work (Phase 2)

Planned JavaScript modules for the next phase:
1. `navigation.js`: Enhanced keyboard drawer traps, touch swipe gestures, and scroll-spy active state tracking.
2. `catalog.js` & `filters.js`: Client-side instant keyword searching, dynamic category filtering, and price-range sliders without page reloading.
3. `storage.js`: Browser `localStorage` integration to enable a persistent "Saved Trips" / "My Wishlist" drawer and local booking history caching.
4. `validation.js`: Advanced client-side form validation with real-time error hints and phone/email pattern formatting.
5. `pricing.js`: Dynamic quote recalculations based on seasonal departure dates and custom group room scaling.

---

## 13. Future Backend Work (Phase 3)

Planned server-side and database architecture:
1. **Server API:** Node.js/Express or Python/Django REST API endpoints for tour packages, destination metadata, and user accounts.
2. **Database:** Relational schema (PostgreSQL) or document database (MongoDB) storing package records, inventory availability, and customer bookings.
3. **Authentication:** Secure user signup/login using hashed credentials (bcrypt) and JSON Web Tokens (JWT).
4. **Payment Processing:** Integration with test sandboxes such as Razorpay or Stripe for payment capture and automated webhook receipts.
5. **Notification Services:** Automated transactional emails for confirmation vouchers and SMS travel reminders via Nodemailer / Twilio.

---

## 14. Team Members & Contribution Matrix

### GLA University, Mathura — Group 9

| Member | Roll Number | Primary Contributions |
| :--- | :--- | :--- |
| **Mayank Singh** | 2415000964 | Developed destination detail views, package card components, and form layouts. |
| **Mudit Tripathi** | 2415000996 | Designed responsive CSS layout grids, color palette tokens, and UI wireframes. |
| **Mukul Sharma** | 2415000999 | Architected central CSS system, global navigation, booking/payment simulation flow, and report. |
| **Nitin Pratap Solanki** | 2415001058 | Authored Indian travel content, verified accessibility compliance, and executed cross-browser testing. |

**Faculty Supervisor:** Prof. Satyaprakash Singh, Department of Computer Science & Engineering.

---

## 15. Testing & Verification Procedure

The following verification steps were executed across the platform:

1. **Local Server Verification:**
   ```bash
   python -m http.server 8788
   ```
   Verified successful HTTP serving on `http://localhost:8788`.
2. **Automated Link & Asset Integrity Check:**
   - Ran an automated script scanning all 20 HTML files for internal `href` and `src` attributes.
   - **Result:** 100% of internal links and media paths resolve correctly with 0 broken endpoints.
3. **Responsive Breakpoint Testing:**
   - Inspected layouts at 1440px (Desktop), 1024px (Tablet landscape), 768px (Tablet portrait), and 375px/414px (Mobile).
   - Confirmed menu drawer toggle behavior, absence of horizontal scrollbar leakage, and clean card wrapping.
4. **Form & Validation Testing:**
   - Tested native HTML5 constraint validation on `booking.html` and `contact.html` by attempting submission with missing/invalid inputs.
   - Confirmed browser validation tooltips triggered on empty required fields.
5. **Print Styling Check:**
   - Triggered browser print dialog (`Ctrl+P`) on `booking-confirmation.html`.
   - Confirmed headers, buttons, and footers were hidden, leaving a clean itemized receipt voucher.
