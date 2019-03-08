/* 
    Written by Alex Bowker-Lonnecker (quiz session functionality) 
    and Manne Hedlund (frontend user interface) for COMP10120. 

    This file handles all the functionality and graphics of the host page
    for QuizMapp. It requires a number of file inclusions to function:
    JQUERY library
    ../misc/connectToDB.js

    The host operates in a number of states:
    Intro: in this state the host polls for players to join the quiz sesson.
    Question: in this state the host displays a question and polls for 
    answers from the connected players. 
    Feedback: in this state the host gives feedback on the previously asked
    question by displaying the correct answer(s).
    Outro: in this state the host displays the players' scores.
    The host moves from intro, to question. to feedback and then either 
    to question (if there are more questions to be asked) or outro (if there 
    are no more questions in the quiz).
*/

// The time in milliseconds for poll delays.
// -------------------------------------------------------------------------------------
// This is the delay between polling for players in the intro state.
// Currently set to 500 milliseconds or half a second.
var POLL_FOR_PLAYERS_DELAY = 500;
// This is the delay between polling for answers in the question state.
// Currently set to 500 milliseconds or half a second.
var POLL_FOR_ANSWERS_DELAY = 500;
// This is the delay between simply updating the time in the database
// while in the feedback state.
// Currently set to 1500 milliseconds or 1.5 seconds.
var UPDATE_TIME_DELAY = 1500;

// References to intervals so that they can be stopped later.
// -------------------------------------------------------------------------------------------
// The interval used for polling for players in the intro state.
var pollForPlayersInterval; 
// The interval used for polling for answers in the question state.
var pollForAnswersInterval;
// The interval used to update the time in the database in the feedback state.
var updateTimeInterval;
// The interval for the timer which determines how much time there is 
// left to answer the current question.
var timerInterval;

// A large number of global variables are used to ease in access of 
// important data associated with the quiz.
// --------------------------------------------------------------------------------------------
// A dictionary of all players in the game - disconnected or connected.
var players = {};
// A 2D array representing the coordinates of all the questions.
var questions = [];
// The ID of the host that is currently running.
var hostID;
// The name of the quiz being played.
var quizName;
// The number of questions in the quiz.
var numQuestions;
// The question number that the host is currently on.
// Initially set to 0 (not a question) but incremented before fetching next.
var currentQuestionNum = 0;
// Determines if the current page already has a host started on it.
var alreadyStarted = false;
// The code used by players to connect, created by the host.
var quizCode;
// The number of players that are currenty connected.
var numberOfConnectedPlayers = 0;
// The ID of the quiz that the host is currently hosting.
var quizID;
// The x-coordinate in the plane where the host is currently looking at.
// Initialised to -1 as the view is originally in the intro state.
var xCoord = -1;
// The y-coordinate in the plane where the host is currently looking at.
var yCoord = 0;

// Code written by Alex.
// -------------------------------------------------------------------------
// Starts the host and initialises it in the database.
function startHost(requiredQuizCode, requiredQuizID)
{
  // Only starts the host if one has not already been started on the page.
  if(!alreadyStarted) 
  {
    // Sets the host to have started.
    alreadyStarted = true;
    // Sets the quiz code for the session to the given code.
    quizCode = requiredQuizCode;
    // Sets the quiz ID for the session to the given ID.
    quizID = requiredQuizID;
    // Makes a request to the server to create a new host in the hosts table
    // and return the host ID made, the number of questions and the quiz name.
    // The (a)ction is (g)et (h)ost (gh) details, the quiz (c)ode is the code that 
    // players will use to reference the host, and the (q)uiz ID is the ID of the 
    // quiz that is being hosted.
    requestDataFromDB(setHostDetails, "hostConnectToDB.php?a=gh&c=" 
                                         + quizCode + "&q=" + quizID);
  } // if
} // startHost


