<?php
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");

session_start();
date_default_timezone_set('America/Los_Angeles');

if (!isset($_SESSION['visit_count'])) {
    $_SESSION['visit_count'] = 1;
} else {
    $_SESSION['visit_count']++;
}

$current_date = date("F j, Y");
$current_time = date("g:i a");

$hour = date('H');
if ($hour < 12) {
    $greeting = "Good morning";
} elseif ($hour < 18) {
    $greeting = "Good afternoon";
} else {
    $greeting = "Good evening";
}

$quotes = [
    "Don't die.",
    "Code is like music. It has rhythm, structure, and harmony.",
    "Just as music has different genres, coding has different languages.",
    "Cooking is like coding; both are creative processes that require precision.",
    "Music and coding both require practice and dedication to master.",
    "A good recipe and good code both need a solid foundation.",
    "Just as a musician refines their craft, a coder refines their code.",
    "In cooking, as in coding, the right ingredients make a world of difference.",
    "Music, like code, can be expressive and powerful.",
    "Cooking is an art, and so is coding.",
    "Debugging code is like tuning an instrument until it sounds just right.",
    "In both music and coding, collaboration can create something greater than the sum of its parts.",
    "A well-written program is like a well-composed piece of music.",
    "Cooking and coding both require a balance of creativity and technique.",
    "The best chefs and programmers know the importance of preparation.",
    "In music, as in code, small changes can have a big impact.",
    "Cooking and coding are both about creating something from nothing.",
    "In both music and coding, practice makes perfect.",
    "A good meal and good code both require attention to detail.",
    "Music and coding both allow for endless experimentation.",
    "In cooking, as in coding, you learn from your mistakes.",
    "The best recipes and the best code are simple yet elegant.",
    "In both music and coding, there are no shortcuts to excellence.",
    "Cooking and coding both require patience and persistence.",
    "A well-cooked meal and well-written code both take time.",
    "Music and coding both have the power to move and inspire.",
    "In cooking, as in coding, the right tools make a difference.",
    "Both music and code can be beautiful in their simplicity.",
    "Cooking and coding both require a clear vision and execution.",
    "In music and coding, the journey is as important as the destination.",
    "Just as a good song has a hook, good code has a clear purpose.",
    "Cooking and coding both involve a lot of trial and error.",
    "Music and coding both have their own languages and notations.",
    "In both cooking and coding, the end result is something to be proud of.",
    "A good dish and good code both require balance and harmony.",
    "Music and coding both require a deep understanding of the basics.",
    "Cooking and coding are both about transforming raw materials into something amazing.",
    "In music and coding, creativity and logic go hand in hand.",
    "A great meal and great code both leave a lasting impression.",
    "Music and coding both require a keen ear and eye for detail.",
    "In cooking, as in coding, experimentation leads to discovery.",
    "Both music and code can be shared and enjoyed by others.",
    "Cooking and coding both benefit from continuous learning and improvement.",
    "In music and coding, you build on the work of those who came before you.",
    "A good recipe and good code both require clear instructions.",
    "Music and coding both have the power to bring people together.",
    "Cooking and coding both require a mix of science and art.",
    "In music and coding, the right rhythm and flow are essential.",
    "Both chefs and coders know that sometimes less is more.",
    "Cooking and coding both involve a process of refinement and perfection.",
    "Music and coding both offer endless possibilities and creativity.",
    "Code is like humor. When you have to explain it, it's bad.",
    "Fix the cause, not the symptom.",
    "Optimism is an occupational hazard of programming: feedback is the treatment.",
    "When to use iterative development? You should use iterative development only on projects that you want to succeed.",
    "Simplicity is the soul of efficiency.",
    "Before software can be reusable it first has to be usable.",
    "Make it work, make it right, make it fast.",
    "Cooking is like programming: you follow a recipe until you know what you're doing.",
    "Both cooking and coding require patience, precision, and creativity.",
    "Debugging and tasting are both iterative processes of refinement.",
    "The best chefs and the best programmers know when to follow the rules and when to break them.",
    "Refactoring code is like reducing a sauce - you're concentrating flavor and removing excess.",
    "Cooking without tasting is like programming without testing.",
    "Clean code is like a clean kitchen - it makes everything else easier.",
    "Both cooking and coding start with raw ingredients and end with something valuable.",
    "Good documentation is like a good recipe - it helps others reproduce your success.",
    "Cooking and coding both benefit from peer review.",
    "Scalable recipes and scalable code share many design principles.",
    "Both chefs and developers know the importance of proper tools.",
    "Comments in code are like notes in a recipe margin.",
    "Cooking and coding both require understanding the underlying principles, not just following instructions.",
    "Good error handling is like knowing how to fix a broken sauce.",
    "The best dishes and the best programs are elegant in their simplicity.",
    "Memory management in programming is like inventory management in a kitchen.",
    "Technical debt is like a messy kitchen - eventually you have to clean it up.",
    "Both cooking and coding reward experimentation within constraints.",
    "In both cooking and coding, sometimes you have to break things to make them better.",
    "A good programmer writes code that humans can understand, just like a good chef makes dishes anyone can enjoy.",
    "The hardest bugs to find are those where your mental model of the code doesn't match the actual code.",
    "In cooking and programming, the right balance of ingredients is everything.",
    "A watched pot never boils, and a watched progress bar never completes.",
    "The best cooking and coding happen when you understand the 'why' behind every step.",
    "Writing code is like creating a recipe - both need structure, clarity, and creativity.",
    "Cooking and coding both require understanding how individual components affect the entire system.",
    "Just as spices can transform a dish, the right algorithm can transform software.",
    "Reusable code is like a versatile sauce - it serves many purposes.",
    "There are multiple ways to peel an orange, just as there are multiple ways to solve a problem.",
    "Debugging is twice as hard as writing the code in the first place - just like fixing an overseasoned dish.",
    "Optimization without measurement is like adjusting a recipe without tasting.",
    "If builders built buildings the way programmers wrote programs, the first woodpecker would destroy civilization.",
    "Like a soufflé, good code requires attention to detail and proper timing.",
    "The most important ingredient in both cooking and coding is patience.",
    "Programmers and chefs are both artists working in different mediums.",
    "The best part of cooking and coding is the constant learning process.",
    "Code should be written as if the person maintaining it is a violent psychopath who knows where you live.",
    "Cooking and coding both fail when you don't pay attention to the details.",
    "Both chefs and programmers know that simplicity often yields the best results.",
    "You can't make an omelette without breaking eggs; you can't develop software without breaking builds.",
    "In cooking and coding, the difference between good and great is often a willingness to start over.",
    "Always code and cook as if the person who will maintain your work is a violent psychopath who knows where you live.",
    "A finger pointing at the moon is not the moon; a specification pointing at a system is not the system.",
    "Just as you taste food while cooking, you should test code while programming.",
    "Dubstep is like recursive code - layers upon layers of complexity creating something beautiful.",
    "Life is like inheritance - we build on what came before us.",
    "The best dubstep drops are like elegant algorithms - unexpected yet perfectly logical.",
    "Cooking with leftovers is like refactoring code - making something new from what already exists.",
    "Bass drops in dubstep are like breakthrough moments in coding - they change everything.",
    "Life, like good code, finds elegant solutions to complex problems.",
    "The best chefs and the best DJs both know when to add something and when to take away.",
    "Dubstep teaches us what code already knows - the importance of rhythm and timing.",
    "Cooking on high heat is like coding under pressure - it takes skill to not get burned.",
    "In life as in code, sometimes the simplest solution is the most elegant.",
    "Dubstep producers and programmers both create something from nothing using technical tools.",
    "Great cooking and great coding both require knowing when to follow the rules and when to break them.",
    "The space between dubstep wobbles is like whitespace in code - essential for clarity.",
    "Life is a constant process of debugging and improvement.",
    "A good dubstep track and good code both have structure, flow, and unexpected moments of brilliance.",
    "Cooking without tasting is like pushing code without testing.",
    "In dubstep, life, and code - timing is everything.",
    "The best meals and the best code both come from iterative improvement.",
    "Dubstep production, like software development, is about layering complexity to create something cohesive.",
    "Cooking for others is like writing open source code - it's made to be shared.",
    "The best life lessons, like the best code comments, are concise and meaningful.",
    "A dubstep drop is like finally solving a difficult bug - pure satisfaction.",
    "Seasoning gradually is like incremental development - a little at a time until it's perfect.",
    "Code without comments is like a recipe without instructions - mysterious and frustrating.",
    "Dubstep reminds us that sometimes you need to break the pattern to create something amazing.",
    "Life is about finding your own algorithm for happiness.",
    "A well-designed system is like a perfect dish - all components work together harmoniously.",
    "Dubstep production and coding both teach patience and persistence through complexity.",
    "The best meals and the best code are those that seem simple but hide sophisticated techniques.",
    "In life as in dubstep, it's all about the build-up and the release.",
    "Clean code is like a clean kitchen - it makes the creation process joyful.",
    "Dubstep production teaches the same lesson as coding - master the technical to express the creative.",
    "Cooking and coding are both about transformation - turning raw ingredients into something valuable.",
    "The most interesting parts of life, like the most interesting parts of code, are often in the edge cases.",
    "Dubstep's evolution mirrors software development - constantly building on what came before.",
    "A recipe is just an algorithm for deliciousness.",
    "In dubstep, cooking, and coding - rules exist to be understood, then occasionally broken.",
    "Life is like an open-source project - contributions from many create something greater than the sum of its parts.",
    "Dubstep and coding both start with learning the rules before breaking them creatively.",
    "The best dishes and the best code evolve over time through careful refinement.",
];

