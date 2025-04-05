document.addEventListener("DOMContentLoaded", () => {
    interface BalloonOptions {
        element: HTMLElement;
        stringElement: HTMLElement;
        size: number;
        floatSpeed: number;
        wobbleAmount: number;
        stringLength: number;
        color?: string;
        x: number;
        y: number;
    }

    class Balloon {
        element: HTMLElement;
        stringElement: HTMLElement;
        size: number;
        floatSpeed: number;
        wobbleAmount: number;
        stringLength: number;
        color: string;
        x: number;
        y: number;
        velocityX: number = 0;
        velocityY: number = 0;
        isDragging: boolean = false;
        isPopping: boolean = false;
        dragOffsetX: number = 0;
        dragOffsetY: number = 0;
        wobblePhase: number = Math.random() * Math.PI * 2;
        movementInterval: number | null = null;
        isSquished: boolean = false;
        squishFactor: number = 1;
        originalSize: number;
        restitution: number = 0.65; 
        deformationDuration: number = 300; 
        deformationTimer: number | null = null;
        deformationDirection: string = 'none';
        airResistance: number = 0.97; 
        lastTapTime: number = 0;
        doubleTapDelay: number = 300;
        windEffect: number = 0;
        windChangeTime: number = 0;
        swayAngle: number = 0;
        randomSwaySpeed: number;
        windForce: number = 0;
        stringTension: number = 0.05;
        stringDamping: number = 0.9;
        stringAngle: number = 0;
        stringVelocity: number = 0;

        constructor(options: BalloonOptions) {
            this.element = options.element;
            this.stringElement = options.stringElement;
            this.size = options.size;
            this.floatSpeed = options.floatSpeed;
            this.wobbleAmount = options.wobbleAmount;
            this.stringLength = options.stringLength;
            this.color = options.color || this.element.style.background;
            this.x = options.x;
            this.y = options.y;
            this.originalSize = options.size;
            this.randomSwaySpeed = Math.random() * 0.02 + 0.01;

            this.initialize();
        }

        initialize(): void {
            this.updateStringLength();
            
            this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
            this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
            this.element.addEventListener('dblclick', this.handlePop.bind(this));
            this.element.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.handlePop();
            });

            this.animate();
            this.startRandomMovement();
        }

        updateStringLength(): void {
            this.stringElement.style.height = `${this.stringLength}px`;
        }

        startRandomMovement(): void {
            this.movementInterval = window.setInterval(() => {
                if (!this.isDragging && !this.isPopping) {
                    this.velocityX += (Math.random() - 0.5) * 0.05 * this.floatSpeed;
                    this.velocityY += (Math.random() - 0.8) * 0.05 * this.floatSpeed; 
                }
            }, 500);
        }

        handleMouseDown(e: MouseEvent): void {
            if (this.isPopping) return;
            
            e.preventDefault();
            this.isDragging = true;
            this.element.classList.add('grabbing');
            
            const rect = this.element.getBoundingClientRect();
            this.dragOffsetX = e.clientX - rect.left;
            this.dragOffsetY = e.clientY - rect.top;
            
            document.addEventListener('mousemove', this.handleMouseMove.bind(this));
            document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        }

        handleTouchStart(e: TouchEvent): void {
            if (this.isPopping) return;
            
            e.preventDefault();
            
            const currentTime = Date.now();
            if (currentTime - this.lastTapTime < this.doubleTapDelay) {
                this.handlePop();
                this.lastTapTime = 0;
                return;
            }
            this.lastTapTime = currentTime;
            
            this.isDragging = true;
            this.element.classList.add('grabbing');
            
            const touch = e.touches[0];
            const rect = this.element.getBoundingClientRect();
            this.dragOffsetX = touch.clientX - rect.left;
            this.dragOffsetY = touch.clientY - rect.top;
            
            document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
            document.addEventListener('touchend', this.handleTouchEnd.bind(this));
        }

        handleMouseMove(e: MouseEvent): void {
            if (!this.isDragging) return;
            
            const x = (e.clientX - this.dragOffsetX) / window.innerWidth * 100;
            const y = (e.clientY - this.dragOffsetY) / window.innerHeight * 100;
            
            this.x = Math.max(0, Math.min(x, 100));
            this.y = Math.max(0, Math.min(y, 100));
            
            this.update();
        }

        handleTouchMove(e: TouchEvent): void {
            if (!this.isDragging) return;
            
            e.preventDefault();
            const touch = e.touches[0];
            
            const x = (touch.clientX - this.dragOffsetX) / window.innerWidth * 100;
            const y = (touch.clientY - this.dragOffsetY) / window.innerHeight * 100;
            
            this.x = Math.max(0, Math.min(x, 100));
            this.y = Math.max(0, Math.min(y, 100));
            
            this.update();
        }

        handleMouseUp(): void {
            this.isDragging = false;
            this.element.classList.remove('grabbing');
            
            document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
            document.removeEventListener('mouseup', this.handleMouseUp.bind(this));
            
            this.velocityY = -0.2 * this.floatSpeed;
        }

        handleTouchEnd(): void {
            this.isDragging = false;
            this.element.classList.remove('grabbing');
            
            document.removeEventListener('touchmove', this.handleTouchMove.bind(this));
            document.removeEventListener('touchend', this.handleTouchEnd.bind(this));
            
            this.velocityY = -0.2 * this.floatSpeed;
        }

        handlePop(): void {
            if (this.isPopping) return;
            
            this.isPopping = true;
            this.element.classList.add('popping');
            
            this.createConfetti();
            
            if (this.movementInterval) {
                clearInterval(this.movementInterval);
            }
            
            setTimeout(() => {
                this.element.remove();
                this.stringElement.remove();
                
                const countElement = document.getElementById('balloon-count');
                if (countElement) {
                    const currentCount = parseInt(countElement.textContent || '0');
                    countElement.textContent = (currentCount - 1).toString();
                }
            }, 300);
        }

        createConfetti(): void {
            const rect = this.element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const style = window.getComputedStyle(this.element);
            const bgcolor = style.backgroundColor;
            
            for (let i = 0; i < 30; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                const colors = [
                    bgcolor,
                    'rgba(255, 255, 255, 0.8)',
                    'rgba(255, 215, 0, 0.8)'
                ];
                
                const shapes = ['square', 'rectangle', 'circle'];
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                if (shape === 'circle') {
                    confetti.style.borderRadius = '50%';
                } else if (shape === 'rectangle') {
                    confetti.style.width = '8px';
                    confetti.style.height = '4px';
                }
                
                confetti.style.left = `${centerX}px`;
                confetti.style.top = `${centerY}px`;
                
                document.body.appendChild(confetti);
                
                const angle = Math.random() * Math.PI * 2;
                const speed = 2 + Math.random() * 8;
                const vx = Math.cos(angle) * speed;
                let vy = Math.sin(angle) * speed - 2;
                
                let posX = centerX;
                let posY = centerY;
                let opacity = 1;
                let gravity = 0.2;
                let rotation = Math.random() * 360;
                
                const animateConfetti = () => {
                    posX += vx;
                    posY += vy;
                    vy += gravity;
                    opacity -= 0.02;
                    rotation += 5 + Math.random() * 10;
                    
                    if (opacity <= 0) {
                        confetti.remove();
                        return;
                    }
                    
                    confetti.style.left = `${posX}px`;
                    confetti.style.top = `${posY}px`;
                    confetti.style.opacity = opacity.toString();
                    confetti.style.transform = `rotate(${rotation}deg)`;
                    
                    requestAnimationFrame(animateConfetti);
                };
                
                requestAnimationFrame(animateConfetti);
            }
        }

        applyGravityAttraction(mouseX: number, mouseY: number, strength: number): void {
            if (this.isDragging || this.isPopping) return;
            
            const mouseXPercent = mouseX / window.innerWidth * 100;
            const mouseYPercent = mouseY / window.innerHeight * 100;
            
            const dx = mouseXPercent - this.x;
            const dy = mouseYPercent - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 1) {
                const force = strength / (distance * distance);
                const angle = Math.atan2(dy, dx);
                
                this.velocityX += Math.cos(angle) * force;
                this.velocityY += Math.sin(angle) * force;
            }
        }

        update(): void {
            if (this.isPopping) return;
            
            if (this.isSquished) {
                if (this.deformationDirection === 'vertical') {
                    this.element.style.height = `${this.size * 1.2 * (1 / this.squishFactor)}px`;
                    this.element.style.width = `${this.size * this.squishFactor}px`;
                } else if (this.deformationDirection === 'horizontal') {
                    this.element.style.width = `${this.size * (1 / this.squishFactor)}px`;
                    this.element.style.height = `${this.size * 1.2 * this.squishFactor}px`;
                }
            } else {
                this.element.style.width = `${this.size}px`;
                this.element.style.height = `${this.size * 1.2}px`;
            }
            
            this.element.style.left = `${this.x}%`;
            this.element.style.top = `${this.y}%`;
            
            const balloonCenterX = this.x + (this.size / 200);
            const balloonBottom = this.y + (this.size * 1.2) / 100;
            
            this.stringElement.style.left = `${balloonCenterX}%`;
            this.stringElement.style.top = `${balloonBottom}%`;

            const targetAngle = Math.max(Math.min(this.velocityX * 10, 45), -45);
            const angleDiff = targetAngle - this.stringAngle;
            this.stringVelocity += angleDiff * this.stringTension;
            this.stringVelocity *= this.stringDamping;
            this.stringAngle += this.stringVelocity;
            
            this.stringElement.style.transform = `rotate(${this.stringAngle}deg)`;

            const stretchFactor = Math.sqrt(this.velocityX * this.velocityX + this.velocityY * this.velocityY) * 5;
            const dynamicLength = this.stringLength * (1 + stretchFactor / 100);
            this.stringElement.style.height = `${dynamicLength}px`;
        }

        animate(): void {
            if (this.isPopping) return;
            
            if (!this.isDragging) {
                const time = Date.now() / 1000;
                
                if (time > this.windChangeTime) {
                    this.windChangeTime = time + Math.random() * 5 + 3;
                    this.windForce = (Math.random() - 0.5) * 0.1;
                }
                
                this.velocityY -= 0.003 * this.floatSpeed;
                this.velocityX += this.windForce;
                
                this.velocityX *= this.airResistance;
                this.velocityY *= this.airResistance;
                
                this.swayAngle += this.randomSwaySpeed;
                const wobbleX = Math.sin(time * 1.5 + this.wobblePhase) * 0.02 * this.wobbleAmount;
                const wobbleY = Math.sin(time * 2 + this.wobblePhase + this.swayAngle) * 0.01 * this.wobbleAmount;
                
                this.x += this.velocityX + wobbleX;
                this.y += this.velocityY + wobbleY;
                
                if (this.x < 0) {
                    this.x = 0;
                    this.velocityX = Math.abs(this.velocityX) * this.restitution;
                    this.deform('horizontal');
                    this.swayAngle += Math.PI / 4; 
                } else if (this.x > 100 - this.size / 10) {
                    this.x = 100 - this.size / 10;
                    this.velocityX = -Math.abs(this.velocityX) * this.restitution;
                    this.deform('horizontal');
                    this.swayAngle += Math.PI / 4;
                }
                
                if (this.y < 0) {
                    this.y = 0;
                    this.velocityY = Math.abs(this.velocityY) * this.restitution;
                    this.velocityX += (Math.random() - 0.5) * 0.1;
                    this.deform('vertical');
                } else if (this.y > 100 - this.size / 5) {
                    this.y = 100 - this.size / 5;
                    this.velocityY = -Math.abs(this.velocityY) * this.restitution;
                    this.deform('vertical');
                }
                
                this.update();
            }
            
            requestAnimationFrame(this.animate.bind(this));
        }
        
        deform(direction: string): void {
            if (this.deformationTimer !== null) {
                clearTimeout(this.deformationTimer);
            }
            
            this.isSquished = true;
            this.deformationDirection = direction;
            
            const impactForce = direction === 'vertical' 
                ? Math.abs(this.velocityY) * 2
                : Math.abs(this.velocityX) * 2;
                
            this.squishFactor = Math.min(Math.max(1.1, 1 + impactForce), 1.5);
            
            this.deformationTimer = window.setTimeout(() => {
                if (direction === 'vertical') {
                    this.velocityY += (Math.random() - 0.5) * 0.1;
                } else {
                    this.velocityX += (Math.random() - 0.5) * 0.1;
                }
                
                this.isSquished = false;
                this.deformationDirection = 'none';
                this.deformationTimer = null;
            }, this.deformationDuration);
        }
    }

    class BalloonManager {
        balloons: Balloon[] = [];
        sizeSlider: HTMLInputElement;
        speedSlider: HTMLInputElement;
        wobbleSlider: HTMLInputElement;
        stringLengthSlider: HTMLInputElement;
        addButton: HTMLButtonElement;
        gravityStrengthSlider: HTMLInputElement;
        gravitationEnabled: boolean = false;
        mouseX: number = 0;
        mouseY: number = 0;
        gravityStrength: number = 0;
        globalWindForce: number = 0;
        globalWindTarget: number = 0;
        nextWindChange: number = 0;
        gravityPointer: HTMLElement;
        gravityIndicator: HTMLElement;
        controlsToggle: HTMLElement;
        controlsPanel: HTMLElement;
        
        constructor() {
            this.sizeSlider = document.getElementById('balloon-size') as HTMLInputElement;
            this.speedSlider = document.getElementById('balloon-speed') as HTMLInputElement;
            this.wobbleSlider = document.getElementById('balloon-wobble') as HTMLInputElement;
            this.stringLengthSlider = document.getElementById('string-length') as HTMLInputElement;
            this.addButton = document.getElementById('add-balloons') as HTMLButtonElement;
            this.gravityStrengthSlider = document.getElementById('gravity-strength') as HTMLInputElement;
            this.gravityPointer = document.getElementById('gravity-pointer') as HTMLElement;
            this.gravityIndicator = document.getElementById('gravity-indicator') as HTMLElement;
            this.controlsToggle = document.getElementById('controls-toggle') as HTMLElement;
            this.controlsPanel = document.getElementById('balloon-controls') as HTMLElement;
            
            this.initExistingBalloons();
            this.setupEventListeners();
            this.updateBalloonCount();
            this.startGravityLoop();
            this.simulateWind();
        }
        
        initExistingBalloons(): void {
            const balloonElements = document.querySelectorAll('.balloon');
            const stringElements = document.querySelectorAll('.string');
            
            balloonElements.forEach((balloonElement, index) => {
                const element = balloonElement as HTMLElement;
                const stringElement = stringElements[index] as HTMLElement;
                
                const size = parseInt(element.getAttribute('data-size') || '50');
                const x = parseFloat(element.getAttribute('data-x') || '0');
                const y = parseFloat(element.getAttribute('data-y') || '0');
                
                const balloon = new Balloon({
                    element,
                    stringElement,
                    size,
                    floatSpeed: parseInt(this.speedSlider.value),
                    wobbleAmount: parseInt(this.wobbleSlider.value),
                    stringLength: parseInt(this.stringLengthSlider.value),
                    x,
                    y
                });
                
                this.balloons.push(balloon);
            });
        }
        
        setupEventListeners(): void {
            this.addButton.addEventListener('click', () => {
                this.addBalloons(5);
            });
            
            this.gravityStrengthSlider.addEventListener('input', () => {
                const value = parseInt(this.gravityStrengthSlider.value);
                this.gravityStrength = value * 0.01;
                
                if (value > 0) {
                    this.gravitationEnabled = true;
                    this.gravityPointer.classList.add('active');
                    this.gravityIndicator.classList.add('active');
                } else {
                    this.gravitationEnabled = false;
                    this.gravityPointer.classList.remove('active');
                    this.gravityIndicator.classList.remove('active');
                }
                
                const pointerSize = 20 + (value * 2);
                this.gravityPointer.style.width = `${pointerSize}px`;
                this.gravityPointer.style.height = `${pointerSize}px`;
            });
            
            this.controlsToggle.addEventListener('click', () => {
                this.controlsPanel.classList.toggle('collapsed');
                this.controlsToggle.textContent = this.controlsPanel.classList.contains('collapsed') ? '▲' : '▼';
            });
            
            document.addEventListener('mousemove', (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
                
                if (this.gravitationEnabled) {
                    this.gravityPointer.style.left = `${this.mouseX}px`;
                    this.gravityPointer.style.top = `${this.mouseY}px`;
                }
            });
            
            document.addEventListener('touchmove', (e) => {
                if (e.touches.length > 0) {
                    this.mouseX = e.touches[0].clientX;
                    this.mouseY = e.touches[0].clientY;
                    
                    if (this.gravitationEnabled) {
                        this.gravityPointer.style.left = `${this.mouseX}px`;
                        this.gravityPointer.style.top = `${this.mouseY}px`;
                    }
                }
            });
            
            this.sizeSlider.addEventListener('input', this.updateControlValues.bind(this));
            this.speedSlider.addEventListener('input', this.updateControlValues.bind(this));
            this.wobbleSlider.addEventListener('input', this.updateControlValues.bind(this));
            this.stringLengthSlider.addEventListener('input', this.updateControlValues.bind(this));
        }
        
        startGravityLoop(): void {
            setInterval(() => {
                if (this.gravitationEnabled && this.gravityStrength > 0) {
                    this.balloons.forEach(balloon => {
                        balloon.applyGravityAttraction(this.mouseX, this.mouseY, this.gravityStrength);
                    });
                }
            }, 16); 
        }
        
        simulateWind(): void {
            setInterval(() => {
                const now = Date.now();
                
                if (now > this.nextWindChange) {
                    this.nextWindChange = now + (Math.random() * 5000 + 3000);
                    this.globalWindTarget = (Math.random() - 0.5) * 0.1;
                }
                
                this.globalWindForce += (this.globalWindTarget - this.globalWindForce) * 0.05;
                
                this.balloons.forEach(balloon => {
                    if (!balloon.isDragging && !balloon.isPopping) {
                        balloon.windForce = this.globalWindForce * (0.8 + Math.random() * 0.4);
                    }
                });
            }, 50);
        }
        
        updateControlValues(): void {
            const currentSize = parseInt(this.sizeSlider.value);
            const currentSpeed = parseInt(this.speedSlider.value);
            const currentWobble = parseInt(this.wobbleSlider.value);
            const currentStringLength = parseInt(this.stringLengthSlider.value);
            
            this.balloons.forEach(balloon => {
                if (!balloon.isPopping && !balloon.isDragging) {
                    balloon.wobbleAmount = currentWobble;
                    balloon.floatSpeed = currentSpeed;
                    balloon.stringLength = currentStringLength;
                    balloon.updateStringLength();
                }
            });
        }
        
        addBalloons(count: number): void {
            const container = document.getElementById('balloon-container');
            if (!container) return;
            
            const currentSize = parseInt(this.sizeSlider.value);
            const currentSpeed = parseInt(this.speedSlider.value);
            const currentWobble = parseInt(this.wobbleSlider.value);
            const currentStringLength = parseInt(this.stringLengthSlider.value);
            
            for (let i = 0; i < count; i++) {
                const size = currentSize + Math.round((Math.random() - 0.5) * 20);
                
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                
                const hue = Math.round(Math.random() * 360);
                const saturation = 70 + Math.round(Math.random() * 20);
                const lightness = 50 + Math.round(Math.random() * 10);
                
                const balloonElement = document.createElement('div');
                balloonElement.className = 'balloon';
                balloonElement.style.width = `${size}px`;
                balloonElement.style.height = `${size * 1.2}px`;
                balloonElement.style.left = `${x}%`;
                balloonElement.style.top = `${y}%`;
                balloonElement.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
                
                balloonElement.style.background = `
                    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 35%), 
                    radial-gradient(circle at 70% 80%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 50%),
                    hsla(${hue}, ${saturation}%, ${lightness}%, 0.85)
                `;
                balloonElement.style.boxShadow = 'inset -5px -5px 15px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.3)';
                
                const stringElement = document.createElement('div');
                stringElement.className = 'string';
                stringElement.style.left = `${x + size/200}%`;
                stringElement.style.top = `${y + size*1.2/100}%`;
                stringElement.style.height = `${currentStringLength}px`;
                stringElement.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
                
                const knotElement = document.createElement('div');
                knotElement.className = 'balloon-knot';
                knotElement.style.left = `${x + size/200}%`;
                knotElement.style.top = `${y + size*1.2/100}%`;
                
                container.appendChild(balloonElement);
                container.appendChild(stringElement);
                container.appendChild(knotElement);
                
                const balloon = new Balloon({
                    element: balloonElement,
                    stringElement,
                    size,
                    floatSpeed: currentSpeed,
                    wobbleAmount: currentWobble,
                    stringLength: currentStringLength,
                    x,
                    y
                });
                
                this.balloons.push(balloon);
            }
            
            this.updateBalloonCount();
        }
        
        updateBalloonCount(): void {
            const countElement = document.getElementById('balloon-count');
            if (countElement) {
                countElement.textContent = this.balloons.length.toString();
            }
            
            this.balloons = this.balloons.filter(balloon => !balloon.isPopping);
        }
    }

    const balloonManager = new BalloonManager();
    
    const style = document.createElement('style');
    style.textContent = `
        .balloon-knot {
            position: absolute;
            width: 6px;
            height: 6px;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            z-index: 11;
            transform: translateX(-50%) translateY(-50%);
        }
        
        .balloon {
            transform-origin: center bottom;
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            transition: transform 0.1s ease, width 0.05s ease-out, height 0.05s ease-out;
        }
        
        .string {
            transform-origin: top center;
            transition: height 0.3s ease;
        }
        
        @keyframes pop {
            0% { transform: scale(1); opacity: 1; }
            20% { transform: scale(1.2); opacity: 0.9; }
            40% { transform: scale(1.5); opacity: 0.7; filter: blur(2px); }
            100% { transform: scale(2); opacity: 0; filter: blur(5px); }
        }
        
        .popping {
            animation: pop 0.3s forwards cubic-bezier(0.165, 0.84, 0.44, 1);
        }
    `;
    document.head.appendChild(style);
});

// <3