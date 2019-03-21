// Written by Praeveen and Alex

// The ID of the player currently playing the game 
var playerID;
// The ID of the host of which the player is currently in the quiz in
var hostID;
// delay for each state delay
var POLL_FOR_STATE_DELAY = 500;
// interval for polling the state
var pollForStateInterval;
// create the variable for the player's score
var playerScore = 0;
// variable to check if the player has already joined the quiz
var alreadyJoined = false;
// The selected quiz code.
var quizCode;
// The selected screen name;
var screenName;

var currentQuestionAnswers;
var currentQuestionText;
var currentQuestionAnswerSelected;
var currentQuestionNumAnswers;
var currentState = null;
var questionsAnswered = 0;


function tryToJoin(quizCode, screenName)
{
  // if player hasn't joined yet, try to join
  if (!alreadyJoined)
   {
    alreadyJoined = true;
    requestDataFromDB(setPlayerID, "playerConnectToDB.php?a=gp&n=" + screenName + "&c=" + quizCode);
   // set to already joined to true
   } // if

} // tryToJoin

function setPlayerID(playerAndHostID)
{
  // if string starts with a -,  then give an exception to the html page
  if (playerAndHostID.startsWith("-"))
  {
    displayErrorMessage(playerAndHostID.substring(1));
    alreadyJoined = false;
  } // if
  else
  {
   // split the string in the parameter into different positions in an array by new line seperator
    var playerIDhostIDArray = playerAndHostID.split(" \n");
    //  assign the host, quiz and player IDs
    hostID = playerIDhostIDArray[0];
    playerID = playerIDhostIDArray[1];

    pollForStateInterval = setInterval(function() { requestDataFromDB(
                                      pollForState, 
                                      "playerConnectToDB.php?a=pfs&h=" + hostID +"&p=" 
                                      + playerID); }, POLL_FOR_STATE_DELAY);

    updateIntroState();
  } // else
} //setPlayerID    


function pollForState(responseText)
{
  var statesArray = responseText.split(" \n");

  // If the host has disconnected according to the server.
  if (statesArray[1] == "0")
  {     
    // Stops polling for player 
    clearInterval(pollForStateInterval);
    // Gives an error message. 
    displayHostDisconnected();
  } // if      
  else
  {
    // use  a switch statement to pick which function will run based on the state
    if(statesArray[0] == "question" && currentState != "question")
    {
      currentState = "question";
      requestDataFromDB(updateQuestionState, "playerConnectToDB.php?a=gq"
       + "&p=" + playerID + "&h=" + hostID);
     } // if
    else if(statesArray[0] == "feedback" && currentState != "feedback")
    {
      currentState = "feedback";
      requestDataFromDB(updateFeedbackState, "playerConnectToDB.php?a=gf"
       + "&p=" + playerID + "&h=" + hostID);
    } // else if
    else if(statesArray[0] == "outro" && currentState != "outro")
    {
      currentState = "outro";
      updateOutroState();
    } // else if
    else if(statesArray[0] == "floating" && currentState != "floating")
    {
      currentState = "floating";
      updateFloatingState();
    } // else if
  } // else
} //pollForState


// Execute the code when the page is ready.
$(document).ready(function() {
  // When the join button is clicked.
  $("#join-button").click(function() {
    // Extract the quiz code entered in the input field into a variable.
    quizCode = $("#quiz-code-player").val();
    // Extract the quiz code entered in the input field into a variable.
    screenName = $("#player-screen-name").val();
    // Attempt to join the quiz with the inputted code and name.
    tryToJoin(quizCode, screenName);
  });

  // Upon clicking on a particular answer button...
  $("#answer-button-container :button").click(function() {
    // Store the value of this button in a variable.    
    var answerSelected = $(this).val();
    // Make the selected answer text visible.
    $("#selected-answer-message").show();
    // Display the selected answer.
    $("#selected-answer-message").html("<h3 class='response'>You have selected " + answerSelected + ": " + currentQuestionAnswers[answerSelected] + "</h3>");
    // Call the function which sends the currently selected answer to DB.
    inputAnswer(answerSelected);
  });
});


// A function which updates the state to intro.
function updateIntroState()
{
  // Clears the error message.
  displayErrorMessage("");
  // Set the current state to reflect that it is not the intro.
  currentState = "intro";
  // Call the function to actually transition to the intro.
  displayIntro();
}  // end-updateIntroState


// A function which transitions the page to the intro state.
function displayIntro()
{
  $("#intro-container").show();
  // Remove the ability to join another quiz.
  // The button and input fields are contained within this div.
  $("#join-option").hide();
  // Display a message which informs that the host has to start the quiz.
  $("#intro-container").append("<h2>Waiting for the host to start.</h2>");
}  // end-displayIntro


// function to call when an answer is inputted
function inputAnswer(requiredAnswer)
{
    currentQuestionAnswerSelected = requiredAnswer;
    updateDataInDB("playerConnectToDB.php?a=ua&p=" + playerID 
                                  + "&w=" + requiredAnswer);
}  // end-inputAnswer


