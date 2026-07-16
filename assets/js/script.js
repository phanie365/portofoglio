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
