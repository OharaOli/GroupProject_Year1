// Written by Praeveen

// The ID of the player currently playing the game 
var playerID;

// The ID of the host of which the player is currently in the quiz in
var hostID;

// delay for each state delay
var POLL_FOR_STATE_DELAY = 500;

// host start time
var hostStartTime;

// the start time of the player
var startTime;

// interval for polling the state
var pollForStateInterval;

// create the variable for the player's score
var playerScore;

// variable to check if the player has already joined the quiz
var alreadyJoined = false;

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
    document.write("There was an error for the input string into the setPlayerID in the player.js function");
    alreadyJoined = false;
  } // if
  else
  {

   // split the string in the parameter into different positions in an array by new line seperator
    var playerIDhostIDArray = playerAndHostID.split("\n");
    //  assign the hostID and playerID  and the host time from the string array
    hostID = playerIDhostIDArray[0];
    playerID = playerIDhostIDArray[2];
    hostStartTime = Date.now() - parseInt(playerIDhostIDArray[1]);
    // get the start time
    startTime = Date.now();

    pollForStateInterval = setInterval(function() { requestDataFromDB(
                                      pollForState, 
                                      "playerConnectToDB.php?a=pfs&h=" + hostID + "&t=" 
                                       + getTimeSinceStart() + "&p=" + playerID); 
                                                  }, POLL_FOR_STATE_DELAY);


  } // else
} //setPlayerID    
    


function pollForState(responseText)
{
  // get the state, time and possibly the new update score and put that into an array split by new lines
  var statesArray = responseText.split("\n");

  // if the value we get from the database is greater than 10 seconds, then we should disconnect self
  if (Math.abs((Date.now() - hostStartTime) - parseInt(statesArray[1])) > 10000)
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
    switch(statesArray[0])
    {
        case "intro": 
          intro();
          break;
        case "question":
          showQuestion();
          break;
        case "feedback":
          feedback(statesArray[2]); 
          break;
        case"outro":
           outro();
           break;
     }  // switch
  } // else
} //pollForState

// function to call when an answer is input
function inputAnswer(answerSelected)
{
    updateDataInDB("playerConnectToDB.php?a=ua&p=" + playerID +"&t=" 
                                       + getTimeSinceStart() + "&w=" + answerSelected);

}
// function to show the question to the player 
function showQuestion()
{

}

// function to show the outro of when the quiz has ended
function outro()
{


}

// function of intro of the question to the player
function intro()
{


}

// function to return feedback to the player
function feedback(updatedPlayerScore)
{  
   // update the player score
   playerScore = updatedPlayerScore;

}

function testForErrors(errors)
{
  document.write(errors + "\n");
}


