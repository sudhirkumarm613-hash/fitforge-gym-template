/* =====================================================
   FITFORGE — PREMIUM MOTION ENGINE
   ===================================================== */


/* ================= PRELOADER ================= */

window.addEventListener("load", () => {

  const loader = document.getElementById("loader");

  if (loader) {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 900);
  }

});


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {

  menuToggle.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });


  nav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

}


/* ================= SCROLL PROGRESS ================= */

let ticking = false;

function updateScrollEffects() {

  const scrollTop = window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress =
    documentHeight > 0
      ? (scrollTop / documentHeight) * 100
      : 0;

  document.documentElement.style
    .setProperty(
      "--scroll-progress",
      `${progress}%`
    );


  ticking = false;

}

window.addEventListener(
  "scroll",
  () => {

    if (!ticking) {

      window.requestAnimationFrame(
        updateScrollEffects
      );

      ticking = true;

    }

  },
  { passive: true }
);


/* ================= HEADER ================= */

const header =
  document.querySelector(".site-header");

function updateHeader() {

  if (!header) return;

  if (window.scrollY > 50) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

}

window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);

updateHeader();


/* ================= SCROLL REVEAL ================= */

const revealElements =
  document.querySelectorAll(".reveal");

const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.12,
      rootMargin: "0px 0px -60px 0px"
    }

  );

revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* ================= ACTIVE NAV ================= */

const sections =
  document.querySelectorAll(
    "section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".nav a"
  );

const activeObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {

          link.classList.remove(
            "active"
          );

          if (
            link.getAttribute("href") ===
            "#" + entry.target.id
          ) {

            link.classList.add(
              "active"
            );

          }

        });

      });

    },

    {
      threshold: 0.35
    }

  );

sections.forEach(section => {

  activeObserver.observe(section);

});


/* ================= SMOOTH ANCHOR ================= */

document.querySelectorAll(
  'a[href^="#"]'
).forEach(anchor => {

  anchor.addEventListener(
    "click",
    function(event) {

      const selector =
        this.getAttribute("href");

      const target =
        document.querySelector(selector);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }
  );

});


/* ================= HERO PARALLAX ================= */

const heroImage =
  document.querySelector(".hero-image");

const heroContent =
  document.querySelector(".hero-content");

let parallaxTicking = false;

function updateParallax() {

  if (
    window.innerWidth <= 900 ||
    !heroImage
  ) {
    parallaxTicking = false;
    return;
  }

  const scroll =
    Math.min(window.scrollY, window.innerHeight);

  const imageMove =
    scroll * 0.12;

  const contentMove =
    scroll * 0.06;

  heroImage.style.transform =
    `scale(1.04) translateY(${imageMove}px)`;

  if (heroContent) {

    heroContent.style.transform =
      `translateY(${contentMove}px)`;

  }

  parallaxTicking = false;

}

window.addEventListener(
  "scroll",
  () => {

    if (!parallaxTicking) {

      window.requestAnimationFrame(
        updateParallax
      );

      parallaxTicking = true;

    }

  },
  { passive: true }
);


/* ================= MOUSE TILT ================= */

const cards =
  document.querySelectorAll(
    ".program-card, .price-card"
  );

if (
  window.matchMedia("(pointer:fine)").matches
) {

  cards.forEach(card => {

    card.addEventListener(
      "mousemove",
      event => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const rotateX =
          ((y / rect.height) - 0.5) * -4;

        const rotateY =
          ((x / rect.width) - 0.5) * 4;

        card.style.transform =
          `translateY(-10px)
           scale(1.012)
           perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)`;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform = "";

      }
    );

  });

}


/* ================= CUSTOM CURSOR ================= */

if (
  window.matchMedia("(pointer:fine)").matches
) {

  const cursor =
    document.createElement("div");

  cursor.className = "cursor";

  document.body.appendChild(cursor);


  let cursorX = 0;
  let cursorY = 0;

  let targetX = 0;
  let targetY = 0;


  document.addEventListener(
    "mousemove",
    event => {

      targetX = event.clientX;
      targetY = event.clientY;

    }
  );


  function animateCursor() {

    cursorX +=
      (targetX - cursorX) * 0.18;

    cursorY +=
      (targetY - cursorY) * 0.18;

    cursor.style.left =
      cursorX + "px";

    cursor.style.top =
      cursorY + "px";

    requestAnimationFrame(
      animateCursor
    );

  }

  animateCursor();


  document.querySelectorAll(
    "a, button, .program-card, .price-card"
  ).forEach(element => {

    element.addEventListener(
      "mouseenter",
      () => {
        cursor.classList.add("hover");
      }
    );

    element.addEventListener(
      "mouseleave",
      () => {
        cursor.classList.remove("hover");
      }
    );

  });

}


/* ================= IMAGE PARALLAX ================= */

const trainerImages =
  document.querySelectorAll(
    ".trainer-image"
  );

window.addEventListener(
  "scroll",
  () => {

    if (window.innerWidth <= 900) return;

    trainerImages.forEach(image => {

      const rect =
        image.getBoundingClientRect();

      const center =
        window.innerHeight / 2;

      const distance =
        (rect.top + rect.height / 2) -
        center;

      const movement =
        distance * -0.025;

      image.style.backgroundPosition =
        `center ${50 + movement}%`;

    });

  },
  { passive: true }
);


/* ================= CONSOLE ================= */

console.log(
  "%cFITFORGE",
  "font-size:30px;font-weight:900;"
);

console.log(
  "Premium Gym Website Template"
);

console.log(
  "Motion Engine: Active"
);
