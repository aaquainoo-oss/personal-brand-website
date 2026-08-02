/* =========================================================
   Ayeshia Quainoo-Tefera — Personal Brand
   Interactions: nav, scroll header, animated stats,
   reveal-on-scroll, and contact form.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Current year in footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header background on scroll ---------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 40) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation toggle ---------- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    // Close menu when a link is clicked
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Animated statistics counters ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-target"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1600;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.floor(eased * target);
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + suffix;
    }
    requestAnimationFrame(step);
  }

  var statNumbers = document.querySelectorAll(".stat__number");
  if ("IntersectionObserver" in window && statNumbers.length) {
    var statObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    statNumbers.forEach(function (el) { statObserver.observe(el); });
  } else {
    statNumbers.forEach(function (el) {
      el.textContent = (parseInt(el.getAttribute("data-target"), 10) || 0).toLocaleString() + (el.getAttribute("data-suffix") || "");
    });
  }

  /* ---------- Reveal-on-scroll ---------- */
  var revealTargets = document.querySelectorAll(
    ".section__head, .about__story, .about__cards, .values, .org-card, .fw-card, .timeline__item, .topic-card, .testimonial, .resource-card, .media-card, .contact__form, .contact__aside, .impact__map, .program-card, .teaser-grid"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Contact form ----------
     Submissions are captured via Formspree (https://formspree.io) — a hosted
     form backend that emails you each inquiry, no server of your own required.

     SETUP: create a free form at formspree.io, then paste your form URL below
     (it looks like https://formspree.io/f/abcdwxyz). Until you do, the form
     falls back to opening the visitor's email app so nothing breaks.
  */
  var FORMSPREE_ENDPOINT = "https://formspree.io/f/mnjeplna";
  var FORMSPREE_READY = FORMSPREE_ENDPOINT.indexOf("your-form-id") === -1;

  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  var submitBtn = document.getElementById("formSubmit");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var reason = form.reason.value;
      var message = form.message.value.trim();

      if (!name || !email || !message) {
        setStatus("Please complete all required fields.", "is-err");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus("Please enter a valid email address.", "is-err");
        return;
      }

      // Not configured yet → graceful mailto fallback.
      if (!FORMSPREE_READY || !window.fetch) {
        var subject = encodeURIComponent("[" + reason + "] from " + name);
        var body = encodeURIComponent(
          "Name: " + name + "\nEmail: " + email + "\nReason: " + reason + "\n\n" + message
        );
        window.location.href =
          "mailto:aaquainoo@theultimatecarellc.com?subject=" + subject + "&body=" + body;
        setStatus("Opening your email app… If nothing happens, email aaquainoo@theultimatecarellc.com directly.", "is-ok");
        form.reset();
        return;
      }

      // Configured → submit to Formspree via AJAX (visitor stays on the page).
      setBusy(true);
      setStatus("Sending…", "");

      fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      })
        .then(function (res) {
          if (res.ok) {
            setStatus("Thank you! Your message has been sent — I'll be in touch soon.", "is-ok");
            form.reset();
          } else {
            return res.json().then(function (data) {
              var msg =
                data && data.errors && data.errors.length
                  ? data.errors.map(function (er) { return er.message; }).join(", ")
                  : "Something went wrong. Please email aaquainoo@theultimatecarellc.com directly.";
              setStatus(msg, "is-err");
            });
          }
        })
        .catch(function () {
          setStatus("Network error. Please email aaquainoo@theultimatecarellc.com directly.", "is-err");
        })
        .finally(function () {
          setBusy(false);
        });
    });
  }

  function setBusy(busy) {
    if (!submitBtn) return;
    submitBtn.disabled = busy;
    submitBtn.textContent = busy ? "Sending…" : "Send Message";
  }

  function setStatus(msg, cls) {
    if (!status) return;
    status.textContent = msg;
    status.className = "contact__status " + cls;
  }
})();
