<?php
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="../assets/css/alt.css">
    <title>particles</title>
    <style>
        .particle {
            position: absolute;
            border-radius: 50%;
            pointer-events: auto;
            transition: transform 0.3s ease-out, background 0.3s ease;
            z-index: 10;
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        @keyframes explode {
            0% { transform: scale(1) rotate(0deg); opacity: 1; }
            50% { transform: scale(1.5) rotate(180deg); opacity: 0.7; }
            100% { transform: scale(2) rotate(360deg); opacity: 0; }
        }
        .exploding {
            animation: explode 0.5s forwards !important;
            pointer-events: none;
        }
        .flash {
            position: absolute;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: 0;
            animation: flash 0.1s forwards;
        }
        @keyframes flash {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }
        .content {
            position: relative;
            z-index: 100;
        }
        body {
            background-color: var(--background-color);
            overflow-x: hidden;
            min-height: 100vh;
        }
        #particle-stats {
            position: fixed;
            bottom: 10px;
            right: 10px;
            color: var(--primary-color);
            background: var(--accent-teal);
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            z-index: 1000;
            border: 1px solid var(--primary-color);
        }
        .particle-controls {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid var(--accent-teal);
            border-radius: 8px;
            padding: 15px;
            z-index: 100;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
            color: var(--primary-color);
            transition: transform 0.3s ease, opacity 0.3s ease;
            min-width: 250px;
            max-width: 300px;
            transform-origin: bottom left;
            transform: scale(0.9);
        }
        
        .particle-controls.collapsed {
            top: 20px;
            right: 20px;
            transform: translateY(calc(100% - 40px)) scale(0.9);
        }
        
        .controls-toggle {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            color: var(--primary-color);
            cursor: pointer;
            padding: 0;
            font-size: 1.2rem;
            line-height: 1;
        }
    </style>
</head>
<body>
    <div id="particle-stats" class="terminal-text">Particles: <span id="particle-count">0</span></div>
    
    <div class="particle-controls collapsed" id="particle-controls">
        <button class="controls-toggle" id="controls-toggle">▼</button>
        <h3>Particle Controls</h3>
        <div class="control-item">
            <label for="particle-size">Size:</label>
            <input type="range" id="particle-size" min="5" max="50" value="20">
        </div>
        <div class="control-item">
            <label for="particle-speed">Speed:</label>
            <input type="range" id="particle-speed" min="1" max="10" value="5">
        </div>
        <button id="add-particles" class="pulse-button">Add More Particles</button>
        <p class="info-tip">Tip: Click on particles to make them explode!</p>
    </div>
    
    <div id="particle-container">
        <?php
        for($i = 0; $i < 250; $i++) { 
            $size = rand(10, 30); 
            $x = rand(0, 100);
            $y = rand(0, 100);
            $hue = rand(0, 360);
            echo "<div class='particle enhanced' 
                data-size='{$size}'
                data-x='{$x}'
                data-y='{$y}'
                data-hue='{$hue}'
                style='
                width: {$size}px;
                height: {$size}px;
                left: {$x}%;
                top: {$y}%;
                background: hsla({$hue}, 70%, 50%, 0.6);
            '></div>";
        }
        ?>
    </div>
    <div class="content page-content">
    <script src="../assets/js/altdropdown.js"></script>
    </div>
    <script src="../assets/js/particles.js"></script>
    <script src="../assets/js/alt.js"></script>
</body>
</html>