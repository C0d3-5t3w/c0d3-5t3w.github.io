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
    STAR_FOOD_SIZE: number;
    STAR_FOOD_COLOR: string;
    STAR_FOOD_POINTS: number;
    STAR_FOOD_DURATION: number;
    STAR_FOOD_MIN_INTERVAL: number;
    STAR_FOOD_MAX_INTERVAL: number;
    TIMER_HEIGHT: number;
    TIMER_MARGIN: number;
    TIMER_RADIUS: number;
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

interface StarFood extends Food {
    timeLeft: number;
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
    STAR_FOOD_SIZE: 35,
    STAR_FOOD_COLOR: '#ffff00', 
    STAR_FOOD_POINTS: 3,
    STAR_FOOD_DURATION: 10000, 
    STAR_FOOD_MIN_INTERVAL: 20000,
    STAR_FOOD_MAX_INTERVAL: 40000,
    TIMER_HEIGHT: 5,
    TIMER_MARGIN: 10,
    TIMER_RADIUS: 2,
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
    private starFood: StarFood | null;
    private starFoodTimeout?: number;
    private tailEatingPower: boolean;
    private tailEatingTimeLeft: number;
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
        this.starFood = null;
        this.tailEatingPower = false;
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
        this.scheduleStarFood();
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
        
        if (this.starFoodTimeout) {
            clearTimeout(this.starFoodTimeout);
            this.starFoodTimeout = undefined;
        }
        
        this.snake = [{ x: 10, y: 10 }];
        this.food = this.generateFood();
        this.direction = 'right';
        this.score = 0;
        this.specialFood = null;
        this.starFood = null;
        this.tailEatingPower = false;
        this.tailEatingTimeLeft = 0;
        this.gameOver = false;
        this.deathTimer = 0;
        this.canReset = false;
        this.gameStarted = false;
        
        this.gameLoop = window.setInterval(this.update.bind(this), CONSTANTS.GAME_SPEED);
        this.scheduleSpecialFood();
        this.scheduleStarFood();
        
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

    private scheduleStarFood(): void {
        const randomTime = Math.floor(Math.random() * 
            (CONSTANTS.STAR_FOOD_MAX_INTERVAL - CONSTANTS.STAR_FOOD_MIN_INTERVAL)) + 
            CONSTANTS.STAR_FOOD_MIN_INTERVAL;

        this.starFoodTimeout = window.setTimeout(() => {
            let newStarFood: Food;
            let onSnakeOrFood: boolean;
            let attempts = 0;
            const maxAttempts = 100;

            do {
                newStarFood = {
                    x: Math.floor(Math.random() * (this.canvas.width / CONSTANTS.GRID_SIZE)) * CONSTANTS.GRID_SIZE,
                    y: Math.floor(Math.random() * (this.canvas.height / CONSTANTS.GRID_SIZE)) * CONSTANTS.GRID_SIZE
                };

                onSnakeOrFood = this.snake.some(segment => 
                    segment.x === newStarFood.x && segment.y === newStarFood.y) || 
                    (this.food.x === newStarFood.x && this.food.y === newStarFood.y) ||
                    (this.specialFood && this.specialFood.x === newStarFood.x && this.specialFood.y === newStarFood.y);

                attempts++;
                if (attempts >= maxAttempts) {
                    this.scheduleStarFood();
                    return;
                }
            } while (onSnakeOrFood);

            this.starFood = {
                ...newStarFood,
                timeLeft: CONSTANTS.STAR_FOOD_DURATION
            };

            window.setTimeout(() => {
                this.starFood = null;
                this.scheduleStarFood();
            }, CONSTANTS.STAR_FOOD_DURATION);
        }, randomTime);
    }