// function to show the question to the player 
function updateQuestionState(returnedText)
{
  statesArray = returnedText.split(" \n");
  currentQuestionAnswerSelected = "-";
  
  currentQuestionNumAnswers = statesArray.length - 1;
  currentQuestionText = statesArray[0];
  currentQuestionAnswers = {};
  currentQuestionAnswers["A"] = statesArray[1];
  currentQuestionAnswers["B"] = statesArray[2];
  if(statesArray.length >= 4)
    currentQuestionAnswers["C"] = statesArray[3];
  if(statesArray.length == 5)
    currentQuestionAnswers["D"] = statesArray[4];

  displayQuestionAndAnswers();
}  // end-updateQuestionState

// A function to display the fetched question and answers.
function displayQuestionAndAnswers()
{
  // Hides the floating state.
  $("#floating-container").hide();
  // Empty the previous question and answers container div.
  clearQuestionAndAnswers();
  // Set the answer selections buttons to visible,
  // depending on number of answers for the particular question.
  $("#answer-button-container :button:lt(" + currentQuestionNumAnswers + ")").show();
  // Show the contents of the question and answers container div.
  $("#q-and-a-container").show();
  // Adds a header containing the current question.
  $("#q-and-a-container").prepend("<h2>" + currentQuestionText + "</h2>");
  // A string variable to contain all answers, initially empty.
  var answers_collection = "";
  // Index used to select the answer buttons.
  var answerIndex = 0;
  // Fpr every answer, change the button text to contain
  // the key and its associated answer.
  for (var key in currentQuestionAnswers)
  {
    $("#answer-button-container .col-3 button:eq(" + answerIndex + ")")
      .text(key + ": " + currentQuestionAnswers[key]);
    answerIndex++;
  }  // end-for
}  // end-displayQuestionAndAnswers


// A function to remove all elements used in the question
// and answers container (except for all answer buttons and the 
// selected answer message), in order to introduce the next
// round of question and answers.
function clearQuestionAndAnswers()
{
  $("#q-and-a-container")
    .contents(":not(#answer-button-container, #selected-answer-message)").remove();
  // Hide the selected answer message since we are leaving feedback state.
  $("#selected-answer-message").hide();
}  // end-clearQuestionAndAnswers


// function to return feedback to the player
function updateFeedbackState(returnedText)
{  
  var isCorrectBool = returnedText.split(" \n")[0];
  var feedback = returnedText.split(" \n")[1];
  var isCorrect = false;
  if(isCorrectBool == "1")
  {
    isCorrect = true;
    playerScore++;
  }
  questionsAnswered++;
  displayFeedback(feedback, isCorrect);  
}  // end-updateFeedbackState


// A function which adds some text, within the q-and-a div
// container, which contains the correct answer.
function displayFeedback(feedback, isCorrect)
{
  // Hide the answer selection buttons while feedback is displayed.
  $("#answer-button-container :button").hide();
  if (isCorrect)
    // If the answer was correct, then inform of that.
    $("#q-and-a-container").append("<h3 class='response'>You selected the <span class='correct'>correct</span> answer.</h3>");
  else if (currentQuestionAnswerSelected != "-")
    // If the answer was incorrect, then inform of that.
    $("#q-and-a-container").append("<h3 class='response'>You selected an <span class='incorrect'>incorrect</span> answer.</h3>");
  else
    // If an answer was not selected, then inform of that.
    $("#q-and-a-container").append("<h3 class='response'>You did not select an answer.</h3>");
  
  // In any case, display the available feedback.
  $("#q-and-a-container").append("<h3 class='response'>" + feedback + "</h3>");

  $("#selected-answer-message").removeClass("selected-answer-pre-feedback");
}  // end-displayFeedback


// function to show the outro of when the quiz has ended
function updateOutroState()
{
  // Stops polling for state as the quiz is over.
  clearInterval(pollForStateInterval);
  // Call the function which actually makes the transition.
  displayOutro();
}  // end-updateOutroState


// A function which displays the outro state on the page.
function displayOutro()
{
  // The question and answers container div is no longer needed.
  $("#q-and-a-container").hide();
  // Hides the floating state message.
  $("#floating-container").hide();
  // Show the outro container div.
  $("#outro-container").show();
  // Display the player's score.
  $("#outro-container").append("<p>You answered " + playerScore + "/"
                                                       + questionsAnswered + " questions correctly.</p>");
}  // end-displayOutro


function updateFloatingState()
{
  // Hide the selected answer message since we are leaving feedback state.
  $("#selected-answer-message").hide();
  $("#intro-container").empty();
  $("#q-and-a-container").hide();
  $("#outro-container").hide();
  $("#floating-container").show();
} // updateFloatingState


// A function which displays an error message.
function displayErrorMessage(errorMessage)
{
  $("#error-message").show();
  $("#error-message").text(errorMessage);
}  // displayErrorMessage

// A function which displays a message for host disconnecting.
function displayHostDisconnected()
{
  // Display host disconnected error code.
  $("#error-message-host-disconnected").show();
  if(currentState == "intro")
    $("#intro-container").empty();
  else
    displayOutro();
} // displayHostDisconnected

// ----------- END OF UPDATING STUFF -----------------------------------------

function testForErrors(errors)
{
  console.log(errors + "\n");
}


