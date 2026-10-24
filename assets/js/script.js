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
const navItems = [...navLinks.querySelectorAll("a")].filter((link) =>
  link.getAttribute("href").startsWith("#")
);
const sections = navItems
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActive = () => {
  if (!sections.length) return;
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

// ---------- Projects ----------

const projects = window.PROJECTS || [];

const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const projectNumber = (index) => String(index + 1).padStart(2, "0");

const arrowIcon =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15"/><path d="m13 6 6 6-6 6"/></svg>';

const projectMedia = (project, index) =>
  project.image
    ? `<img src="${escapeHtml(project.image)}" alt="" loading="lazy" />`
    : `<span class="pmedia__placeholder" aria-hidden="true">${projectNumber(index)}</span>`;

const chips = (tags) =>
  tags && tags.length ? `<div class="chips">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>` : "";

const projectCard = (project, index) => `
  <li class="pcard">
    <a href="projet.html?id=${encodeURIComponent(project.id)}" class="pcard__link">
      <div class="pmedia">${projectMedia(project, index)}</div>
      <div class="pcard__body">
        <p class="pcard__meta"><span>${projectNumber(index)}</span>${escapeHtml(project.type || "À compléter")}</p>
        <h3>${escapeHtml(project.title)}</h3>
        <p class="pcard__sub">${escapeHtml(project.subtitle || "Description à venir")}</p>
        ${chips(project.tags)}
        <span class="round-btn round-btn--sm" aria-hidden="true">${arrowIcon}</span>
      </div>
    </a>
  </li>`;

const projectsTrack = document.getElementById("projectsTrack");
if (projectsTrack) {
  projectsTrack.innerHTML = projects.map(projectCard).join("");

  const scrollByCard = (direction) => {
    const card = projectsTrack.querySelector(".pcard");
    const step = card ? card.getBoundingClientRect().width + 20 : projectsTrack.clientWidth;
    projectsTrack.scrollBy({ left: direction * step, behavior: "smooth" });
  };
  document.querySelector('[data-carousel="prev"]').addEventListener("click", () => scrollByCard(-1));
  document.querySelector('[data-carousel="next"]').addEventListener("click", () => scrollByCard(1));
}

const projectsGrid = document.getElementById("projectsGrid");
if (projectsGrid) {
  projectsGrid.innerHTML = projects.map(projectCard).join("");
}

const projectDetail = document.getElementById("projectDetail");
if (projectDetail) {
  const id = new URLSearchParams(window.location.search).get("id");
  const index = Math.max(0, projects.findIndex((p) => p.id === id));
  const project = projects[index];

  const todo = '<p class="todo">À compléter</p>';
  const list = (items) =>
    items && items.length ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : todo;
  const block = (title, content) => `
    <section class="detail__block">
      <h2>${title}</h2>
      ${content}
    </section>`;

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  document.title = `${project.title} | Glenne Poaty`;
  projectDetail.innerHTML = `
    <a href="index.html#projects" class="link-back"><span aria-hidden="true">←</span> Retour aux projets</a>
    <header class="detail__head">
      <div class="detail__intro">
        <p class="pcard__meta"><span>${projectNumber(index)}</span>${escapeHtml(project.type || "À compléter")}${
          project.date ? ` · ${escapeHtml(project.date)}` : ""
        }</p>
        <h1>${escapeHtml(project.title)}</h1>
        <span class="about__rule" aria-hidden="true"></span>
        <p class="detail__sub">${escapeHtml(project.subtitle || "Description à venir")}</p>
        ${chips(project.tags)}
        <div class="detail__links">
          ${project.github ? `<a href="${escapeHtml(project.github)}" target="_blank" rel="noopener" class="btn btn--dark btn--small">Voir le code sur GitHub ${arrowIcon}</a>` : ""}
          ${project.demo ? `<a href="${escapeHtml(project.demo)}" target="_blank" rel="noopener" class="link-arrow">Voir la démo <span aria-hidden="true">→</span></a>` : ""}
        </div>
      </div>
      <div class="pmedia pmedia--large">${projectMedia(project, index)}</div>
    </header>
    <div class="detail__grid">
      ${block("Contexte", project.context ? `<p>${escapeHtml(project.context)}</p>` : todo)}
      ${block("Objectifs", list(project.objectives))}
      ${block("Démarche &amp; architecture", list(project.approach))}
      ${block("Résultats", list(project.results))}
    </div>
    <nav class="detail__pager" aria-label="Autres projets">
      <a href="projet.html?id=${encodeURIComponent(prev.id)}"><small>← Projet précédent</small>${escapeHtml(prev.title)}</a>
      <a href="projet.html?id=${encodeURIComponent(next.id)}" class="detail__pager-next"><small>Projet suivant →</small>${escapeHtml(next.title)}</a>
    </nav>`;
}
