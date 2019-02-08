/*var hostButton = document.getElementById("host.button");

var quizCode;

if (hostButton) {
	hostButton.addEventListener("click", function() {
		quizCode = document.getElementById("quiz-code-host").value;
	});
}*/

// A function which returns the value of the input field with id: quiz-code-host.
function selectHostID() {
	return document.getElementById("quiz-code-host").value;
}
