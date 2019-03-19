<?php

//include("config.php");

  require_once('../../misc/config.inc.php');

  // Connect to the database
  $mysqli = new mysqli($database_host, $database_user,
                       $database_pass, $group_dbnames[0]);


$stmt = $mysqli->prepare("INSERT INTO answers (question_id, text, is_correct, letter) VALUES (?,?,?,?);");
$stmt->bind_param("isis", $_POST["question_ID"], $_POST["answerText"], $_POST["isCorrect"], $_POST["letter"]);
$stmt->execute();
$stmt->close();

$mysqli->close();

?>
