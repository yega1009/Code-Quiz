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
var scoreMessageEl = document.getElementById('score-message');
var initialInputEl = document.getElementById('initials');
var highScoresEl = document.getElementById('highscores');
var goBackEl = document.getElementById('go-back');
var clearHighScores = document.getElementById('clear-highscores')

// Get highscores from local storage of initialize an empty array if none in local storage
var highscores = JSON.parse(localStorage.getItem('highscores')) || [];

// Function to reset parameters
function resetGame() {
    time = 60;
    score = 0;
    currentQuestion = 0;
    scoreFormEl.style.display = 'none';
}

// Function to display multiple choice questions
function showQuestion() {
    quizContainerEl.innerHTML = '';
    // Check if current question is beyond length of array and if so, end game
    if (currentQuestion >= questions.length) {
        endGame();
        return;
    }
    // Create question element and add them to quiz container
    var questionEl = document.createElement('h2');
    questionEl.innerText = questions[currentQuestion].question;
    quizContainerEl.appendChild(questionEl);
    // Loop through multiple choice options of current questions 
    for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
        var choice = questions[currentQuestion].choices[i];
        var button = document.createElement('button');
        button.innerText = choice;
        // When button is clicked, checks if it is the correct answer 
        button.addEventListener('click', function (event) {
            // If choice is correct, displays result
            // Else, displays result and subtracts time
            if (event.target.textContent === questions[currentQuestion].answer) {
                currentQuestion++;
                resultEl.style.display = 'block';
                resultEl.innerText = 'CORRECT!';
                // If there are questions left, show the next question
                // Else, end game
                showQuestion();
            } else {
                time -= 10;
                resultEl.style.display = 'block';
                resultEl.innerText = 'WRONG!';
            }
        });
        // Add choice button to quiz container
        quizContainerEl.appendChild(button);
    }
}

// Function to end game that shows score form
function endGame() {
    score = time;
    timerEl.style.display = 'none';
    quizContainerEl.style.display = 'none';
    scoreFormEl.style.display = 'block';
    resultEl.style.display = 'none';
    scoreFormEl.style.display = 'block';
}

// Add event listener for "view highscores" button to show high scores and nothing else
viewHighScores.addEventListener('click', function () {
    start.style.display = 'none';
    quizContainerEl.style.display = 'none';
    timerEl.style.display = 'none';
    resultEl.style.display = 'none';
    scoreFormEl.style.display = 'none';
    highScoresEl.style.display = 'block';
    highScoresEl.appendChild(goBackEl);
    highScoresEl.appendChild(clearHighScores);
});

// Add event listener to start button
start.addEventListener('click', function () {
    highScoresEl.style.display = 'none';
    start.style.display = 'none';
    resetGame();
    // Start timer
    var timer = setInterval(function () {
        time--;
        timerEl.innerText = 'Time left: ' + time + 's';
        // End game if time runs out
        if (time <= 0 || currentQuestion >= questions.length) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
    // Show the quiz container and timer
    quizContainerEl.style.display = 'block';
    timerEl.style.display = 'block';
    // Display first question
    showQuestion();
})

// Add event listener to the form submission
scoreFormEl.addEventListener('submit', function (event) {
    // Prevent the form from submitting and causing a page refresh
    event.preventDefault();
    // Get the user's initials from the input field
    var initials = initialInputEl.value;
    // If no initials entered, log an error message
    if (initials === '') {
        console.error('No initials entered.');
        return;
    }
    // Add user's score and initials to highscores array
    highscores.push({ initials: initials, score: score });
    // Save the highscores array to local storage
    localStorage.setItem('highscores', JSON.stringify(highscores));
    // Display highscores array
    highScoresEl.style.display = 'block';
    // Clear previous highscores from view
    highScoresEl.innerHTML = '';
    // Loop through highscores array and add every highscores again to the page
    for (var i = 0; i < highscores.length; i++) {
        var highscore = highscores[i];
        // Append paragraph with initials and score to existing HTML content in highScoresEL element
        highScoresEl.innerHTML += '<p>' + highscore.initials + ': ' + highscore.score + '</p>';
    }
    // Adding the go-back and clear-highscores buttons to highScoresEl
    highScoresEl.appendChild(goBackEl);
    highScoresEl.appendChild(clearHighScores);

    // Hide form and display buttons
    scoreFormEl.style.display = 'none';
});

// Add event listener to the go-back button
goBackEl.addEventListener('click', function () {
    document.getElementById('highscores').style.display = 'none';
    document.getElementById('start').style.display = 'block';
});

// Add event listener to the clear-highscores button
clearHighScores.addEventListener('click', function () {
    localStorage.removeItem('highscores');
    highscores = [];
    document.getElementById('highscores').innerHTML = '';

});


