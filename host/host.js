// Written by Alex + Manne (possibly)

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
// The ID of the quiz that the host is currently hosting.
var quizID;

// Starts the host and initialises it in the database.
function startHost(requiredQuizCode, requiredQuizID = 1)
{
  if(!alreadyStarted) 
  {
     // Starts the host.
    alreadyStarted = true;
    quizCode = requiredQuizCode;
    quizID = requiredQuizID;
    // Create Host table entry.
    requestDataFromDB(setHostIDAndNumQuestions, 
                                         "hostConnectToDB.php?a=ghnq&c=" 
                                         + quizCode + "&q=" + quizID);
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
  numberOfConnectedPlayers--;
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
    if(currentQuestionNum > numQuestions)
      showOutro();
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
  
  currentQuestionAnswers["A"] = splitReturnedText[2]; 
  currentQuestionAnswers["B"] = splitReturnedText[3];
  if(splitReturnedText.length >= 5)
    currentQuestionAnswers["C"] = splitReturnedText[4]; 
  if(splitReturnedText.length == 6)
    currentQuestionAnswers["D"] = splitReturnedText[5]; 

 /*
  switch(splitReturnedText.length - 2)
  {
    case 4: currentQuestionAnswers["D"] = splitReturnedText[5]; 
    case 3: currentQuestionAnswers["C"] = splitReturnedText[4]; 
    case 2: currentQuestionAnswers["B"] = splitReturnedText[3]; 
    case 1: currentQuestionAnswers["A"] = splitReturnedText[2]; 
  } // switch
  */
  pollForAnswersInterval = setInterval(function() { requestDataFromDB(
                                      pollForAnswersDataReturned, 
                                      "hostConnectToDB.php?a=pfa&h=" + hostID + "&t=" 
                                       + getTimeSinceStart()); 
                                                  }, POLL_FOR_ANSWERS_DELAY);
  
  displayQuestionAndAnswers();
  
} // askQuestion

function pollForAnswersDataReturned(returnedText)
{
  splitReturnedText = returnedText.split("\n");
  var numAnswersGiven = 0;
  for(var splitIndex = 0; splitIndex < splitReturnedText.length; splitIndex++)
  {
    var id = splitReturnedText[splitIndex].split(",")[0];
    var answer =splitReturnedText[splitIndex].split(",")[1];
    if(answer != "-" && answer in currentQuestionAnswers)
      numAnswersGiven++;
    players[id].currentAnswer = answer; 
  } // for
  updatePlayerAnswers(numAnswersGiven);
  $("#numberOfAnswers").show();
}

function updateFeedbackState()
{
  clearInterval(pollForAnswersInterval);
  answerSelections = { "A": 0, "B": 0, "C": 0, "D": 0 }
  for(key in players)
  {
    if(players[key].currentAnswer != "-")
      answerSelections[players[key].currentAnswer]++;
    players[key].giveAnswer(currentQuestionCorrectAnswer);
  }
  
  updateDataInDB("hostConnectToDB.php?a=us&h=" + hostID + "&s=feedback"
                                + "&t=" + getTimeSinceStart());
                                
  displayFeedback(answerSelections);
} // updateFeedbackState

function showOutro()
{
  updateDataInDB("hostConnectToDB.php?a=us&h=" + hostID + "&s=outro"
                                 + "&t=" + getTimeSinceStart());
  displayOutro();
} // showOutro

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
  // Upon clicking the 'Host Quiz' button...
  $("#host-button").click(function() {
    // Check that the length of the characters in the input feld is
    // exactly 5. (trim removes whitespace)
    if ($.trim($("#quiz-code-host").val()).length == 5)
    {
      // Remove the ability to host another quiz.
      // The button and input field are contained within a div parent element.
      $("#host-option").hide();
      // Show the intro container div contents.
      $("#intro-container").show();
      // Store the value of the quiz code input field in quizCode.
      quizCode = $("#quiz-code-host").val();
      // Call the function to start the quiz, passing quizCode as argument.
      startHost(quizCode);
      // Display the quiz code chosen by the host.
      $("#state-display").text("Quiz with quiz code: "
                                               + quizCode + " has been created.");
      // Since quiz has been created, the host can now start it,
      // which is why the start button is now shown.
      $("#start-button").show();
      // Show the number of players connected.
      $("#number-of-players-connected").show();
    }  // end-if
  });

  // Upon clicking the 'Start Quiz' button...
  $("#start-button").click(function() {
    // ...remove all elements used in the intro.
    $("#intro-container").empty(); 
    // Call the function to start the quiz.
    startQuiz();
    // Hide the next question button before showing the 
    // div container for the question and answers.
    $("#next-button").hide();
    // Show all the elements in the question and answer container.
    $("#q-and-a-container").show();
  });

  // Display the feedback upon clicking the 'next' button.
  $("#reveal-button").click(function() {
    // Display the correct answer and maybe feedback.
    updateFeedbackState();
    // Hide the reveal button.
    $(this).hide();
    // Show instead the next button.
    $("#next-button").show();
  });

  // Display the next question upon clicking the 'next' button.
  $("#next-button").click(function() {
    // Remove all question and answer elements from page.
    clearQuestionAndAnswers();
    // Fetch and display the next question with its answers.
    getNextQuestion();
    // Hide the next button.
    $(this).hide();
    // Show instead the reveal button.
    $("#reveal-button").show();
  });
});

