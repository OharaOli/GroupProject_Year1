<?php

  // Load the configuration file containing your database credentials
  require_once('config.inc.php');

  // Connect to the database
  $mysqli = new mysqli($database_host, $database_user, 
                       $database_pass, $group_dbnames[0]);

  // Check for errors before doing anything else
  if($mysqli -> connect_error) 
    die("Connection failed.");

   // Updates the time if the action is not inserting the initial host entry. 
  if($_GET["a"] != "gh")
    updateTime($mysqli);
    
    $s = "UPDATE hosts SET time_since_start = 1";
    $mysqli->query($s);

  // Runs the correct function depending on the type of action.
  switch($_GET["a"])
  {
    // Insert new host and get host ID.
    case "gh": 
      insertNewHost($mysqli);
      break; 
    // Update state.
    case "us": break;
    // Update disconnect players.
    case "dp": break; 
    // Poll for players.
    case "pfp":
      pollForPlayers($mysqli); 
      break;
    // Poll for answers.
    case "pfa": break;
  } // switch
  
  // Closes the connection to the database.
  $mysqli -> close();

  // Updates the host's time since start value in the database.
  function updateTime($mysqli)
  {  
    $updateTime = $mysqli->prepare("UPDATE hosts SET time_since_start = ? "
                                                                + "WHERE host_id = ?;");
    $updateTime->bind_param("ss", $_GET["t"], $_GET["h"]);
    $updateTime->execute();
    $updateTime->close();
  } // updateTime
  
  function insertNewHost($mysqli)
  {
    $insertNewHost = "INSERT INTO hosts (quiz_code) VALUES ('TEST1');";
    $mysqli->query($insertNewHost);
    echo mysqli_insert_id($mysqli);
  } // insertNewHost
  
  function pollForPlayers($mysqli)
  {
    $pollPlayers = $mysqli->prepare("SELECT player_id, screen_name, "
                                                             + "time_since_start FROM players WHERE "
                                                             + "host_id = ?;");
    $pollPlayers->bind_param("s", $_GET["h"]);
    $pollPlayers->execute();
    $pollResult =  $pollPlayers->get_result();
    if($pollResult->num_rows > 0)
      while($row = $result->fetch_assoc())
        echo $row["player_id"] . "," . $row["screen_name"] . "," . 
                  $row["time_since_start"];
    $pollResult->close();
    $pollPlayers->close();
  } // pollForPlayers
 
/*
  function safeSelect($selectStatement)
  {
       $selectStatement = $mysqli->prepare("SELECT * FROM ex7_users WHERE 
                                           name = ? AND email = ?");
      //the first parameter is the input types - s for string
      $selectStatement->bind_param("ss", $name, $email);
      $selectStatement->execute();
      //result of the query
      $selectResult = $selectStatement->get_result();
      $selectStatement->close();
  }
  
  function pollForPlayer()
  {
  }
  
  function pollForAnswer
  {
  }
  
  function insertNewHost()
  {
    
  }
  
  function disconnectPlayers()
  {
  }
  
  function changeState()
  {
    
  }
*/
?>
