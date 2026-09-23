# Roam India — Travel and Tour Management Platform

Group 9, GLA University. A responsive HTML5, CSS3 and vanilla JavaScript frontend with a local sample catalogue, package comparison, configurable travel estimates, saved itineraries and simulated checkout. No application dependencies or build step.

## Run on Windows CMD

Install Node.js 18 or newer, extract this ZIP, open CMD inside `travel-tour-platform`, then run:

```bat
npm start
```

Open http://localhost:8788. Stop with Ctrl+C. Alternatively double-click `start-project.bat` (Node.js preferred, Python fallback).

```bat
python -m http.server 8788 --bind 127.0.0.1 --directory dist
```

Use HTTP rather than opening HTML directly, because ES modules require a server.

## What is included

- 154 curated destination seeds across all 28 Indian states and 8 union territories and seven nearby countries: Nepal, Bhutan, Sri Lanka, Maldives, Bangladesh, Myanmar and Thailand.
- 1,468 sample package records, including the original six packages. Most records are generated planning variants, not independently researched operator tours.
- Budget, standard, luxury, family, honeymoon, solo, group and weekend variants; appropriate destination themes and additional nature, relaxation and wellness variants.
- Country, state/region, keyword, experience, package type, budget and duration filters; price/duration sorting; incremental catalogue display.
- Side-by-side comparison of up to three packages, a shared traveller count and separate stay/transport/meal choices per trip. Selected options transfer into booking.
- Train, flight and bus return allowances; self-arranged arrival travel; budget/comfort/premium accommodation; local car, bike or bus; meal plans and optional sightseeing allowance.
- A visible calculation for every line: quantity × unit price, intended recipient category, group total and approximate per-person amount.
- Two-stage simulated checkout: review every cost and exclusion, then explicitly confirm the simulation. No real payment data collected.
- Saved itinerary, ordering/removal, booking history, printable itemized confirmations and local record deletion.
- Existing bookings without a breakdown remain readable as legacy summaries.

## Important project scope

The Word synopsis defines a frontend-only prototype and supersedes the PDF's earlier HTML/CSS-only teaching plan for this delivery. Real authentication, payment processing, supplier availability, tickets, confirmation emails and backend services remain future work.

This is not an exhaustive database of every Indian tourist place. Destination seeds provide nationwide coverage and can be expanded in `catalog.js`. International entries are geography/planning examples, not travel recommendations or evidence of open routes. No entry, permit, safety or visa eligibility check is performed. The official India destination reference is https://www.incredibleindia.gov.in/ (reviewed 16 September 2026). Rates and package content are authored mock data, not sourced supplier quotes.

The three inherited pictures are illustrative artwork, not verified photos of each location. Additional variants have flexible sample itineraries. Family/solo/group/honeymoon names are planning themes, not promises of special services, discounts or accessibility. No named hotels are offered, and stay tiers are not verified star ratings.

## Pricing rules

All amounts are sample INR allowances. No live fare API is used. Departure city and date do not change rates. Every traveller has the same demo rate; there are no child/infant fare rules.

- Starting prices use **two travellers**, shared rooms, breakfast, sightseeing allowance, local car for mainland destinations, and one service fee. Arrival/return transport is self-arranged by default and excluded. Island transfers are excluded.
- Hotel rooms = ceiling(travellers / 2); nights = trip days minus one. The selected room-night allowance is multiplied by rooms and nights.
- A car holds up to four travellers. Cars = ceiling(travellers / 4), charged per trip day.
- A bike is charged per rider per trip day. Local bus is charged per traveller per day.
- Arrival travel is a return allowance per traveller. Overseas and island packages only expose a flight allowance or self-arranged travel; these are not verified itineraries.
- Meals are per traveller per trip day. Sightseeing is a single per-traveller allowance. The INR 500 platform planning fee is charged once per booking.
- For international examples, stay/local/meal allowances use a fixed 1.5 multiplier; this is not an exchange-rate model.
- **Taxes, permits, visas, insurance, tolls, parking and other unquoted costs are excluded.** The displayed group total is the sum of selected sample allowances, not a final payable supplier price. Omitted meal/transport categories are listed explicitly.
- The recipient shown is a category of provider, not a named supplier or evidence of an actual payout. Real supplier allocation requires backend integration.

