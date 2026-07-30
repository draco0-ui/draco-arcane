/* ==========================================
   DRACO ARCANE V3.0
   Premium Script
========================================== */

// Mobile Navigation

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

// Sticky Header

const header = document.querySelector(".header");

if (header) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

// Reveal Animation

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll("section").forEach((section) => {
    section.classList.add("reveal");
    observer.observe(section);
});

const canvas = document.getElementById("magicParticles");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = [];
const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};

window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener("touchmove", e => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
});

for(let i=0;i<70;i++){
    particles.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:Math.random()*2+1,
        vx:(Math.random()-0.5)*0.4,
        vy:(Math.random()-0.5)*0.4
    });
}

const canvas = document.getElementById("magicParticles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];
let pointer = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

window.addEventListener("mousemove", e => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    createParticles();
});

window.addEventListener("touchmove", e => {
    pointer.x = e.touches[0].clientX;
    pointer.y = e.touches[0].clientY;
    createParticles();
}, { passive: true });

function createParticles() {

    for (let i = 0; i < 4; i++) {

        particles.push({
            x: pointer.x,
            y: pointer.y,

            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,

            size: Math.random() * 4 + 2,

            life: 70
        });

    }

}

const canvas = document.getElementById("magicParticles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];
let pointer = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

window.addEventListener("mousemove", e => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    createParticles();
});

window.addEventListener("touchmove", e => {
    pointer.x = e.touches[0].clientX;
    pointer.y = e.touches[0].clientY;
    createParticles();
}, { passive: true });

function createParticles() {

    for (let i = 0; i < 4; i++) {

        particles.push({
            x: pointer.x,
            y: pointer.y,

            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,

            size: Math.random() * 4 + 2,

            life: 70
        });

    }

}

const canvas = document.getElementById("magicParticles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];
let pointer = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

window.addEventListener("mousemove", e => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    createParticles();
});

window.addEventListener("touchmove", e => {
    pointer.x = e.touches[0].clientX;
    pointer.y = e.touches[0].clientY;
    createParticles();
}, { passive: true });

function createParticles() {

    for (let i = 0; i < 4; i++) {

        particles.push({
            x: pointer.x,
            y: pointer.y,

            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,

            size: Math.random() * 4 + 2,

            life: 70
        });

    }

}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {

        p.x += p.vx;
        p.y += p.vy;

        p.life--;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(255,215,0,${p.life / 70})`;

        ctx.fill();

        if (p.life <= 0) {
            particles.splice(index, 1);
        }

    });

    requestAnimationFrame(animate);

}

animate();