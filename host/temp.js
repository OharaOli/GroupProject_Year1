/*var hostButton = document.getElementById("host.button");

var quizCode;

if (hostButton) {
	hostButton.addEventListener("click", function() {
		quizCode = document.getElementById("quiz-code-host").value;
	});
}*/

// The number of players that are connected.
var numberOfConnectedPlayers;

// The delay time before the intro is updated.
var introUpdateTime = 200;

// A function which returns the value of the input field with id: quiz-code-host.
function selectHostID() {
	return document.getElementById("quiz-code-host").value;
}

// A function which when called, displays the screen name of each player 
// connected and the total number of connected players.
function displayPlayers() {
  // Repeat in fixed interval.
  setInterval(function () {
    
    numberOfConnectedPlayers = 0;
    console.log(Object.keys(players).length);
    for(var playerID = 0; playerID < Object.keys(players).length; players++) {
      console.log(players[playerID].connected);
      console.log(players[playerID].screenName);
      /*if (players[playerID].connected == false) {
        
        numberOfConnectedPlayers++;
        console.log(numberOfConnectedPlayers);
      }*/
    }
      document.getElementById("number-of-players-connected")
        .innerHTML = numberOfConnectedPlayers;
  }, introUpdateTime);
}


//for (playerID in Players) {
     //   if ()
