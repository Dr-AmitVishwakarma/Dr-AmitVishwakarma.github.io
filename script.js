"use strict";

const menuButton = document.getElementById("menu-button");
const navigationMenu = document.getElementById("navigation-menu");
const navigationLinks = navigationMenu.querySelectorAll("a");
const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear().toString();
}

if (menuButton && navigationMenu) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigationMenu.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );
    });
}

navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navigationMenu.classList.remove("open");

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "false");
        }
    });
});
const counters = document.querySelectorAll(".counter");

const animateCounter = (counter) => {
    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || "";
    const duration = 1400;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easedProgress =
            1 - Math.pow(1 - progress, 3);

        const currentValue = Math.floor(target * easedProgress);

        counter.textContent = `${currentValue}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = `${target}${suffix}`;
        }
    };

    requestAnimationFrame(updateCounter);
};

if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                animateCounter(entry.target);
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.4
        }
    );

    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });
} else {
    counters.forEach(animateCounter);
}
