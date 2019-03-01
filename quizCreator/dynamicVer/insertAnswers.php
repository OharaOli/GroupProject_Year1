<?php

//include("config.php");

  require_once('../../misc/config.inc.php');

  // Connect to the database
  $mysqli = new mysqli($database_host, $database_user,
                       $database_pass, $group_dbnames[0]);


$stmt = $mysqli->prepare("INSERT INTO answers (question_id, text, feedback, is_correct, letter) VALUES (?,?,?,?,?);");
$stmt->bind_param("issis", $_POST["question_id"], $_POST["answer"], $_POST["description"], $_POST["switchBit"], $_POST["letter"]);
$stmt->execute();
$stmt->close();

echo "Quiz created!";
$mysqli->close();

?>




