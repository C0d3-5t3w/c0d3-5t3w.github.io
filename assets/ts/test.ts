interface ButtonConfig {
    id: string;
    text: string;
    action: () => void;
}

class ButtonManager {
    private buttons: Map<string, HTMLButtonElement> = new Map();

    constructor(private container: HTMLElement = document.body) {
        this.initialize();
    }

    private initialize(): void {
        console.log('ButtonManager initialized');
    }

    public createButton(config: ButtonConfig): void {
        const button = document.createElement('button');
        button.id = config.id;
        button.innerText = config.text;
        button.classList.add('test-button');
        button.addEventListener('click', config.action);
        
        this.buttons.set(config.id, button);
        this.container.appendChild(button);
    }

    public removeButton(id: string): void {
        const button = this.buttons.get(id);
        if (button) {
            button.remove();
            this.buttons.delete(id);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const manager = new ButtonManager();

    const buttonConfigs: ButtonConfig[] = [
        {
            id: 'counter-button',
            text: 'Count Clicks: 0',
            action: function(this: HTMLButtonElement) {
                let count = parseInt(this.innerText.split(':')[1]);
                this.innerText = `Count Clicks: ${++count}`;
            }
        },
        {
            id: 'color-button',
            text: 'Change Color',
            action: function() {
                const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                document.body.style.backgroundColor = randomColor;
            }
        },
        {
            id: 'timer-button',
            text: 'Start 3s Timer',
            action: () => {
                const button = document.getElementById('timer-button') as HTMLButtonElement;
                button.disabled = true;
                let seconds = 3;
                
                const interval = setInterval(() => {
                    button.innerText = `${seconds}s remaining...`;
                    seconds--;
                    
                    if (seconds < 0) {
                        clearInterval(interval);
                        button.innerText = 'Start 3s Timer';
                        button.disabled = false;
                    }
                }, 1000);
            }
        }
    ];

    buttonConfigs.forEach(config => manager.createButton(config));

    const style = document.createElement('style');
    style.textContent = `
        .test-button {
            margin: 10px;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            border: none;
            background-color: #4CAF50;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .test-button:hover {
            background-color: #45a049;
            transform: scale(1.05);
        }
        .test-button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);
});

class Test {
    constructor() {
        console.log("Test class instantiated");
    }
}
const testInstance = new Test();
const testInstance2 = new Test();