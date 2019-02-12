// Written by Alex.

// Implement importing later.
/*
// Imports the functions that allow for connecting to the database.
import { requestDataFromDB, updateDataInDB } from "./ConnectToDB.js";
// Imports the Player class.
import { Player, giveAnswer, checkTime }  from "./PlayerClass.js";
*/

// The time in milliseconds for poll delays.
var POLL_FOR_PLAYERS_DELAY = 500;
var POLL_FOR_ANSWERS_DELAY = 500;

// References to intervals so that they can be stopped later.
var pollForPlayersInterval; 
var pollForAnswersInterval;

// A dictionary of all players in the game - disconnected or connected.
var players = {};
// The ID of the host that is currently running.
var hostID;
// The time when the host was started.
var startTime; 
// The number of questions in the quiz.
var numQuestions;
// The question number that the host is currently on.
// Initially set to 0 (not a question) but incremented before fetching next.
var currentQuestionNum = 0;
// The question text that the host is currently on.
var currentQuestionText;
// The answers to the question the host is currently on.
var currentQuestionAnswers; 
// The letter of the correct answer. 
var currentQuestionCorrectAnswer;
// Determines if the current page already has a host started on it.
var alreadyStarted = false;
// The code used by players to connect, created by the host.
var quizCode;
// The number of players that are currenty connected.
var numberOfConnectedPlayers;

// Starts the host and initialises it in the database.
function startHost(requiredQuizCode, quizID = 1)
{
  if(!alreadyStarted) 
  {
     // Starts the host.
    alreadyStarted = true;
    // Create Host table entry.
    requestDataFromDB(setHostIDAndNumQuestions, 
                                         "hostConnectToDB.php?a=ghnq&c=" 
                                         + quizCode + "&q=" + quizID);
    quizCode = requiredQuizCode;
  }
} // startHost

// Returns the time since the host was started.
function getTimeSinceStart()
{
  // Calculates and returns the time since start.
  return Date.now() - startTime;
} // getTimeSinceStart

function setHostIDAndNumQuestions(returnedText)
{
  // Assigns the host ID for the quiz.
  hostID = returnedText.split("\n")[0];
  // Assigns the number of questions.
  numQuestions = parseInt(returnedText.split("\n")[1]);
  // Sets the start time.
  startTime = Date.now();
  
  // Polls the database for new players at a predefined interval.
  // Saves it in a variable so it can be stopped later.
  pollForPlayersInterval = setInterval(function() { requestDataFromDB(
                                      pollForPlayersDataReturned, 
                                      "hostConnectToDB.php?a=pfp&h=" + hostID + "&t=" 
                                       + getTimeSinceStart()); 
                                                  }, POLL_FOR_PLAYERS_DELAY);
} // getHostID

function pollForPlayersDataReturned(returnedText)
{
  // Returned text will have the following form:
  // Each player entry is separated by a new line.
  // Each player entry has ID, screen name and time since start.
  // Each of these values is separated by a comma.

  // Separates all the players.
  var receivedPlayers = returnedText.split("\n");
  // Loops through each player ID that is connected to the host.
  for(playerIDIndex = 0; playerIDIndex < receivedPlayers.length; ++playerIDIndex)
  {
    // Gets the three values from the single player entry.
    var playerID = receivedPlayers[playerIDIndex].split(",")[0];
    var screenName = receivedPlayers[playerIDIndex].split(",")[1];
    var timeSinceStart = receivedPlayers[playerIDIndex].split(",")[2];

    // If the player has already been registered.
    if(playerID in players)
    {
      // Checks the time difference to see if the player has disconnected.
      if(!players[playerID].checkTime(parseInt(timeSinceStart)))
        // If so disconnects them.
        disconnectPlayer(playerID);
    } // if
    else  // If the player has not already been registered.   
      // It creates a new player and adds it to the dictionary.
      players[playerID] = new Player(screenName, parseInt(timeSinceStart));
  } // for
  
  updateIntroUI();
} // pollForPlayersDataReturned

// Disconnects a specific player based on their ID.
function disconnectPlayer(playerID)
{
  updateDataInDB("hostConnectToDB.php?a=dp&p=" + playerID                                     
                                 + "&t=" + getTimeSinceStart());
} // disconnectPlayer

function startQuiz()
{
  // Stops polling for new players.
  clearInterval(pollForPlayersInterval);
  getNextQuestion();
} // startQuiz

function getNextQuestion()
{
    currentQuestionNum++;
    if(currentQuestionNum >= numQuestions)
      showQuestionResults;
    else
      requestDataFromDB(askQuestion, "hostConnectToDB.php?a=us&h=" + hostID
                                  + "&n=" + currentQuestionNum + "&s=question&t="
                                  + getTimeSinceStart() + "&q=" + quizID); 
} // getQuestionData

