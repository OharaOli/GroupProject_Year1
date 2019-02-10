//Written by Romans

function displayQuestion(currentQuestion)
{
    document.getElementById("MainHeading").innerHTML = currentQuestion;
}//displayQuestion

function displayAnswers(answersDictionary)
{
    var answers_message = '';
    for (var key in answersDictionary)
        answers_message += (key + ": " + answersDictionary[key] + "<br />");

    document.getElementById("SubHeading1").innerHTML = answers_message;
}//displayAnswer

function displayCorrectAnswer(correctAnswer)
{
    document.getElementById("SubHeading2").innerHTML = "Correct answer: " + correctAnswer;
}

function clearPage()
{
    document.innerHTML = '';    
}//clearPage

function removeButton(buttonID)
{
    var element = document.getElementById(buttonID);
    element.parentNode.removeChild(element);
}//removeButton

//--------------------------------Function for later---------------------------------
function displayFeedback(answerFeedback)
{
    document.getElementById("SubHeading3").innerHTML = "Feedback";
    document.getElementById("paragraph").innerHTML = answerFeedback;
}//displayFeedback
//----------------------------------------------------------------------------------------------
