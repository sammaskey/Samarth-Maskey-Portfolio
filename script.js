const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible?.target?.id) return;

      for (const link of navLinks) {
        const isCurrent = link.getAttribute("href") === `#${visible.target.id}`;
        link.setAttribute("aria-current", String(isCurrent));
        if (!isCurrent) {
          link.removeAttribute("aria-current");
        }
      }
    },
    {
      rootMargin: "-35% 0px -45% 0px",
      threshold: [0.2, 0.5, 0.75],
    }
  );

  for (const section of sections) {
    observer.observe(section);
  }
}
