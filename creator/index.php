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



  <!-- Accessing Css from a separate file -->
  <link href="./indentation.css" rel="stylesheet" type="text/css">
</head>
<body>




<div style="width: 800px; margin: auto;" id="quizEditor" data-numOfQuestions="0">
  <h1 id="quizHeader" contenteditable="true" data-quizId= "1" placeholder='required'>
    Lorem ipsum
  </h1>

  <!-- buttons for editing order and submission -->
  <div>
    <input type="button" value="submit" onClick="submit()"> </input>
    <input type="button" value="edit root question order (working on)" > </input> <!--onClick="editRootQOrder()" -->
    <input type="button" value="retrieve (test)" onClick="retrieve()"> </input>
  </div>

  <br/>
  <input id="addRootQButton" style="display: block" class="addRootQButton" type="button" value="add root question" onClick="addRootQuestion(this)"> </input>
</div> <!-- QuizEditor -->

<br/>



<div style="display: none;">
<!-- table for storiing questions -->
<div>
question table (2dArray)
  <table border="1">
    <tr>
      <th> quiz_id (integer) </th>
      <th> text (string) </th>
      <th> x_coord </th>
      <th> y_coord </th>
      <th> time </th>
      <th> feedback </th>
    </tr>
    <tr>
      <td> 1 </td>
      <td> what is the capital city of the UK? </td>
      <td> 1 </td>
      <td> 0 </td>
      <td> 20 </td>
      <td> Paris is the capital city of France </td>
    </tr>
    <tr>
      <td> 1 </td>
      <td> what is the capital city of Korea? </td>
      <td> 1 </td>
      <td> 1 </td>
      <td> 20 </td>
      <td> lorem ipsum </td>
    </tr>
  </table>
</div>

<br/>


<!-- table for storing answers -->
<div>
answer table (2d array)
  <table border="1">
    <tr>
      <th> question_id (integer) </th>
      <th> text (string) </th>
      <th> is_correct </th>
      <th> letter </th>
    </tr>
    <tr>
      <td> 1 </td>
      <td> London </td>
      <td> true </td>
      <td> A </td>

    </tr>
    <tr>
      <td> 1 </td>
      <td> Paris </td>
      <td> false </td>
      <td> B </td>
    </tr>
  </table>
</div>


</br>

<!-- table for storing quizzes -->
<div>
quiz table (2d array)
  <table border="1">
    <tr>
      <th> quiz_id </th>
      <th> name </th>
    </tr>
    <tr>
      <td> 1 </td>
      <td> Lorem Ipsum </td>
    </tr>

  </table>
</div>
</div>

</body>


</html>