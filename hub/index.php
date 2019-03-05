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
        header("Location: ../");
        exit();   
    }
    // get the username from login or sign up
    $username = $_SESSION['username'];
     // error if the user has put an invalid quiz code
     $quizCodeEntryError = "";
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        $quizCode = $_POST['quizCode'];
       // if the quiz code is  not letters or a mixture of letters and numbers and not equal to 6
       if (!preg_match("/^[a-zA-Z0-9]*$/",$quizCode) or strlen($quizCode)  != 6) 
       {
          // error in the quiz code
         $quizCodeEntryError = "Your quiz code needs to have no special characters and has to be 6 characters long ";
      } // if 
      else
      {
            //Try to fetch the quizcode from the database and if it returns something other than an empty list, that means username exists
            $result = mysqli_fetch_assoc(sqlWithResult1($mysqli, "SELECT quizCode FROM users WHERE quizCode=(?);", $quizCode));

           // if quiz code exists put in an error
            if ($result != '')
                $quizCodeEntryError   = "The quiz code already exists.";
           else 
              //Insert the username and password into database
             sqlWithoutResult2($mysqli, "UPDATE users SET quizCode=(?) WHERE username=(?);", strtoupper($quizCode),$username);
           

       } // else
        
   } // if




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
<div = id="QuizCodeDiv"></div>
    <?php
      echo "<script> $('#QuizCodeDiv').append('<h2> Quiz Code: " . $quizCode . "</h2>'); </script>"; 
    ?>

    <form id = "quizCodeForm" method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" >
    </form>

    <button onclick="showQuizCodeForm()" id="initialQuizCodeButton"> Change Quiz Code </button>
<br />

<?php 
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        if ($quizCodeEntryError != '')
            echo $quizCodeEntryError;
    }//if
?>

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
