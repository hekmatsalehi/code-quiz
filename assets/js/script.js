// Build a code quiz
// Need start button
//      1. start the timer
//      2. present the question
// After a question is answered another question apears
// If the the question is answered wrong. 
//      1. subtract the time
// When all the questions are answered or timer reaches 0
//      1. game is over
// Allow the user to write his/her initial
// Show the score

var startQuizEl = document.querySelector("#start-quiz");
var timerEl = document.querySelector("#timer");
var questionsEL = document.querySelector(".questions");
var choicesEl = document.querySelector(".answerButtons");


var questionIndex = 0;
var timeLeft = 12;


startQuizEl.addEventListener("click", function(){
    
    questions();
    timer();
});

// Set time timer
function timer() {
    
        
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft
            
        if (timeLeft === 0) {
            clearInterval(timeInterval);
        }
    }, 1000);
}


function questions() {
    questionsEL.style.visibility = "visible"
    var currentQuestion = questionsArray[questionIndex]
    var titleEl = document.querySelector("#questionTitle");
    titleEl.textContent = currentQuestion.showQuestion;

    choicesEl.innerHTML = "";

    currentQuestion.answers.forEach(function(answer, i){
        var answerBtn = document.createElement("button");
        answerBtn.setAttribute("class", "choice");
        answerBtn.setAttribute("value", answer);

        answerBtn.textContent = i+1 + ". " + answer;
        
        answerBtn.onclick = btnClick;
        choicesEl.appendChild(answerBtn);
    })
        

}

function btnClick() {
    if (this.value !== questionsArray[questionIndex].correctAnswer) {
        timeLeft -= 3;
    }

    questionIndex++;

    if (questionIndex === questionsArray.length) {
        
    }else {
        questions();
    }
}


var questionsArray = [
{
    showQuestion: "HTML stands for?",
    answers: ["Hypertext Markup Language", "Hyper Markdown Language", "Hide Markup Language", "None of the above"],
    correctAnswer: "Hypertext Markup Language"        
},
{
    showQuestion: "CSS stands for?",
    answers: ["Style Sheet Cascading", "Cascading Style Sheets", "Cascading Small Sheets", "None of the above"],
    correctAnswer: "Cascading Style Sheets"    
},
{
    showQuestion: "DOM stands for?",
    answers: ["Dissolved Organic Matter", "Cascading Style Sheets", "Document Object Model", "Division of Minerals"],
    correctAnswer: "Document Object Model" 
}
]






