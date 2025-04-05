interface GameConstants {
    BASE_GRAVITY: number;
    BASE_JUMP_FORCE: number;
    BASE_WALL_SPEED: number;
    BASE_WALL_SPACING: number;
    BASE_WALL_GAP: number;
    BASE_ZIG_WIDTH: number;
    BASE_ZIG_HEIGHT: number;
    BASE_BULLET_SIZE: number;
    BASE_ENEMY_SIZE: number;
    BASE_ENEMY_SPEED: number;
    BASE_ENEMY_SPAWN_INTERVAL: number;
    BASE_ENEMY_BOB_AMPLITUDE: number;
    BASE_BULLET_AUTO_AIM_RANGE: number;
    BASE_BULLET_SPEED_TOTAL: number;
    BASE_TRAIL_LINE_WIDTH: number;
    
    DEATH_PAUSE: number;
    ENEMY_BOB_SPEED: number;
    ENEMY_POINT_VALUE: number;
    MAX_HIGH_SCORES: number;
    SPEED_INCREASE_INTERVAL: number;
    SPEED_INCREASE_FACTOR: number;
    MAX_SPEED_MULTIPLIER: number;
    BULLET_SIZE_INCREASE: number;
    MAX_BULLET_SIZE: number;
    MIN_SCALE_FACTOR: number;
    IS_MOBILE: boolean;
    MOBILE_REF_WIDTH: number;
    DESKTOP_REF_WIDTH: number;
    
    UI_SCALE_FACTOR: number;
    SCREEN_WIDTH: number;
    SCREEN_HEIGHT: number;
    SCALE_FACTOR: number;
    
    BASE_MOVING_PIPE_AMPLITUDE: number;
    BASE_MOVING_PIPE_SPEED: number;
    BASE_WIND_GUST_FORCE: number;
    BASE_WIND_GUST_DURATION: number;
    BASE_WIND_GUST_INTERVAL_MIN: number;
    BASE_WIND_GUST_INTERVAL_MAX: number;
    BASE_WIND_PARTICLE_COUNT: number;

    GRAVITY: number;
    JUMP_FORCE: number;
    WALL_SPEED: number;
    WALL_SPACING: number;
    WALL_GAP: number;
    ZIG_WIDTH: number;
    ZIG_HEIGHT: number;
    BULLET_SIZE: number;
    ENEMY_SIZE: number;
    ENEMY_SPEED: number;
    ENEMY_BOB_AMPLITUDE: number;
    BULLET_AUTO_AIM_RANGE: number;
    BULLET_SPEED_TOTAL: number;
    TRAIL_LINE_WIDTH: number;
    MOVING_PIPE_AMPLITUDE: number;
    MOVING_PIPE_SPEED: number;
    WIND_GUST_FORCE: number;
    WIND_GUST_DURATION: number;
    WIND_PARTICLE_COUNT: number;

    BASE_MAX_HEALTH: number;
    BASE_HEALTH_BAR_WIDTH: number;
    BASE_HEALTH_BAR_HEIGHT: number;
    DAMAGE_IMMUNITY_FRAMES: number;
    
    BASE_POWERUP_SIZE: number;
    POWERUP_DURATION: number;
    POWERUP_SPAWN_CHANCE: number;
    BASE_SHRINK_FACTOR: number;
    BULLET_EFFICIENCY_BOOST: number;
    
    BASE_WIND_TORNADO_CHANCE: number;
    BASE_WIND_TORNADO_SIZE: number;
    BASE_WIND_TORNADO_FORCE: number;

    POWERUP_SIZE: number;
    SHRINK_FACTOR: number;
}

const CONSTANTS: GameConstants = {
    BASE_GRAVITY: 0.4,
    BASE_JUMP_FORCE: -9.0,
    BASE_WALL_SPEED: 3,
    BASE_WALL_SPACING: 900,
    BASE_WALL_GAP: 225,
    BASE_ZIG_WIDTH: 45,
    BASE_ZIG_HEIGHT: 45,
    DEATH_PAUSE: 60,
    BASE_BULLET_SIZE: 45,
    BASE_ENEMY_SIZE: 35,
    BASE_ENEMY_SPEED: 6,
    BASE_ENEMY_SPAWN_INTERVAL: 300,
    BASE_ENEMY_BOB_AMPLITUDE: 100,
    ENEMY_BOB_SPEED: 0.1,
    ENEMY_POINT_VALUE: 5,
    BASE_BULLET_AUTO_AIM_RANGE: 900.0,
    BASE_BULLET_SPEED_TOTAL: 20.0,
    MAX_HIGH_SCORES: 5,
    BASE_TRAIL_LINE_WIDTH: 8,
    SPEED_INCREASE_INTERVAL: 20,
    SPEED_INCREASE_FACTOR: 0.15,
    MAX_SPEED_MULTIPLIER: 2.5,
    BULLET_SIZE_INCREASE: 2,
    MAX_BULLET_SIZE: 55, 
    MIN_SCALE_FACTOR: 0.6,
    IS_MOBILE: false,
    MOBILE_REF_WIDTH: 800,
    DESKTOP_REF_WIDTH: 1920,
    UI_SCALE_FACTOR: 1,
    SCREEN_WIDTH: 0,
    SCREEN_HEIGHT: 0,
    SCALE_FACTOR: 1,
    GRAVITY: 0.4,
    JUMP_FORCE: -9.0,
    WALL_SPEED: 9,
    WALL_SPACING: 900,
    WALL_GAP: 225,
    ZIG_WIDTH: 45,
    ZIG_HEIGHT: 45,
    BULLET_SIZE: 45,
    ENEMY_SIZE: 35,
    ENEMY_SPEED: 11,
    ENEMY_BOB_AMPLITUDE: 100,
    BULLET_AUTO_AIM_RANGE: 900,
    BULLET_SPEED_TOTAL: 20,
    TRAIL_LINE_WIDTH: 8,
    BASE_MOVING_PIPE_AMPLITUDE: 150,
    BASE_MOVING_PIPE_SPEED: 0.02,
    BASE_WIND_GUST_FORCE: 0.8, 
    BASE_WIND_GUST_DURATION: 120,
    BASE_WIND_GUST_INTERVAL_MIN: 200,
    BASE_WIND_GUST_INTERVAL_MAX: 500,
    BASE_WIND_PARTICLE_COUNT: 80,
    MOVING_PIPE_AMPLITUDE: 150,
    MOVING_PIPE_SPEED: 0.02,
    WIND_GUST_FORCE: 0.8,
    WIND_GUST_DURATION: 120,
    WIND_PARTICLE_COUNT: 80,

    BASE_MAX_HEALTH: 3,
    BASE_HEALTH_BAR_WIDTH: 150,
    BASE_HEALTH_BAR_HEIGHT: 20,
    DAMAGE_IMMUNITY_FRAMES: 45, 
    
    BASE_POWERUP_SIZE: 40,
    POWERUP_DURATION: 600, 
    POWERUP_SPAWN_CHANCE: 0.01,
    BASE_SHRINK_FACTOR: 0.6,
    BULLET_EFFICIENCY_BOOST: 3,
    
    BASE_WIND_TORNADO_CHANCE: 0.15,
    BASE_WIND_TORNADO_SIZE: 120,
    BASE_WIND_TORNADO_FORCE: 0.8,

    POWERUP_SIZE: 40,
    SHRINK_FACTOR: 0.6
};

enum PowerupType {
    SHRINK,
    BULLET_BOOST,
    INVINCIBLE,
    PIPE_BREAKER,
    ENEMY_KILLER,
    CHEESE_HEAL
}

interface Zig {
    x: number;
    y: number;
    velY: number;
    jumping: boolean;
}

interface Wall {
    x: number;
    height: number;
    passed: boolean;
    isMoving?: boolean;
    baseHeight?: number;
    movePhase?: number;
}

interface Bullet {
    x: number;
    y: number;
    velX: number;
    velY: number;
    colorPhase: number;
}

interface Enemy {
    x: number;
    y: number;
    baseY: number;
    colorPhase: number;
    movePhase: number;
    shape: number;
}

interface TrailPoint {
    x: number;
    y: number;
}

interface WindParticle {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
}

