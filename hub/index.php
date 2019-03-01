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
    $list2 = mysqli_fetch_assoc(sqlWithResult1($mysqli, "SELECT user_id FROM users WHERE username= (?);", $username));
    $user_id = $list2['user_id'];
    $result = sqlWithResult1($mysqli, "SELECT quiz_id, name FROM quizzes WHERE user_id = (?);", $user_id);

?>

<!DOCTYPE HTML>
<html lang ="en">  
<head>
      <title>Hub</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="./hubButtons.js"> </script>
</head>
<body>
<h1>The QuizHub. </h1>
<!--REDIRECTION SHOULD BE CHANGED TO THE QUIZ CREATOR PAGE-->
<form method="post" action="../">
<input type="submit" name = "CREATE NEW" value = "Create New">
</form>
<div id="Quiz_List"></div>
<?php     
while($row = $result->fetch_assoc())
 {
        echo   '<script> placeQuiz(' . $row['quiz_id'] . ", '" . $row['name'] . "');</script>";
}
?>
</body>
</html>
