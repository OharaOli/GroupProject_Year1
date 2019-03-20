<?php

//include("config.php");

  require_once('../misc/config.inc.php');

  // Connect to the database
  $mysqli = new mysqli($database_host, $database_user,
                       $database_pass, $group_dbnames[0]);

$stmt = $mysqli->prepare("INSERT INTO test (test1, test2) VALUES (?,?);");
$stmt->bind_param("ss", $_POST["quizName"], $_POST["question"]);
$stmt->execute();
$last_quiz_id = mysqli_insert_id($mysqli);
$stmt->close();

echo "Quiz created " . $last_quiz_id;

$mysqli->close();

?>