// Stores data associated with the quiz sent from the server as well
// as starts polling for new players to join.
function setHostDetails(returnedText)
{
  // Returned text will have the following form, separated by " \n":
  // Line 0 - the host ID.
  // Line 1 - the quiz name.
  // Line 2 onwards - all the questions, each taking up 6 lines in 
  // the following order:
  // Question ID, text, x coordinate, y coordinate, time, answers.
  // Answers are separated by " \\" and have the following information:
  // Letter (A/B/C/D), is correct (1 or 0), text. No spaces between all 3.
  
  // Assigns the host ID for the quiz.
  hostID = returnedText.split(" \n")[0];
  // Stores the quiz name.
  quizName = returnedText.split(" \n")[1];
  // Iterates through each question, 6 pieces of data at a time.
  for(index = 2; index < returnedText.length; index += 6)
  {
    // Gets the ID at relative index 0.
    var id = returnedText[index];
    // Gets the text at relative index 1.
    var text = returnedText[index + 1];
    // Gets the x-coordinate at relative index 2.
    var x = parseInt(returnedText[index + 2]);
    // Gets the y-coordinate at relative index 3.
    var y = parseInt(returnedtext[index + 3]);
    // Gets the time at relative index 4.
    var time = parseInt(returnedText[index + 4]);
    // Gets the set of answers at relative index 5.
    var answers = returnedText[index + 5].split(" \\");
    // Creates a dictionary of answers to populate.
    var answerDict = {}
    // Iterates through each answer.
    for(int answerIndex = 0; answerIndex < answers.length; answerIndex++)
    {
      // Gets the letter as the first character.
      var letter = answers[answerIndex].charAt(0);
      // Determines whether the answer is correct using the second character.
      var isCorrect = answers[answerIndex].charAt(1);
      // Gets the text using the remainder of the characters.
      var text = answers[answerIndex].substring(2);
      // Creates a new answer object and adds it to the answer dictionary.
      answerDict[letter] = new Answer(letter, isCorrect, text);
    } // for
    // Creates a new question object and adds it to the 2D question array.
    questions[x][y] = new Question(id, text, answerDict, time);
  } // for
   
  // Polls the database for new players.
  // Saves it in a variable so it can be stopped later.
  // The (a)ction is (p)oll (f)or (p)layers (pfp), the (h)ost is the host's ID.
  pollForPlayersInterval = setInterval(function() { requestDataFromDB(
                                      pollForPlayersDataReturned, 
                                      "hostConnectToDB.php?a=pfp&h=" + hostID); 
                                                  }, POLL_FOR_PLAYERS_DELAY);
} // setHostDetails


// Handles responses from the server for the list of connected or recently
// disconnected players that are joining the session.
function pollForPlayersDataReturned(returnedText)
{
  // Returned text will have the following form, separated by " \n":
  // A list of players on each line, details separated as follows by " \\":
  // Detail 0 - the player ID.
  // Detail 1 - the player's screen name.
  // Detail 2 - a flag which is 1 if they are still connected, 0 if they have been
  // disconnected by the server.

  // Separates all the players.
  var receivedPlayers = returnedText.split(" \n");
  // Loops through each player that is connected to the host.
  for(playerIndex = 0; playerIndex < receivedPlayers.length; playerIndex++)
  {
    // Gets the three details from the single player entry.
    var playerID = receivedPlayers[playerIndex].split(" \\")[0];
    var screenName = receivedPlayers[playerIndex].split(" \\")[1];
    var connected = receivedPlayers[playerIndex].split(" \\")[2];
    // If the player has already been registered but has disconnected.
    if(playerID in players && connected == "0")
      // Disconnects the host's representation of the player.
      setPlayerAsDisconnected(playerID);
    // Otherwise they have not yet been added to the dictionary.
    else if(!(playerID in players)) 
    {
      // It creates a new player and adds it to the dictionary.
      players[playerID] = new Player(screenName);
      // Increments the number of connected players.
      numberOfConnectedPlayers++;
    } // else
  } // for
  
  // Updates the UI for the intro state.
  updateIntroUI();
} // pollForPlayersDataReturned


