// Sidebar navigation + scrollspy
// - Clicking Dashboard scrolls to Mission & Vision
// - Clicking Lessons scrolls to Lesson Section
// - Clicking Home reloads the whole page

function getScrollTarget(id) {
  return document.getElementById(id);
}

function smoothScrollTo(el) {
  if (!el) return;

  // Slow smooth scroll
  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    el.scrollIntoView({ behavior: "auto", block: "start" });
    return;
  }

  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.addEventListener("DOMContentLoaded", () => {
  // Click handlers
  const scrollLinks = Array.from(
    document.querySelectorAll("#sidebar a[data-scroll-to]")
  );

  scrollLinks.forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = a.getAttribute("data-scroll-to");
      if (!targetId) return;

      // Small delay for interaction feel
      const targetEl = getScrollTarget(targetId);

      if (targetId === "sec-home") {
        setTimeout(() => {
          window.location.href = "../INTRODUCTION/indexintro.html";
        }, 150);
        return;
      }

      setTimeout(() => {
        smoothScrollTo(targetEl);
      }, 150);
    });
  });

  // Scrollspy: highlights ONLY the sidebar item that matches visible content.
  // Sidebar items are expected to contain: a[data-scroll-to="sec-..."]
  const sidebarTargets = Array.from(
    document.querySelectorAll("#sidebar a[data-scroll-to]")
  );

  const sections = sidebarTargets
    .map((el) => getScrollTarget(el.getAttribute("data-scroll-to")))
    .filter(Boolean);

  if (!sidebarTargets.length || !sections.length) return;

  // Map sectionId -> <li> (so we can toggle .active)
  const idToLi = new Map();
  sidebarTargets.forEach((el) => {
    const id = el.getAttribute("data-scroll-to");
    const li = el.closest("li");
    if (id && li) idToLi.set(id, li);
  });

  const clearActive = () => idToLi.forEach((li) => li.classList.remove("active"));

  const setActiveSection = (id) => {
    clearActive();
    idToLi.get(id)?.classList.add("active");
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));

      if (visible.length) setActiveSection(visible[0].target.id);
    },
    {
      threshold: [0.2, 0.35, 0.5, 0.65, 0.8],
      rootMargin: "-35% 0px -55% 0px",
    }
  );

  sections.forEach((sec) => observer.observe(sec));

  // initial
  if (sections[0]) setActiveSection(sections[0].id);
});

