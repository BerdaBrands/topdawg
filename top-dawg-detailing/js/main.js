document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky nav shadow on scroll ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Smooth scroll (native CSS handles most; JS fallback for older browsers) ---------- */
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented) return;
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const targetId = anchor.getAttribute('href');
    if (targetId.length <= 1) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* ---------- Services / Pricing toggle (Shop Drop-Off vs Mobile) ---------- */
  const toggleButtons = document.querySelectorAll('.toggle__btn');
  const panels = {
    dropoff: document.getElementById('panelDropoff'),
    mobile: document.getElementById('panelMobile')
  };

  function setMode(mode) {
    toggleButtons.forEach(btn => {
      const active = btn.dataset.mode === mode;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    Object.keys(panels).forEach(key => {
      panels[key].hidden = key !== mode;
    });
  }

  toggleButtons.forEach(btn => btn.addEventListener('click', () => setMode(btn.dataset.mode)));

  /* ---------- Before / After slider ---------- */
  const baSlider = document.getElementById('baSlider');
  const baInput = document.getElementById('baInput');

  if (baSlider && baInput) {
    const updateSlider = () => baSlider.style.setProperty('--pos', baInput.value + '%');
    updateSlider();
    baInput.addEventListener('input', updateSlider);

    // Keep mouse-wheel scrolling over the slider from changing its value instead of scrolling the page.
    baInput.addEventListener('wheel', (e) => {
      e.preventDefault();
      window.scrollBy(0, e.deltaY);
    }, { passive: false });
  }

  /* ---------- Project viewer ---------- */
  const modal = document.getElementById('projectModal');
  const stage = document.getElementById('projectStage');
  const image = document.getElementById('projectImage');
  const counter = document.getElementById('projectCounter');
  const caption = document.getElementById('projectCaption');
  const thumbsEl = document.getElementById('projectThumbs');
  const prevBtn = document.getElementById('projectPrev');
  const nextBtn = document.getElementById('projectNext');
  const closeBtn = document.getElementById('projectClose');
  const bookBtn = document.getElementById('projectBook');
  const kickerEl = document.getElementById('projectKicker');
  const titleEl = document.getElementById('projectTitle');
  const descEl = document.getElementById('projectDescription');
  const servicesEl = document.getElementById('projectServices');
  const cards = document.querySelectorAll('.project-card[data-project]');
  const projectsSection = document.getElementById('projects');

  let photos = [];
  let index = 0;
  let projectTitle = '';
  let activeId = '';

  cards.forEach(card => {
    const count = card.querySelector('.project-card__count');
    const total = card.querySelectorAll('.project-data__photos a').length;
    if (count) count.textContent = total + (total === 1 ? ' photo' : ' photos');
  });

  function preload(i) {
    if (!photos.length) return;
    const p = photos[(i + photos.length) % photos.length];
    new Image().src = p.full;
  }

  function showPhoto(i) {
    index = (i + photos.length) % photos.length;
    const photo = photos[index];
    const token = photo.full;

    stage.classList.add('is-loading');
    const loader = new Image();
    loader.onload = loader.onerror = () => {
      if (photos[index] && photos[index].full !== token) return;
      image.src = photo.full;
      image.alt = projectTitle + ': ' + photo.caption;
      stage.classList.remove('is-loading');
    };
    loader.src = photo.full;

    counter.textContent = (index + 1) + ' / ' + photos.length;
    caption.textContent = photo.caption;

    thumbsEl.querySelectorAll('.project-viewer__thumb').forEach((btn, n) => {
      const active = n === index;
      btn.setAttribute('aria-current', String(active));
      if (active) btn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    });

    preload(index + 1);
    preload(index - 1);
  }

  function openProject(card, opts) {
    const data = card.querySelector('.project-data');
    if (!data) return;

    projectTitle = card.querySelector('.project-card__title').textContent;
    activeId = card.dataset.project;

    kickerEl.textContent = card.querySelector('.project-card__kicker').textContent;
    titleEl.textContent = projectTitle;
    descEl.textContent = data.querySelector('.project-data__description').textContent;

    servicesEl.replaceChildren();
    data.querySelectorAll('.project-data__services li').forEach(li => {
      const item = document.createElement('li');
      item.textContent = li.textContent;
      servicesEl.appendChild(item);
    });

    photos = Array.from(data.querySelectorAll('.project-data__photos a')).map(a => ({
      full: a.getAttribute('href'),
      thumb: a.dataset.thumb || a.getAttribute('href'),
      caption: a.textContent.trim()
    }));

    thumbsEl.replaceChildren();
    photos.forEach((photo, n) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'project-viewer__thumb';
      btn.setAttribute('aria-label', 'Show photo ' + (n + 1) + ': ' + photo.caption);
      const img = document.createElement('img');
      img.src = photo.thumb;
      img.alt = '';
      btn.appendChild(img);
      btn.addEventListener('click', () => showPhoto(n));
      thumbsEl.appendChild(btn);
    });

    const multiple = photos.length > 1;
    prevBtn.hidden = !multiple;
    nextBtn.hidden = !multiple;
    thumbsEl.hidden = !multiple;
    counter.hidden = !multiple;

    image.removeAttribute('src');
    showPhoto(0);

    document.documentElement.classList.add('is-modal-open');
    if (!modal.open) modal.showModal();
    modal.scrollTop = 0;

    if (!(opts && opts.silent)) history.replaceState(null, '', '#project-' + activeId);
  }

  let scrollToContact = false;

  function afterClose() {
    if (modal.open) return;
    document.documentElement.classList.remove('is-modal-open');
    if (location.hash.startsWith('#project-')) history.replaceState(null, '', '#projects');
    if (scrollToContact) {
      scrollToContact = false;
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function closeProject() {
    if (modal.open) modal.close();
    afterClose();
  }

  // Also covers Esc, which closes the dialog natively.
  modal.addEventListener('close', afterClose);

  cards.forEach(card => {
    const opener = card.querySelector('.project-card__open');
    if (opener) opener.addEventListener('click', () => openProject(card));
  });

  prevBtn.addEventListener('click', () => showPhoto(index - 1));
  nextBtn.addEventListener('click', () => showPhoto(index + 1));
  closeBtn.addEventListener('click', closeProject);

  // Clicks on the backdrop land on the dialog element itself.
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProject();
  });

  modal.addEventListener('keydown', (e) => {
    if (photos.length < 2) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); showPhoto(index - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); showPhoto(index + 1); }
  });

  // Swipe between photos on touch screens
  let swipeStartX = null;
  stage.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    swipeStartX = e.clientX;
  });
  stage.addEventListener('pointerup', (e) => {
    if (swipeStartX === null || photos.length < 2) return;
    const dx = e.clientX - swipeStartX;
    swipeStartX = null;
    if (Math.abs(dx) > 50) showPhoto(index + (dx < 0 ? 1 : -1));
  });
  stage.addEventListener('pointercancel', () => { swipeStartX = null; });

  // "Book This Service" closes the viewer and scrolls to the contact section
  bookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToContact = true;
    closeProject();
  });

  // Deep link: index.html#project-pathfinder opens that project
  const hashMatch = location.hash.match(/^#project-(.+)$/);
  if (hashMatch) {
    const card = document.querySelector('.project-card[data-project="' + hashMatch[1] + '"]');
    if (card) {
      if (projectsSection) projectsSection.scrollIntoView({ behavior: 'auto', block: 'start' });
      openProject(card, { silent: true });
    }
  }

  /* ---------- Scroll reveal animations ---------- */
  const revealTargets = document.querySelectorAll(
    '.services .section-title, .services .toggle, .price-card, .travel-fee, .why-us__title, .why-us__item, ' +
    '.projects .section-title, .project-card, .before-after, ' +
    '.about__text, .about__card, ' +
    '.contact .section-title, .contact__quick-actions, .contact__location'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('is-visible');
        revealObserver.unobserve(el);
        // Drop the reveal classes once finished so hover effects can use transform again.
        el.addEventListener('transitionend', function done(ev) {
          if (ev.target !== el || ev.propertyName !== 'transform') return;
          el.classList.remove('reveal', 'is-visible');
          el.removeEventListener('transitionend', done);
        });
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