// Disconnects the host's representation of the player.
function setPlayerAsDisconnected(playerID)
{
  // Ensures the player is actually in the dictionary of known players.
  if(playerID in players)
  {
    // Sets the player in the dictionary to be disconnected.
    players[playerID].connected = false;
    // Decreases the known number of connected players.
    numberOfConnectedPlayers--;
  } // if
} // setPlayerAsDisconnected


// Disconnects a specific player based on their ID.
function disconnectPlayer(playerID)
{
  // Ensures the player is actually in the dictionary of known players.
  if(playerID in players)
  {
    // Sends a request to the server to disconnect the player.
    // The (a)ction is (d)isconnecting a (p)layer (dp), and the (p)layer ID
    // is the ID of the player to be disconnected.
    updateDataInDB("hostConnectToDB.php?a=dp&p=" + playerID);
    // Disconnects the host's representation of the player.
    setPlayerAsDisconnected(playerID);
  } // if
} // disconnectPlayer


// Starts the quiz by exiting the intro state and starting the first question.
function startQuiz()
{
  // Stops polling for new players.
  clearInterval(pollForPlayersInterval);
  // Starts an interval for simply updating the time in the database as otherwise
  // a lack of updates would indicate to a player that the host has disconnected.
  // The (a)ction is (u)pdating the (t)ime (ut) and the (h)ost ID is the host's ID.
  updateTimeInterval = setInterval(function() { updateDataInDB(
            "hostConnectToDB.php?a=ut&h=" + hostID); }, UPDATE_TIME_DELAY);
} // startQuiz


// Handles the data associated with the question to be asked, and performs
// the required actions to display it.
function startQuestion()
{
  // Stops the interval for updating the time in the database from feedback state.
  clearInterval(updateTimeInterval);
  
  // Updates the state in the database so that players also get the next question.
  // It also fetches all the required information for the next question.
  // The (a)ction is (u)pdate (s)tate (us), the (h)ost ID is the host's ID, the 
  // question (n)umber is the number of the question that needs to be fetched,
  // the new (s)tate is question and the (q)uiz ID is the ID of the quiz the 
  // question needs to be fetched from.
  updateDataInDB(askQuestion, "hostConnectToDB.php?a=us&h=" + hostID 
                 + "&s=question&q=" + questions[xCoord][yCoord]); 

  // Starts the interval for polling for answers in the database.
  // The (a)ction is (p)olling (f)or (a)nswers, the (h)ost ID is the host's ID.
  pollForAnswersInterval = setInterval(function() { updateDataInDB( 
                                      "hostConnectToDB.php?a=pfa&h=" + hostID); 
                                                  }, POLL_FOR_ANSWERS_DELAY);
  // DISABLE MOVING TO ANOTHER SPACE
  // Starts the countdown timer for the question.
  startTimer();
} // askQuestion