// Romans' + Manne

// A function to display the fetched question and answers.
function displayQuestionAndAnswers()
{
  // Adds a header containing the current question.
  $("#q-and-a-container").append("<h2>" + currentQuestionText + "</h2>");

  // A string variable to contain all answers, initially empty.
  var answers_collection = "";
  // Add the answers onto a string, one at a time.
  for (var key in currentQuestionAnswers)
    answers_collection += (key + ": " + currentQuestionAnswers[key] + "<br />");

  // Adds a paragraph containing the current different possible answers.
  $("#q-and-a-container").append("<p>" + answers_collection + "</p>");
}


// A function which updates the number of players who have currently
// answered the question. (Not during feedback stage!)
function updatePlayerAnswers(numOfAnswers)
{
    $("#numberOfAnswers").html("Answers so far: " + numOfAnswers);
}  // end-updatePlayerAnswers


// A function which displays the number of players who
// selected each answer respectively. (During feedback stage!)
function displayPlayerAnswers()
{
  $("#numberOfAnswers").
  $("#q-and-a-container").append("<p>Number of responses:" + numOfPlayers + "</p>");
}  // end-displayPlayerAnswers


// A function which adds some text, within the q-and-a div
// container, which contains the correct answer and who answered what.
function displayFeedback(answerSelections)
{
  // Loop through answers.
  for(answerSelection in answerSelections)
    // To make sure (for some reason) answer D is
    //selected when only A and B are available.
    if(answerSelection in currentQuestionAnswers)
      // Display the number of players who chose each answer respectively.
      $("#q-and-a-container").append("<p>Number of  " +
        answerSelection + "s: " + answerSelections[answerSelection]);

  // Display the correct answer.
  $("#q-and-a-container").append("<p>The correct answer is "
    + currentQuestionAnswers[currentQuestionCorrectAnswer] + "</p>");
}  // end-displayFeedback


/* not used atm
//Romans'
function updateUIRemoveButton(buttonID)
{
    var element = document.getElementById(buttonID);
    element.parentNode.removeChild(element);
}//removeButton
*/


// A function to remove all elements used in the question
// and answers container (except for buttons and the number of answers),
// in order to introduce the next round of question and answers.
function clearQuestionAndAnswers()
{
  $("#q-and-a-container")
    .find("*").not(":button").not("#numberOfAnswers").remove();    
}  // end-clearQuestionAndAnswers


// A function which displays the outro page.
function displayOutro()
{
  // For every player in quiz session...
  for (var index in players)
    // ...make sure they are either connected or has some points.
    if (players[index].connected || players[index].score > 0)
      $("#score-list").append("<li>" + players[index].screenName + ": "
                                                         + players[index].score + "</li>")      

  // Remove all content used for displaying the questions and answers.
  $("#q-and-a-container").empty();
  // Make visible the contents of the outro container div.
  $("#outro-container").show();    
}  // end-displayOutro

// -------------------------- STOP TOUCHING MY CODE AFTER HERE --------------------
// --------------------- THX GOODBYE HAVE FUN DON'T TOUCH MY CODE -----------

function testForErrors(error)
{
  document.write(error + "\n");
} // testForErrors
