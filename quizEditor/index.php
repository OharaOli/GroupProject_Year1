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

  <!-- javaScript for deleting questions -->
  <script type="text/javascript" src="./delete.js"> </script>

  <!-- javascript related to sub questions -->
  <script type="text/javascript" src="./subQuestion.js"> </script>

  <!-- javaScript related to root questions -->
  <script type="text/javascript" src="./rootQuestion.js"> </script>


  <!-- Accessing Css from a separate file -->
  <link href="../styling/assets_custome/css/indentation.css" rel="stylesheet" type="text/css">
</head>
<body>
  <!-- plug-ins for dragula -->
  <script type="text/javascript" src="./node_modules/dragula/dist/dragula.js"> </script>
  <link href="./node_modules/dragula/dist/dragula.css" rel="stylesheet" type="text/css">

  <!-- javaScript related to drag & drop -->
  <script type="text/javascript" src="./dragAndDrop.js"> </script>





<div style="width: 800px; margin: auto;" id="quizEditor" data-numOfQuestions="0">
  <h1 id="quizHeader" contenteditable="true" data-quizId= "1" placeholder='required'>
    Lorem ipsum
  </h1>

  <!-- buttons for editing order and submission -->
  <div>
    <input type="button" value="submit(JavaScript-test)" onClick="submit()"> </input>
    <input type="button" value="retrieve(JavaScript-test)" onClick="retrieve()"> </input>
    <input type="button" value="edit root question order (working on)" > </input> <!--onClick="editRootQOrder()" -->
  </div>

  <br/>
  <input id="addRootQButton" style="display: block" class="addRootQButton" type="button" value="add root question" onClick="addRootQuestion(this)"> </input>
</div> <!-- QuizEditor -->

<br/>


</body>


</html>
