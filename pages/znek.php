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
    </style>
</head>
<body>
    <script src="../assets/js/altdropdown.js"></script>
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
            <p class="instructions">Press any key or touch to start</p>
        </div>
    </div>
    <script>
        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });
        
        document.addEventListener('DOMContentLoaded', function() {
            const controls = document.getElementById('controls');

            function hideControls() {
                controls.classList.add('fade-out');
                setTimeout(() => {
                    controls.style.display = 'none';
                }, 300);
            }

            document.addEventListener('keydown', hideControls);
            document.addEventListener('touchstart', hideControls);
            
            const gameScript = document.createElement('script');
            gameScript.src = '../assets/js/Znek.js';
            gameScript.onload = function() {
                new Znek();
            };
            document.body.appendChild(gameScript);
        });
    </script>
</body>
</html>