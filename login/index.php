<?php
// start session for the login page
session_start();
require_once('../misc/config.inc.php');

$mysqli = new mysqli($database_host, $database_user,
                                        $database_pass, $group_dbname);

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
                $sql_get = "SELECT Username FROM users WHERE Username=\"$username\";";
                $sql_execute = $mysqli->query($sql_get);
                $result = $sql_execute -> fetch_assoc();
               // if username does not exist echo an error
                if ($result == "")
                    $loginError  = "No such username";
                else
                {
                    // if username is present in the system, then check database for the password
                    $sql_get_pass = "SELECT Password FROM users WHERE Username=\"$username\";";
                    $encryptedPass = ( $mysqli->query($sql_get_pass) -> fetch_assoc());

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
 }
   // if password input is empty, inform the user
  	if (empty($_POST["password"]))
    	  $loginError = "The password field is empty!"; 
	else 
  	{
       // send the entered password to the webpage itself
        $enteredPassword = $_POST["password"];
     } // else

} //  if ($_SERVER["REQUEST_METHOD"] == "POST") 

// if login success is true, then redirect page to welcome page
 if ($loginSuccess)
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
      <title>Login</title>


</head>
<body id="form">


<h1>LOGIN PAGE!</h1>
<!-- I redirect to the index page if there is an error -->
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
<!-- Input the people's name and password here, and output an error if it is false -->
Username: <input type="text" name="username">

<br><br>
<!-- Value defines the initial value of the field -->
Password: <input type="password" name="password" value="">
<br>
<?php
// check if loginSuccess is true after user inputs data
if ($_SERVER["REQUEST_METHOD"] == "POST") 
{
  // if login data is false, echo the the login error
  if (!$loginSuccess)
    echo $loginError;
}
?>
<br><br>
<input type="submit" name = "submit" value = "Login">

</form>



</body>
</html>
