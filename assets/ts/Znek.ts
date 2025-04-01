interface GameConstants {
    GRID_SIZE: number;
    SNAKE_HEAD_SIZE: number;
    SNAKE_BODY_SIZE: number;
    FOOD_SIZE: number;
    SPECIAL_FOOD_SIZE: number;
    GAME_SPEED: number;
    SPECIAL_FOOD_DURATION: number;
    SPECIAL_FOOD_MIN_INTERVAL: number;
    SPECIAL_FOOD_MAX_INTERVAL: number;
    SPECIAL_FOOD_POINTS: number;
    REGULAR_FOOD_POINTS: number;
    CANVAS_BACKGROUND: string;
    FOOD_COLOR: string;
    SPECIAL_FOOD_COLOR: string;
    SNAKE_BODY_BASE_HUE: number;
    SNAKE_BODY_SATURATION: number;
    SNAKE_BODY_LIGHTNESS: number;
    SCORE_FONT: string;
    SCORE_COLOR: string;
    SCORE_OUTLINE_COLOR: string;
    SCORE_POSITION_X: number;
    SCORE_POSITION_Y: number;
    MAX_HIGH_SCORES: number;
    DEATH_PAUSE: number;
    GAME_OVER_FONT: string;
    HIGH_SCORE_FONT: string;
    HIGH_SCORE_Y_START: number;
    HIGH_SCORE_Y_SPACING: number;
    DPAD_SIZE: number;
    DPAD_MARGIN: number;
    DPAD_BUTTON_SIZE: number;
    RESTART_BUTTON_WIDTH: number;
    RESTART_BUTTON_HEIGHT: number;
    RESTART_BUTTON_MARGIN: number;
    TIMER_HEIGHT: number;
    TIMER_MARGIN: number;
    TIMER_RADIUS: number;
    TAIL_EATING_DURATION: number;
    TAIL_EATING_MIN_INTERVAL: number;
    TAIL_EATING_MAX_INTERVAL: number;
    GHOST_SIZE: number;
    GHOST_COLOR: string;
    GHOST_MIN_INTERVAL: number;
    GHOST_MAX_INTERVAL: number;
    GHOST_DURATION: number;
    BULLET_SIZE: number;
    BULLET_COLOR: string;
    BULLET_RANGE: number;
}

interface SnakeSegment {
    x: number;
    y: number;
}

interface Food {
    x: number;
    y: number;
}

interface SpecialFood extends Food {
    timeLeft: number;
}

interface Ghost {
    x: number;
    y: number;
    timeLeft: number;
    targetX: number;
    targetY: number;
    speed: number;
}

interface Bullet {
    x: number;
    y: number;
    direction: Direction;
    distanceTraveled: number;
}

const CONSTANTS: GameConstants = {
    GRID_SIZE: 10, 
    SNAKE_HEAD_SIZE: 40, 
    SNAKE_BODY_SIZE: 16, 
    FOOD_SIZE: 30, 
    SPECIAL_FOOD_SIZE: 25,
    GAME_SPEED: 90,
    SPECIAL_FOOD_DURATION: 7000,
    SPECIAL_FOOD_MIN_INTERVAL: 10000,
    SPECIAL_FOOD_MAX_INTERVAL: 35000,
    SPECIAL_FOOD_POINTS: 5,
    REGULAR_FOOD_POINTS: 1,
    CANVAS_BACKGROUND: 'black',
    FOOD_COLOR: '#00ffff', 
    SPECIAL_FOOD_COLOR: '#ff00ff',
    SNAKE_BODY_BASE_HUE: 25,
    SNAKE_BODY_SATURATION: 100,
    SNAKE_BODY_LIGHTNESS: 50,
    SCORE_FONT: '20px Arial',
    SCORE_COLOR: 'white',
    SCORE_OUTLINE_COLOR: 'black',
    SCORE_POSITION_X: 10,
    SCORE_POSITION_Y: 30,
    MAX_HIGH_SCORES: 5,
    DEATH_PAUSE: 30,
    GAME_OVER_FONT: '24px Arial',
    HIGH_SCORE_FONT: '18px Arial',
    HIGH_SCORE_Y_START: 120,
    HIGH_SCORE_Y_SPACING: 30,
    DPAD_SIZE: 150,
    DPAD_MARGIN: 20,
    DPAD_BUTTON_SIZE: 40,
    RESTART_BUTTON_WIDTH: 120,
    RESTART_BUTTON_HEIGHT: 40,
    RESTART_BUTTON_MARGIN: 20,
    TIMER_HEIGHT: 5,
    TIMER_MARGIN: 10,
    TIMER_RADIUS: 2,
    TAIL_EATING_DURATION: 20000, 
    TAIL_EATING_MIN_INTERVAL: 30000,
    TAIL_EATING_MAX_INTERVAL: 60000, 
    GHOST_SIZE: 20,
    GHOST_COLOR: 'white',
    GHOST_MIN_INTERVAL: 15000, 
    GHOST_MAX_INTERVAL: 40000, 
    GHOST_DURATION: 25000, 
    BULLET_SIZE: 12,
    BULLET_COLOR: '#ff3333',
    BULLET_RANGE: 200,
};

type Direction = 'up' | 'down' | 'left' | 'right';

