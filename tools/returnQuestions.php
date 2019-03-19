<?php

require_once('../../misc/config.inc.php');

// Connect to the database
$mysqli = new mysqli($database_host, $database_user,
                     $database_pass, $group_dbnames[0]);
                       
$quizID = isset($_GET['quiz_ID']) ? $_GET['quiz_ID'] : null;

$sql = "SELECT text, x_coord, y_coord, time, feedback, question_id FROM questions WHERE quiz_id = '".$quizID."'";

$result = $mysqli->query($sql);

echo json_encode($result);
?>
