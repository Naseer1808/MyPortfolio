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
  strings: ["Web Developer", "Java Developer", "Test Engineer"],
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
