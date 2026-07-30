/* ==========================================
   DRACO ARCANE V4.0
   Premium Website Script
========================================== */

/* -------------------------
   Mobile Navigation
-------------------------- */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

/* -------------------------
   Sticky Header
-------------------------- */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (!header) return;

    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

/* -------------------------
   Reveal Animation
-------------------------- */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll("section").forEach(section => {

    section.classList.add("reveal");
    observer.observe(section);

});


/* ==========================================
   MAGIC PARTICLE BACKGROUND
========================================== */

const canvas = document.getElementById("magicParticles");

if (canvas) {

const ctx = canvas.getContext("2d");

function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

const particles = [];

const mouse = {

    x: canvas.width / 2,
    y: canvas.height / 2

};

window.addEventListener("mousemove",(e)=>{

    mouse.x = e.clientX;
    mouse.y = e.clientY;

});

window.addEventListener("touchmove",(e)=>{

    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;

},{passive:true});


for(let i=0;i<90;i++){

    particles.push({

        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,

        vx:(Math.random()-0.5)*0.35,
        vy:(Math.random()-0.5)*0.35,

        size:Math.random()*2+1

    });

}


function draw(){

    /* ==========================================
   MAGIC WAND TRAIL
========================================== */

const canvas = document.getElementById("magicParticles");

if (canvas) {

const ctx = canvas.getContext("2d");

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let sparkles = [];

function createSparkle(x, y){

    for(let i=0;i<6;i++){

        sparkles.push({

            x:x,
            y:y,

            vx:(Math.random()-0.5)*2,
            vy:(Math.random()-0.5)*2,

            size:Math.random()*3+1,

            life:40

        });

    }

}

window.addEventListener("mousemove",e=>{
    createSparkle(e.clientX,e.clientY);
});

window.addEventListener("touchmove",e=>{
    createSparkle(
        e.touches[0].clientX,
        e.touches[0].clientY
    );
},{passive:true});

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    sparkles.forEach((s,index)=>{

        s.x+=s.vx;
        s.y+=s.vy;

        s.life--;

        ctx.beginPath();
        ctx.arc(s.x,s.y,s.size,0,Math.PI*2);

        ctx.fillStyle=`rgba(255,215,0,${s.life/40})`;

        ctx.shadowBlur=18;
        ctx.shadowColor="#FFD700";

        ctx.fill();

        if(s.life<=0){
            sparkles.splice(index,1);
        }

    });

    requestAnimationFrame(animate);

}

animate();

}