document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startGame");
    const gameContainer = document.getElementById("gameContainer");
    const questionText = document.getElementById("question");
    const answerInput = document.getElementById("answer");
    const submitButton = document.getElementById("submit");
    const resultText = document.getElementById("result");
    const scoreText = document.getElementById("score");

    let currentAnswer;
    let score = 0;
    let questionCount = 0;
    const totalQuestions = 5;
    let startTime;
    let times = [];

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateQuestion() {
        const num1 = getRandomNumber(10, 99);
        const num2 = getRandomNumber(1, 9);
        currentAnswer = num1 + num2;
        questionText.textContent = `${num1} + ${num2} = ?`;
        answerInput.value = "";
        answerInput.focus();
        startTime = Date.now();
    }

    submitButton.addEventListener("click", function() {
        checkAnswer();
    });

    // Listen for Enter key press in the input field
    answerInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent default form submission
            submitButton.click(); // Trigger the submit button click event
        }
    });

    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value);
        const endTime = Date.now();
        const timeTaken = (endTime - startTime) / 1000;
        times.push(timeTaken);

        if (userAnswer === currentAnswer) {
            score++;
            resultText.textContent = "Correct!";
        } else {
            resultText.textContent = `Wrong! The correct answer was ${currentAnswer}`;
        }

        questionCount++;
        if (questionCount < totalQuestions) {
            setTimeout(generateQuestion, 1000);
        } else {
            displayResults();
        }
    }

    function displayResults() {
        const avgTime = (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2);
        scoreText.textContent = `Game Over! You got ${score} out of ${totalQuestions} correct.\\nAverage time per question: ${avgTime} seconds`;
        gameContainer.style.display = "none";
    }

    startButton.addEventListener("click", function() {
        startButton.style.display = "none";
        gameContainer.style.display = "block";
        score = 0;
        questionCount = 0;
        times = [];
        generateQuestion();
    });
});
