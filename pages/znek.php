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
            <h3>Controls:</h3>
            <p>Desktop: Use Arrow Keys to control the snake</p>
            <p>Mobile/Desktop: Use D-pad controls at the bottom of the screen</p>
            <p>⬆️ Up button: Move Up</p>
            <p>⬇️ Down button: Move Down</p>
            <p>⬅️ Left button: Move Left</p>
            <p>➡️ Right button: Move Right</p>
            <p>Collect the red food to grow</p>
            <p class="special-food-note">Special purple food appears occasionally and is worth 5 points!</p>
            <p>Watch out - special food disappears after a few seconds, and makes the tail longer so grab it quickly!</p>
            <p class="instructions">Press any arrow key or use D-pad to begin moving</p>
        </div>
        
        <div class="d-pad-container">
            <div class="d-pad-button d-pad-up" data-direction="up">⬆️</div>
            <div class="d-pad-button d-pad-left" data-direction="left">⬅️</div>
            <div class="d-pad-button d-pad-center"></div>
            <div class="d-pad-button d-pad-right" data-direction="right">➡️</div>
            <div class="d-pad-button d-pad-down" data-direction="down">⬇️</div>
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
            const dPadButtons = document.querySelectorAll('.d-pad-button[data-direction]');

            function hideControls() {
                controls.classList.add('fade-out');
                setTimeout(() => {
                    controls.style.display = 'none';
                }, 300);
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