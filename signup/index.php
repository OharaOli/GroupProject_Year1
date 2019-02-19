<?php
session_start();

require_once('../misc/config.inc.php');
require_once("../misc/sqlFunctions.php");

$mysqli = new mysqli($database_host, $database_user,
                                        $database_pass, $group_dbname);

// Check for errors before doing anything else
if($mysqli -> connect_error) 
  die("Connection failed.");

$signupErrorMessage= "";
$username = "";
$signedUp = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") 
{
    $username = $_POST["username"];
  	if (empty($username)) 
        $signupErrorMessage = "You must enter a username."; 
	else 
  	{
        $username = trim($username);
        // check if name only contains letters, numbers and whitespace
        //Regex taken from https://www.w3schools.com/php/php_form_url_email.asp
        if (!preg_match("/^[a-zA-Z0-9]*$/",$username) or preg_match("/^[0-9]*$/",$username) or strlen($username) < 3 or strlen($username) > 16) 
        {
            $signupErrorMessage = "The username must contain at least 1 letter, not contain special chars and be between 3 and 16 characters.";
        }//if
        else
        {
            $result = mysqli_fetch_assoc(sqlWithResult1($mysqli, "SELECT username FROM users WHERE username=(?);", $username));
            if ($result != '')
                $signupErrorMessage  = "The username already exists.";
            else
            {
                if (strlen($_POST["password"]) < 8 or strlen($_POST["password"]) > 25)
                    $signupErrorMessage = "The password length must be between 8 and 25 characters.";

                else if ($_POST["password"] == $_POST["repeatedPass"])
                {
                    $hashedPass = password_hash($_POST["password"], PASSWORD_DEFAULT);
                    //Preventing SQL injections - commands running separately
                    sqlWithoutResult2($mysqli, "INSERT INTO  users (username, password) VALUES (?, ?);", $username, $hashedPass);
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
    $_SESSION["username"] = $username;
    // redirect to welcome.php 
     header("Location: welcome.php"); 
     exit();
}  // if  

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
if ($_SERVER["REQUEST_METHOD"] == "POST" and !$signedUp)
    echo $signupErrorMessage;
 ?>
<br>
<input type="submit" name = "submit" value = "Sign up">
</form>



</body>
</html>