class Znek {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private snake: SnakeSegment[];
    private food: Food;
    private direction: Direction;
    private snakeImg: HTMLImageElement;
    private backgroundImg: HTMLImageElement;
    private gameLoop?: number;
    private score: number;
    private specialFood: SpecialFood | null; 
    private specialFoodTimeout?: number;
    private hasTailEatingPower: boolean;
    private tailEatingTimeLeft: number;
    private tailEatingEventTimeout?: number;
    private highScores: number[];
    private gameOver: boolean;
    private deathTimer: number;
    private canReset: boolean;
    private handleKeyPressMethod: (e: KeyboardEvent) => void;
    private gameStarted: boolean;
    private dpadElement: HTMLElement | null;
    private restartButtonElement: HTMLElement | null;
    private canvasContainer: HTMLElement | null;
    private resizeTimeout: number | null;
    private showNotification: boolean;
    private ghosts: Ghost[]; 
    private ghostTimeout?: number; 
    private bullets: Bullet[];
    
    constructor() {
        this.canvas = document.getElementById('znekCanvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.snake = [{ x: 10, y: 10 }];
        this.food = this.generateFood();
        this.direction = 'right';
        this.score = 0;
        this.snakeImg = new Image();
        this.snakeImg.src = '../assets/images/z1.png';
        this.backgroundImg = new Image();
        this.backgroundImg.src = '../assets/images/gr1.png';
        this.specialFood = null;
        this.hasTailEatingPower = false; 
        this.tailEatingTimeLeft = 0;
        this.highScores = this.loadHighScores();
        this.gameOver = false;
        this.deathTimer = 0;
        this.canReset = false;
        this.gameStarted = false;
        this.dpadElement = document.getElementById('znekDPad');
        this.restartButtonElement = document.getElementById('znekRestartButton');
        this.canvasContainer = document.getElementById('znekContainer');
        this.resizeTimeout = null;
        this.showNotification = false;
        this.ghosts = [];
        this.bullets = [];
        
        this.handleKeyPressMethod = this.handleKeyPress.bind(this);
        
        this.init();
        this.setupResponsiveLayout();
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    private init(): void {
        document.removeEventListener('keydown', this.handleKeyPressMethod);
        document.addEventListener('keydown', this.handleKeyPressMethod);
        
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }
        
        this.gameLoop = window.setInterval(this.update.bind(this), CONSTANTS.GAME_SPEED);
        this.scheduleSpecialFood();
        this.scheduleTailEatingEvent();
        this.scheduleGhostSpawn();
        this.setupTouchEvents(); 
    }

    private setupResponsiveLayout(): void {
        this.updateLayout();
        
        if (!this.restartButtonElement && this.canvasContainer) {
            this.restartButtonElement = document.createElement('button');
            this.restartButtonElement.id = 'znekRestartButton';
            this.restartButtonElement.textContent = 'Restart Game';
            this.restartButtonElement.style.position = 'absolute';
            this.restartButtonElement.style.display = 'none';
            this.restartButtonElement.addEventListener('click', () => this.reset());
            this.canvasContainer.appendChild(this.restartButtonElement);
        }
    }
    
    private updateLayout(): void {
        if (!this.canvas || !this.dpadElement) return;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const canvasRect = this.canvas.getBoundingClientRect();
        
        const dpadSize = Math.min(
            CONSTANTS.DPAD_SIZE,
            (windowWidth - canvasRect.width) / 2 - CONSTANTS.DPAD_MARGIN * 2
        );
        
        if (this.dpadElement) {
            const isPortrait = windowHeight > windowWidth;
            
            if (isPortrait) {
                this.dpadElement.style.top = `${canvasRect.bottom + CONSTANTS.DPAD_MARGIN}px`;
                this.dpadElement.style.left = `${(windowWidth - dpadSize) / 2}px`;
            } else {
                this.dpadElement.style.left = `${canvasRect.right + CONSTANTS.DPAD_MARGIN}px`;
                this.dpadElement.style.top = `${(windowHeight - dpadSize) / 2}px`;
            }
            
            this.dpadElement.style.width = `${dpadSize}px`;
            this.dpadElement.style.height = `${dpadSize}px`;
            
            const buttons = this.dpadElement.querySelectorAll('.d-pad-button');
            const buttonSize = Math.max(dpadSize / 3, CONSTANTS.DPAD_BUTTON_SIZE);
            buttons.forEach(button => {
                (button as HTMLElement).style.width = `${buttonSize}px`;
                (button as HTMLElement).style.height = `${buttonSize}px`;
            });
        }
        
        if (this.restartButtonElement) {
            const buttonWidth = Math.min(
                CONSTANTS.RESTART_BUTTON_WIDTH,
                canvasRect.width - CONSTANTS.RESTART_BUTTON_MARGIN * 2
            );
            
            this.restartButtonElement.style.width = `${buttonWidth}px`;
            this.restartButtonElement.style.height = `${CONSTANTS.RESTART_BUTTON_HEIGHT}px`;
            this.restartButtonElement.style.left = `${(canvasRect.width - buttonWidth) / 2 + canvasRect.left}px`;
            this.restartButtonElement.style.top = `${canvasRect.bottom + CONSTANTS.RESTART_BUTTON_MARGIN}px`;
            
            this.restartButtonElement.style.display = this.gameOver && this.canReset ? 'block' : 'none';
        }
    }
    
    private handleResize(): void {
        if (this.resizeTimeout) {
            window.clearTimeout(this.resizeTimeout);
        }
        
        this.resizeTimeout = window.setTimeout(() => {
            this.updateLayout();
            this.resizeTimeout = null;
        }, 250);
    }

    public reset(): void {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = undefined;
        }
        
        if (this.specialFoodTimeout) {
            clearTimeout(this.specialFoodTimeout);
            this.specialFoodTimeout = undefined;
        }
        
        if (this.tailEatingEventTimeout) {
            clearTimeout(this.tailEatingEventTimeout);
            this.tailEatingEventTimeout = undefined;
        }
        
        if (this.ghostTimeout) {
            clearTimeout(this.ghostTimeout);
            this.ghostTimeout = undefined;
        }
        
        this.snake = [{ x: 10, y: 10 }];
        this.food = this.generateFood();
        this.direction = 'right';
        this.score = 0;
        this.specialFood = null;
        this.hasTailEatingPower = false;
        this.tailEatingTimeLeft = 0;
        this.ghosts = [];
        this.bullets = [];
        this.gameOver = false;
        this.deathTimer = 0;
        this.canReset = false;
        this.gameStarted = false;
        
        this.gameLoop = window.setInterval(this.update.bind(this), CONSTANTS.GAME_SPEED);
        this.scheduleSpecialFood();
        this.scheduleTailEatingEvent();
        this.scheduleGhostSpawn();
        
        if (this.restartButtonElement) {
            this.restartButtonElement.style.display = 'none';
        }
    }

