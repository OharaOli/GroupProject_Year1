<!DOCTYPE HTML>
<!--
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<html>
	<head>
		<title>Landed by HTML5 UP</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="../styling/assets/css/main.css" />
    <link rel="stylesheet" href="../styling/assets_custome/css/custome.css" />
		<noscript><link rel="stylesheet" href="../styling/assets/css/noscript.css" /></noscript>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  	<script src="../misc/connectToDB.js"></script>
  	<script src="player.js"></script>

    <style>
    .hidden {
      display: none;
    }
		.answers-styling p{
			text-align: left!important;
		}
		.small{
			margin-bottom: 15px;
		}
    </style>

  </head>
	<body class="is-preload landing">
		<div id="page-wrapper">

			<!-- Header -->
				<header id="header">
					<h1 id="logo"><a>QuizMapp</a></h1>
					<nav id="nav">
						<ul>
							<li><a href="../signup">Sign Up</a></li>
							<li><a href="../login" class="button primary">Login</a></li>
						</ul>
					</nav>
				</header>

			<!-- Banner -->
				<section id="banner">
					<div class="content">
						<header>

              <div id="join-option" class="join-option-form">
								<h2>Enter to Play</h2>
	              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et</p>
	               <input id="quiz-code-player"  type="text" placeholder="Quiz Code">
							   <input id="player-screen-name" type="text" style="margin-top: 20px" placeholder="Screen Name">
	               <button id="join-button" class="button primary fit small">Join Quiz</button>
              </div>
              <!-- ss -->
              <div id="intro-container" class="hidden ">
              </div>
              <div id="q-and-a-container" class="hidden answers-styling">
                <div id="answer-button-container" class="">

									<div class="row">
										<div class="col-3 col-12-medium">
											<button value="A" class="hidden button primary fit small">A</button>
										</div>
										<div class="col-3 col-12-medium">
											<button value="B" class="hidden button primary fit small">B</button>
										</div>
										<div class="col-3 col-12-medium">
											<button value="C" class="hidden button primary fit small">C</button>
										</div>
										<div class="col-3 col-12-medium">
											<button value="D" class="hidden button primary fit small">D</button>
										</div>
									</div>

                </div>
                <p id="selected-answer-message" class="hidden"></p>
              </div>
              <div id="outro-container" class="hidden">
              </div>
              <p id="error-message-quiz-code-not-found" class="hidden">Quiz code does not exist.</p>
              <!-- ss -->
            </header>
					</div>
					<a href="#one" class="goto-next scrolly">Next</a>
				</section>

			<!-- One -->
				<section id="one" class="spotlight style1 bottom">
					<span class="image fit main"><img src="../styling/images/pic02.jpg" alt="" /></span>
					<div class="content">
						<div class="container">
							<div class="row">
								<div class="col-4 col-12-medium">
									<header>
										<h2>Odio faucibus ipsum integer consequat</h2>
										<p>Nascetur eu nibh vestibulum amet gravida nascetur praesent</p>
									</header>
								</div>
								<div class="col-4 col-12-medium">
									<p>Feugiat accumsan lorem eu ac lorem amet sed accumsan donec.
									Blandit orci porttitor semper. Arcu phasellus tortor enim mi
									nisi praesent dolor adipiscing. Integer mi sed nascetur cep aliquet
									augue varius tempus lobortis porttitor accumsan consequat
									adipiscing lorem dolor.</p>
								</div>
								<div class="col-4 col-12-medium">
									<p>Morbi enim nascetur et placerat lorem sed iaculis neque ante
									adipiscing adipiscing metus massa. Blandit orci porttitor semper.
									Arcu phasellus tortor enim mi mi nisi praesent adipiscing. Integer
									mi sed nascetur cep aliquet augue varius tempus. Feugiat lorem
									ipsum dolor nullam.</p>
								</div>
							</div>
						</div>
					</div>
				</section>

			<!-- Footer -->
				<footer id="footer">
					<ul class="icons">
						<li><a href="#" class="icon alt fa-twitter"><span class="label">Twitter</span></a></li>
						<li><a href="#" class="icon alt fa-facebook"><span class="label">Facebook</span></a></li>
						<li><a href="#" class="icon alt fa-linkedin"><span class="label">LinkedIn</span></a></li>
						<li><a href="#" class="icon alt fa-instagram"><span class="label">Instagram</span></a></li>
						<li><a href="#" class="icon alt fa-github"><span class="label">GitHub</span></a></li>
						<li><a href="#" class="icon alt fa-envelope"><span class="label">Email</span></a></li>
					</ul>
					<ul class="copyright">
						<li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
					</ul>
				</footer>

		</div>

		<!-- Scripts -->
			<script src="../styling/assets/js/jquery.min.js"></script>
			<script src="../styling/assets/js/jquery.scrolly.min.js"></script>
			<script src="../styling/assets/js/jquery.dropotron.min.js"></script>
			<script src="../styling/assets/js/jquery.scrollex.min.js"></script>
			<script src="../styling/assets/js/browser.min.js"></script>
			<script src="../styling/assets/js/breakpoints.min.js"></script>
			<script src="../styling/assets/js/util.js"></script>
			<script src="../styling/assets/js/main.js"></script>

	</body>
</html>