// Handles the list of player answers returned from the server.
function pollForAnswersDataReturned(returnedText)
{
  // Returned text will have the following form, separated by " \n":
  // A list of player answers on each line, details separated as follows by " \\":
  // Detail 0 - the ID of the player who gave the answer.
  // Detail 1 - the letter of the answer they gave.
  // Detail 2 - if the player is still connected to the server. 1 if they are 
  // still connected and 0 if they are disconnected.
  
  // Splits the returned text into its individual parts.
  splitReturnedText = returnedText.split(" \n");
  // Counts the number of answers given.
  var numAnswersGiven = 0;
  
  // Iterates through each player and the answer they gave.
  for(splitIndex = 0; splitIndex < splitReturnedText.length; splitIndex++)
  {
    // Gets the ID of the player who gave the answer.
    var playerID = splitReturnedText[splitIndex].split(" \\")[0];
    // Gets the letter of the answer they gave.
    var answer = splitReturnedText[splitIndex].split(" \\")[1];
    // Determines whether the player should stay connected.
    var connected = splitReturnedText[splitIndex].split(" \\")[2];
    // If the player has disconnected.
    if(connected == "0")
      // Disconnects the host's representation of the player.
      setPlayerAsDisconnected();
    // If the answer was actually an answer (and not an unanswered '-')
    // and the answer is a possible answer out of the list of letters in the question.
    else if(answer != "-" && answer in currentQuestionAnswers)
    {
      // Increases the number of answers given.
      numAnswersGiven++;
      // Sets the relevant player object's current answer to be the one given.
      players[playerID].currentAnswer = answer; 
    } // if
  } // for
  
  // Updates the UI for the number of answers given so far.
  updatePlayerAnswers(numAnswersGiven);
} // pollForAnswersDataReturned


// Handles the required functionality for the feedback state.
function updateFeedbackState()
{
  // Clears the interval for polling for answers.
  clearInterval(pollForAnswersInterval);
  // Starts an interval for simply updating the time in the database as otherwise
  // a lack of updates would indicate to a player that the host has disconnected.
  // The (a)ction is (u)pdating the (t)ime (ut) and the (h)ost ID is the host's ID.
  updateTimeInterval = setInterval(function() { updateDataInDB(
            "hostConnectToDB.php?a=ut&h=" + hostID); }, UPDATE_TIME_DELAY);
            
  // Counts the frequency of answers for each letter.
  answerSelections = { "A": 0, "B": 0, "C": 0, "D": 0 }
  // Iterates through each player.
  for(key in players)
  {
    // If the player answered the question.
    if(players[key].currentAnswer != "-")
      // Increments the frequency of the answer they gave.
      answerSelections[players[key].currentAnswer]++;
    // Gives the correct answers to the player object in the dictionary so
    // that their score can be updated depending on if they got the answer correct.
    players[key].giveAnswer(currentQuestionCorrectAnswers);
  } // for
  
  // Updates the state in the database to be in the feedback state.
  // The (a)ction is (u)pdating the (s)tate, the (h)ost ID is the host's ID, and the 
  // new (s)tate is the feedback state.
  updateDataInDB("hostConnectToDB.php?a=us&h=" + hostID + "&s=feedback");
  
  // Displays the required UI for the feedback state.
  displayFeedback(answerSelections);
} // updateFeedbackState


// Handles the required functionality for the outro state.
function showOutro()
{
  // Makes a final update to the database to inform players of the outro state.
  // The (a)ction is (u)pdating the (s)tate, the (h)ost ID is the host's ID, and the
  // new (s)tate is the outro state.
  updateDataInDB("hostConnectToDB.php?a=us&h=" + hostID + "&s=outro");
  // Displays the required UI for the outro state.
  displayOutro();
} // showOutro

// Functions for moving the plain of view.
// -----------------------------------------------------------------

// Moves the current question to the left.
function goLeft()
{
  // Ensures that the current question does not go back into the intro state.
  if(xCoord > 0)
  {
    // Moves the x coordinate one space to the left.
    xCoord -= 1;
    // Moves the y coordinate to the first question in the stack.
    yCoord = 0;
  } // if
} // goLeft

// Moves the current question to the right.
function goRight()
{
  // Stops polling for players if leaving the intro state.
  
  // Ensures the current question does not go beyond the outro state. 
  if(xCoord < questions.length)
  {
    // Moves the x coordinate one space to the right.
    xCoord += 1;
    // Moves the y coordinate to the first question in the stack.
    yCoord = 0;
  } // if
} // goRight

// Moves the current question up one space.
function goUp()
{
  // Ensures the current question is not the first in the stack.
  if(yCoord > 0)
    // Moves the current question up one space.
    yCoord -= 1;
} // goUp

