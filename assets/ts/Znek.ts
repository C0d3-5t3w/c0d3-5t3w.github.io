class Znek {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private snake: { x: number, y: number }[];
    private food: { x: number, y: number };
    private direction: string;
    private snakeImg: HTMLImageElement;
    private backgroundImg: HTMLImageElement;
    private gameLoop?: number;
    private score: number;
    private specialFood: { x: number, y: number } | null;
    private specialFoodTimeout?: number;

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
        this.init();
    }

    private init(): void {
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        document.addEventListener('touchstart', this.handleTouch.bind(this));
        this.gameLoop = window.setInterval(this.update.bind(this), 100);
        this.scheduleSpecialFood();
    }

    private generateFood(): { x: number, y: number } {
        return {
            x: Math.floor(Math.random() * (this.canvas.width / 20)) * 20,
            y: Math.floor(Math.random() * (this.canvas.height / 20)) * 20
        };
    }

    private scheduleSpecialFood(): void {
        const randomTime = Math.floor(Math.random() * 35000) + 10000;
        
        this.specialFoodTimeout = window.setTimeout(() => {
            this.specialFood = {
                x: Math.floor(Math.random() * (this.canvas.width / 20)) * 20,
                y: Math.floor(Math.random() * (this.canvas.height / 20)) * 20
            };
            
            window.setTimeout(() => {
                this.specialFood = null;
                this.scheduleSpecialFood();
            }, 7000);
        }, randomTime);
    }

    private handleKeyPress(e: KeyboardEvent): void {
        switch(e.key) {
            case 'ArrowUp': this.direction = 'up'; break;
            case 'ArrowDown': this.direction = 'down'; break;
            case 'ArrowLeft': this.direction = 'left'; break;
            case 'ArrowRight': this.direction = 'right'; break;
        }
    }

    private handleTouch(e: TouchEvent): void {
        e.preventDefault();
        const touch = e.touches[0];
        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;
        const y = touch.clientY;
        const x = touch.clientX;

        if (y < screenHeight / 3) {
            this.direction = 'up';
        } else if (y > screenHeight * 2 / 3) {
            this.direction = 'down';
        } else if (x < screenWidth / 2) {
            this.direction = 'left';
        } else {
            this.direction = 'right';
        }
    }

    private update(): void {
        const head = { ...this.snake[0] };

        switch(this.direction) {
            case 'up': head.y -= 20; break;
            case 'down': head.y += 20; break;
            case 'left': head.x -= 20; break;
            case 'right': head.x += 20; break;
        }

        if (this.checkCollision(head)) {
            clearInterval(this.gameLoop);
            if (this.specialFoodTimeout) {
                clearTimeout(this.specialFoodTimeout);
            }
            alert(`Game Over! Score: ${this.score}`);
            return;
        }

        this.snake.unshift(head);

        if (head.x === this.food.x && head.y === this.food.y) {
            this.food = this.generateFood();
            this.score++;
        } else if (this.specialFood && head.x === this.specialFood.x && head.y === this.specialFood.y) {
            this.score += 5;
            this.specialFood = null;
            this.scheduleSpecialFood();
        } else {
            this.snake.pop();
        }

        this.draw();
    }

    private checkCollision(head: { x: number, y: number }): boolean {
        return head.x < 0 || head.x >= this.canvas.width ||
               head.y < 0 || head.y >= this.canvas.height ||
               this.snake.some((segment, i) => i !== 0 && segment.x === head.x && segment.y === head.y);
    }

    private draw(): void {
        if (this.backgroundImg.complete) {
            this.ctx.drawImage(this.backgroundImg, 0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.backgroundImg.onload = () => this.draw();
        }
        
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                this.ctx.drawImage(this.snakeImg, segment.x, segment.y, 20, 20);
            } else {
                this.ctx.save();
                const hue = (index * 25) % 360; 
                this.ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
                this.ctx.fillRect(segment.x, segment.y, 18, 18);
                this.ctx.restore();
            }
        });

        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.food.x, this.food.y, 20, 20);
        
        if (this.specialFood) {
            this.ctx.fillStyle = 'purple';
            this.ctx.fillRect(this.specialFood.x, this.specialFood.y, 20, 20);
            
            this.ctx.fillStyle = 'white';
            this.ctx.font = '14px Arial';
            this.ctx.fillText('+5', this.specialFood.x + 2, this.specialFood.y + 15);
        }

        this.ctx.fillStyle = 'black';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 11, 31);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 10, 30);
    }
}

if (typeof window !== 'undefined') {
    (window as any).Znek = Znek;
}

export default Znek;

// <3