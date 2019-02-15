<?php

require_once('../misc/config.inc.php');

$mysqli = new mysqli($database_host, $database_user,
                                        $database_pass, $group_dbname);

// Check for errors before doing anything else
if($mysqli -> connect_error) 
  die("Connection failed.");

$loginError = "";
$username = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") 
{
    $username = $_POST["username"];
  	if (empty($username)) 
        $loginError = "You must enter a username."; 
	else 
  	{
        $username = trim($username);
        // check if name only contains letters and whitespace
        //Regex taken from https://www.w3schools.com/php/php_form_url_email.asp
        if (!preg_match("/^[a-zA-Z0-9]*$/",$username) or preg_match("/^[0-9]*$/",$username)) 
        {
            echo "Wrong";
            $loginError = "This username does not exist.";
        }//if
        else
        {
            $sql_get = "SELECT Username FROM Users WHERE Username=\"$username\";";
            $result = mysqli_fetch_assoc($mysqli->query($sql_get));
            if ($result == '')
                $loginError  = "No such username";
            else
            {
                $sql_get_pass = "SELECT Password FROM Users WHERE Username=\"$username\";";
                $encryptedPass = ( $mysqli->query($sql_get_pass) -> fetch_assoc());

                if (!password_verify( $_POST["password"], $encryptedPass['Password']))
                    echo "Password is wrong. Try again you moron!";
                else
                    echo "Password correct.";
            }//else
        }//else
  	}
 
  	if (empty($_POST["password"]))
    	$loginError = "The password field is empty!"; 
	else 
  	{
        $enteredPassword = $_POST["password"];
    }
}

//Function taken from https://www.w3schools.com/php/php_form_validation.asp
function test_input($data) 
{
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
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
<!-- Input the people's name and email here, and output an error if it is false -->
Username: <input type="text" name="username">

<br><br>
<!-- Value defines the initial value of the field -->
Password: <input type="password" name="password" value="">
<br><br>
<input type="submit" name = "submit" value = "Login">

</form>



</body>
</html>
