var lengthofobject = data.quizcontent.length;
var curPage = 0,
    correct = 0;
var myAnswers = [];

// console.log(data.quizcontent);
var myHeader = document.getElementById("quizHeader");
var classname = document.getElementsByClassName("answer");
var myQuestion = document.getElementById("questions");
var progressBar = document.getElementById("progressBar");
var btnNext = document.getElementById("btnNext");
var btnPrevious = document.getElementById("btnPrevious");
var btnFinish = document.getElementById("finishQuiz");
var timer;
checkPage();
btnNext.addEventLisenetr("click", moveNext);
btnPrevious.addEventListener("click", moveBack);
btnFinish.addEventListener("click", endQuiz);
for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener("click", myAnswer, false);
}

// function startQuiz() {
//         var output = "<div class='output'>START QUIZ</div>";
//         document.getElementById("quizContent").innerHTML = output;
// }

function myAnswer() {
    var idAnswer = this.getAttribute("data-id");
    /// check for correct answer
    myAnswers[curPage] = idAnswer;
    if (data.quizcontent[curPage].correct_answer == idAnswer) {
        //console.log('Correct Answer');
    } else {
        //console.log('Wrong Answer');
    }
    addBox();
}

function addBox() {
    for (var i = 0; i < myQuestion.children.length; i++) {
        var curNode = myQuestion.children[i];
        if (myAnswers[curPage] == (i + 1)) {
            curNode.classList.add("selAnswer");
        } else {
            curNode.classList.remove("selAnswer");
        }
    }
}

function moveNext() {
    ///check if an answer has been made
    if (myAnswers[curPage]) {
        //console.log('okay to proceed');
        if (curPage < (data.quizcontent.length - 1)) {
            clearTimeout(timer);
            curPage++;
            checkPage(curPage);
            countDown(10, "status");
        } else {
            ///check if quiz is completed
            //console.log(curPage + ' ' + myQuiz.length);
            if (data.quizcontent.length >= curPage) {
                endQuiz();
            } else {
                //console.log('end of quiz Page ' + curPage);
            }
        }
    } else {
        //console.log('not answered');
    }
}

function endQuiz() {
    if (myAnswers[2]) {
        var output = "<div class='output'>Quiz Results<BR>";
        var questionResult = "NA";
        //console.log('Quiz Over');
        for (var i = 0; i < myAnswers.length; i++) {
            if (data.quizcontent[i].correct_answer == myAnswers[i]) {
                questionResult = '<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>' + '<BR>';
                correct++;
            } else {
                questionResult = '<span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>' + '<BR>';
            }
            output = output + '<span></span>' + '<p>Question ' + (i + 1) + ' ' + questionResult + data.quizcontent[i].question + '<BR>' + "Correct Answer: " + data.quizcontent[i][("a" + (data.quizcontent[i].correct_answer))] + '</p> ';
        }
        output = output + '<p>You scored ' + correct + ' out of ' + data.quizcontent.length + '</p></div> ';
        document.getElementById("quizContent").innerHTML = output;
    } else {
        //console.log('not answered');
    }
}

function checkPage(i) {
    /// add remove disabled buttons if there are no more questions in que
    if (curPage == 0) {
        btnPrevious.classList.add("hide");
    } else {
        btnPrevious.classList.remove("hide");
    }
    if ((curPage + 1) < (data.quizcontent.length)) {
        btnNext.classList.remove("hide");
    } else {
        btnNext.classList.add("hide");
        btnFinish.classList.remove("hide");
    }
    myHeader.innerHTML = data.quizcontent[curPage].question;
    for (var i = 0; i < myQuestion.children.length; i++) {
        var curNode = myQuestion.children[i];
        curNode.childNodes[1].innerHTML = capitalise(data.quizcontent[curPage][("a" + (i + 1))]);
        //check if answered already
        if (myAnswers[curPage] == (i + 1)) {
            curNode.classList.add("selAnswer");
        } else {
            curNode.classList.remove("selAnswer");
        }
    }
    ///update progress bar
    var increment = Math.ceil((curPage) / (data.quizcontent.length) * 100);
    progressBar.style.width = (increment) + '%';
    progressBar.innerHTML = (increment) + '%';
}

function moveBack() {
    if (curPage > 0) {
        curPage--;
        checkPage(curPage);
    } else {
        //console.log('end of quiz Page ' + curPage);
    }
}

function capitalise(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}

function countDown(secs, elem) {
    var element = document.getElementById(elem);
    element.innerHTML = secs + " seconds left ";
    if (secs < 1) {
        clearTimeout(timer);
        element.innerHTML = '<h2>Countdown Complete!</h2>';
    } else {
        secs--;
        timer = setTimeout('countDown(' + secs + ', "' + elem + '")', 1000);
    }

}
