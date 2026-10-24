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
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const svg = (body) =>
    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
  const ICONS = {
    shield: svg('<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z"/>'),
    monitor: svg('<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M9 20h6M12 16v4"/>'),
    file: svg('<path d="M6 3h8l4 4v14H6V3Z"/><path d="M14 3v4h4M9 12h6M9 15.5h6"/>'),
    grid: svg('<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M4 9h16M4 15h16M10 3v18"/>'),
    slides: svg('<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4M8 20h8M8 12l3-3 2 2 3-3"/>'),
    gear: svg('<circle cx="12" cy="12" r="3"/><path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/>'),
    database: svg('<ellipse cx="12" cy="5.5" rx="7" ry="2.5"/><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13"/><path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>'),
    clock: svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
    expand: svg('<path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/>'),
    hourglass: svg('<path d="M6 3h12M6 21h12M7 3c0 5 10 5 10 9s-10 4-10 9M17 3c0 5-10 5-10 9s10 4 10 9"/>'),
    calendar: svg('<rect x="3.5" y="5" width="17" height="15" rx="1.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'),
    check: svg('<circle cx="12" cy="12" r="8.5"/><path d="m8.5 12 2.5 2.5 4.5-5"/>'),
    tick: svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
    target: svg('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><path d="m12 12 7-7M16 5h3v3"/>'),
    bars: svg('<path d="M4 20h16"/><rect x="5.5" y="12" width="3" height="6"/><rect x="10.5" y="8" width="3" height="10"/><rect x="15.5" y="4" width="3" height="14"/>'),
    phone: svg('<path d="M21 16.4v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.1 3.7 2 2 0 0 1 3.1 1.5h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.1 9.4a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>'),
    search: svg('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/>'),
    code: svg('<path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16"/>'),
    alert: svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5.5M12 16.5h.01"/>'),
  };
  const icon = (name) => ICONS[name] || "";
  const visual = (item) =>
    item.logo ? `<img src="${escapeHtml(item.logo)}" alt="" />` : `<span class="dicon">${icon(item.icon)}</span>`;
  const arrow = '<span class="flow__arrow" aria-hidden="true">→</span>';

  const todo = '<p class="todo">À compléter</p>';
  const list = (items) =>
    items && items.length ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : todo;

  const renderers = {
    text: (s) => `<p class="dsec__text">${escapeHtml(s.text)}</p>`,

    context: (s) => `
      <p class="dsec__text">${escapeHtml(s.text)}</p>
      <div class="flow">
        ${
          s.sources && s.sources.length
            ? `<div class="flow__sources">${s.sources
                .map(
                  (x) =>
                    `<div class="flow__node flow__node--row">${visual(x)}<div><strong>${escapeHtml(x.name)}</strong><small>${escapeHtml(x.note || "")}</small></div></div>`
                )
                .join("")}</div>`
            : ""
        }
        ${s.steps
          .map(
            (x, i) =>
              `${i || (s.sources && s.sources.length) ? arrow : ""}<div class="flow__node">${visual(x)}<strong>${escapeHtml(x.name)}</strong><small>${escapeHtml(x.note || "")}</small></div>`
          )
          .join("")}
      </div>
      ${s.alert ? `<p class="dalert">${icon("alert")}<span>${escapeHtml(s.alert)}</span></p>` : ""}`,

    pipeline: (s) => `
      <p class="dsec__text">${escapeHtml(s.text)}</p>
      <div class="pipe">
        ${s.stages
          .map(
            (st, i) => `${i ? arrow : ""}
          <div class="pipe__stage">
            <p class="pipe__label">${escapeHtml(st.label)}${st.sublabel ? `<small>${escapeHtml(st.sublabel)}</small>` : ""}</p>
            ${st.items
              .map(
                (x) =>
                  `<div class="flow__node">${visual(x)}<strong>${escapeHtml(x.name)}</strong><small>${escapeHtml(x.note || "")}</small></div>`
              )
              .join("")}
          </div>`
          )
          .join("")}
      </div>
      ${
        s.extras && s.extras.length
          ? `<div class="pipe__extras">${s.extras
              .map(
                (x) =>
                  `<div class="pipe__extra"><span class="icon-circle icon-circle--lg">${icon(x.icon)}</span><div><strong>${escapeHtml(x.title)}</strong><small>${escapeHtml(x.text)}</small></div></div>`
              )
              .join("")}</div>`
          : ""
      }`,

    status: (s) => `
      <div class="dstatus">
        ${s.items
          .map(
            (x) =>
              `<div class="dstatus__item dstatus__item--${escapeHtml(x.tone || "neutral")}"><span class="icon-circle icon-circle--lg">${icon(x.icon)}</span><div><strong>${escapeHtml(x.title)}</strong>${
                x.subtitle ? `<em>${escapeHtml(x.subtitle)}</em>` : ""
              }<small>${escapeHtml(x.text)}</small></div></div>`
          )
          .join("")}
      </div>
      ${
        s.benefits
          ? `<div class="dbenefits"><span class="dicon">${icon(s.benefits.icon || "target")}</span><div><strong>${escapeHtml(s.benefits.title)}</strong>${list(
              s.benefits.items
            )}</div></div>`
          : ""
      }`,

    cards: (s) => `
      <div class="dcards">
        ${s.items
          .map(
            (x) =>
              `<div class="dcard"><span class="icon-circle icon-circle--lg">${icon(x.icon)}</span><h3>${escapeHtml(x.title)}</h3><p>${escapeHtml(x.text)}</p></div>`
          )
          .join("")}
      </div>`,

    scope: (s) => `
      ${s.text ? `<p class="dsec__text">${escapeHtml(s.text)}</p>` : ""}
      <div class="dscope">
        ${s.groups
          .map(
            (g) =>
              `<div class="dscope__group">${visual(g)}<div><h3>${escapeHtml(g.name)}</h3>${list(g.items)}</div></div>`
          )
          .join("")}
      </div>`,

    architecture: (s) => `
      <p class="dsec__text">${escapeHtml(s.text)}</p>
      ${s.versions
        .map(
          (v) => `
        <div class="arch arch--${escapeHtml(v.status)}">
          <div class="arch__head">
            <h3>${escapeHtml(v.title)}</h3>
            <span class="arch__badge">${v.status === "live" ? icon("check") : icon("clock")}${escapeHtml(v.statusLabel)}</span>
          </div>
          <div class="flow">
            <div class="flow__sources">
              ${v.sources
                .map(
                  (x) =>
                    `<div class="flow__node flow__node--row">${visual(x)}<strong>${escapeHtml(x.name)}</strong><span class="flow__api">API</span></div>`
                )
                .join("")}
            </div>
            ${v.steps
              .map(
                (x) =>
                  `${arrow}<div class="flow__node">${visual(x)}<strong>${escapeHtml(x.name)}</strong><small>${x.lines
                    .map(escapeHtml)
                    .join("<br />")}</small>${x.note ? `<em class="flow__note">${escapeHtml(x.note)}</em>` : ""}</div>`
              )
              .join("")}
          </div>
        </div>`
        )
        .join("")}`,

    columns: (s) => `
      <div class="dcols">
        ${s.items
          .map(
            (c, i) =>
              `<div class="dcol"><h3><span>${projectNumber(i)}</span>${escapeHtml(c.title)}</h3>${
                c.icon ? `<span class="dcol__icon">${icon(c.icon)}</span>` : ""
              }${list(c.items)}</div>`
          )
          .join("")}
      </div>`,

    logos: (s) => `
      <ul class="tools">
        ${s.items
          .map((x) => `<li>${x.logo ? `<img src="${escapeHtml(x.logo)}" alt="" />` : icon(x.icon)}${escapeHtml(x.name)}</li>`)
          .join("")}
      </ul>`,

    results: (s) => `
      <div class="dresults">
        <div class="dresult dresult--before">
          <span class="dicon">${icon("hourglass")}</span>
          <div><small>${escapeHtml(s.before.label)}</small><strong>${escapeHtml(s.before.value)}</strong><em>${escapeHtml(s.before.note)}</em></div>
        </div>
        ${arrow}
        <div class="dresult dresult--after">
          <span class="dicon">${icon("clock")}</span>
          <div><strong>${escapeHtml(s.after.value)}</strong><small>${escapeHtml(s.after.label)}</small><em>${escapeHtml(s.after.note)}</em></div>
        </div>
        ${s.kpis
          .map(
            (k) =>
              `<div class="dresult"><span class="dicon">${icon(k.icon)}</span><div><strong>${escapeHtml(k.value)}</strong><small>${escapeHtml(k.note)}</small></div></div>`
          )
          .join("")}
      </div>`,
  };

  const section = (s, i) => `
    <section class="dsec">
      <h2 class="dsec__title"><span>${projectNumber(i)}</span>${escapeHtml(s.title)}</h2>
      ${(renderers[s.type] || renderers.text)(s)}
    </section>`;

  const pager = `
    <nav class="detail__pager" aria-label="Autres projets">
      <a href="projet.html?id=${encodeURIComponent(prev.id)}"><small>← Projet précédent</small>${escapeHtml(prev.title)}</a>
      <a href="projet.html?id=${encodeURIComponent(next.id)}" class="detail__pager-next"><small>Projet suivant →</small>${escapeHtml(next.title)}</a>
    </nav>`;

  const links = `
    <div class="detail__links">${project.github ? `<a href="${escapeHtml(project.github)}" target="_blank" rel="noopener" class="btn btn--dark btn--small">Voir le code sur GitHub ${arrowIcon}</a>` : ""}${
      project.demo ? `<a href="${escapeHtml(project.demo)}" target="_blank" rel="noopener" class="link-arrow">Voir la démo <span aria-hidden="true">→</span></a>` : ""
    }</div>`;

  const d = project.detail;
  document.title = `${d ? d.headline : project.title} | Glenne Poaty`;

  if (d) {
    projectDetail.innerHTML = `
      <a href="index.html#projects" class="link-back"><span aria-hidden="true">←</span> Retour aux projets</a>
      <header class="dhead">
        <div class="dhead__top">
          <p class="dhead__kicker">${escapeHtml(project.type)}${d.company ? ` — ${escapeHtml(d.company)}` : ""}</p>
          <div class="dhead__org">
            ${d.logo ? `<img src="${escapeHtml(d.logo)}" alt="${escapeHtml(d.company || "")}" />` : ""}
            <p>${escapeHtml(d.period || "")}${d.periodNote ? `<small>(${escapeHtml(d.periodNote)})</small>` : ""}</p>
          </div>
        </div>
        <h1>${escapeHtml(d.headline)}</h1>
        <p class="dhead__tagline">${escapeHtml(d.tagline || "")}</p>
        <p class="dhead__intro">${escapeHtml(d.intro || "")}</p>
        ${links}
        ${project.image ? `<figure class="dhead__cover"><img src="${escapeHtml(project.image)}" alt="" /></figure>` : ""}
      </header>
      ${d.sections.map(section).join("")}
      ${pager}`;
  } else {
    const block = (title, content) => `
      <section class="detail__block">
        <h2>${title}</h2>
        ${content}
      </section>`;
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
          ${links}
        </div>
        <div class="pmedia pmedia--large">${projectMedia(project, index)}</div>
      </header>
      <div class="detail__grid">
        ${block("Contexte", project.context ? `<p>${escapeHtml(project.context)}</p>` : todo)}
        ${block("Objectifs", list(project.objectives))}
        ${block("Démarche &amp; architecture", list(project.approach))}
        ${block("Résultats", list(project.results))}
      </div>
      ${pager}`;
  }
}
