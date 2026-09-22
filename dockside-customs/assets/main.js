// Dockside Customs - shared site behavior

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- mobile nav toggle ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  var scrim = document.querySelector(".nav-scrim");

  function closeNav() {
    toggle.classList.remove("is-active");
    nav.classList.remove("is-open");
    scrim.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  if (toggle && nav && scrim) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-active", isOpen);
      scrim.classList.toggle("is-open", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    scrim.addEventListener("click", closeNav);
  }

  /* ---------- mobile dropdown (Services) ---------- */
  document.querySelectorAll(".has-dropdown > a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 860) {
        e.preventDefault();
        link.parentElement.classList.toggle("is-open");
      }
    });
  });

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- gallery filter (gallery.html) ---------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var galleryItems = document.querySelectorAll(".gallery-grid [data-category]");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");
      var category = btn.getAttribute("data-filter");

      galleryItems.forEach(function (item) {
        var show = category === "all" || item.getAttribute("data-category") === category;
        item.style.display = show ? "" : "none";
      });
    });
  });

  /* ---------- lightbox (gallery.html) ---------- */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lightboxImage = document.getElementById("lightbox-image");
    var lightboxTitle = document.getElementById("lightbox-title");
    var lightboxCounter = document.getElementById("lightbox-counter");
    var lightboxPrev = document.getElementById("lightbox-prev");
    var lightboxNext = document.getElementById("lightbox-next");
    var lightboxClose = document.getElementById("lightbox-close");
    var lastFocused = null;
    var state = { images: [], title: "", index: 0 };

    function renderLightbox() {
      var total = state.images.length;
      lightboxImage.src = state.images[state.index];
      lightboxImage.alt = state.title;
      lightboxTitle.textContent = state.title;
      lightboxCounter.textContent = total > 1 ? (state.index + 1) + " of " + total : "";
      var showNav = total > 1;
      lightboxPrev.style.display = showNav ? "flex" : "none";
      lightboxNext.style.display = showNav ? "flex" : "none";
    }

    function openLightbox(images, title, triggerEl) {
      state.images = images;
      state.title = title;
      state.index = 0;
      lastFocused = triggerEl || document.activeElement;
      renderLightbox();
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
      lightboxClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      if (lastFocused) {
        lastFocused.focus();
      }
    }

    function showNext() {
      state.index = (state.index + 1) % state.images.length;
      renderLightbox();
    }

    function showPrev() {
      state.index = (state.index - 1 + state.images.length) % state.images.length;
      renderLightbox();
    }

    document.querySelectorAll(".gallery-item[data-images]").forEach(function (item) {
      item.addEventListener("click", function () {
        var images = JSON.parse(item.getAttribute("data-images"));
        var title = item.getAttribute("data-title") || "";
        openLightbox(images, title, item);
      });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxNext.addEventListener("click", showNext);
    lightboxPrev.addEventListener("click", showPrev);

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) {
        return;
      }
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        showNext();
      } else if (e.key === "ArrowLeft") {
        showPrev();
      }
    });
  }

});
