# Roam India — Travel and Tour Management Platform

Roam India is a frontend-based travel and tour management website built using HTML5, CSS3 and Vanilla JavaScript. It helps users explore Indian destinations, browse travel packages, view package details and use the available booking interface.

The project is developed as a college mini-project to demonstrate frontend web development, responsive design, JavaScript interactions and browser-based data storage.

## Run on Windows CMD

No Node.js installation, npm packages or build tools are required.

1. Open CMD inside the project folder.
2. Run:

```bat
python -m http.server 8000
```

3. Open the following address in your browser:

```text
http://localhost:8000
```

4. To stop the server, press `Ctrl + C` in CMD.

Use a local HTTP server instead of opening HTML files directly, so JavaScript and browser features work correctly.

## Current Project Features

The following features are present in the current project:

- Destination catalogue containing 154 destination records.
- Package catalogue containing 36 actual package records.
- Destination and package browsing pages.
- Destination and package detail pages.
- Search, filtering and sorting options on catalogue pages.
- URL-based selection and navigation for destination and package details.
- Responsive layout for desktop and mobile screens.
- Navigation menu and interactive frontend elements.
- Booking form interface for entering traveller and trip details.
- Browser LocalStorage support for demo booking data and saved records.
- Booking history and confirmation page interfaces.
- Reusable JavaScript functions and HTML escaping for safer display of text.

**Important:** The 36 package records are the actual records currently identified in `data.js`. The earlier claim of 1,468 packages has not been verified and should not be presented as the current package count.

## Features That Need Further Development

Some features described in the original project plan are not fully implemented or verified in the current version.

| Feature | Current status |
|---|---|
| Destination catalogue | Implemented |
| Package catalogue | Implemented |
| Search and filtering | Implemented |
| Package detail pages | Implemented |
| Package comparison | Needs dynamic implementation |
| Traveller-based pricing | Needs complete implementation |
| Stay and transport options | Needs complete implementation |
| Meals and sightseeing calculations | Needs implementation or verification |
| Island and international travel restrictions | Needs implementation |
| Two-stage checkout | Not fully implemented |
| Payment processing | Demo frontend only; no real payment gateway |
| Dynamic booking confirmation | Needs correction and verification |
| Booking history | Browser-based demo functionality |
| Itinerary management | Needs further verification |

The comparison page currently does not provide the complete dynamic comparison experience described in the original plan. The booking and confirmation pages also contain hardcoded sample information that must be replaced with actual booking data.

## Technology Stack

- **HTML5:** Page structure, forms, navigation and content.
- **CSS3:** Styling, responsive layouts, cards, buttons and page design.
- **Vanilla JavaScript (ES6+):** DOM manipulation, search, filtering, validation and frontend interactions.
- **Browser LocalStorage:** Stores supported demo data in the user's browser.
- **Python HTTP Server:** Used to run the website locally during development.
- **Git/GitHub:** Source-code version control and project hosting.

No frontend framework or external package manager is required.

## Project Structure

The main project structure is organised as follows:

```text
roam-india-static/
│
├── index.html
├── destinations.html
├── destination-details.html
├── packages.html
├── package-details.html
├── compare.html
├── itinerary.html
├── booking.html
├── payment.html
├── booking-confirmation.html
├── booking-history.html
├── about.html
├── contact.html
├── faq.html
│
├── assets/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── main.js
│   │   ├── data.js
│   │   ├── destinations.js
│   │   ├── packages.js
│   │   └── booking.js
│   │
│   └── images/
│       └── *.png
│
├── README.md
└── AUDIT_REPORT.md
```

This is the intended main structure. Check the actual project folder for the latest filenames and any additional files.

## Booking and Payment Limitations

The current project is a frontend prototype, not a production travel booking system.

- Booking information is handled through frontend functionality.
- LocalStorage is browser-specific and does not provide a central database.
- No real user authentication is implemented.
- No live hotel, transport or supplier availability is connected.
- No real payment gateway is integrated.
- No actual tickets, hotel vouchers or confirmation emails are generated.
- Hardcoded sample booking details must not be treated as real reservations.
- Payment screens, if used, must clearly identify themselves as demonstrations.

No real card details, CVV, banking passwords or OTPs should be collected or stored.

## Pricing Limitations

The current booking interface should not be described as having a complete dynamic pricing engine until the calculation rules have been implemented and tested.

The intended future pricing system may include:

- Accommodation based on room count and trip nights.
- Local transport based on the selected vehicle and traveller count.
- Meals based on traveller count and trip duration.
- Sightseeing allowances.
- Return travel allowances.
- A one-time planning fee.
- Separate exclusions for taxes, permits, visas, insurance, tolls and parking.

All sample prices must be clearly identified as estimates, not confirmed supplier prices.

## Testing and Verification

The project has undergone a code review and feature audit. The audit identified working catalogue features as well as incomplete features in comparison, pricing and checkout.

The following checks should be performed before the final project demonstration:

1. Open the website using the local Python server.
2. Check the Home, Destinations and Packages pages.
3. Test destination and package search and filters.
4. Open individual destination and package details.
5. Test the comparison page and its selection limits.
6. Check whether traveller and trip options update prices correctly.
7. Test the booking form with sample information.
8. Check whether booking data is saved and displayed correctly.
9. Test confirmation and booking history after refreshing the page.
10. Check the website at desktop and mobile screen sizes.
11. Open browser Developer Tools and check for JavaScript errors.

Do not report a test as passed unless it has actually been performed.

## Storage and Privacy

The project uses browser LocalStorage for supported demo features.

- Stored data remains in the current browser.
- Clearing browser storage may remove saved demo records.
- Data is not automatically synchronised across devices.
- LocalStorage is not a replacement for a secure backend database.
- The prototype does not provide production-level account or booking security.

## Group

| Member | Roll number |
| --- | --- |
| Mayank Singh | 2415000964 |
| Mudit Tripathi | 2415000996 |
| Mukul Sharma | 2415000999 |
| Nitin Pratap Solanki | 2415001058 |

Supervisor: Satyaprakash Singh. Program: B.Tech CSE 3rd Year.

## Future Scope

The project can be improved in the following areas:

1. Implement dynamic comparison of up to three travel packages.
2. Develop a complete traveller-based pricing calculation system.
3. Add configurable accommodation, transport and meal options.
4. Implement island and international destination travel rules.
5. Develop a proper two-stage booking and checkout process.
6. Make confirmation and booking history fully dynamic.
7. Improve itinerary creation and management.
8. Add a backend database and secure user authentication.
9. Integrate verified travel suppliers and live availability.
10. Integrate a secure hosted payment gateway in a future production version.

## Project Conclusion

Roam India demonstrates how HTML5, CSS3 and Vanilla JavaScript can be used to build a responsive travel and tour management frontend.

The current implementation provides destination and package browsing, catalogue interactions and selected browser-based demo features. Comparison, complete pricing and checkout functionality remain areas for further development.

The project provides a foundation for a more complete travel management platform with backend integration and real-world services in the future.
