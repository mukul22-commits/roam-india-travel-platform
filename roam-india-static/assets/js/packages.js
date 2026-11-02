/**
 * ROAM INDIA — Tour package catalogue
 *
 * Renders the package homepage strip, the searchable package catalogue
 * and the dynamic package detail page.
 */
(function (global) {
  'use strict';

  const data = global.RoamData || { destinations: [], packages: [] };
  const packages = data.packages || [];
  const destinations = data.destinations || [];
  const ui = global.RoamUI;

  function initHomePackages() {
    const host = document.getElementById('home-packages');
    if (!host || !ui) return;
    const featured = ['the-himalayan-escape', 'a-royal-rajasthan-trail', 'kerala-at-your-own-pace']
      .map(function (id) { return ui.getPackage(id); })
      .filter(Boolean);
    host.innerHTML = featured.map(ui.packageCard).join('');
  }

  function initPackagesPage() {
    const grid = document.getElementById('packages-grid');
    if (!grid || !ui) return;

    const search = document.getElementById('package-search');
    const country = document.getElementById('package-country');
    const type = document.getElementById('package-type');
    const duration = document.getElementById('package-duration');
    const sort = document.getElementById('package-sort');
    const count = document.getElementById('packages-count');
    const reset = document.getElementById('package-reset');
    const notice = document.getElementById('active-package-filter');

    const params = new URLSearchParams(global.location.search);
    let destinationFilter = params.get('destination') || '';

    if (params.get('q')) search.value = params.get('q');
    if (params.get('country')) country.value = params.get('country');
    if (params.get('type')) type.value = params.get('type');
    if (params.get('sort')) sort.value = params.get('sort');

    function activeDestination() {
      return destinationFilter ? ui.getDestination(destinationFilter) : null;
    }

    function refreshNotice() {
      if (!notice) return;
      const destination = activeDestination();
      notice.innerHTML = destination
        ? '<span>Showing packages for <strong>' + ui.escapeHtml(destination.name) + '</strong></span>' +
          '<button type="button" class="chip" data-clear-destination>Clear destination</button>'
        : '';
      notice.hidden = !destination;
    }

    function applyFilters(updateUrl) {
      const query = search.value.trim().toLowerCase();
      const destination = activeDestination();
      let results = packages.filter(function (pkg) {
        const haystack = [
          pkg.name, pkg.destinationName, pkg.state, pkg.country, pkg.region,
          pkg.type, pkg.summary, (pkg.highlights || []).join(' '), (pkg.tags || []).join(' ')
        ].join(' ').toLowerCase();
        const durationMatch = duration.value === 'All' ||
          (duration.value === 'short' && ui.nights(pkg.duration) <= 3) ||
          (duration.value === 'medium' && ui.nights(pkg.duration) >= 4 && ui.nights(pkg.duration) <= 6) ||
          (duration.value === 'long' && ui.nights(pkg.duration) >= 7);
        const pkgCountry = pkg.destinationCountry || pkg.country || (pkg.destinationType === 'international' ? 'International' : 'India');
        return (!destination || pkg.destinationId === destination.id) &&
          (!query || haystack.indexOf(query) > -1) &&
          (country.value === 'All' || (country.value === 'India' ? pkgCountry === 'India' : (country.value === 'International' ? pkgCountry !== 'India' : pkgCountry === country.value))) &&
          (type.value === 'All' || pkg.type === type.value) &&
          durationMatch;
      });

      if (sort.value === 'price-asc') results.sort(function (a, b) { return a.startingPrice - b.startingPrice; });
      else if (sort.value === 'price-desc') results.sort(function (a, b) { return b.startingPrice - a.startingPrice; });
      else if (sort.value === 'rating') results.sort(function (a, b) { return b.rating - a.rating; });
      else results.sort(function (a, b) { return b.rating - a.rating || a.startingPrice - b.startingPrice; });

      if (count) {
        count.textContent = results.length === packages.length
          ? 'Showing all ' + packages.length + ' packages'
          : 'Showing ' + results.length + ' of ' + packages.length + ' packages';
      }

      if (!results.length) {
        grid.innerHTML = ui.emptyState(
          'No packages match those filters',
          'Try a different country, trip length or clear the filters to see every package.',
          '<button class="btn btn-secondary btn-sm" type="button" data-clear-package-filters>Clear all filters</button>'
        );
      } else {
        grid.innerHTML = results.map(ui.packageCard).join('');
      }

      if (updateUrl) {
        const next = new URLSearchParams();
        if (query) next.set('q', search.value.trim());
        if (destination) next.set('destination', destination.id);
        if (country.value !== 'All') next.set('country', country.value);
        if (type.value !== 'All') next.set('type', type.value);
        if (sort.value !== 'recommended') next.set('sort', sort.value);
        const suffix = next.toString() ? '?' + next.toString() : '';
        global.history.replaceState({}, '', global.location.pathname + suffix);
      }
    }

    function resetFilters() {
      destinationFilter = '';
      search.value = '';
      country.value = 'All';
      type.value = 'All';
      duration.value = 'All';
      sort.value = 'recommended';
      refreshNotice();
      applyFilters(true);
    }

    [search].forEach(function (element) {
      element.addEventListener('input', function () { applyFilters(true); });
    });
    [country, type, duration, sort].forEach(function (element) {
      element.addEventListener('change', function () { applyFilters(true); });
    });
    if (reset) reset.addEventListener('click', resetFilters);
    grid.addEventListener('click', function (event) {
      if (event.target.closest('[data-clear-package-filters]')) resetFilters();
    });
    if (notice) {
      notice.addEventListener('click', function (event) {
        if (event.target.closest('[data-clear-destination]')) {
          destinationFilter = '';
          refreshNotice();
          applyFilters(true);
        }
      });
    }
    const form = document.getElementById('package-filters');
    if (form) form.addEventListener('submit', function (event) { event.preventDefault(); applyFilters(true); });

    refreshNotice();
    applyFilters(false);
  }

  function itinerarySchedule(pkg, day) {
    if (day === 1) {
      return ['Arrive and transfer', 'Check in and settle', 'Welcome walk and dinner'];
    }
    if (day === pkg.itinerary.length) {
      return ['Breakfast at the hotel', 'Check out', 'Onward transfer'];
    }
    return ['Guided highlight visit', 'Local lunch and free time', 'Optional evening experience'];
  }

  function initPackageDetail() {
    const host = document.getElementById('package-detail');
    if (!host || !ui) return;

    const params = new URLSearchParams(global.location.search);
    const pkg = ui.getPackage(params.get('id') || 'the-himalayan-escape');

    if (!pkg) {
      host.innerHTML = ui.emptyState(
        'Package not found',
        'This package may no longer be listed. Browse the current collection to find a similar trip.',
        '<a class="btn btn-primary" href="packages.html">Browse Packages</a>'
      );
      return;
    }

    document.title = pkg.name + ' — Tour Package | Roam India';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', pkg.summary + ' ' + pkg.duration + ' from ' + ui.money(pkg.startingPrice) + ' per person.');

    const location = pkg.country === 'India' ? pkg.destinationName + ', ' + pkg.state : pkg.name + ' · ' + pkg.state;
    const destination = ui.getDestination(pkg.destinationId);
    const related = packages.filter(function (item) {
      return item.id !== pkg.id && (item.region === pkg.region || item.type === pkg.type);
    }).slice(0, 3);

    const timeline = pkg.itinerary.map(function (day, index) {
      const tag = index === 0 ? 'Arrival' : (index === pkg.itinerary.length - 1 ? 'Departure' : 'Explore');
      const schedule = itinerarySchedule(pkg, day.day).map(function (item) {
        return '<div class="schedule-block">' + ui.escapeHtml(item) + '</div>';
      }).join('');
      return '<div class="timeline-item">' +
        '<div class="timeline-badge">' + day.day + '</div>' +
        '<div class="timeline-content">' +
          '<div class="timeline-header"><span class="timeline-day">Day ' + day.day + ': ' + ui.escapeHtml(day.title) + '</span><span class="timeline-tag">' + tag + '</span></div>' +
          '<p class="timeline-desc">' + ui.escapeHtml(day.description) + '</p>' +
          '<div class="timeline-schedule">' + schedule + '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    const highlights = pkg.highlights.map(function (item) {
      return '<li><strong>' + ui.escapeHtml(item) + '</strong></li>';
    }).join('');

    host.innerHTML =
      '<div class="breadcrumb"><a href="index.html">Home</a> / <a href="packages.html">Packages</a> / <span>' + ui.escapeHtml(pkg.name) + '</span></div>' +
      '<section class="detail-hero" aria-label="Package overview">' +
        '<div class="detail-gallery">' +
          '<img src="' + ui.escapeHtml(pkg.image) + '" alt="' + ui.escapeHtml(pkg.name + ' in ' + location) + '">' +
          '<span class="detail-gallery-badge badge ' + ui.escapeHtml(pkg.badgeClass) + '">' + ui.escapeHtml(pkg.type) + '</span>' +
        '</div>' +
        '<div class="detail-copy">' +
          '<span class="eyebrow">Curated Tour Package</span>' +
          '<h1>' + ui.escapeHtml(pkg.name) + '</h1>' +
          '<div class="detail-location"><span>' + ui.escapeHtml(location) + '</span></div>' +
          '<p class="detail-lead">' + ui.escapeHtml(pkg.longDescription) + '</p>' +
          '<div class="facts-bar">' +
            '<div class="fact-item"><span>Duration</span><strong>' + ui.escapeHtml(pkg.duration) + '</strong></div>' +
            '<div class="fact-item"><span>Rating</span><strong>★ ' + ui.escapeHtml(pkg.rating) + '</strong></div>' +
            '<div class="fact-item"><span>Stay</span><strong>' + ui.escapeHtml(pkg.accommodation.split(' and ')[0]) + '</strong></div>' +
            '<div class="fact-item"><span>Best time</span><strong>' + ui.escapeHtml(pkg.bestTime) + '</strong></div>' +
          '</div>' +
          '<div class="detail-price-box"><span class="price-tag">' + ui.money(pkg.startingPrice) + '</span><small>per person · twin sharing</small></div>' +
          '<div class="detail-actions">' +
            '<a class="btn btn-primary btn-lg" href="booking.html?package=' + encodeURIComponent(pkg.id) + '">Book This Package ↗</a>' +
            '<a class="btn btn-secondary btn-lg" href="compare.html">Compare Tours</a>' +
          '</div>' +
        '</div>' +
      '</section>' +
      '<div class="detail-layout">' +
        '<div>' +
          '<article class="panel"><h2>Package Overview</h2><p>' + ui.escapeHtml(pkg.summary) + '</p>' +
            '<p>This itinerary is designed with a comfortable pace, clear inclusions and enough free time to make the trip your own. Every departure is planned around confirmed stays and private transfers.</p>' +
            '<h3 style="margin-top:24px;">Trip Highlights</h3><ul class="inclusions-list">' + highlights + '</ul>' +
          '</article>' +
          '<article class="panel"><h2>Day-by-Day Itinerary</h2><div class="timeline">' + timeline + '</div></article>' +
          '<article class="panel"><h2>What’s Included</h2><div class="inclusion-grid">' +
            '<div><h3>Stay</h3><p>' + ui.escapeHtml(pkg.accommodation) + '</p></div>' +
            '<div><h3>Meals</h3><p>' + ui.escapeHtml(pkg.meals) + '</p></div>' +
            '<div><h3>Transport</h3><p>' + ui.escapeHtml(pkg.transport) + '</p></div>' +
            '<div><h3>Planning</h3><p>Pre-departure coordination, local assistance and all applicable booking fees.</p></div>' +
          '</div></article>' +
          '<article class="panel"><h2>Good to Know</h2><ul class="inclusions-list">' +
            '<li>Prices are indicative starting rates in INR and vary by season, room category and group size.</li>' +
            '<li>Flights, personal expenses, optional activities and travel insurance are not included unless stated.</li>' +
            '<li>Final availability and hotel names are confirmed by your travel advisor before payment.</li>' +
          '</ul></article>' +
        '</div>' +
        '<aside class="detail-sidebar">' +
          '<div class="summary-box">' +
            '<span class="badge ' + ui.escapeHtml(pkg.badgeClass) + '">' + ui.escapeHtml(pkg.country === 'India' ? 'India' : 'International') + '</span>' +
            '<h3 class="summary-title">' + ui.escapeHtml(pkg.name) + '</h3>' +
            '<div class="summary-sub">' + ui.escapeHtml(pkg.duration) + '</div>' +
            '<div class="summary-rows">' +
              '<div class="summary-row"><span>Starting from:</span><strong>' + ui.money(pkg.startingPrice) + ' / person</strong></div>' +
              '<div class="summary-row"><span>Destination:</span><span>' + ui.escapeHtml(pkg.destinationName) + '</span></div>' +
              '<div class="summary-row"><span>Best time:</span><span>' + ui.escapeHtml(pkg.bestTime) + '</span></div>' +
              '<div class="summary-row total"><span>Traveler rating:</span><strong>★ ' + ui.escapeHtml(pkg.rating) + '</strong></div>' +
            '</div>' +
            '<a class="btn btn-primary btn-block" href="booking.html?package=' + encodeURIComponent(pkg.id) + '" style="margin-bottom:10px;">Check Dates &amp; Book ↗</a>' +
            (destination ? '<a class="btn btn-secondary btn-block" href="destination-details.html?id=' + encodeURIComponent(destination.id) + '">Explore ' + ui.escapeHtml(destination.name) + '</a>' : '') +
          '</div>' +
          '<div class="panel side-note"><h3>Need a tweak?</h3><p>We can adjust the hotels, add a day or build a private departure for your group.</p><a class="text-link" href="contact.html">Talk to a travel advisor →</a></div>' +
        '</aside>' +
      '</div>' +
      '<section class="section-block"><div class="section-header"><span class="eyebrow">You may also like</span><h2>Similar packages</h2><p>Other journeys with a comparable pace and style.</p></div><div class="grid">' + related.map(ui.packageCard).join('') + '</div></section>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHomePackages();
    initPackagesPage();
    initPackageDetail();
  });
})(window);
