<!DOCTYPE html>
<html>
<title>
Quiz creator
</title>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
<head>
  <!-- Accessing javascript from a separate file -->

  <!-- plug in for jQuery -->
  <script type="text/javascript" src="./jquery-3.3.1.min.js"> </script>
  <!-- plug in for jQuery connections -->
  <script type="text/javascript" src="./jquery.connections.js"> </script>

  <script type="text/javascript" src="./indentation.js"> </script>

  <!-- javaScript for submission -->
  <script type="text/javascript" src="./submission.js"> </script>

  <!-- javaScript for retrieval -->
  <script type="text/javascript" src="./retrieve.js"> </script>

<script>
quizIDRe = <?php echo  $_POST['quizID'] ?>;
</script>


  <!-- javaScript for deleting questions -->
  <script type="text/javascript" src="./delete.js"> </script>

  <!-- javascript related to sub questions -->
  <script type="text/javascript" src="./subQuestion.js"> </script>

  <!-- javaScript related to root questions -->
  <script type="text/javascript" src="./rootQuestion.js"> </script>

  <script type="text/javascript" src="./hideOrShow.js"> </script>

  <script type="text/javascript" src="./validation.js"> </script>



  <!-- Accessing Css from a separate file -->
  <link rel="stylesheet" href="../styling/assets/css/main.css" />
  <link href="../styling/assets_custome/css/quizEditor_custome.css" rel="stylesheet" type="text/css">
  <noscript><link rel="stylesheet" href="styling/assets/css/noscript.css" /></noscript>
  <!-- plug-ins for dragula -->
  <script type="text/javascript" src="./node_modules/dragula/dist/dragula.js"> </script>
  <link href="./node_modules/dragula/dist/dragula.css" rel="stylesheet" type="text/css">

  <body class="is-preload">
		<div id="page-wrapper">

			<!-- Header -->
				<header id="header">
					<h1 id="logo"><a href="../">QuizMapp</a></h1>
				</header>

			<!-- Banner -->
				<section id="content">
						<header>
								<!-- Button to redirect the payer to the join a quiz without logging in -->
								<h2>Quiz Editor</h2>
						</header>
            <!-- quizEditor -->
            <div id="quizEditor" data-numOfQuestions="0">
              <h1 id="quizHeader" contenteditable="true" data-quizId= "1" placeholder='required'>
                Lorem ipsum
              </h1>
              <!-- buttons for editing order and submission -->
                <div>
                  <input type="button" class="primary button small" value="Save" onclick="save()"> </input>
                  <input type="button" class="primary button small" value="retrieve(JavaScript-test)" onClick="retrieve()"> </input>
                </div>
                <br/>
                <div id="rootQDivAll">
                </div>
              <button id="addRootQButton" class="button small" style="display: block;" class="addRootQButton"  onClick="addRootQuestion(this)">
              add root question </button>
            </div> <!-- QuizEditor -->

            <br/>
                <!-- display validation message -->
               <p style="color:red;" id="question_validation"></p>
               <p style="color:red;" id="feedback_validation"></p>
          </section>
    </div>
         <!-- javaScript related to drag & drop -->
         <script type="text/javascript" src="./dragAndDrop.js"> </script>
</body>


</html>