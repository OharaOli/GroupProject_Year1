//function for adding a subQuestion
function addSubQuestion(givenButton, givenSubQText, givenSubQTime, givenSubQFeedback)
{
  //updating the global variables
  numOfSubQSoFar++;
  numOfQSoFar++;

  //update the number of questions
  document.getElementById('quizEditor').setAttribute('data-numOfQuestions', numOfQSoFar);

  //find the x coordinate of the parent question
  parentQX = givenButton.parentNode.parentNode.parentNode.getAttribute('data-x');
  //get the number of sub questions for this root (before pressing the button)
  var numOfSubQSoFarRoot = parseInt(givenButton.previousElementSibling.getAttribute('data-numOfSubQSoFar'));

  //increment one
  numOfSubQSoFarRoot++;

  //update it
  givenButton.previousElementSibling.setAttribute('data-numOfSubQSoFar', numOfSubQSoFarRoot);

  //create a new linkQuestion table
  var subQTable = createSubQTable(parentQX, numOfSubQSoFarRoot, givenSubQText, givenSubQTime, givenSubQFeedback);

  //create wrapper for this new subQ
  var subQDivEach = document.createElement('div');
  subQDivEach.setAttribute('id', 'subQDiv' + parentQX + numOfSubQSoFarRoot);
  subQDivEach.setAttribute('data-x', parentQX);



  //append the table to the div
  subQDivEach.appendChild(subQTable);

  var whiteSpace = document.createElement('br');

  subQDivEach.appendChild(whiteSpace);



  givenButton.previousElementSibling.appendChild(subQDivEach);



  return subQTable;

} // function addSubQuestion




/*------------------------------------------------------------------------------
-------------------------------------------------------------------------------*/





//function for creeating subQuestionTable
function createSubQTable(givenX, givenY, givenSubQText, givenSubQTime, givenSubQFeedback)
{
  var subQTable = document.createElement('table');

  //set the class (for styling)
  subQTable.setAttribute('id', 'subQTable' + givenX + givenY);
  subQTable.setAttribute('class', 'subQTable')

  //set the border
  subQTable.setAttribute('border', '1');

  // set the x-coordinate and y-coordinate
  subQTable.setAttribute('data-x', givenX);
  subQTable.setAttribute('data-y', givenY);




  //insert headerRow
  var headerRow = subQTable.insertRow(0);

  // insert drag button cell
  var dragHandleCell = headerRow.insertCell(0);
  dragHandleCell.setAttribute('rowspan', 2);

  //append dragbutton to this
  var dragHandle = document.createElement('button');
  dragHandle.setAttribute('class', 'dragHandleSub');
  dragHandleCell.appendChild(dragHandle);


  //insert hierarchyCell
  var indexCell = headerRow.insertCell(1);
  indexCell.setAttribute('class', 'indexCell');

  //create delete button for sub question
  var deleteSubQButton = document.createElement('input');
  deleteSubQButton.setAttribute('class', 'deleteSubQButton');
  deleteSubQButton.setAttribute('type', 'button');
  deleteSubQButton.setAttribute('data-x', givenX);
  deleteSubQButton.setAttribute('data-y', givenY);
  deleteSubQButton.setAttribute('value', 'X');
  deleteSubQButton.setAttribute('onClick', 'deleteSubQuestion(this)')

  //append the button to the cell
  indexCell.appendChild(deleteSubQButton);

  //insert question header
  var questionHeaderCell = headerRow.insertCell(2);
  questionHeaderCell.innerHTML = "<th>Question</th>";


  //insert cell for the time limit
  var timeLimitHeaderCell = headerRow.insertCell(3);
  timeLimitHeaderCell.innerHTML = "<th>Time(s)</th>";

  //insertCell for the answers header
  var answersHeaderCell = headerRow.insertCell(4);
  answersHeaderCell.innerHTML = "<th> Answers </th>";


  // now the second row
  // add question Row
  var questionRow = subQTable.insertRow(1);


  var indexCell = questionRow.insertCell(0);
  indexCell.setAttribute('class', 'indexCell');

  indexCell.innerHTML = "Q" + (parseInt(givenX) + 1) + "." + givenY;

  var questionCell = questionRow.insertCell(1);
  var questionField = document.createElement('textarea');
  questionField.setAttribute('type', 'text');
  questionField.setAttribute('class', 'questionField');
  questionField.setAttribute('maxlength', 100);
  questionField.setAttribute('placeholder', 'question (required)');
  questionField.setAttribute('onkeydown', 'return (event.keyCode!=13);');
  questionField.setAttribute('required', true);

  if(givenSubQText != null)
    questionField.innerHTML = givenSubQText;

  questionCell.appendChild(questionField);


  var timeLimitCell = questionRow.insertCell(2);
  timeLimitCell.setAttribute('class', 'timeLimitCell');
  timeLimitCell.appendChild(createTimeLimitList(givenSubQTime));


  var answerCell = questionRow.insertCell(3);

  //create an answer table and append it to the cell
  answerCell.appendChild(createAnswersTable(givenX, givenY, givenSubQFeedback, false));

  var checkedErrorParag = document.createElement('p');
  checkedErrorParag.style.display = 'none';
  answerCell.appendChild(checkedErrorParag);


  return subQTable;

} // function createSubQTable
