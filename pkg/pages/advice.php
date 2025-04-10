<?php
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");

$coding_advice = [
    "Write clean and readable code.",
    "Comment your code to explain complex logic.",
    "Use version control systems like Git.",
    "Keep learning new programming languages and frameworks.",
    "Debug your code using tools and breakpoints.",
    "Write unit tests to ensure code reliability.",
    "Follow coding standards and best practices.",
    "Use meaningful variable and function names.",
    "Refactor code regularly to improve its structure.",
    "Participate in code reviews to learn and share knowledge.",
    "Break down complex problems into smaller, manageable tasks.",
    "Optimize your code only when necessary.",
    "Document your code and APIs thoroughly.",
    "Use design patterns to solve common problems.",
    "Handle errors and exceptions gracefully.",
    "Stay updated with security best practices.",
    "Learn to use keyboard shortcuts in your IDE.",
    "Practice pair programming to improve collaboration.",
    "Understand Big O notation for algorithm efficiency.",
    "Backup your work regularly to prevent data loss."
];
$cooking_advice = [
    "Always taste your food as you cook.",
    "Use fresh ingredients for better flavor.",
    "Keep your knives sharp for safety and efficiency.",
    "Clean as you go to keep your workspace tidy.",
    "Experiment with spices and herbs to enhance flavors.",
    "Read the entire recipe before starting.",
    "Preheat your oven for consistent results.",
    "Use a meat thermometer to ensure proper cooking.",
    "Let meat rest before slicing to retain juices.",
    "Organize your ingredients before cooking.",
    "Invest in quality cookware for better results.",
    "Learn basic knife skills to improve efficiency.",
    "Season at every step of the cooking process.",
    "Don't overcrowd the pan when sautéing.",
    "Use the right cutting board for different foods.",
    "Save vegetable scraps for homemade stock.",
    "Balance flavors: sweet, salty, sour, bitter, and umami.",
    "Understand different cooking methods: roasting, braising, sautéing.",
    "Don't be afraid to adjust recipes to your taste.",
    "Learn to properly store different ingredients."
];
$dubstep_advice = [
    "Experiment with different software and plugins.",
    "Layer your sounds to create a rich texture.",
    "Use automation to add dynamics to your tracks.",
    "Listen to a wide range of dubstep artists for inspiration.",
    "Practice sound design to create unique sounds.",
    "Focus on creating powerful basslines.",
    "Use sidechain compression for that pumping effect.",
    "Experiment with different tempos and rhythms.",
    "Add variations to keep your tracks interesting.",
    "Collaborate with other artists to learn new techniques.",
    "Master EQ techniques to shape your sounds.",
    "Use reference tracks to benchmark your mixes.",
    "Learn how to properly mix and master your tracks.",
    "Pay attention to stereo imaging and space in your mix.",
    "Experiment with modulation effects for moving textures.",
    "Develop your own unique sound signature.",
    "Create contrast between different sections of your track.",
    "Use foley sounds for unique percussion elements.",
    "Don't overcompress your mix - maintain dynamics.",
    "Understand music theory to create more compelling melodies."
];
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../assets/css/main.css">
        <link rel="stylesheet" href="../assets/css/alt.css">
        <link rel="stylesheet" href="../assets/css/fonts.css">
        <title>Advice</title>
    </head>
    <body>
        <div class="content page-content">
            <div class="advice-section">
                <h1 class="animated-heading pride-font">Coding Advice</h1>
                <ul id="coding-advice" class="styled-list"></ul>

                <div class="section-divider">
                    <span>🫶🏻</span>
                </div>

                <h1 class="animated-heading pride-font">Cooking Advice</h1>
                <ul id="cooking-advice" class="styled-list"></ul>

                <div class="section-divider">
                    <span>👍🏼</span>
                </div>

                <h1 class="animated-heading pride-font">Dubstep Music Advice</h1>
                <ul id="dubstep-advice" class="styled-list"></ul>
            </div>
            <script src="../assets/js/altdropdown.js"></script>
        </div>
        <script>
            const codingAdvice = <?php echo json_encode($coding_advice); ?>;
            const cookingAdvice = <?php echo json_encode($cooking_advice); ?>;
            const dubstepAdvice = <?php echo json_encode($dubstep_advice); ?>;

            function populateAdvice(adviceArray, elementId) {
                const ul = document.getElementById(elementId);
                adviceArray.forEach(advice => {
                    const li = document.createElement('li');
                    li.textContent = advice;
                    ul.appendChild(li);
                });
            }

            populateAdvice(codingAdvice, 'coding-advice');
            populateAdvice(cookingAdvice, 'cooking-advice');
            populateAdvice(dubstepAdvice, 'dubstep-advice');
        </script>
        <script src="../assets/js/alt.js"></script>
    </body>
</html>