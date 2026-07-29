/*==================================================
DRACO ARCANE
SCRIPT.JS V3.0
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================
      LOADER
    =========================*/

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.style.opacity = "0";

            loader.style.visibility = "hidden";

        }, 800);

    });

    /*=========================
      STICKY HEADER
    =========================*/

    const header = document.getElementById("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

    /*=========================
      MOBILE MENU
    =========================*/

    const menuToggle = document.getElementById("menuToggle");

    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            if (navLinks.classList.contains("active")) {

                menuToggle.innerHTML = "✕";

            } else {

                menuToggle.innerHTML = "☰";

            }

        });

        document.querySelectorAll(".nav-links a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuToggle.innerHTML = "☰";

            });

        });

    }

    /*=========================
      SCROLL REVEAL
    =========================*/

    const revealElements = document.querySelectorAll(

        ".about-card, .feature-card, .volume-card, .founder-card, .promise"

    );

    const revealOnScroll = () => {

        revealElements.forEach(el => {

            const top = el.getBoundingClientRect().top;

            const visible = window.innerHeight - 120;

            if (top < visible) {

                el.classList.add("reveal", "show");

            }

        });

    };

    window.addEventListener("scroll", revealOnScroll);

    revealOnScroll();

    /*=========================
      BACK TO TOP
    =========================*/

    const backTop = document.getElementById("backTop");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    });

    if (backTop) {

        backTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    /*=========================
      ACTIVE NAVIGATION
    =========================*/

    const currentPage = location.pathname.split("/").pop();

    document.querySelectorAll(".nav-links a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {

            link.classList.add("active");

        }

    });

    /*=========================
      PREMIUM CONSOLE MESSAGE
    =========================*/

    console.log(
        "%c🐉 DRACO ARCANE",
        "color:#D4AF37;font-size:22px;font-weight:bold;"
    );

    console.log(
        "%cThe Art of Modern Magic",
        "color:#FFD700;font-size:14px;"
    );

});