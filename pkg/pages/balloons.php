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
    <link rel="stylesheet" href="../assets/css/fonts.css">
    <title>Balloons</title>
    <style>
        .balloon {
            position: absolute;
            pointer-events: auto;
            transition: transform 0.3s ease-out;
            z-index: 10;
            cursor: pointer;
            box-shadow: inset -5px -5px 10px rgba(0, 0, 0, 0.2);
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        }
        
        .balloon.grabbing {
            cursor: grabbing;
        }
        
        @keyframes wobble {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(2deg); }
            100% { transform: translateY(0) rotate(0deg); }
        }
        
        .string {
            position: absolute;
            width: 1px;
            background: rgba(255, 255, 255, 0.7);
            transform-origin: top;
            pointer-events: none;
            z-index: 5;
        }
        
        @keyframes pop {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.5; }
            100% { transform: scale(2); opacity: 0; }
        }
        
        .popping {
            animation: pop 0.3s forwards;
            pointer-events: none;
        }
        
        .confetti {
            position: absolute;
            width: 8px;
            height: 8px;
            pointer-events: none;
            z-index: 15;
        }
        
        .balloon-controls {
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
            max-height: 80vh;
            overflow-y: auto;
            transform-origin: bottom left;
            transform: scale(0.9);
        }
        
        .balloon-controls.collapsed {
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
        
        .gravity-pointer {
            position: fixed;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(3, 189, 171, 0.8) 0%, rgba(3, 189, 171, 0.2) 70%);
            pointer-events: none;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 15px var(--accent-teal);
            z-index: 99;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .gravity-pointer.active {
            opacity: 1;
        }
        
        .gravity-slider-container {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .gravity-active-indicator {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 5px;
            background-color: #555;
            transition: background-color 0.3s ease;
        }
        
        .gravity-active-indicator.active {
            background-color: var(--accent-teal);
            box-shadow: 0 0 5px var(--accent-teal);
        }
        
        .balloon-controls h3 {
            margin-top: 0;
            color: var(--alt-accent);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 10px;
            margin-bottom: 15px;
            background-color: transparent;
        }
        
        .control-item {
            margin-bottom: 10px;
        }
        
        .control-item label {
            display: block;
            margin-bottom: 5px;
            font-size: 0.9rem;
            color: #ccc;
        }
        
        .control-item input[type="range"] {
            width: 100%;
            background: #333;
            height: 5px;
            border-radius: 5px;
            outline: none;
        }
        
        .info-tip {
            font-size: 0.8rem;
            margin-top: 10px;
            padding: 5px;
            background: rgba(3, 189, 171, 0.2);
            border-radius: 4px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="gravity-pointer" id="gravity-pointer"></div>
    
    <div class="balloon-controls collapsed" id="balloon-controls">
        <button class="controls-toggle" id="controls-toggle">▼</button>
        <h3 class="pride-font">Balloon Controls</h3>
        <div class="control-item">
            <label for="balloon-size">Size:</label>
            <input type="range" id="balloon-size" min="20" max="100" value="50">
        </div>
        <div class="control-item">
            <label for="balloon-speed">Float Speed:</label>
            <input type="range" id="balloon-speed" min="1" max="10" value="5">
        </div>
        <div class="control-item">
            <label for="balloon-wobble">Wobble Amount:</label>
            <input type="range" id="balloon-wobble" min="1" max="10" value="5">
        </div>
        <div class="control-item">
            <label for="string-length">String Length:</label>
            <input type="range" id="string-length" min="50" max="200" value="100">
        </div>
        <button id="add-balloons" class="pulse-button">Add More Balloons</button>
        
        <div class="gravity-slider-container">
            <div class="control-item">
                <label for="gravity-strength">
                    <span class="gravity-active-indicator" id="gravity-indicator"></span>
                    Gravity Strength:
                </label>
                <input type="range" id="gravity-strength" min="0" max="10" value="0">
            </div>
        </div>
        
        <p class="info-tip">Tip: Double tap balloons on mobile to pop them!</p>
    </div>
    
    <div id="balloon-stats" class="terminal-text" style="position: fixed; bottom: 10px; right: 10px; z-index: 100;">
        Balloons: <span id="balloon-count">0</span>
    </div>
    
    <div id="balloon-container">
        <?php
        for($i = 0; $i < 25; $i++) { 
            $size = rand(30, 70); 
            $x = rand(0, 100);
            $y = rand(0, 100);
            $hue = rand(0, 360);
            $rotation = rand(-10, 10);
            
            echo "<div class='balloon' 
                data-size='{$size}'
                data-x='{$x}'
                data-y='{$y}'
                data-hue='{$hue}'
                style='
                width: {$size}px;
                height: " . ($size * 1.2) . "px;
                left: {$x}%;
                top: {$y}%;
                transform: rotate({$rotation}deg);
                background: radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 50%), 
                           hsla({$hue}, 70%, 50%, 0.8);
                box-shadow: inset -5px -5px 10px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.3);
            '></div>";
            
            echo "<div class='string'
                style='
                left: " . ($x + $size/200) . "%;
                top: " . ($y + $size*1.2/100) . "%;
                height: 100px;
                transform: rotate(" . rand(-5, 5) . "deg);
            '></div>";
        }
        ?>
    </div>
    
    <div class="content page-content">
        <h1 class="animated-heading pride-font">Balloon Room</h1>
        <p>Click and drag to move the balloons. Double-click or right-click to pop them!</p>
        <script src="../assets/js/altdropdown.js"></script>
    </div>
    
    <script src="../assets/js/balloons.js"></script>
    <script src="../assets/js/alt.js"></script>
</body>
</html>
