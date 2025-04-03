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
        
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = Math.random() * 3 + 2;
            this.energyState = Math.floor(Math.random() * 5); // Quantum energy levels
            this.phase = Math.random() * Math.PI * 2;
            this.waveAmplitude = Math.random() * 3 + 1;
            
            // Color based on energy state - quantum-like colors
            const colors = [
                'rgba(0, 255, 255, 0.7)',  // Cyan
                'rgba(255, 0, 255, 0.7)',  // Magenta
                'rgba(255, 255, 0, 0.7)',  // Yellow
                'rgba(0, 255, 0, 0.7)',    // Green
                'rgba(255, 165, 0, 0.7)'   // Orange
            ];
            this.color = colors[this.energyState];
        }
        
        update(dt: number, bosons: Boson[]): void {
            // Quantum wave behavior
            this.phase += 0.05;
            
            // Apply boson statistics - attraction to particles with same energy state
            for (const other of bosons) {
                if (other === this) continue;
                
                const dx = other.x - this.x;
                const dy = other.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = 0.02 * (this.energyState === other.energyState ? 1 : 0.1);
                    const angle = Math.atan2(dy, dx);
                    this.vx += Math.cos(angle) * force;
                    this.vy += Math.sin(angle) * force;
                }
            }
            
            // Apply velocity
            this.x += this.vx;
            this.y += this.vy;
            
            // Add slight randomness (quantum uncertainty)
            this.vx += (Math.random() - 0.5) * 0.2;
            this.vy += (Math.random() - 0.5) * 0.2;
            
            // Damping
            this.vx *= 0.98;
            this.vy *= 0.98;
            
            // Boundary check with wrap-around
            if (this.x < 0) this.x = window.innerWidth;
            if (this.x > window.innerWidth) this.x = 0;
            if (this.y < 0) this.y = window.innerHeight;
            if (this.y > window.innerHeight) this.y = 0;
        }
        
        draw(ctx: CanvasRenderingContext2D): void {
            ctx.beginPath();
            
            // Wave-like behavior (bosons can exhibit wave properties)
            const waveOffset = Math.sin(this.phase) * this.waveAmplitude;
            const currentRadius = this.radius + waveOffset;
            
            ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            
            // Add a glow effect (represents quantum field)
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
            
            // Draw connections between bosons of same energy state
            // (This will be done in the BosonSystem class)
        }
    }
    
    class BosonSystem {
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
        bosons: Boson[];
        lastTime: number;
        mouseX: number = 0;
        mouseY: number = 0;
        isRunning: boolean = true;
        bosonCount: number = 100; // Number of bosons to create
        
        constructor() {
            // Create canvas
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
            
            // Create initial bosons
            this.createBosons();
            
            // Set up event listeners
            window.addEventListener('resize', () => this.handleResize());
            document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
            document.addEventListener('click', (e) => this.handleClick(e));
            
            // Start animation
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
        
        handleResize(): void {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        
        handleMouseMove(e: MouseEvent): void {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // Create a quantum excitation (perturbation in the field)
            for (const boson of this.bosons) {
                const dx = boson.x - this.mouseX;
                const dy = boson.y - this.mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = 0.5 * (1 - distance / 100);
                    const angle = Math.atan2(dy, dx);
                    boson.vx += Math.cos(angle) * force;
                    boson.vy += Math.sin(angle) * force;
                }
            }
        }
        
        handleClick(e: MouseEvent): void {
            // Create a quantum fluctuation - add new bosons at click position
            for (let i = 0; i < 5; i++) {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 20;
                const x = e.clientX + Math.cos(angle) * distance;
                const y = e.clientY + Math.sin(angle) * distance;
                
                if (this.bosons.length < 200) { // Limit maximum bosons
                    this.bosons.push(new Boson(x, y));
                }
            }
        }
        
        animate(timestamp: number): void {
            if (!this.lastTime) this.lastTime = timestamp;
            const dt = timestamp - this.lastTime;
            this.lastTime = timestamp;
            
            // Clear canvas with fade effect for trails
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Update and draw bosons
            for (const boson of this.bosons) {
                boson.update(dt, this.bosons);
                boson.draw(this.ctx);
            }
            
            // Draw connections between bosons of same energy state
            this.drawConnections();
            
            // Draw quantum fields (probability distributions)
            this.drawQuantumFields();
            
            requestAnimationFrame((t) => this.animate(t));
        }
        
        drawConnections(): void {
            // Draw connections between bosons of the same energy state
            for (let i = 0; i < this.bosons.length; i++) {
                const boson1 = this.bosons[i];
                
                for (let j = i + 1; j < this.bosons.length; j++) {
                    const boson2 = this.bosons[j];
                    
                    if (boson1.energyState === boson2.energyState) {
                        const dx = boson2.x - boson1.x;
                        const dy = boson2.y - boson1.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 100) {
                            // Draw a line between them
                            this.ctx.beginPath();
                            this.ctx.moveTo(boson1.x, boson1.y);
                            this.ctx.lineTo(boson2.x, boson2.y);
                            this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 * (1 - distance / 100)})`;
                            this.ctx.lineWidth = 0.5;
                            this.ctx.stroke();
                        }
                    }
                }
            }
        }
        
        drawQuantumFields(): void {
            // Create a subtle background effect representing quantum fields
            for (let i = 0; i < 5; i++) { // For each energy state
                const bosonsInState = this.bosons.filter(b => b.energyState === i);
                
                if (bosonsInState.length > 0) {
                    // Calculate the "center of mass" for this energy state
                    let centerX = 0, centerY = 0;
                    for (const boson of bosonsInState) {
                        centerX += boson.x;
                        centerY += boson.y;
                    }
                    centerX /= bosonsInState.length;
                    centerY /= bosonsInState.length;
                    
                    // Draw the field
                    const gradient = this.ctx.createRadialGradient(
                        centerX, centerY, 0,
                        centerX, centerY, 150
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
                    this.ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);
                    this.ctx.fillStyle = gradient;
                    this.ctx.fill();
                }
            }
        }
    }
    
    // Initialize the boson system
    const bosonSystem = new BosonSystem();
});
