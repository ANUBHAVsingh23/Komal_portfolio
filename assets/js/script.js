const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const revealElements = document.querySelectorAll(".reveal");
const skillBars = document.querySelectorAll(".skill-bar span");
const resumeBtn = document.getElementById("resumeBtn");
const feedbackForm = document.getElementById("feedbackForm");
const feedbackStatus = document.getElementById("feedbackStatus");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.dataset.width || "0";
        bar.style.width = `${targetWidth}%`;
        skillObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.45 }
);

skillBars.forEach((bar) => skillObserver.observe(bar));

if (resumeBtn) {
  resumeBtn.addEventListener("click", (event) => {
    // If the button doesn't have a real href, show the placeholder alert.
    const href = resumeBtn.getAttribute("href");
    if (!href || href === "#" || href.trim() === "") {
      event.preventDefault();
      alert("Resume download link can be added here.");
    }
    // Otherwise allow the anchor to proceed (download or open the PDF).
  });
}

if (feedbackForm) {
  feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    feedbackForm.reset();
    feedbackStatus.textContent = "Thank you. Your feedback has been received.";
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
