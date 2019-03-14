<?php 
  session_start();
  // Redirects to hub if logged in.
  if (isset($_SESSION['username']))
  {
    header("Location: ./hub");
    exit();
  } // if
?>

<!DOCTYPE HTML>
<!--
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<html>
	<head>
  	<!-- Landing page for the web app -->
		<title>Quiz Mapp</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<script src="misc/checkMobile.js"></script>
		<link rel="stylesheet" href="styling/assets/css/main.css" />
    <link rel="stylesheet" href="styling/assets_custome/css/custome.css" />
		<noscript><link rel="stylesheet" href="styling/assets/css/noscript.css" /></noscript>
	</head>
	<body class="is-preload landing">
		<div id="page-wrapper">

			<!-- Header -->
				<header id="header">
					<h1 id="logo"><a>QuizMapp</a></h1>
					<nav id="nav">
						<ul>
						  <!-- A button to redirect user to the sign up page -->
							<li><a href="./signup">Sign Up</a></li>
							<!-- A button to redirect the user to the login page -->
							<li><a href="./login" class="button primary">Login</a></li>
						</ul>
					</nav>
				</header>

			<!-- Banner -->
				<section id="banner">
					<div class="content">
						<header>
								<span class="resize"><img src="styling/images/poster/posterLogo.png"  alt="" /></span>
								<!-- Button to redirect the payer to the join a quiz without logging in -->
								<h2>Click To Play!</h2>
	              <a href="./player" type="submit" class="button primary fit small">Play</a>
						</header>
					</div>
				</section>


		<!-- Scripts -->
			<script src="styling/assets/js/jquery.min.js"></script>
			<script src="styling/assets/js/jquery.scrolly.min.js"></script>
			<script src="styling/assets/js/jquery.dropotron.min.js"></script>
			<script src="styling/assets/js/jquery.scrollex.min.js"></script>
			<script src="styling/assets/js/browser.min.js"></script>
			<script src="styling/assets/js/breakpoints.min.js"></script>
			<script src="styling/assets/js/util.js"></script>
			<script src="styling/assets/js/main.js"></script>

	</body>
</html>