$random_quote = $quotes[array_rand($quotes)];
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="pkg/assets/css/main.css">
        <title>C0D3-5T3W</title>
        <style>
            .quote-of-the-day {
                position: relative;
                width: 100%;
            }
            #quote-text {
                min-height: 80px;
                transition: opacity 0.3s ease;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 15px;
                background: var(--accent-purple);
                border-radius: 10px;
                margin-top: 10px;
                border: 1px solid var(--primary-color);
                color: var(--primary-color);
            }
            .typing-content {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            .typing-text {
                opacity: 0;
                transition: opacity 0.5s ease;
                margin: 8px 0;
            }
            .typing-text.visible {
                opacity: 1;
            }

            .visit-counter {
                font-size: 0.9em;
                margin-top: 5px;
                color: var(--primary-color);
                opacity: 0.8;
            }
            .greeting {
                font-weight: bold;
                margin-bottom: 10px;
            }
            #new-quote-btn {
                margin-top: 15px;
                padding: 10px 20px;
                background-color: var(--accent-orange);
                color: var(--primary-color);
                border: 1px solid var(--primary-color);
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            #new-quote-btn:hover {
                background-color: #ff0000;
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
        </style>
    </head>
    <body>
        <div class="content">
            <img src="pkg/assets/images/THELOGO.jpg" alt="5T3W Logo" class="logo">
            <h1 class="pride-font">
                C0D3-5T3W
            </h1>
            <h2 class="pride-font-animated">
                W3LC0M3!
            </h2>
            <h3>
            <div class="date-time">
                <div class="greeting"><?php echo $greeting; ?>, visitor!</div>
                <div>Today is <?php echo $current_date; ?></div>
                <div>Current time: <?php echo $current_time; ?></div>
            </div>
            </h3>
            <h3 class="about-container">
                <div id="typing-title"></div>
                <div id="typing-content" class="typing-content">
                    <p class="typing-text">
                        -----------------------------
                    </p>                    

                    <p class="typing-text">
                        I like cooking, making Trench tunes, and messing around with code.
                    </p>
                    <p class="typing-text">
                        -----------------------------
                    </p>
                    <p class="typing-text">
                        I am currently learning Golang, Rust, Zig, C++, lua, and Typescript.
                    </p>
                    <p class="typing-text">
                        -----------------------------
                    </p>
                    <p class="typing-text">
                        I grew up using a lot of Bash, Python, C, php, html, and css because of Raspberry Pi's and MySpace.
                    </p>
                    <p class="typing-text">
                        -----------------------------
                    </p>
                    <p class="typing-text">
                        My favorite food is Thai, and Hispanic.
                    </p>
                    <p class="typing-text">
                        -----------------------------
                    </p>
                    <p class="typing-text">
                        My favorite musician is INFEKT
                    </p>
                    <p class="typing-text">
                        -----------------------------
                    </p>
                    <p class="typing-text">
                        I love my Fiance and my 2 perfect kitties Patience and Ziggy.
                    </p>
                    <p class="typing-text">
                        -----------------------------
                    </p>
                    <p class="typing-text">
                        And I love skating and taking Ziggy for walks with my partner.😸
                    </p>
                </div>
            </h3>
            <h1 class="pride-font">
                My music:
            </h1>
            <div id="soundcloud-widget" class="widget-container">
                <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1947466211&color=%23040404&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/brandon-stewart-792686080" title="5T3W 🥦" target="_blank" style="color: #cccccc; text-decoration: none;">5T3W 🥦</a> · <a href="https://soundcloud.com/brandon-stewart-792686080/fa1l1ng" title="FA1L1NG" target="_blank" style="color: #cccccc; text-decoration: none;">FA1L1NG</a></div>
            </div>
            <div id="spotify-widget" class="widget-container">
                <iframe style="border-radius:12px" src="https://open.spotify.com/embed/artist/1Cg54cIvfa7dz1GuYHvgAd?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>                
            </div>
            <div class="quote-of-the-day">
                <h1 class="pride-font">Random quote:</h1>
                <div id="quote-text">
                    <h2><p id="quote-content"><?php echo $random_quote; ?></p></h2>
                </div>
                <button id="new-quote-btn" class="pulse-button">Generate New Quote</button>
            </div>
        </div>
        <script src="pkg/assets/js/main.js"></script>
        <script src="pkg/assets/js/dropdown.js"></script>
        <script>
            const allQuotes = <?php echo json_encode($quotes); ?>;
            
            function getRandomQuote() {
                const randomIndex = Math.floor(Math.random() * allQuotes.length);
                return allQuotes[randomIndex];
            }
            
            function updateQuote() {
                const quoteElement = document.getElementById('quote-content');
                const quoteContainer = document.getElementById('quote-text');
                
                quoteContainer.style.opacity = '0.3';
                
                setTimeout(function() {
                    quoteElement.textContent = getRandomQuote();
                    quoteContainer.style.opacity = '1';
                }, 300);
            }
            
            document.getElementById('new-quote-btn').addEventListener('click', updateQuote);
        </script>
    </body>
</html>
<!-- <3 -->
