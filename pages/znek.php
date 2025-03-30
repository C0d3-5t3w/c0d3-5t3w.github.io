<?php
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
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
            <p>Mobile: Touch screen areas to move</p>
            <p>⬆️ Top third of screen: Up</p>
            <p>⬇️ Bottom third of screen: Down</p>
            <p>⬅️ Left half of middle: Left</p>
            <p>➡️ Right half of middle: Right</p>
            <p>Collect the red food to grow</p>
            <p class="special-food-note">Special purple food appears occasionally and is worth 5 points!</p>
            <p>Watch out - special food disappears after a few seconds, and makes the tail longer so grab it quickly!</p>
            <p class="instructions">Press any arrow key or touch screen to begin moving</p>
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

            function hideControls() {
                controls.classList.add('fade-out');
                setTimeout(() => {
                    controls.style.display = 'none';
                }, 300);
            }

            document.addEventListener('keydown', hideControls);
            document.addEventListener('touchstart', hideControls);
            
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