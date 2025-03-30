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

interface TouchFeedback {
    x: number;
    y: number;
    opacity: number;
    timestamp: number;
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
    FOOD_COLOR: '#ff3333',
    SPECIAL_FOOD_COLOR: '#8800ff',
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
    HIGH_SCORE_Y_SPACING: 30
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
    private highScores: number[];
    private gameOver: boolean;
    private deathTimer: number;
    private canReset: boolean;
    private handleKeyPressMethod: (e: KeyboardEvent) => void;
    private handleTouchMethod: (e: TouchEvent) => void;
    private touchFeedbacks: TouchFeedback[];
    private gameStarted: boolean;
    private touchStartX: number | null;
    private touchStartY: number | null;
    private touchStartTime: number | null;
    private handleTouchStartMethod: (e: TouchEvent) => void;
    private handleTouchMoveMethod: (e: TouchEvent) => void;
    private handleTouchEndMethod: (e: TouchEvent) => void;
    
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
        this.highScores = this.loadHighScores();
        this.gameOver = false;
        this.deathTimer = 0;
        this.canReset = false;
        this.touchFeedbacks = [];
        this.gameStarted = false;
        this.touchStartX = null;
        this.touchStartY = null;
        this.touchStartTime = null;
        
        this.handleKeyPressMethod = this.handleKeyPress.bind(this);
        this.handleTouchMethod = this.handleTouch.bind(this);
        this.handleTouchStartMethod = this.handleTouchStart.bind(this);
        this.handleTouchMoveMethod = this.handleTouchMove.bind(this);
        this.handleTouchEndMethod = this.handleTouchEnd.bind(this);
        
