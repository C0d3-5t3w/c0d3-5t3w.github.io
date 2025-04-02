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
    <title>Znek Game</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            position: fixed;
            width: 100%;
            height: 100%;
            touch-action: none;
        }
        
        #restartButton {
            position: fixed;
            top: 15px;
            right: 15px;
            z-index: 1000;
            background-color: #ff3333;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 15px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
            transition: all 0.2s ease;
        }
        
        #restartButton:hover {
            background-color: #cc0000;
            transform: scale(1.05);
        }
        
        #restartButton:active {
            transform: scale(0.95);
        }
        
        .special-food-note {
            color: #8800ff;
            font-weight: bold;
        }
        
        .ghost-note {
            color: #00ccff;
            font-weight: bold;
        }
        
        .game-controls {
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.85);
            border: 2px solid var(--accent-teal);
            border-radius: 12px;
            padding: 15px 25px;
            color: var(--primary-color);
            text-align: center;
            transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
            max-width: 80%;
            z-index: 1100;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
        }
        
        .game-controls h3 {
            margin-top: 0;
            color: #ff9900;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            padding-bottom: 10px;
            margin-bottom: 15px;
        }
        
        .game-controls p {
            margin: 5px 0;
        }
        
        .game-controls.fade-out {
            opacity: 0;
            transform: translateX(-50%) translateY(-40px); /* More dramatic upward movement */
            pointer-events: none;
        }
        
        .instructions {
            font-weight: bold;
            color: #ffcc00;
            margin-top: 15px !important;
            padding-top: 10px;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
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
            background-color: rgba(80, 80, 80, 0.7);
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            color: white;
            font-size: 20px;
            font-weight: bold;
            user-select: none;
            transition: all 0.15s ease;
        }
        
        .d-pad-button:active, .d-pad-button.active {
            background-color: rgba(140, 140, 140, 0.9);
            transform: scale(0.95);
        }
        
        .d-pad-up {
            grid-column: 2;
            grid-row: 1;
            border-radius: 8px 8px 0 0;
        }
        
        .d-pad-left {
            grid-column: 1;
            grid-row: 2;
            border-radius: 8px 0 0 8px;
        }
        
        .d-pad-center {
            grid-column: 2;
            grid-row: 2;
            background-color: rgba(100, 100, 100, 0.5);
        }
        
        .d-pad-right {
            grid-column: 3;
            grid-row: 2;
            border-radius: 0 8px 8px 0;
        }
        
        .d-pad-down {
            grid-column: 2;
            grid-row: 3;
            border-radius: 0 0 8px 8px;
        }
        
        .shoot-button {
            position: absolute;
            width: 60px;
            height: 60px;
            right: -80px;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(255, 60, 60, 0.8);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            color: white;
            font-size: 24px;
            font-weight: bold;
            user-select: none;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
            transition: all 0.15s ease;
        }
        
        .shoot-button:active, .shoot-button.active {
            background-color: rgba(200, 30, 30, 0.9);
            transform: translateY(-50%) scale(0.95);
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
        }
        
        @media (min-width: 768px) {
            .d-pad-container {
                right: 30px;
                left: auto;
                transform: none;
                bottom: 30px;
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
            <h3>HOW TO PLAY ZNEK</h3>
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