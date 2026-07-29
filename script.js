// ==========================================
// DRACO ARCANE - script.js v2.1
// ==========================================

// Loading Screen
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";

        setTimeout(() => {
            loader.style.display = "none";
        }, 600);
    }, 800);
});

// Sticky Header
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Scroll Reveal
const reveals = document.querySelectorAll(
    ".about-card, .feature-card, .volume-card, .founder-card, .lesson, .course-card"
);

function revealOnScroll() {
    reveals.forEach((item) => {
        const top = item.getBoundingClientRect().top;

        if (top < window.innerHeight - 80) {
            item.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Active Navigation
const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
    link.addEventListener("click", () => {
        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});

// Smooth Button Animation
document.querySelectorAll(".gold-btn, .outline-btn").forEach(btn => {

    btn.addEventListener("mouseenter", () => {
        btn.style.transform = "translateY(-3px)";
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translateY(0)";
    });

});

// Console Branding
console.log("%cDRACO ARCANE", "color:#D4AF37;font-size:22px;font-weight:bold;");
console.log("%cThe Art of Modern Card Magic", "color:white;font-size:14px;");