        this.init();
    }

    private init(): void {
        document.removeEventListener('keydown', this.handleKeyPressMethod);
        document.removeEventListener('touchstart', this.handleTouchMethod);
        document.removeEventListener('touchstart', this.handleTouchStartMethod);
        document.removeEventListener('touchmove', this.handleTouchMoveMethod);
        document.removeEventListener('touchend', this.handleTouchEndMethod);
        
        document.addEventListener('keydown', this.handleKeyPressMethod);
        document.addEventListener('touchstart', this.handleTouchStartMethod);
        document.addEventListener('touchmove', this.handleTouchMoveMethod);
        document.addEventListener('touchend', this.handleTouchEndMethod);
        
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }
        
        this.gameLoop = window.setInterval(this.update.bind(this), CONSTANTS.GAME_SPEED);
        this.scheduleSpecialFood();
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
        
        this.snake = [{ x: 10, y: 10 }];
        this.food = this.generateFood();
        this.direction = 'right';
        this.score = 0;
        this.specialFood = null;
        this.gameOver = false;
        this.deathTimer = 0;
        this.canReset = false;
        this.gameStarted = false;
        this.touchStartX = null;
        this.touchStartY = null;
        this.touchStartTime = null;
        
        this.gameLoop = window.setInterval(this.update.bind(this), CONSTANTS.GAME_SPEED);
        this.scheduleSpecialFood();
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

    private handleTouchStart(e: TouchEvent): void {
        e.preventDefault();
        
        if (this.gameOver && this.canReset) {
            this.reset();
            return;
        }
        
        const touch = e.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
        this.touchStartTime = Date.now();
        
        this.touchFeedbacks.push({
            x: touch.clientX,
            y: touch.clientY,
            opacity: 1.0,
            timestamp: Date.now()
        });
    }

    private handleTouchMove(e: TouchEvent): void {
        e.preventDefault();
    }

    private handleTouchEnd(e: TouchEvent): void {
        e.preventDefault();
        
        if (this.touchStartX === null || this.touchStartY === null || this.touchStartTime === null) {
            return;
        }
        
        const touchStartX = this.touchStartX;
        const touchStartY = this.touchStartY;
        const touchStartTime = this.touchStartTime;
        
        const touch = e.changedTouches[0];
        const endX = touch.clientX;
        const endY = touch.clientY;
        const deltaX = endX - touchStartX;  
        const deltaY = endY - touchStartY;  
        const touchDuration = Date.now() - touchStartTime;
        
        this.touchStartX = null;
        this.touchStartY = null;
        this.touchStartTime = null;
        
        if (touchDuration > 500) {
            this.handleTouch(e);
            return;
        }
        
        const minSwipeDistance = 30;
        
        let directionChanged = false;
        
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0 && this.direction !== 'left') {
                    this.direction = 'right';
                    directionChanged = true;
                } else if (deltaX < 0 && this.direction !== 'right') {
                    this.direction = 'left';
                    directionChanged = true;
                }
            }
        } else {
            if (Math.abs(deltaY) > minSwipeDistance) {
                if (deltaY > 0 && this.direction !== 'up') {
                    this.direction = 'down';
                    directionChanged = true;
                } else if (deltaY < 0 && this.direction !== 'down') {
                    this.direction = 'up';
                    directionChanged = true;
                }
            }
        }
        
        if (directionChanged) {
            this.gameStarted = true;
            
            const midX = (this.touchStartX + endX) / 2;
            const midY = (this.touchStartY + endY) / 2;
            
            this.touchFeedbacks.push({
                x: midX,
                y: midY,
                opacity: 1.0,
                timestamp: Date.now()
            });
        } else {
            this.handleTouch(e);
        }
    }

    private handleTouch(e: TouchEvent): void {
        e.preventDefault();
        
        if (this.gameOver && this.canReset) {
            this.reset();
            return;
        }
        
        let touch;
        if (e.changedTouches && e.changedTouches.length > 0) {
            touch = e.changedTouches[0];
        } else if (e.touches && e.touches.length > 0) {
            touch = e.touches[0];
        } else {
            return;
        }
        
        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;
        const y = touch.clientY;
        const x = touch.clientX;
        
        let directionChanged = false;
        
        if (y < screenHeight * 0.4) {
            if (this.direction !== 'down') {
                this.direction = 'up';
                directionChanged = true;
            }
        } else if (y > screenHeight * 0.6) {
            if (this.direction !== 'up') {
                this.direction = 'down';
                directionChanged = true;
            }
        } else if (x < screenWidth * 0.4) {
            if (this.direction !== 'right') {
                this.direction = 'left';
                directionChanged = true;
            }
        } else if (x > screenWidth * 0.6) {
            if (this.direction !== 'left') {
                this.direction = 'right';
                directionChanged = true;
            }
        }
        
        if (directionChanged) {
            this.gameStarted = true;
        }
    }
    
    private updateTouchFeedbacks(): void {
        const now = Date.now();
        const fadeTime = 500; 
        
        this.touchFeedbacks = this.touchFeedbacks.filter(feedback => {
            const elapsed = now - feedback.timestamp;
            feedback.opacity = Math.max(0, 1 - elapsed / fadeTime);
            return feedback.opacity > 0;
        });
    }
    
    private renderTouchFeedbacks(): void {
        this.ctx.save();
        
        this.touchFeedbacks.forEach(feedback => {
            const radius = 60;
            const gradient = this.ctx.createRadialGradient(
                feedback.x, feedback.y, 0,
                feedback.x, feedback.y, radius
            );
            
            gradient.addColorStop(0, `rgba(255, 255, 255, ${feedback.opacity * 0.7})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(feedback.x, feedback.y, radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        this.ctx.restore();
    }

    private update(): void {
        if (this.gameOver) {
            this.deathTimer++;
            if (this.deathTimer >= CONSTANTS.DEATH_PAUSE) {
                this.canReset = true;
            }
            return;
        }

        this.updateTouchFeedbacks();
        
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
        
        this.renderTouchFeedbacks();
        
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
        this.ctx.shadowColor = 'rgba(255, 0, 0, 0.8)';
        this.ctx.shadowBlur = 10;
        this.roundedRect(
            this.food.x, 
            this.food.y, 
            CONSTANTS.FOOD_SIZE, 
            CONSTANTS.FOOD_SIZE, 
            6
        );
        this.ctx.fill();
        this.ctx.restore();
        
        if (this.specialFood) {
            const pulseFactor = 1 + 0.1 * Math.sin(Date.now() / 200);
            const actualSize = CONSTANTS.SPECIAL_FOOD_SIZE * pulseFactor;
            
            this.ctx.save();
            this.ctx.fillStyle = CONSTANTS.SPECIAL_FOOD_COLOR;
            this.ctx.shadowColor = 'rgba(136, 0, 255, 0.8)';
            this.ctx.shadowBlur = 15;
            
            this.ctx.beginPath();
            this.ctx.arc(
                this.specialFood.x + CONSTANTS.SPECIAL_FOOD_SIZE / 2,
                this.specialFood.y + CONSTANTS.SPECIAL_FOOD_SIZE / 2,
                actualSize / 2,
                0,
                Math.PI * 2
            );
            this.ctx.fill();
            
            this.ctx.fillStyle = 'white';
            this.ctx.font = '14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(
                `+${CONSTANTS.SPECIAL_FOOD_POINTS}`, 
                this.specialFood.x + CONSTANTS.SPECIAL_FOOD_SIZE / 2, 
                this.specialFood.y + CONSTANTS.SPECIAL_FOOD_SIZE / 2 + 5
            );
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
                'Press arrow keys or touch screen to start', 
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
}

if (typeof window !== 'undefined') {
    (window as any).Znek = Znek;
}

export default Znek;

// <3