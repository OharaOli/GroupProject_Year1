// Written by Alex.

// Imports the function that allows for polling.
import * from "ConnectToDB.js";
// Imports the Player class.
import Player from "PlayerClass.js";

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

// Starts the host and initialises it in the database.
function startHost()
{ 
  // Create Host table entry.
  requestDataFromDB(getHostID, "HostConnectToDB.php?t=gHID");
} // startHost

function getHostID(returnedID)
{
  hostID = returnedID;
  
  // Polls the database for new players at a predefined interval.
  // Saves it in a variable so it can be stopped later.
  pollForPlayersInterval = setInterval(function() { requestDataFromDB(
                                       pollForPlayersDataReturned, 
                                      "HostConnectToDB.php?t=pFP&h=" + hostID); 
                                                  }, POLL_FOR_PLAYERS_DELAY);
} // getHostID

function pollForPlayersDataReturned(returnedText)
{
  // Returned text will have the following form:
  // First line = list of all player IDs.
  // Second line = list of all screen names.
  // Third line = list of all times.
  var playersIDs = returnedText.split("\n")[0];
  var screenNames = returnedText.split("\n")[1];
  var times = returnedText.split("\n")[2];
  
  // Loops through each player ID that is connected to the host.
  for(playerIDIndex = 0; playerIDIndex < playerIds.length; ++playerIDIndex)
    // If the player has already been registered.
    if(playerIDs[playerIDIndex] in players)
    {
      // Checks the time difference to see if the player has disconnected.
      if(!players[playerIDs[playerIDIndex]].checkTime(times[playerIDIndex])
        // If so disconnects them.
        disconnectPlayer(playerIDs[playerIDIndex]);
    }
    // If the player has not already been registered.   
    else
      // It creates a new player and adds it to the dictionary.
      players[playerIDs[playerIDIndex]] = new Player(
                                            screenNames[playerIDIndex], 
                                            parseInt(times[playerIDIndex]));
} // pollForPlayersDataReturned

// Disconnects a specific player based on their ID.
function disconnectPlayer(playerID)
{
  updateDataInDB("HostConnectToDB.php?t=uDP&p=" + playerID + "&h=" + hostID);
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
