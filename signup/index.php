<?php
//starts session
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

$signupErrorMessage= "";
$username = "";
$signedUp = false;

//If the webpage has been refreshed with details submitted from a form
if ($_SERVER["REQUEST_METHOD"] == "POST") 
{
    //Set username variable to the username sent friom the form
    $username = $_POST["username"];

    //Username must not be empty
  	if (empty($username)) 
        $signupErrorMessage = "You must enter a username."; 
	else 
  	{
        // check if name only contains letters and numbers and it is not JUST numbers and it is between 3 and 16 characters long 
        //Regex taken from https://www.w3schools.com/php/php_form_url_email.asp
        if (!preg_match("/^[a-zA-Z0-9]*$/",$username) or preg_match("/^[0-9]*$/",$username) or strlen($username) < 3 or strlen($username) > 16) 
        {
            $signupErrorMessage = "The username must contain at least 1 letter, not contain special chars and be between 3 and 16 characters.";
        }//if
        else
        {
            //Try to fetch the username from the database and if it returns something other than an empty list, that means username exists
            $result = mysqli_fetch_assoc(sqlWithResult1($mysqli, "SELECT username FROM users WHERE username=(?);", $username));

            if ($result != '')
                $signupErrorMessage  = "The username already exists.";
            else
            {
                //Make sure the password is between 8 and 25 characters
                if (strlen($_POST["password"]) < 8 or strlen($_POST["password"]) > 25)
                    $signupErrorMessage = "The password length must be between 8 and 25 characters.";

                //Make sure that the password and repeated password are the same
                else if ($_POST["password"] == $_POST["repeatedPass"])
                {
                    //Encrypt password
                    $hashedPass = password_hash($_POST["password"], PASSWORD_DEFAULT);
                    //Insert the username and password into database

                    //Sign up has been successful
                    $signedUp = true;
                }//else if

                else
                    $signupErrorMessage = "The passwords do not match.";
            }//else
        }//else
  	}//else
}//if

// if login success is true, then redirect page to welcome page
 if ($signedUp)
 { 
    $quizNumber = generateRandomNumber($mysqli);
    $_SESSION["username"] = $username;
     sqlWithoutResult3($mysqli, "INSERT INTO  users (username, password, quizCode) VALUES (?, ?,?);", $username, $hashedPass,$quizNumber);
     //redirect to welcome.php 
     header("Location: ../hub/index.php"); 
     exit();
}  // if  

function generateRandomNumber($mysqli)
{
  $gotValidQuizCode = false;
  while (! $gotValidQuizCode) 
  {
    $randomNumber = rand(0,999999);
    $randomNumber  = str_pad($randomNumber, 6 ,'0', STR_PAD_LEFT);
    $result = mysqli_fetch_assoc(sqlWithResult1($mysqli, "SELECT quizCode FROM users WHERE quizCode=(?);", $randomNumber));
     if ($result == "")
        $gotValidQuizCode = true;
  }
  return  $randomNumber ;
}

?>

<!DOCTYPE HTML>
<html lang ="en">  
<head>
      <title>Signup</title>
</head>
<body id="form">


<h1>SIGNUP PAGE!</h1>
<!-- I redirect to the index page if there is an error -->
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
<!-- Input the people's name and email here, and output an error if it is false -->
Username: <input type="text" name="username">
<br><br>
<!-- Value defines the initial value of the field -->
Password: <input type="password" name="password" value="">
<br><br>
Re-Enter Password: <input type="password" name="repeatedPass" value="">
<br><br>

<?php 
//If this is after the details have been sent, and sign up has failed
if ($_SERVER["REQUEST_METHOD"] == "POST" and !$signedUp)
    //Display the error message
    echo $signupErrorMessage;
 ?>
<br>
<input type="submit" name = "submit" value = "Sign up">
</form>
</body>
</html>
