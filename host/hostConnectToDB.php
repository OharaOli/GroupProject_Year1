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
    
   // Updates the time if the action is not inserting the initial host entry. 
  if($_GET["a"] != "gh")
    updateTime($mysqli);
   
  // Runs the correct function depending on the type of action.
  switch($_GET["a"])
  {
    // Insert new host and get host ID and number of questions..
    case "ghnq": 
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
    $updateTime = $mysqli->prepare("UPDATE hosts SET time_since_start = ? "
                                                                . "WHERE host_id = ?;");
    $updateTime->bind_param("ss", $_GET["t"], $_GET["h"]);
    $updateTime->execute();
    $updateTime->close(); 
  } // updateTime
  
  function insertNewHost($mysqli)
  {
    $insertNewHost = $mysqli->prepare("INSERT INTO hosts (quiz_code, quiz_id)  "
                                                                   .  "VALUES (?, ?);");
    $insertNewHost->bind_param("ss", $_GET["c"], $_GET["q"]);
    $insertNewHost->execute();
    echo  mysqli_insert_id($mysqli);
    $insertNewHost->close();
    $getNumQuestions = $mysqli->prepare("SELECT * FROM questions "
                                                                           . "WHERE quiz_id = ?;");
    $getNumQuestions->bind_param("s", $_GET["q"]);
    $getNumQuestions->execute();
    echo "\n" . $getNumQuestions->get_result()->num_rows;
    $getNumQuestions->close();
  } // insertNewHost
  
  function pollForPlayers($mysqli)
  {
    $pollPlayers = $mysqli->prepare("SELECT player_id, screen_name, "
                                                             . "time_since_start FROM players WHERE "
                                                             . "host_id = ? AND connected = 1;");
    $pollPlayers->bind_param("s", $_GET["h"]);
    $pollPlayers->execute();
    $pollResult =  $pollPlayers->get_result();
    if($pollResult->num_rows > 0)
    {
      // Echos out the first line so that the new lines are in the right place.
      $firstRow = $pollResult -> fetch_assoc();
      echo $firstRow["player_id"] . "," . $firstRow["screen_name"] . "," . 
                  $firstRow["time_since_start"];
      // Outputs all the other lines.
      while($row = $pollResult->fetch_assoc())
        echo "\n" . $row["player_id"] . "," . $row["screen_name"] . "," . 
                  $row["time_since_start"];
      } // if
    $pollPlayers->close();
  } // pollForPlayers
  
  function disconnectPlayer($mysqli)
  {
    $disconnectPlayer = $mysqli->prepare("UPDATE players SET connected = 0 "
                                                                        . "WHERE player_id = ?;");
    $disconnectPlayer->bind_param("s", $_GET["p"]);
    $disconnectPlayer->execute();
    $disconnectPlayer->close();
  }
  
  function pollForAnswer($mysqli)
  {
    $pollAnswers = $mysqli->prepare("SELECT player_id, answer "
                                                                . "FROM players WHERE "
                                                                . "host_id = ? AND connected = 1 "
                                                                . " AND answer <> '-';");
    $pollAnswers->bind_param("s", $_GET["h"]);
    $pollAnswers->execute();
    $pollResult = $pollPlayers->get_result();
    if($pollResult->num_rows > 0)
    {
      $firstRow = $pollResult->fetch_assoc();
      echo $firstRow["player_id"] . "," . $firstRow["answer"];
      while($row = $pollResult->fetch_assoc())
        echo "\n" .  $row["player_id"] . "," . $row["answer"]; 
    } // if
    $pollAnswers->close();
  }
  
  function updateState($mysqli)
  {
    $updateState = $mysqli->prepare("UPDATE hosts SET state = ? "
                                                                . "WHERE host_id = ?;");
    $updateState->bind_param("ss", $_GET["s"], $_GET["h"]);
    $updateState->execute();
    $updateState->close();
    if($_GET["s"] == "question")
      outputQuestion($mysqli);
  } // updateState
  
  function outputQuestion($mysqli)
  {
      $clearPlayerAnswers = $mysqli->prepare("UPDATE players SET answer = <> "
                                                                               . " WHERE host_id = ?;");
      $clearPlayerAnswers->bind_param("s", $_GET["h"]);
      $clearPlayerAnswers ->execute();
      $clearPlayerAnswers->close();
      
      $selectQuestionText = $mysqli->prepare("SELECT question_id, text "
                                                                              . "FROM questions "
                                                                              . "WHERE quiz_id = ? AND "
                                                                              . "order_num = ?;");
      $selectQuestionText->bind_param("ss", $_GET["q"], $_GET["n"]);
      $selectQuestionText->execute();
      $selectQuestionData = $selectQuestionText->get_results()->fetch_assoc();
      $questionID = $selectQuestionData["question_id"];
      echo $selectQuestionData["text"];
      $selectQuestionText->close();
      
      $selectCorrectAnswer = $mysqli->prepare("SELECT letter FROM answers "
                                                                                . "WHERE question_id = ? AND "
                                                                                . "is_correct = 1;");
      $selectCorrectAnswer->bind_param("s", $questionID);
      $selectCorrectAnswer->execute();
      echo $selectCorrectAnswer->get_result()->fetch_assoc()["letter"];
      $selectCorrectAnswer->close();
      
      $selectAnswersText = $mysqli->prepare("SELECT text FROM answers "
                                                                           . "WHERE question_id = ? "
                                                                           . "ORDER BY letter;");
      $selectAnswersText->bind_param("s", $questionID);
      $selectAnswersText->execute();
      $selectAnswersResult = $selectAnswerText->get_result();
      $firstRow = $selectAnswersResult -> fetch_assoc();
      echo $firstRow["text"];
      // Outputs all the other answers
      while($row = $selectAnswersResult->fetch_assoc())
        echo "\n" . $row["text"];
      $selectAnswersText->close();
  } // outputQuestion
?>
