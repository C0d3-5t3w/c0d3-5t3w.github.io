<?php
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, height=device-height, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="../assets/css/alt.css">
    <link rel="stylesheet" href="../assets/css/fonts.css">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Play:wght@400;700&display=swap" rel="stylesheet">
    <title class="pride-font">Znek Game</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            position: fixed;
            width: 100%;
            height: 100%;
            touch-action: none;
            background-color: #050a14;
            font-family: 'Play', sans-serif;
        }
        
        #restartButton {
            position: fixed;
            top: 15px;
            right: 15px;
            z-index: 1000;
            background: linear-gradient(135deg, #ff3333, #cc0000);
            color: white;
            border: none;
            border-radius: 6px;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: bold;
            font-family: 'Orbitron', sans-serif;
            cursor: pointer;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 0, 0, 0.3);
            transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        #restartButton:hover {
            background: linear-gradient(135deg, #ff5555, #ee0000);
            transform: translateY(-2px) scale(1.03);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 0, 0, 0.4);
        }
        
        #restartButton:active {
            transform: translateY(1px) scale(0.97);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
        }
        
        .special-food-note {
            color: #ff00ff;
            font-weight: bold;
            text-shadow: 0 0 5px rgba(255, 0, 255, 0.5);
        }
        
        .ghost-note {
            color: #00aaff;
            font-weight: bold;
            text-shadow: 0 0 5px rgba(0, 170, 255, 0.5);
        }
        
        .game-container {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: radial-gradient(circle at center, #0f1c2c, #050a14);
        }
        
        .canvas {
            position: relative;
            max-width: 95vw;
            max-height: 90vh;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 0 50px rgba(0, 255, 255, 0.15);
        }

        #znekCanvas {
            display: block;
            border-radius: 10px;
            border: 2px solid rgba(0, 200, 255, 0.3);
            box-sizing: border-box;
        }
        
        .game-controls {
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 20, 40, 0.9);
            border: 2px solid rgba(0, 200, 255, 0.5);
            border-radius: 12px;
            padding: 20px 30px;
            color: var(--primary-color);
            text-align: center;
            transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
            max-width: 80%;
            z-index: 1100;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 200, 255, 0.15);
            backdrop-filter: blur(5px);
        }
        
        .game-controls h3 {
            margin-top: 0;
            color: #00ccff;
            border-bottom: 1px solid rgba(0, 200, 255, 0.3);
            padding-bottom: 15px;
            margin-bottom: 20px;
            font-family: 'Orbitron', sans-serif;
            font-weight: 700;
            letter-spacing: 2px;
            text-shadow: 0 0 10px rgba(0, 200, 255, 0.5);
            text-transform: uppercase;
        }
        
        .game-controls p {
            margin: 8px 0;
            line-height: 1.5;
        }
        
        .game-controls strong {
            color: #00ffff;
            font-weight: 700;
        }
        
        .game-controls.fade-out {
            opacity: 0;
            transform: translateX(-50%) translateY(-40px);
            pointer-events: none;
        }
        
        .instructions {
            font-weight: bold;
            color: #ffcc00;
            margin-top: 20px !important;
            padding-top: 15px;
            border-top: 1px solid rgba(0, 200, 255, 0.3);
            text-shadow: 0 0 10px rgba(255, 204, 0, 0.5);
            font-size: 1.1em;
        }
        
        .d-pad-container {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            width: 180px;
            height: 180px;
            z-index: 1000;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
            gap: 5px;
        }
        
        .d-pad-button {
            background: linear-gradient(135deg, rgba(100, 100, 100, 0.8), rgba(60, 60, 60, 0.8));
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            color: white;
            font-size: 24px;
            font-weight: bold;
            user-select: none;
            transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.1),
                        0 3px 5px rgba(0, 0, 0, 0.3);
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }
        
        .d-pad-button:active, .d-pad-button.active {
            background: linear-gradient(135deg, rgba(120, 120, 120, 0.9), rgba(80, 80, 80, 0.9));
            transform: scale(0.95) translateY(2px);
            box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.2),
                        0 1px 3px rgba(0, 0, 0, 0.4);
        }
        
        .d-pad-up {
            grid-column: 2;
            grid-row: 1;
            border-radius: 8px 8px 0 0;
            background: linear-gradient(to bottom, rgba(100, 140, 200, 0.8), rgba(60, 80, 140, 0.8));
        }
        
        .d-pad-left {
            grid-column: 1;
            grid-row: 2;
            border-radius: 8px 0 0 8px;
            background: linear-gradient(to right, rgba(100, 140, 200, 0.8), rgba(60, 80, 140, 0.8));
        }
        
        .d-pad-center {
            grid-column: 2;
            grid-row: 2;
            background: linear-gradient(135deg, rgba(50, 50, 50, 0.7), rgba(30, 30, 30, 0.7));
            box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.4);
            border-radius: 50%;
        }
        
        .d-pad-right {
            grid-column: 3;
            grid-row: 2;
            border-radius: 0 8px 8px 0;
            background: linear-gradient(to left, rgba(100, 140, 200, 0.8), rgba(60, 80, 140, 0.8));
        }
        
        .d-pad-down {
            grid-column: 2;
            grid-row: 3;
            border-radius: 0 0 8px 8px;
            background: linear-gradient(to top, rgba(100, 140, 200, 0.8), rgba(60, 80, 140, 0.8));
        }
        
        .shoot-button {
            position: absolute;
            width: 70px;
            height: 70px;
            right: -90px;
            top: 50%;
            transform: translateY(-50%);
            background: radial-gradient(circle at center, rgba(255, 80, 80, 0.9), rgba(200, 30, 30, 0.9));
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            color: white;
            font-size: 30px;
            font-weight: bold;
            user-select: none;
            box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.3),
                        0 5px 15px rgba(0, 0, 0, 0.5),
                        0 0 30px rgba(255, 0, 0, 0.3);
            transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
            border: 2px solid rgba(255, 255, 255, 0.2);
            animation: pulse 2s infinite ease-in-out;
        }
        
        .shoot-button:active, .shoot-button.active {
            background: radial-gradient(circle at center, rgba(220, 50, 50, 0.9), rgba(180, 20, 20, 0.9));
            transform: translateY(-50%) scale(0.92);
            box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.2),
                        0 3px 10px rgba(0, 0, 0, 0.4),
                        0 0 20px rgba(255, 0, 0, 0.2);
            animation: none;
        }

        @keyframes pulse {
            0%, 100% { transform: translateY(-50%) scale(1); }
            50% { transform: translateY(-50%) scale(1.05); }
        }
        
        .game-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 10;
            background: 
                linear-gradient(to bottom, 
                    rgba(0, 20, 40, 0.3) 0%, 
                    transparent 20%,
                    transparent 80%,
                    rgba(0, 20, 40, 0.3) 100%);
        }

        .score-display {
            position: absolute;
            top: 15px;
            left: 15px;
            color: #00ffff;
            font-family: 'Orbitron', sans-serif;
            font-size: 20px;
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
            z-index: 100;
        }
        
        @media (min-width: 768px) {
            .d-pad-container {
                right: 30px;
                left: auto;
                transform: none;
                bottom: 30px;
            }
            
            .shoot-button {
                right: -90px;
            }
        }
    </style>
