<?php
  if(!isset($_POST["quizCode"]) || !isset($_POST["quizID"])) // || not logged in
    header("location: ../");
?>

<!DOCTYPE html>
<html>
<head>
  <title>Host</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" type="text/javascript"></script>
  <script src="../misc/connectToDB.js" type="text/javascript"></script>
  <script src="../player/player.js" type="text/javascript"></script>
  <link rel="stylesheet" type="text/css" href="../reveal.js-master/css/reveal.css">
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="host.css">
  <style>
  .hidden {
    display: none;  
  }
  </style>
</head>
<body>





  <!--div id="host-option">
    <input id="quiz-code-host" type="text" placeholder="Quiz Code"/>
    <button id="host-button">Host Quiz</button>
  </div--> 


  <script> $(document).ready(function() {
    var quizCode = <?php echo json_encode($_POST['quizCode']); ?>;
    var quizID = <?php echo json_encode($_POST['quizID']); ?>;
    startHost(quizCode, quizID);
    });
  </script>

  <div id="intro-container">
    <h4 id="state-display"></h4>
    <h2><span style="color:#CCC;">Quiz Code:</span> <?php echo $_POST['quizCode'];?></h2>
    <button id="start-button">Start Quiz</button>
    <h4 id="number-of-players-connected">0 players are currently connected.</h4>
    <ul id="player-list">
    </ul>
  </div>
  
  <div class="reveal">
    <div class="slides">
    </div>
  </div>
  
  <!--<div id="q-and-a-container" class="hidden">
    <h3 id="timer"></h3>
    <p id="numberOfAnswers">Answers so far: 0</p>
    <button id="reveal-button">Reveal Answer</button>
    <button id="next-button">Next Question</button>
  </div>
  <div id="outro-container" class="hidden">
    <h4>this is the outro</h4>
    <ul id="score-list">
    </ul>
  </div-->
  <script src="../reveal.js-master/js/reveal.js" type="text/javascript"></script>
  <script src="host.js" type="text/javascript"></script>
</body>
</html> 
