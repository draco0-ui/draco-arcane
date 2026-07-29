
/* ========================================
   DRACO ARCANE
   MAGIC PARTICLE SYSTEM
======================================== */

const canvas = document.getElementById("magicCanvas");

const ctx = canvas.getContext("2d");

let particles = [];

let width;
let height;


/* CANVAS SIZE */

function resizeCanvas() {

    width = canvas.width = window.innerWidth;

    height = canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


/* CREATE PARTICLES */

function createParticles() {

    particles = [];

    const particleCount =
        window.innerWidth < 600
        ? 45
        : 100;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particles.push({

            x:
                Math.random()
                * width,

            y:
                Math.random()
                * height,

            size:
                Math.random()
                * 2
                + 0.5,

            speed:
                Math.random()
                * 0.4
                + 0.1,

            opacity:
                Math.random()
                * 0.6
                + 0.2,

            drift:
                Math.random()
                * 0.5
                - 0.25

        });

    }

}

createParticles();


/* ANIMATE PARTICLES */

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    particles.forEach(
        particle => {

            particle.y -=
                particle.speed;

            particle.x +=
                particle.drift;


            if (
                particle.y < -10
            ) {

                particle.y =
                    height + 10;

                particle.x =
                    Math.random()
                    * width;

            }


            if (
                particle.x < -10
            ) {

                particle.x =
                    width + 10;

            }


            if (
                particle.x > width + 10
            ) {

                particle.x =
                    -10;

            }


            ctx.beginPath();


            ctx.arc(

                particle.x,

                particle.y,

                particle.size,

                0,

                Math.PI * 2

            );


            ctx.fillStyle =
                `rgba(212,175,55,${particle.opacity})`;


            ctx.shadowBlur = 10;

            ctx.shadowColor =
                "rgba(212,175,55,0.8)";


            ctx.fill();

        }
    );


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();


/* MOBILE MENU */

const menuButton =
    document.getElementById(
        "menuButton"
    );

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


menuButton.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle(
            "active"
        );

    }
);


/* CLOSE MOBILE MENU AFTER CLICK */

document
    .querySelectorAll(
        ".mobile-menu a"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "active"
                    );

                }
            );

        }
    );


/* VOLUME MODAL */

const modal =
    document.getElementById(
        "volumeModal"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );


function openVolume(
    volumeName
) {

    modalTitle.textContent =
        volumeName;

    modal.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}


function closeVolume() {

    modal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


/* CLOSE MODAL WHEN CLICKING OUTSIDE */

modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            closeVolume();

        }

    }
);


/* ESC KEY CLOSES MODAL */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeVolume();

        }

    }
);