interface Powerup {
    x: number;
    y: number;
    type: PowerupType;
    colorPhase: number;
    rotation?: number;
    floatOffset?: number;
    floatSpeed?: number;
}

interface ActivePowerup {
    type: PowerupType;
    timer: number;
}

interface PipeContact {
    active: boolean;
    timer: number;
    direction: number; 
    wallRef: Wall | null;
}

class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private zig: Zig;
    private walls: Wall[];
    private bullets: Bullet[];
    private enemies: Enemy[];
    private score: number;
    private gameOver: boolean;
    private deathTimer: number;
    private canReset: boolean;
    private spawnTimer: number;
    private nextEnemyShape: number;
    private colorCycle: number;
    private highScores: number[];
    private trail: TrailPoint[];
    private trailLength: number;
    private zigImg: HTMLImageElement;
    private bgImg: HTMLImageElement;
    private pipeImg: HTMLImageElement;
    private meowImg: HTMLImageElement;
    private noImg: HTMLImageElement;
    private stopImg: HTMLImageElement;
    private downImg: HTMLImageElement;
    private badImg: HTMLImageElement;
    private lastTime: number;
    private speedMultiplier: number;
    private currentBulletSize: number;
    private windActive: boolean;
    private windTimer: number;
    private windDirection: number; 
    private windIntensity: number;
    private windDuration: number;
    private windParticles: WindParticle[];
    private nextWindTime: number;
    private pipeCount: number;
    private health: number;
    private maxHealth: number;
    private immunityFrames: number;
    private powerups: Powerup[];
    private activePowerups: ActivePowerup[];
    private zigOriginalWidth: number;
    private zigOriginalHeight: number;
    private pipeContact: PipeContact;
    private normalWallSpeed: number;
    private collisionSlowdownFactor: number = 0.4; 
    private cheeseImg: HTMLImageElement;
    private nextCheeseSpawn: number;
    private cheeseSpawnMin: number = 300;
    private cheeseSpawnMax: number = 800;
    private cheeseHealAmount: number = 0.5; 
    private powerupSpawnTimer: number = 0;
    private powerupSpawnInterval: number = 200; 

    constructor() {
        this.canvas = document.createElement('canvas');
        this.setupCanvas();
        
        const canvasContainer = document.querySelector('.canvas') || document.body;
        const existingCanvas = canvasContainer.querySelector('canvas');
        if (existingCanvas) {
            canvasContainer.replaceChild(this.canvas, existingCanvas);
        } else {
            canvasContainer.appendChild(this.canvas);
        }
        
        this.ctx = this.canvas.getContext('2d')!;
        
        this.zig = {
            x: CONSTANTS.SCREEN_WIDTH / 4,
            y: CONSTANTS.SCREEN_HEIGHT / 2,
            velY: 0,
            jumping: false
        };
        
        this.walls = [];
        this.bullets = [];
        this.enemies = [];
        this.score = 0;
        this.gameOver = false;
        this.deathTimer = 0;
        this.canReset = false;
        this.spawnTimer = 0;
        this.nextEnemyShape = 0;
        this.colorCycle = 0;
        this.highScores = this.loadHighScores();
        this.trail = [];
        this.trailLength = 10;

        this.zigImg = new Image();
        this.zigImg.src = '../assets/images/z1.png';

        this.bgImg = new Image();
        this.bgImg.src = '../assets/images/bg1.png';

        this.pipeImg = new Image();
        this.pipeImg.src = '../assets/images/pip1.png';

        this.meowImg = new Image();
        this.meowImg.src = '../assets/images/meow.png';

        this.noImg = new Image();
        this.noImg.src = '../assets/images/no.png';

        this.stopImg = new Image();
        this.stopImg.src = '../assets/images/stop.png'; 

        this.downImg = new Image();
        this.downImg.src = '../assets/images/down.png';

        this.badImg = new Image();
        this.badImg.src = '../assets/images/bad.png';

        this.cheeseImg = new Image();
        this.cheeseImg.src = '../assets/images/cheese.png';
        
        this.nextCheeseSpawn = this.getRandomCheeseInterval();

        this.setupControls();
        window.addEventListener('resize', () => this.setupCanvas());
        
        this.lastTime = 0;
        this.speedMultiplier = 1.0;
        this.currentBulletSize = CONSTANTS.BULLET_SIZE;
        requestAnimationFrame(this.gameLoop.bind(this));

        if (!document.querySelector('meta[name="viewport"]')) {
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            document.head.appendChild(meta);
        }
        
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';

        this.windActive = false;
        this.windTimer = 0;
        this.windDirection = 0;
        this.windIntensity = 0;
        this.windDuration = 0;
        this.windParticles = [];
        this.nextWindTime = this.getRandomWindInterval();
        this.pipeCount = 0;
        this.health = CONSTANTS.BASE_MAX_HEALTH;
        this.maxHealth = CONSTANTS.BASE_MAX_HEALTH;
        this.immunityFrames = 0;
        this.powerups = [];
        this.activePowerups = [];
        this.zigOriginalWidth = CONSTANTS.ZIG_WIDTH;
        this.zigOriginalHeight = CONSTANTS.ZIG_HEIGHT;
        this.pipeContact = {
            active: false,
            timer: 0,
            direction: 0,
            wallRef: null
        };
        this.normalWallSpeed = CONSTANTS.WALL_SPEED;
        this.powerupSpawnTimer = 0;
    }

    setupCanvas(): void {
        CONSTANTS.IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
            || (window.innerWidth <= 768);
        
        const targetAspectRatio = CONSTANTS.IS_MOBILE ? 3 / 4 : 9 / 16; 
        let width, height;
        
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        const screenUsage = CONSTANTS.IS_MOBILE ? 0.98 : 0.95; 
        
        if (screenWidth / screenHeight > targetAspectRatio) {
            height = screenHeight * screenUsage; 
            width = height * targetAspectRatio;
        } else {
            width = screenWidth * screenUsage; 
            height = width / targetAspectRatio;
        }
        
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.display = 'block';
        this.canvas.style.margin = 'auto';
        this.canvas.className = 'game-canvas';
        
        CONSTANTS.SCREEN_WIDTH = width;
        CONSTANTS.SCREEN_HEIGHT = height;
        
        const referenceWidth = CONSTANTS.IS_MOBILE ? CONSTANTS.MOBILE_REF_WIDTH : CONSTANTS.DESKTOP_REF_WIDTH;
        let scaleFactor = width / referenceWidth;
        
        if (CONSTANTS.IS_MOBILE) {
            scaleFactor *= 1.2;
        }
        
        scaleFactor = Math.max(scaleFactor, CONSTANTS.IS_MOBILE ? 0.7 : CONSTANTS.MIN_SCALE_FACTOR);
        CONSTANTS.SCALE_FACTOR = scaleFactor;
        
        CONSTANTS.UI_SCALE_FACTOR = CONSTANTS.IS_MOBILE ? 
            Math.max(1.3, scaleFactor * 1.6) : 
            scaleFactor;
        
        CONSTANTS.GRAVITY = CONSTANTS.BASE_GRAVITY * CONSTANTS.SCALE_FACTOR;
        CONSTANTS.JUMP_FORCE = CONSTANTS.BASE_JUMP_FORCE * CONSTANTS.SCALE_FACTOR;
        CONSTANTS.WALL_SPEED = CONSTANTS.BASE_WALL_SPEED * CONSTANTS.SCALE_FACTOR;
        CONSTANTS.WALL_SPACING = CONSTANTS.BASE_WALL_SPACING * CONSTANTS.SCALE_FACTOR;
        CONSTANTS.WALL_GAP = CONSTANTS.BASE_WALL_GAP * CONSTANTS.SCALE_FACTOR;
        CONSTANTS.ZIG_WIDTH = CONSTANTS.BASE_ZIG_WIDTH * CONSTANTS.SCALE_FACTOR;
        CONSTANTS.ZIG_HEIGHT = CONSTANTS.BASE_ZIG_HEIGHT * CONSTANTS.SCALE_FACTOR;
        CONSTANTS.BULLET_SIZE = CONSTANTS.BASE_BULLET_SIZE * CONSTANTS.SCALE_FACTOR;
        CONSTANTS.ENEMY_SIZE = CONSTANTS.BASE_ENEMY_SIZE * CONSTANTS.SCALE_FACTOR;
        CONSTANTS.ENEMY_SPEED = CONSTANTS.BASE_ENEMY_SPEED * CONSTANTS.SCALE_FACTOR;
        CONSTANTS.ENEMY_BOB_AMPLITUDE = CONSTANTS.BASE_ENEMY_BOB_AMPLITUDE * CONSTANTS.SCALE_FACTOR;
        CONSTANTS.BULLET_AUTO_AIM_RANGE = CONSTANTS.BASE_BULLET_AUTO_AIM_RANGE * CONSTANTS.SCALE_FACTOR;
        CONSTANTS.BULLET_SPEED_TOTAL = CONSTANTS.BASE_BULLET_SPEED_TOTAL * CONSTANTS.SCALE_FACTOR;
        CONSTANTS.TRAIL_LINE_WIDTH = CONSTANTS.BASE_TRAIL_LINE_WIDTH * CONSTANTS.SCALE_FACTOR;
        CONSTANTS.MOVING_PIPE_AMPLITUDE = CONSTANTS.BASE_MOVING_PIPE_AMPLITUDE * CONSTANTS.SCALE_FACTOR;
        CONSTANTS.MOVING_PIPE_SPEED = CONSTANTS.BASE_MOVING_PIPE_SPEED;
        CONSTANTS.WIND_GUST_FORCE = CONSTANTS.BASE_WIND_GUST_FORCE * CONSTANTS.SCALE_FACTOR;
        CONSTANTS.WIND_GUST_DURATION = CONSTANTS.BASE_WIND_GUST_DURATION;
        CONSTANTS.WIND_PARTICLE_COUNT = CONSTANTS.IS_MOBILE ? 
            Math.floor(CONSTANTS.BASE_WIND_PARTICLE_COUNT * 0.6) : 
            CONSTANTS.BASE_WIND_PARTICLE_COUNT;
        
        CONSTANTS.POWERUP_SIZE = CONSTANTS.BASE_POWERUP_SIZE * CONSTANTS.SCALE_FACTOR;
        CONSTANTS.SHRINK_FACTOR = CONSTANTS.BASE_SHRINK_FACTOR;

        if (this.zig) {
            this.zig.x = CONSTANTS.SCREEN_WIDTH / 4;
        }
        
        this.currentBulletSize = CONSTANTS.BULLET_SIZE;
    }

    setupControls(): void {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                if (this.gameOver && this.canReset) {
                    this.reset();
                } else {
                    this.zig.jumping = true;
                }
            }
            if (e.code === 'KeyG' && !this.gameOver) {
                this.shoot();
            }
        });

        document.addEventListener('touchmove', (e) => {
            if (e.target === this.canvas) {
                e.preventDefault();
            }
        }, { passive: false });

        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;

            if (this.gameOver && this.canReset) {
                this.reset();
            } else if (x < this.canvas.width / 2) {
                this.zig.jumping = true;
            } else if (!this.gameOver) {
                this.shoot();
            }
        });

        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.setupCanvas(), 200);
        });
    }

    reset(): void {
        this.zig.x = CONSTANTS.SCREEN_WIDTH / 4;
        this.zig.y = CONSTANTS.SCREEN_HEIGHT / 2;
        this.zig.velY = 0;
        this.walls = [];
        this.bullets = [];
        this.enemies = [];
        this.score = 0;
        this.gameOver = false;
        this.deathTimer = 0;
        this.canReset = false;
        this.spawnTimer = 0;
        this.nextEnemyShape = 0;
        this.speedMultiplier = 1.0;
        this.currentBulletSize = CONSTANTS.BULLET_SIZE;
        this.windActive = false;
        this.windTimer = 0;
        this.windDirection = 0;
        this.windIntensity = 0;
        this.windParticles = [];
        this.nextWindTime = this.getRandomWindInterval();
        this.pipeCount = 0;
        this.health = CONSTANTS.BASE_MAX_HEALTH;
        this.maxHealth = CONSTANTS.BASE_MAX_HEALTH;
        this.immunityFrames = 0;
        this.powerups = [];
        this.activePowerups = [];
        CONSTANTS.ZIG_WIDTH = this.zigOriginalWidth;
        CONSTANTS.ZIG_HEIGHT = this.zigOriginalHeight;
        this.pipeContact = {
            active: false,
            timer: 0,
            direction: 0,
            wallRef: null
        };
        this.powerupSpawnTimer = 0;
    }

    shoot(): void {
        const bulletX = this.zig.x + CONSTANTS.ZIG_WIDTH;
        const bulletY = this.zig.y + CONSTANTS.ZIG_HEIGHT / 2;
        const [hasTarget, targetX, targetY] = this.findNearestEnemy(bulletX, bulletY);

        let velX: number, velY: number;
        if (hasTarget) {
            const dx = targetX - bulletX;
            const dy = targetY - bulletY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            velX = (dx / dist) * CONSTANTS.BULLET_SPEED_TOTAL;
            velY = (dy / dist) * CONSTANTS.BULLET_SPEED_TOTAL;
        } else {
            velX = CONSTANTS.BULLET_SPEED_TOTAL;
            velY = 0;
        }

        this.bullets.push({
            x: bulletX,
            y: bulletY,
            velX: velX,
            velY: velY,
            colorPhase: Math.random() * Math.PI * 3
        });
    }

    findNearestEnemy(x: number, y: number): [boolean, number, number] {
        let minDist = CONSTANTS.BULLET_AUTO_AIM_RANGE;
        let found = false;
        let targetX = 0, targetY = 0;

        for (const enemy of this.enemies) {
            const enemyCenterX = enemy.x + CONSTANTS.ENEMY_SIZE / 2;
            const enemyCenterY = enemy.y + CONSTANTS.ENEMY_SIZE / 2;
            const dist = Math.sqrt(Math.pow(x - enemyCenterX, 2) + Math.pow(y - enemyCenterY, 2));

            if (dist < minDist) {
                minDist = dist;
                found = true;
                targetX = enemyCenterX;
                targetY = enemyCenterY;
            }
        }

        return [found, targetX, targetY];
    }

    calculateDifficultyMultipliers(): void {
        const level = Math.floor(this.score / CONSTANTS.SPEED_INCREASE_INTERVAL);
        this.speedMultiplier = Math.min(
            1 + (level * CONSTANTS.SPEED_INCREASE_FACTOR),
            CONSTANTS.MAX_SPEED_MULTIPLIER
        );
        
        this.currentBulletSize = Math.min(
            CONSTANTS.BULLET_SIZE + (level * CONSTANTS.BULLET_SIZE_INCREASE),
            CONSTANTS.MAX_BULLET_SIZE
        );
    }

    getRandomWindInterval(): number {
        return Math.floor(
            Math.random() * 
            (CONSTANTS.BASE_WIND_GUST_INTERVAL_MAX - CONSTANTS.BASE_WIND_GUST_INTERVAL_MIN) + 
            CONSTANTS.BASE_WIND_GUST_INTERVAL_MIN
        );
    }

    getRandomCheeseInterval(): number {
        return Math.floor(Math.random() * (this.cheeseSpawnMax - this.cheeseSpawnMin)) + this.cheeseSpawnMin;
    }

    startWindGust(): void {
        this.windActive = true;
        this.windTimer = 0;
        this.windDirection = Math.random() > 0.5 ? 1 : -1;
        this.windIntensity = (0.7 + Math.random() * 0.6) * CONSTANTS.WIND_GUST_FORCE;
        this.windDuration = CONSTANTS.WIND_GUST_DURATION * (0.8 + Math.random() * 0.4);

        const particleCount = CONSTANTS.WIND_PARTICLE_COUNT * 1.5;
        this.windParticles = [];
        for (let i = 0; i < particleCount; i++) {
            this.createWindParticle();
        }

        this.zig.velY += (Math.random() - 0.5) * 2;
    }
    
    createWindParticle(): void {
        const x = this.windDirection > 0 ? 
            -10 - Math.random() * 50 : 
            CONSTANTS.SCREEN_WIDTH + Math.random() * 50;
            
        this.windParticles.push({
            x: x,
            y: Math.random() * CONSTANTS.SCREEN_HEIGHT,
            size: 1 + Math.random() * 3 * CONSTANTS.SCALE_FACTOR,
            speed: (3 + Math.random() * 7) * CONSTANTS.SCALE_FACTOR * this.windIntensity,
            opacity: 0.1 + Math.random() * 0.5
        });
    }

    takeDamage(amount: number = 1): void {
        if (this.immunityFrames > 0 || this.hasPowerup(PowerupType.INVINCIBLE)) return;
        
        this.health -= amount;
        this.immunityFrames = CONSTANTS.DAMAGE_IMMUNITY_FRAMES;
        
        if (this.health <= 0) {
            this.health = 0; 
            this.gameOver = true;
            return;
        }
    }

    spawnPowerup(): void {
        if (Math.random() > CONSTANTS.POWERUP_SPAWN_CHANCE * 2) return;
        
        const type = Math.floor(Math.random() * 5);
        const y = Math.random() * (CONSTANTS.SCREEN_HEIGHT - CONSTANTS.POWERUP_SIZE);
        
        this.powerups.push({
            x: CONSTANTS.SCREEN_WIDTH,
            y: y,
            type,
            colorPhase: Math.random() * Math.PI * 2,
            rotation: type === PowerupType.CHEESE_HEAL ? Math.random() * Math.PI * 2 : undefined,
            floatOffset: type === PowerupType.CHEESE_HEAL ? 0 : undefined,
            floatSpeed: type === PowerupType.CHEESE_HEAL ? 0.03 + Math.random() * 0.02 : undefined
        });
        
        console.log(`Spawned powerup type: ${PowerupType[type]} at position ${y}`);
    }

    spawnCheese(): void {
        const y = Math.random() * (CONSTANTS.SCREEN_HEIGHT - CONSTANTS.POWERUP_SIZE);
        
        this.powerups.push({
            x: CONSTANTS.SCREEN_WIDTH,
            y: y,
            type: PowerupType.CHEESE_HEAL,
            colorPhase: Math.random() * Math.PI * 2,
            rotation: Math.random() * Math.PI * 2,
            floatOffset: 0,
            floatSpeed: 0.03 + Math.random() * 0.02
        });
    }

    collectPowerup(powerup: Powerup): void {
        if (powerup.type === PowerupType.CHEESE_HEAL) {
            const healAmount = this.maxHealth * this.cheeseHealAmount;
            this.health = Math.min(this.health + healAmount, this.maxHealth);
        } else {
            this.activePowerups.push({
                type: powerup.type,
                timer: CONSTANTS.POWERUP_DURATION
            });

            if (powerup.type === PowerupType.SHRINK) {
                CONSTANTS.ZIG_WIDTH = this.zigOriginalWidth * CONSTANTS.SHRINK_FACTOR;
                CONSTANTS.ZIG_HEIGHT = this.zigOriginalHeight * CONSTANTS.SHRINK_FACTOR;
            }
        }
    }

    hasPowerup(type: PowerupType): boolean {
        return this.activePowerups.some(p => p.type === type);
    }

    update(): void {
        if (this.gameOver) {
            this.deathTimer++;
            if (this.deathTimer >= CONSTANTS.DEATH_PAUSE) {
                this.canReset = true;
                if (this.deathTimer === CONSTANTS.DEATH_PAUSE) {
                    this.saveHighScore(this.score);
                }
            }
            return;
        }

        this.calculateDifficultyMultipliers();

        this.colorCycle += 0.05;
        if (this.colorCycle >= Math.PI * 2) this.colorCycle = 0;

        for (let i = 0; i < this.trail.length; i++) {
            this.trail[i].x -= CONSTANTS.WALL_SPEED;
        }
        
        this.trail.unshift({ x: this.zig.x, y: this.zig.y });
        this.trail = this.trail.filter(pos => pos.x > -CONSTANTS.ZIG_WIDTH);

        this.zig.velY += CONSTANTS.GRAVITY;
        this.zig.y += this.zig.velY;

        if (this.zig.jumping) {
            this.zig.velY = CONSTANTS.JUMP_FORCE;
            this.zig.jumping = false;
        }

        if (this.windActive) {
            this.windTimer++;
            
            this.zig.velY += this.windDirection * this.windIntensity * 0.05;
            
            for (let i = 0; i < this.windParticles.length; i++) {
                const particle = this.windParticles[i];
                particle.x += this.windDirection * particle.speed;
                
                if ((this.windDirection > 0 && particle.x > CONSTANTS.SCREEN_WIDTH + 10) || 
                    (this.windDirection < 0 && particle.x < -10)) {
                    const x = this.windDirection > 0 ? 
                        -10 - Math.random() * 20 : 
                        CONSTANTS.SCREEN_WIDTH + Math.random() * 20;
                    
                    this.windParticles[i] = {
                        x: x,
                        y: Math.random() * CONSTANTS.SCREEN_HEIGHT,
                        size: 1 + Math.random() * 3 * CONSTANTS.SCALE_FACTOR,
                        speed: (3 + Math.random() * 7) * CONSTANTS.SCALE_FACTOR * this.windIntensity,
                        opacity: 0.1 + Math.random() * 0.5
                    };
                }
            }
            
            if (this.windTimer >= this.windDuration) {
                this.windActive = false;
                this.nextWindTime = this.getRandomWindInterval();
            }
        } else {
            this.nextWindTime--;
            if (this.nextWindTime <= 0) {
                this.startWindGust();
            }
        }

        if (this.walls.length === 0 || this.walls[this.walls.length - 1].x < CONSTANTS.SCREEN_WIDTH - CONSTANTS.WALL_SPACING) {
            const minGapPosition = 50 * CONSTANTS.SCALE_FACTOR;
            const maxGapPosition = CONSTANTS.SCREEN_HEIGHT - CONSTANTS.WALL_GAP - 50 * CONSTANTS.SCALE_FACTOR;
            const height = Math.random() * (maxGapPosition - minGapPosition) + minGapPosition;
            
            this.pipeCount++;
            const isMoving = this.pipeCount % 5 === 0;
            
            this.walls.push({
                x: CONSTANTS.SCREEN_WIDTH,
                height: height,
                passed: false,
                isMoving: isMoving,
                baseHeight: height,
                movePhase: 0
            });
        }

        this.walls.forEach(wall => {
            wall.x -= CONSTANTS.WALL_SPEED * this.speedMultiplier;
            
            if (wall.isMoving && wall.baseHeight !== undefined && wall.movePhase !== undefined) {
                wall.movePhase += CONSTANTS.MOVING_PIPE_SPEED;
                wall.height = wall.baseHeight + Math.sin(wall.movePhase) * CONSTANTS.MOVING_PIPE_AMPLITUDE;
                
                const minGap = 30 * CONSTANTS.SCALE_FACTOR;
                if (wall.height < minGap) {
                    wall.height = minGap;
                } else if (wall.height > CONSTANTS.SCREEN_HEIGHT - CONSTANTS.WALL_GAP - minGap) {
                    wall.height = CONSTANTS.SCREEN_HEIGHT - CONSTANTS.WALL_GAP - minGap;
                }
            }
            
            if (!wall.passed && wall.x + 40 < this.zig.x) {
                wall.passed = true;
                this.score++;
            }
        });

        this.walls = this.walls.filter(wall => wall.x > -40);

        this.bullets.forEach(bullet => {
            bullet.x += bullet.velX;
            bullet.y += bullet.velY;
            bullet.colorPhase += 0.05;
            if (bullet.colorPhase >= Math.PI * 2) bullet.colorPhase = 0;
        });

        this.bullets = this.bullets.filter(bullet => 
            bullet.x < CONSTANTS.SCREEN_WIDTH && 
            bullet.y > 0 && 
            bullet.y < CONSTANTS.SCREEN_HEIGHT
        );

        this.spawnTimer++;
        const scaledSpawnInterval = Math.max(60, CONSTANTS.BASE_ENEMY_SPAWN_INTERVAL / CONSTANTS.SCALE_FACTOR);
        if (this.spawnTimer >= scaledSpawnInterval) {
            this.spawnTimer = 0;
            const newY = Math.random() * (CONSTANTS.SCREEN_HEIGHT - CONSTANTS.ENEMY_SIZE);
            this.enemies.push({
                x: CONSTANTS.SCREEN_WIDTH,
                y: newY,
                baseY: newY,
                colorPhase: Math.random() * Math.PI * 2,
                movePhase: Math.random() * Math.PI * 2,
                shape: this.nextEnemyShape
            });
            this.nextEnemyShape = (this.nextEnemyShape + 1) % 4;
        }

        this.enemies.forEach(enemy => {
            enemy.x -= CONSTANTS.ENEMY_SPEED * this.speedMultiplier;
            enemy.colorPhase += 0.05;
            enemy.movePhase += CONSTANTS.ENEMY_BOB_SPEED;
            enemy.y = enemy.baseY + Math.sin(enemy.movePhase) * CONSTANTS.ENEMY_BOB_AMPLITUDE;
        });

        this.enemies = this.enemies.filter(enemy => enemy.x > -CONSTANTS.ENEMY_SIZE);

        if (this.zig.y < 0 || this.zig.y > CONSTANTS.SCREEN_HEIGHT) {
            this.gameOver = true;
        }

        this.walls.forEach(wall => {
            if (this.checkWallCollision(wall)) {
                if (this.hasPowerup(PowerupType.PIPE_BREAKER)) {
                    this.walls = this.walls.filter(w => w !== wall);
                } else {
                    this.health = 0;
                    this.gameOver = true;
                }
            }
        });

        this.enemies.forEach(enemy => {
            if (this.checkEnemyCollision(enemy)) {
                if (this.hasPowerup(PowerupType.ENEMY_KILLER)) {
                    this.enemies = this.enemies.filter(e => e !== enemy);
                    this.score += CONSTANTS.ENEMY_POINT_VALUE;
                } else if (!this.hasPowerup(PowerupType.INVINCIBLE)) {
                    this.takeDamage(this.maxHealth * 0.1);
                }
            }
        });

        this.bullets.forEach(bullet => {
            let hitCount = 0;
            this.enemies = this.enemies.filter(enemy => {
                if (this.checkBulletEnemyCollision(bullet, enemy)) {
                    hitCount++;
                    this.score += CONSTANTS.ENEMY_POINT_VALUE;
                    return false;
                }
                return true;
            });
            
            if (hitCount >= (this.hasPowerup(PowerupType.BULLET_BOOST) ? 
                CONSTANTS.BULLET_EFFICIENCY_BOOST : 1)) {
                this.bullets = this.bullets.filter(b => b !== bullet);
            }
        });

        this.powerups.forEach(powerup => {
            powerup.x -= CONSTANTS.WALL_SPEED * this.speedMultiplier;
            powerup.colorPhase += 0.05;
            
            if (powerup.type === PowerupType.CHEESE_HEAL && powerup.floatSpeed && powerup.floatOffset !== undefined) {
                powerup.floatOffset += powerup.floatSpeed;
                powerup.y += Math.sin(powerup.floatOffset) * 0.7;
                
                if (powerup.rotation !== undefined) {
                    powerup.rotation += 0.01;
                }
            }
            
            if (this.checkPowerupCollision(powerup)) {
                this.collectPowerup(powerup);
                this.powerups = this.powerups.filter(p => p !== powerup);
            }
        });

        this.powerups = this.powerups.filter(p => p.x > -CONSTANTS.POWERUP_SIZE);

        for (let i = this.activePowerups.length - 1; i >= 0; i--) {
            const powerup = this.activePowerups[i];
            powerup.timer--;
            
            if (powerup.timer <= 0) {
                if (powerup.type === PowerupType.SHRINK) {
                    CONSTANTS.ZIG_WIDTH = this.zigOriginalWidth;
                    CONSTANTS.ZIG_HEIGHT = this.zigOriginalHeight;
                }
                this.activePowerups.splice(i, 1);
            }
        }

        this.enemies = this.enemies.filter(enemy => {
            if (this.checkEnemyTrailCollision(enemy)) {
                this.score += CONSTANTS.ENEMY_POINT_VALUE;
                return false;
            }
            return true;
        });
        
        this.enemies.forEach(enemy => {
            if (this.checkEnemyCollision(enemy)) {
                this.gameOver = true;
            }
        });

        if (this.pipeContact.active) {
            this.pipeContact.timer--;
            if (this.pipeContact.timer <= 0) {
                this.pipeContact.active = false;
                this.pipeContact.wallRef = null;
            }
        }

        const effectiveWallSpeed = this.pipeContact.active ? 
            CONSTANTS.WALL_SPEED * this.collisionSlowdownFactor * this.speedMultiplier : 
            CONSTANTS.WALL_SPEED * this.speedMultiplier;

        this.walls.forEach(wall => {
            wall.x -= effectiveWallSpeed;
            
        });

        this.nextCheeseSpawn--;
        if (this.nextCheeseSpawn <= 0) {
            this.spawnCheese();
            this.nextCheeseSpawn = this.getRandomCheeseInterval();
        }

        this.powerupSpawnTimer++;
        if (this.powerupSpawnTimer >= this.powerupSpawnInterval) {
            this.powerupSpawnTimer = 0;
            this.spawnPowerup();
        }
    }

    draw(): void {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, CONSTANTS.SCREEN_WIDTH, CONSTANTS.SCREEN_HEIGHT);

        if (this.bgImg.complete) {
            this.ctx.drawImage(this.bgImg, 0, 0, CONSTANTS.SCREEN_WIDTH, CONSTANTS.SCREEN_HEIGHT);
        }

        if (this.trail.length >= 2) {
            for (let i = 1; i < this.trail.length; i++) {
                const opacity = (this.trailLength - i) / this.trailLength;
                const r = Math.sin(this.colorCycle + i * 0.2) * 127 + 128;
                const g = Math.sin(this.colorCycle + i * 0.2 + 2 * Math.PI / 3) * 127 + 128;
                const b = Math.sin(this.colorCycle + i * 0.2 + 4 * Math.PI / 3) * 127 + 128;
                
                this.ctx.save();
                this.ctx.globalAlpha = opacity * 0.5;
                this.ctx.lineWidth = CONSTANTS.TRAIL_LINE_WIDTH;
                this.ctx.lineCap = 'round';
                this.ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
                this.ctx.shadowBlur = 20;
                this.ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
                
                this.ctx.beginPath();
                this.ctx.moveTo(
                    this.trail[i-1].x + CONSTANTS.ZIG_WIDTH/2,
                    this.trail[i-1].y + CONSTANTS.ZIG_HEIGHT/2
                );
                this.ctx.lineTo(
                    this.trail[i].x + CONSTANTS.ZIG_WIDTH/2,
                    this.trail[i].y + CONSTANTS.ZIG_HEIGHT/2
                );
                this.ctx.stroke();
                this.ctx.restore();
            }
        }

        this.ctx.save();
        const r = Math.sin(this.colorCycle) * 127 + 128;
        const g = Math.sin(this.colorCycle + 2 * Math.PI / 3) * 127 + 128;
        const b = Math.sin(this.colorCycle + 4 * Math.PI / 3) * 127 + 128;
        
        this.ctx.shadowBlur = 30;
        this.ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
        
        this.ctx.drawImage(
            this.zigImg,
            this.zig.x,
            this.zig.y,
            CONSTANTS.ZIG_WIDTH,
            CONSTANTS.ZIG_HEIGHT
        );
        
        this.ctx.restore();

        this.walls.forEach(wall => {
            if (wall.isMoving) {
                const pulseColor = Math.sin(this.colorCycle * 2) * 127 + 128;
                this.ctx.fillStyle = `rgb(${pulseColor}, ${pulseColor/2}, ${pulseColor/4})`;
                this.ctx.fillRect(wall.x - 2, 0, 44, wall.height);
                this.ctx.fillRect(wall.x - 2, wall.height + CONSTANTS.WALL_GAP, 44, CONSTANTS.SCREEN_HEIGHT - wall.height - CONSTANTS.WALL_GAP);
            }
            
            if (this.pipeImg.complete) {
                const pattern = this.ctx.createPattern(this.pipeImg, 'repeat');
                if (pattern) {
                    this.ctx.save();

                    this.ctx.beginPath();
                    this.ctx.rect(wall.x, 0, 40, wall.height);
                    this.ctx.clip();
                    this.ctx.translate(wall.x, 0);
                    this.ctx.fillStyle = pattern;
                    this.ctx.fillRect(0, 0, 40, wall.height);
                    this.ctx.restore();

                    this.ctx.save();
                    this.ctx.beginPath();
                    this.ctx.rect(wall.x, wall.height + CONSTANTS.WALL_GAP, 40, CONSTANTS.SCREEN_HEIGHT - wall.height - CONSTANTS.WALL_GAP);
                    this.ctx.clip();
                    this.ctx.translate(wall.x, wall.height + CONSTANTS.WALL_GAP);
                    this.ctx.fillStyle = pattern;
                    this.ctx.fillRect(0, 0, 40, CONSTANTS.SCREEN_HEIGHT - wall.height - CONSTANTS.WALL_GAP);
                    this.ctx.restore();
                    
                    if (wall.isMoving) {
                        const pulseOpacity = (Math.sin(this.colorCycle * 3) * 0.3) + 0.7;
                        this.ctx.save();
                        this.ctx.strokeStyle = `rgba(255, 165, 0, ${pulseOpacity})`;
                        this.ctx.lineWidth = 3 * CONSTANTS.SCALE_FACTOR;
                        this.ctx.strokeRect(wall.x, 0, 40, wall.height);
                        this.ctx.strokeRect(wall.x, wall.height + CONSTANTS.WALL_GAP, 40, CONSTANTS.SCREEN_HEIGHT - wall.height - CONSTANTS.WALL_GAP);
                        this.ctx.restore();
                    }
                }
            } else {
                this.ctx.fillStyle = 'white';
                this.ctx.fillRect(wall.x, 0, 40, wall.height);
                this.ctx.fillRect(wall.x, wall.height + CONSTANTS.WALL_GAP, 40, CONSTANTS.SCREEN_HEIGHT - wall.height - CONSTANTS.WALL_GAP);
                
                if (wall.isMoving) {
                    this.ctx.strokeStyle = 'orange';
                    this.ctx.lineWidth = 3 * CONSTANTS.SCALE_FACTOR;
                    this.ctx.strokeRect(wall.x, 0, 40, wall.height);
                    this.ctx.strokeRect(wall.x, wall.height + CONSTANTS.WALL_GAP, 40, CONSTANTS.SCREEN_HEIGHT - wall.height - CONSTANTS.WALL_GAP);
                }
            }
        });

        this.bullets.forEach(bullet => {
            const r = 0.5 + Math.sin(bullet.colorPhase) * 0.5;
            const g = 0.5 + Math.sin(bullet.colorPhase + Math.PI * 2/3) * 0.5;
            const b = 0.5 + Math.sin(bullet.colorPhase + Math.PI * 4/3) * 0.5;
            
            if (this.meowImg.complete) {
                this.ctx.save();
                
                this.ctx.shadowBlur = 20;
                this.ctx.shadowColor = `rgb(${r * 255},${g * 255},${b * 255})`;
                
                this.ctx.drawImage(
                    this.meowImg,
                    bullet.x,
                    bullet.y,
                    this.currentBulletSize,
                    this.currentBulletSize
                );
                
                this.ctx.restore();
            } else {
                this.ctx.strokeStyle = `rgb(${r * 255},${g * 255},${b * 255})`;
                this.ctx.beginPath();
                this.ctx.arc(
                    bullet.x + this.currentBulletSize/2,
                    bullet.y + this.currentBulletSize/2,
                    this.currentBulletSize/2,
                    0,
                    Math.PI * 2
                );
                this.ctx.stroke();
            }
        });

        this.enemies.forEach(enemy => {
            const r = 0.5 + Math.sin(enemy.colorPhase) * 0.5;
            const g = 0.5 + Math.sin(enemy.colorPhase + Math.PI * 2/3) * 0.5;
            const b = 0.5 + Math.sin(enemy.colorPhase + Math.PI * 4/3) * 0.5;
            
            this.ctx.strokeStyle = `rgb(${r * 255},${g * 255},${b * 255})`;
            this.ctx.lineWidth = 2;

            const centerX = enemy.x + CONSTANTS.ENEMY_SIZE/2;
            const centerY = enemy.y + CONSTANTS.ENEMY_SIZE/2;
            const size = CONSTANTS.ENEMY_SIZE; 

            switch(enemy.shape) {
                case 0: 
                    if (this.stopImg.complete) {
                        this.ctx.save();
                        this.ctx.shadowBlur = 20;
                        this.ctx.shadowColor = `rgb(${r * 255},${g * 255},${b * 255})`;
                        this.ctx.drawImage(
                            this.stopImg,
                            enemy.x,
                            enemy.y,
                            size,
                            size
                        );
                        this.ctx.restore();
                    } else {
                        this.ctx.beginPath();
                        this.ctx.arc(centerX, centerY, size/2, 0, Math.PI * 2);
                        this.ctx.stroke();
                    }
                    break;
                case 1:
                    if (this.noImg.complete) {
                        this.ctx.save();
                        this.ctx.shadowBlur = 20;
                        this.ctx.shadowColor = `rgb(${r * 255},${g * 255},${b * 255})`;
                        this.ctx.drawImage(
                            this.noImg,
                            enemy.x,
                            enemy.y,
                            size,
                            size
                        );
                        this.ctx.restore();
                    } else {
                        this.ctx.beginPath();
                        this.ctx.moveTo(centerX, enemy.y);
                        this.ctx.lineTo(enemy.x + size, centerY);
                        this.ctx.lineTo(centerX, enemy.y + size);
                        this.ctx.lineTo(enemy.x, centerY);
                        this.ctx.closePath();
                        this.ctx.stroke();
                    }
                    break;
                case 2:
                    if (this.downImg.complete) {
                        this.ctx.save();
                        this.ctx.shadowBlur = 20;
                        this.ctx.shadowColor = `rgb(${r * 255},${g * 255},${b * 255})`;
                        this.ctx.drawImage(
                            this.downImg,
                            enemy.x,
                            enemy.y,
                            size,
                            size
                        );
                        this.ctx.restore();
                    } else {
                        this.ctx.beginPath();
                        this.ctx.moveTo(centerX, enemy.y);
                        this.ctx.lineTo(enemy.x + size, centerY);
                        this.ctx.lineTo(centerX, enemy.y + size);
                        this.ctx.lineTo(enemy.x, centerY);
                        this.ctx.closePath();
                        this.ctx.stroke();
                    }
                    break;
                case 3:
                    if (this.badImg.complete) {
                        this.ctx.save();
                        this.ctx.shadowBlur = 20;
                        this.ctx.shadowColor = `rgb(${r * 255},${g * 255},${b * 255})`;
                        this.ctx.drawImage(
                            this.badImg,
                            enemy.x,
                            enemy.y,
                            size,
                            size
                        );
                        this.ctx.restore();
                    } else {
                        this.ctx.beginPath();
                        this.ctx.moveTo(enemy.x, enemy.y);
                        this.ctx.lineTo(enemy.x + size, enemy.y + size);
                        this.ctx.moveTo(enemy.x + size, enemy.y);
                        this.ctx.lineTo(enemy.x, enemy.y + size);
                        this.ctx.stroke();
                    }
                    break;
            }
        });

        this.powerups.forEach(powerup => {
            const r = Math.sin(powerup.colorPhase) * 127 + 128;
            const g = Math.sin(powerup.colorPhase + Math.PI * 2/3) * 127 + 128;
            const b = Math.sin(powerup.colorPhase + Math.PI * 4/3) * 127 + 128;
            
            this.ctx.save();
            this.ctx.fillStyle = `rgb(${r},${g},${b})`;
            this.ctx.strokeStyle = 'white';
            this.ctx.lineWidth = 2;
            
            const x = powerup.x;
            const y = powerup.y;
            const size = CONSTANTS.POWERUP_SIZE;
            
            if (powerup.type === PowerupType.CHEESE_HEAL) {
                this.ctx.save();
                
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = 'rgba(255, 215, 0, 0.7)';
                
                if (powerup.rotation !== undefined) {
                    this.ctx.translate(x + size/2, y + size/2);
                    this.ctx.rotate(powerup.rotation);
                    this.drawCheese(-size/2, -size/2, size);
                } else {
                    this.drawCheese(x, y, size);
                }
                
                this.ctx.restore();
            } else {
                switch(powerup.type) {
                    case PowerupType.SHRINK:
                        this.ctx.beginPath();
                        this.ctx.arc(x + size/2, y + size/2, size/3, 0, Math.PI * 2);
                        break;
                    case PowerupType.BULLET_BOOST:
                        this.ctx.fillText('↗', x + size/4, y + size*3/4);
                        break;
                    case PowerupType.INVINCIBLE:
                        this.ctx.fillText('★', x + size/4, y + size*3/4);
                        break;
                    case PowerupType.PIPE_BREAKER:
                        this.ctx.fillText('⚒', x + size/4, y + size*3/4);
                        break;
                    case PowerupType.ENEMY_KILLER:
                        this.ctx.fillText('⚔', x + size/4, y + size*3/4);
                        break;
                }
                
                this.ctx.fill();
                this.ctx.stroke();
            }
            
            this.ctx.restore();
        });

        this.drawHealthBar();
        this.drawActivePowerups();

        this.drawUI();

        if (this.windActive) {
            this.ctx.save();
            this.ctx.fillStyle = 'white';
            this.ctx.strokeStyle = 'white';
            this.ctx.lineWidth = 2 * CONSTANTS.SCALE_FACTOR;
            
            for (const particle of this.windParticles) {
                this.ctx.globalAlpha = particle.opacity;
                
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(
                    particle.x - this.windDirection * (5 + particle.speed * 2) * CONSTANTS.SCALE_FACTOR, 
                    particle.y
                );
                this.ctx.stroke();
                
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            this.ctx.restore();
        }

        if (this.windActive) {
            const fontSize = Math.round(18 * CONSTANTS.UI_SCALE_FACTOR);
            const windText = `Wind: ${this.windDirection > 0 ? '→' : '←'}`;
            
            this.ctx.save();
            this.ctx.font = `bold ${fontSize}px Arial`;
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.fillText(windText, 10, 60 * CONSTANTS.SCALE_FACTOR);
            this.ctx.restore();
        }

        if (this.pipeContact.active && this.pipeContact.wallRef) {
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
            
            const wall = this.pipeContact.wallRef;
            if (this.pipeContact.direction === 1) { 
                this.ctx.fillRect(wall.x, 0, 40, wall.height);
            } else { 
                this.ctx.fillRect(wall.x, wall.height + CONSTANTS.WALL_GAP, 40, 
                    CONSTANTS.SCREEN_HEIGHT - wall.height - CONSTANTS.WALL_GAP);
            }
            
            this.ctx.restore();
        }

        if (this.score < 5) {  
            this.ctx.save();
            this.ctx.fillStyle = 'white';
            this.ctx.font = '14px Arial';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(`Active Powerups: ${this.activePowerups.length}`, 10, CONSTANTS.SCREEN_HEIGHT - 100);
            this.ctx.fillText(`Powerups on screen: ${this.powerups.length}`, 10, CONSTANTS.SCREEN_HEIGHT - 85);
            this.ctx.fillText(`Next powerup in: ${this.powerupSpawnInterval - this.powerupSpawnTimer}`, 10, CONSTANTS.SCREEN_HEIGHT - 70);
            this.ctx.fillText(`Next cheese in: ${this.nextCheeseSpawn}`, 10, CONSTANTS.SCREEN_HEIGHT - 55);
            this.ctx.restore();
        }
    }

    drawCheese(x: number, y: number, size: number): void {
        const ctx = this.ctx;
        
        ctx.fillStyle = '#FDD835';  
        ctx.beginPath();
        ctx.moveTo(x + size * 0.1, y + size * 0.9);  
        ctx.lineTo(x + size * 0.9, y + size * 0.9); 
        ctx.lineTo(x + size * 0.5, y + size * 0.1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#FBC02D'; 
        
        for (let i = 0; i < 4; i++) {
            const holeX = x + size * (0.25 + Math.random() * 0.5);
            const holeY = y + size * (0.3 + Math.random() * 0.4);
            const holeSize = size * (0.05 + Math.random() * 0.1);
            
            ctx.beginPath();
            ctx.arc(holeX, holeY, holeSize, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.moveTo(x + size * 0.1, y + size * 0.9);
        ctx.lineTo(x + size * 0.5, y + size * 0.1);
        ctx.lineTo(x + size * 0.5, y + size * 0.5);
        ctx.closePath();
        ctx.fill();
        
        ctx.font = `bold ${size*0.4}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('+', x + size*0.7, y + size*0.7);
    }

    drawUI(): void {
        const fontSize = Math.max(16, Math.round(20 * CONSTANTS.UI_SCALE_FACTOR));
        const smallFontSize = Math.max(14, Math.round(16 * CONSTANTS.UI_SCALE_FACTOR));
        
        this.ctx.fillStyle = 'white';
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        this.ctx.shadowBlur = 4;
        this.ctx.shadowOffsetX = 2;
        this.ctx.shadowOffsetY = 2;
        
        if (this.gameOver) {
            this.ctx.font = `bold ${fontSize}px Arial`;
            
            const gameOverText = `Game Over! Score: ${this.score}`;
            const textMetrics = this.ctx.measureText(gameOverText);
            const textX = (CONSTANTS.SCREEN_WIDTH - textMetrics.width) / 2;
            
            this.ctx.fillText(gameOverText, textX, 50 * CONSTANTS.SCALE_FACTOR);
            this.ctx.fillText('High Scores:', 10, 100 * CONSTANTS.SCALE_FACTOR);
            
            this.highScores.forEach((score, i) => {
                this.ctx.fillText(`${i + 1}. ${score}`, 10, (140 + i * 30) * CONSTANTS.SCALE_FACTOR);
            });
            
            if (this.canReset) {
                const resetText = CONSTANTS.IS_MOBILE ? 'Tap to restart' : 'Press SPACE to restart';
                const resetTextMetrics = this.ctx.measureText(resetText);
                const resetTextX = (CONSTANTS.SCREEN_WIDTH - resetTextMetrics.width) / 2;
                
                this.ctx.fillText(resetText, resetTextX, CONSTANTS.SCREEN_HEIGHT - 50 * CONSTANTS.SCALE_FACTOR);
            }
        } else {
            this.ctx.font = `bold ${fontSize}px Arial`;
            this.ctx.fillText(`Score: ${this.score}`, 10, 30 * CONSTANTS.SCALE_FACTOR);
            
            if (this.highScores.length > 0) {
                const highScoreText = `High: ${this.highScores[0]}`;
                const metrics = this.ctx.measureText(highScoreText);
                this.ctx.fillText(highScoreText, CONSTANTS.SCREEN_WIDTH - metrics.width - 10, 30 * CONSTANTS.SCALE_FACTOR);
            }
            
            if (CONSTANTS.IS_MOBILE && !localStorage.getItem('controlsShown') && this.score < 2) {
                this.ctx.font = `${smallFontSize}px Arial`;
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                
                const controlsHint = 'Left: Jump | Right: Shoot';
                const hintMetrics = this.ctx.measureText(controlsHint);
                const hintX = (CONSTANTS.SCREEN_WIDTH - hintMetrics.width) / 2;
                
                this.ctx.fillRect(
                    hintX - 10, 
                    CONSTANTS.SCREEN_HEIGHT - 40 * CONSTANTS.SCALE_FACTOR - 10, 
                    hintMetrics.width + 20, 
                    30 * CONSTANTS.SCALE_FACTOR
                );
                
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                this.ctx.fillText(
                    controlsHint, 
                    hintX, 
                    CONSTANTS.SCREEN_HEIGHT - 20 * CONSTANTS.SCALE_FACTOR
                );
                
                if (this.score >= 1) {
                    localStorage.setItem('controlsShown', 'true');
                }
            }
        }
        
        this.ctx.shadowBlur = 0;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
    }

    drawHealthBar(): void {
        const barX = 10;
        const barY = CONSTANTS.SCREEN_HEIGHT - CONSTANTS.BASE_HEALTH_BAR_HEIGHT - 10;
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(barX, barY, CONSTANTS.BASE_HEALTH_BAR_WIDTH, CONSTANTS.BASE_HEALTH_BAR_HEIGHT);
        
        const healthRatio = this.health / this.maxHealth;
        this.ctx.fillStyle = `rgba(
            ${255 * (1 - healthRatio)},
            ${255 * healthRatio},
            0,
            0.7
        )`;
        
        this.ctx.fillRect(
            barX + 2,
            barY + 2,
            (CONSTANTS.BASE_HEALTH_BAR_WIDTH - 4) * healthRatio,
            CONSTANTS.BASE_HEALTH_BAR_HEIGHT - 4
        );
        
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(barX, barY, CONSTANTS.BASE_HEALTH_BAR_WIDTH, CONSTANTS.BASE_HEALTH_BAR_HEIGHT);
    }

    drawActivePowerups(): void {
        const startY = CONSTANTS.SCREEN_HEIGHT - CONSTANTS.BASE_HEALTH_BAR_HEIGHT - 50;
        const iconSize = 30 * CONSTANTS.SCALE_FACTOR;
        
        if (this.activePowerups.length > 0) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.fillRect(
                10, 
                startY - ((this.activePowerups.length - 1) * (iconSize + 5)) - iconSize,
                iconSize + 10,
                this.activePowerups.length * (iconSize + 5)
            );
        }
        
        this.activePowerups.forEach((powerup, index) => {
            const timeRatio = powerup.timer / CONSTANTS.POWERUP_DURATION;
            const x = 15;
            const y = startY - (index * (iconSize + 5));
            
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(x, y, iconSize, iconSize);
            
            this.ctx.fillStyle = 'rgba(0, 255, 0, 0.7)';
            this.ctx.fillRect(x, y + iconSize - 4, iconSize * timeRatio, 4);
            
            this.ctx.fillStyle = 'white';
            this.ctx.textAlign = 'center';
            this.ctx.font = `${iconSize * 0.8}px Arial`;
            
            const icons = ['↓', '↗', '★', '⚒', '⚔', '🧀'];
            this.ctx.fillText(icons[powerup.type], x + iconSize/2, y + iconSize*0.8);
        });
    }

    checkWallCollision(wall: Wall): boolean {
        const zigLeft = this.zig.x;
        const zigRight = this.zig.x + CONSTANTS.ZIG_WIDTH;
        const zigTop = this.zig.y;
        const zigBottom = this.zig.y + CONSTANTS.ZIG_HEIGHT;
        
        const wallLeft = wall.x;
        const wallRight = wall.x + 40;
        
        if (zigRight > wallLeft && zigLeft < wallRight) {
            if (zigTop < wall.height) {
                if (!this.pipeContact.active) {
                    this.pipeContact = {
                        active: true,
                        timer: 15, 
                        direction: 1, 
                        wallRef: wall
                    };
                    
                    this.zig.velY = Math.max(this.zig.velY, 0) + 2;
                    this.takeDamage(0.5);
                }
                
                this.zig.y = wall.height;
                
                return true;
            }
            
            if (zigBottom > wall.height + CONSTANTS.WALL_GAP) {
                if (!this.pipeContact.active) {
                    this.pipeContact = {
                        active: true,
                        timer: 15, 
                        direction: 2, 
                        wallRef: wall
                    };
                    
                    this.zig.velY = Math.min(this.zig.velY, 0) - 2;
                    this.takeDamage(0.5);
                }
                
                this.zig.y = wall.height + CONSTANTS.WALL_GAP - CONSTANTS.ZIG_HEIGHT;
                
                return true;
            }
        }
        
        return false;
    }

    checkEnemyCollision(enemy: Enemy): boolean {
        const zigCenterX = this.zig.x + CONSTANTS.ZIG_WIDTH/2;
        const zigCenterY = this.zig.y + CONSTANTS.ZIG_HEIGHT/2;
        const enemyCenterX = enemy.x + CONSTANTS.ENEMY_SIZE/2;
        const enemyCenterY = enemy.y + CONSTANTS.ENEMY_SIZE/2;
        
        const distance = Math.sqrt(
            Math.pow(zigCenterX - enemyCenterX, 2) +
            Math.pow(zigCenterY - enemyCenterY, 2)
        );
        
        return distance < CONSTANTS.ZIG_WIDTH/2 + CONSTANTS.ENEMY_SIZE/2;
    }

    checkBulletEnemyCollision(bullet: Bullet, enemy: Enemy): boolean {
        const bulletCenterX = bullet.x + this.currentBulletSize/2;
        const bulletCenterY = bullet.y + this.currentBulletSize/2;
        const enemyCenterX = enemy.x + CONSTANTS.ENEMY_SIZE/2;
        const enemyCenterY = enemy.y + CONSTANTS.ENEMY_SIZE/2;
        
        const distance = Math.sqrt(
            Math.pow(bulletCenterX - enemyCenterX, 2) +
            Math.pow(bulletCenterY - enemyCenterY, 2)
        );
        
        return distance < this.currentBulletSize/2 + CONSTANTS.ENEMY_SIZE/2;
    }

    checkEnemyTrailCollision(enemy: Enemy): boolean {
        const enemyCenterX = enemy.x + CONSTANTS.ENEMY_SIZE/2;
        const enemyCenterY = enemy.y + CONSTANTS.ENEMY_SIZE/2;
        
        for (let i = 1; i < this.trail.length; i++) {
            const trailX1 = this.trail[i-1].x + CONSTANTS.ZIG_WIDTH/2;
            const trailY1 = this.trail[i-1].y + CONSTANTS.ZIG_HEIGHT/2;
            const trailX2 = this.trail[i].x + CONSTANTS.ZIG_WIDTH/2;
            const trailY2 = this.trail[i].y + CONSTANTS.ZIG_HEIGHT/2;
            
            const distance = this.pointLineDistance(
                enemyCenterX, 
                enemyCenterY, 
                trailX1, 
                trailY1, 
                trailX2, 
                trailY2
            );
            
            if (distance < CONSTANTS.ENEMY_SIZE/2 + CONSTANTS.TRAIL_LINE_WIDTH/2) {
                return true;
            }
        }
        return false;
    }

    checkPowerupCollision(powerup: Powerup): boolean {
        const zigCenterX = this.zig.x + CONSTANTS.ZIG_WIDTH/2;
        const zigCenterY = this.zig.y + CONSTANTS.ZIG_HEIGHT/2;
        const powerupCenterX = powerup.x + CONSTANTS.POWERUP_SIZE/2;
        const powerupCenterY = powerup.y + CONSTANTS.POWERUP_SIZE/2;
        
        const distance = Math.sqrt(
            Math.pow(zigCenterX - powerupCenterX, 2) +
            Math.pow(zigCenterY - powerupCenterY, 2)
        );
        
        return distance < CONSTANTS.ZIG_WIDTH/2 + CONSTANTS.POWERUP_SIZE/2;
    }

    pointLineDistance(x: number, y: number, x1: number, y1: number, x2: number, y2: number): number {
        const A = x - x1;
        const B = y - y1;
        const C = x2 - x1;
        const D = y2 - y1;
        
        const dot = A * C + B * D;
        const lenSq = C * C + D * D;
        let param = -1;
        
        if (lenSq !== 0)
            param = dot / lenSq;
        
        let xx, yy;
        
        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }
        
        const dx = x - xx;
        const dy = y - yy;
        return Math.sqrt(dx * dx + dy * dy);
    }

    loadHighScores(): number[] {
        const scores = localStorage.getItem('highScores');
        return scores ? JSON.parse(scores) : [];
    }

    saveHighScore(score: number): void {
        let scores = this.loadHighScores();
        scores.push(score);
        scores.sort((a, b) => b - a);
        if (scores.length > CONSTANTS.MAX_HIGH_SCORES) {
            scores = scores.slice(0, CONSTANTS.MAX_HIGH_SCORES);
        }
        this.highScores = scores;
        localStorage.setItem('highScores', JSON.stringify(scores));
    }

    gameLoop(timestamp: number): void {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update();
        this.draw();

        requestAnimationFrame(this.gameLoop.bind(this));
    }
}

window.onload = () => new Game();

// <3