function askQuestion(returnedText)
{
  splitReturnedText = returnedText.split("\n");
  currentQuestionText = splitReturnedText[0];
  currentQuestionCorrectAnswer = splitReturnedText[1];
  currentQuestionAnswers = {};
  switch(splitReturnedText.length - 2)
  {
    case 4: currentQuestionAnswers["D"] = splitReturnedText[5]; 
    case 3: currentQuestionAnswers["C"] = splitReturnedText[4]; 
    case 2: currentQuestionAnswers["B"] = splitReturnedText[3]; 
    case 1: currentQuestionAnswers["A"] = splitReturnedText[2]; 
  } // switch
  
  pollForAnswersInterval = setInterval(function() { requestDataFromDB(
                                      pollForAnswersDataReturned, 
                                      "hostConnectToDB.php?a=pfa&h=" + hostID + "&t=" 
                                       + getTimeSinceStart()); 
                                                  }, POLL_FOR_ANSWERS_DELAY);
  
  updateUIShowQuestion();
  
} // askQuestion

function pollForAnswersDataReturned(returnedText)
{
   splitReturnedText = returnedText.split("\n");
   var numAnswersGiven = 0;
   for(idAnswerPair in splitReturnedText)
   {
     var id = idAnswerPair.split(",")[0];
     var answer = idAnswerPair.split(",")[1];
     if(answer != "-")
      numAnswersGiven++;
     players[id].currentAnswer = answer; 
   } // for

    updateUIPlayersAnswered(numAnswersGiven);
}

function showQuestionResults()
{
  clearInterval(pollForAnswersInterval);
  for(key in players)
    players[key].giveAnswer(currentQuestionCorrectAnswer);
  updateDataInDB("hostConnectToDB.php?a=us&h=" + hostID + "&s=feedback"
                                + "&t=" + getTimeSinceStart());
                                
  updateUIQuestionResults();
} // showQuestionResults

function showFinalResults()
{
  updateDataInDB("hostConnectToDB.php?a=us&h=" + hostID + "&s=feedback"
                                 + "&t=" + getTimeSinceStart());
  updateUIFinalResults();
} // showFinalResults

//---------------------- MANNE + ROMANS + PRAEVEEN ------------------------------
//--------------- IMPLEMENT ALL THESE FUNCTIONS PLZ THX -------------------

// Manne's

// A function to update the UI of intro state.
function updateIntroUI()
{
    // Number of players is reset to 0 prior to recount.
    numberOfConnectedPlayers = 0;
    // List is reset as well to be empty, to avoid duplicates.
    $("#player-list").text("");
    // For every player in quiz...
    for(var index in players) {
      // ...check if they are connected.
      if (players[index].connected) {
        // If they are connected, add a list element, containing the
        //  player's screen name, to the list.
        $("#player-list").append("<li>" + players[index].screenName
                                                  + " has connected!</li>");
        // Increment the number of connected players by 1.
        numberOfConnectedPlayers++;
      }  // end-if
    } // end-for
    // Display the number of players that are currently connected.
    $("#number-of-players-connected").text("" + numberOfConnectedPlayers
                                                                          + " players are currently connected.");
} // end-updateIntroUI()

// Execute the code when the page is ready.
$(document).ready(function() {
  // Initially hide the start quiz button.
  $("#start-button").hide();

  // Upon clicking the 'Host Quiz' button...
  $("#host-button").click(function() {
    // Check that the length of the characters in the input feld is
    // exactly 5. (trim removes whitespace)
    if ($.trim($("#quiz-code-host").val()).length == 5)
    {
      // Remove the ability to host another quiz.
      // The button and input field are contained within a div parent element.
      $("#host-option").hide();
      // Store the value of the quiz code input field in quizCode.
      quizCode = $("#quiz-code-host").val();
      // Call the function to start the quiz, passing quizCode as argument.
      startHost(quizCode);
      // Display the quiz code chosen by the host.
      $("#state-display").text("Quiz with quiz code:"
                                               + quizCode + " has been created.");
      // Since quiz has been created, the host can now start it,
      // which is why the start button is now shown.
      $("#start-button").show();
    }  // end-if
  });

  $("#start-button").click(function() {
    clearPage();
    startQuiz();
    displayQuestion();
    displayAnswers();
  });
});


// Romans'
function displayQuestion()
{
  $("#question-answers-pair").append("<h2></h2>")
  
    document.getElementById("<TYPE ID HERE>").innerHTML = currentQuestionText;
}

// Romans'
function updateUIPlayersAnswered(numOfPlayers)
{
    document.getElementById("<TYPE ID HERE>").innerHTML = "Number of players: " + numOfPlayers;
}

//Romans'
function displayAnswers()
{
    var answers_message = '';
    for (var key in currentQuestionAnswers)
        answers_message += (key + ": " + currentQuestionAnswers[key] + "<br />");

    document.getElementById("TYPE ID HERE").innerHTML = answers_message;
}

// Romans'
function updateUIQuestionResults()
{
    document.getElementById("<TYPE ID HERE>").innerHTML = currentQuestionAnswers[currentQuestionCorrectAnswer];
}

//Romans'
function updateUIRemoveButton(buttonID)
{
    var element = document.getElementById(buttonID);
    element.parentNode.removeChild(element);
}//removeButton


function clearPage()
{
    $("body").empty();    
}//clearPage


// Not assigned yet.
function updateUIFinalResults()
{
}

// -------------------------- STOP TOUCHING MY CODE AFTER HERE --------------------
// --------------------- THX GOODBYE HAVE FUN DON'T TOUCH MY CODE -----------

function testForErrors(error)
{
  document.write(error + "\n");
} // testForErrors
