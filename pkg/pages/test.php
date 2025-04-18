<?php
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Site</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/test.css">
    <link rel="stylesheet" href="../assets/css/fonts.css">
</head>
<body>
    <div id="boson-container" class="boson-background"></div>
    
    <nav class="navbar">
        <div class="navbar-container container">
            <div class="navbar-brand">TestSite</div>
            <ul class="navbar-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#test-buttons">Test Buttons</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#particle-controls">Particle Controls</a></li>
            </ul>
        </div>
    </nav>

    <section class="hero" id="home">
        <h1>Test Environment</h1>
        <p>For testing UI components and functionality</p>
        <a href="#features" class="btn">More</a>
    </section>

    <div class="content">
        <section id="features">
            <h2 class="pride-font">Key Features</h2>
            <div class="grid">
                <div class="card">
                    <h3 class="card-title">Interactive Buttons</h3>
                    <div class="card-body">
                        <p>Test various button interactions with real-time feedback and state changes.</p>
                    </div>
                </div>
                <div class="card">
                    <h3 class="card-title">Color Theming</h3>
                    <div class="card-body">
                        <p>Experience dynamic color changes and see how they affect the user experience.</p>
                    </div>
                </div>
                <div class="card">
                    <h3 class="card-title">Timer Functions</h3>
                    <div class="card-body">
                        <p>Test time-based operations and how they interact with the UI components.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="test-buttons">
            <h2 class="pride-font">Test Buttons</h2>
            <p>Click the buttons below to test their functionality:</p>
            <div class="test-buttons">
            </div>
        </section>

        <section id="particle-controls">
            <h2 class="pride-font">Particle Controls</h2>
            <p>Control the background particle system:</p>
            <div class="particle-controls">
            </div>
        </section>

        <section id="about">
            <h2 class="pride-font">About This Test Site</h2>
            <p>This professional test environment provides a framework for testing UI components, interactions, and design elements. Use this platform to validate functionality and ensure a smooth user experience.</p>
            <div class="card">
                <h3 class="card-title">Technical Details</h3>
                <div class="card-body">
                    <p>Built with modern web technologies including:</p>
                    <ul>
                        <li>TypeScript for interaction logic</li>
                        <li>SCSS for styling with proper organization</li>
                        <li>PHP for server-side processing</li>
                    </ul>
                </div>
            </div>
        </section>
    </div>

    <footer>
        <p>Test Environment &copy; <?php echo date('Y'); ?></p>
        <p>❤︎ Created for testing purposes</p>
    </footer>

    <script src="../assets/js/test.js"></script>
    <script src="../assets/js/boson.js"></script>
</body>
</html>
