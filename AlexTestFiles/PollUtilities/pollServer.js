var PollAction = {
  CHECK_CONNECT: 1,
  CHECK_ANSWER: 2,
};

var checkConnectPollInterval;

function enablePolling()
{
  checkConnectPollInterval = setInterval(function() { poll(PollAction.CHECK_CONNECT); }, 100);
}

function poll(pollAction)
        {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() 
          {
          if (xhttp.readyState == 4 && xhttp.status == 200) 
	    switch(pollAction)
            {
              case PollAction.CHECK_CONNECT: 
                checkConnect(xhttp.responseText); 
                break
              case PollAction.CHECK_ANSWER: 
                checkAnswer(xhttp.responseText);
                break;
              default: return;
            }
         };
        xhttp.open("GET", "is_player_connected.php?pm=" + pollAction, true);
        xhttp.send(); 	
      }

function checkConnect(response)
{
  if(response == "true")
  {
    document.getElementById("textToChange").innerHTML = "Player connected! Asking question!";
    clearInterval(checkConnectPollInterval);
    setInterval(function() { poll(PollAction.CHECK_ANSWER); }, 100);
  } 
}

function checkAnswer(response)
{
  // do something
}
