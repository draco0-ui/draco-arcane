/* ============================================
   DRACO ARCANE - Premium Script
   ============================================ */

// ----- DOM Elements -----
const loader = document.getElementById('loader');
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const particleCanvas = document.getElementById('particleCanvas');
const floatingCards = document.getElementById('floatingCards');

// ============================================
// PAGE LOADER
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'visible';
    }, 1500);
});
document.body.style.overflow = 'hidden';

// ============================================
// HEADER SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu-inner a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ============================================
// REVEAL ON SCROLL (Intersection Observer)
// ============================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ============================================
// COUNTER ANIMATION
// ============================================
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const targetValue = parseFloat(target.getAttribute('data-target'));
            const duration = 2000;
            const isDecimal = targetValue % 1 !== 0;
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = targetValue * eased;
                
                target.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    target.textContent = isDecimal ? targetValue.toFixed(1) : targetValue;
                }
            }
            
            requestAnimationFrame(updateCounter);
            counterObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(num => counterObserver.observe(num));

// ============================================
// PARTICLES CANVAS
// ============================================
(function() {
    const canvas = particleCanvas;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulseOffset = Math.random() * Math.PI * 2;
        }
        
        update(time) {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Pulse opacity
            this.currentOpacity = this.opacity + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.15;
            this.currentOpacity = Math.max(0, Math.min(0.5, this.currentOpacity));
            
            // Wrap around edges
            if (this.x < -10) this.x = canvas.width + 10;
            if (this.x > canvas.width + 10) this.x = -10;
            if (this.y < -10) this.y = canvas.height + 10;
            if (this.y > canvas.height + 10) this.y = -10;
        }
        
        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, ${this.currentOpacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    const particleCount = Math.min(60, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update(time);
            particle.draw(ctx);
        });
        
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const opacity = (1 - distance / 150) * 0.08;
                    ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate(0);
})();

// ============================================
// MOUSE PARALLAX ON HERO
// ============================================
(function() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const moveX = (clientX / innerWidth - 0.5) * 30;
        const moveY = (clientY / innerHeight - 0.5) * 30;
        
        if (floatingCards) {
            floatingCards.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
        }
        
        const lightRays = document.querySelector('.hero-light-rays');
        if (lightRays) {
            lightRays.style.transform = `translateX(calc(-50% + ${moveX * 0.3}px)) translateY(${moveY * 0.2}px)`;
        }
    });
})();

// ============================================
// FAQ ACCORDION
// ============================================
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked (if wasn't already open)
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ============================================
// 3D TILT ON VOLUME CARDS
// ============================================
document.querySelectorAll('.volume-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -8;
        const rotateY = (x - centerX) / centerX * 8;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        
        const glow = card.querySelector('.volume-card-glow');
        if (glow) {
            glow.style.transform = `translate(${(x - centerX) * 0.3}px, ${(y - centerY) * 0.3}px)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// GSAP ANIMATIONS (if GSAP loaded)
// ============================================
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax on sections
    gsap.utils.toArray('.glass-card').forEach(card => {
        gsap.fromTo(card, 
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Lazy load images
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.loading = 'lazy';
});

console.log('🂡 DRACO ARCANE - Premium Experience Loaded 🂡');

// ============================================
// GOLDEN SPARKLE CURSOR TRAIL
// ============================================
(function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.id = 'sparkleCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
    
    let width, height;
    let mouseX = -100;
    let mouseY = -100;
    let prevMouseX = -100;
    let prevMouseY = -100;
    let particles = [];
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();
    
    // Track mouse/touch
    document.addEventListener('mousemove', (e) => {
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    document.addEventListener('touchmove', (e) => {
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        spawnParticles(mouseX, mouseY, 3);
    }, { passive: true });
    
    document.addEventListener('touchstart', (e) => {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        prevMouseX = mouseX;
        prevMouseY = mouseY;
    }, { passive: true });
    
    class Sparkle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 1.5;
            this.speedY = (Math.random() - 0.5) * 1.5;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.015;
            this.color = Math.random() > 0.5 ? '#FFD76A' : '#D4AF37';
            this.glow = Math.random() > 0.3;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedY -= 0.01; // Float upward
            this.life -= this.decay;
            this.size *= 0.995;
        }
        
        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = this.life;
            
            // Glow
            if (this.glow) {
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 6;
            }
            
            // Draw sparkle (star shape)
            const cx = this.x;
            const cy = this.y;
            const r = this.size;
            const spikes = 4;
            
            ctx.beginPath();
            for (let i = 0; i < spikes * 2; i++) {
                const radius = i % 2 === 0 ? r : r * 0.4;
                const angle = (i * Math.PI) / spikes - Math.PI / 2;
                const x = cx + Math.cos(angle) * radius;
                const y = cy + Math.sin(angle) * radius;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
            
            ctx.restore();
        }
    }
    
    function spawnParticles(x, y, count) {
        for (let i = 0; i < count; i++) {
            particles.push(new Sparkle(x, y));
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Spawn particles when moving
        const dx = mouseX - prevMouseX;
        const dy = mouseY - prevMouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 3 && mouseX > 0 && mouseY > 0) {
            const spawnCount = Math.min(Math.floor(distance / 4), 3);
            for (let i = 0; i < spawnCount; i++) {
                const x = mouseX + (Math.random() - 0.5) * 8;
                const y = mouseY + (Math.random() - 0.5) * 8;
                particles.push(new Sparkle(x, y));
            }
        }
        
        // Update and draw particles
        particles.forEach((p, index) => {
            p.update();
            p.draw(ctx);
        });
        
        // Remove dead particles
        particles = particles.filter(p => p.life > 0);
        
        // Update previous position
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Extra sparkles on click/tap
    document.addEventListener('click', (e) => {
        spawnParticles(e.clientX, e.clientY, 15);
    });
    
    document.addEventListener('touchstart', (e) => {
        spawnParticles(e.touches[0].clientX, e.touches[0].clientY, 15);
    }, { passive: true });
    
})();