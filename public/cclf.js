// theme-toggle.js – script for theme switching and responsive mobile sidebar

document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const burger = document.querySelector('button.burger');
  const nav = document.querySelector('nav');
  const themeBtn = document.querySelector('button.switchTheme');

  // ---- Theme toggle ------------------------------------------------------
  themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
  });

  // ---- Mobile navigation handling ---------------------------------------
  const openNav = () => {
    nav.classList.add('open');
    burger.classList.add('open'); // change burger to cross via CSS
  };
  const closeNav = () => {
    nav.classList.remove('open');
    burger.classList.remove('open');
  };

  // Burger click – toggle nav
  burger.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Close nav when a link inside the nav is clicked
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      closeNav();
    }
  });

  // Close nav when clicking outside the nav (the remaining 20% area)
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) {
      closeNav();
    }
  });

  // ---- Resize handling ---------------------------------------------------
  const handleResize = () => {
    if (window.innerWidth >= 600) {
      // Desktop: ensure nav is visible and burger is reset
      nav.classList.remove('open');
      burger.classList.remove('open');
    } else {
      // Mobile: start closed
      closeNav();
    }
  };
  window.addEventListener('resize', handleResize);
  // Initial state
  handleResize();
});
