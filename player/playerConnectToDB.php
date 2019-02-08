<?php
  // Written by Alex.
  
  // Load the configuration file containing your database credentials
  require_once('../misc/config.inc.php');

  // Connect to the database
  $mysqli = new mysqli($database_host, $database_user, 
                       $database_pass, $group_dbnames[0]);

  // Check for errors before doing anything else
  if($mysqli -> connect_error) 
    die("Connection failed.");
    
   // Updates the time if the action is not inserting the initial player entry. 
  if($_GET["a"] != "gp" && $_GET["a"] != "ds")
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
    // Updates the time based on the given player ID.
    $updateTime = $mysqli->prepare("UPDATE players SET time_since_start = ? "
                                                                . "WHERE player_id = ?;");
    // Binds the time t and the player p.
    $updateTime->bind_param("ss", $_GET["t"], $_GET["p"]);
    $updateTime->execute();
    $updateTime->close(); 
  } // updateTime
  
  // Attempts to insert a new player into the database based on quiz code.
  // Returns host ID, host time and player ID if succesful.
  // Otherwise returns '-'.
  function insertNewPlayer($mysqli)
  {
    // Selects the host with the highest ID whose quiz code matches and is 
    // in the intro state. Also selects the time since start.
    $checkQuizCodeExists = $mysqli->prepare("SELECT host_id, time_since_start "
                                                                                . "FROM hosts "
                                                                                . "WHERE quiz_code = ? AND "
                                                                                . "state = 'intro' ORDER BY "
                                                                                . "host_id LIMIT 1;");
    // Binds the quiz code c.
    $checkQuizCodeExists->bind_param("s", $_GET["c"]);
    $checkQuizCodeExists->execute();
    $checkQuizCodeResults = $checkQuizCodeExists->get_result();
    // If a host that matches the quiz code was not found.
    if($checkQuizCodeResults->num_rows === 0)
    {
      // Then '-' is returned and no more data is selected.
      echo "-";
      return;
    } // if 
    $hostID =  $checkQuizCodeResults->fetch_assoc()["host_id"];
    // Outputs the host ID and the time since start.
    echo $hostID;
    echo $checkQuizCodeResults->fetch_assoc()["time_since_start"];
    $checkQuizCodeExists->close();
    // The quiz code exists so the player is inserted.
    $insertNewPlayer = $mysqli->prepare("INSERT INTO players "
                                                                   . "(host_id, screen_name) "
                                                                   .  "VALUES (?,?);");
    // Binds the host ID and the screen name n.
    $insertNewPlayer->bind_param("ss", $hostID, $_GET["n"]);
    $insertNewPlayer->execute();
    // Outputs the player ID.
    echo  mysqli_insert_id($mysqli);
    $insertNewPlayer->close();
  } // insertNewPlayer
  
  // Polls for a change in state of the host, and returns the time.
  // Will also return the player's current score if the state is feedback.
  function pollForState($mysqli)
  {
    // Gets the state and time since start of the host.
    $pollForState = $mysqli->prepare("SELECT state, time_since_start "
                                                                . "FROM hosts "
                                                                . "WHERE host_id = ?;");
    // Binds the host ID h.
    $pollForState->bind_param("s", $_GET["h"]);
    $pollForState->execute();
    $hostState= $checkQuizCodeExists->get_result();
    // Outputs the state and time since start.
    echo $hostState;
    echo $checkQuizCodeExists->get_result()["time_since_start"];
    // Only continues if the state is feedback.
    if($hostState != "feedback")
      return;
    $pollForState->close();
    // Gets the score from the players table.
    $pollForScore = $mysqli->prepare("SELECT score FROM players "
                                                                 .  "WHERE player_id = ?;");
    // Binds the player ID p.
    $pollForScore->bind_param("s", $_GET["p"]);
    $pollForScore->execute();
    // Outputs the player's score.
    echo $pollForScore->get_result();
    $pollForScore->close();
  } // pollForState
  
  // Disconnects oneself from the table.
  function disconnectSelf($mysqli)
  {
    // The SQL command to set the given player ID to disconnected.
    $disconnectSelf = $mysqli->prepare("UPDATE players SET connected = 0 "
                                                                     . "WHERE player_id = ?;");
    // Binds the player ID p.
    $disconnectSelf->bind_param("s", $_GET["p"]);
    $disconnectSelf->execute();
    $disconnectSelf->close();
  } // disocnnectSelf
  
  // Inserts the given answer into the table.
  function insertAnswer($mysqli)
  {
    // Inserts an answer into the given players table.
    $inputAnswer = $mysqli->prepare("INSERT INTO players(answer) "
                                                                . "VALUES (?) WHERE player_id= ?;");
    // Binds the answer w and the player ID p.
    $inputAnswer->bind_param("ss", $_GET["w"], $_GET["p"]);
    $inputAnswer->execute();
    $inputAnswer->close();
  } // insertAnswer
?>
