<?php

require_once('../../misc/config.inc.php');

// Connect to the database
$mysqli = new mysqli($database_host, $database_user,
                     $database_pass, $group_dbnames[0]);

$questionID = isset($_GET['question_ID']) ? $_GET['question_ID'] : null;

$sql = "SELECT text, is_correct, letter FROM answers WHERE question_id='$questionID'";
$result = $mysqli->query($sql);
while ( $row = $result->fetch_assoc() ) {
$rows[] = $row;
}
echo json_encode($rows);
?>
