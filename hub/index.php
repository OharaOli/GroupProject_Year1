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

    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        $quizCode = $_POST['quizCode'];
        
    }

    //https://stackoverflow.com/questions/5373780/how-to-catch-this-error-notice-undefined-offset-0
    //^ code to help with catching 'notices' (undefined variable notice)
    set_error_handler('exceptions_error_handler');

    function exceptions_error_handler() 
    {
        //Temporarily login page, SHOULD BE CHANGED TO MAIN INDEX PAGE
        header("Location: ../");
        exit();   
    }

    $username = $_SESSION['username'];
    $userIDList = mysqli_fetch_assoc(sqlWithResult1($mysqli, "SELECT user_id FROM users WHERE username= (?);", $username));
    $user_id = $userIDList['user_id'];

    $quizCodeList = mysqli_fetch_assoc(sqlWithResult1($mysqli, "SELECT quizCode FROM users WHERE username= (?);", $username));
    $quizCode = $quizCodeList['quizCode'];

    $quizIDandNameList = sqlWithResult1($mysqli, "SELECT quiz_id, name FROM quizzes WHERE user_id = (?);", $user_id);

?>
 
<!DOCTYPE HTML>
<html lang ="en">  
<head>
      <title>Hub</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="./hub.js"> </script>
</head>
<body>
<h1>The Hub. </h1>
<div = id="QuizCode"></div>
    <?php
      echo "<script> $('#QuizCode').append('<h2> Quiz Code: " . $quizCode . "</h2>'); </script>"; 
    ?>

    <form id = "quizCodeForm" method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" >
    </form>

    <button onclick="showQuizCodeForm()" id="initialQuizCodeButton"> Change Quiz Code </button>
<br />
<!--REDIRECTION SHOULD BE CHANGED TO THE QUIZ CREATOR PAGE-->
<form method="post" action="../">
<input type="submit" name = "Create New" value = "CREATE NEW">
</form>
<div id="Quiz_List"></div>
<?php     
while($row = $quizIDandNameList ->fetch_assoc())
 {
        echo   '<script> placeQuiz(' . $row['quiz_id'] . ", '" . $row['name'] . "');</script>";
}
?>
</body>
</html>
