<?php

//include("config.php");

  require_once('../misc/config.inc.php');
  require_once("../misc/sqlFunctions.php");

  // Connect to the database
  $mysqli = new mysqli($database_host, $database_user,
                       $database_pass, $group_dbnames[0]);

$sql = "SELECT user_id FROM users WHERE username = ?;";
$result = sqlWithResult1($mysqli, $sql ,$_POST["username"]);
$userID = $result->fetch_assoc()["user_id"];
  
$quizID = $_POST["oldQuizID"] == "0" ? null : $_POST["oldQuizID"];
if($quizID != null)
{
  $sql = "DELETE FROM quizzes WHERE quiz_id = ?;";
  sqlWithoutResult1($mysqli, $sql, $quizID);

  $sql = "SELECT question_id FROM questions WHERE quiz_id = ?;";
  $result = sqlWithResult1($mysqli, $sql, $quizID);
  $sql = "DELETE FROM answers WHERE question_id = ?;";
  while($row = $result->fetch_assoc())
    sqlWithoutResult1($mysqli, $sql, $row["question_id"]);

  $sql = "DELETE FROM questions WHERE quiz_id = ?;";
  sqlWithoutResult1($mysqli, $sql, $quizID);
} // if
echo $quizID;
$stmt = "INSERT INTO quizzes VALUES (?,?,?);";
sqlWithoutResult3($mysqli, $stmt, $quizID, $_POST["quizName"], $userID);

echo mysqli_insert_id($mysqli);

$mysqli->close();

?>