</head>
<body>
    <script src="../assets/js/altdropdown.js"></script>
    <button id="restartButton">Restart Game</button>
    <div class="game-container">
        <div class="game-overlay"></div>
        <div class="canvas">
            <canvas id="znekCanvas" width="800" height="600"></canvas>
        </div>
        <div id="controls" class="game-controls">
            <h3 class="pride-font">How to Play Znek</h3>
            <p><strong>🐍 Goal:</strong> Guide your snake, eat food, and avoid obstacles</p>
            <p><strong>🎮 Controls:</strong> Arrow keys or D-pad to move</p>
            <p><strong>🔫 Combat:</strong> Press SPACE or use Shoot button to fire at ghosts</p>
            <p class="ghost-note">⚠️ Ghosts will chase you - shoot them before they catch you!</p>
            <p><strong>🍽️ Food:</strong> Blue food grows your snake by 1 segment</p>
            <p class="special-food-note">💫 Purple special food appears occasionally (worth 5 points!)</p>
            <p><strong>✨ Power-up:</strong> Yellow glow lets you eat your own tail temporarily</p>
            <p class="instructions">Press ANY key or touch D-pad to begin</p>
        </div>
        
        <div class="d-pad-container">
            <div class="d-pad-button d-pad-up" data-direction="up">⬆️</div>
            <div class="d-pad-button d-pad-left" data-direction="left">⬅️</div>
            <div class="d-pad-button d-pad-center"></div>
            <div class="d-pad-button d-pad-right" data-direction="right">➡️</div>
            <div class="d-pad-button d-pad-down" data-direction="down">⬇️</div>
            <div class="shoot-button" data-direction="shoot">🔴</div>
        </div>
    </div>
    <script>
        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });
        
        let gameInstance;
        
        document.addEventListener('DOMContentLoaded', async function() {
            const controls = document.getElementById('controls');
            const restartButton = document.getElementById('restartButton');
            const dPadButtons = document.querySelectorAll('.d-pad-button[data-direction], .shoot-button[data-direction]');

            function hideControls() {
                if (controls.style.display !== 'none') {
                    controls.classList.add('fade-out');
                    setTimeout(() => {
                        controls.style.display = 'none';
                    }, 400); 
                }
            }

            document.addEventListener('keydown', hideControls);
            
            dPadButtons.forEach(button => {
                const direction = button.getAttribute('data-direction');
                
                button.addEventListener('mousedown', function(e) {
                    hideControls();
                    if (gameInstance) {
                        gameInstance.handleDPadInput(direction);
                    }
                    button.classList.add('active');
                });
                
                button.addEventListener('mouseup', function() {
                    button.classList.remove('active');
                });
                
                button.addEventListener('touchstart', function(e) {
                    e.preventDefault();
                    hideControls();
                    if (gameInstance) {
                        gameInstance.handleDPadInput(direction);
                    }
                    button.classList.add('active');
                });
                
                button.addEventListener('touchend', function(e) {
                    e.preventDefault();
                    button.classList.remove('active');
                });
            });
            
            restartButton.addEventListener('click', function() {
                if (gameInstance) {
                    gameInstance.reset();
                }
            });
            
            try {
                const gameModule = await import('../assets/js/Znek.js');
                gameInstance = new gameModule.default();
                if (gameInstance) {
                    gameInstance.reset = gameInstance.reset || function() {
                        location.reload();
                    };
                }
            } catch (error) {
                console.error('Failed to load Znek game:', error);
            }
        });
    </script>
</body>
</html>