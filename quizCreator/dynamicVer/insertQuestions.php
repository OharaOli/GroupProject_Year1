<?php

//include("config.php");

  require_once('../../misc/config.inc.php');

  // Connect to the database
  $mysqli = new mysqli($database_host, $database_user,
                       $database_pass, $group_dbnames[0]);


$stmt = $mysqli->prepare("INSERT INTO questions (quiz_id, order_num, text) VALUES (?,?,?);");
$stmt->bind_param("iis", $_POST["quiz_id"], $_POST["relatedNodeID"], $_POST["question"]);
$stmt->execute();
$last_question_id = mysqli_insert_id($mysqli);
$stmt->close();

echo $last_question_id;
$mysqli->close();

?>


