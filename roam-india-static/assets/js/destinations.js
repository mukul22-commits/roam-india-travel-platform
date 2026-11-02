/**
 * ROAM INDIA — Destination catalogue and shared card renderers
 *
 * Renders the curated homepage sections, the searchable destination
 * catalogue and the dynamic destination detail page.
 */
(function (global) {
  'use strict';

  const data = global.RoamData || { destinations: [], packages: [] };
  const destinations = data.destinations || [];
  const packages = data.packages || [];

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function money(value) {
    return '₹' + Number(value || 0).toLocaleString('en-IN');
  }

  function nights(duration) {
    const match = /(\d+)\s*Nights/i.exec(String(duration || ''));
    return match ? parseInt(match[1], 10) : 0;
  }

  function getDestination(id) {
    return destinations.find(function (item) { return item.id === id; });
  }

  function getPackage(id) {
    return packages.find(function (item) { return item.id === id; });
  }

  function locationLabel(destination) {
    return destination.state + ' · ' + destination.region;
  }

  function destinationCard(destination) {
    const detailsUrl = 'destination-details.html?id=' + encodeURIComponent(destination.id);
    const bookingUrl = 'booking.html?destination=' + encodeURIComponent(destination.id);
    const alt = destination.name + ', ' + destination.state + ' — ' + destination.type.toLowerCase() + ' travel scenery';

    return '<article class="card catalog-card">' +
      '<div class="card-image">' +
        '<img src="' + escapeHtml(destination.image) + '" alt="' + escapeHtml(alt) + '" loading="lazy" width="600" height="400">' +
        '<span class="card-badge badge ' + escapeHtml(destination.badgeClass) + '">' + escapeHtml(destination.type) + '</span>' +
      '</div>' +
      '<div class="card-body">' +
        '<span class="card-location">' + escapeHtml(locationLabel(destination)) + '</span>' +
        '<h3 class="card-title"><a href="' + detailsUrl + '">' + escapeHtml(destination.name) + '</a></h3>' +
        '<p class="card-description">' + escapeHtml(destination.shortDescription) + '</p>' +
        '<div class="card-meta">' +
          '<span>' + escapeHtml(destination.duration) + '</span>' +
          '<span class="card-rating" aria-label="Rated ' + escapeHtml(destination.rating) + ' out of 5">★ ' + escapeHtml(destination.rating) + '</span>' +
        '</div>' +
        '<div class="price-row">' +
          '<div class="price-block"><strong>' + money(destination.startingPrice) + '</strong><small>starting per person</small></div>' +
          '<div class="card-actions">' +
            '<a class="btn btn-secondary btn-sm" href="' + detailsUrl + '">View Details</a>' +
            '<a class="btn btn-primary btn-sm" href="' + bookingUrl + '">Book Now</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function packageCard(pkg) {
    const detailsUrl = 'package-details.html?id=' + encodeURIComponent(pkg.id);
    const bookingUrl = 'booking.html?package=' + encodeURIComponent(pkg.id);
    const location = pkg.country === 'India' ? pkg.destinationName + ', ' + pkg.state : pkg.state;
    const highlights = (pkg.highlights || []).slice(0, 3).map(function (item) {
      return '<li>' + escapeHtml(item) + '</li>';
    }).join('');

    return '<article class="card catalog-card">' +
      '<div class="card-image">' +
        '<img src="' + escapeHtml(pkg.image) + '" alt="' + escapeHtml(pkg.name + ' — ' + location) + '" loading="lazy" width="600" height="400">' +
        '<span class="card-badge badge ' + escapeHtml(pkg.badgeClass) + '">' + escapeHtml(pkg.type) + '</span>' +
      '</div>' +
      '<div class="card-body">' +
        '<span class="card-location">' + escapeHtml(location) + '</span>' +
        '<h3 class="card-title"><a href="' + detailsUrl + '">' + escapeHtml(pkg.name) + '</a></h3>' +
        '<p class="card-description">' + escapeHtml(pkg.summary) + '</p>' +
        '<ul class="card-highlights">' + highlights + '</ul>' +
        '<div class="card-meta">' +
          '<span>' + escapeHtml(pkg.duration) + '</span>' +
          '<span class="card-rating" aria-label="Rated ' + escapeHtml(pkg.rating) + ' out of 5">★ ' + escapeHtml(pkg.rating) + '</span>' +
        '</div>' +
        '<div class="price-row">' +
          '<div class="price-block"><strong>' + money(pkg.startingPrice) + '</strong><small>per person · twin sharing</small></div>' +
          '<div class="card-actions">' +
            '<a class="btn btn-secondary btn-sm" href="' + detailsUrl + '">Details</a>' +
            '<a class="btn btn-primary btn-sm" href="' + bookingUrl + '">Book Now</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function emptyState(title, message, action) {
    return '<div class="empty-state">' +
      '<span class="empty-state-mark" aria-hidden="true">✧</span>' +
      '<h3>' + escapeHtml(title) + '</h3>' +
      '<p>' + escapeHtml(message) + '</p>' +
      (action || '') +
    '</div>';
  }

  function renderCards(target, items, cardBuilder) {
    if (!target) return;
    target.innerHTML = items.map(cardBuilder).join('');
  }

  function byIds(ids) {
    return ids.map(getDestination).filter(Boolean);
  }

  const experiences = [
    { type: 'Mountains', label: 'Hills & Trekking', copy: 'Cool ridgelines, pine forests and high passes.', image: 'mountains' },
    { type: 'Beaches', label: 'Beach Escapes', copy: 'Long shorelines, lagoons and slow coastal days.', image: 'backwaters' },
    { type: 'Heritage', label: 'Forts & Palaces', copy: 'Royal architecture, old cities and living craft.', image: 'palace' },
    { type: 'Wildlife', label: 'Wildlife Safaris', copy: 'Tigers, rhinos and bird-rich wetlands.', image: 'backwaters' },
    { type: 'Spiritual', label: 'Temples & Pilgrimage', copy: 'Ghats, monasteries and centuries of devotion.', image: 'palace' },
    { type: 'Adventure', label: 'Adventure Trails', copy: 'Trekking, rafting and high-altitude roads.', image: 'mountains' },
    { type: 'Relaxation', label: 'Slow Travel', copy: 'Houseboats, estate stays and fewer plans.', image: 'backwaters' },
    { type: 'Romantic', label: 'Romantic Getaways', copy: 'Quiet stays, lake sunsets and private time.', image: 'backwaters' }
  ];

  function initHome() {
    renderCards(document.getElementById('home-popular-india'), byIds([
      'jaipur', 'manali', 'udaipur', 'alleppey', 'leh', 'varanasi', 'darjeeling', 'kutch'
    ]), destinationCard);

    renderCards(document.getElementById('home-international'), byIds([
      'bali', 'singapore', 'dubai', 'maldives', 'phuket', 'tokyo'
    ]), destinationCard);

    renderCards(document.getElementById('home-trending'), byIds([
      'spiti-valley', 'tawang', 'dzukou-valley', 'havelock-island', 'gokarna', 'ranthambore'
    ]), destinationCard);

    const experienceHost = document.getElementById('home-experiences');
    if (experienceHost) {
      experienceHost.innerHTML = experiences.map(function (item) {
        const count = destinations.filter(function (destination) { return destination.type === item.type; }).length;
        return '<a class="experience-tile" href="destinations.html?type=' + encodeURIComponent(item.type) + '">' +
          '<span class="experience-tile-image" style="background-image:url(\'assets/images/' + item.image + '.png\')" aria-hidden="true"></span>' +
          '<span class="experience-tile-body">' +
            '<span class="experience-count">' + count + ' destinations</span>' +
            '<strong>' + escapeHtml(item.label) + '</strong>' +
            '<span>' + escapeHtml(item.copy) + '</span>' +
            '<span class="text-link">Explore →</span>' +
          '</span>' +
        '</a>';
      }).join('');
    }

    const countNodes = document.querySelectorAll('[data-destination-count]');
    countNodes.forEach(function (node) { node.textContent = destinations.length; });
    const packageCountNodes = document.querySelectorAll('[data-package-count]');
    packageCountNodes.forEach(function (node) { node.textContent = packages.length; });
  }

  function fillRegionSelect(select, country, selected) {
    if (!select) return;
    const pool = destinations.filter(function (destination) {
      return country === 'All' || destination.country === country;
    });
    const regions = Array.from(new Set(pool.map(function (destination) { return destination.region; }))).sort();
    select.innerHTML = '<option value="All">All regions</option>' + regions.map(function (region) {
      return '<option value="' + escapeHtml(region) + '">' + escapeHtml(region) + '</option>';
    }).join('');
    select.value = regions.indexOf(selected) > -1 ? selected : 'All';
  }

  function initDestinationsPage() {
    const grid = document.getElementById('destinations-grid');
    if (!grid) return;

    const form = document.getElementById('destination-filters');
    const search = document.getElementById('filter-search');
    const country = document.getElementById('filter-country');
    const region = document.getElementById('filter-region');
    const type = document.getElementById('filter-type');
    const sort = document.getElementById('filter-sort');
    const count = document.getElementById('destinations-count');
    const reset = document.getElementById('filter-reset');
    const params = new URLSearchParams(global.location.search);

    if (params.get('q')) search.value = params.get('q');
    if (params.get('country')) country.value = params.get('country');
    if (params.get('type')) type.value = params.get('type');
    if (params.get('sort')) sort.value = params.get('sort');

    fillRegionSelect(region, country.value || 'All', params.get('region') || 'All');

    function applyFilters(updateUrl) {
      const query = search.value.trim().toLowerCase();
      const selectedCountry = country.value;
      const selectedRegion = region.value;
      const selectedType = type.value;
      const selectedSort = sort.value;

      let results = destinations.filter(function (destination) {
        const haystack = [
          destination.name, destination.state, destination.region, destination.type,
          destination.shortDescription, (destination.tags || []).join(' ')
        ].join(' ').toLowerCase();
        return (!query || haystack.indexOf(query) > -1) &&
          (selectedCountry === 'All' || destination.country === selectedCountry) &&
          (selectedRegion === 'All' || destination.region === selectedRegion) &&
          (selectedType === 'All' || destination.type === selectedType);
      });

      if (selectedSort === 'price-asc') results.sort(function (a, b) { return a.startingPrice - b.startingPrice; });
      else if (selectedSort === 'price-desc') results.sort(function (a, b) { return b.startingPrice - a.startingPrice; });
      else if (selectedSort === 'name') results.sort(function (a, b) { return a.name.localeCompare(b.name); });
      else results.sort(function (a, b) { return b.rating - a.rating || a.name.localeCompare(b.name); });

      if (count) {
        count.textContent = results.length === destinations.length
          ? 'Showing all ' + destinations.length + ' destinations'
          : 'Showing ' + results.length + ' of ' + destinations.length + ' destinations';
      }

      if (!results.length) {
        grid.innerHTML = emptyState(
          'No destinations match those filters',
          'Try a broader search, a different region or clear the filters to see the full catalogue.',
          '<button class="btn btn-secondary btn-sm" type="button" data-clear-filters>Clear all filters</button>'
        );
      } else {
        renderCards(grid, results, destinationCard);
      }

      if (updateUrl) {
        const next = new URLSearchParams();
        if (query) next.set('q', search.value.trim());
        if (selectedCountry !== 'All') next.set('country', selectedCountry);
        if (selectedRegion !== 'All') next.set('region', selectedRegion);
        if (selectedType !== 'All') next.set('type', selectedType);
        if (selectedSort !== 'recommended') next.set('sort', selectedSort);
        const suffix = next.toString() ? '?' + next.toString() : '';
        global.history.replaceState({}, '', global.location.pathname + suffix);
      }
    }

    function resetFilters() {
      search.value = '';
      country.value = 'All';
      type.value = 'All';
      sort.value = 'recommended';
      fillRegionSelect(region, 'All', 'All');
      applyFilters(true);
    }

    country.addEventListener('change', function () {
      fillRegionSelect(region, country.value, region.value);
      applyFilters(true);
    });
    [search, region, type, sort].forEach(function (element) {
      element.addEventListener(element === search ? 'input' : 'change', function () { applyFilters(true); });
    });
    if (reset) reset.addEventListener('click', resetFilters);
    grid.addEventListener('click', function (event) {
      if (event.target.closest('[data-clear-filters]')) resetFilters();
    });
    if (form) form.addEventListener('submit', function (event) { event.preventDefault(); applyFilters(true); });

    applyFilters(false);
  }

  function initDestinationDetail() {
    const host = document.getElementById('destination-detail');
    if (!host) return;

    const params = new URLSearchParams(global.location.search);
    const destination = getDestination(params.get('id') || 'manali');

    if (!destination) {
      host.innerHTML = emptyState(
        'Destination not found',
        'The destination you are looking for may have moved. Browse the full catalogue to find your next trip.',
        '<a class="btn btn-primary" href="destinations.html">Browse Destinations</a>'
      );
      return;
    }

    document.title = destination.name + ' — Destination Guide | Roam India';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', destination.shortDescription + ' Plan a trip to ' + destination.name + ' with Roam India.');

    const relatedPackages = packages.filter(function (pkg) { return pkg.destinationId === destination.id; });
    const relatedDestinations = destinations.filter(function (item) {
      return item.id !== destination.id && (item.region === destination.region || item.type === destination.type);
    }).slice(0, 4);

    const highlights = destination.highlights.map(function (item) {
      return '<li><strong>' + escapeHtml(item) + '</strong> — a highlight to build into your ' + escapeHtml(destination.name) + ' itinerary.</li>';
    }).join('');

    const tips = destination.travelTips.map(function (item) {
      return '<li>' + escapeHtml(item) + '</li>';
    }).join('');

    const packageSection = relatedPackages.length
      ? '<div class="grid">' + relatedPackages.map(packageCard).join('') + '</div>'
      : emptyState(
        'No fixed departure package yet',
        'We can build a private itinerary around ' + destination.name + ' using your dates and travel style.',
        '<a class="btn btn-secondary" href="contact.html">Request a Custom Plan</a>'
      );

    host.innerHTML =
      '<div class="breadcrumb"><a href="index.html">Home</a> / <a href="destinations.html">Destinations</a> / <span>' + escapeHtml(destination.name) + '</span></div>' +
      '<section class="detail-hero" aria-label="' + escapeHtml(destination.name) + ' overview">' +
        '<div class="detail-gallery">' +
          '<img src="' + escapeHtml(destination.image) + '" alt="' + escapeHtml(destination.name + ', ' + destination.state + ' travel scenery') + '">' +
          '<span class="detail-gallery-badge badge ' + escapeHtml(destination.badgeClass) + '">' + escapeHtml(destination.type) + '</span>' +
        '</div>' +
        '<div class="detail-copy">' +
          '<span class="eyebrow">' + (destination.country === 'India' ? 'Destination in India' : 'International Escape') + '</span>' +
          '<h1>' + escapeHtml(destination.name) + '</h1>' +
          '<div class="detail-location"><span>' + escapeHtml(locationLabel(destination)) + '</span></div>' +
          '<p class="detail-lead">' + escapeHtml(destination.longDescription) + '</p>' +
          '<div class="facts-bar">' +
            '<div class="fact-item"><span>Best time</span><strong>' + escapeHtml(destination.bestTime) + '</strong></div>' +
            '<div class="fact-item"><span>Ideal stay</span><strong>' + escapeHtml(destination.duration) + '</strong></div>' +
            '<div class="fact-item"><span>Region</span><strong>' + escapeHtml(destination.region) + '</strong></div>' +
            '<div class="fact-item"><span>Traveler rating</span><strong>★ ' + escapeHtml(destination.rating) + '</strong></div>' +
          '</div>' +
          '<div class="detail-price-box">' +
            '<span class="price-tag">' + money(destination.startingPrice) + '</span>' +
            '<small>starting per person · twin sharing</small>' +
          '</div>' +
          '<div class="detail-actions">' +
            '<a class="btn btn-primary btn-lg" href="booking.html?destination=' + encodeURIComponent(destination.id) + '">Book This Trip ↗</a>' +
            '<a class="btn btn-secondary btn-lg" href="#destination-packages">View Packages</a>' +
          '</div>' +
        '</div>' +
      '</section>' +
      '<div class="detail-layout">' +
        '<div>' +
          '<article class="panel">' +
            '<h2>Destination Overview</h2>' +
            '<p>' + escapeHtml(destination.longDescription) + '</p>' +
            '<h3 style="margin-top:24px;">Key Highlights</h3>' +
            '<ul class="inclusions-list">' + highlights + '</ul>' +
          '</article>' +
          '<article class="panel">' +
            '<h2>Practical Travel Notes</h2>' +
            '<ul class="inclusions-list">' + tips + '</ul>' +
            '<p style="margin-top:16px;color:var(--muted);font-size:0.9rem;">Best time to visit: <strong>' + escapeHtml(destination.bestTime) + '</strong>. Prices shown are indicative starting rates in INR and vary by season, hotel category and group size.</p>' +
          '</article>' +
          '<article class="panel" id="destination-packages">' +
            '<h2>Packages Featuring ' + escapeHtml(destination.name) + '</h2>' +
            '<p>Start with a ready-made itinerary, or ask us to tailor the pace, stay and activities around your group.</p>' +
            packageSection +
          '</article>' +
        '</div>' +
        '<aside class="detail-sidebar">' +
          '<div class="summary-box">' +
            '<span class="badge ' + escapeHtml(destination.badgeClass) + '">Plan your trip</span>' +
            '<h3 class="summary-title">' + escapeHtml(destination.name) + '</h3>' +
            '<div class="summary-sub">' + escapeHtml(locationLabel(destination)) + '</div>' +
            '<div class="summary-rows">' +
              '<div class="summary-row"><span>Ideal duration:</span><strong>' + escapeHtml(destination.duration) + '</strong></div>' +
              '<div class="summary-row"><span>Best season:</span><span>' + escapeHtml(destination.bestTime) + '</span></div>' +
              '<div class="summary-row"><span>Starting from:</span><strong>' + money(destination.startingPrice) + '</strong></div>' +
              '<div class="summary-row total"><span>Suggested trip:</span><strong>' + (relatedPackages.length ? escapeHtml(relatedPackages[0].name) : 'Custom itinerary') + '</strong></div>' +
            '</div>' +
            '<a class="btn btn-primary btn-block" href="booking.html?destination=' + encodeURIComponent(destination.id) + '" style="margin-bottom:10px;">Start Booking ↗</a>' +
            '<a class="btn btn-secondary btn-block" href="contact.html">Ask a Travel Advisor</a>' +
          '</div>' +
          '<div class="panel side-note">' +
            '<h3>Good to know</h3>' +
            '<p>All trips are planned with clear INR pricing, confirmed stays and a single point of contact before departure.</p>' +
            '<a class="text-link" href="faq.html">Read travel FAQs →</a>' +
          '</div>' +
        '</aside>' +
      '</div>' +
      '<section class="section-block">' +
        '<div class="section-header"><span class="eyebrow">Keep exploring</span><h2>Similar destinations</h2><p>More places that suit the same kind of trip.</p></div>' +
        '<div class="grid">' + relatedDestinations.map(destinationCard).join('') + '</div>' +
      '</section>';
  }

  global.RoamUI = {
    escapeHtml: escapeHtml,
    money: money,
    nights: nights,
    getDestination: getDestination,
    getPackage: getPackage,
    locationLabel: locationLabel,
    destinationCard: destinationCard,
    packageCard: packageCard,
    emptyState: emptyState
  };

  document.addEventListener('DOMContentLoaded', function () {
    initHome();
    initDestinationsPage();
    initDestinationDetail();
  });
})(window);
