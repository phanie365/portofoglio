document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav__links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const heroRoles = document.querySelectorAll("#heroRoles li");
if (heroRoles.length) {
  let activeIndex = 0;
  setInterval(() => {
    heroRoles[activeIndex].classList.remove("is-active");
    activeIndex = (activeIndex + 1) % heroRoles.length;
    heroRoles[activeIndex].classList.add("is-active");
  }, 2200);
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

  document.querySelectorAll(".timeline__item .timeline__link").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.closest(".timeline__item")));
  });

  projectModal.querySelectorAll("[data-modal-close]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !projectModal.hidden) closeModal();
  });
}
