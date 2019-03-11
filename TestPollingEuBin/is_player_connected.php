<?php
  //this is a stand-alone php script.
  // Load the configuration file containing your database credentials
  require_once('config.inc.php');

  // Connect to the database
  $mysqli = new mysqli($database_host, $database_user, 
                       $database_pass, $group_dbnames[0]);

  // Check for errors before doing anything else
  if($mysqli -> connect_error) 
    die("Connection failed.");

  $selectStatement = "SELECT * FROM player_test WHERE game_id = 1";

  if($result = $mysqli->query(selectStatement)) 
  {
    if($result-> num_rows > 0)
      echo 'true';
    else
      echo 'false';
    $result -> close(); // Remember to release the result set
  }
  
  // Always close your connection to the database cleanly!
  $mysqli -> close();
?>

