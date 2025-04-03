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
        
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = Math.random() * 3 + 2;
            this.energyState = Math.floor(Math.random() * 5); // Quantum energy levels
            this.phase = Math.random() * Math.PI * 2;
            this.waveAmplitude = Math.random() * 3 + 1;
            this.mass = Math.random() * 0.5 + 0.5;
            this.isWaveMode = Math.random() > 0.5;
            this.probabilityField = Math.random() * 0.3 + 0.7;
            this.tunnelProbability = Math.random() * 0.15;
            
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
        
        update(dt: number, bosons: Boson[], mouseX: number, mouseY: number): void {
            // Quantum wave behavior - oscillate between wave and particle
            this.phase += 0.05;
            if (Math.random() < 0.01) {
                this.isWaveMode = !this.isWaveMode;
            }
            
            // Handle entanglement if this boson is entangled
            if (this.entangledWith && Math.random() < 0.2) {
                // Mimic entangled partner's velocity with slight variations
                this.vx = this.entangledWith.vx * 0.9 + (Math.random() - 0.5) * 0.1;
                this.vy = this.entangledWith.vy * 0.9 + (Math.random() - 0.5) * 0.1;
                
                // Occasionally mirror energy state of entangled partner
                if (Math.random() < 0.05) {
                    this.energyState = this.entangledWith.energyState;
                }
            }
            
            // Mouse interaction - quantum field disturbance
            const dxMouse = this.x - mouseX;
            const dyMouse = this.y - mouseY;
            const distanceToMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
            
            if (distanceToMouse < 150) {
                // Calculate mouse influence
                const mouseFactor = 1 - distanceToMouse / 150;
                
                // Quantum tunneling - some particles can occasionally pass through the mouse field
                if (Math.random() < this.tunnelProbability) {
                    // Tunneling effect - particle briefly ignores forces
                    this.color = 'rgba(255, 255, 255, 0.9)'; // Flash white during tunneling
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
                    // Normal mouse interaction
                    const angleToMouse = Math.atan2(dyMouse, dxMouse);
                    const repelStrength = mouseFactor * (0.8 / this.mass);
                    
                    // Mouse creates a wave function that affects particle behavior
                    if (distanceToMouse < 50) {
                        // Very close to mouse - strong repulsion/collapse effect
                        this.vx += Math.cos(angleToMouse) * repelStrength * 1.5;
                        this.vy += Math.sin(angleToMouse) * repelStrength * 1.5;
                        
                        // Wave function collapse - mouse observation can change energy state
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
                        // Further from mouse - gentler influence, creates a field effect
                        this.vx += Math.cos(angleToMouse) * repelStrength;
                        this.vy += Math.sin(angleToMouse) * repelStrength;
                    }
                }
            }
            
            // Apply boson statistics - attraction to particles with same energy state
            // Bosons tend to occupy the same quantum state (Bose-Einstein statistics)
            for (const other of bosons) {
                if (other === this) continue;
                
                const dx = other.x - this.x;
                const dy = other.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120 && distance > 0) {
                    // Calculate the base force based on distance
                    let force = 0;
                    
                    // Same energy state bosons attract each other (Bose-Einstein condensation)
                    if (this.energyState === other.energyState) {
                        force = 0.03 * (1 - distance / 120);
                        
                        // Create entanglement with small probability
                        if (!this.entangledWith && !other.entangledWith && Math.random() < 0.0005) {
                            this.entangledWith = other;
                            other.entangledWith = this;
                        }
                    } else {
                        // Different energy states - apply a weaker force
                        force = 0.01 * (1 - distance / 120);
                        
                        // For particles very close together, ensure some repulsion to avoid perfect overlap
                        if (distance < this.radius + other.radius) {
                            force = -0.05; // Repel if too close
                        }
                    }
                    
                    // Apply the calculated force
                    const angle = Math.atan2(dy, dx);
                    this.vx += Math.cos(angle) * force / this.mass;
                    this.vy += Math.sin(angle) * force / this.mass;
                    
                    // Wave function interference - when both particles are in wave mode
                    if (this.isWaveMode && other.isWaveMode && distance < 80) {
                        // Constructive/destructive interference based on phase difference
                        const phaseDifference = Math.abs(this.phase - other.phase) % (Math.PI * 2);
                        
                        if (phaseDifference < Math.PI/2 || phaseDifference > Math.PI*3/2) {
                            // Constructive interference - amplify velocities slightly
                            this.vx *= 1.01;
                            this.vy *= 1.01;
                        } else {
                            // Destructive interference - dampen velocities slightly
                            this.vx *= 0.99;
                            this.vy *= 0.99;
                        }
                    }
                }
            }
            
            // Apply velocity
            this.x += this.vx;
            this.y += this.vy;
            
            // Add quantum uncertainty - random fluctuations in position and velocity
            if (Math.random() < 0.2) {
                this.x += (Math.random() - 0.5) * 0.5;
                this.y += (Math.random() - 0.5) * 0.5;
            }
            this.vx += (Math.random() - 0.5) * 0.1;
            this.vy += (Math.random() - 0.5) * 0.1;
            
            // Damping - gradually reduce velocity
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
            let currentRadius = this.radius;
            
            if (this.isWaveMode) {
                currentRadius += waveOffset;
            }
            
            // Draw the boson
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
            
            // Draw entanglement line if this boson is entangled
            if (this.entangledWith) {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.entangledWith.x, this.entangledWith.y);
                ctx.strokeStyle = `rgba(255, 255, 255, 0.2)`;
                ctx.lineWidth = 0.5;
                ctx.setLineDash([2, 3]); // Dashed line for quantum entanglement
                ctx.stroke();
                ctx.setLineDash([]);
            }
            
            // Visualize wave/particle duality
            if (this.isWaveMode) {
                // Draw wave rings around the particle
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
        bosonCount: number = 100; // Number of bosons to create
        mouseRadius: number = 100;
        mouseStrength: number = 1;
        showMouseField: boolean = false;
        
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
            this.lastMouseX = this.mouseX;
            this.lastMouseY = this.mouseY;
            
            // Create initial bosons
            this.createBosons();
            
            // Create boson clusters (mimics Bose-Einstein condensates)
            this.createBosonClusters();
            
            // Set up event listeners
            window.addEventListener('resize', () => this.handleResize());
            document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
            document.addEventListener('click', (e) => this.handleClick(e));
            document.addEventListener('keydown', (e) => this.handleKeyDown(e));
            
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
        
        createBosonClusters(): void {
            // Create a few clusters of bosons with the same energy state
            for (let i = 0; i < 3; i++) {
                const energyState = Math.floor(Math.random() * 5);
                const centerX = Math.random() * this.canvas.width;
                const centerY = Math.random() * this.canvas.height;
                const clusterSize = 5 + Math.floor(Math.random() * 10);
                
                for (let j = 0; j < clusterSize; j++) {
                    // Create bosons in a cluster
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * 30;
                    const x = centerX + Math.cos(angle) * distance;
                    const y = centerY + Math.sin(angle) * distance;
                    
                    const boson = new Boson(x, y);
                    boson.energyState = energyState;
                    
                    // Update color based on energy state
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
            // Calculate mouse velocity for dynamic interaction
            this.mouseVelocityX = e.clientX - this.mouseX;
            this.mouseVelocityY = e.clientY - this.mouseY;
            
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        }
        
        handleClick(e: MouseEvent): void {
            // Create a quantum fluctuation with new bosons at click position
            const fluctuationPower = 8 + Math.floor(Math.random() * 5);
            const fluctuationEnergy = Math.floor(Math.random() * 5);
            
            for (let i = 0; i < fluctuationPower; i++) {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 40;
                const x = e.clientX + Math.cos(angle) * distance;
                const y = e.clientY + Math.sin(angle) * distance;
                
                if (this.bosons.length < 200) { // Limit maximum bosons
                    const boson = new Boson(x, y);
                    boson.energyState = fluctuationEnergy;
                    
                    // Update color based on fluctuation energy
                    const colors = [
                        'rgba(0, 255, 255, 0.7)',
                        'rgba(255, 0, 255, 0.7)',
                        'rgba(255, 255, 0, 0.7)',
                        'rgba(0, 255, 0, 0.7)',
                        'rgba(255, 165, 0, 0.7)'
                    ];
                    boson.color = colors[fluctuationEnergy];
                    
                    // Give the new bosons an initial velocity away from click
                    boson.vx = Math.cos(angle) * (2 + Math.random() * 2);
                    boson.vy = Math.sin(angle) * (2 + Math.random() * 2);
                    
                    this.bosons.push(boson);
                }
            }
            
            // Create a temporary quantum field disturbance
            this.createFieldDisturbance(e.clientX, e.clientY);
        }
        
        handleKeyDown(e: KeyEvent): void {
            // Toggle mouse field visualization with 'F' key
            if (e.key === 'f' || e.key === 'F') {
                this.showMouseField = !this.showMouseField;
            }
            
            // Change mouse field strength with number keys
            if (e.key >= '1' && e.key <= '9') {
                this.mouseStrength = parseInt(e.key);
            }
            
            // Space bar to reset/redistribute particles
            if (e.key === ' ') {
                this.createBosons();
                this.createBosonClusters();
            }
        }
        
        createFieldDisturbance(x: number, y: number): void {
            // Create a temporary visualization of quantum field disturbance
            const fieldRadius = 100;
            const duration = 500; // ms
            const startTime = performance.now();
            
            const animateField = (timestamp: number) => {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Draw expanding field
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
            
            // Clear canvas with fade effect for trails
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Visualize mouse field if enabled
            if (this.showMouseField && (this.mouseVelocityX !== 0 || this.mouseVelocityY !== 0)) {
                this.ctx.beginPath();
                this.ctx.arc(this.mouseX, this.mouseY, this.mouseRadius, 0, Math.PI * 2);
                this.ctx.strokeStyle = `rgba(255, 255, 255, 0.2)`;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
                
                // Mouse velocity indicator
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
            
            // Update and draw bosons
            for (const boson of this.bosons) {
                boson.update(dt, this.bosons, this.mouseX, this.mouseY);
                boson.draw(this.ctx);
            }
            
            // Draw connections between bosons of same energy state
            this.drawConnections();
            
            // Draw quantum fields (probability distributions)
            this.drawQuantumFields();
            
            // Decay some entanglements randomly
            this.updateEntanglements();
            
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
                            // Draw a line between them with opacity based on distance
                            const opacity = 0.8 * (1 - distance / 100);
                            
                            this.ctx.beginPath();
                            this.ctx.moveTo(boson1.x, boson1.y);
                            this.ctx.lineTo(boson2.x, boson2.y);
                            
                            // Energy state colored connections
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
            // Create a subtle background effect representing quantum fields
            for (let i = 0; i < 5; i++) { // For each energy state
                const bosonsInState = this.bosons.filter(b => b.energyState === i);
                
                if (bosonsInState.length > 3) { // Only draw field if there are enough bosons
                    // Calculate the "center of mass" for this energy state
                    let centerX = 0, centerY = 0;
                    for (const boson of bosonsInState) {
                        centerX += boson.x;
                        centerY += boson.y;
                    }
                    centerX /= bosonsInState.length;
                    centerY /= bosonsInState.length;
                    
                    // Calculate field radius based on particle distribution
                    let maxDistance = 0;
                    for (const boson of bosonsInState) {
                        const dx = boson.x - centerX;
                        const dy = boson.y - centerY;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        maxDistance = Math.max(maxDistance, distance);
                    }
                    
                    const fieldRadius = Math.max(150, maxDistance * 1.5);
                    
                    // Draw the probability field
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
            // Randomly decay some entanglements
            for (const boson of this.bosons) {
                if (boson.entangledWith && Math.random() < 0.001) {
                    // Break the entanglement
                    boson.entangledWith.entangledWith = null;
                    boson.entangledWith = null;
                }
            }
        }
    }
    
    // Initialize the boson system
    const bosonSystem = new BosonSystem();
});
