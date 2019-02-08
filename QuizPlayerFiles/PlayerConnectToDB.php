<?php

  // Load the configuration file containing your database credentials
  require_once('config.inc.php');

  // Connect to the database
  $mysqli = new mysqli($database_host, $database_user, 
                       $database_pass, $group_dbnames[0]);

  // Check for errors before doing anything else
  if($mysqli -> connect_error) 
    die("Connection failed.");
    
   // Updates the time if the action is not inserting the initial player entry. 
  if($_GET["a"] != "gp")
    updateTime($mysqli);
   
  // Runs the correct function depending on the type of action.
  switch($_GET["a"])
  {
    // Insert new player if host exists and returns host and player ID.
    case "gp": 
      insertNewPlayer($mysqli);
      break; 
    // Polls for a change in state of the host.
    case "pfs":
      pollForState($mysqli); 
      break;
    // Disconnects self from the quiz.
    case "ds":
      disconnectSelf($mysqli); 
      break; 
    // Updates the answer stored..
    case "ua":
      pollForPlayers($mysqli); 
      break;
  } // switch
  
  // Closes the connection to the database.
  $mysqli -> close();

  // Updates the host's time since start value in the database.
  function updateTime($mysqli)
  {  
    $updateTime = $mysqli->prepare("UPDATE players SET time_since_start = ? "
                                                                . "WHERE player_id = ?;");
    $updateTime->bind_param("ss", $_GET["t"], $_GET["p"]);
    $updateTime->execute();
    $updateTime->close(); 
  } // updateTime
  
  function insertNewPlayer($mysqli)
  {
    $checkQuizCodeExists = $mysqli->prepare("SELECT host_id FROM hosts "
                                                                                . "WHERE quiz_code = ? AND "
                                                                                . "state = 'intro' ORDER BY "
                                                                                . "host_id LIMIT 1;");
    $checkQuizCodeExists->bind_param("s", $_GET["c"]);
    $checkQuizCodeExists->execute();
    $hostID = $checkQuizCodeExists->get_result();
    if($hostID->num_rows === 0)
    {
      echo "-";
      return;
    } // if 
    echo $hostID;
    $checkQuizCodeExists->close();
    $insertNewPlayer = $mysqli->prepare("INSERT INTO players (host_id) "
                                                                   .  "VALUES (?);");
    $insertNewPlayer->bind_param("s", $hostID);
    $insertNewPlayer->execute();
    echo  mysqli_insert_id($mysqli);
    $insertNewPlayer->close();
  } // insertNewPlayer
  
  function pollForState($mysqli)
  {
      function insertNewPlayer($mysqli)
  {
    $pollForState = $mysqli->prepare("SELECT state FROM hosts "
                                                                . "WHERE host_id = ?;");
    $pollForState->bind_param("s", $_GET["h"]);
    $pollForState->execute();
    $hostState= $checkQuizCodeExists->get_result();
    echo $hostState;
    if($hostState == "feedback")
      return;
    $pollForState->close();
    $pollForScore = $mysqli->prepare("SELECT score FROM players "
                                                                 .  "WHERE player_id = ?;");
    $pollForScore->execute();
    echo $pollForScore->get_result();
    $pollForScore->close();
  } // pollForState
  
  function disconnectSelf($mysqli)
  {
    $disconnectSelf = $mysqli->prepare("UPDATE players SET connected = 0 "
                                                                     . "WHERE player_id = ?;");
    $disconnectSelf->bind_param("s", $_GET["p"]);
    $disconnectSelf->execute();
    $disconnectSelf->close();
  } // disocnnectSelf
  
  function insertAnswer($mysqli)
  {
  } // insertAnswer
?>
