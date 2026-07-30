/* ==========================================
   DRACO ARCANE V5
   Premium Script
========================================== */

/* ------------------------------
   PAGE LOADER
------------------------------ */

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

/* ------------------------------
   MOBILE MENU
------------------------------ */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

/* ------------------------------
   HEADER SCROLL
------------------------------ */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

/* ------------------------------
   REVEAL ANIMATION
------------------------------ */

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.15
});

document.querySelectorAll("section").forEach(section=>{

section.classList.add("reveal");

observer.observe(section);

});

/* ------------------------------
   MAGIC TRAIL
------------------------------ */

const canvas=document.getElementById("magicTrail");

const ctx=canvas.getContext("2d");

function resize(){

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

}

resize();

window.addEventListener("resize",resize);

let sparkles=[];

function createSparkle(x,y){

for(let i=0;i<2;i++){

sparkles.push({

x:x,

y:y,

vx:(Math.random()-0.5)*2,

vy:(Math.random()-0.5)*2,

size:Math.random()*2+1,

life:30

});

}

}

window.addEventListener("mousemove",(e)=>{

createSparkle(e.clientX,e.clientY);

});

window.addEventListener("touchmove",(e)=>{

const touch=e.touches[0];

createSparkle(touch.clientX,touch.clientY);

},{passive:true});

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

for(let i=sparkles.length-1;i>=0;i--){

let s=sparkles[i];

s.x+=s.vx;

s.y+=s.vy;

s.life--;

ctx.beginPath();

ctx.arc(s.x,s.y,s.size,0,Math.PI*2);

ctx.fillStyle=`rgba(255,215,120,${s.life/30})`;

ctx.fill();

if(s.life<=0){

sparkles.splice(i,1);

}

}

requestAnimationFrame(animate);

}

animate();

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hide");

    }, 3000);

});