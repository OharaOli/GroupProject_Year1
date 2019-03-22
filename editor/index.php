<?php
  session_start();
  if(!isset($_SESSION['username']))
    header("Location: ../");
?>

<!DOCTYPE html>
<html>
<title>
Quiz creator
</title>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
<head>
  <!-- Accessing javascript from a separate file -->

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" type="text/javascript"></script>

  <script type="text/javascript" src="./indentation.js"> </script>

  <!-- javaScript for retrieval -->
  <script type="text/javascript" src="./retrieve.js"> </script>

  <!-- javaScript for submission -->
  <script type="text/javascript" src="./submission.js"> </script>

  <!-- javaScript for deleting questions -->
  <script type="text/javascript" src="./delete.js"> </script>

  <!-- javascript related to sub questions -->
  <script type="text/javascript" src="./subQuestion.js"> </script>

  <!-- javaScript related to root questions -->
  <script type="text/javascript" src="./rootQuestion.js"> </script>

  <script type="text/javascript" src="./hideOrShow.js"> </script>

  <script type="text/javascript" src="./validation.js"> </script>

  <!-- Check phones -->
  <script src="../misc/checkMobile.js"></script>



  <!-- Accessing Css from a separate file -->
  <link rel="stylesheet" href="../styling/assets/css/main.css" />
  <link href="../styling/assets_custome/css/quizEditor_custome.css" rel="stylesheet" type="text/css">
  <noscript><link rel="stylesheet" href="styling/assets/css/noscript.css" /></noscript>
  <!-- plug-ins for dragula -->
  <script type="text/javascript" src="./node_modules/dragula/dist/dragula.js"></script>
  <link href="./node_modules/dragula/dist/dragula.css" rel="stylesheet" type="text/css">

  <body class="is-preload">
    <script>
    window.onload = function() {
      quizIDRe = <?php echo (isset($_POST['quizID']) ? json_encode($_POST['quizID']) : '0'); ?>;
      username = <?php  echo json_encode($_SESSION['username']); ?>;
      if(quizIDRe != "0")
        retrieve();
      else
        $("#quizHeader").text("NEW QUIZ NAME");
    };
  </script>
		<div id="page-wrapper">

			<!-- Header -->
				<header id="header">
					<h1 id="logo"><a href="../">QuizMapp</a></h1>
          <nav id="nav">
            <ul>
              <!-- Logout and play button -->
              <li><form action="index.php" method="post">
              <li><a href="../player">Play</a></li>
              <li><input class="button primary small" type="submit" name="logout" value="Logout" /></li>
              </form></li>

              <?php
                  if($_SERVER['REQUEST_METHOD'] == "POST" and isset($_POST['logout']))
                  {
                      func();
                  }
                  function func()
                  {
                   // destroy the session
                   session_destroy();
                   header("Location: ../");
                   exit();
                  }
              ?>
            </ul>
          </nav>
				</header>

			<!-- Banner -->
				<section id="content">
						<header>
								<!-- Button to redirect the payer to the join a quiz without logging in -->
								<h2>Quiz Editor</h2>
						</header>
            <!-- quizEditor -->
            <div id="quizEditor" data-numOfQuestions="0">
              <h3 id="changeQuizNameh2">Change your quiz name bellow</h3>
              <h2 id="quizHeader" contenteditable="true" data-quizId= "1" placeholder='required'></h2>
              <h2 class="give-me-some-space"> </h2>
              <!-- buttons for editing order and submission -->
              <!-- form tag for valiaton -->
              <form action="javascript:void(0);" method="" />
                <div id="saveBox">
                  <input type="submit" class="primary button small" value="Save" onclick="save()"> </input>
                  <p id="saveNotifier"> saved </p>
                  <p id="errorNotifier"> <p>
                </div>
                <div id="rootQDivAll">
                </div>
              <button id="addRootQButton" class="button small" style="display: block;" class="addRootQButton"  onClick="addRootQuestion(this)">
              add root question </button>
            </div> <!-- QuizEditor -->
            <div id="saveBox2">
              <input type="submit" class="primary button small" value="Save" onclick="save()"> </input>
              <p id="saveNotifier2"> saved </p>
              <p id="errorNotifier2"> <p>
            </div>

            <br/>
          </section>
    </div>
         <!-- javaScript related to drag & drop -->
         <script type="text/javascript" src="./dragAndDrop.js"> </script>
</body>


</html>
