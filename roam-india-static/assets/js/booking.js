/**
 * ROAM INDIA — Booking flow
 *
 * Handles trip selection and fare calculation, the secure checkout,
 * confirmation receipts and saved booking history.
 */
(function (global) {
  'use strict';

  const data = global.RoamData || { destinations: [], packages: [] };
  const packages = data.packages || [];
  const destinations = data.destinations || [];
  const DRAFT_KEY = 'roamIndiaDraft';
  const BOOKINGS_KEY = 'roamIndiaBookings';

  const STAY_OPTIONS = {
    standard: { label: 'Standard Boutique (3-star included)', supplement: 0 },
    comfort: { label: 'Comfort Heritage', supplement: 2500 },
    luxury: { label: 'Luxury Suite', supplement: 4800 }
  };

  function money(value) {
    return '₹' + Number(value || 0).toLocaleString('en-IN');
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function nights(duration) {
    const match = /(\d+)\s*Nights/i.exec(String(duration || ''));
    return match ? parseInt(match[1], 10) : 0;
  }

  function findPackage(id) {
    return packages.find(function (item) { return item.id === id; });
  }

  function findDestination(id) {
    return destinations.find(function (item) { return item.id === id; });
  }

  function getDestinationCountry(dest) {
    if (!dest) return '';
    if (dest.destinationType === 'international') return dest.country && dest.country !== 'India' ? dest.country : 'International';
    if (dest.country === 'India') return 'India';
    return dest.country || '';
  }

  function getPackageCountry(pkg) {
    if (!pkg) return '';
    if (pkg.destinationCountry) return pkg.destinationCountry;
    if (pkg.destinationType === 'international') return pkg.country && pkg.country !== 'India' ? pkg.country : 'International';
    if (pkg.country === 'India') return 'India';
    return pkg.country || '';
  }

  function readJSON(key, fallback) {
    try {
      const value = global.localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      global.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  function readDraft() {
    return readJSON(DRAFT_KEY, null);
  }

  function saveDraft(draft) {
    writeJSON(DRAFT_KEY, draft);
  }

  function clearDraft() {
    try { global.localStorage.removeItem(DRAFT_KEY); } catch (error) { /* ignore */ }
  }

  function readBookings() {
    const list = readJSON(BOOKINGS_KEY, []);
    return Array.isArray(list) ? list : [];
  }

  function saveBooking(booking) {
    const list = readBookings();
    list.unshift(booking);
    writeJSON(BOOKINGS_KEY, list.slice(0, 25));
  }

  function formatDate(value, longForm) {
    if (!value) return 'To be confirmed';
    const date = new Date(value + (String(value).length === 10 ? 'T00:00:00' : ''));
    if (isNaN(date.getTime())) return value;
    return date.toLocaleDateString('en-IN', longForm
      ? { day: '2-digit', month: 'long', year: 'numeric' }
      : { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function tripFromPackage(pkg) {
    return {
      packageId: pkg.id,
      destinationId: pkg.destinationId,
      name: pkg.name,
      location: pkg.country === 'India' ? pkg.destinationName + ', ' + pkg.state : pkg.destinationName + ', ' + pkg.state,
      duration: pkg.duration,
      image: pkg.image,
      type: pkg.type,
      badgeClass: pkg.badgeClass,
      baseRate: pkg.startingPrice,
      meals: pkg.meals,
      transport: pkg.transport,
      country: pkg.country,
      custom: false
    };
  }

  function tripFromDestination(destination) {
    return {
      packageId: '',
      destinationId: destination.id,
      name: destination.name + ' Private Trip',
      location: destination.state + (destination.country === 'India' ? ', India' : ''),
      duration: destination.duration,
      image: destination.image,
      type: destination.type,
      badgeClass: destination.badgeClass,
      baseRate: destination.startingPrice,
      meals: 'Breakfast and selected meals to be confirmed',
      transport: 'Private transfers arranged on request',
      country: destination.country,
      custom: true
    };
  }

  function calculateFare(trip, travelers, stayKey) {
    const stay = STAY_OPTIONS[stayKey] || STAY_OPTIONS.standard;
    const count = Math.max(1, parseInt(travelers, 10) || 1);
    const stayNights = nights(trip.duration);
    const baseTotal = trip.baseRate * count;
    const stayTotal = stay.supplement * count * stayNights;
    const subtotal = baseTotal + stayTotal;
    const planningFee = 500;
    const taxes = Math.round((subtotal + planningFee) * 0.05);
    return {
      travelers: count,
      nights: stayNights,
      baseTotal: baseTotal,
      stayTotal: stayTotal,
      subtotal: subtotal,
      planningFee: planningFee,
      taxes: taxes,
      total: subtotal + planningFee + taxes,
      stayLabel: stay.label
    };
  }

  /* ------------------------------------------------------------------ */
  /* Booking page                                                        */
  /* ------------------------------------------------------------------ */

  function initBookingPage() {
    const form = document.getElementById('booking-form');
    if (!form) return;

    const select = document.getElementById('booking-package');
    const travelers = document.getElementById('booking-travelers');
    const dateInput = document.getElementById('booking-date');
    const stayInput = document.getElementById('booking-stay');
    const params = new URLSearchParams(global.location.search);

    const indiaGroup = document.createElement('optgroup');
    indiaGroup.label = 'India';
    const worldGroup = document.createElement('optgroup');
    worldGroup.label = 'International';

    packages.forEach(function (pkg) {
      const option = document.createElement('option');
      option.value = pkg.id;
      const pCountry = getPackageCountry(pkg);
      option.textContent = pkg.name + ' · ' + pkg.destinationName + ' (' + pCountry + ') · ' + pkg.duration + ' · ' + money(pkg.startingPrice);
      (pCountry === 'India' ? indiaGroup : worldGroup).appendChild(option);
    });
    select.appendChild(indiaGroup);
    select.appendChild(worldGroup);

    const requestedDestination = params.get('destination');
    const destination = requestedDestination ? findDestination(requestedDestination) : null;
    const destinationPackages = destination
      ? packages.filter(function (pkg) { return pkg.destinationId === destination.id; })
      : [];

    if (destination && !destinationPackages.length) {
      const customGroup = document.createElement('optgroup');
      customGroup.label = 'Custom destination';
      const option = document.createElement('option');
      option.value = 'destination:' + destination.id;
      option.textContent = destination.name + ' · Private trip · from ' + money(destination.startingPrice);
      customGroup.appendChild(option);
      select.appendChild(customGroup);
    }

    const requestedPackage = params.get('package');
    if (requestedPackage && findPackage(requestedPackage)) {
      select.value = requestedPackage;
    } else if (destination && destinationPackages.length) {
      select.value = destinationPackages[0].id;
    } else if (destination) {
      select.value = 'destination:' + destination.id;
    } else {
      select.value = 'the-himalayan-escape';
    }

    if (dateInput) {
      const now = new Date();
      const min = now.toISOString().slice(0, 10);
      const later = new Date(now.getTime() + 30 * 86400000).toISOString().slice(0, 10);
      dateInput.min = min;
      if (!dateInput.value || dateInput.value < min) dateInput.value = later;
    }

    function currentTrip() {
      if (select.value.indexOf('destination:') === 0) {
        const custom = findDestination(select.value.split(':')[1]);
        return custom ? tripFromDestination(custom) : tripFromPackage(packages[0]);
      }
      return tripFromPackage(findPackage(select.value) || packages[0]);
    }

    function updateSummary() {
      const trip = currentTrip();
      const fare = calculateFare(trip, travelers.value, stayInput.value);

      const setText = function (id, value) {
        const node = document.getElementById(id);
        if (node) node.textContent = value;
      };
      const image = document.getElementById('summary-image');
      if (image) {
        image.src = trip.image;
        image.alt = trip.name + ' travel preview';
      }
      setText('summary-pkg-name', trip.name);
      setText('summary-pkg-dest', trip.location + ' · ' + trip.duration);
      setText('summary-base-rate', money(trip.baseRate));
      setText('summary-travelers-count', fare.travelers);
      setText('summary-stay-label', fare.stayLabel);
      setText('summary-stay-cost', fare.stayTotal ? money(fare.stayTotal) : 'Included');
      setText('summary-meals', trip.meals);
      setText('summary-transport', trip.transport);
      setText('summary-planning-fee', money(fare.planningFee));
      setText('summary-taxes', money(fare.taxes));
      setText('summary-total-calc', money(fare.total));
    }

    [select, travelers, stayInput].forEach(function (element) {
      element.addEventListener('change', updateSummary);
      element.addEventListener('input', updateSummary);
    });
    updateSummary();

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const trip = currentTrip();
      const pkgForTrip = (trip.packageId && trip.packageId.indexOf('destination:') !== 0) ? findPackage(trip.packageId) : null;
      const destForTrip = trip.destinationId ? findDestination(trip.destinationId) : null;
      if (pkgForTrip && destForTrip) {
        const pCountry = getPackageCountry(pkgForTrip);
        const dCountry = getDestinationCountry(destForTrip);
        if (pkgForTrip.destinationId !== destForTrip.id || (pCountry && dCountry && pCountry !== dCountry && !(pCountry === 'India' && dCountry === 'India') && !(pCountry !== 'India' && dCountry !== 'India'))) {
          alert('Please select a package that matches your destination.');
          return;
        }
      }

      const fare = calculateFare(trip, travelers.value, stayInput.value);
      const draft = Object.assign({}, trip, fare, {
        destinationId: trip.destinationId,
        destinationName: destForTrip ? destForTrip.name : trip.name,
        country: destForTrip ? getDestinationCountry(destForTrip) : (pkgForTrip ? getPackageCountry(pkgForTrip) : trip.country),
        packageId: trip.packageId && trip.packageId.indexOf('destination:') === 0 ? '' : trip.packageId,
        packageName: trip.name,
        stayKey: stayInput.value,
        fullname: document.getElementById('booking-fullname').value.trim(),
        email: document.getElementById('booking-email').value.trim(),
        phone: document.getElementById('booking-phone').value.trim(),
        travelDate: dateInput.value,
        requests: document.getElementById('booking-requests').value.trim(),
        createdAt: new Date().toISOString()
      });
      saveDraft(draft);
      global.location.href = 'payment.html';
    });
  }

  /* ------------------------------------------------------------------ */
  /* Payment page                                                        */
  /* ------------------------------------------------------------------ */

  function initPaymentTabs() {
    const tabs = Array.prototype.slice.call(document.querySelectorAll('.payment-tab'));
    const sections = Array.prototype.slice.call(document.querySelectorAll('.payment-section'));
    if (!tabs.length || !sections.length) return;

    function activate(tab) {
      tabs.forEach(function (item) {
        const active = item === tab;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', active ? 'true' : 'false');
        item.setAttribute('tabindex', active ? '0' : '-1');
      });
      sections.forEach(function (section) {
        section.hidden = section.id !== tab.getAttribute('data-target');
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { activate(tab); });
      tab.addEventListener('keydown', function (event) {
        const index = tabs.indexOf(tab);
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          const next = event.key === 'ArrowRight'
            ? tabs[(index + 1) % tabs.length]
            : tabs[(index - 1 + tabs.length) % tabs.length];
          next.focus();
          activate(next);
        }
      });
    });
    activate(tabs[0]);
  }

  function fallbackDraft() {
    const pkg = packages[0];
    const trip = tripFromPackage(pkg);
    const fare = calculateFare(trip, 2, 'standard');
    return Object.assign({}, trip, fare, {
      stayKey: 'standard',
      fullname: '',
      email: '',
      phone: '',
      travelDate: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
      requests: '',
      preview: true
    });
  }

  function initPaymentPage() {
    const form = document.getElementById('payment-form');
    if (!form) return;

    const storedDraft = readDraft();
    const draft = storedDraft || fallbackDraft();
    const notice = document.getElementById('payment-draft-notice');
    if (notice) notice.hidden = !!storedDraft;

    function setText(id, value) {
      const node = document.getElementById(id);
      if (node) node.textContent = value;
    }

    const payDest = draft.destinationName || draft.location;
    const payCountry = draft.country || '';
    setText('payment-pkg-name', draft.packageName || draft.name);
    setText('payment-pkg-dest', payDest + (payCountry ? ' · ' + payCountry : '') + ' · ' + draft.duration);
    setText('payment-traveler', draft.fullname || 'Add traveler details');
    setText('payment-group', draft.travelers + (draft.travelers === 1 ? ' Traveler' : ' Travelers'));
    setText('payment-date', formatDate(draft.travelDate));
    setText('payment-fare', money(draft.baseTotal) + ' (' + money(draft.baseRate) + ' × ' + draft.travelers + ')');
    setText('payment-stay', draft.stayTotal ? money(draft.stayTotal) : 'Included');
    setText('payment-fee', money(draft.planningFee));
    setText('payment-taxes', money(draft.taxes));
    setText('payment-total', money(draft.total));

    const nameInput = document.getElementById('billing-name');
    const emailInput = document.getElementById('billing-email');
    if (nameInput) nameInput.value = draft.fullname || '';
    if (emailInput) emailInput.value = draft.email || '';

    initPaymentTabs();

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const errorBox = document.getElementById('payment-error');
      const activeTab = document.querySelector('.payment-tab.active');
      const method = activeTab ? activeTab.getAttribute('data-target') : 'tab-upi';
      const fullname = (nameInput ? nameInput.value : '').trim();
      const email = (emailInput ? emailInput.value : '').trim();
      let message = '';

      if (!fullname) message = 'Please enter the lead traveler name for the invoice.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) message = 'Please enter a valid email address for the booking confirmation.';
      else if (method === 'tab-upi') {
        const upi = (document.getElementById('upi-id').value || '').trim();
        if (!/^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(upi)) message = 'Enter a valid UPI ID, for example name@bank.';
      } else if (method === 'tab-card') {
        const number = (document.getElementById('card-number').value || '').replace(/\s/g, '');
        const expiry = (document.getElementById('card-expiry').value || '').trim();
        const cvv = (document.getElementById('card-cvv').value || '').trim();
        if (!/^\d{13,19}$/.test(number)) message = 'Enter a valid card number (13–19 digits).';
        else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) message = 'Enter the card expiry as MM/YY.';
        else if (!/^\d{3,4}$/.test(cvv)) message = 'Enter the 3 or 4 digit CVV.';
      } else {
        const bank = document.getElementById('netbanking-bank').value;
        if (!bank) message = 'Select your bank to continue.';
      }

      if (message) {
        if (errorBox) {
          errorBox.textContent = message;
          errorBox.hidden = false;
        }
        return;
      }

      if (errorBox) errorBox.hidden = true;

      const methodLabel = method === 'tab-upi' ? 'UPI' : (method === 'tab-card' ? 'Credit / Debit Card' : 'Net Banking');
      const ref = 'RI-' + new Date().getFullYear() + '-' + Math.random().toString(36).slice(2, 7).toUpperCase();
      const booking = Object.assign({}, draft, {
        ref: ref,
        bookingId: ref,
        fullname: fullname,
        email: email,
        paymentMethod: methodLabel,
        status: 'Confirmed',
        paidAt: new Date().toISOString(),
        bookingDate: new Date().toISOString().slice(0, 10),
        preview: false
      });
      saveBooking(booking);
      clearDraft();
      global.location.href = 'booking-confirmation.html?ref=' + encodeURIComponent(ref);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Confirmation page                                                   */
  /* ------------------------------------------------------------------ */

  function latestBooking(ref) {
    const bookings = readBookings();
    if (ref) {
      const found = bookings.find(function (booking) { return booking.ref === ref; });
      if (found) return found;
    }
    return bookings[0] || null;
  }

  function initConfirmationPage() {
    const host = document.getElementById('confirmation-root');
    if (!host) return;
    const params = new URLSearchParams(global.location.search);
    const booking = latestBooking(params.get('ref'));

    if (!booking) {
      host.innerHTML = '<div class="confirmation-card">' +
        '<div class="confirmation-header">' +
          '<span class="badge badge-nature">No reservation found</span>' +
          '<h1>We couldn’t find that booking</h1>' +
          '<p class="lead">This link may have expired, or the booking was completed in another browser. Start a new reservation or contact our travel desk for help.</p>' +
        '</div>' +
        '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">' +
          '<a class="btn btn-primary" href="booking.html">Start a Booking</a>' +
          '<a class="btn btn-secondary" href="booking-history.html">View Booking History</a>' +
          '<a class="btn btn-light" href="contact.html">Contact Support</a>' +
        '</div>' +
      '</div>';
      return;
    }

    document.title = 'Booking ' + booking.ref + ' Confirmed | Roam India';
    const receipt = [
      ['Tour package', booking.packageName || booking.name],
      ['Destination', (booking.destinationName || booking.location) + (booking.country ? ' · ' + booking.country : '')],
      ['Primary traveler', booking.fullname],
      ['Group size', booking.travelers + (booking.travelers === 1 ? ' Traveler' : ' Travelers') + ' · ' + (booking.stayLabel || 'Standard')],
      ['Departure date', formatDate(booking.travelDate, true) + ' · ' + (booking.duration || '')],
      ['Total package fare', money(booking.total) + ' (paid via ' + booking.paymentMethod + ')'],
      ['Reservation status', 'Confirmed'],
      ['Support', 'support@roamindia.in']
    ];

    host.innerHTML = '<div class="confirmation-card">' +
      '<div class="success-badge" aria-hidden="true">✓</div>' +
      '<div class="confirmation-header">' +
        '<span class="badge badge-nature">Reservation completed</span>' +
        '<h1>Booking confirmed</h1>' +
        '<p class="lead">Thank you, ' + escapeHtml(booking.fullname.split(' ')[0]) + '. Your trip is reserved and a confirmation has been prepared for ' + escapeHtml(booking.email) + '.</p>' +
        '<div class="booking-ref">Booking reference: <strong>#' + escapeHtml(booking.ref) + '</strong></div>' +
      '</div>' +
      '<div class="receipt-details"><div class="receipt-grid">' +
        receipt.map(function (row) {
          return '<div class="receipt-item"><small>' + escapeHtml(row[0]) + '</small><strong>' + escapeHtml(row[1]) + '</strong></div>';
        }).join('') +
      '</div></div>' +
      '<h3 style="margin-bottom:16px;">What happens next</h3>' +
      '<ul class="steps-checklist">' +
        '<li><span class="step-num">1</span><div><strong>Booking review</strong><p style="margin:4px 0 0;color:var(--muted);font-size:0.88rem;">Our travel desk reviews the dates and confirms hotel allocations for ' + escapeHtml(booking.name) + '.</p></div></li>' +
        '<li><span class="step-num">2</span><div><strong>Travel documents</strong><p style="margin:4px 0 0;color:var(--muted);font-size:0.88rem;">Your final itinerary, stay details and transfer notes are shared by email before departure.</p></div></li>' +
        '<li><span class="step-num">3</span><div><strong>Pre-trip check-in</strong><p style="margin:4px 0 0;color:var(--muted);font-size:0.88rem;">A travel advisor contacts you to confirm pick-up timings and answer any last questions.</p></div></li>' +
      '</ul>' +
      '<div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">' +
        '<button class="btn btn-secondary" type="button" onclick="window.print()">Print / Save Voucher</button>' +
        '<a class="btn btn-primary" href="booking-history.html">View Booking History ↗</a>' +
        '<a class="btn btn-light" href="index.html">Return to Homepage</a>' +
      '</div>' +
    '</div>';
  }

  /* ------------------------------------------------------------------ */
  /* History page                                                        */
  /* ------------------------------------------------------------------ */

  function initHistoryPage() {
    const host = document.getElementById('saved-bookings');
    if (!host) return;

    const bookings = readBookings();
    const emptyNote = document.getElementById('saved-bookings-empty');
    if (emptyNote) emptyNote.hidden = bookings.length > 0;

    if (bookings.length) {
      host.innerHTML = bookings.map(function (booking) {
        return '<article class="history-card">' +
          '<img class="history-img" src="' + escapeHtml(booking.image) + '" alt="' + escapeHtml(booking.name + ' trip') + '" loading="lazy">' +
          '<div class="history-info">' +
            '<div class="history-status-row"><span class="status-pill status-confirmed">' + escapeHtml(booking.status) + '</span><span class="history-ref">#' + escapeHtml(booking.ref) + '</span></div>' +
            '<h3>' + escapeHtml(booking.name) + '</h3>' +
            '<p class="history-location">' + escapeHtml(booking.location) + ' · ' + escapeHtml(booking.duration) + '</p>' +
            '<div class="history-meta">' +
              '<span><strong>Travel date:</strong> ' + formatDate(booking.travelDate) + '</span>' +
              '<span><strong>Travelers:</strong> ' + booking.travelers + '</span>' +
              '<span><strong>Paid:</strong> ' + money(booking.total) + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="history-actions">' +
            '<a class="btn btn-primary btn-sm" href="booking-confirmation.html?ref=' + encodeURIComponent(booking.ref) + '">View Voucher ↗</a>' +
            '<a class="btn btn-light btn-sm" href="booking.html?package=' + encodeURIComponent(booking.packageId || '') + '">Book Again</a>' +
          '</div>' +
        '</article>';
      }).join('');
    }

    const total = bookings.length + 3;
    const upcoming = bookings.length + 1;
    const completed = 2;
    const setText = function (id, value) {
      const node = document.getElementById(id);
      if (node) node.textContent = value;
    };
    setText('history-total-count', total);
    setText('history-total-label', total + ' Reservations');
    setText('history-upcoming-count', upcoming);
    setText('history-upcoming-label', upcoming + (upcoming === 1 ? ' Confirmed Trip' : ' Confirmed Trips'));
    setText('history-completed-count', completed);
    setText('history-completed-label', completed + ' Past Voyages');

    const clearButton = document.getElementById('clear-saved-bookings');
    if (clearButton) {
      clearButton.hidden = bookings.length === 0;
      clearButton.addEventListener('click', function () {
        if (!global.confirm('Remove the bookings saved in this browser?')) return;
        try { global.localStorage.removeItem(BOOKINGS_KEY); } catch (error) { /* ignore */ }
        global.location.reload();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initBookingPage();
    initPaymentPage();
    initConfirmationPage();
    initHistoryPage();
  });
})(window);
