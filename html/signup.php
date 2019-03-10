<!DOCTYPE html>
<html lang="en">
<head>
	<title>Login V10</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
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
