<?php 
function sqlWithoutResult1($mysqli, $sql, $param1)
{
  $preparedStatement = $mysqli->prepare($sql);
  $preparedStatement->bind_param("s", $param1);
  $preparedStatement->execute();
  $preparedStatement->close();
} // sqlWithoutResult

function sqlWithoutResult2($mysqli, $sql, $param1, $param2)
{
  $preparedStatement = $mysqli->prepare($sql);
  $preparedStatement->bind_param("ss", $param1, $param2);
  $preparedStatement->execute();
  $preparedStatement->close();
} // sqlWithoutResult

function sqlWithoutResult3($mysqli, $sql, $param1, $param2, $param3)
{
  $preparedStatement = $mysqli->prepare($sql);
  $preparedStatement->bind_param("sss", $param1, $param2, $param3);
  $preparedStatement->execute();
  $preparedStatement->close();
} // sqlWithoutResult

function sqlWithResult1($mysqli, $sql, $param1)
{
  $preparedStatement = $mysqli->prepare($sql);
  $preparedStatement->bind_param("s", $param1);
  $preparedStatement->execute();
  $result = $preparedStatement->get_result();
  $preparedStatement->close();
  return $result;
} // sqlWithResult

function sqlWithResult2($mysqli, $sql, $param1, $param2)
{
  $preparedStatement = $mysqli->prepare($sql);
  $preparedStatement->bind_param("ss", $param1, $param2);
  $preparedStatement->execute();
  $result = $preparedStatement->get_result();
  $preparedStatement->close();
  return $result;
} // sqlWithResult

function sqlWithResult3($mysqli, $sql, $param1, $param2, $param3)
{
  $preparedStatement = $mysqli->prepare($sql);
  $preparedStatement->bind_param("sss", $param1, $param2, $param3);
  $preparedStatement->execute();
  $result = $preparedStatement->get_result();
  $preparedStatement->close();
  return $result;
} // sqlWithResult
?>
