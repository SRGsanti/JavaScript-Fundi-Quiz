// Define your quiz questions
const quizQuestions = [
  {
    question: "Question 1: What is 2 + 2?",
    choices: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "Question 2: What is the capital of France?",
    choices: ["Berlin", "Madrid", "Rome", "Paris"],
    answer: "Paris"
  },
  // Add more questions...
  ];
  
  // Define quiz variables
  let currentQuestionIndex = 0;
  let timeRemaining = 60; // in seconds
  let score = 0;
  let timerInterval;
  
  // DOM elements
  const startButton = document.getElementById("start-button");
  const quizScreen = document.getElementById("quiz-screen");
  const questionText = document.getElementById("question-text");
  const answerInput = document.getElementById("answer-input");
  const submitButton = document.getElementById("submit-button");
  const message = document.getElementById("message");
  const timerElement = document.getElementById("time");
  const gameOverScreen = document.getElementById("game-over-screen");
  const scoreElement = document.getElementById("score");
  const initialsInput = document.getElementById("initials-input");
  const saveButton = document.getElementById("save-button");
  
  // Start the quiz when the start button is clicked
  startButton.addEventListener("click", startQuiz);
  
  // Submit the answer when the submit button is clicked
  submitButton.addEventListener("click", submitAnswer);
  
  // Save the score when the save button is clicked
  saveButton.addEventListener("click", saveScore);
  
  // Function to start the quiz
  function startQuiz() {
    startButton.style.display = "none";
    quizScreen.style.display = "block";
    displayQuestion();
    startTimer();
  }
  
  // Function to display a question
  function displayQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
      const question = quizQuestions[currentQuestionIndex];
      questionText.textContent = question.question;
      message.textContent = "";

      const choicesContainer = document.getElementById("choices-container");
      choicesContainer.innerHTML = "";
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
  
  // Function to submit an answer
  function submitAnswer() {
    const question = quizQuestions[currentQuestionIndex];
    const userAnswer = answerInput.value.trim();
  
    if (userAnswer === question.answer) {
      score++;
      message.textContent = "Correct!";
    } else {
      timeRemaining -= 10; // Subtract 10 seconds for an incorrect answer
      if (timeRemaining < 0) {
        timeRemaining = 0;
      }
      message.textContent = "Incorrect!";
    }
  
    currentQuestionIndex++;
    displayQuestion();
  }
  
  // Function to start the timer
  function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
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
    quizScreen.style.display = "none";
    gameOverScreen.style.display = "block";
    scoreElement.textContent = score;
  }
  
  // Function to save the score
  function saveScore() {
    const initials = initialsInput.value.trim();
    // Save the score and initials, e.g., send an API request, store in localStorage, etc.
    // Add your logic here to save the score and initials
  }
  