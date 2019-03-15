//function for adding a subQuestion
function addSubQuestion(givenButton, givenSubQText, givenSubQTime, givenSubQFeedback)
{
  numOfSubQSoFar++;
  numOfQSoFar++;

  //update the number of questions
  document.getElementById('quizEditor').setAttribute('data-numOfQuestions', numOfQSoFar);

  //find the x coordinate of the parent question
  parentQX = givenButton.parentNode.parentNode.getAttribute('data-x');

  //get the number of sub questions
  numOfSubQSoFar = parseInt(givenButton.parentNode.getAttribute('data-numOfSubQSoFar'));

  //increment one
  numOfSubQSoFar++;

  //update it
  givenButton.parentNode.setAttribute('data-numOfSubQSoFar', numOfSubQSoFar);

  //create a new linkQuestion table
  var subQTable = createSubQTable(parentQX, numOfSubQSoFar, givenSubQText, givenSubQTime, givenSubQFeedback);

  //create wrapper for this new subQ
  var subQDiv = document.createElement('div');

  //create delete button and appen to the div
  var deleteSubQButton = document.createElement('input');
  deleteSubQButton.setAttribute('class', 'deleteSubQButton');
  deleteSubQButton.setAttribute('type', 'button');
  deleteSubQButton.setAttribute('value', 'X');
  deleteSubQButton.setAttribute('onClick', 'deleteSubQuestion(this)')

  subQDiv.appendChild(deleteSubQButton);

  //append the table to the div
  subQDiv.appendChild(subQTable);

  var whiteSpace = document.createElement('br');

  subQDiv.appendChild(whiteSpace);



  givenButton.insertAdjacentElement('beforebegin', subQDiv);

  var orderDiv = document.createElement('div');
  orderDiv.setAttribute('class', 'orderDiv');
  orderDiv.innerHTML = "--------------------";
  subQDiv.appendChild(orderDiv);
  
  return subQTable;

} // function addSubQuestion




/*------------------------------------------------------------------------------
-------------------------------------------------------------------------------*/





//function for creeating linkQuestionTable
function createSubQTable(givenX, givenY, givenSubQText, givenSubQTime, givenSubQFeedback)
{
  var subQTable = document.createElement('table');

  //set the class (for styling)
  subQTable.setAttribute('class', 'subQTable')

  //set the border
  subQTable.setAttribute('border', '1');

  // set the x-coordinate and y-coordinate
  subQTable.setAttribute('data-x', givenX);
  subQTable.setAttribute('data-y', givenY);




  //insert headerRow
  var headerRow = subQTable.insertRow(0);

  //insert hierarchyCell
  var hierarchyCell = headerRow.insertCell(0);

  //insert "move button" top this cell
  var moveButton = document.createElement('input');
  moveButton.setAttribute('type', 'button');
  moveButton.setAttribute('value', 'move');

  //append the button to the cell
  hierarchyCell.appendChild(moveButton);

  //insert question header
  var questionHeaderCell = headerRow.insertCell(1);
  questionHeaderCell.innerHTML = "<th>Question</th>";


  //insert cell for the time limit
  var timeLimitHeaderCell = headerRow.insertCell(2);
  timeLimitHeaderCell.innerHTML = "<th>Time(s)</th>";

  //insertCell for the answers header
  var answersHeaderCell = headerRow.insertCell(3);
  answersHeaderCell.innerHTML = "<th> Answers </th>";


  // now the second row
  // add question Row
  var questionRow = subQTable.insertRow(1);
  var indexCell = questionRow.insertCell(0);

  indexCell.innerHTML = "Q" + givenX + "." + givenY;

  var questionCell = questionRow.insertCell(1);
  var questionField = document.createElement('input');
  questionField.setAttribute('type', 'text');
  questionField.setAttribute('class', 'questionField');
  questionField.setAttribute('placeholder', 'question');

  if(givenSubQText != null)
    questionField.setAttribute('value', givenSubQText);

  questionCell.appendChild(questionField);


  var timeLimitCell = questionRow.insertCell(2);
  timeLimitCell.appendChild(createTimeLimitList(givenSubQTime));


  var answerCell = questionRow.insertCell(3);

  //create an answer table and append it to the cell
  answerCell.appendChild(createAnswersTable(givenX, givenY, givenSubQFeedback));

  return subQTable;

} // function createSubQTable