    private loadHighScores(): number[] {
        const scores = localStorage.getItem('znekHighScores');
        return scores ? JSON.parse(scores) : [];
    }

    private saveHighScore(score: number): void {
        let scores = this.loadHighScores();
        scores.push(score);
        scores.sort((a, b) => b - a);
        if (scores.length > CONSTANTS.MAX_HIGH_SCORES) {
            scores = scores.slice(0, CONSTANTS.MAX_HIGH_SCORES);
        }
        this.highScores = scores;
        localStorage.setItem('znekHighScores', JSON.stringify(scores));
    }

    private generateFood(): Food {
        let newFood: Food;
        let onSnake: boolean;
        
        do {
            newFood = {
                x: Math.floor(Math.random() * (this.canvas.width / CONSTANTS.GRID_SIZE)) * CONSTANTS.GRID_SIZE,
                y: Math.floor(Math.random() * (this.canvas.height / CONSTANTS.GRID_SIZE)) * CONSTANTS.GRID_SIZE
            };
            
            onSnake = this.snake.some(segment => 
                segment.x === newFood.x && segment.y === newFood.y
            );
        } while (onSnake);
        
        return newFood;
    }

    private scheduleSpecialFood(): void {
        const randomTime = Math.floor(Math.random() * 
            (CONSTANTS.SPECIAL_FOOD_MAX_INTERVAL - CONSTANTS.SPECIAL_FOOD_MIN_INTERVAL)) + 
            CONSTANTS.SPECIAL_FOOD_MIN_INTERVAL;
        
        this.specialFoodTimeout = window.setTimeout(() => {
            let newSpecialFood: Food;
            let onSnakeOrFood: boolean;
            let attempts = 0;
            const maxAttempts = 100; 
            
            do {
                newSpecialFood = {
                    x: Math.floor(Math.random() * (this.canvas.width / CONSTANTS.GRID_SIZE)) * CONSTANTS.GRID_SIZE,
                    y: Math.floor(Math.random() * (this.canvas.height / CONSTANTS.GRID_SIZE)) * CONSTANTS.GRID_SIZE
                };
                
                onSnakeOrFood = this.snake.some(segment => 
                    segment.x === newSpecialFood.x && segment.y === newSpecialFood.y) || 
                    (this.food.x === newSpecialFood.x && this.food.y === newSpecialFood.y);
                
                attempts++;
                if (attempts >= maxAttempts) {
                    this.scheduleSpecialFood();
                    return;
                }
            } while (onSnakeOrFood);
            
            this.specialFood = {
                ...newSpecialFood,
                timeLeft: CONSTANTS.SPECIAL_FOOD_DURATION
            };
            
            window.setTimeout(() => {
                this.specialFood = null;
                this.scheduleSpecialFood();
            }, CONSTANTS.SPECIAL_FOOD_DURATION);
        }, randomTime);
    }

    private scheduleTailEatingEvent(): void {
        const randomTime = Math.floor(Math.random() * 
            (CONSTANTS.TAIL_EATING_MAX_INTERVAL - CONSTANTS.TAIL_EATING_MIN_INTERVAL)) + 
            CONSTANTS.TAIL_EATING_MIN_INTERVAL;

        this.tailEatingEventTimeout = window.setTimeout(() => {
            if (!this.gameOver) {
                this.hasTailEatingPower = true;
                this.tailEatingTimeLeft = CONSTANTS.TAIL_EATING_DURATION;
                
                const notificationDuration = 3000; 
                this.displayTailEatingNotification(notificationDuration);
            }
            
            this.scheduleTailEatingEvent();
        }, randomTime);
    }
    
    private displayTailEatingNotification(duration: number): void {
        this.showNotification = true;
        
        setTimeout(() => {
            this.showNotification = false;
        }, duration);
    }

    private scheduleGhostSpawn(): void {
        const randomTime = Math.floor(Math.random() * 
            (CONSTANTS.GHOST_MAX_INTERVAL - CONSTANTS.GHOST_MIN_INTERVAL)) + 
            CONSTANTS.GHOST_MIN_INTERVAL;

        this.ghostTimeout = window.setTimeout(() => {
            if (!this.gameOver && this.gameStarted) {
                this.spawnGhost();
            }
            
            this.scheduleGhostSpawn();
        }, randomTime);
    }
    
