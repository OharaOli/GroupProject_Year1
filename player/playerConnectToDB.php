<?php
  // Written by Alex.
  
  // Load the configuration file containing your database credentials
  require_once('../misc/config.inc.php');
  // Get all the SQL functions to easily access the database.
  require_once('../misc/sqlFunctions.php');

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
      insertAnswer($mysqli); 
      break;
    case "gq":
      outputQuestion($mysqli);
      break;
    case "gf":
      outputFeedback($mysqli);
      break;
  } // switch
  
  // Closes the connection to the database.
  $mysqli -> close();

  // Updates the host's time since start value in the database.
  function updateTime($mysqli)
  {  
    $sql = "UPDATE players SET last_update = NOW() WHERE player_id = ?;";
    sqlWithoutResult1($mysqli, $sql, $_GET["p"]);
  } // updateTime
  
  // Attempts to insert a new player into the database based on quiz code.
  // Returns host ID, host time and player ID if succesful.
  // Otherwise returns '-'.
  function insertNewPlayer($mysqli)
  {
    $sql = "SELECT host_id FROM hosts "
                . "WHERE quiz_code = ? AND state = 'intro' AND ABS( "
                . "TIME_TO_SEC(TIMEDIFF(last_update, start_time)) - "
                . "TIME_TO_SEC(TIMEDIFF(NOW(), start_time))) "
                . "<= 10 ORDER BY host_id DESC LIMIT 1;";
    $result = sqlWithResult1($mysqli, $sql, $_GET["c"]);
    
    // If a host that matches the quiz code was not found.
    if($result->num_rows === 0)
    {
      // Then '-' is returned and no more data is selected.
      echo "-";
      return;
    } // if 
    $hostStateData = $result->fetch_assoc();
    $hostID =  $hostStateData["host_id"];
    echo $hostID . " \n";
    
    $sql = "INSERT INTO players (host_id, screen_name) VALUES (?,?);";
    sqlWithoutResult2($mysqli, $sql, $hostID, $_GET["n"]);
    // Outputs the player ID.
    echo  mysqli_insert_id($mysqli);
  } // insertNewPlayer
  
  // Polls for a change in state of the host, and returns the time.
  // Will also return the player's current score if the state is feedback.hp
  function pollForState($mysqli)
  {
    $sql = "SELECT state, CASE WHEN ABS("
                . "TIME_TO_SEC(TIMEDIFF(last_update, start_time)) - "
                . "TIME_TO_SEC(TIMEDIFF(NOW(), start_time))) "
                . "<= 10 THEN 1 ELSE 0 END AS stay_connected "
                . "FROM hosts WHERE host_id = ?;";
    $result = sqlWithResult1($mysqli, $sql, $_GET["h"]);
    $hostStateData = $result->fetch_assoc();
    $hostState = $hostStateData["state"];
    echo $hostState;
    echo " \n" . $hostStateData["stay_connected"];
    if($hostStateData["stay_connected"] == "0")
      disconnectSelf($mysqli);
  } // pollForState
  
  function getCurrentQuestionID($mysqli) 
  {
    $sql = "SELECT current_question_id FROM hosts WHERE host_id = ?;";
    $result = sqlWithResult1($mysqli, $sql, $_GET["h"]);
    return $result->fetch_assoc()["current_question_id"];
  } // getCurrentQuestionID
  
  function outputFeedback($mysqli)
  {
    $questionID = getCurrentQuestionID($mysqli);
    
    $sql = "SELECT answer FROM players WHERE player_id = ?;";
    $result = sqlWithResult1($mysqli, $sql, $_GET["p"]);
    $answerLetter =  $result->fetch_assoc()["answer"];
    
    if($answerLetter == "-")
      echo "0 \nYou did not provide an answer.";
    else 
    {
      $sql = "SELECT is_correct, feedback FROM answers "
             . "WHERE letter = $answerLetter AND  question_id = $questionID;";
      $result = sqlWithResult0($mysqli, $sql);
      $answerData = $result->fetch_assoc();
      echo $answerData["is_correct"];
      echo " \n" . $answerData["feedback"];
    } // else
  } // outputFeedback
  
  function outputQuestion($mysqli)
  {
    $questionID = getCurrentQuestionID($mysqli);
    
    $sql =  "SELECT text FROM questions WHERE question_id = $questionID;";
    $result = sqlWithResult0($mysqli, $sql);
    $questionData = $result->fetch_assoc();
    echo $questionData["text"];
    
    $sql = "SELECT text FROM answers WHERE question_id = $questionID "
           . "ORDER BY letter;";
    $result = sqlWithResult0($mysqli, $sql);
    while($row = $result->fetch_assoc())
      echo " \n" . $row["text"];
  } // outputQuestion
  
  // Disconnects oneself from the table.
  function disconnectSelf($mysqli)
  {
    $sql = "UPDATE players SET connected = 0 WHERE player_id = ?;";
    sqlWithoutResult1($mysqli, $sql, $_GET["p"]);
  } // disocnnectSelf
  
  // Inserts the given answer into the table.
  function insertAnswer($mysqli)
  {
    $sql ="UPDATE players SET answer = ? WHERE player_id = ?;";
    sqlWithoutResult2($mysqli, $sql, $_GET["w"], $_GET["p"]);
  } // insertAnswer
?>
