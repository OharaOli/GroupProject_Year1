<?php

//include("config.php");

  require_once('../../misc/config.inc.php');

  // Connect to the database
  $mysqli = new mysqli($database_host, $database_user,
                       $database_pass, $group_dbnames[0]);

$var = "9";
$stmt = $mysqli->prepare("INSERT INTO quizzes (name, user_id) VALUES (?,?);");
$stmt->bind_param("si", $_POST["quizName"], $var);
$stmt->execute();
$last_quiz_id = mysqli_insert_id($mysqli);
$stmt->close();

echo $last_quiz_id;
$mysqli->close();

?>