## Structure

```text
travel-tour-platform/
  dist/
    index.html              Discovery and catalogue
    packages.html           Filterable catalogue
    destination.html        Details and sample itinerary (?id=...)
    compare.html            Compare up to 3 trips
    booking.html            Options, itemized review, simulation
    itinerary.html          Saved trips and booking history
    assets/
      app.js                Original page flow and saved-state actions
      planner.js            Catalogue, comparison and checkout UI
      core.js               Filters, validation and persistence
      catalog.js            Explicit destination seed records
      data.js               Original packages and generated variants
      pricing.js            Sample rates and shared quote calculation
      style.css             Shared responsive design
      *.png                 Inherited illustrative artwork
  scripts/serve.mjs          Local loopback-only static server
  scripts/check.mjs          Syntax, entrypoint and asset validation
  tests/core.test.mjs        Existing feature regression tests
  tests/pricing.test.mjs     Pricing, coverage and persistence tests
  start-project.bat          Windows launcher
  UPDATE_REPORT.md          Requirements, changes and limitations
```

## Verify

```bat
npm test
npm run check
```

24 automated logic tests cover filters, persistence, input validation, escaping, unique IDs, destination coverage, quote arithmetic, room/car scaling, invalid transport choices, all starting-price calculations and saved quote integrity. Syntax and local asset/link checks cover six entrypoints.

## Demonstration walkthrough

1. Open All escapes. Select India, Goa and Budget; expect three templates.
2. Add two different packages to comparison. Try adding four and confirm the three-trip limit.
3. Open Compare. Set three travellers; adjust stay, return travel and meals in either column.
4. Choose Review this trip. Verify comparison choices survived navigation.
5. Change local transport between car, bike and bus; verify the line descriptions, quantities and total update.
6. Enter example traveller details, departure city and a future date; accept the simulation acknowledgement.
7. Review the simulated payment. Return to edit selections, then review again and confirm.
8. Open My trips and reload. View and print the saved itemized summary; delete it when done.
9. Test an island trip: car, bike, train and bus travel options must not be offered.
10. Test on a narrow screen and using Tab/Enter. No real personal information is needed.

## Storage and privacy

Data remains in the current browser. Browser clearing removes it. If storage is blocked, warnings report that changes last only for the visit. The legacy `roam-india-v1` key remains; comparison uses `roam-compare`. No migration deletes old records. Names, emails and departure city are validated transiently and are not persisted or sent. Quote snapshots store only chosen travel options, prices and exclusions.

## Group

| Member | Roll number |
| --- | --- |
| Mayank Singh | 2415000964 |
| Mudit Tripathi | 2415000996 |
| Mukul Sharma | 2415000999 |
| Nitin Pratap Solanki | 2415001058 |

Supervisor: Satyaprakash Singh. Program: B.Tech CSE 3rd Year.

## Next production phase

Build a backend with supplier catalogue and inventory, date/origin-aware transport search, named hotels, final tax/fee calculation, cancellation policy and quote expiry. The server must validate options and compute the final price; browser localStorage is not authoritative. Integrate a hosted payment gateway only after those pieces exist, verify signed webhooks and prevent duplicate payment/booking actions. Add authentication, secure bookings, refunds, supplier allocation and receipts. Never collect card credentials in this frontend.

## Browser verification limitation

A browser executable was not installed in this environment, and downloading Chromium timed out. Desktop/mobile visual checks and end-to-end browser interaction could not be completed here. The manual walkthrough above (in README.md) remains the final presentation check. Automated Node logic tests and static-server HTTP checks were completed; they do not replace visual/browser testing.
