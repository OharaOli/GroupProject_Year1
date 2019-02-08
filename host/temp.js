/*var hostButton = document.getElementById("host.button");

var quizCode;

if (hostButton) {
	hostButton.addEventListener("click", function() {
		quizCode = document.getElementById("quiz-code-host").value;
	});
}*/

var numberOfConnectedPlayers = 0;
var introUpdateTime = 200;

// A function which returns the value of the input field with id: quiz-code-host.
function selectHostID() {
	return document.getElementById("quiz-code-host").value;
}

function displayPlayers() {
  setInterval(function () {
    for (screenName in Players) {
    }
  }, introUpdateTime);
}

