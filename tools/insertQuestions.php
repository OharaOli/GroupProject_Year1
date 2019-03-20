<?php

//include("config.php");

  require_once('../misc/config.inc.php');
  
  // Connect to the database
  $mysqli = new mysqli($database_host, $database_user,
                       $database_pass, $group_dbnames[0]);

$stmt = $mysqli->prepare("INSERT INTO questions (quiz_id, text, x_coord, y_coord, time, feedback) VALUES (?,?,?,?,?,?);");
$stmt->bind_param("isiiis", $_POST["quizID"], $_POST["questionText"], $_POST["xCoord"], $_POST["yCoord"], $_POST["time"], $_POST["feedback"]);
$stmt->execute();
$last_question_id = mysqli_insert_id($mysqli);
$stmt->close();

echo $last_question_id;
$mysqli->close();

?>


