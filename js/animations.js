(function () {
  "use strict";

  // Terminal loader text
  const loaderEl = document.getElementById("loader-text");
  if (loaderEl) {
    const lines = [
      "> booting portfolio...",
      "> loading modules...",
      "> Ibrahim.init()",
      "> status: ready"
    ];
    let i = 0;
    const typeLoader = () => {
      if (i < lines.length) {
        loaderEl.textContent = lines[i];
        i += 1;
        setTimeout(typeLoader, 400);
      }
    };
    typeLoader();
  }

  // Scroll reveal for sections
  const sections = document.querySelectorAll(".content-panel > section, footer");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  sections.forEach((section, index) => {
    section.style.transitionDelay = `${Math.min(index * 0.05, 0.3)}s`;
    sectionObserver.observe(section);
  });

  // Stagger skill tags
  const skillTags = document.querySelectorAll(".skill-tag");
  const tagObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const tags = entry.target.querySelectorAll(".skill-tag");
          tags.forEach((tag, i) => {
            setTimeout(() => tag.classList.add("visible"), i * 40);
          });
          tagObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll(".skill-tags").forEach((group) => tagObserver.observe(group));

  // Duplicate marquee for seamless loop
  const marquee = document.querySelector(".tech-marquee");
  if (marquee) {
    marquee.innerHTML += marquee.innerHTML;
  }

  // Active nav highlight on scroll
  const navLinks = document.querySelectorAll(".sidebar-nav a");
  const scrollSections = [];
  navLinks.forEach((link) => {
    const id = link.getAttribute("href");
    if (id && id.startsWith("#")) {
      const el = document.querySelector(id);
      if (el) scrollSections.push({ el, link });
    }
  });

  const onScroll = () => {
    const scrollY = window.scrollY + 120;
    let current = scrollSections[0];
    scrollSections.forEach((item) => {
      if (item.el.offsetTop <= scrollY) current = item;
    });
    navLinks.forEach((l) => l.classList.remove("active"));
    if (current) current.link.classList.add("active");
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = document.querySelector(".theme-label");

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeLabel) {
      themeLabel.textContent = theme === "dark" ? "Light mode" : "Dark mode";
    }
  };

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  const savedTheme = document.documentElement.getAttribute("data-theme") || "dark";
  if (themeLabel) {
    themeLabel.textContent = savedTheme === "dark" ? "Light mode" : "Dark mode";
  }

  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches ? "light" : "dark");
    }
  });
})();
