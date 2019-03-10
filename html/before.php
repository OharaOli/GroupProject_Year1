<!DOCTYPE HTML>
<!--
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<html>
	<head>
		<title>Left Sidebar - Landed by HTML5 UP</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="../styling/assets/css/main.css" />
    <link rel="stylesheet" href="../styling/assets_custome/css/custome.css" />
    <link rel="stylesheet" href="../styling/assets_custome/css/hub_custome.css" />
		<noscript><link rel="stylesheet" href="../styling/assets/css/noscript.css" /></noscript>
    <style media="screen">
    </style>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="../misc/connectToDB.js"></script>
    <script src="../player/player.js"></script>
    <script src="playerClass.js"></script>
    <script src="host.js"></script>
    <style>
    .hidden {
      display: none;
    }
    </style>
	</head>
	<body class="is-preload">
		<div id="page-wrapper">

			<!-- Header -->
				<header id="header">
					<h1 id="logo"><a href="../">QuizMapp</a></h1>
					<nav id="nav">
						<ul>
							<li><a <?php if($current == "hub") {?> class="active" <?php } ?> href="../hub/">Hub</a></li>
							<li><a <?php if($current == "host") {?> class="active" <?php } ?> href="../host/">Host</a></li>
							<li><a href="#" class="button primary">Play</a></li>
						</ul>
					</nav>
				</header>
        <!-- Main -->
          <div id="main" class="wrapper style1">
            <div class="container">
              <header class="major">
                <h2><?php echo $header ?></h2>
                <p><?php echo $desc ?></p>
              </header>
              <div class="row gtr-150">
                <div class="col-3 col-12-medium">

                  <!-- Sidebar -->
                    <section id="sidebar">
                      <div class="nav-element">
                        <a <?php if($current=="hub"){ ?> class="active" <?php } ?> href="../hub">Hub</a>
                      </div>
                      <div class="nav-element">
                        <a <?php if($current=="host"){ ?> class="active" <?php } ?> href="../host">Host</a>
                      </div>
                      <div class="nav-element">
                        <a href="#">Play</a>
                      </div>
                    </section>

                </div>
                <div class="col-9 col-12-medium imp-medium">

                  <!-- Content -->
