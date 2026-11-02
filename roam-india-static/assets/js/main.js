/**
 * ROAM INDIA — Shared navigation behaviour
 *
 * Keeps the mobile drawer accessible and predictable across pages.
 * Page-specific rendering lives in destinations.js, packages.js and booking.js.
 */
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (!navToggle || !mainNav) return;

  function closeNav() {
    navToggle.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('open');
    document.body.classList.remove('nav-open');
  }

  navToggle.addEventListener('click', function () {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    mainNav.classList.toggle('open', !open);
    document.body.classList.toggle('nav-open', !open);
  });

  mainNav.addEventListener('click', function (event) {
    if (event.target.closest('a')) closeNav();
  });

  document.addEventListener('click', function (event) {
    if (!mainNav.classList.contains('open')) return;
    if (!navToggle.contains(event.target) && !mainNav.contains(event.target)) closeNav();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && mainNav.classList.contains('open')) {
      closeNav();
      navToggle.focus();
    }
  });
});
