<?php

  require_once('../misc/config.inc.php');
  require_once("../misc/sqlFunctions.php");

  // Connect to the database
  $mysqli = new mysqli($database_host, $database_user,
                       $database_pass, $group_dbnames[0]);

$sql = "SELECT name FROM quizzes WHERE quiz_id = ?;";
$result = sqlWithResult1($mysqli, $sql, $_GET["quizID"]);

echo $result->fetch_assoc()["name"];
$mysqli->close();

?>

