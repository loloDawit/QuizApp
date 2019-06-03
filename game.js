// get ref to the questions
const question = document.getElementById("question");
const getChoices = document.getElementsByClassName("choice-text"); // returns HTML collection -- needs to be converted to an array
const choices = Array.from(getChoices);
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = [];
let availableQuestions = [];
let availCh = [];

let questions = [
  {
    question: "Which car is made in USA?",
    choice1: "Toyota",
    choice2: "Honda",
    choice3: "Nissan",
    choice4: "Jeep",
    answer: 4
  },
  {
    question: "Which car is made in China?",
    choice1: "Ford",
    choice2: "Chevi",
    choice3: "Tesela",
    choice4: "Xi",
    answer: 2
  },
  {
    question: "Which car is made in Germany?",
    choice1: "Mercedez",
    choice2: "BMW",
    choice3: "Ferari",
    choice4: "Jeep",
    answer: 1
  }
];

const CORRECT_BONUS = 10;
const MAX_QUESTION = 3;

statGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  availablech = [questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTION) {
    // go to the end of page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTION}`;
  // randomly select questions
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  //console.log(currentQuestion);
  question.innerText = currentQuestion.question;
  // get choices
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });
  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    selectedChoice.parentElement.classList.add(classToApply);
    if(selectedAnswer == currentQuestion.answer){
        incrementScore(CORRECT_BONUS);
    }
    scoreText.innerText = score;
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});
incrementScore = num =>{
    score +=num; 
    scoreText.innerText = score; 
}
statGame();
