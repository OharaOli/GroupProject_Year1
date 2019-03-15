<?php
    //Including the files
    require_once('../misc/config.inc.php');
    require_once("../misc/sqlFunctions.php");

    session_start();

    if(!isset($_SESSION['username']))
    {
      header("Location: ../");
      exit();
    } // if

    //opening  connection to database
    $mysqli = new mysqli($database_host, $database_user,
                                            $database_pass, $group_dbnames[0]);

    // Check for errors before doing anything else
    if($mysqli -> connect_error)
      die("Connection failed.");

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
  <title>Hub</title>
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
  </style>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="../misc/connectToDB.js"></script>
  <script src="../player/player.js"></script>

  <!-- these do not seem to be used -->
  <!--
  <script src="playerClass.js"></script>
  <script src="host.js"></script>
  -->

</head>
<body class="is-preload">
  <div id="page-wrapper">

			<!-- Header -->
				<header id="header">
					<h1 id="logo"><a>QuizMapp</a></h1>
					<nav id="nav">
						<ul>
							<!-- A button to redirect the user to the login page -->
							<li><form action="index.php" method="post">
    <li><a href="../player">Play</a></li>
    <li><input class="button primary small" type="submit" name="logout" value="Logout" /></li>
      
</form></li>
<?php
    if($_SERVER['REQUEST_METHOD'] == "POST" and isset($_POST['logout']))
    {
        func();
    }
    function func()
    {
     // destroy the session
     session_destroy();
     header("Location: ../");
     exit();
    }
?>
						</ul>
					</nav>
				</header>

      <!-- Main -->
        <div id="main" class="wrapper style1">
          <div class="container">
            <header class="major">
              <h2>Welcome to the Hub!</h2>
              <p>Here you can host and manage your quizzes.</p>
              <!--If there is an error caused by the changing of the quiz code, echo an error-->
            </header>
            <?php
                if ($_SERVER["REQUEST_METHOD"] == "POST")
                {
                    if ($quizCodeEntryError != ''){
                          echo "<h3 class='codeErrorLine'>" .$quizCodeEntryError. "</h3>";
                    }
                }//if
            ?>

            <!-- <h2>Quiz Code: <?php# echo  $quizCode?></h2> -->
            <?php
              //echo "<script> $('#QuizCodeDiv').append('<h2> Quiz Code: " . $quizCode . "</h2>'); </script>";
            ?>

<div id="QuizCodeDiv"></div>

<!--Allow the user to change the quiz code-->
    <!-- <form id = "quizCodeForm" method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" >
      <span>You can choose any 6 character Quiz Code that is not taken</span>
      <input type="text" name="quizCode" value="<?php echo  $quizCode ?>">
      <input class="button primary" type="submit" name="submitCode" value="Change Quiz Code">
    </form> -->

<!-- <button class="button primary" onclick="showQuizCodeForm()" id="initialQuizCodeButton">CHANGE QUIZ CODE</button>

<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        if ($quizCodeEntryError != '')

            echo "<h3>" .$quizCodeEntryError. "</h3>";
    }//if
?>

<!--div id="Quiz_List"></div-->
<div id="quizzesTable">
    <div id='changeQuizIdRow'>
      <form id = "quizCodeForm " style="width:100%" method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" >
        <div class='row gtr-0' id="no-border">
          <div class='col-8 col-12-medium'>
            <h3 class='right'>Your Quiz Code: <span> <?php echo $quizCode ?> </span></h3> 
          </div>
          <div class='col-2 col-12-medium'>
            <input type="text" name="quizCode" value="<?php echo  $quizCode ?>">
          </div>
          <div class='col-2 col-12-medium'>
            <input class="button primary" type="submit" name="submitCode" value="Change Quiz Code">
          </div>
        </div>
      </form>
    </div>

<?php
$count = 0;
while($row = $quizIDandNameList ->fetch_assoc())
 {
   echo
   "<div class='row gtr-0' id='row-" . $count . "'>";
   echo
   "<script>placeQuiz(" . $row['quiz_id'] . ",'" . $row['name'] . "', '" . $quizCode . "', " . $count . ")</script>";
   echo
   "</div>";
   $count += 1;
 }

        // echo   "<tr class='Table_Row' id='row-" . $count . "'>
        // <script> placeQuiz(" . $row['quiz_id'] . ",'" . $row['name'] . "', '" . $quizCode . "', " . $count . ");</script>
        // </tr>";
?>

</div>
<!--REDIRECTION SHOULD BE CHANGED TO THE QUIZ CREATOR PAGE-->
<form method="post" action="../">
<input class="button primary right" type="submit" name = "Create New" value = "Create New">
</form>
  </div><!--  close main -->
</body>
</html>
