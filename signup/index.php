<?php
//starts session
session_start();

//Including the files
require_once('../misc/config.inc.php');
require_once("../misc/sqlFunctions.php");

if (isset($_SESSION['username']))
{
  header("Location: ../hub");
  exit();
} // if

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
     //Insert the username and password into database
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

<!DOCTYPE html>
<html lang="en">
<head>
	<title>Sign Up!</title>
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
						Sign up
					</span>

					<?php
					// check if loginSuccess is true after user inputs data
					if ($_SERVER["REQUEST_METHOD"] == "POST")
					{
						// if login data is false, echo the the login error
				
					 if (!$signedUp){
					?>
							<div class="alert alert-danger error-message" role="alert">
								<?php echo $signupErrorMessage; ?>
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

					<div class="wrap-input100 validate-input m-b-16" data-validate = "Repeat password is required">
						<input class="input100" type="password" name="repeatedPass" placeholder="Repeat Password">
						<span class="focus-input100"></span>
					</div>

					<div class="container-login100-form-btn m-t-17">
						<button class="login100-form-btn">
							Register
						</button>
					</div>

				</form>

				<div class="container-login100-form-btn m-t-17">
					<a href="../login" class="login100-form-btn">
						Log in
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

