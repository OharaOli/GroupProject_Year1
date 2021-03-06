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
    
    $sql = "SELECT * FROM questions WHERE quiz_id = ?;";
    $result = sqlWithResult1($mysqli, $sql, $_GET["q"]);
    echo " \n" . $result->num_rows;
    
    $sql = "SELECT name FROM quizzes WHERE quiz_id = ?;";
    $result = sqlWithResult1($mysqli, $sql, $_GET["q"]);
    echo " \n" . $result->fetch_assoc()["name"];
  } // insertNewHost
  
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
      getQuestion($mysqli);
  } // updateState
  
  function getQuestion($mysqli)
  {
    $sql = "UPDATE players SET answer = '-' WHERE host_id = ?;";
    sqlWithoutResult1($mysqli, $sql, $_GET["h"]);  

    $sql = "SELECT question_id, text, linked_answer, time FROM questions "
                . "WHERE quiz_id = ? AND order_num = ?;";
    $result = sqlWithResult2($mysqli, $sql, $_GET["q"], $_GET["n"]);   
    $questionData = $result->fetch_assoc();
    $questionID = $questionData["question_id"];
    echo $questionData["text"];
    echo " \n" . $questionData["linked_answer"];
    echo " \n" . $questionData["time"];
   
    $sql = "SELECT letter FROM answers "
                . "WHERE question_id = ? AND is_correct = 1;";
    $result = sqlWithResult1($mysqli, $sql, $questionID);
    echo " \n" . $result->fetch_assoc()["letter"];
    while($row = $result->fetch_assoc())
      echo $row["letter"];
    
    $sql = "SELECT text, answer_id FROM answers "
                . "WHERE question_id = ? ORDER BY letter;";
    $result = sqlWithResult1($mysqli, $sql, $questionID);
    while($row = $result->fetch_assoc())
      echo " \n" . $row["text"] . " \\" .  $row["answer_id"];
  } // outputQuestion
