document.addEventListener("DOMContentLoaded", function() {
    class Boson {
        x: number;
        y: number;
        vx: number;
        vy: number;
        radius: number;
        color: string;
        energyState: number;
        phase: number;
        waveAmplitude: number;
        mass: number;
        entangledWith: Boson | null = null;
        isWaveMode: boolean;
        probabilityField: number;
        tunnelProbability: number;
        canPush: boolean = true;
        pushFactor: number = 0.5;
        pushRecoveryTime: number = 500;
        lastPushed: number = 0;
        
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = Math.random() * 3 + 2;
            this.energyState = Math.floor(Math.random() * 5); 
            this.phase = Math.random() * Math.PI * 2;
            this.waveAmplitude = Math.random() * 3 + 1;
            this.mass = Math.random() * 0.5 + 0.5;
            this.isWaveMode = Math.random() > 0.5;
            this.probabilityField = Math.random() * 0.3 + 0.7;
            this.tunnelProbability = Math.random() * 0.15;
            
            const colors = [
                'rgba(0, 255, 255, 0.7)',  
                'rgba(255, 0, 255, 0.7)',
                'rgba(255, 255, 0, 0.7)',
                'rgba(0, 255, 0, 0.7)', 
                'rgba(255, 165, 0, 0.7)'
            ];
            this.color = colors[this.energyState];
        }
        
        update(dt: number, bosons: Boson[], mouseX: number, mouseY: number): void {
            this.phase += 0.05;
            if (Math.random() < 0.01) {
                this.isWaveMode = !this.isWaveMode;
            }
            
            if (!this.canPush && performance.now() - this.lastPushed > this.pushRecoveryTime) {
                this.canPush = true;
            }
            
            if (this.entangledWith && Math.random() < 0.2) {
                this.vx = this.entangledWith.vx * 0.9 + (Math.random() - 0.5) * 0.1;
                this.vy = this.entangledWith.vy * 0.9 + (Math.random() - 0.5) * 0.1;
                
                if (Math.random() < 0.05) {
                    this.energyState = this.entangledWith.energyState;
                }
            }
            
            const dxMouse = this.x - mouseX;
            const dyMouse = this.y - mouseY;
            const distanceToMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
            
            if (distanceToMouse < 150) {
                const mouseFactor = 1 - distanceToMouse / 150;
                
                if (Math.random() < this.tunnelProbability) {
                    this.color = 'rgba(255, 255, 255, 0.9)'; 
                    setTimeout(() => {
                        const colors = [
                            'rgba(0, 255, 255, 0.7)',
                            'rgba(255, 0, 255, 0.7)',
                            'rgba(255, 255, 0, 0.7)',
                            'rgba(0, 255, 0, 0.7)',
                            'rgba(255, 165, 0, 0.7)'
                        ];
                        this.color = colors[this.energyState];
                    }, 100);
                } else {
                    const angleToMouse = Math.atan2(dyMouse, dxMouse);
                    const repelStrength = mouseFactor * (0.8 / this.mass);
                    
                    if (distanceToMouse < 50) {
                        this.vx += Math.cos(angleToMouse) * repelStrength * 1.5;
                        this.vy += Math.sin(angleToMouse) * repelStrength * 1.5;
                        
                        if (Math.random() < 0.03) {
                            this.energyState = Math.floor(Math.random() * 5);
                            const colors = [
                                'rgba(0, 255, 255, 0.7)',
                                'rgba(255, 0, 255, 0.7)',
                                'rgba(255, 255, 0, 0.7)',
                                'rgba(0, 255, 0, 0.7)',
                                'rgba(255, 165, 0, 0.7)'
                            ];
                            this.color = colors[this.energyState];
                        }
                    } else {
                        this.vx += Math.cos(angleToMouse) * repelStrength;
                        this.vy += Math.sin(angleToMouse) * repelStrength;
                    }
                }
            }
            
            for (const other of bosons) {
                if (other === this) continue;
                
                const dx = other.x - this.x;
                const dy = other.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120 && distance > 0) {
                    let force = 0;
                    
                    if (this.energyState === other.energyState) {
                        force = 0.03 * (1 - distance / 120);
                        
                        if (!this.entangledWith && !other.entangledWith && Math.random() < 0.0005) {
                            this.entangledWith = other;
                            other.entangledWith = this;
                        }
                    } else {
                        force = 0.01 * (1 - distance / 120);
                        
                        if (distance < this.radius + other.radius) {
                            force = -0.05; 
                        }
                    }
                    
                    const angle = Math.atan2(dy, dx);
                    this.vx += Math.cos(angle) * force / this.mass;
                    this.vy += Math.sin(angle) * force / this.mass;
                    
                    if (this.isWaveMode && other.isWaveMode && distance < 80) {
                        const phaseDifference = Math.abs(this.phase - other.phase) % (Math.PI * 2);
                        
                        if (phaseDifference < Math.PI/2 || phaseDifference > Math.PI*3/2) {
                            this.vx *= 1.01;
                            this.vy *= 1.01;
                        } else {
                            this.vx *= 0.99;
                            this.vy *= 0.99;
                        }
                    }
                }
            }
            
            this.x += this.vx;
            this.y += this.vy;
            
            if (Math.random() < 0.2) {
                this.x += (Math.random() - 0.5) * 0.5;
                this.y += (Math.random() - 0.5) * 0.5;
            }
            this.vx += (Math.random() - 0.5) * 0.1;
            this.vy += (Math.random() - 0.5) * 0.1;
            
            this.vx *= 0.98;
            this.vy *= 0.98;
            
            if (this.x < 0) this.x = window.innerWidth;
            if (this.x > window.innerWidth) this.x = 0;
            if (this.y < 0) this.y = window.innerHeight;
            if (this.y > window.innerHeight) this.y = 0;
        }
        
        draw(ctx: CanvasRenderingContext2D): void {
            ctx.beginPath();
            
            const waveOffset = Math.sin(this.phase) * this.waveAmplitude;
            let currentRadius = this.radius;
            
            if (this.isWaveMode) {
                currentRadius += waveOffset;
            }
            
            let opacity = this.canPush ? 0.7 : 0.9;
            let color = this.color;
            
            if (!this.canPush) {
                const timeSincePush = performance.now() - this.lastPushed;
                const pushProgress = Math.min(timeSincePush / this.pushRecoveryTime, 1);
                if (pushProgress < 0.3) {
                    color = 'rgba(255, 32, 32, 0.8)';
                }
            }
            
            ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, currentRadius * 3
            );
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, currentRadius * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            if (this.entangledWith) {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.entangledWith.x, this.entangledWith.y);
                ctx.strokeStyle = `rgba(255, 255, 255, 0.2)`;
                ctx.lineWidth = 0.5;
                ctx.setLineDash([2, 3]); 
                ctx.stroke();
                ctx.setLineDash([]);
            }
            
            if (this.isWaveMode) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, currentRadius * (1.5 + Math.sin(this.phase) * 0.5), 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255, 255, 255, 0.1)`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
    
    class BosonSystem {
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
        bosons: Boson[];
        lastTime: number;
        mouseX: number = 0;
        mouseY: number = 0;
        mouseVelocityX: number = 0;
        mouseVelocityY: number = 0;
        lastMouseX: number = 0;
        lastMouseY: number = 0;
        isRunning: boolean = true;
        bosonCount: number = 100; 
        mouseRadius: number = 100;
        mouseStrength: number = 1;
        showMouseField: boolean = false;
        
        constructor() {
            this.canvas = document.createElement('canvas');
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.canvas.style.position = 'fixed';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.zIndex = '1';
            this.canvas.style.pointerEvents = 'none';
            document.body.appendChild(this.canvas);
            
            this.ctx = this.canvas.getContext('2d')!;
            this.bosons = [];
            this.lastTime = 0;
            this.lastMouseX = this.mouseX;
            this.lastMouseY = this.mouseY;
            
            this.createBosons();
            
            this.createBosonClusters();
            
            window.addEventListener('resize', () => this.handleResize());
            document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
            document.addEventListener('click', (e) => this.handleClick(e));
            document.addEventListener('keydown', (e) => this.handleKeyDown(e));
            
            this.animate(0);
        }
        
        createBosons(): void {
            this.bosons = [];
            for (let i = 0; i < this.bosonCount; i++) {
                const x = Math.random() * this.canvas.width;
                const y = Math.random() * this.canvas.height;
                this.bosons.push(new Boson(x, y));
            }
        }
        
        createBosonClusters(): void {
            for (let i = 0; i < 3; i++) {
                const energyState = Math.floor(Math.random() * 5);
                const centerX = Math.random() * this.canvas.width;
                const centerY = Math.random() * this.canvas.height;
                const clusterSize = 5 + Math.floor(Math.random() * 10);
                
                for (let j = 0; j < clusterSize; j++) {
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * 30;
                    const x = centerX + Math.cos(angle) * distance;
                    const y = centerY + Math.sin(angle) * distance;
                    
                    const boson = new Boson(x, y);
                    boson.energyState = energyState;
                    
                    const colors = [
                        'rgba(0, 255, 255, 0.7)',
                        'rgba(255, 0, 255, 0.7)',
                        'rgba(255, 255, 0, 0.7)',
                        'rgba(0, 255, 0, 0.7)',
                        'rgba(255, 165, 0, 0.7)'
                    ];
                    boson.color = colors[energyState];
                    
                    this.bosons.push(boson);
                }
            }
        }
        
        handleResize(): void {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        
        handleMouseMove(e: MouseEvent): void {
            const prevMouseX = this.mouseX;
            const prevMouseY = this.mouseY;
            
            this.mouseVelocityX = e.clientX - this.mouseX;
            this.mouseVelocityY = e.clientY - this.mouseY;
            
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            const mouseSpeed = Math.sqrt(
                this.mouseVelocityX * this.mouseVelocityX + 
                this.mouseVelocityY * this.mouseVelocityY
            );
            
            if (mouseSpeed > 3) {
                const mouseAngle = Math.atan2(this.mouseVelocityY, this.mouseVelocityX);
                
                for (const boson of this.bosons) {
                    if (!boson.canPush) continue;
                    
                    const dx = boson.x - this.mouseX;
                    const dy = boson.y - this.mouseY;
                    const distanceToMouse = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distanceToMouse < this.mouseRadius * 0.6) {
                        const pushStrength = mouseSpeed * boson.pushFactor / boson.mass;
                        
                        boson.vx += Math.cos(mouseAngle) * pushStrength;
                        boson.vy += Math.sin(mouseAngle) * pushStrength;
                        
                        boson.canPush = false;
                        boson.lastPushed = performance.now();
                        
                        if (Math.random() < 0.1) {
                            boson.energyState = Math.floor(Math.random() * 5);
                            const colors = [
                                'rgba(0, 255, 255, 0.7)',
                                'rgba(255, 0, 255, 0.7)',
                                'rgba(255, 255, 0, 0.7)',
                                'rgba(0, 255, 0, 0.7)',
                                'rgba(255, 165, 0, 0.7)'
                            ];
                            boson.color = colors[boson.energyState];
                        }
                    }
                }
                
                if (mouseSpeed > 10 && this.showMouseField) {
                    this.createMouseTrail(prevMouseX, prevMouseY, this.mouseX, this.mouseY);
                }
            }
        }
        
        createMouseTrail(startX: number, startY: number, endX: number, endY: number): void {
            const trailDuration = 300;
            const startTime = performance.now();
            
            const animateTrail = (timestamp: number) => {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / trailDuration, 1);
                
                const opacity = 0.4 * (1 - progress);
                
                this.ctx.beginPath();
                this.ctx.moveTo(startX, startY);
                this.ctx.lineTo(endX, endY);
                this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                this.ctx.lineWidth = 2 * (1 - progress);
                this.ctx.stroke();
                
                if (progress < 1) {
                    requestAnimationFrame(animateTrail);
                }
            };
            
            requestAnimationFrame(animateTrail);
        }
        
        handleClick(e: MouseEvent): void {
            const fluctuationPower = 8 + Math.floor(Math.random() * 5);
            const fluctuationEnergy = Math.floor(Math.random() * 5);
            
            for (let i = 0; i < fluctuationPower; i++) {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 40;
                const x = e.clientX + Math.cos(angle) * distance;
                const y = e.clientY + Math.sin(angle) * distance;
                
                if (this.bosons.length < 200) { 
                    const boson = new Boson(x, y);
                    boson.energyState = fluctuationEnergy;
                    
                    const colors = [
                        'rgba(0, 255, 255, 0.7)',
                        'rgba(255, 0, 255, 0.7)',
                        'rgba(255, 255, 0, 0.7)',
                        'rgba(0, 255, 0, 0.7)',
                        'rgba(255, 165, 0, 0.7)'
                    ];
                    boson.color = colors[fluctuationEnergy];
                    
                    boson.vx = Math.cos(angle) * (2 + Math.random() * 2);
                    boson.vy = Math.sin(angle) * (2 + Math.random() * 2);
                    
                    this.bosons.push(boson);
                }
            }
            
            this.createFieldDisturbance(e.clientX, e.clientY);
        }
        
        handleKeyDown(e: KeyboardEvent): void {
            if (e.key === 'f' || e.key === 'F') {
                this.showMouseField = !this.showMouseField;
            }
            
            if (e.key >= '1' && e.key <= '9') {
                this.mouseStrength = parseInt(e.key);
            }
            
            if (e.key === ' ') {
                this.createBosons();
                this.createBosonClusters();
            }
        }
        
        createFieldDisturbance(x: number, y: number): void {
            const fieldRadius = 100;
            const duration = 500; 
            const startTime = performance.now();
            
            const animateField = (timestamp: number) => {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentRadius = fieldRadius * progress;
                const opacity = 0.5 * (1 - progress);
                
                this.ctx.beginPath();
                this.ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
                this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                this.ctx.lineWidth = 2 * (1 - progress);
                this.ctx.stroke();
                
                if (progress < 1) {
                    requestAnimationFrame(animateField);
                }
            };
            
            requestAnimationFrame(animateField);
        }
        
        animate(timestamp: number): void {
            if (!this.lastTime) this.lastTime = timestamp;
            const dt = timestamp - this.lastTime;
            this.lastTime = timestamp;
            
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            if (this.showMouseField && (this.mouseVelocityX !== 0 || this.mouseVelocityY !== 0)) {
                this.ctx.beginPath();
                this.ctx.arc(this.mouseX, this.mouseY, this.mouseRadius, 0, Math.PI * 2);
                this.ctx.strokeStyle = `rgba(255, 255, 255, 0.2)`;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
                
                const velocityScale = 5;
                this.ctx.beginPath();
                this.ctx.moveTo(this.mouseX, this.mouseY);
                this.ctx.lineTo(
                    this.mouseX + this.mouseVelocityX * velocityScale,
                    this.mouseY + this.mouseVelocityY * velocityScale
                );
                this.ctx.strokeStyle = `rgba(255, 100, 100, 0.5)`;
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
            }
            
            for (const boson of this.bosons) {
                boson.update(dt, this.bosons, this.mouseX, this.mouseY);
                boson.draw(this.ctx);
            }
            
            this.drawConnections();
            
            this.drawQuantumFields();
            
            this.updateEntanglements();
            
            requestAnimationFrame((t) => this.animate(t));
        }
        
        drawConnections(): void {
            for (let i = 0; i < this.bosons.length; i++) {
                const boson1 = this.bosons[i];
                
                for (let j = i + 1; j < this.bosons.length; j++) {
                    const boson2 = this.bosons[j];
                    
                    if (boson1.energyState === boson2.energyState) {
                        const dx = boson2.x - boson1.x;
                        const dy = boson2.y - boson1.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 100) {
                            const opacity = 0.8 * (1 - distance / 100);
                            
                            this.ctx.beginPath();
                            this.ctx.moveTo(boson1.x, boson1.y);
                            this.ctx.lineTo(boson2.x, boson2.y);
                            
                            const colors = [
                                'rgba(0, 255, 255, ' + opacity + ')',
                                'rgba(255, 0, 255, ' + opacity + ')',
                                'rgba(255, 255, 0, ' + opacity + ')',
                                'rgba(0, 255, 0, ' + opacity + ')',
                                'rgba(255, 165, 0, ' + opacity + ')'
                            ];
                            this.ctx.strokeStyle = colors[boson1.energyState];
                            this.ctx.lineWidth = 0.5;
                            this.ctx.stroke();
                        }
                    }
                }
            }
        }
        
        drawQuantumFields(): void {
            for (let i = 0; i < 5; i++) {
                const bosonsInState = this.bosons.filter(b => b.energyState === i);
                
                if (bosonsInState.length > 3) {
                    let centerX = 0, centerY = 0;
                    for (const boson of bosonsInState) {
                        centerX += boson.x;
                        centerY += boson.y;
                    }
                    centerX /= bosonsInState.length;
                    centerY /= bosonsInState.length;
                    
                    let maxDistance = 0;
                    for (const boson of bosonsInState) {
                        const dx = boson.x - centerX;
                        const dy = boson.y - centerY;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        maxDistance = Math.max(maxDistance, distance);
                    }
                    
                    const fieldRadius = Math.max(150, maxDistance * 1.5);
                    
                    const gradient = this.ctx.createRadialGradient(
                        centerX, centerY, 0,
                        centerX, centerY, fieldRadius
                    );
                    
                    const colors = [
                        'rgba(0, 255, 255, 0.03)',
                        'rgba(255, 0, 255, 0.03)',
                        'rgba(255, 255, 0, 0.03)',
                        'rgba(0, 255, 0, 0.03)',
                        'rgba(255, 165, 0, 0.03)'
                    ];
                    
                    gradient.addColorStop(0, colors[i]);
                    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    
                    this.ctx.beginPath();
                    this.ctx.arc(centerX, centerY, fieldRadius, 0, Math.PI * 2);
                    this.ctx.fillStyle = gradient;
                    this.ctx.fill();
                }
            }
        }
        
        updateEntanglements(): void {
            for (const boson of this.bosons) {
                if (boson.entangledWith && Math.random() < 0.001) {
                    boson.entangledWith.entangledWith = null;
                    boson.entangledWith = null;
                }
            }
        }
    }
    
    const bosonSystem = new BosonSystem();
});
