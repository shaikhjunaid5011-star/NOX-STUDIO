// =========================
// GSAP REGISTER
// =========================

gsap.registerPlugin(ScrollTrigger);

// =========================
// LENIS SMOOTH SCROLL
// =========================

const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Sync ScrollTrigger

lenis.on("scroll", ScrollTrigger.update);

// =========================
// PRELOADER
// =========================

const counter = document.querySelector(".loader-counter");
const progress = document.querySelector(".loader-progress");

let count = 0;

const loading = setInterval(() => {
  count++;

  counter.innerHTML = `${count}%`;
  progress.style.width = `${count}%`;

  if (count >= 100) {
    clearInterval(loading);

    gsap.to("#preloader", {
      yPercent: -100,
      duration: 1.5,
      ease: "power4.inOut",
    });
  }
}, 25);

// =========================
// SPLIT TYPE
// =========================

const split = new SplitType(".split", {
  types: "chars, words",
});

gsap.from(".split .char", {
  y: 100,
  opacity: 0,
  stagger: 0.02,
  duration: 1,
  ease: "power4.out",
  delay: 1,
});

// =========================
// CUSTOM CURSOR
// =========================

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

window.addEventListener("mousemove", (e) => {

  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1,
  });

  gsap.to(follower, {
    x: e.clientX - 20,
    y: e.clientY - 20,
    duration: 0.4,
  });

});

// =========================
// MAGNETIC BUTTONS
// =========================

document.querySelectorAll(".magnetic").forEach((btn) => {

  btn.addEventListener("mousemove", (e) => {

    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
    });

  });

  btn.addEventListener("mouseleave", () => {

    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1,0.3)",
    });

  });

});

// =========================
// MENU OVERLAY
// =========================

const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu-overlay");

let menuOpen = false;

menuBtn.addEventListener("click", () => {

  if (!menuOpen) {

    gsap.to(menu, {
      y: "0%",
      duration: 1,
      ease: "power4.inOut",
    });

  } else {

    gsap.to(menu, {
      y: "-100%",
      duration: 1,
      ease: "power4.inOut",
    });

  }

  menuOpen = !menuOpen;

});

// =========================
// HERO PARALLAX
// =========================

gsap.to(".hero-video", {
  scale: 1.2,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});

// =========================
// ABOUT REVEAL
// =========================

gsap.from(".about-title", {
  y: 100,
  opacity: 0,
  duration: 1.2,

  scrollTrigger: {
    trigger: ".about-title",
    start: "top 80%",
  },
});

// Floating images

gsap.to(".float-img:nth-child(1)", {
  y: -50,
  scrollTrigger: {
    trigger: ".about",
    scrub: true,
  },
});

gsap.to(".float-img:nth-child(2)", {
  y: 50,
  scrollTrigger: {
    trigger: ".about",
    scrub: true,
  },
});

// =========================
// HORIZONTAL SCROLL
// =========================

gsap.to(".projects-track", {
  xPercent: -50,

  ease: "none",

  scrollTrigger: {
    trigger: ".featured",
    start: "top top",
    end: "+=2000",
    scrub: true,
    pin: true,
  },
});

// =========================
// EXPERIENCE SCALE
// =========================

gsap.from(".experience-overlay h2", {
  scale: 0.5,
  opacity: 0,

  scrollTrigger: {
    trigger: ".experience",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
});

// =========================
// ACCORDION
// =========================

const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {

  item.querySelector(".accordion-header")
    .addEventListener("click", () => {

      accordionItems.forEach((el) => {
        el.classList.remove("active");
      });

      item.classList.add("active");

    });

});

// =========================
// TESTIMONIAL FLOAT
// =========================

gsap.to(".testimonial-card", {
  y: -20,
  duration: 2,
  repeat: -1,
  yoyo: true,
  stagger: 0.2,
  ease: "sine.inOut",
});

// =========================
// FOOTER REVEAL
// =========================

gsap.from(".footer h2", {
  y: 100,
  opacity: 0,

  scrollTrigger: {
    trigger: ".footer",
    start: "top 80%",
  },
});

// =========================
// SCROLL PROGRESS
// =========================

window.addEventListener("scroll", () => {

  const scrollTop = window.scrollY;

  const docHeight =
    document.body.scrollHeight - window.innerHeight;

  const progress = (scrollTop / docHeight) * 100;

  document.querySelector(".scroll-progress")
    .style.width = `${progress}%`;

});

// =========================
// IMAGE TILT
// =========================

document.querySelectorAll(".float-img").forEach((card) => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.5,
    });

  });

  card.addEventListener("mouseleave", () => {

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
    });

  });

});

// =========================
// PERFORMANCE OPTIMIZATION
// =========================

// Pause videos outside viewport

const videos = document.querySelectorAll("video");

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {
      entry.target.play();
    } else {
      entry.target.pause();
    }

  });

});

videos.forEach((video) => observer.observe(video));