    private spawnGhost(): void {
        let x, y, tooCloseToSnake;
        const safeDistance = 150; 
        
        do {
            x = Math.floor(Math.random() * (this.canvas.width / CONSTANTS.GRID_SIZE)) * CONSTANTS.GRID_SIZE;
            y = Math.floor(Math.random() * (this.canvas.height / CONSTANTS.GRID_SIZE)) * CONSTANTS.GRID_SIZE;
            
            const head = this.snake[0];
            const distance = Math.sqrt(
                Math.pow(x - head.x, 2) + Math.pow(y - head.y, 2)
            );
            
            tooCloseToSnake = distance < safeDistance;
        } while (tooCloseToSnake);
        
        const ghost: Ghost = {
            x,
            y,
            timeLeft: CONSTANTS.GHOST_DURATION,
            targetX: 0, 
            targetY: 0, 
            speed: CONSTANTS.GAME_SPEED / 4 
        };
        
        this.ghosts.push(ghost);
    }
    
    private moveGhosts(): void {
        if (!this.gameStarted || this.ghosts.length === 0) return;
        
        const head = this.snake[0];
        
        this.ghosts.forEach(ghost => {
            ghost.targetX = head.x;
            ghost.targetY = head.y;
            
            const dx = ghost.targetX - ghost.x;
            const dy = ghost.targetY - ghost.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0) {
                const moveX = (dx / distance) * (CONSTANTS.GRID_SIZE / 4);
                const moveY = (dy / distance) * (CONSTANTS.GRID_SIZE / 4);
                
                let newX = ghost.x + moveX;
                let newY = ghost.y + moveY;
                
                const wouldHitBody = this.snake.some((segment, i) => 
                    i > 0 && 
                    Math.abs(segment.x - newX) < CONSTANTS.GRID_SIZE / 2 &&
                    Math.abs(segment.y - newY) < CONSTANTS.GRID_SIZE / 2
                );
                
                if (wouldHitBody) {
                    if (Math.abs(dx) > Math.abs(dy)) {
                        newX = ghost.x + Math.sign(dx) * (CONSTANTS.GRID_SIZE / 4);
                        newY = ghost.y;
                        
                        const horizontalHitsBody = this.snake.some((segment, i) => 
                            i > 0 &&
                            Math.abs(segment.x - newX) < CONSTANTS.GRID_SIZE / 2 &&
                            Math.abs(segment.y - newY) < CONSTANTS.GRID_SIZE / 2
                        );
                        
                        if (horizontalHitsBody) {
                            newX = ghost.x;
                            newY = ghost.y + Math.sign(dy) * (CONSTANTS.GRID_SIZE / 4);
                        }
                    } else {
                        newX = ghost.x;
                        newY = ghost.y + Math.sign(dy) * (CONSTANTS.GRID_SIZE / 4);
                        
                        const verticalHitsBody = this.snake.some((segment, i) => 
                            i > 0 &&
                            Math.abs(segment.x - newX) < CONSTANTS.GRID_SIZE / 2 &&
                            Math.abs(segment.y - newY) < CONSTANTS.GRID_SIZE / 2
                        );
                        
                        if (verticalHitsBody) {
                            newX = ghost.x + Math.sign(dx) * (CONSTANTS.GRID_SIZE / 4);
                            newY = ghost.y;
                        }
                    }
                }
                
                ghost.x = newX;
                ghost.y = newY;
            }
            
            ghost.timeLeft -= CONSTANTS.GAME_SPEED;
        });
        
