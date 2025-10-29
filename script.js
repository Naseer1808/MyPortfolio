// ---------------- Progress Bar Animation ----------------
const progressBars = document.querySelectorAll(".progress");
const animateProgress = (entries) => {
  entries.forEach((entry) => {
    const progress = entry.target;
    if (entry.isIntersecting) {
      progress.style.width = progress.getAttribute("data-progress") + "%";
    } else {
      progress.style.width = "0%";
    }
  });
};
const observer = new IntersectionObserver(animateProgress, { threshold: 0.5 });
progressBars.forEach((bar) => observer.observe(bar));

// ---------------- Typed.js ----------------
var typed = new Typed("#element", {
  strings: ["Software Engineer","Web Developer", "Java Developer", "Test Engineer"],
  typeSpeed: 50,
  backSpeed: 50,
  loop: true,
  showCursor: false,
});
// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("nav-active");
});


// ---------------- Carousel ----------------
const projectWrapper = document.querySelector(".carousel-wrapper");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const scrollAmount = 380;

nextBtn.addEventListener("click", () => {
  projectWrapper.scrollBy({ left: scrollAmount, behavior: "smooth" });
});
prevBtn.addEventListener("click", () => {
  projectWrapper.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

// ---------------- Contact Form with EmailJS ----------------
// ---------------- Contact Form with EmailJS ----------------
emailjs.init("8Hn5wYSV1H7hqJTaK"); // Replace with your EmailJS Public Key

// Place this block right after initializing EmailJS
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMessage = document.getElementById("formMessage");
  const submitBtn = this.querySelector(".submit-btn");

  if (!name || !email || !mobile || !message) {
    formMessage.textContent = "Please fill all fields.";
    formMessage.style.color = "red";
    return;
  }

  if (!validateEmail(email)) {
    formMessage.textContent = "Please enter a valid email.";
    formMessage.style.color = "red";
    return;
  }

  const templateParams = { name, email, mobile, message };
  submitBtn.disabled = true; // disable button

  emailjs.send("service_l6psoi8","template_36t5lvq", templateParams)
    .then(() => {
      formMessage.textContent = "Will contact you soon!";
      formMessage.style.color = "green";
      this.reset();
    })
    .catch((err) => {
      formMessage.textContent = "Something went wrong. Please try again.";
      formMessage.style.color = "red";
      console.error(err);
    })
    .finally(() => {
      submitBtn.disabled = false; // enable button after request
      submitBtn.textContent = submitBtn.dataset.originalText || 'Send Message';
    });
});

// ---------------- Email validation function ----------------
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}


// ---------------- Particles.js ----------------
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 5, random: true },
    line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
    move: { enable: true, speed: 6, out_mode: "out" }
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
    modes: { repulse: { distance: 200 } }
  },
  retina_detect: true
});
// === Mobile menu (append-only; uses existing IDs) — from your first block ===
(function () {
  const toggle = document.getElementById('menu-toggle');
  const links  = document.getElementById('nav-links');
  if (!toggle || !links) return;

  // ARIA for accessibility (harmless on desktop)
  toggle.setAttribute('aria-controls', 'nav-links');
  toggle.setAttribute('aria-expanded', 'false');

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Close after tapping a link (mobile only effect)
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (links.classList.contains('nav-open')) {
        links.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();

// === Mobile-only UX helpers — from your second block ===
(function () {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (!isMobile) return;

  // Flag body so CSS can apply mobile-only behaviors safely
  document.body.classList.add('mobile-enhanced');

  // About: add a "Read more / Read less" toggle without changing HTML
  const aboutSection = document.getElementById('about');
  const aboutPara = aboutSection?.querySelector('.right-summary p');
  if (aboutPara) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'about-toggle';
    btn.textContent = 'Read more';
    aboutPara.insertAdjacentElement('afterend', btn);

    btn.addEventListener('click', () => {
      const expanded = document.body.classList.toggle('about-expanded');
      btn.textContent = expanded ? 'Read less' : 'Read more';
    });
  }

  // Optional: tiny inertial nudge so users notice carousels can swipe
  ['.edu', '.skills-grid'].forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    let hinted = false;
    el.addEventListener('touchstart', () => {
      if (hinted) return;
      hinted = true;
      el.scrollBy({ left: 1, behavior: 'auto' });
      el.scrollBy({ left: -1, behavior: 'auto' });
    }, { passive: true });
  });
})();

// === Contact form UX touches — from your third block ===
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Gentle mobile keyboard hints without editing HTML
  const email  = document.getElementById('email');
  const mobile = document.getElementById('mobile');
  email?.setAttribute('inputmode', 'email');
  email?.setAttribute('autocomplete', 'email');
  mobile?.setAttribute('inputmode', 'tel');
  mobile?.setAttribute('autocomplete', 'tel');

  // Button feedback
  const submitBtn = form.querySelector('.submit-btn');
  if (!submitBtn) return;

  // Hook into your existing submit handler without replacing it
  form.addEventListener('submit', () => {
    const original = submitBtn.textContent;
    submitBtn.dataset.originalText = original || 'Send Message';
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Fallback safety in case promise handling changes
    setTimeout(() => {
      if (!submitBtn.disabled) return; // already restored elsewhere
      submitBtn.textContent = submitBtn.dataset.originalText;
      submitBtn.disabled = false;
    }, 8000);
  }, { capture: true });

  // Tiny inline validation highlight (your existing validation stays)
  ['input', 'textarea'].forEach(sel => {
    form.querySelectorAll(sel).forEach(el => {
      el.addEventListener('invalid', () => {
        el.style.borderColor = '#ff6b6b';
      });
      el.addEventListener('input', () => {
        el.style.borderColor = '';
      });
    });
  });
})();
// --- Extra validation for contact form ---
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  const email = document.getElementById('email');
  const mobile = document.getElementById('mobile');
  const formMessage = document.getElementById('formMessage');

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^\+?[0-9]{7,15}$/;

  if (!emailPattern.test(email.value.trim())) {
    e.preventDefault();
    formMessage.textContent = "Please enter a valid email address.";
    formMessage.style.color = "red";
    return;
  }

  if (!phonePattern.test(mobile.value.trim())) {
    e.preventDefault();
    formMessage.textContent = "Please enter a valid phone number (with + if needed).";
    formMessage.style.color = "red";
    return;
  }

  // clears previous messages if valid
  formMessage.textContent = "";
});
