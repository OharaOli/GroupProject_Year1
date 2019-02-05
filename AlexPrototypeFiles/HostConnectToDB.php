<?php

  // Load the configuration file containing your database credentials
  require_once('config.inc.php');

  // Connect to the database
  $mysqli = new mysqli($database_host, $database_user, 
                       $database_pass, $group_dbnames[0]);

  // Check for errors before doing anything else
  if($mysqli -> connect_error) 
    die("Connection failed.");

  // The type of action being made in regards to the database.
  // The options are described in the later switch statement. 
  $connectType = $_GET["t"];
  
  // Updates the time if the action is not inserting the initial host entry. 
  if($connectType != "gHID")
  {
    $hostID = $_GET["h"];
    
  } // if

  // Runs the correct function depending on the type of action.
  switch($connectType)
  {
    // Insert new host and get host ID.
    case "gHID": break; 
    // Update state.
    case "uS": break;
    // Update disconnect players.
    case "uDP": break; 
    // Poll for players.
    case "pFP": break;
    // Poll for answers.
    case "pFA": break;
  } // switch
  
  // Closes the connection to the database.
  $mysqli -> close();


  $selectStatement = "SELECT * FROM player_test WHERE game_id = 1";

  if($result = $mysqli->query(selectStatement)) 
  {
    if($result-> num_rows > 0)
      echo 'true';
    else
      echo 'false';
    $result -> close(); // Remember to release the result set
  }
  
  function pollForPlayer()
  {
  }
  
  function pollForAnswer
  {
  }
  
  function insertNewHost()
  {
    
  }
  
  function disconnectPlayers()
  {
  }
  
  function changeState()
  {
    
  }
?>
