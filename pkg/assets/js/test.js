"use strict";
class ButtonManager {
    constructor(container = document.querySelector('.test-buttons')) {
        this.container = container;
        this.buttons = new Map();
        if (!this.container) {
            console.error('Button container not found');
            this.container = document.body;
        }
        this.initialize();
    }
    initialize() {
        console.log('ButtonManager initialized');
    }
    createButton(config) {
        var _a;
        const button = document.createElement('button');
        button.id = config.id;
        button.innerText = config.text;
        button.classList.add('btn');
        if (config.className) {
            button.classList.add(config.className);
        }
        else {
            button.classList.add('btn-secondary');
        }
        button.addEventListener('click', config.action);
        this.buttons.set(config.id, button);
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.appendChild(button);
    }
    removeButton(id) {
        const button = this.buttons.get(id);
        if (button) {
            button.remove();
            this.buttons.delete(id);
        }
    }
    updateButtonText(id, text) {
        const button = this.buttons.get(id);
        if (button) {
            button.innerText = text;
        }
    }
    disableButton(id, disabled = true) {
        const button = this.buttons.get(id);
        if (button) {
            button.disabled = disabled;
        }
    }
}
class NotificationManager {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'notification-container';
        document.body.appendChild(this.container);
    }
    show({ message, type = 'info', duration = 3000 }) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-message">${message}</div>
            </div>
        `;
        this.container.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        setTimeout(() => {
            notification.classList.remove('show');
            notification.classList.add('hide');
            notification.addEventListener('transitionend', () => {
                this.container.removeChild(notification);
            });
        }, duration);
    }
}
class BosonControlManager {
    constructor() {
        this.particleModes = ['repel', 'attract', 'vortex', 'excite', 'calm'];
        this.currentMode = 'repel';
        this.container = document.querySelector('.particle-controls');
        if (!this.container) {
            console.error('Particle controls container not found');
            return;
        }
        this.initialize();
    }
    initialize() {
        this.createModeButtons();
        this.createDensityControl();
        this.createToggleButton();
        this.displayCurrentMode();
    }
    createModeButtons() {
        var _a;
        const modeContainer = document.createElement('div');
        modeContainer.className = 'mode-buttons';
        this.particleModes.forEach(mode => {
            const button = document.createElement('button');
            button.innerText = this.formatModeName(mode);
            button.className = `btn btn-mode ${mode === this.currentMode ? 'active' : ''}`;
            button.dataset.mode = mode;
            button.addEventListener('click', () => {
                this.currentMode = mode;
                document.querySelectorAll('.btn-mode').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                document.dispatchEvent(new CustomEvent('boson:setMode', {
                    detail: { mode }
                }));
                this.displayCurrentMode();
            });
            modeContainer.appendChild(button);
        });
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.appendChild(modeContainer);
    }
    createDensityControl() {
        var _a;
        const densityContainer = document.createElement('div');
        densityContainer.className = 'density-control';
        const label = document.createElement('label');
        label.innerText = 'Particle Density:';
        label.htmlFor = 'particle-density';
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.id = 'particle-density';
        slider.min = '50';
        slider.max = '200';
        slider.value = '100';
        slider.addEventListener('input', () => {
            const density = parseInt(slider.value);
            document.dispatchEvent(new CustomEvent('boson:setDensity', {
                detail: { density }
            }));
        });
        densityContainer.appendChild(label);
        densityContainer.appendChild(slider);
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.appendChild(densityContainer);
    }
    createToggleButton() {
        var _a;
        const toggleButton = document.createElement('button');
        toggleButton.className = 'btn btn-primary toggle-particles';
        toggleButton.innerText = 'Toggle Particles';
        toggleButton.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('boson:toggle'));
            notificationManager.show({
                message: 'Particle system toggled',
                type: 'info'
            });
        });
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.appendChild(toggleButton);
    }
    displayCurrentMode() {
        var _a, _b, _c;
        const modeDisplay = document.createElement('div');
        modeDisplay.className = 'current-mode';
        modeDisplay.innerHTML = `<span>Current Mode: <strong>${this.formatModeName(this.currentMode)}</strong></span>`;
        const existing = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelector('.current-mode');
        if (existing) {
            (_b = this.container) === null || _b === void 0 ? void 0 : _b.removeChild(existing);
        }
        (_c = this.container) === null || _c === void 0 ? void 0 : _c.appendChild(modeDisplay);
    }
    formatModeName(mode) {
        return mode.charAt(0).toUpperCase() + mode.slice(1);
    }
}
const notificationManager = new NotificationManager();
document.addEventListener('DOMContentLoaded', () => {
    const manager = new ButtonManager();
    const buttonConfigs = [
        {
            id: 'counter-button',
            text: 'Count Clicks: 0',
            className: 'btn-primary',
            action: function () {
                let count = parseInt(this.innerText.split(':')[1]);
                this.innerText = `Count Clicks: ${++count}`;
                if (count % 10 === 0) {
                    notificationManager.show({
                        message: `Great job! You've clicked ${count} times!`,
                        type: 'success'
                    });
                }
            }
        },
        {
            id: 'color-button',
            text: 'Change Background',
            className: 'btn-secondary',
            action: function () {
                const colors = [
                    '#3a0ca3', '#4361ee', '#4cc9f0',
                    '#560bad', '#7209b7', '#f72585'
                ];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                document.body.style.backgroundColor = randomColor;
                document.body.style.transition = 'background-color 0.5s ease';
                setTimeout(() => {
                    document.body.style.backgroundColor = '';
                }, 2000);
                notificationManager.show({
                    message: 'Background color changed temporarily',
                    type: 'info'
                });
            }
        },
        {
            id: 'timer-button',
            text: 'Start 3s Timer',
            className: 'btn-accent',
            action: () => {
                const button = document.getElementById('timer-button');
                button.disabled = true;
                let seconds = 3;
                notificationManager.show({
                    message: 'Timer started!',
                    type: 'info',
                    duration: 1000
                });
                const interval = setInterval(() => {
                    button.innerText = `${seconds}s remaining...`;
                    seconds--;
                    if (seconds < 0) {
                        clearInterval(interval);
                        button.innerText = 'Start 3s Timer';
                        button.disabled = false;
                        notificationManager.show({
                            message: 'Timer complete!',
                            type: 'success'
                        });
                    }
                }, 1000);
            }
        },
        {
            id: 'toggle-theme',
            text: 'Toggle Dark/Light',
            action: () => {
                document.body.classList.toggle('light-mode');
                const isDark = !document.body.classList.contains('light-mode');
                const themeBtn = document.getElementById('toggle-theme');
                themeBtn.innerText = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
                notificationManager.show({
                    message: `Theme switched to ${isDark ? 'dark' : 'light'} mode`,
                    type: 'info'
                });
            }
        },
        {
            id: 'show-modal',
            text: 'Show Modal',
            className: 'btn-secondary',
            action: () => {
                showModal('Example Modal', 'This is a customizable modal dialog that can be used throughout your application.');
            }
        }
    ];
    buttonConfigs.forEach(config => manager.createButton(config));
    const bosonControls = new BosonControlManager();
    addScrollAnimation();
});
function showModal(title, content) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    modalContainer.innerHTML = `
        <div class="modal-header">
            <h3>${title}</h3>
            <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
            <p>${content}</p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary modal-confirm">OK</button>
        </div>
    `;
    modalOverlay.appendChild(modalContainer);
    document.body.appendChild(modalOverlay);
    setTimeout(() => {
        modalOverlay.classList.add('visible');
    }, 50);
    const closeBtn = modalContainer.querySelector('.modal-close');
    const confirmBtn = modalContainer.querySelector('.modal-confirm');
    function closeModal() {
        modalOverlay.classList.remove('visible');
        setTimeout(() => {
            document.body.removeChild(modalOverlay);
        }, 300);
    }
    closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', closeModal);
    confirmBtn === null || confirmBtn === void 0 ? void 0 : confirmBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay)
            closeModal();
    });
}
function addScrollAnimation() {
    const animateElements = document.querySelectorAll('.card, section h2');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    animateElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });
}
class Test {
    constructor() {
        console.log("Test class instantiated");
    }
}
const testInstance = new Test();
//# sourceMappingURL=test.js.map