// Moves the current question down one space.
function goDown()
{
  // Ensures the current question does not go beyond the bottom of the stack.
  if(yCoord < questions[xCoord].length - 1)
    // Moves the current question down one space.
    yCoord += 1;
} // goDown

// Object constructors.
// -----------------------------------------------------------------

// Question class constructor.
function Question(id, text, answers, timeLimit)
{
  // The ID of the question.
  this.id = id;
  // The text describing the question.
  this.text = text;
  // A dictionary of all the answers, with the key being the letter.
  this.answers = answers;
  // The maximum amount of time allocated per question.
  this.timeLimit = timeLimit;
} // Question 

// Answer class constructor.
function Answer(letter, isCorrect, text)
{
  this.text = text;
  if(isCorrect == "1")
    this.isCorrect = true;
  else
    this.isCorrect = false;
  this.letter = letter;
} // Answer

// Player class constructor.
function Player(screenName)
{
  // The name of the player which will be displayed on the screen.
  this.screenName = screenName;
  // The score which will be displayed on the screen. 
  this.score = 0;
  // Determines if the player is connected.
  this.connected = true;
  // The answer to the most previous question. Initially this will be nothing.
  this.currentAnswer = "-";
  
  // Assigns the class methods.
  this.giveAnswer = giveAnswer;
} // Player constructor

// Calculates a player's score depending if they gave the correct answer.
function giveAnswer(correctAnswer)
{
  // Only increases the score if the correct answer given.
  if(correctAnswer.includes(this.currentAnswer))
    this.score += 1;
  // Clears the answer for the next question.
  this.currentAnswer = "-";
} // giveAnswer

// Code written by Manne.
// --------------------------------------------------------------------------------------

// A function to update the UI of intro state.
function updateIntroUI()
{
    // List is reset as well to be empty, to avoid duplicates.
    $("#player-list").text("");
    // For every player in quiz...
    for(var index in players) 
      // ...check if they are connected.
      if (players[index].connected) 
        // If they are connected, add a list element, containing the
        //  player's screen name, to the list.
        $("#player-list").append("<li>" + players[index].screenName
                                                  + " has connected!</li>");
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
    if ($.trim($("#quiz-code-host").val()).length == 6)
    {
      // Remove the ability to host another quiz.
      // The button and input field are contained within a div parent element.
      $("#host-option").hide();
      // Show the intro container div contents.
      $("#intro-container").show();
      // Store the value of the quiz code input field in quizCode.
      quizCode = $("#quiz-code-host").val();
      // Call the function to start the quiz, passing quizCode as argument.
      startHost(quizCode, 1);
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
    // End question and move on to the feedback state.
    endQuestion();
  });

  // Display the next question upon clicking the 'next' button.
  $("#next-button").click(function() {
    // Ends the feedback state and moves on to the next question.
    startQuestion();
  });
});


// Ends the feedback state and moves on to the next question.
function startQuestion() {
  // Remove all question and answer elements from page.
  clearQuestionAndAnswers();
  // Fetch and display the next question with its answers.
  getNextQuestion();
  // Hide the next button.
  $("#next-button").hide();
  // Show instead the reveal button.
  $("#reveal-button").show();
}  // end-startQuestion


// Ends the current question and moves on to the feedback state.
function endQuestion() {
  // Clear the timer interval, in case timer has stopped.
  if(timerInterval != undefined)
    clearInterval(timerInterval);
  // Hide the timer, since countdown has been aborted.
  $("#timer").hide();
  // Display the correct answer and maybe feedback.
  updateFeedbackState();
  // Hide the reveal button.
  $("#reveal-button").hide();
  // Show instead the next button.
  $("#next-button").show(); 
}  // end-endQuestion


