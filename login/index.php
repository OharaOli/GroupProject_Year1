<?php
//start session for the login page
session_start();
require_once('../misc/config.inc.php');
require_once('../misc/sqlFunctions.php');

if (isset($_SESSION['username']))
{
  header("Location: ../hub");
  exit();
} // if

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
                        $loginError = "Incorrect password";
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
    header( 'Location: ../hub' );
    exit();
}  // if  



?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Login</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="misc/checkMobile.js"></script>
<!--===============================================================================================-->
	<link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../styling/login_assets/vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../styling/login_assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../styling/login_assets/fonts/Linearicons-Free-v1.0.0/icon-font.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../styling/login_assets/vendor/animate/animate.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../styling/login_assets/vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../styling/login_assets/vendor/animsition/css/animsition.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../styling/login_assets/vendor/select2/select2.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../styling/login_assets/vendor/daterangepicker/daterangepicker.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="../styling/login_assets/css/util.css">
	<link rel="stylesheet" type="text/css" href="../styling/login_assets/css/main.css">
<!--===============================================================================================-->
<style media="screen">
	.error-message{
		width: 100%;
		text-align: center;
	}
</style>
</head>
<body>

	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100 p-t-50 p-b-90">

				<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" class="login100-form validate-form flex-sb flex-w">
					<span class="login100-form-title p-b-51">
						Login
					</span>

					<?php
					// check if loginSuccess is true after user inputs data
					if ($_SERVER["REQUEST_METHOD"] == "POST")
					{
						// if login data is false, echo the the login error
					 if (!$loginSuccess){
					?>
							<div class="alert alert-danger error-message" role="alert">
								<?php echo $loginError; ?>
							</div>
					<?php
						} // if
					}
					?>

					<div class="wrap-input100 validate-input m-b-16" data-validate = "Username is required">
						<input class="input100" type="text" name="username" placeholder="Username">
						<span class="focus-input100"></span>
					</div>


					<div class="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
						<input class="input100" type="password" name="password" placeholder="Password">
						<span class="focus-input100"></span>
					</div>

					<div class="flex-sb-m w-full p-t-3 p-b-24">
						<div class="contact100-form-checkbox">
							<input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
						</div>
					</div>

					<div class="container-login100-form-btn m-t-17">
						<button class="login100-form-btn">
							Login
						</button>
					</div>

				</form>

				<div class="container-login100-form-btn m-t-17">
					<a href="../signup" class="login100-form-btn">
						Sign Up
					</a>
				</div>
			</div>
		</div>
	</div>


	<div id="dropDownSelect1"></div>

<!--===============================================================================================-->
	<script src="../styling/login_assets/vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="../styling/login_assets/vendor/animsition/js/animsition.min.js"></script>
<!--===============================================================================================-->
	<script src="../styling/login_assets/vendor/bootstrap/js/popper.js"></script>
	<script src="../styling/login_assets/vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="../styling/login_assets/vendor/select2/select2.min.js"></script>
<!--===============================================================================================-->
	<script src="../styling/login_assets/vendor/daterangepicker/moment.min.js"></script>
	<script src="../styling/login_assets/vendor/daterangepicker/daterangepicker.js"></script>
<!--===============================================================================================-->
	<script src="../styling/login_assets/vendor/countdowntime/countdowntime.js"></script>
<!--===============================================================================================-->
	<script src="../styling/login_assets/js/main.js"></script>

</body>
</html>
