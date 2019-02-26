<?php 
    session_start(); 

    //Including the files
    require_once('../misc/config.inc.php');
    require_once("../misc/sqlFunctions.php");

    //opening  connection to database 
    $mysqli = new mysqli($database_host, $database_user,
                                            $database_pass, $group_dbnames[0]);

    // Check for errors before doing anything else
    if($mysqli -> connect_error) 
      die("Connection failed.");

    //https://stackoverflow.com/questions/5373780/how-to-catch-this-error-notice-undefined-offset-0
    //^ code to help with catching 'notices' (undefined variable notice)
    set_error_handler('exceptions_error_handler');

    function exceptions_error_handler() 
    {
        //Temporarily login page, SHOULD BE CHANGED TO MAIN INDEX PAGE
        header("Location: ../index.html");
        exit();   
    }

    $username = $_SESSION['username'];
    //sqlWithResult1($mysqli, "SELECT user_id FROM users WHERE username= ;", $username, $hashedPass);
    $list = mysqli_fetch_assoc(sqlWithResult1($mysqli, "SELECT quiz_id, name FROM quizzes WHERE users.username = (?) AND quizzes.user_id = users.user_id ;", $username));
    echo $list;
    

     
?>

<!DOCTYPE HTML>
<html lang ="en">  
<head>
      <title>Hub</title>


</head>
<body>
<h1>The Hub. </h1>
<!--REDIRECTION SHOULD BE CHANGED TO THE QUIZ CREATOR PAGE-->
<form method="post" action="../index.html">
<input type="submit" name = "CREATE NEW" value = "Create New">
</form>
</body>
</html>
