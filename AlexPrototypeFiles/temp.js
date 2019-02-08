/*var hostButton = document.getElementById("host.button");

var quizCode;

if (hostButton) {
	hostButton.addEventListener("click", function() {
		quizCode = document.getElementById("quiz-code-host").value;
	});
}*/

function selectHostID() {
	return document.getElementById("quiz-code-host").value;
}

window.onload = function() {
	var string = "LOAD1";
	startHost(string.replace(/\n|\r/g, ""));
	console.log(string);
}
