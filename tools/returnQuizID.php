<?php

require_once('../../misc/config.inc.php');

// Connect to the database
$mysqli = new mysqli($database_host, $database_user,
                     $database_pass, $group_dbnames[0]);

$quizName = isset($_GET['quizName']) ? $_GET['quizName'] : null;

//$sql = "SELECT quiz_id FROM quizzes WHERE name = '".$account_idinput."' AND user_id = '".$_SESSION['user_id']."'";
$var = 1;
$sql = "SELECT quiz_id FROM quizzes WHERE name='$quizName' AND user_id='$var'";
$result = $mysqli->query($sql);
$data = mysqli_fetch_assoc($result);
echo $data['quiz_id'];

$mysqli->close();
?>
