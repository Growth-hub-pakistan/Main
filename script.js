document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("show"));
  }

  const dashboard = document.getElementById("dashboard");
  const tilt = document.querySelector(".tilt");

  if (dashboard && tilt && window.innerWidth > 1100) {
    let ticking = false;

    dashboard.addEventListener("mousemove", (e) => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const rect = dashboard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * -10;
        const rotateX = ((y / rect.height) - 0.5) * 7;

        tilt.style.transform = `rotateY(${rotateY - 6}deg) rotateX(${rotateX + 3}deg)`;

        ticking = false;
      });
    });

    dashboard.addEventListener("mouseleave", () => {
      tilt.style.transform = "rotateY(-8deg) rotateX(4deg)";
    });
  }
});
