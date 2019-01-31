<?php
  // Load the configuration file containing your database credentials
  require_once('config.inc.php');

  // Create connection
  $mysqli = new mysqli($database_host, $database_user, 
                       $database_pass, $group_dbnames[0]);
  // Check connection
  if ($mysqli->connect_error) 
    die("Connection failed");
    
  $insertStatement = "INSERT INTO player_test (game_id) VALUES (1)";
  $mysqli->query($insertStatement);
  $mysqli -> close();
?>

<!DOCTYPE HTML>
<html>
  <head>
    <title>Player Connect Test</title>
  </head>
  <body>
    <p>Check the host screen. If it changes from "Waiting for player..."
       to "Player connected!" then this test was a success.</p>
  </body>
</html>
