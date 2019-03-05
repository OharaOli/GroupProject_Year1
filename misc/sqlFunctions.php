<?php 
function sqlWithoutResult0($mysqli, $sql)
{
  $mysqli->query($sql);
} // sqlWithoutResult0

function sqlWithoutResult1($mysqli, $sql, $param1)
{
  $preparedStatement = $mysqli->prepare($sql);
  $preparedStatement->bind_param("s", $param1);
  $preparedStatement->execute();
  $preparedStatement->close();
} // sqlWithoutResult1

function sqlWithoutResult2($mysqli, $sql, $param1, $param2)
{
  $preparedStatement = $mysqli->prepare($sql);
  $preparedStatement->bind_param("ss", $param1, $param2);
  $preparedStatement->execute();
  $preparedStatement->close();
} // sqlWithoutResult2

function sqlWithoutResult3($mysqli, $sql, $param1, $param2, $param3)
{
  $preparedStatement = $mysqli->prepare($sql);
  $preparedStatement->bind_param("sss", $param1, $param2, $param3);
  $preparedStatement->execute();
  $preparedStatement->close();
} // sqlWithoutResult3

function sqlWithoutResult4($mysqli, $sql, 
                                                 $param1, $param2, $param3, $param4)
{
  $preparedStatement = $mysqli->prepare($sql);
  $preparedStatement->bind_param("ssss", 
                                                               $param1, $param2, $param3, $param4);
  $preparedStatement->execute();
  $preparedStatement->close(); 
} // sqlWithoutResult4

function sqlWithResult0($mysqli, $sql)
{
  return $mysqli->query($sql);
} // sqlWithResult0

function sqlWithResult1($mysqli, $sql, $param1)
{
  $preparedStatement = $mysqli->prepare($sql);
  $preparedStatement->bind_param("s", $param1);
  $preparedStatement->execute();
  $result = $preparedStatement->get_result();
  $preparedStatement->close();
  return $result;
} // sqlWithResult1

function sqlWithResult2($mysqli, $sql, $param1, $param2)
{
  $preparedStatement = $mysqli->prepare($sql);
  $preparedStatement->bind_param("ss", $param1, $param2);
  $preparedStatement->execute();
  $result = $preparedStatement->get_result();
  $preparedStatement->close();
  return $result;
} // sqlWithResult2

function sqlWithResult3($mysqli, $sql, $param1, $param2, $param3)
{
  $preparedStatement = $mysqli->prepare($sql);
  $preparedStatement->bind_param("sss", $param1, $param2, $param3);
  $preparedStatement->execute();
  $result = $preparedStatement->get_result();
  $preparedStatement->close();
  return $result;
} // sqlWithResult3

function sqlWithResult4($mysqli, $sql, $param1, $param2, $param3, $param4)
{
  $preparedStatement = $mysqli->prepare($sql);
  $preparedStatement->bind_param("ssss", 
                                                               $param1, $param2, $param3, $param4);
  $preparedStatement->execute();
  $result = $preparedStatement->get_result();
  $preparedStatement->close();
  return $result;
} // sqlWithResult4
?>
