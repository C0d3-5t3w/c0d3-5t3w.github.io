document.addEventListener('DOMContentLoaded', () => {
    const particles = document.querySelectorAll('.particle') as NodeListOf<HTMLElement>;
    const particleContainer = document.getElementById('particle-container') as HTMLElement;
    const particleCountDisplay = document.getElementById('particle-count') as HTMLElement;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const sizeSlider = document.getElementById('particle-size') as HTMLInputElement;
    const speedSlider = document.getElementById('particle-speed') as HTMLInputElement;
    const addButton = document.getElementById('add-particles') as HTMLButtonElement;
    const controlsToggle = document.getElementById('controls-toggle') as HTMLButtonElement;
    const particleControls = document.getElementById('particle-controls') as HTMLElement;

    let particleSpeed = 5;

    controlsToggle.addEventListener('click', () => {
        particleControls.classList.toggle('collapsed');
        controlsToggle.textContent = particleControls.classList.contains('collapsed') ? '▼' : '▲';
    });

    sizeSlider.addEventListener('change', () => {
        const newSize = sizeSlider.value;
        particles.forEach(p => {
            const particle = p as HTMLElement;
            particle.style.width = `${newSize}px`;
            particle.style.height = `${newSize}px`;
        });
    });

    speedSlider.addEventListener('change', () => {
        particleSpeed = parseInt(speedSlider.value);
    });

    addButton.addEventListener('click', () => {
        for (let i = 0; i < 25; i++) {
            const size = parseInt(sizeSlider.value);
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const hue = Math.random() * 360;
            createParticle(size, x, y, hue);
        }
    });

    function updateParticleCount(): void {
        particleCountDisplay.textContent = document.querySelectorAll('.particle').length.toString();
    }
    updateParticleCount();

    particles.forEach(particle => {
        particle.addEventListener('mouseenter', (e) => {
            e.stopPropagation();
            explodeParticle(particle);
        });

        particle.addEventListener('click', (e) => {
            e.stopPropagation();
            explodeParticle(particle);
        });
    });

    function createParticle(size: number, x: number, y: number, hue: number, angle: number | null = null, distance: number | null = null): HTMLElement {
        const particle = document.createElement('div');
        particle.className = 'particle enhanced';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.background = `hsla(${hue}, 70%, 50%, 0.6)`;
        particle.style.boxShadow = `0 0 15px var(--alt-glow)`;

        particle.dataset.size = size.toString();
        particle.dataset.x = x.toString();
        particle.dataset.y = y.toString();
        particle.dataset.hue = hue.toString();
        if (angle !== null) particle.dataset.angle = angle.toString();
        if (distance !== null) particle.dataset.distance = distance.toString();

        particleContainer.appendChild(particle);

        particle.addEventListener('mouseenter', (e) => {
            e.stopPropagation();
            explodeParticle(particle);
        });

        particle.addEventListener('click', (e) => {
            e.stopPropagation();
            explodeParticle(particle);
        });

        updateParticleCount();
        moveParticle(particle);
        return particle;
    }

    function explodeParticle(particle: HTMLElement): void {
        const size = parseFloat(particle.dataset.size || '0');
        const x = parseFloat(particle.dataset.x || '0');
        const y = parseFloat(particle.dataset.y || '0');
        const hue = parseInt(particle.dataset.hue || '0');

        const flash = document.createElement('div');
        flash.className = 'flash';
        flash.style.width = `${size}px`;
        flash.style.height = `${size}px`;
        flash.style.left = `${x}%`;
        flash.style.top = `${y}%`;
        particleContainer.appendChild(flash);
        setTimeout(() => flash.remove(), 100);

        if (size < 5) {
            particle.remove();
            updateParticleCount();
            return;
        }

        particle.classList.add('exploding');

        const numChildren = Math.min(Math.floor(size / 2), 5);

        for (let i = 0; i < numChildren; i++) {
            const newSize = Math.max(size / 2, 5);
            const angle = (i / numChildren) * Math.PI * 2;
            const distance = Math.min(screenWidth, screenHeight) / 2;

            const newX = x + (Math.cos(angle) * distance * 0.01);
            const newY = y + (Math.sin(angle) * distance * 0.01);

            const newHue = (hue + Math.random() * 60 - 30) % 360;

            createParticle(newSize, newX, newY, newHue, angle, distance);
        }

        setTimeout(() => {
            particle.remove();
            updateParticleCount();
        }, 500);
    }

    function moveParticle(particle: HTMLElement): void {
        const angle = parseFloat(particle.dataset.angle || '0');
        const distance = parseFloat(particle.dataset.distance || '0');
        let speed = 0.1;
        const deceleration = speed / (5 * 60);

        function move(): void {
            if (speed <= 0) return;

            const x = parseFloat(particle.dataset.x || '0');
            const y = parseFloat(particle.dataset.y || '0');
            const newX = x + Math.cos(angle) * speed;
            const newY = y + Math.sin(angle) * speed;

            particle.style.left = `${newX}%`;
            particle.style.top = `${newY}%`;

            particle.dataset.x = newX.toString();
            particle.dataset.y = newY.toString();

            speed -= deceleration;

            requestAnimationFrame(move);
        }

        move();
    }

    function checkAndRespawnParticles(): void {
        const particleCount = document.querySelectorAll('.particle').length;
        if (particleCount < 50) {
            for (let i = 0; i < 10; i++) {
                const size = rand(10, 30);
                const x = rand(0, 100);
                const y = rand(0, 100);
                const hue = rand(0, 360);
                createParticle(size, x, y, hue);
            }
        }
    }

    function rand(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    setInterval(checkAndRespawnParticles, 3000);

    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement | null;
        if (element && element.classList.contains('particle')) {
            explodeParticle(element);
        }
    });
});
