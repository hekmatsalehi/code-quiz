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
// Show the score and save it
var startQuizBoxEl = document.querySelector(".startQuizBox")
var startQuizEl = document.querySelector("#start-quiz");
var timerEl = document.querySelector("#timer");
var questionsEL = document.querySelector(".questions");
var choicesEl = document.querySelector(".answerButtons");
var alertUser = document.querySelector("#alertUser");
var resultEl = document.querySelector(".result");
var correctAnsEl = document.querySelector(".correctAns")
var viewHighscoreEl = document.querySelector(".viewHighscore");
var userInitialEl = document.querySelector("#userInitial");
var submitBtnEl = document.querySelector("#submitBtn")
var savedHighScoreEl = document.querySelector(".savedHighScore")
var highscoreDetailEl = document.querySelector("#highscoreDetail")
var clearHighscoresEl = document.querySelector("#clearHighscores")
var goBackEl = document.querySelector("#goBack")


var questionIndex = 0;
var timeLeft = 60;
var correctAnsCount = 0;
var userInitial = "";
var timeInterval;

startQuizEl.addEventListener("click", function(){
    startQuizBoxEl.style.display = "none"
    viewHighscoreEl.style.display = "none"
    
    questions();
    timer();

});

// Set the timer
function timer() {

        var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft
            
        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            alertUser.textContent = "Quiz Ended"
            timerEl.textContent = "Timer is stopped"
            questionsEL.style.display = "none"
            resultEl.style.display = "block"
            
        }
    }, 1000);
}


function questions() {
    questionsEL.style.display = "block"
    var currentQuestion = questionsArray[questionIndex]
    var titleEl = document.querySelector("#questionTitle");
    titleEl.textContent = currentQuestion.showQuestion;

    choicesEl.innerHTML = "";

    currentQuestion.answers.forEach(function(answer, index){
        var answerBtn = document.createElement("button");
        answerBtn.setAttribute("class", "choice");
        answerBtn.setAttribute("value", answer);
        answerBtn.textContent = index+1 + ". " + answer;
        choicesEl.appendChild(answerBtn);
        //answerBtn.onclick = btnClick;
        //second way
        answerBtn.addEventListener("click", btnClick);    
    })        
}

function btnClick() {
    if (this.value !== questionsArray[questionIndex].correctAnswer) {
        timeLeft -= 10;
        alertUser.textContent = "Wrong!"
    }
    else {
        alertUser.textContent = "Correct!"
            countCorrectAns()        
    }
    questionIndex++;
    
    if (questionIndex === questionsArray.length) {
        timeLeft = 0;
        alertUser.textContent = "Quiz Ended"
        questionsEL.style.display = "none"
        resultEl.style.display = "block"
        
    }else {
        questions(); 
    }   
}

function countCorrectAns() {
    
    correctAnsCount++
    correctAnsEl.textContent = "You answered " + correctAnsCount + " out of " + questionsArray.length + " correctly!";
        
}

function highscore(e) {
    e.preventDefault()

    var storeHighscore = localStorage.getItem("highscore")
    var scoreCountArray;
    
    if (storeHighscore === null) {
        scoreCountArray = []
    }
    else {
        scoreCountArray = JSON.parse(storeHighscore)
    } 

    // Removes the extra text from correct answers count
    correctAnsEl.textContent = correctAnsCount
    
    var saveHighscore = {
        initial: userInitialEl.value.toUpperCase(),
        saveCorrectAns: correctAnsEl.textContent
    }

    scoreCountArray.push(saveHighscore);

    var scoreCountString = JSON.stringify(scoreCountArray);
    localStorage.setItem("highscore", scoreCountString);

    viewHighscore()
}

var i = 0;
function viewHighscore() {
    var storedHighscore = localStorage.getItem("highscore");

    if (storedHighscore === null) {
        return;
    }
    
    var scoreCountObject = JSON.parse(storedHighscore);
    for ( ; i < scoreCountObject.length; i++) {
        var newHighscore = document.createElement("h4");
        newHighscore.innerHTML = scoreCountObject[i].initial + ": " + scoreCountObject[i].saveCorrectAns;
        highscoreDetailEl.appendChild(newHighscore)
    }
}

clearHighscoresEl.addEventListener("click", function(){
    
    localStorage.removeItem("highscore")
    highscoreDetailEl.textContent = ""

});

submitBtnEl.addEventListener("click", function (e) {
    highscore(e)
    savedHighScoreEl.style.display = "block"
    resultEl.style.display = "none"
    viewHighscoreEl.style.display = "block"
})


viewHighscoreEl.addEventListener("click", function (e) {
    viewHighscore(e)
    savedHighScoreEl.style.display = "block"
   
})
goBackEl.addEventListener("click", function(){
    savedHighScoreEl.style.display = "none"
    startQuizBoxEl.style.display = "block"
    location.reload();

})


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






