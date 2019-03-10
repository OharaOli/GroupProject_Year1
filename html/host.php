<?php
$header = "Host page";
$desc = "Ipsum dolor feugiat aliquam tempus sed magna lorem consequat accumsan";
$current = "host";
 ?>
<?php include "before.php" ?>
<section id="content">
	<a href="#" class="image fit"><img src="../styling/images/pic05.jpg" alt="" /></a>
	<h3>Dolore Amet Consequat</h3>
	<div id="host-option">
    <input id="quiz-code-host" type="text" placeholder="Quiz Code"/>
    <button id="host-button">Host Quiz</button>
  </div>
  <div id="intro-container" class="hidden">
    <h4 id="state-display"></h4>
    <button id="start-button" class="hidden">Start Quiz</button>
    <h4 id="number-of-players-connected" class="hidden">0 players are currently connected.</h4>
    <ul id="player-list">
    </ul>
  </div>
  <div id="q-and-a-container" class="hidden">
    <h3 id="timer"></h3>
    <p id="numberOfAnswers">Answers so far: 0</p>
    <button id="reveal-button">Reveal Answer</button>
    <button id="next-button">Next Question</button>
  </div>
  <div id="outro-container" class="hidden">
    <h4>this is the outro</h4>
    <ul id="score-list">
    </ul>
  </div>
</section>

<?php include "after.php" ?>
