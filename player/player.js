// Written by Praeveen and Alex

// The ID of the player currently playing the game 
var playerID;
// The ID of the host of which the player is currently in the quiz in
var hostID;
// delay for each state delay
var POLL_FOR_STATE_DELAY = 500;
// maximum difference in time for the host before disconnecting
var MAX_HOST_DIFF_TIME = 10000;
// host start time
var hostStartTime;
// the start time of the player
var startTime;
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

var quizID;
var currentQuestionNum = 1;
var currentQuestionAnswers;
var currentQuestionText;
var currentState = "intro";

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

// Returns the time since the host was started.
function getTimeSinceStart()
{
  // Calculates and returns the time since start.
  return Date.now() - startTime;
} // getTimeSinceStart

function setPlayerID(playerAndHostID)
{
  // if string starts with a -,  then give an exception to the html page
  if (playerAndHostID.startsWith("-"))
  {
    $("#error-message").html("Quiz code does not exist");
    alreadyJoined = false;
  } // if
  else
  {

   // split the string in the parameter into different positions in an array by new line seperator
    var playerIDhostIDArray = playerAndHostID.split("\n");
    //  assign the hostID and playerID  and the host time from the string array
    hostID = playerIDhostIDArray[0];
    quizID = playerIDhostIDArray[2];
    playerID = playerIDhostIDArray[3];
    hostStartTime = Date.now() - parseInt(playerIDhostIDArray[1]);
    // get the start time
    startTime = Date.now();

    pollForStateInterval = setInterval(function() { requestDataFromDB(
                                      pollForState, 
                                      "playerConnectToDB.php?a=pfs&h=" + hostID + "&t=" 
                                       + getTimeSinceStart() + "&p=" + playerID 
                                       + "&q=" + quizID + "&n=" + currentQuestionNum); 
                                                  }, POLL_FOR_STATE_DELAY);


  } // else
} //setPlayerID    
    

function pollForState(responseText)
{
  console.log(responseText);
  // get the state, time and possibly the new update score and put that into an array split by new lines
  var statesArray = responseText.split("\n");

  // if the value we get from the database is greater than 10 seconds, then we should disconnect self
  if (Math.abs((Date.now() - hostStartTime) - parseInt(statesArray[1])) > MAX_HOST_DIFF_TIME)
  {     
    // update the data in the database by calling the JS function and then call the php
    // function that  disconnects self
    updateDataInDB("playerConnectToDB.php?a=ds&p=" + playerID);
    // Stops polling for player 
    clearInterval(pollForStateInterval);
    // Gives an error message. 
    document.write("Host disconnected.");
  } // if      
  else
  {
    // use  a switch statement to pick which function will run based on the state
    if(statesArray[0] == "question" && currentState != "question")
      showQuestion(statesArray);
    else if(statesArray[0] == "feedback" && currentState != feedback)
      updateFeedbackState(statesArray[3], statesArray[2]);
    else if(statesArray[0] == "outro" && currentState != "outro")
      outro();
  } // else
} //pollForState


// Execute the code when the page is ready.
$(document).ready(function() {
  // Initially hide the current question and answers.
  $("#q-and-a-container").hide()
  // Initially hide the outro content.
  $("#outro-container").hide();



  $("#join-button").click(function() {
    // __
    quizCode = $("#quiz-code-player").val();
    screenName = $("#player-screen-name").val();

    tryToJoin(quizCode, screenName);

     // Remove the ability to host another quiz.
     // The button and input fields are contained within a div parent element.
     $("#join-option").hide();

    //__
    $("#intro-container").append("<p>Waiting for the host to start.</p>");
  });


});





// function to call when an answer is input
function inputAnswer(answerSelected)
{
    updateDataInDB("playerConnectToDB.php?a=ua&p=" + playerID +"&t=" 
                                       + getTimeSinceStart() + "&w=" + answerSelected);
}

// function to show the question to the player 
function showQuestion(statesArray)
{
  currentState = "question";
  
  currentQuestionText = statesArray[2];
  currentQuestionAnswers = {};
  currentQuestionAnswers["A"] = statesArray[3];
  currentQuestionAnswers["B"] = statesArray[4];
  if(statesArray.length >= 6)
    currentQuestionAnswers["C"] = statesArray[5];
  if(statesArray.length == 7)
    currentQuestionAnswers["D"] = statesArray[6];

  displayQuestionAndAnswers();
} // showQuestion


// function thats the answers from the players 
function  showAnswer(answersDictionary)
 {
    var count = 0;
       for(var key in answersDictionary)
         count++;
          
      // sets all the answers to hidden, then set display based on the length of dictionary
      $("#answer1").hide();
      $("#answer2").hide();
      $("#answer3").hide();
      $("#answer4").hide();

      // if there are 5 answers,  show the option for the 5 answers and put the value of answers to the buttons
      switch(count)
       {
         case 4:
         {
           $("#answer4").show();
           $("#answer4").html(answersDictionary['d']);
         } // case 4
         case 3:
         {
           $("#answer3").show();
           $("#answer3").html(answersDictionary['c']);
         }  // case 3
         case 2:
         {
           $("#answer2").show();
           $("#answer2").html(answersDictionary['b']);
         } // case 2 
        case 1:
        {
           $("#answer1").show();
           $("#answer1").html(answersDictionary['a']);
         } // case 1
     } // switch
  } // showAnswer


// function to show the outro of when the quiz has ended
function outro()
{
  updateUIOutro();
}


// function to return feedback to the player
function updateFeedbackState(feedback, isCorrectNum)
{  
  currentState = "feedback";
  currentQuestionNum++;
  var isCorrect = false;
  if(isCorrectNum == "1")
  {
    isCorrect = true;
    playerScore++;
  }
  displayFeedback(feedback, isCorrect);  
}  // end-updateFeedbackState

// ---- UPDATE THIS WITH ALL YOUR JUICY FUNCTIONS ---
// ------------------- MR PRAEVEEN DO THIS!!!! ---------------------

// A function to display the fetched question and answers.
function displayQuestionAndAnswers()
{
  // Make visible the div container for the question and answers.
  $("#q-and-a-container").show();
  // Adds a header containing the current question.
  $("#question").html(currentQuestionText);

  // A string variable to contain all answers, initially empty.
  var answers_collection = "";
  // Add the answers onto a string, one at a time.
  for (var key in currentQuestionAnswers)
    answers_collection += (key + ": " + currentQuestionAnswers[key] + "<br />");

  // Adds a paragraph containing the current different possible answers.
  $("#answers").html(answers_collection);
}

// A function which adds some text, within the q-and-a div
// container, which contains the correct answer.
function displayFeedback(feedback, isCorrect)
{
  if (isCorrect)
    $("#q-and-a-container").append("<p>You selected the correct answer.</p>");
  else
    $("#q-and-a-container").append("<p>You selected an incorrect answer.</p>");

  $("#q-and-a-container").append("<p>" + feedback + "</p>");
}  // end-displayFeedback


function updateUIAnswer(feedback, isCorrect)
{
}

function updateUIOutro()
{
}

// ----------- END OF UPDATING STUFF -----------------------------------------

function testForErrors(errors)
{
  document.write(errors + "\n");
}


