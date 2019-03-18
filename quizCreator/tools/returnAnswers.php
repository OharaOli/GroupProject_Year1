<?php

require_once('../../misc/config.inc.php');

// Connect to the database
$mysqli = new mysqli($database_host, $database_user,
                     $database_pass, $group_dbnames[0]);
                       
$questionID = isset($_GET['question_ID']) ? $_GET['question_ID'] : null;

$sql = "SELECT x_coord, y_coord, text, is_correct, letter FROM answers WHERE question_id = '".$questionID."'";

$result = $mysqli->query($sql);

echo json_encode($result);
?>
