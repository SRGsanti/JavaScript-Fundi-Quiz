// quiz questions
const quizQuestions = [
  {
    question: " String value must be enclosed in ______ when being assigned to variables?",
    choices: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
    answer: "Curly Brackets"
  },
  {
    question: " A very useful tool for development and debugging for printing continue for the debugger ",
    choices: ["Javascript", "Terminal/Bash", "For loops", "console.log"],
    answer: "For loops"
  },
  {
    question: " Commonly use Data Type Do Not Include ______",
    choices: ["String", "Boolean", "Alerts", "Numbers"],
    answer: "Booleans"
  },
  {
    question: " The Condition with a if/else Statement is enclosed with _____?",
    choices: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
    answer: "Parenthesis"
  },
  {
    question: " Arrays in JavaScript can be to store _______",
    choices: ["Numbers & Strings", "Other Arrays", "Boolean","All Of The Above"],
    answer: "All Of The Above"
  },
  // Add more questions here ...
];

// quiz variables
let currentQuestionIndex = 0;
let timeRemaining = 60; // in seconds
let score = 0;
let timerInterval;
let timeBonus = 5; // Time bonus for each correct answer in seconds

// DOM elements
const startButton = document.getElementById("start-button");
const quizScreen = document.getElementById("quiz-screen");
const questionText = document.getElementById("question-text");
const answerForm = document.getElementById("answer-form");
const message = document.getElementById("message");
const timerElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const gameOverScreen = document.getElementById("game-over-screen");
const initialsInput = document.getElementById("initials-input");
const saveButton = document.getElementById("save-button");
const choicesContainer = document.getElementById("choices-container");
const scoreDisplay = document.getElementById("score-display");
const finalScoreDisplay = document.getElementById("final-score");

// Start the quiz when the start button is clicked
startButton.addEventListener("click", startQuiz);

// Function to start the quiz
function startQuiz() {
  startButton.style.display = "none";
  quizScreen.style.display = "block";
  score = 0;
  currentQuestionIndex = 0;
  displayQuestion();
  startTimer();
  answerForm.addEventListener("submit", submitAnswer); // Set the event listener here
}

// Function to display a question
function displayQuestion() {
  // Randomize the order of questions
  shuffleArray(quizQuestions);

  if (currentQuestionIndex < quizQuestions.length) {
    const question = quizQuestions[currentQuestionIndex];
    questionText.textContent = question.question;
    message.textContent = "";

    choicesContainer.innerHTML = ""; // Clear the previous choices
    for (let i = 0; i < question.choices.length; i++) {
      const choice = question.choices[i];

      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "choice";
      radio.value = choice;

      label.appendChild(radio);
      label.appendChild(document.createTextNode(choice));
      choicesContainer.appendChild(label);
    }
  } else {
    endQuiz();
  }
}

// Function to start the timer
function startTimer() {
  timeRemaining = 30;
  timerInterval = setInterval(updateTimer, 1000);
  timerElement.textContent = timeRemaining;
}

// Function to update the timer
function updateTimer() {
  timeRemaining--;
  timerElement.textContent = timeRemaining;

  if (timeRemaining <= 0) {
    clearInterval(timerInterval);
    endQuiz();
  }
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  quizScreen.style.display = "none";
  gameOverScreen.style.display = "block";
  finalScoreDisplay.textContent = score;
}

// Function to submit an answer
function submitAnswer(event) {
  event.preventDefault();
  const question = quizQuestions[currentQuestionIndex];
  const userAnswer = document.querySelector("input[name='choice']:checked");

  if (userAnswer) {
    if (userAnswer.value === question.answer) {
      score++;
      // Show a time bonus for correct answers
      timeRemaining += timeBonus;
      scoreDisplay.textContent = score;
      message.textContent = "Correct!";
      message.style.color = "#4CAF50"; // Green color for correct answers
    } else {
      timeRemaining -= 10; // Subtract 10 seconds for an incorrect answer
      message.textContent = "Incorrect!";
      message.style.color = "#f44336"; // Red color for incorrect answers
    }

    currentQuestionIndex++;
    setTimeout(displayQuestion, 1000); // Show the feedback message for 1 second and then move to the next question
  } else {
    message.textContent = "Please select an answer.";
    message.style.color = "#f44336"; // Red color for the message
  }
}

// Save the score when the save button is clicked
saveButton.addEventListener("click", saveScore);

// Function to save the score
function saveScore() {
  const initials = initialsInput.value.trim();
  if (initials === "") {
    alert("Please enter your initials.");
    return;
  }

  // Save the score and initials to local storage
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push({ initials, score });
  localStorage.setItem("highScores", JSON.stringify(highScores));

  // Clear the initials input and show a success message
  initialsInput.value = "";
  alert("Score saved successfully!");
}

// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
