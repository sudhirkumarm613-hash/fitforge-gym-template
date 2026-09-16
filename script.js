/* =====================================================
   FITFORGE — INTERACTIONS
   ===================================================== */


/* ================= PRELOADER ================= */

window.addEventListener("load", () => {

  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("hidden");
  }, 900);

});


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {

  menuToggle.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen
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


/* ================= SCROLL REVEAL ================= */

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.12
    }

  );


revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* ================= ACTIVE NAV ================= */

const sections =
  document.querySelectorAll("section[id]");

const navLinks =
  document.querySelectorAll(".nav a");


const activeObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          navLinks.forEach(link => {

            link.classList.remove("active");

            if (
              link.getAttribute("href") ===
              "#" + entry.target.id
            ) {
              link.classList.add("active");
            }

          });

        }

      });

    },

    {
      threshold: 0.35
    }

  );


sections.forEach(section => {

  activeObserver.observe(section);

});


/* ================= HEADER SCROLL ================= */

const header =
  document.querySelector(".site-header");


window.addEventListener(
  "scroll",
  () => {

    if (window.scrollY > 50) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  },
  { passive: true }
);


/* ================= SMOOTH ANCHOR ================= */

document.querySelectorAll(
  'a[href^="#"]'
).forEach(anchor => {

  anchor.addEventListener("click", function(e) {

    const target =
      document.querySelector(
        this.getAttribute("href")
      );

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


/* ================= CURSOR EFFECT ================= */

if (window.matchMedia("(pointer:fine)").matches) {

  const cursor =
    document.createElement("div");

  cursor.className = "cursor";

  document.body.appendChild(cursor);


  document.addEventListener(
    "mousemove",
    e => {

      cursor.style.left =
        e.clientX + "px";

      cursor.style.top =
        e.clientY + "px";

    }
  );


  document.querySelectorAll("a, button").forEach(
    element => {

      element.addEventListener(
        "mouseenter",
        () => cursor.classList.add("hover")
      );

      element.addEventListener(
        "mouseleave",
        () => cursor.classList.remove("hover")
      );

    }
  );

}


/* ================= CONSOLE BRANDING ================= */

console.log(
  "%cFITFORGE",
  "font-size:30px;font-weight:bold;"
);

console.log(
  "Premium Gym Website Template"
);
