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



    // get the user id for the user from the userID list
    $userIDList = mysqli_fetch_assoc(sqlWithResult1($mysqli, "SELECT user_id FROM users WHERE username= (?);", $username));
    $user_id = $userIDList['user_id'];
     // get the quiz code for the user
    $quizCodeList = mysqli_fetch_assoc(sqlWithResult1($mysqli, "SELECT quizCode FROM users WHERE username= (?);", $username));
    $quizCode = $quizCodeList['quizCode'];
   // get the quiz IDs list and name of quizzes from the quizzes table using the user id related to the quiz
    $quizIDandNameList = sqlWithResult1($mysqli, "SELECT quiz_id, name FROM quizzes WHERE user_id = (?);", $user_id);

?>

<!DOCTYPE HTML>
<html lang ="en">
<head>
  <title>Quiz Hub</title>
  <script src="../misc/checkMobile.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="./hub.js"> </script>
  
  <!-- bootstrap scripts and other stuff -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
  <link rel="stylesheet" href="../styling/assets/css/main.css" />
  <link rel="stylesheet" href="../styling/assets_custome/css/custome.css" />
  <link rel="stylesheet" href="../styling/assets_custome/css/hub_custome.css" />
  <noscript><link rel="stylesheet" href="../styling/assets/css/noscript.css" /></noscript>
  <style media="screen">
  #main {
    text-align: center;
  }

  </style>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="../misc/connectToDB.js"></script>
  <script src="../player/player.js"></script>

  <!-- these do not seem to be used -->
  <!--
  <script src="playerClass.js"></script>
  <script src="host.js"></script>
  -->

  <style>
  .hidden {
    display: none;
  }
  </style>
</head>
<body class="is-preload">
  <div id="page-wrapper">

    <!-- Header -->
      <header id="header">
        <h1 id="logo"><a href="../">QuizMapp</a></h1>
      </header>

      <!-- Main -->
        <div id="main" class="wrapper style1">
          <div class="container">
            <header class="major">
              <h2>Welcome to the Hub</h2>
              <p>Here You Can Manage Your Quizzes</p>
            </header>



<div id="QuizCodeDiv"></div>

    <?php
      echo "<script> $('#QuizCodeDiv').append('<h3> Quiz Code: " . $quizCode . "</h3>'); </script>";
    ?>
<!--Allow the user to change the quiz code-->
    <form id = "quizCodeForm" method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" >
    </form>

    <button class="button primary" onclick="showQuizCodeForm()" id="initialQuizCodeButton">CHANGE QUIZ CODE</button>
</br>
<!--If there is an error caused by the changing of the quiz code, echo an error-->
<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        if ($quizCodeEntryError != '')
            echo "</br><h1>" .$quizCodeEntryError. "</h1>";
    }//if
?>
</br>
<!--REDIRECTION SHOULD BE CHANGED TO THE QUIZ CREATOR PAGE-->
<form method="post" action="../">
<input class="button primary" type="submit" name = "Create New" value = "CREATE NEW">
</form>
<!--div id="Quiz_List"></div-->
<table id="quizzesTable">
<?php
$count = 0;
while($row = $quizIDandNameList ->fetch_assoc())
 {
        $count++;
        echo   "<tr class='Table_Row' id='row-" . $count . "'><script> placeQuiz(" . $row['quiz_id'] . ",'" . $row['name'] . "', '" . $quizCode . "', " . $count . ");</script></tr>";
}
?>
</table>
  </div><!--  close main -->
</body>
</html>
