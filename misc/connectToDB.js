// Written by Alex.

// Makes a data request to the database using a given PHP file.
// When data is returned the given function is called.
// The operation for requesting data uses GET.
function requestDataFromDB(stateChangeFunction, phpFile)
{
  // Create a new object so that data can be requested.
  var xhttp = new XMLHttpRequest();
  // Assigns the function to be called when data is returned successfully.
  xhttp.onreadystatechange = function() {
    // Checks the data is sent successfully and is not whitespace.
    if(xhttp.readyState == 4 && xhttp.status == 200 
       && xhttp.responseText.trim() != "")
    {  
      // Calls the given function with the response text. Trims the text to remove 
      // initial/trailing newlines which might get sent by the server.
      stateChangeFunction(xhttp.responseText.trim());
    }
  };
  // Determines which file to send to.
  xhttp.open("GET", phpFile, true);
  // Sends the request.
  xhttp.send();
} // requestDataFromDB

// Updates data in a database using a given PHP file.
// The operation for updating data uses GET.
function updateDataInDB(phpFile)
{
  // Create a new object so that data can be requested.
  var xhttp = new XMLHttpRequest();
  // Determines which file to send to.
  xhttp.open("GET", phpFile, true);
  // Sends the request.
  xhttp.send();
} // updateDataInDB

