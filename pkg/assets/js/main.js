"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const flashElement = document.createElement('div');
    flashElement.className = 'page-load-flash';
    document.body.appendChild(flashElement);
    setTimeout(() => {
        if (document.body.contains(flashElement)) {
            document.body.removeChild(flashElement);
        }
    }, 800);
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.chars = ['5', 'T', '3', 'W', '!', '?', '¿'];
            this.char = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.pushForce = { x: 0, y: 0 };
            this.maxSpeed = 3;
            this.radius = 7.5;
        }
        update() {
            this.vx += this.pushForce.x;
            this.vy += this.pushForce.y;
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > this.maxSpeed) {
                this.vx = (this.vx / speed) * this.maxSpeed;
                this.vy = (this.vy / speed) * this.maxSpeed;
            }
            this.x += this.vx;
            this.y += this.vy;
            this.pushForce.x *= 0.95;
            this.pushForce.y *= 0.95;
            this.vx *= 0.99;
            this.vy *= 0.99;
        }
        draw(ctx) {
            ctx.font = '15px monospace';
            ctx.fillStyle = `rgba(251, 42, 255, 0.75)`;
            ctx.fillText(this.char, this.x, this.y);
        }
    }
    class ParticleSystem {
        constructor() {
            this.canvas = document.createElement('canvas');
            this.canvas.style.position = 'fixed';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.width = '100%';
            this.canvas.style.height = '100%';
            this.canvas.style.zIndex = '1';
            document.body.prepend(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.resizeTimeout = null;
            this.maxParticles = 100;
            this.lastFrame = 0;
            this.fps = 32;
            this.init();
            window.addEventListener('resize', () => this.init());
            this.canvas.__particles__ = this.particles;
            this.animate = this.animate.bind(this);
            this.animate(0);
        }
        init() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.particles = [];
            for (let i = 0; i < this.maxParticles; i++) {
                const x = Math.random() * this.canvas.width;
                const y = Math.random() * this.canvas.height;
                this.particles.push(new Particle(x, y));
            }
            this.canvas.__particles__ = this.particles;
        }
        animate(timestamp) {
            if (!this.lastFrame)
                this.lastFrame = timestamp;
            const elapsed = timestamp - this.lastFrame;
            if (elapsed > (1000 / this.fps)) {
                this.ctx.fillStyle = 'rgba(0, 0, 0, .1)';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                for (let i = 0; i < this.particles.length; i++) {
                    for (let j = i + 1; j < this.particles.length; j++) {
                        this.checkCollision(this.particles[i], this.particles[j]);
                    }
                }
                this.particles.forEach(particle => {
                    particle.update();
                    particle.draw(this.ctx);
                    if (particle.x < 0)
                        particle.x = this.canvas.width;
                    if (particle.x > this.canvas.width)
                        particle.x = 0;
                    if (particle.y < 0)
                        particle.y = this.canvas.height;
                    if (particle.y > this.canvas.height)
                        particle.y = 0;
                });
                this.lastFrame = timestamp;
            }
            requestAnimationFrame((ts) => this.animate(ts));
        }
        checkCollision(p1, p2) {
            const dx = p2.x - p1.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < p1.radius + p2.radius) {
                const angle = Math.atan2(dy, dx);
                const sin = Math.sin(angle);
                const cos = Math.cos(angle);
                const vx1 = p1.vx * cos + p1.vy * sin;
                const vy1 = p1.vy * cos - p1.vx * sin;
                const vx2 = p2.vx * cos + p2.vy * sin;
                const vy2 = p2.vy * cos - p2.vx * sin;
                p1.vx = vx2 * cos - vy1 * sin;
                p1.vy = vy1 * cos + vx2 * sin;
                p2.vx = vx1 * cos - vy2 * sin;
                p2.vy = vy2 * cos + vx1 * sin;
            }
        }
    }
    class Trail {
        constructor() {
            this.points = [];
            this.maxPoints = 25;
            this.mouseMoveHandler = this.handleMouseMove.bind(this);
            this.animationHandler = this.animate.bind(this);
            this.lastX = 0;
            this.lastY = 0;
            this.pushRadius = 80;
            this.pushStrength = 2;
            document.addEventListener('mousemove', this.mouseMoveHandler);
            requestAnimationFrame(this.animationHandler);
        }
        handleMouseMove(event) {
            const x = event.clientX;
            const y = event.clientY;
            if (this.lastX && this.lastY) {
                const dx = x - this.lastX;
                const dy = y - this.lastY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const steps = Math.min(Math.floor(distance / 1.5), 6);
                for (let i = 0; i < steps; i++) {
                    const ratio = i / steps;
                    const point = {
                        x: this.lastX + dx * ratio,
                        y: this.lastY + dy * ratio,
                        lifetime: 25,
                        size: 8,
                        alpha: 0.6
                    };
                    this.points.push(point);
                }
            }
            this.lastX = x;
            this.lastY = y;
            while (this.points.length > this.maxPoints) {
                this.points.shift();
            }
            this.pushParticles(x, y);
        }
        pushParticles(x, y) {
            const canvas = document.querySelector('canvas');
            if (!canvas)
                return;
            const particles = canvas.__particles__;
            if (!particles)
                return;
            particles.forEach(particle => {
                const dx = particle.x - x;
                const dy = particle.y - y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.pushRadius) {
                    const force = (1 - distance / this.pushRadius) * this.pushStrength;
                    particle.pushForce.x += (dx / distance) * force;
                    particle.pushForce.y += (dy / distance) * force;
                }
            });
        }
        animate() {
            const canvas = document.querySelector('canvas');
            if (!canvas)
                return;
            const ctx = canvas.getContext('2d');
            if (!ctx)
                return;
            this.points.forEach((point) => {
                const opacity = (point.lifetime / 25) * point.alpha;
                const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.size);
                gradient.addColorStop(0, `rgba(80, 0, 0, ${opacity})`);
                gradient.addColorStop(1, `rgba(0, 93, 82, 0.93)`);
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
                ctx.fill();
                point.lifetime -= 0.6;
                point.size += 0.35;
                point.alpha *= 0.96;
            });
            this.points = this.points.filter(point => point.lifetime > 0);
            requestAnimationFrame(this.animationHandler);
        }
    }
    class PictureGlow {
        constructor() {
            this.containers = document.querySelectorAll('.picture-container');
            this.setupGlowEffects();
        }
        setupGlowEffects() {
            this.containers.forEach(container => {
                const canvas = container.querySelector('.glow');
                if (!canvas)
                    return;
                const ctx = canvas.getContext('2d');
                if (!ctx)
                    return;
                const updateCanvasSize = () => {
                    canvas.width = container.offsetWidth;
                    canvas.height = container.offsetHeight;
                };
                updateCanvasSize();
                window.addEventListener('resize', updateCanvasSize);
                container.addEventListener('mousemove', ((e) => {
                    const rect = container.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 100);
                    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
                    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    ctx.fillStyle = gradient;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }));
                container.addEventListener('mouseleave', () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                });
            });
        }
    }
    class TypeWriter {
        constructor() {
            this.titleElement = document.getElementById('typing-title');
            this.contentElement = document.getElementById('typing-content');
            this.textElements = document.querySelectorAll('.typing-text');
            this.title = "About me:";
            this.charIndex = 0;
            this.textIndex = 0;
            this.init();
        }
        init() {
            this.typeTitle();
        }
        typeTitle() {
            if (this.charIndex < this.title.length) {
                this.titleElement.textContent += this.title.charAt(this.charIndex);
                this.charIndex++;
                setTimeout(() => this.typeTitle(), 100);
            }
            else {
                this.contentElement.style.opacity = '1';
                this.showContent();
            }
        }
        showContent() {
            if (this.textIndex < this.textElements.length) {
                this.textElements[this.textIndex].classList.add('visible');
                this.textIndex++;
                setTimeout(() => this.showContent(), 100);
            }
        }
    }
    class FogEffect {
        constructor() {
            this.fogCorners = [];
            this.createFogElements();
            this.animateFog();
        }
        createFogElements() {
            const fogContainer = document.createElement('div');
            fogContainer.className = 'fog-container';
            document.body.appendChild(fogContainer);
            const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
            positions.forEach(position => {
                const fogCorner = document.createElement('div');
                fogCorner.className = `fog-corner ${position}`;
                fogContainer.appendChild(fogCorner);
                this.fogCorners.push(fogCorner);
            });
        }
        animateFog() {
            this.fogCorners.forEach((corner, index) => {
                const pulseSpeed = 3000 + (index * 500);
                corner.style.animation = `fogPulse ${pulseSpeed}ms infinite alternate ease-in-out`;
            });
        }
    }
    const particles = new ParticleSystem();
    const trail = new Trail();
    const typeWriter = new TypeWriter();
    const pictureGlow = new PictureGlow();
    const fogEffect = new FogEffect();
    window.addEventListener('resize', () => {
        if (particles.resizeTimeout) {
            clearTimeout(particles.resizeTimeout);
        }
        particles.resizeTimeout = setTimeout(() => particles.init(), 100);
    });
    let heading = document.querySelector("h1");
    heading.addEventListener("click", function () {
        heading.textContent = "Y0U'R3";
    });
    let Heading = document.querySelector("h2");
    Heading.addEventListener("click", function () {
        Heading.textContent = "AMAZ1NG!";
    });
    let githubButton = document.createElement("button");
    githubButton.textContent = "My GitHub";
    githubButton.style.position = "fixed";
    githubButton.style.top = "10px";
    githubButton.style.right = "10px";
    githubButton.style.zIndex = "2";
    document.querySelector('.content').appendChild(githubButton);
    githubButton.addEventListener("click", function () {
        alert("🫶🏼");
        window.open("https://github.com/C0d3-5t3w", "_blank");
    });
});
//# sourceMappingURL=main.js.map