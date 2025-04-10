<?php
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="pride-font">Cat Runner 3D</title>
    <link rel="stylesheet" href="/pkg/assets/css/gTest.css">
    <link rel="stylesheet" href="/pkg/assets/css/fonts.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body>
    <div id="game-container">
        <div id="score">Score: <span id="score-value">0</span></div>
        <div id="instructions">Use ↑↓ to move forward/back, ←→ to move sideways, SPACE to jump</div>
        <div id="level-up-notification" class="hidden">Level Up! Speed Increased!</div>
        <div id="game-over" class="hidden">
            <h2 class="pride-font">Game Over!</h2>
            <p>Final Score: <span id="final-score">0</span></p>
            <button id="restart-button">Play Again</button>
        </div>
        <div id="mobile-controls" class="hidden">
            <div class="control-row">
                <button id="mobile-forward" class="mobile-btn">↑</button>
            </div>
            <div class="control-row">
                <button id="mobile-left" class="mobile-btn">←</button>
                <button id="mobile-jump" class="mobile-btn">JUMP</button>
                <button id="mobile-right" class="mobile-btn">→</button>
            </div>
            <div class="control-row">
                <button id="mobile-backward" class="mobile-btn">↓</button>
            </div>
        </div>
        <canvas id="game-canvas"></canvas>
    </div>
    <script src="/pkg/assets/js/gTest.js"></script>
</body>
</html>
