// Written by Praeveen

// The ID of the player currently playing the game 
var playerID;

// The ID of the host of which the player is currently in the quiz in
var hostID;

// delay for each state delay
var POLL_FOR_STATE_DELAY = 200;

// host start time
var hostStartTime;

// the start time of the player
var startTime;

// interval for polling the state
var pollForStateInterval;

function tryToJoin(quizCode, screenName)
{
  requestDataFromDB(setPlayerID, "playerConnectToDB.php?a=gp&n=" + screenName + "&c=" + quizCode);


}

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
    document.write("There was an error for the input string into the setPlayerID function");
  } // if
  else
  {
   // split the string in the parameter into different positions in an array by new line seperator
    var playerIDhostIDArray = playerAndHostID.split("\n");
    //  assign the hostID and playerID  and the host time from the string array
    hostID = playerIDhostIDarray[0];
    playerID = playerIDhostIDarray[2];
    hostStartTime = Date.now() - parseInt(playerIDhostIDarray[1]);
    // get the start time
    startTime = Date.now();

    pollForStateInterval = setInterval(function() { requestDataFromDB(
                                      pollForState, 
                                      "playerConnectToDB.php?a=pfs&h=" + hostID + "&t=" 
                                       + getTimeSinceStart()); 
                                                  }, POLL_FOR_STATE_DELAY);


  } // else
} //setPlayerID    
    



function pollForState()
{



}

// function to show the question to the player 
function showQuestion()
{

}

// function to show the answer to the player after the timer has ran out or host decides to reveal the answer
function showAnswer()
{


}

// function of intro of the question to the player
function intro()
{


}

// function to return feedback to the player
function feedback()
{


}


