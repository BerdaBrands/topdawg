document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky nav shadow on scroll ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
