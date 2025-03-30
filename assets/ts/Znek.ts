class Znek {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private snake: { x: number, y: number }[];
    private food: { x: number, y: number };
    private direction: string;
    private snakeImg: HTMLImageElement;
    private gameLoop?: number;
    private score: number;

    constructor() {
        this.canvas = document.getElementById('znekCanvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.snake = [{ x: 10, y: 10 }];
        this.food = this.generateFood();
        this.direction = 'right';
        this.score = 0;
        this.snakeImg = new Image();
        this.snakeImg.src = '../assets/images/z1.png';
        this.init();
    }

    private init(): void {
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        document.addEventListener('touchstart', this.handleTouch.bind(this));
        this.gameLoop = window.setInterval(this.update.bind(this), 100);
    }

    private generateFood(): { x: number, y: number } {
        return {
            x: Math.floor(Math.random() * (this.canvas.width / 20)) * 20,
            y: Math.floor(Math.random() * (this.canvas.height / 20)) * 20
        };
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
            alert(`Game Over! Score: ${this.score}`);
            return;
        }

        this.snake.unshift(head);

        if (head.x === this.food.x && head.y === this.food.y) {
            this.food = this.generateFood();
            this.score++;
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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.snake.forEach((segment) => {
            this.ctx.save();
            this.ctx.fillStyle = '#00ff00';
            this.ctx.fillRect(segment.x, segment.y, 18, 18);
            this.ctx.restore();
        });

        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.food.x, this.food.y, 20, 20);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 10, 30);
    }
}

if (typeof window !== 'undefined') {
    (window as any).Znek = Znek;
}

export default Znek;