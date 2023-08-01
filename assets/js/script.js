var time = 60;
var score = 0;
var currentQuestion = 0;

var questions = [
    {
        question: "Commonly used data types DO NOT include",
        choices: ["strings, booleans, alert, numbers"],
        answer: ["alert"]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript, Terminal, For loops, Console.log"],
        answer: ["Console.log"]
    }
];

var timerEl = document.getElementById('timer');
var quizContainerEl = document.getElementById('quiz-container');
var highScoresEl = document.getElementById('highscores');
var scoreFormEl = document.getElementById('score-form');
var initialInputEl = document.getElementById('initials');

var highscores = JSON.parse(localStorage.getItem('highscores'));

