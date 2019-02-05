// Written by Alex.

// Makes a data request to the database using a given PHP file.
// When data is returned the given function is called.
// The operation for requesting data uses GET.
function requestDataFromDB(phpFile, stateChangeFunction)
{
  // Create a new object so that data can be requested.
  var xhttp = new XMLHttpRequest();
  // Assigns the function to be called when data is returned successfully.
  xhttp.onreadystatechange = function() 
    // Checks the data is sent successfully.
    if(xhttp.readyState == 4 && xhttp.status == 200)
      // Calls the given function.
      stateChangeFunction(xhttp.responseText);
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

// Exports the requestDataFromDB function.
export { requestDataFromDB, updateDataInDB };