        this.ghosts = this.ghosts.filter(ghost => ghost.timeLeft > 0);
    }
    
    private checkGhostCollisions(): boolean {
        if (!this.gameStarted || this.ghosts.length === 0) return false;
        
        const head = this.snake[0];
        const headCenterX = head.x + CONSTANTS.SNAKE_HEAD_SIZE / 2;
        const headCenterY = head.y + CONSTANTS.SNAKE_HEAD_SIZE / 2;
        
        return this.ghosts.some(ghost => {
            const ghostCenterX = ghost.x + CONSTANTS.GHOST_SIZE / 2;
            const ghostCenterY = ghost.y + CONSTANTS.GHOST_SIZE / 2;
            
            const dx = headCenterX - ghostCenterX;
            const dy = headCenterY - ghostCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            return distance < (CONSTANTS.SNAKE_HEAD_SIZE + CONSTANTS.GHOST_SIZE) / 2.5;
        });
    }

    private handleKeyPress(e: KeyboardEvent): void {
        if (this.gameOver && this.canReset) {
            e.preventDefault();
            this.reset();
            return;
        }

        if (e.code === 'Space') {
            e.preventDefault();
            this.shootBullet();
            return;
        }

        switch(e.key) {
            case 'ArrowUp': 
                if (this.direction !== 'down') {
                    this.direction = 'up';
                    this.gameStarted = true;
                }
                break;
            case 'ArrowDown': 
                if (this.direction !== 'up') {
                    this.direction = 'down';
                    this.gameStarted = true;
                }
                break;
            case 'ArrowLeft': 
                if (this.direction !== 'right') {
                    this.direction = 'left';
                    this.gameStarted = true;
                }
                break;
            case 'ArrowRight': 
                if (this.direction !== 'left') {
                    this.direction = 'right';
                    this.gameStarted = true;
                }
                break;
        }
    }

    public handleDPadInput(direction: Direction | 'shoot'): void {
        if (this.gameOver && this.canReset) {
            this.reset();
            return;
        }

        if (direction === 'shoot') {
            this.shootBullet();
            return;
        }

        switch(direction) {
            case 'up': 
                if (this.direction !== 'down') {
                    this.direction = 'up';
                    this.gameStarted = true;
                }
                break;
            case 'down': 
                if (this.direction !== 'up') {
                    this.direction = 'down';
                    this.gameStarted = true;
                }
                break;
            case 'left': 
                if (this.direction !== 'right') {
                    this.direction = 'left';
                    this.gameStarted = true;
                }
                break;
            case 'right': 
                if (this.direction !== 'left') {
                    this.direction = 'right';
                    this.gameStarted = true;
                }
                break;
        }
    }

    private shootBullet(): void {
        if (!this.gameStarted || this.gameOver) return;
        
        const head = this.snake[0];
        const bulletSize = CONSTANTS.BULLET_SIZE;
        
        const bullet: Bullet = {
            x: head.x + CONSTANTS.SNAKE_HEAD_SIZE / 2 - bulletSize / 2,
            y: head.y + CONSTANTS.SNAKE_HEAD_SIZE / 2 - bulletSize / 2,
            direction: this.direction,
            distanceTraveled: 0
        };
        
        this.bullets.push(bullet);
    }

    private update(): void {
        if (this.gameOver) {
            this.deathTimer++;
            if (this.deathTimer >= CONSTANTS.DEATH_PAUSE) {
                this.canReset = true;
                if (this.deathTimer === CONSTANTS.DEATH_PAUSE) {
                    this.saveHighScore(this.score);
                }
                if (this.restartButtonElement) {
                    this.restartButtonElement.style.display = 'block';
                }
            }
            return;
        }

        this.moveGhosts();
        this.moveBullets();
        this.checkBulletGhostCollisions();
        
        if (this.checkGhostCollisions()) {
            if (this.gameLoop) clearInterval(this.gameLoop);
            if (this.specialFoodTimeout) clearTimeout(this.specialFoodTimeout);
            if (this.tailEatingEventTimeout) clearTimeout(this.tailEatingEventTimeout);
            if (this.ghostTimeout) clearTimeout(this.ghostTimeout);
            this.gameOver = true;
            this.saveHighScore(this.score);
            return;
        }

        if (this.gameStarted) {
            const head = { ...this.snake[0] };

            switch(this.direction) {
                case 'up': head.y -= CONSTANTS.GRID_SIZE; break;
                case 'down': head.y += CONSTANTS.GRID_SIZE; break;
                case 'left': head.x -= CONSTANTS.GRID_SIZE; break;
                case 'right': head.x += CONSTANTS.GRID_SIZE; break;
            }

            if (head.x < 0 || head.x >= this.canvas.width || head.y < 0 || head.y >= this.canvas.height) {
                if (this.gameLoop) clearInterval(this.gameLoop);
                if (this.specialFoodTimeout) clearTimeout(this.specialFoodTimeout);
                if (this.tailEatingEventTimeout) clearTimeout(this.tailEatingEventTimeout);
                if (this.ghostTimeout) clearTimeout(this.ghostTimeout);
                this.gameOver = true;
                this.saveHighScore(this.score);
                return;
            }
            
            if (this.hasTailEatingPower) {
                const collisionIndex = this.snake.findIndex((segment, i) => 
                    i > 2 && segment.x === head.x && segment.y === head.y
                );
                
                if (collisionIndex > 2) {
                    const segmentsEaten = this.snake.length - collisionIndex;
                    this.score += Math.ceil(segmentsEaten / 2); 
                    
                    this.snake = this.snake.slice(0, collisionIndex);
                }
            } else if (this.checkCollision(head)) {
                if (this.gameLoop) clearInterval(this.gameLoop);
                if (this.specialFoodTimeout) clearTimeout(this.specialFoodTimeout);
                if (this.tailEatingEventTimeout) clearTimeout(this.tailEatingEventTimeout);
                if (this.ghostTimeout) clearTimeout(this.ghostTimeout);
                this.gameOver = true;
                this.saveHighScore(this.score);
                return;
            }

            this.snake.unshift(head);

            const headCenterX = head.x + CONSTANTS.SNAKE_HEAD_SIZE / 2;
            const headCenterY = head.y + CONSTANTS.SNAKE_HEAD_SIZE / 2;
            const foodCenterX = this.food.x + CONSTANTS.FOOD_SIZE / 2;
            const foodCenterY = this.food.y + CONSTANTS.FOOD_SIZE / 2;
            
            const headToFoodDistance = Math.sqrt(
                Math.pow(headCenterX - foodCenterX, 2) + 
                Math.pow(headCenterY - foodCenterY, 2)
            );
            
            const collisionRadius = (CONSTANTS.SNAKE_HEAD_SIZE + CONSTANTS.FOOD_SIZE) / 2.5;
            
            if (headToFoodDistance < collisionRadius) {
                this.food = this.generateFood();
                this.score += CONSTANTS.REGULAR_FOOD_POINTS;
            } else if (this.specialFood) {
                const specialFoodCenterX = this.specialFood.x + CONSTANTS.SPECIAL_FOOD_SIZE / 2;
                const specialFoodCenterY = this.specialFood.y + CONSTANTS.SPECIAL_FOOD_SIZE / 2;
                
                const headToSpecialFoodDistance = Math.sqrt(
                    Math.pow(headCenterX - specialFoodCenterX, 2) + 
                    Math.pow(headCenterY - specialFoodCenterY, 2)
                );
                
                const specialCollisionRadius = (CONSTANTS.SNAKE_HEAD_SIZE + CONSTANTS.SPECIAL_FOOD_SIZE) / 2.5;
                
                if (headToSpecialFoodDistance < specialCollisionRadius) {
                    this.score += CONSTANTS.SPECIAL_FOOD_POINTS;
                    this.specialFood = null;
                    this.scheduleSpecialFood();
                }
            } else {
                this.snake.pop();
            }
        }

        if (this.hasTailEatingPower && this.tailEatingTimeLeft > 0) {
            this.tailEatingTimeLeft -= CONSTANTS.GAME_SPEED;
            if (this.tailEatingTimeLeft <= 0) {
                this.hasTailEatingPower = false;
                this.tailEatingTimeLeft = 0;
            }
        }

        this.draw();
    }

    private moveBullets(): void {
        const speed = CONSTANTS.GRID_SIZE * 2; 
        
        this.bullets.forEach(bullet => {
            switch(bullet.direction) {
                case 'up': bullet.y -= speed; break;
                case 'down': bullet.y += speed; break;
                case 'left': bullet.x -= speed; break;
                case 'right': bullet.x += speed; break;
            }
            
            bullet.distanceTraveled += speed;
        });
        
        this.bullets = this.bullets.filter(bullet => 
            bullet.distanceTraveled < CONSTANTS.BULLET_RANGE &&
            bullet.x >= 0 && 
            bullet.x < this.canvas.width && 
            bullet.y >= 0 && 
            bullet.y < this.canvas.height
        );
    }

    private checkBulletGhostCollisions(): void {
        if (this.bullets.length === 0 || this.ghosts.length === 0) return;
        
        const bulletsToRemove: number[] = [];
        const ghostsToRemove: number[] = [];
        
        this.bullets.forEach((bullet, bulletIndex) => {
            const bulletCenterX = bullet.x + CONSTANTS.BULLET_SIZE / 2;
            const bulletCenterY = bullet.y + CONSTANTS.BULLET_SIZE / 2;
            
            this.ghosts.forEach((ghost, ghostIndex) => {
                const ghostCenterX = ghost.x + CONSTANTS.GHOST_SIZE / 2;
                const ghostCenterY = ghost.y + CONSTANTS.GHOST_SIZE / 2;
                
                const dx = bulletCenterX - ghostCenterX;
                const dy = bulletCenterY - ghostCenterY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < (CONSTANTS.BULLET_SIZE + CONSTANTS.GHOST_SIZE) / 2) {
                    if (bulletsToRemove.indexOf(bulletIndex) === -1) {
                        bulletsToRemove.push(bulletIndex);
                    }
                    if (ghostsToRemove.indexOf(ghostIndex) === -1) {
                        ghostsToRemove.push(ghostIndex);
                    }
                }
            });
        });
        
        ghostsToRemove.sort((a, b) => b - a).forEach(index => {
            this.ghosts.splice(index, 1);
        });
        
        bulletsToRemove.sort((a, b) => b - a).forEach(index => {
            this.bullets.splice(index, 1);
        });
    }

    private checkCollision(head: SnakeSegment): boolean {
        return this.snake.some((segment, i) => 
            i > 2 && segment.x === head.x && segment.y === head.y
        );
    }

    private draw(): void {
        if (this.backgroundImg.complete) {
            this.ctx.drawImage(this.backgroundImg, 0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.ctx.fillStyle = CONSTANTS.CANVAS_BACKGROUND;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.backgroundImg.onload = () => this.draw();
        }
        
        for (let i = this.snake.length - 1; i > 0; i--) {
            const segment = this.snake[i];
            this.ctx.save();
            
            const hue = (CONSTANTS.SNAKE_BODY_BASE_HUE + i * 15) % 360; 
            this.ctx.fillStyle = `hsl(${hue}, ${CONSTANTS.SNAKE_BODY_SATURATION}%, ${CONSTANTS.SNAKE_BODY_LIGHTNESS}%)`;
            
            this.roundedRect(
                segment.x, 
                segment.y, 
                CONSTANTS.SNAKE_BODY_SIZE, 
                CONSTANTS.SNAKE_BODY_SIZE, 
                4
            );
            
            this.ctx.shadowColor = `hsl(${hue}, ${CONSTANTS.SNAKE_BODY_SATURATION}%, ${CONSTANTS.SNAKE_BODY_LIGHTNESS + 20}%)`;
            this.ctx.shadowBlur = 5;
            this.ctx.fill();
            this.ctx.restore();
        }
        
        if (this.snakeImg.complete) {
            const head = this.snake[0];
            this.ctx.save();
            
            this.ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
            this.ctx.shadowBlur = 10;
            
            const offsetX = (CONSTANTS.SNAKE_HEAD_SIZE - CONSTANTS.GRID_SIZE) / 2;
            this.ctx.drawImage(
                this.snakeImg, 
                head.x - offsetX, 
                head.y - offsetX, 
                CONSTANTS.SNAKE_HEAD_SIZE, 
                CONSTANTS.SNAKE_HEAD_SIZE
            );
            this.ctx.restore();
        }

        this.ctx.save();
        this.ctx.fillStyle = CONSTANTS.FOOD_COLOR;
        this.ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';
        this.ctx.shadowBlur = 10;
        this.drawFish(
            this.food.x + CONSTANTS.FOOD_SIZE / 2, 
            this.food.y + CONSTANTS.FOOD_SIZE / 2, 
            CONSTANTS.FOOD_SIZE
        );
        this.ctx.restore();
        
        if (this.specialFood) {
            const pulseFactor = 1 + 0.1 * Math.sin(Date.now() / 200);
            const actualSize = CONSTANTS.SPECIAL_FOOD_SIZE * pulseFactor;
            
            this.ctx.save();
            this.ctx.fillStyle = CONSTANTS.SPECIAL_FOOD_COLOR;
            this.ctx.shadowColor = 'rgba(255, 0, 255, 0.8)';
            this.ctx.shadowBlur = 15;
            
            this.drawFish(
                this.specialFood.x + CONSTANTS.SPECIAL_FOOD_SIZE / 2, 
                this.specialFood.y + CONSTANTS.SPECIAL_FOOD_SIZE / 2, 
                actualSize
            );

            const timerWidth = CONSTANTS.SPECIAL_FOOD_SIZE * 1.2;
            const timerX = this.specialFood.x - (timerWidth - CONSTANTS.SPECIAL_FOOD_SIZE) / 2;
            const timerY = this.specialFood.y - CONSTANTS.TIMER_MARGIN - CONSTANTS.TIMER_HEIGHT;
            const percentLeft = this.specialFood.timeLeft / CONSTANTS.SPECIAL_FOOD_DURATION;

            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            this.roundedRect(timerX, timerY, timerWidth, CONSTANTS.TIMER_HEIGHT, CONSTANTS.TIMER_RADIUS);
            this.ctx.fill();

            this.ctx.fillStyle = CONSTANTS.SPECIAL_FOOD_COLOR;
            this.roundedRect(timerX, timerY, timerWidth * percentLeft, CONSTANTS.TIMER_HEIGHT, CONSTANTS.TIMER_RADIUS);
            this.ctx.fill();

            this.ctx.restore();
        }

        this.ghosts.forEach(ghost => {
            this.ctx.save();
            
            this.ctx.fillStyle = CONSTANTS.GHOST_COLOR;
            this.ctx.shadowColor = 'rgba(100, 100, 255, 0.8)';
            this.ctx.shadowBlur = 15;
            
            this.drawGhost(
                ghost.x + CONSTANTS.GHOST_SIZE / 2,
                ghost.y + CONSTANTS.GHOST_SIZE / 2,
                CONSTANTS.GHOST_SIZE
            );
            
            const timerWidth = CONSTANTS.GHOST_SIZE * 1.2;
            const timerX = ghost.x - (timerWidth - CONSTANTS.GHOST_SIZE) / 2;
            const timerY = ghost.y - CONSTANTS.TIMER_MARGIN - CONSTANTS.TIMER_HEIGHT;
            const percentLeft = ghost.timeLeft / CONSTANTS.GHOST_DURATION;
            
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            this.roundedRect(timerX, timerY, timerWidth, CONSTANTS.TIMER_HEIGHT, CONSTANTS.TIMER_RADIUS);
            this.ctx.fill();
            
            this.ctx.fillStyle = CONSTANTS.GHOST_COLOR;
            this.roundedRect(timerX, timerY, timerWidth * percentLeft, CONSTANTS.TIMER_HEIGHT, CONSTANTS.TIMER_RADIUS);
            this.ctx.fill();
            
            this.ctx.restore();
        });

        this.bullets.forEach(bullet => {
            this.ctx.save();
            this.ctx.fillStyle = CONSTANTS.BULLET_COLOR;
            this.ctx.shadowColor = 'rgba(255, 100, 100, 0.8)';
            this.ctx.shadowBlur = 10;
            this.ctx.beginPath();
            this.ctx.arc(
                bullet.x + CONSTANTS.BULLET_SIZE / 2,
                bullet.y + CONSTANTS.BULLET_SIZE / 2,
                CONSTANTS.BULLET_SIZE / 2,
                0,
                Math.PI * 2
            );
            this.ctx.fill();
            this.ctx.restore();
        });

        if (this.showNotification) {
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(255, 255, 0, 0.7)';
            this.ctx.font = 'bold 24px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(
                'TAIL EATING POWER ACTIVATED!',
                this.canvas.width / 2,
                60
            );
            this.ctx.restore();
        }
        
        if (this.hasTailEatingPower) {
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
            const barWidth = 100;
            const barHeight = 10;
            const barX = this.canvas.width - barWidth - 10;
            const barY = 10;
            this.roundedRect(barX, barY, barWidth, barHeight, 5);
            this.ctx.fill();
            
            this.ctx.fillStyle = 'rgba(255, 255, 0, 0.7)';
            const percentLeft = this.tailEatingTimeLeft / CONSTANTS.TAIL_EATING_DURATION;
            this.roundedRect(barX, barY, barWidth * percentLeft, barHeight, 5);
            this.ctx.fill();
            this.ctx.restore();
        }

        this.ctx.fillStyle = CONSTANTS.SCORE_OUTLINE_COLOR;
        this.ctx.font = CONSTANTS.SCORE_FONT;
        this.ctx.fillText(
            `Score: ${this.score}`, 
            CONSTANTS.SCORE_POSITION_X + 1, 
            CONSTANTS.SCORE_POSITION_Y + 1
        );
        
        this.ctx.fillStyle = CONSTANTS.SCORE_COLOR;
        this.ctx.fillText(
            `Score: ${this.score}`, 
            CONSTANTS.SCORE_POSITION_X, 
            CONSTANTS.SCORE_POSITION_Y
        );

        if (this.gameOver) {
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.ctx.font = CONSTANTS.GAME_OVER_FONT;
            this.ctx.fillStyle = 'white';
            this.ctx.textAlign = 'center';
            
            const gameOverText = `Game Over! Score: ${this.score}`;
            this.ctx.fillText(gameOverText, this.canvas.width / 2, 80);
            
            this.ctx.font = CONSTANTS.HIGH_SCORE_FONT;
            this.ctx.fillStyle = '#FFD700'; 
            this.ctx.fillText('High Scores:', this.canvas.width / 2, CONSTANTS.HIGH_SCORE_Y_START - CONSTANTS.HIGH_SCORE_Y_SPACING);
            
            this.ctx.fillStyle = 'white'; 
            this.highScores.forEach((score, i) => {
                if (score === this.score && this.deathTimer < CONSTANTS.DEATH_PAUSE * 2) {
                    const pulse = Math.sin(this.deathTimer * 0.1) * 0.5 + 0.5;
                    this.ctx.fillStyle = `rgba(255, 215, 0, ${0.5 + pulse * 0.5})`; 
                    this.ctx.font = 'bold ' + CONSTANTS.HIGH_SCORE_FONT; 
                } else {
                    this.ctx.fillStyle = 'white';
                    this.ctx.font = CONSTANTS.HIGH_SCORE_FONT;
                }
                
                this.ctx.fillText(
                    `${i + 1}. ${score}`, 
                    this.canvas.width / 2, 
                    CONSTANTS.HIGH_SCORE_Y_START + (i * CONSTANTS.HIGH_SCORE_Y_SPACING)
                );
            });
            
            if (this.canReset) {
                this.ctx.save();
                this.ctx.font = 'bold 26px Arial';
                this.ctx.fillStyle = `rgba(255, 255, 255, ${0.7 + 0.3 * Math.sin(this.deathTimer * 0.1)})`;
                this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                this.ctx.shadowBlur = 5;
                const resetText = 'Press ANY KEY or D-PAD to restart';
                this.ctx.fillText(
                    resetText, 
                    this.canvas.width / 2, 
                    this.canvas.height - 50
                );
                this.ctx.restore();
            }
            
            this.ctx.restore();
        } else if (!this.gameStarted) {
            this.ctx.save();
            this.ctx.font = '24px Arial';
            this.ctx.fillStyle = 'white';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(
                'Press arrow keys or use D-pad to start', 
                this.canvas.width / 2, 
                this.canvas.height / 2
            );
            this.ctx.restore();
        }
    }
    
    private roundedRect(x: number, y: number, width: number, height: number, radius: number): void {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
    }

    private drawFish(x: number, y: number, size: number): void {
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, size / 2, size / 3, 0, 0, Math.PI * 2);
        this.ctx.moveTo(x - size / 2, y);
        this.ctx.lineTo(x - size / 1.5, y - size / 4);
        this.ctx.lineTo(x - size / 1.5, y + size / 4);
        this.ctx.closePath();
        this.ctx.fill();
    }

    private drawGhost(x: number, y: number, size: number): void {
        const radius = size / 2;
        
        this.ctx.beginPath();
        this.ctx.arc(x, y - size * 0.1, radius * 0.8, Math.PI, 0, true);
        
        const bottom = y + radius * 0.5;
        const step = radius / 3;
        
        this.ctx.lineTo(x + radius * 0.8, bottom - step);
        this.ctx.lineTo(x + radius * 0.5, bottom);
        this.ctx.lineTo(x + radius * 0.2, bottom - step);
        this.ctx.lineTo(x - radius * 0.2, bottom);
        this.ctx.lineTo(x - radius * 0.5, bottom - step);
        this.ctx.lineTo(x - radius * 0.8, bottom);
        
        this.ctx.closePath();
        this.ctx.fill();
        
        this.ctx.fillStyle = 'black';
        this.ctx.beginPath();
        this.ctx.arc(x - radius * 0.3, y - radius * 0.2, radius * 0.15, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.arc(x + radius * 0.3, y - radius * 0.2, radius * 0.15, 0, Math.PI * 2);
        this.ctx.fill();
    }

    private setupTouchEvents(): void {
        if (!this.dpadElement) return;
        
        const upButton = this.dpadElement.querySelector('.d-pad-up');
        const downButton = this.dpadElement.querySelector('.d-pad-down');
        const leftButton = this.dpadElement.querySelector('.d-pad-left');
        const rightButton = this.dpadElement.querySelector('.d-pad-right');
        const centerButton = this.dpadElement.querySelector('.d-pad-center');
        
        if (upButton) {
            upButton.addEventListener('click', () => this.handleDPadInput('up'));
            upButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleDPadInput('up');
            });
        }
        
        if (downButton) {
            downButton.addEventListener('click', () => this.handleDPadInput('down'));
            downButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleDPadInput('down');
            });
        }
        
        if (leftButton) {
            leftButton.addEventListener('click', () => this.handleDPadInput('left'));
            leftButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleDPadInput('left');
            });
        }
        
        if (rightButton) {
            rightButton.addEventListener('click', () => this.handleDPadInput('right'));
            rightButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleDPadInput('right');
            });
        }
        
        if (centerButton) {
            centerButton.addEventListener('click', () => this.handleDPadInput('shoot'));
            centerButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleDPadInput('shoot');
            });
        }
    }
}

if (typeof window !== 'undefined') {
    (window as any).Znek = Znek;
}

export default Znek;

// <3