    private handleKeyPress(e: KeyboardEvent): void {
        if (this.gameOver && this.canReset) {
            e.preventDefault();
            this.reset();
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

    public handleDPadInput(direction: Direction): void {
        if (this.gameOver && this.canReset) {
            this.reset();
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

        if (this.gameStarted) {
            const head = { ...this.snake[0] };

            switch(this.direction) {
                case 'up': head.y -= CONSTANTS.GRID_SIZE; break;
                case 'down': head.y += CONSTANTS.GRID_SIZE; break;
                case 'left': head.x -= CONSTANTS.GRID_SIZE; break;
                case 'right': head.x += CONSTANTS.GRID_SIZE; break;
            }

            if (this.checkCollision(head)) {
                if (this.gameLoop) clearInterval(this.gameLoop);
                if (this.specialFoodTimeout) clearTimeout(this.specialFoodTimeout);
                if (this.starFoodTimeout) clearTimeout(this.starFoodTimeout);
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
            } else if (this.starFood) {
                const starFoodCenterX = this.starFood.x + CONSTANTS.STAR_FOOD_SIZE / 2;
                const starFoodCenterY = this.starFood.y + CONSTANTS.STAR_FOOD_SIZE / 2;

                const headToStarFoodDistance = Math.sqrt(
                    Math.pow(headCenterX - starFoodCenterX, 2) + 
                    Math.pow(headCenterY - starFoodCenterY, 2)
                );

                const starCollisionRadius = (CONSTANTS.SNAKE_HEAD_SIZE + CONSTANTS.STAR_FOOD_SIZE) / 2.5;

                if (headToStarFoodDistance < starCollisionRadius) {
                    this.score += CONSTANTS.STAR_FOOD_POINTS;
                    this.tailEatingPower = true;
                    this.tailEatingTimeLeft = CONSTANTS.STAR_FOOD_DURATION;
                    this.starFood = null;
                    this.scheduleStarFood();
                }
            } else {
                this.snake.pop();
            }
        }

        if (this.tailEatingPower) {
            this.tailEatingTimeLeft -= CONSTANTS.GAME_SPEED;
            if (this.tailEatingTimeLeft <= 0) {
                this.tailEatingPower = false;
                this.tailEatingTimeLeft = 0;
            }
        }

        this.draw();
    }

    private checkCollision(head: SnakeSegment): boolean {
        if (head.x < 0 || head.x >= this.canvas.width ||
            head.y < 0 || head.y >= this.canvas.height) {
            return true;
        }
        
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

        if (this.starFood) {
            const pulseFactor = 1 + 0.15 * Math.sin(Date.now() / 150);
            const actualSize = CONSTANTS.STAR_FOOD_SIZE * pulseFactor;

            this.ctx.save();
            this.ctx.fillStyle = CONSTANTS.STAR_FOOD_COLOR;
            this.ctx.shadowColor = 'rgba(255, 255, 0, 0.8)';
            this.ctx.shadowBlur = 20;

            this.drawStar(
                this.starFood.x + CONSTANTS.STAR_FOOD_SIZE / 2, 
                this.starFood.y + CONSTANTS.STAR_FOOD_SIZE / 2, 
                5, 
                actualSize / 2, 
                actualSize / 4
            );

            const timerWidth = CONSTANTS.STAR_FOOD_SIZE * 1.2;
            const timerX = this.starFood.x - (timerWidth - CONSTANTS.STAR_FOOD_SIZE) / 2;
            const timerY = this.starFood.y - CONSTANTS.TIMER_MARGIN - CONSTANTS.TIMER_HEIGHT;
            const percentLeft = this.starFood.timeLeft / CONSTANTS.STAR_FOOD_DURATION;

            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            this.roundedRect(timerX, timerY, timerWidth, CONSTANTS.TIMER_HEIGHT, CONSTANTS.TIMER_RADIUS);
            this.ctx.fill();

            this.ctx.fillStyle = CONSTANTS.STAR_FOOD_COLOR;
            this.roundedRect(timerX, timerY, timerWidth * percentLeft, CONSTANTS.TIMER_HEIGHT, CONSTANTS.TIMER_RADIUS);
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
                const resetText = 'Press any key or touch to restart';
                this.ctx.fillText(
                    resetText, 
                    this.canvas.width / 2, 
                    this.canvas.height - 50
                );
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

    private drawStar(cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number): void {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        this.ctx.beginPath();
        this.ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            this.ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            this.ctx.lineTo(x, y);
            rot += step;
        }
        this.ctx.lineTo(cx, cy - outerRadius);
        this.ctx.closePath();
        this.ctx.fill();
    }
}

if (typeof window !== 'undefined') {
    (window as any).Znek = Znek;
}

export default Znek;

// <3