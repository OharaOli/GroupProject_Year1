<!DOCTYPE html>
<html>
<title>
Quiz creator
</title>
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


  <script> $(document).ready(function() {
    quizIDRe = <?php echo json_encode($_POST['quizID']); ?>;

    });
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
  <link href="../styling/assets_custome/css/indentation.css" rel="stylesheet" type="text/css">
</head>
<body>
  <!-- plug-ins for dragula -->
  <script type="text/javascript" src="./node_modules/dragula/dist/dragula.js"> </script>
  <link href="./node_modules/dragula/dist/dragula.css" rel="stylesheet" type="text/css">




<!-- quizEditor -->
<div style="margin-left: 100px;" id="quizEditor" data-numOfQuestions="0">
  <h1 id="quizHeader" contenteditable="true" data-quizId= "1" placeholder='required'>
    Lorem ipsum
  </h1>
  <!-- buttons for editing order and submission -->
    <div>
      <input type="button" value="Save" onclick="save()"> </input>
      <input type="button" value="retrieve(JavaScript-test)" onClick="retrieve()"> </input>
    </div>
    <br/>
    <div id="rootQDivAll">
    </div>
  <button id="addRootQButton" style="display: block;" class="addRootQButton"  onClick="addRootQuestion(this)">
  add root question </button>
</div> <!-- QuizEditor -->

<br/>
    <!-- display validation message -->
   <p style="color:red;" id="question_validation"></p>
   <p style="color:red;" id="feedback_validation"></p>



   <!-- javaScript related to drag & drop -->
   <script type="text/javascript" src="./dragAndDrop.js"> </script>

</body>


</html>