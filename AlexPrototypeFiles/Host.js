// Written by Alex.

// Implement importing later.
/*
// Imports the functions that allow for connecting to the database.
import { requestDataFromDB, updateDataInDB } from "./ConnectToDB.js";
// Imports the Player class.
import { Player, giveAnswer, checkTime }  from "./PlayerClass.js";
*/

// The time in milliseconds for poll delays.
var POLL_FOR_PLAYERS_DELAY = 200;
var POLL_FOR_ANSWERS_DELAY = 200;

// References to intervals so that they can be stopped later.
var pollForPlayersInterval; 
var pollForAnswersInterval;

// A dictionary of all players in the game - disconnected or connected.
var players = {}; 
// The ID of the host that is currently running.
var hostID;
// The time when the host was started.
var startTime; 

// Starts the host and initialises it in the database.
function startHost()
{ 
  // Create Host table entry.
  requestDataFromDB(setHostID, "HostConnectToDB.php?a=gh");
} // startHost

// Returns the time since the host was started.
function getTimeSinceStart()
{
  // Calculates and returns the time since start.
  return Date.now() - startTime;
} // getTimeSinceStart

function setHostID(newHostID)
{
  // Assigns the host ID for the quiz.
  hostID = newHostID;
  // Sets the start time.
  startTime = Date.now();
  
  // Polls the database for new players at a predefined interval.
  // Saves it in a variable so it can be stopped later.
  pollForPlayersInterval = setInterval(function() { requestDataFromDB(
                                       pollForPlayersDataReturned, 
                                      "HostConnectToDB.php?a=pfp&h=" + hostID + "&t=" 
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
  var players = returnedText.split("\n");
  
  // Loops through each player ID that is connected to the host.
  for(playerIDIndex = 0; playerIDIndex < players.length; ++playerIDIndex)
  {
    // Gets the three values from the single player entry.
    var playerID = players[playerIDIndex].split(",")[0];
    var screenName = players[playerIDIndex].split(",")[1];
    var timeSinceStart = players[playerIDIndex].split(",")[2];
    
    // If the player has already been registered.
    if(playerID in players)
    {
      // Checks the time difference to see if the player has disconnected.
      if(!players[playerID].checkTime(parseInt(timesSinceStart)))
        // If so disconnects them.
        disconnectPlayer(playerID);
    }
    // If the player has not already been registered.   
    else
      // It creates a new player and adds it to the dictionary.
      players[playerID] = new Player(screenName, parseInt(timeSinceStart));
    }
} // pollForPlayersDataReturned

// Disconnects a specific player based on their ID.
function disconnectPlayer(playerID)
{
  updateDataInDB("HostConnectToDB.php?a=dp&p=" + playerID + "&h="                                    
                                 + hostID + "&t=" + getTimeSinceStart());
} // disconnectPlayer

function startQuiz()
{
  // Stops polling for new players.
  clearInterval(pollForPlayersInterval);
  // TEMP CODE
  // CODE NEEDS TO CHANGE STATES
  for(let playerID in players)
    document.write(players[playerID].screenName);
} // startQuiz

function askQuestion()
{
}

function pollForAnswers()
{
}

function calculateScoreChanges()
{
}

function calculateResults()
{
}
