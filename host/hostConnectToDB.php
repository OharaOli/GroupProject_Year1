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
    
   // Updates the time if the action is not inserting the initial host entry. 
  if($_GET["a"] != "gh")
    updateTime($mysqli);
   
  // Runs the correct function depending on the type of action.
  switch($_GET["a"])
  {
    // Insert new host and get host ID and number of questions..
    case "gh": 
      insertNewHost($mysqli);
      break; 
    // Update state.
    case "us":
      updateState($mysqli);
      break;
    // Disconnect a player.
    case "dp":
      disconnectPlayer($mysqli); 
      break; 
    // Poll for players.
    case "pfp":
      pollForPlayers($mysqli); 
      break;
    // Poll for answers.
    case "pfa":
      pollForAnswers($mysqli); 
      break;
  } // switch
  
  // Closes the connection to the database.
  $mysqli -> close();

  // Updates the host's time since start value in the database.
  function updateTime($mysqli)
  { 
    $sql = "UPDATE hosts SET last_update = NOW() WHERE host_id = ?;";
    sqlWithoutResult1($mysqli, $sql, $_GET["h"]);
  } // updateTime
  
  function insertNewHost($mysqli)
  {
    $sql = "INSERT INTO hosts (quiz_code, quiz_id)  VALUES (?, ?);";
    sqlWithoutResult2($mysqli, $sql, $_GET["c"], $_GET["q"]);
    echo mysqli_insert_id($mysqli);
    
    $sql = "SELECT name FROM quizzes WHERE quiz_id = ?;";
    $result = sqlWithResult1($mysqli, $sql, $_GET["q"]);
    echo " \n" . $result->fetch_assoc()["name"];

    $sql = "SELECT question_id, text, x_coord, y_coord, time FROM questions "
                . "WHERE quiz_id = ? ORDER BY x_coord, y_coord;";
    $questionResult = sqlWithResult1($mysqli, $sql, $_GET["q"]);   
    while($questionData = $questionResult->fetch_assoc())
    {
      $questionID = $questionData["question_id"];
      echo " \n" . $questionID;
      echo " \n" . $questionData["text"];
      echo " \n" . $questionData["x_coord"];
      echo " \n" . $questionData["y_coord"];
      echo " \n" . $questionData["time"];
      
      $sql = "SELECT text, is_correct, letter FROM answers "
             . "WHERE question_id = $questionID ORDER BY letter;";
      $answerResult =  sqlWithResult0($mysqli, $sql);
      $row = $answerResult->fetch_assoc();
      echo " \n" . $row["letter"] . $row["is_correct"] . $row["text"];
      while($row = $answerResult->fetch_assoc())
        echo " \\" . $row["letter"] . $row["is_correct"] . $row["text"];
    } // while
  } // insertNewHost
  
  function clearAnswers($mysqli)
  {
    $sql = "UPDATE players SET answer = '-' WHERE host_id = ?;";
    sqlWithoutResult1($mysqli, $sql, $_GET["h"]);
  } // clearAnswers
  
  function pollForPlayers($mysqli)
  {
    
    $sql = "SELECT player_id, screen_name, CASE WHEN ABS("
                . "TIME_TO_SEC(TIMEDIFF(last_update, start_time)) - "
                . "TIME_TO_SEC(TIMEDIFF(NOW(), start_time))) "
                . "<= 6 THEN 1 ELSE 0 END AS stay_connected "
                . "FROM players WHERE host_id = ? AND connected = 1;";
    $result = sqlWithResult1($mysqli, $sql, $_GET["h"]);
    if($result->num_rows > 0)
    {
      // Echos out the first line so that the new lines are in the right place.
      $firstRow = $result->fetch_assoc();
      echo $firstRow["player_id"] . " \\" . $firstRow["screen_name"] . " \\" . 
                  $firstRow["stay_connected"];
      // Outputs all the other lines.
      while($row = $result->fetch_assoc())
        echo " \n" . $row["player_id"] . " \\" . $row["screen_name"] . " \\" . 
                  $row["stay_connected"];
      disconnectPlayers($mysqli);
    } // if
  } // pollForPlayers
  
  function disconnectPlayer($mysqli)
  {
    $sql = "UPDATE players SET connected = 0 WHERE player_id = ?;";
    sqlWithoutResult1($mysqli, $sql, $_GET["p"]);
  } // disconnectPlayer
  
  function disconnectPlayers($mysqli)
  {
    $sql = "UPDATE players SET connected = 0 WHERE ABS("
               . "TIME_TO_SEC(TIMEDIFF(last_update, start_time)) - "
               . "TIME_TO_SEC(TIMEDIFF(NOW(), start_time))) "
               . "> 6 AND host_id = ? AND connected = 1;";
    sqlWithoutResult1($mysqli, $sql, $_GET["h"]);
  } // disconnectPlayers
  
  function pollForAnswers($mysqli)
  {
    $sql = "SELECT player_id, answer, CASE WHEN ABS("
                . "TIME_TO_SEC(TIMEDIFF(last_update, start_time)) - "
                . "TIME_TO_SEC(TIMEDIFF(NOW(), start_time))) "
                . "<= 6 THEN 1 ELSE 0 END AS stay_connected FROM players "
                . "WHERE host_id = ? AND connected = 1 AND answer <> '-';";
    $result = sqlWithResult1($mysqli, $sql, $_GET["h"]);
    if($result->num_rows > 0)
    {
      $firstRow = $result->fetch_assoc();
      echo $firstRow["player_id"] . " \\" . $firstRow["answer"]
                . " \\" . $firstRow["stay_connected"];
      while($row = $result->fetch_assoc())
        echo " \n" .  $row["player_id"] . " \\" . $row["answer"] 
                 . " \\" . $row["stay_connected"];   
      disconnectPlayers($mysqli);
    } // if
  } // pollForAnswers
  
  function updateState($mysqli)
  {
    $sql = "UPDATE hosts SET state = ? WHERE host_id = ?;";
    sqlWithoutResult2($mysqli, $sql, $_GET["s"], $_GET["h"]);
    if($_GET["s"] == "question")
    {
      clearAnswers($mysqli);
      $sql = "UPDATE hosts SET current_question_id = ? WHERE host_id = ?;";
      sqlWithoutResult2($mysqli, $sql, $_GET["q"], $_GET["h"]);
    } // if
    else if($_GET["s"] == "outro")
    {
      echo "1";
    }
  } // updateState
