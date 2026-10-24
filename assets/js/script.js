const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Highlight the nav link of the section currently in view
const navItems = [...navLinks.querySelectorAll("a")];
const sections = navItems
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActive = () => {
  const offset = window.scrollY + window.innerHeight * 0.35;
  let current = sections[0];
  sections.forEach((section) => {
    if (section.offsetTop <= offset) current = section;
  });
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
    current = sections[sections.length - 1];
  }
  navItems.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current.id}`);
  });
};

window.addEventListener("scroll", setActive, { passive: true });
setActive();

// Fade sections in as they enter the viewport
const revealTargets = document.querySelectorAll(".section, .project, .timeline li, .skill");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

const projectModal = document.getElementById("projectModal");
if (projectModal) {
  const modalTitle = document.getElementById("modalTitle");
  const modalDate = document.getElementById("modalDate");
  const modalDescription = document.getElementById("modalDescription");
  const modalTags = document.getElementById("modalTags");
  const modalRepo = document.getElementById("modalRepo");
  let lastFocused = null;

  const openModal = (card) => {
    modalTitle.textContent = card.dataset.title || "";
    modalDate.textContent = card.dataset.date || "";
    modalDescription.textContent = card.dataset.description || "";
    modalTags.innerHTML = "";
    (card.dataset.tags || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .forEach((tag) => {
        const span = document.createElement("span");
        span.textContent = tag;
        modalTags.appendChild(span);
      });
    modalRepo.hidden = !card.dataset.repo;
    modalRepo.href = card.dataset.repo || "#";

    lastFocused = document.activeElement;
    projectModal.hidden = false;
    document.body.style.overflow = "hidden";
    projectModal.querySelector(".modal__close").focus();
  };

  const closeModal = () => {
    projectModal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll(".project .project__link").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.closest(".project")));
  });

  projectModal.querySelectorAll("[data-modal-close]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !projectModal.hidden) closeModal();
  });
}
