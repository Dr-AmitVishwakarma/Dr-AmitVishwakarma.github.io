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
