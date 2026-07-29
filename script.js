
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

/* =========================================
   DRACO ARCANE - VOLUME I FUNCTIONS
========================================= */

// Scroll to lessons
function scrollToLessons() {
  const lessons = document.getElementById("lessons");

  if (lessons) {
    lessons.scrollIntoView({
      behavior: "smooth"
    });
  }
}


// Open lesson modal
function openLesson(lessonId) {

  const modal = document.getElementById("lessonModal");
  const title = document.getElementById("modalLessonTitle");

  if (!modal || !title) {
    return;
  }

  const lessonTitles = {

    lesson1:
      "Lesson 01 — The Magician's Mind",

    lesson2:
      "Lesson 02 — The Art of Misdirection",

    lesson3:
      "Lesson 03 — Control & Precision"

  };

  title.textContent =
    lessonTitles[lessonId] || "Arcane Lesson";

  modal.classList.add("active");

  document.body.style.overflow = "hidden";
}


// Close lesson modal
function closeLesson() {

  const modal = document.getElementById("lessonModal");

  if (!modal) {
    return;
  }

  modal.classList.remove("active");

  document.body.style.overflow = "";
}


// Close modal when clicking outside
document.addEventListener("click", function(event) {

  const modal =
    document.getElementById("lessonModal");

  if (
    modal &&
    event.target === modal
  ) {
    closeLesson();
  }

});


// Close modal with Escape key
document.addEventListener("keydown", function(event) {

  if (event.key === "Escape") {
    closeLesson();
  }

});


// Buy button
function buyVolume() {

  alert(
    "Enrollment system coming soon.\n\n" +
    "The next step is to connect your payment gateway " +
    "and student access system."
  );

}


/* =========================================
   MAGIC PARTICLE BACKGROUND
========================================= */

(function() {

  const canvas =
    document.getElementById("magicCanvas");

  if (!canvas) {
    return;
  }

  const ctx =
    canvas.getContext("2d");

  let particles = [];

  function resizeCanvas() {

    canvas.width =
      window.innerWidth;

    canvas.height =
      window.innerHeight;

  }

  function createParticles() {

    particles = [];

    const count =
      window.innerWidth < 600
        ? 35
        : 70;

    for (let i = 0; i < count; i++) {

      particles.push({

        x:
          Math.random() *
          canvas.width,

        y:
          Math.random() *
          canvas.height,

        size:
          Math.random() * 2 + 0.5,

        speed:
          Math.random() * 0.3 + 0.1,

        opacity:
          Math.random() * 0.7 + 0.2

      });

    }

  }

  function animateParticles() {

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    particles.forEach(function(particle) {

      particle.y -=
        particle.speed;

      if (particle.y < -10) {

        particle.y =
          canvas.height + 10;

        particle.x =
          Math.random() *
          canvas.width;

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
        "rgba(225,185,54," +
        particle.opacity +
        ")";

      ctx.shadowBlur = 10;

      ctx.shadowColor =
        "rgba(225,185,54,0.8)";

      ctx.fill();

    });

    requestAnimationFrame(
      animateParticles
    );

  }

  resizeCanvas();

  createParticles();

  animateParticles();

  window.addEventListener(
    "resize",
    function() {

      resizeCanvas();

      createParticles();

    }
  );

})();