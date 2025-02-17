document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startGame");
    const gameContainer = document.getElementById("gameContainer");
    const questionText = document.getElementById("question");
    const answerInput = document.getElementById("answer");
    const submitButton = document.getElementById("submit");
    const resultText = document.getElementById("result");
    const scoreText = document.getElementById("score");
    const modeSelect = document.getElementById("modeSelect");
    const difficultySelect = document.getElementById("difficultySelect");
    const numQuestionsInput = document.getElementById("numQuestions");
    const timesTableInput = document.getElementById("timesTable");

    let currentAnswer;
    let score = 0;
    let questionCount = 0;
    let totalQuestions = 5;
    let startTime;
    let times = [];
    let gameMode;
    let difficulty;
    let timesTable;

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getNumbers() {
        if (gameMode === "addition" || gameMode === "subtraction") {
            if (difficulty === "1") return [getRandomNumber(10, 99), getRandomNumber(1, 9)];
            if (difficulty === "2") return [getRandomNumber(10, 99), getRandomNumber(10, 99)];
            if (difficulty === "3") return [getRandomNumber(10, 99), getRandomNumber(100, 999)];
            if (difficulty === "4") return [getRandomNumber(100, 999), getRandomNumber(100, 999)];
        } else {
            if (difficulty === "1") return [parseInt(timesTable), getRandomNumber(2, 19)];
            if (difficulty === "2") return [getRandomNumber(10, 99), getRandomNumber(2, 9)];
            if (difficulty === "3") return [getRandomNumber(10, 99), getRandomNumber(10, 99)];
            if (difficulty === "4") return [getRandomNumber(100, 999), getRandomNumber(2, 9)];
        }
    }

    function generateQuestion() {
        let [num1, num2] = getNumbers();
        if (gameMode === "addition") {
            currentAnswer = num1 + num2;
            questionText.textContent = `${num1} + ${num2} = ?`;
        } else if (gameMode === "subtraction") {
            currentAnswer = num1 - num2;
            questionText.textContent = `${num1} - ${num2} = ?`;
        } else if (gameMode === "multiplication") {
            currentAnswer = num1 * num2;
            questionText.textContent = `${num1} × ${num2} = ?`;
        } else if (gameMode === "division") {
            let factor = num2;
            num1 = num2 * getRandomNumber(1, 12);
            currentAnswer = num1 / num2;
            questionText.textContent = `${num1} ÷ ${num2} = ?`;
        }
        answerInput.value = "";
        answerInput.focus();
        startTime = Date.now();
    }

    submitButton.addEventListener("click", function() {
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
    });

    function displayResults() {
        const avgTime = (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2);
        scoreText.textContent = `Game Over! You got ${score} out of ${totalQuestions} correct.\nAverage time per question: ${avgTime} seconds`;
        gameContainer.style.display = "none";
    }

    startButton.addEventListener("click", function() {
        gameMode = modeSelect.value;
        difficulty = difficultySelect.value;
        totalQuestions = parseInt(numQuestionsInput.value);
        timesTable = timesTableInput.value;
        startButton.style.display = "none";
        gameContainer.style.display = "block";
        score = 0;
        questionCount = 0;
        times = [];
        generateQuestion();
    });
});
