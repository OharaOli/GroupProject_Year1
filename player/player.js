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
//
var quizID;
var currentQuestionNum = 1;
var currentQuestionAnswers;
var currentQuestionText;
var currentQuestionAnswerSelected;
var currentQuestionNumAnswers;
var currentState = null;


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
    displayQuizCodeNotFound(true);
    alreadyJoined = false;
  } // if
  else
  {
   // split the string in the parameter into different positions in an array by new line seperator
    var playerIDhostIDArray = playerAndHostID.split(" \n");
    //  assign the host, quiz and player IDs
    hostID = playerIDhostIDArray[0];
    quizID = playerIDhostIDArray[1];
    playerID = playerIDhostIDArray[2];

    pollForStateInterval = setInterval(function() { requestDataFromDB(
                                      pollForState,
                                      "playerConnectToDB.php?a=pfs&h=" + hostID +"&p="
                                      + playerID + "&q=" + quizID + "&n=" + currentQuestionNum);
                                                  }, POLL_FOR_STATE_DELAY);

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
    document.write("Host disconnected.");
  } // if
  else
  {
    // use  a switch statement to pick which function will run based on the state
    if(statesArray[0] == "question" && currentState != "question")
      requestDataFromDB(updateQuestionState, "playerConnectToDB.php?a=gq&n="
        + currentQuestionNum + "&q=" + quizID + "&p=" + playerID);
    else if(statesArray[0] == "feedback" && currentState != "feedback")
        requestDataFromDB(updateFeedbackState, "playerConnectToDB.php?a=gf&q="
          + quizID + "&n=" + currentQuestionNum + "&p=" + playerID);
    else if(statesArray[0] == "outro" && currentState != "outro")
      updateOutroState();
  } // else
} //pollForState


// Execute the code when the page is ready.
$(document).ready(function() {
  // Initially hide any error of unfound quiz code.
  displayQuizCodeNotFound(false);

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
    $("#selected-answer-message").html("You have selected " + answerSelected);
    // Call the function which sends the currently selected answer to DB.
    inputAnswer(answerSelected);
  });
});


// A function which updates the state to intro.
function updateIntroState()
{
  // Remove any error of unfound quiz code.
  displayQuizCodeNotFound(false);
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
  $("#intro-container").append("<p>Waiting for the host to start.</p>");
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
  currentState = "question";
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
  // Remove the contents of the intro container div.
  $("#intro-container").empty();
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
  // Add the answers onto a string, one at a time.
  for (var key in currentQuestionAnswers)
    answers_collection += (key + ": " + currentQuestionAnswers[key] + "<br />");
  // Adds a paragraph containing the current different possible answers.
  $("<p>" + answers_collection + "</p>").insertAfter("#q-and-a-container h2");
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
  currentState = "feedback";
  currentQuestionNum++;
  var isCorrect = false;
  if(isCorrectBool == "1")
  {
    isCorrect = true;
    playerScore++;
  }
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
    $("#q-and-a-container").append("<p>You selected the correct answer.</p>");
  else if (currentQuestionAnswerSelected != "-")
    // If the answer was incorrect, then inform of that.
    $("#q-and-a-container").append("<p>You selected an incorrect answer.</p>");
  else
    // If an answer was not selected, then inform of that.
    $("#q-and-a-container").append("<p>You did not select an answer.</p>");

  if(currentQuestionAnswerSelected != "-")
    // In any case, display the available feedback.
    $("#q-and-a-container").append("<p>" + feedback + "</p>");
}  // end-displayFeedback


// function to show the outro of when the quiz has ended
function updateOutroState()
{
  // Set the current state to reflect that it is now the outro.
  currentState = "outro";
  // No longer needs to poll for state when in outro as the quiz is over.
  clearInterval(pollForStateInterval);
  // Call the function which actually makes the transition.
  displayOutro();
}  // end-updateOutroState


// A function which displays the outro state on the page.
function displayOutro()
{
  // The question and answers container div is no longer needed.
  $("#q-and-a-container").empty();
  // Show the outro container div.
  $("#outro-container").show();
  // Display the player's score.
  $("#outro-container").append("<p>Your score is " + playerScore + ".");
}  // end-displayOutro


// A function which displays an error message of an unfound quiz code.
function displayQuizCodeNotFound(isVisible)
{
  if (isVisible)
    // Display error code.
    $("#error-message-quiz-code-not-found").show();
  else
    // Hide error code.
    $("#error-message-quiz-code-not-found").hide();
}  // end-displayQuizCodeNotFound

// ----------- END OF UPDATING STUFF -----------------------------------------

function testForErrors(errors)
{
  console.log(errors + "\n");
}
