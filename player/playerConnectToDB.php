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
      insertAnswers($mysqli); 
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
                                                                                . ", quiz_id FROM hosts "
                                                                                . "WHERE quiz_code = ? AND "
                                                                                . "state = 'intro' ORDER BY "
                                                                                . "host_id DESC LIMIT 1;");
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
    $hostStateData = $checkQuizCodeResults->fetch_assoc();
    $hostID =  $hostStateData["host_id"];
    // Outputs the host ID and the time since start.
    echo $hostID . "\n";
    echo $hostStateData["time_since_start"] . "\n";
    echo $hostStateData["quiz_id"] . "\n";
   //echo $checkQuizCodeResults->fetch_assoc()["time_since_start"];
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
  // Will also return the player's current score if the state is feedback.hp
  function pollForState($mysqli)
  {
    // Gets the state and time since start of the host.
    $pollForState = $mysqli->prepare("SELECT state, time_since_start "
                                                                . "FROM hosts "
                                                                . "WHERE host_id = ?;");
    // Binds the host ID h.
    $pollForState->bind_param("s", $_GET["h"]);
    $pollForState->execute();
    $pollForStateResult = $pollForState->get_result();
    $hostStateData = $pollForStateResult->fetch_assoc();
    // Saves the host state
    $hostState = $hostStateData["state"];
    // Outputs the state and time since start.
    echo $hostState . "\n";
    echo $hostStateData["time_since_start"];
    // If the host state was changed to feedback.
    if($hostState == "feedback")
    {
      outputFeedback($mysqli);
    }
    else if($hostState == "question")
      outputQuestion($mysqli);
  } // pollForState
  
  function outputFeedback($mysqli)
  {
    $selectQuestionID = $mysqli->prepare("SELECT question_id "
                                                                            . "FROM questions "
                                                                            . "WHERE quiz_id = ? AND "
                                                                            . "order_num = ?;");
    $selectQuestionID->bind_param("ss", $_GET["q"], $_GET["n"]);
    $selectQuestionID->execute();
    $selectQuestionIDResults = $selectQuestionID->get_result();
    $questionID =  $selectQuestionIDResults->fetch_assoc()["question_id"];
    $selectQuestionID->close();

    $selectPlayerAnswer = $mysqli->prepare("SELECT answer "
                                                                            . "FROM players "
                                                                            . "WHERE player_id = ?;");
    $selectPlayerAnswer->bind_param("s", $_GET["p"]);
    $selectPlayerAnswer->execute();
    $selectPlayerAnswerResult = $selectPlayerAnswer->get_result();
    $answer =  $selectPlayerAnswerResult->fetch_assoc()["answer"];
    $selectPlayerAnswer->close();
    
    $selectCorrectAnswer = $mysqli->prepare("SELECT is_correct, feedback "
                                                                              . "FROM answers "
                                                                              . "WHERE letter = ? AND "
                                                                              . " question_id = ?;");
    $selectCorrectAnswer->bind_param("ss", $answer, $questionID);
    $selectCorrectAnswer->execute();
    $selectCorrectAnswerResult = $selectCorrectAnswer->get_result();
    $selectCorrectAnswerData = $selectCorrectAnswerResult->fetch_assoc();
    echo "\n" . $selectCorrectAnswerData["is_correct"];
    echo "\n" . $selectCorrectAnswerData["feedback"];
    $selectCorrectAnswer->close();
  } // outputFeedback
  
  function outputQuestion($mysqli)
  {
     $selectQuestionText = $mysqli->prepare("SELECT question_id, text "
                                                                            . "FROM questions "
                                                                            . "WHERE quiz_id = ? AND "
                                                                            . "order_num = ?;");
    $selectQuestionText->bind_param("ss", $_GET["q"], $_GET["n"]);
    $selectQuestionText->execute();
    $selectQuestionResults = $selectQuestionText->get_result();
    $selectQuestionData = $selectQuestionResults->fetch_assoc();
    $questionID = $selectQuestionData["question_id"];
    echo "\n" . $selectQuestionData["text"];
    $selectQuestionText->close();
    
    $selectAnswersText = $mysqli->prepare("SELECT text FROM answers "
                                                                         . "WHERE question_id = ? "
                                                                         . "ORDER BY letter;");
    $selectAnswersText->bind_param("s", $questionID);
    $selectAnswersText->execute();
    $selectAnswersResult = $selectAnswersText->get_result();
    $firstRow = $selectAnswersResult -> fetch_assoc();
    echo "\n" . $firstRow["text"];
    // Outputs all the other answers
    while($row = $selectAnswersResult->fetch_assoc())
      echo "\n" . $row["text"];
    $selectAnswersText->close();
  } // outputQuestion
  
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
