document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       LANGUAGE SWITCHER
    ========================= */

    const languageButtons =
        document.querySelectorAll(".language-button");

    const isEnglishPage =
        window.location.pathname === "/en/" ||
        window.location.pathname.startsWith("/en/");

    function getEnglishPath() {
        const path = window.location.pathname;

        if (
            path === "/" ||
            path.endsWith("/index.html")
        ) {
            return "/en/";
        }

        if (path.endsWith("/beautyspace.html")) {
            return "/en/beautyspace.html";
        }

        if (path.endsWith("/royal-garage.html")) {
            return "/en/royal-garage.html";
        }

        return "/en/";
    }


    function getUkrainianPath() {
        const path = window.location.pathname;

        if (
            path === "/en/" ||
            path.endsWith("/en/index.html")
        ) {
            return "/";
        }

        if (path.endsWith("/en/beautyspace.html")) {
            return "/beautyspace.html";
        }

        if (path.endsWith("/en/royal-garage.html")) {
            return "/royal-garage.html";
        }

        return "/";
    }


    languageButtons.forEach((button) => {

        const language = button.dataset.language;

        const isActive =
            (language === "en" && isEnglishPage) ||
            (language === "uk" && !isEnglishPage);

        button.classList.toggle("active", isActive);

        button.setAttribute(
            "aria-pressed",
            String(isActive)
        );


        button.addEventListener("click", () => {

            if (language === "en") {

                if (isEnglishPage) {
                    return;
                }

                window.location.href =
                    getEnglishPath();

                return;
            }


            if (!isEnglishPage) {
                return;
            }

            window.location.href =
                getUkrainianPath();

        });

    });



    /* =========================
       SCROLL TO TOP
    ========================= */

    const scrollTopButton =
        document.getElementById("scrollTopButton");

    if (scrollTopButton) {

        window.addEventListener("scroll", () => {

            scrollTopButton.classList.toggle(
                "visible",
                window.scrollY > 400
            );

        });


        scrollTopButton.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }



    /* =========================
       MOBILE MENU
    ========================= */

    const menuButton =
        document.querySelector(".menu-button");

    const mainNav =
        document.querySelector(".main-nav");


    function updateMenuAccessibility() {

        if (!menuButton || !mainNav) {
            return;
        }

        const isOpen =
            mainNav.classList.contains("mobile-open");

        menuButton.setAttribute(
            "aria-label",
            isEnglishPage
                ? (isOpen ? "Close Menu" : "Open Menu")
                : (isOpen ? "Закрити меню" : "Відкрити меню")
        );

    }


    if (menuButton && mainNav) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    mainNav.classList.toggle("mobile-open");

                menuButton.textContent =
                    isOpen ? "✕" : "☰";

                menuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                updateMenuAccessibility();

            }
        );


        mainNav
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        mainNav.classList.remove(
                            "mobile-open"
                        );

                        menuButton.textContent = "☰";

                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        updateMenuAccessibility();

                    }
                );

            });


        updateMenuAccessibility();

    }

});