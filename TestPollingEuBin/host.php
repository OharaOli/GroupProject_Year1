<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<title> Host page </title>

<! sends a polling request to the server - using java script ajex
while ( no data = true)
keep polling. 
the script line below allows javaScript to be inserted into html>
<script type = "text/javascript">
	function pollForPlayer()
	{
	  var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() 
		{
		  if (xhttp.readyState == 4 && xhttp.status == 200) 
		     if(xhttp.responseText == "true")
		        document.getElementById("textToChange").innerHTML 
		                                               = "Player connected!";
	 
		}
		xhttp.open("GET", "is_payer_connected.php", true);
    // get - what type 
    // 2nd - sending the request. 
    // is....php is what is executed by the server
    // true - asynchronous

		xhttp.send(); 
  } // function pollForPlayer
</script>

<body>
    <p id="textToChange"> Waiting for player...</p>
    <script type = "text/javascript">
      setInterval(pollForPlayer, 100);
    </script>
</body>
</html>


<!
if the data is what the host client wanted, then execute an approriate task.
appropriate task - change the message: that shows total number of players who have joined.>