// Starts the timer countdown (1 second at a time).
function startTimer() {
  // The time left until countdown is 0.
  var timeLeft = currentQuestionTimeLimit;
  // Show the timer countdown.
  $("#timer").show();
  // A function which decrements the countdown by 1, displays
  // it and if it has run out, then ends the question.
  var updateTimer = function() {
    $("#timer").html(timeLeft);
    if (timeLeft < 0)
    {
      endQuestion();
      return;
    }  // end-if
    timeLeft--;
  }  // end-updateTimerFunction
  // Call the updateTimer function once at first, to
  // start countdown immediately.
  updateTimer();
  // Afterwards, call it once every second.
  timerInterval  = setInterval(updateTimer, 1000);
}  // end-startTimer


// A function to display the fetched question and answers.
function displayQuestionAndAnswers()
{
  // Shows the answers so far and sets the initial value to 0.
  $("#numberOfAnswers").show();
  updatePlayerAnswers(0);
  // Displays the answer that this question links to.
  $("#q-and-a-container").append(
                                         "<h3>" + currentQuestionLinkedAnswer + "</h3>");
  // Adds a header containing the current question.
  $("#q-and-a-container").append("<h2>" + currentQuestionText + "</h2>");

  // A string variable to contain all answers, initially empty.
  var answers_collection = "";
  // Add the answers onto a string, one at a time.
  for (var key in currentQuestionAnswers)
    answers_collection += (key + ": " + currentQuestionAnswers[key] + "<br />");

  // Adds a paragraph containing the current different possible answers.
  $("#q-and-a-container").append("<p>" + answers_collection + "</p>");
} // displayQuestionAndAnswers


// A function which updates the number of players who have currently
// answered the question. (Not during feedback stage!)
function updatePlayerAnswers(numOfAnswers)
{

    $("#numberOfAnswers").html("Answers so far: " + numOfAnswers);
}  // end-updatePlayerAnswers


// A function which adds some text, within the q-and-a div
// container, which contains the correct answer and who answered what.
function displayFeedback(answerSelections)
{
  // Hides the number of answers given.
  $("#numberOfAnswers").hide();
  // Loop through answers.
  for(answerSelection in answerSelections)
    // To make sure (for some reason) answer D is
    //selected when only A and B are available.
    if(answerSelection in currentQuestionAnswers)
      // Display the number of players who chose each answer respectively.
      $("#q-and-a-container").append("<p>Number of  " +
        answerSelection + "s: " + answerSelections[answerSelection]);
  // If there is more than one correct answer.
  if(currentQuestionCorrectAnswers.length > 1)
  {
    // Forms a string that shows all the correct answers.
    var answersToOutput = "<p>The correct answers are ";
    // Iterates through each correct answer except the last.
    for(answerIndex = 0; answerIndex < currentQuestionCorrectAnswers.length - 1;
          answerIndex++)
      // Adds the text for that correct answer to the string.
      answersToOutput += 
        currentQuestionAnswers[currentQuestionCorrectAnswers[answerIndex]] 
        + " and ";
    // Adds the final correct answer seperately as it does not end with an 'and'.
    answersToOutput +=
      currentQuestionAnswers[currentQuestionCorrectAnswers
      [currentQuestionCorrectAnswers.length - 1]] + ".</p>";
    // Displays the correct answers by appending it to the page.
    $("#q-and-a-container").append(answersToOutput);
  } // if 
  // Otherwise there is only one correct answer.
  else 
    // That correct answer can simply be displayed.
    $("#q-and-a-container").append("<p>The correct answer is "
      + currentQuestionAnswers[currentQuestionCorrectAnswers[0]] + "</p>");
}  // end-displayFeedback


// A function to remove all elements used in the question and
// answers container (except for buttons, the number of answers and timer),
// in order to introduce the next round of question and answers.
function clearQuestionAndAnswers()
{
  // Remove what is no longer required.
  $("#q-and-a-container")
    .find("*").not(":button").not("#numberOfAnswers").not("#timer").remove();
    // Hide the timer.
    $("#timer").hide;
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
