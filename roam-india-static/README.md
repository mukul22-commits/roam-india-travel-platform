# Roam India — Travel and Tour Management Platform

A modern, responsive, and accessible frontend travel and tour management web application developed as a College Mini-Project for **Group 9, GLA University, Mathura**.

---

## 📌 Project Overview

**Roam India** is a comprehensive travel discovery, package comparison, and tour management platform designed specifically for the diverse tourism landscape of India. The platform showcases curated holiday circuits across iconic destinations—from the alpine valleys of the Himalayas to the regal heritage fortresses of Rajasthan and the tranquil backwaters of Kerala.

This repository represents the **Phase 1: HTML5 + CSS3 + Minimal Vanilla JavaScript** static delivery. It requires no heavy frameworks (No React, Angular, Vue, Bootstrap, or Tailwind), no build steps, and zero external NPM dependencies.

---

## 👥 Academic Team & Supervision

- **Institution:** GLA University, Mathura
- **Department:** Department of Computer Science & Engineering
- **Program:** B.Tech Computer Science & Engineering (3rd Year)
- **Project Supervisor:** Prof. Satyaprakash Singh

### Group 9 Members

| Name | Roll Number | Role |
| :--- | :--- | :--- |
| **Mayank Singh** | 2415000964 | Frontend Developer |
| **Mudit Tripathi** | 2415000996 | UI/UX Designer |
| **Mukul Sharma** | 2415000999 | Lead Architecture |
| **Nitin Pratap Solanki** | 2415001058 | Content & Quality Testing |

---

## 🚀 How to Run the Project

The application runs as a static website directly on any standard HTTP server or web browser.

### Recommended Method: Python Local HTTP Server

Open Command Prompt / PowerShell inside the project directory:

```bash
cd C:\Users\Mukul\Mini-project\roam-india-static
python -m http.server 8788
```

Then open your web browser and navigate to:

```text
http://localhost:8788
```

*(Alternatively, you can double-click `index.html` to view the pages directly in any browser.)*

---

## 💻 Technologies Used

- **HTML5:** Semantic architecture (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<details>`, `<summary>`), accessible forms with labels and validation attributes.
- **CSS3:** Custom design system built with CSS Custom Properties (Variables), Flexbox, CSS Grid layouts, responsive media queries, and accessible focus states.
- **Vanilla JavaScript:** Minimal, lightweight script (`assets/js/main.js`) handling mobile drawer navigation toggle, payment simulation tabs, and live booking rate arithmetic.
- **Local Assets:** High-resolution optimized local imagery and SVG branding (no external CDN dependencies).

---

## 📂 Project Directory Structure

```text
roam-india-static/
│
├── index.html                        # Homepage (Hero, features, featured tours, testimonials, CTA)
├── destinations.html                 # Destination directory with theme filters (Hills, Heritage, Nature)
├── destination-details.html          # Comprehensive destination showcase (weather, season, sights)
├── packages.html                     # Tour packages catalog with detailed inclusions
├── package-details.html              # Dedicated package details page (itinerary, inclusions/exclusions)
├── compare.html                      # Side-by-side package comparison table matrix
├── itinerary.html                    # Day-by-day sample travel timelines with morning/eve schedules
├── booking.html                      # Semantic booking form with live rate calculations
├── payment.html                      # Demo checkout & simulation (UPI, Cards, Net Banking)
├── booking-confirmation.html         # Printable confirmation voucher with reference ID
├── booking-history.html              # Traveler account history (Upcoming and past trips)
├── about.html                        # Mission, vision, core values, and GLA University team info
├── contact.html                      # Campus address, student helpline, and enquiry form
├── faq.html                          # Semantic FAQ accordions answering common traveler queries
│
├── destination-alleppey-retreat.html # Dedicated Alleppey backwaters tour package
├── destination-himalayan-escape.html # Dedicated Manali & Solang Valley adventure package
├── destination-jaipur-weekend.html   # Dedicated Pink City weekend tour package
├── destination-kerala-slow-days.html # Dedicated Munnar & Alleppey nature retreat package
├── destination-manali-weekender.html # Dedicated quick mountain reset package
├── destination-royal-rajasthan.html  # Dedicated Rajasthan royal heritage circuit package
│
├── assets/
│   ├── css/
│   │   └── style.css                 # Central design system stylesheet
│   ├── js/
│   │   └── main.js                   # Minimal UI script (mobile nav, tabs, calculations)
│   ├── images/
│   │   ├── mountains.png             # Mountain & adventure landscape artwork
│   │   ├── palace.png                # Royal palace & heritage artwork
│   │   └── backwaters.png            # Kerala lagoon & backwaters artwork
│   ├── style.css                     # Root stylesheet linker (@import)
│   ├── mountains.png                 # Root asset fallback
│   ├── palace.png                    # Root asset fallback
│   └── backwaters.png                # Root asset fallback
│
├── _headers                          # Static host security header policy (CSP, frame options)
├── .gitignore                        # Git ignore patterns
├── README.md                         # Project documentation and guide
└── PART1_REPORT.md                   # Formal Academic Evaluation Report
```

---

## 🌟 Key Features Implemented

1. **Global Consistent Navigation:** Unified header with active indicators across all 20 pages, mobile hamburger drawer, and accessible keyboard focus states.
2. **Indian Pricing Standard (INR):** Consistent Indian Rupee pricing across all cards, comparison tables, and booking summaries (`₹7,900`, `₹18,900`, `₹22,500`).
3. **Responsive Comparison Matrix:** Full side-by-side table on `compare.html` evaluating stay tiers, transport, meals, activity highlights, and customer ratings.
4. **Interactive Timeline Schedules:** Day-by-day itinerary on `itinerary.html` with morning, afternoon, and evening breakdowns and packing checklists.
5. **End-to-End Booking Simulation:** Multi-step reservation experience:
   - `booking.html`: Form validation, guest count scaling, and live total calculation.
   - `payment.html`: Method selection tabs (UPI QR code, demo credit card, net banking).
   - `booking-confirmation.html`: Voucher with reference `#RI-2026-89421` and print styling.
   - `booking-history.html`: Account dashboard showing active and past trips.
6. **Accessibility & Semantic Standards:** Native `<details>/<summary>` accordions, skip-to-content links, explicit `alt` text, proper ARIA labels, and WCAG AA contrast compliance.

---

## ⚠️ Academic Scope & Current Limitations

- **Demo Data Only:** All prices, ratings, hotel descriptions, and booking reference numbers are illustrative mock data created for college evaluation.
- **No Real Gateway:** The payment screen is an educational simulation. No actual banking credentials or real money transactions are accepted.
- **Frontend-Only Architecture:** Form submissions do not connect to a live SQL database or server email relay.

---

## 🔮 Roadmap for Future Phases

### Phase 2: Advanced JavaScript (Client-Side Enhancements)
- Dynamic client-side catalogue filtering and instant live search.
- Browser `localStorage` persistence for saving favorites ("My Wishlist") and personalizing booking records.
- Comprehensive client-side form validation with custom error alerts and interactive date-pickers.

### Phase 3: Backend & Database Integration
- REST API powered by Node.js/Express or Python/Django.
- PostgreSQL / MongoDB database to store live hotel availability, operator contracts, and user accounts.
- JWT-based authentication for traveler profiles and admin management dashboards.
- Integration with live payment gateways (Razorpay / Stripe Sandbox) and automated email confirmation relays (SendGrid / Nodemailer).
