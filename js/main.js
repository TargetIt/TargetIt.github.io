const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const skillBars = document.querySelectorAll(".skill-bar");
const statNumbers = document.querySelectorAll("[data-count]");

const animateSkillBars = () => {
  skillBars.forEach((bar) => {
    const level = bar.dataset.level;
    if (level) {
      bar.style.width = level;
    }
  });
};

const animateCounter = (element) => {
  if (element.dataset.started) {
    return;
  }
  element.dataset.started = "true";
  const target = Number(element.dataset.count || 0);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 60));

  const tick = () => {
    current = Math.min(target, current + step);
    element.textContent = current;
    if (current < target) {
      requestAnimationFrame(tick);
    }
  };

  tick();
};

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillBars();
        statNumbers.forEach((stat) => animateCounter(stat));
      }
    });
  },
  { threshold: 0.4 }
);

if (statNumbers.length > 0) {
  statsObserver.observe(statNumbers[0].closest(".section"));
}
