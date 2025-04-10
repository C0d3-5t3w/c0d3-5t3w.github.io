<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CubeRunner 3D</title>
    <link rel="stylesheet" href="/pkg/assets/css/gTest.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body>
    <div id="game-container">
        <div id="score">Score: <span id="score-value">0</span></div>
        <div id="game-over" class="hidden">
            <h2>Game Over!</h2>
            <p>Final Score: <span id="final-score">0</span></p>
            <button id="restart-button">Play Again</button>
        </div>
        <canvas id="game-canvas"></canvas>
    </div>
    <script src="/pkg/assets/js/gTest.js"></script>
</body>
</html>
