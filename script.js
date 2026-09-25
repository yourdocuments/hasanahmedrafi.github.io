```javascript
/* =========================================================
   HASAN AHMED RAFI
   ULTRA PREMIUM UX/UI DESIGNER PORTFOLIO
   script.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =======================================================
     01. ELEMENT SELECTORS
  ======================================================= */

  const body = document.body;

  const loader = document.querySelector(".page-loader");

  const header = document.querySelector(".site-header");

  const menuToggle = document.querySelector(".menu-toggle");

  const mobileMenu = document.querySelector(".mobile-menu");

  const mobileClose = document.querySelector(".mobile-close");

  const mobileLinks = document.querySelectorAll(".mobile-nav a");

  const backTop = document.querySelector(".back-top");

  const cursorDot = document.querySelector(".cursor-dot");

  const cursorOutline = document.querySelector(".cursor-outline");

  const cursor = document.querySelector(".cursor");

  const revealElements =
    document.querySelectorAll(".reveal");

  const navLinks =
    document.querySelectorAll(".nav-link");

  const sections =
    document.querySelectorAll("section[id]");

  const projectLinks =
    document.querySelectorAll("[data-project]");

  const modal =
    document.querySelector(".project-modal");

  const modalBackdrop =
    document.querySelector(".modal-backdrop");

  const modalClose =
    document.querySelector(".modal-close");

  const modalContent =
    document.querySelector(".modal-content");

  const counters =
    document.querySelectorAll("[data-count]");


  /* =======================================================
     02. PAGE LOADER
  ======================================================= */

  window.addEventListener("load", () => {

    setTimeout(() => {

      if (loader) {
        loader.classList.add("loaded");
      }

      document.body.classList.add("page-loaded");

    }, 700);

  });


  /* =======================================================
     03. HEADER SCROLL EFFECT
  ======================================================= */

  const updateHeader = () => {

    if (!header) return;

    if (window.scrollY > 40) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  };


  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =======================================================
     04. MOBILE MENU
  ======================================================= */

  const openMenu = () => {

    if (!mobileMenu) return;

    mobileMenu.classList.add("open");

    body.classList.add("menu-open");

    if (menuToggle) {
      menuToggle.setAttribute(
        "aria-expanded",
        "true"
      );
    }

  };


  const closeMenu = () => {

    if (!mobileMenu) return;

    mobileMenu.classList.remove("open");

    body.classList.remove("menu-open");

    if (menuToggle) {
      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );
    }

  };


  if (menuToggle) {

    menuToggle.addEventListener(
      "click",
      openMenu
    );

  }


  if (mobileClose) {

    mobileClose.addEventListener(
      "click",
      closeMenu
    );

  }


  mobileLinks.forEach((link) => {

    link.addEventListener(
      "click",
      closeMenu
    );

  });


  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        closeMenu();

        closeProjectModal();

      }

    }
  );


  /* =======================================================
     05. SMOOTH SCROLL
  ======================================================= */

  const smoothScrollTo = (target) => {

    if (!target) return;

    const targetElement =
      document.querySelector(target);

    if (!targetElement) return;

    const headerOffset =
      header
        ? header.offsetHeight
        : 0;

    const targetPosition =
      targetElement.getBoundingClientRect().top +
      window.scrollY -
      headerOffset;

    window.scrollTo({

      top: targetPosition,

      behavior: "smooth"

    });

  };


  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const href =
            link.getAttribute("href");

          if (
            !href ||
            href === "#" ||
            href.length < 2
          ) {
            return;
          }

          const target =
            document.querySelector(href);

          if (!target) return;

          event.preventDefault();

          closeMenu();

          smoothScrollTo(href);

        }
      );

    });


  /* =======================================================
     06. SCROLL REVEAL
  ======================================================= */

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,

          rootMargin: "0px 0px -50px 0px"
        }
      );


    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach((element) => {

      element.classList.add("visible");

    });

  }


  /* =======================================================
     07. ACTIVE NAVIGATION
  ======================================================= */

  if (
    "IntersectionObserver" in window &&
    sections.length &&
    navLinks.length
  ) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            const id =
              entry.target.getAttribute("id");

            navLinks.forEach((link) => {

              const href =
                link.getAttribute("href");

              link.classList.toggle(
                "active",
                href === `#${id}`
              );

            });

          });

        },
        {
          threshold: 0.25,

          rootMargin:
            "-20% 0px -55% 0px"
        }
      );


    sections.forEach((section) => {

      sectionObserver.observe(section);

    });

  }


  /* =======================================================
     08. CUSTOM CURSOR
  ======================================================= */

  const supportsFinePointer =
    window.matchMedia(
      "(pointer: fine)"
    ).matches;


  if (
    supportsFinePointer &&
    cursor &&
    cursorDot &&
    cursorOutline
  ) {

    let mouseX = window.innerWidth / 2;

    let mouseY = window.innerHeight / 2;

    let outlineX = mouseX;

    let outlineY = mouseY;


    body.classList.add(
      "cursor-active"
    );


    document.addEventListener(
      "mousemove",
      (event) => {

        mouseX = event.clientX;

        mouseY = event.clientY;

        cursorDot.style.transform =
          `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      }
    );


    const animateCursor = () => {

      outlineX +=
        (mouseX - outlineX) * 0.15;

      outlineY +=
        (mouseY - outlineY) * 0.15;


      cursorOutline.style.transform =
        `translate3d(${outlineX}px, ${outlineY}px, 0)`;


      requestAnimationFrame(
        animateCursor
      );

    };


    animateCursor();


    const interactiveElements =
      document.querySelectorAll(
        "a, button, .project, .tool-card, .circle-link"
      );


    interactiveElements.forEach(
      (element) => {

        element.addEventListener(
          "mouseenter",
          () => {

            body.classList.add(
              "cursor-hover"
            );

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            body.classList.remove(
              "cursor-hover"
            );

          }
        );

      }
    );

  }


  /* =======================================================
     09. PROJECT DATA
  ======================================================= */

  const projects = {

    project1: {

      category:
        "01 / PRODUCT EXPERIENCE",

      title:
        "Finora Banking",

      description:
        "A premium digital banking experience designed around clarity, trust and effortless financial control. The interface simplifies complex financial information into a focused and intuitive product experience.",

      tags: [
        "UX Strategy",
        "Product Design",
        "UI Design",
        "Design System",
        "Prototype"
      ]

    },


    project2: {

      category:
        "02 / MOBILE EXPERIENCE",

      title:
        "Luma Health",

      description:
        "A mobile-first health experience focused on making personal wellness information easier to understand, track and act on. The product combines a calm visual language with a highly structured interaction system.",

      tags: [
        "UX Research",
        "Mobile UX",
        "UI Design",
        "Interaction",
        "Prototype"
      ]

    },


    project3: {

      category:
        "03 / SAAS PLATFORM",

      title:
        "Nexus Analytics",

      description:
        "A data-heavy SaaS dashboard redesigned to help teams discover insights faster. The experience balances information density with hierarchy, visual clarity and scalable interaction patterns.",

      tags: [
        "SaaS",
        "Dashboard UX",
        "Information Architecture",
        "UI Design",
        "Design System"
      ]

    },


    project4: {

      category:
        "04 / BRAND EXPERIENCE",

      title:
        "Aether Studio",

      description:
        "A digital brand experience built for a contemporary creative studio. The interface combines editorial typography, expressive motion and a minimal interaction language to create a distinctive digital identity.",

      tags: [
        "Art Direction",
        "UX/UI",
        "Brand Experience",
        "Creative Direction",
        "Web Design"
      ]

    }

  };


  /* =======================================================
     10. PROJECT MODAL
  ======================================================= */

  const openProjectModal = (projectId) => {

    if (!modal || !modalContent) {
      return;
    }

    const project =
      projects[projectId];

    if (!project) return;


    const tags =
      project.tags
        .map(
          (tag) =>
            `<span>${tag}</span>`
        )
        .join("");


    modalContent.innerHTML = `

      <span class="modal-label">
        ${project.category}
      </span>

      <h2>
        ${project.title}
      </h2>

      <p>
        ${project.description}
      </p>

      <div class="modal-tags">
        ${tags}
      </div>

    `;


    modal.classList.add("open");

    body.classList.add("menu-open");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

  };


  function closeProjectModal() {

    if (!modal) return;

    modal.classList.remove("open");

    body.classList.remove("menu-open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  projectLinks.forEach((project) => {

    project.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        const projectId =
          project.dataset.project;

        openProjectModal(projectId);

      }
    );

  });


  if (modalClose) {

    modalClose.addEventListener(
      "click",
      closeProjectModal
    );

  }


  if (modalBackdrop) {

    modalBackdrop.addEventListener(
      "click",
      closeProjectModal
    );

  }


  /* =======================================================
     11. COUNTER ANIMATION
  ======================================================= */

  const animateCounter = (element) => {

    if (element.dataset.animated === "true") {
      return;
    }

    element.dataset.animated = "true";


    const target =
      Number(
        element.dataset.count
      );


    if (Number.isNaN(target)) {
      return;
    }


    const suffix =
      element.dataset.suffix || "";


    const prefix =
      element.dataset.prefix || "";


    const duration = 1600;

    const startTime =
      performance.now();


    const updateCounter =
      (currentTime) => {

        const progress =
          Math.min(
            (currentTime - startTime) /
            duration,
            1
          );


        const eased =
          1 -
          Math.pow(
            1 - progress,
            4
          );


        const value =
          Math.floor(
            target * eased
          );


        element.textContent =
          `${prefix}${value}${suffix}`;


        if (progress < 1) {

          requestAnimationFrame(
            updateCounter
          );

        } else {

          element.textContent =
            `${prefix}${target}${suffix}`;

        }

      };


    requestAnimationFrame(
      updateCounter
    );

  };


  if (
    counters.length &&
    "IntersectionObserver" in window
  ) {

    const counterObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (
              entry.isIntersecting
            ) {

              animateCounter(
                entry.target
              );

              counterObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.5
        }
      );


    counters.forEach((counter) => {

      counterObserver.observe(counter);

    });

  } else {

    counters.forEach(
      animateCounter
    );

  }


  /* =======================================================
     12. BACK TO TOP
  ======================================================= */

  if (backTop) {

    backTop.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        window.scrollTo({

          top: 0,

          behavior: "smooth"

        });

      }
    );

  }


  /* =======================================================
     13. PARALLAX HERO
  ======================================================= */

  const heroVisual =
    document.querySelector(
      ".hero-visual"
    );


  const heroGrid =
    document.querySelector(
      ".hero-grid"
    );


  if (
    supportsFinePointer &&
    heroVisual &&
    heroGrid
  ) {

    window.addEventListener(
      "mousemove",
      (event) => {

        const x =
          (event.clientX /
            window.innerWidth -
            0.5);

        const y =
          (event.clientY /
            window.innerHeight -
            0.5);


        heroVisual.style.transform =
          `translate3d(
            ${x * 18}px,
            ${y * 18}px,
            0
          )`;


        heroGrid.style.transform =
          `translate3d(
            ${x * -8}px,
            ${y * -8}px,
            0
          )`;

      }
    );

  }


  /* =======================================================
     14. MAGNETIC BUTTONS
  ======================================================= */

  const magneticElements =
    document.querySelectorAll(
      ".nav-cta, .circle-link, .outline-button"
    );


  if (supportsFinePointer) {

    magneticElements.forEach(
      (element) => {

        element.addEventListener(
          "mousemove",
          (event) => {

            const rect =
              element.getBoundingClientRect();


            const x =
              event.clientX -
              rect.left -
              rect.width / 2;


            const y =
              event.clientY -
              rect.top -
              rect.height / 2;


            element.style.transform =
              `translate(
                ${x * 0.15}px,
                ${y * 0.15}px
              )`;

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            element.style.transform =
              "";

          }
        );

      }
    );

  }


  /* =======================================================
     15. TILT PROJECT IMAGES
  ======================================================= */

  if (supportsFinePointer) {

    const projectImages =
      document.querySelectorAll(
        ".project-image"
      );


    projectImages.forEach(
      (image) => {

        image.addEventListener(
          "mousemove",
          (event) => {

            const rect =
              image.getBoundingClientRect();


            const x =
              (event.clientX -
                rect.left) /
              rect.width;


            const y =
              (event.clientY -
                rect.top) /
              rect.height;


            const rotateX =
              (0.5 - y) * 4;


            const rotateY =
              (x - 0.5) * 4;


            image.style.transform =
              `perspective(1200px)
               rotateX(${rotateX}deg)
               rotateY(${rotateY}deg)`;

          }
        );


        image.addEventListener(
          "mouseleave",
          () => {

            image.style.transform =
              "";

          }
        );

      }
    );

  }


  /* =======================================================
     16. SKILL MARQUEE PAUSE
  ======================================================= */

  const skillsTrack =
    document.querySelector(
      ".skills-track"
    );


  if (skillsTrack) {

    skillsTrack.addEventListener(
      "mouseenter",
      () => {

        skillsTrack.style.animationPlayState =
          "paused";

      }
    );


    skillsTrack.addEventListener(
      "mouseleave",
      () => {

        skillsTrack.style.animationPlayState =
          "running";

      }
    );

  }


  /* =======================================================
     17. IMAGE LAZY LOADING
  ======================================================= */

  document
    .querySelectorAll("img")
    .forEach((img) => {

      if (!img.hasAttribute("loading")) {

        img.setAttribute(
          "loading",
          "lazy"
        );

      }

    });


  /* =======================================================
     18. CURRENT YEAR
  ======================================================= */

  const yearElements =
    document.querySelectorAll(
      "[data-current-year]"
    );


  yearElements.forEach(
    (element) => {

      element.textContent =
        new Date().getFullYear();

    }
  );


  /* =======================================================
     19. ESCAPE HTML
  ======================================================= */

  const escapeHTML = (value) => {

    const div =
      document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

  };


  /* =======================================================
     20. EXTERNAL LINKS
  ======================================================= */

  document
    .querySelectorAll(
      'a[href^="http"]'
    )
    .forEach((link) => {

      const currentHost =
        window.location.hostname;


      try {

        const url =
          new URL(
            link.href
          );


        if (
          url.hostname !==
          currentHost
        ) {

          link.setAttribute(
            "target",
            "_blank"
          );


          link.setAttribute(
            "rel",
            "noopener noreferrer"
          );

        }

      } catch (error) {

        // Invalid URL — leave unchanged.

      }

    });


  /* =======================================================
     21. CONTACT EMAIL COPY
  ======================================================= */

  const emailLinks =
    document.querySelectorAll(
      "[data-copy-email]"
    );


  emailLinks.forEach(
    (link) => {

      link.addEventListener(
        "click",
        async (event) => {

          const email =
            link.dataset.copyEmail;


          if (!email) return;


          if (
            navigator.clipboard &&
            window.isSecureContext
          ) {

            try {

              await navigator.clipboard.writeText(
                email
              );


              const originalText =
                link.dataset.originalText ||
                link.textContent;


              link.dataset.originalText =
                originalText;


              link.textContent =
                "Email copied";


              setTimeout(() => {

                link.textContent =
                  originalText;

              }, 1800);

            } catch (error) {

              // Clipboard unavailable.

            }

          }

        }
      );

    });


  /* =======================================================
     22. RESIZE HANDLER
  ======================================================= */

  let resizeTimer;


  window.addEventListener(
    "resize",
    () => {

      clearTimeout(resizeTimer);


      resizeTimer =
        setTimeout(() => {

          if (
            window.innerWidth > 992
          ) {

            closeMenu();

          }

        }, 150);

    }
  );


  /* =======================================================
     23. PAGE VISIBILITY
  ======================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.hidden
      ) {

        if (skillsTrack) {

          skillsTrack.style.animationPlayState =
            "paused";

        }

      } else {

        if (skillsTrack) {

          skillsTrack.style.animationPlayState =
            "running";

        }

      }

    }
  );


  /* =======================================================
     24. INITIAL STATE
  ======================================================= */

  if (menuToggle) {

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  if (modal) {

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  /* =======================================================
     25. CONSOLE BRANDING
  ======================================================= */

  console.log(
    "%c HASAN AHMED RAFI ",
    `
      background:#d8ff45;
      color:#000;
      font-size:16px;
      font-weight:800;
      padding:8px 14px;
    `
  );


  console.log(
    "%c UX / UI DESIGNER PORTFOLIO ",
    `
      color:#d8ff45;
      font-size:11px;
      letter-spacing:2px;
    `
  );


});
```
