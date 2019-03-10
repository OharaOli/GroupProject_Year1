<?php
//start session for the login page
session_start();
require_once('../misc/config.inc.php');
require_once('../misc/sqlFunctions.php');

$mysqli = new mysqli($database_host, $database_user,
                                        $database_pass, $group_dbnames[0]);

// Check for errors before doing anything else
if($mysqli -> connect_error)
  die("Connection failed.");

// initialise login error, username variables to empty and success to false
$loginError = "";
$username = "";
$loginSuccess = false;

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $username = $_POST["username"];
    // if the username entered is empty, then put an error that says the field is empty
  	if (empty($username))
          $loginError = "You must enter a username.";
	else
  	{
            $username = trim($username);
            // check if name only contains letters and whitespace
            // Regex taken from https://www.w3schools.com/php/php_form_url_email.asp
            // if the username is just numbers or not a mix of letters and numbers, then give an error
            if (!preg_match("/^[a-zA-Z0-9]*$/",$username) or preg_match("/^[0-9]*$/",$username))
            {
                $loginError = "This username does not exist.";
            }//if
            else
            {
                // if the username is valid, then check from db users if the username exists.
                $sql_get = "SELECT Username FROM users WHERE Username=(?);";
               // get the password which matches the username
                $result = mysqli_fetch_assoc(sqlWithResult1($mysqli ,$sql_get, $username));
               // if username does not exist echo an error
                if ($result == "")
                    $loginError  = "No such username";
                else
                {
                    // if username is present in the system, then check database for the password
                    $sql_get_pass = "SELECT Password FROM users WHERE Username=(?);";
                    // get the encrypted password form the database and put it ot he variable encryptedPass
                    $encryptedPass = mysqli_fetch_assoc(sqlWithResult1($mysqli ,$sql_get_pass, $username));

                    // encrypt the password that was input by the user, then compare with the encypted password in DB
                    if (!password_verify( $_POST["password"], $encryptedPass['Password']))
                       // if encrypted paswords don't match, then give an error
                        $loginError = "Password is wrong. Try again you moron!";
                    // if the password matches, then set boolean variable to be true
                    else
                    {
                       $loginSuccess = true;
                    } //else
                 } // else
  	      } // else
     }//else
   // if password input is empty, inform the user
} //  if ($_SERVER["REQUEST_METHOD"] == "POST")

// if login success is true, then redirect page to welcome page
 if ($loginSuccess)
 {
    $_SESSION["username"] = $username;
    // redirect to welcome.php
     header("Location: ../hub/index.php");
     exit();
}  // if


?>
<?php include '../html/login.php';?>
