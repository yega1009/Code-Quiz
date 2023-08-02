// Initialize Variables
var time = 60;
var score = 0; 
var currentQuestion = 0;

// Array of question objects, where each one has a question, choices and answer
var questions = [
    {
        question: "The condition in an if/else statement is enclosed with _____.",
        choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        answer: "3. parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        answer: "3. quotes"
    },
    {
        question: "Commonly used data types DO NOT include",
        choices: ["1. strings", "2. booleans", "3. alert", "4. numbers"],
        answer: "3. alert"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1. Javascript", "2. Terminal", "3. For loops", "4. Console.log"],
        answer: "4. Console.log"
    }
];

// Get HTMl elements
var viewHighScores = document.getElementById('view-highscores');
var start = document.getElementById('start');
var quizContainerEl = document.getElementById('quiz-container');
var timerEl = document.getElementById('timer');
var resultEl = document.getElementById('result');
var scoreFormEl = document.getElementById('score-form');
var initialInputEl = document.getElementById('initials');
var highScoresEl = document.getElementById('highscores');

// Get highscores from local storage of initialize an empty array if none in local storage
var highscores = JSON.parse(localStorage.getItem('highscores')) || [];

// Add event listener for "view highscores" button to show high scores and nothing else
viewHighScores.addEventListener('click', function () {
    start.style.display = 'none';
    quizContainerEl.style.display = 'none';
    timerEl.style.display = 'none';
    resultEl.style.display = 'none';
    scoreFormEl.style.display = 'none';
    highScoresEl.style.display = 'block';
});

function resetGame() {
    time = 60;
    score = 0;
    currentQuestion = 0;
}

function showQuestion() {
    quizContainerEl.innerHTML = '';
    resultEl.style.display = 'none';
    if (currentQuestion >= questions.length) {
        endGame();
        return;
    }
    var questionEl = document.createElement('h2');
    questionEl.innerText = questions[currentQuestion].question;
    quizContainerEl.appendChild(questionEl);
    for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
        var choice = questions[currentQuestion].choices[i];
        var button = document.createElement('button');
        button.innerText = choice;
        (function (choice) {
            button.addEventListener('click', function () {
                if (choice === questions[currentQuestion].answer) {
                    currentQuestion++;
                    resultEl.style.display = 'block';
                    resultEl.innerText = 'CORRECT!';
                    if (currentQuestion < questions.length) {
                        showQuestion();
                    } else {
                        endGame();
                    }
                } else {
                    time -= 10;
                    resultEl.style.display = 'block';
                    resultEl.innerText = 'WRONG!';
                }
            });
        })(choice);
        quizContainerEl.appendChild(button);
    }
}

function endGame() {
    time = 0;
    timerEl.style.display = 'none';
    quizContainerEl.style.display = 'none';
    scoreFormEl.style.display = 'block';
    resultEl.style.display = 'none';
}

start.addEventListener('click', function () {
    resetGame();
    var timer = setInterval(function () {
        time--;
        timerEl.innerText = 'Time: ' + time;
        if (time <= 0 || currentQuestion >= questions.length) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
    quizContainerEl.style.display = 'block';
    timerEl.style.display = 'block';
    showQuestion();
})


