/*==================================================
DRACO ARCANE
script.js v2.1
==================================================*/

/*=========================
PAGE LOADER
=========================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.style.transition =
                "opacity .6s ease";

            loader.style.opacity = "0";

            setTimeout(() => {

                loader.style.display = "none";

            }, 600);

        }, 800);

    }

});

/*=========================
STICKY NAVBAR
=========================*/

const header = document.querySelector("header");

function updateNavbar() {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", updateNavbar);

updateNavbar();

/*=========================
SCROLL REVEAL
=========================*/

const revealItems = document.querySelectorAll(

".about-card, .feature-card, .volume-card, .founder-card, .lesson, .course-card, .promise, .section-title, .section-description"

);

revealItems.forEach(item => {

    item.classList.add("reveal");

});

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

revealItems.forEach(item=>{

    observer.observe(item);

});

/*=========================
BACK TO TOP BUTTON
=========================*/

const backTop = document.createElement("button");

backTop.className = "back-top";

backTop.innerHTML = "↑";

backTop.setAttribute(

"aria-label",

"Back to Top"

);

document.body.appendChild(backTop);

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

backTop.classList.add("show");

}else{

backTop.classList.remove("show");

}

});

backTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

/*=========================
ACTIVE NAVIGATION
=========================*/

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-140;

const height=section.offsetHeight;

if(window.scrollY>=top && window.scrollY<top+height){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

const href=link.getAttribute("href");

if(href==="#"+current){

link.classList.add("active");

}

});

});

/*=========================
BUTTON RIPPLE EFFECT
=========================*/

document.querySelectorAll(

".gold-btn,.outline-btn"

).forEach(button=>{

button.addEventListener("click",function(e){

const ripple=document.createElement("span");

const rect=this.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=(e.clientX-rect.left-size/2)+"px";

ripple.style.top=(e.clientY-rect.top-size/2)+"px";

ripple.style.position="absolute";

ripple.style.borderRadius="50%";

ripple.style.background="rgba(255,255,255,.35)";

ripple.style.pointerEvents="none";

ripple.style.transform="scale(0)";

ripple.style.transition="all .6s ease";

this.style.position="relative";

this.style.overflow="hidden";

this.appendChild(ripple);

requestAnimationFrame(()=>{

ripple.style.transform="scale(4)";

ripple.style.opacity="0";

});

setTimeout(()=>{

ripple.remove();

},600);

});

});

/*=========================
HERO ENTRANCE
=========================*/

const hero=document.querySelector(".hero-content");

if(hero){

hero.style.opacity="0";

hero.style.transform="translateY(40px)";

setTimeout(()=>{

hero.style.transition="all .9s ease";

hero.style.opacity="1";

hero.style.transform="translateY(0)";

},250);

}

/*=========================
PAGE FADE-IN
=========================*/

document.addEventListener("DOMContentLoaded",()=>{

document.body.style.opacity="0";

document.body.style.transition="opacity .4s ease";

requestAnimationFrame(()=>{

document.body.style.opacity="1";

});

});

/*=========================
MOBILE MENU
=========================*/

const mobileToggle=document.querySelector(".menu-toggle");

const mobileNav=document.querySelector(".nav-links");

if(mobileToggle && mobileNav){

mobileToggle.addEventListener("click",()=>{

mobileNav.classList.toggle("open");

mobileToggle.classList.toggle("active");

});

}

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

mobileNav?.classList.remove("open");

mobileToggle?.classList.remove("active");

}

});

/*=========================
BUTTON HOVER
=========================*/

document.querySelectorAll(".gold-btn,.outline-btn").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="translateY(-2px)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="translateY(0)";

});

});

/*=========================
CONSOLE SIGNATURE
=========================*/

console.log(

"%cDRACO ARCANE",

"color:#D4AF37;font-size:22px;font-weight:bold;"

);

console.log(

"%cThe Art of Modern Card Magic",

"color:#FFD700;font-size:14px;"

);

console.log(

"%cFounder: Akash Suresh | Magician Draco",

"color:#ffffff;font-size:12px;"

);

/*=========================
INITIALIZE
=========================*/

updateNavbar();

window.dispatchEvent(new Event("scroll"));

/*==================================================
END OF FILE
==================================================*/