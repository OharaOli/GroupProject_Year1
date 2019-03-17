//function for adding a root question
//first argument is required
//the others are optional
function addRootQuestion(givenButton, givenRootQText, givenRootQTime, givenRootQFeedback)
{
  numOfRootQSoFar++;
  numOfQSoFar++;

  //update the number of questions
  document.getElementById('quizEditor').setAttribute('data-numOfQuestions', numOfQSoFar);

  //wrapper to contain the root question and all of the sub questions
  var rootQDiv = document.createElement('div');
  rootQDiv.setAttribute('id', 'rootQDiv' + numOfRootQSoFar);
  rootQDiv.setAttribute('data-QId', 'Q' + numOfRootQSoFar);
  rootQDiv.setAttribute('data-x', numOfRootQSoFar);
  rootQDiv.setAttribute('data-y', '0');

  var rootQTable = createRootQTable(numOfRootQSoFar, givenRootQText, givenRootQTime, givenRootQFeedback);
  //append the root question table to the wrapper
  rootQDiv.appendChild(rootQTable);

  //button for hide/show sub questions
  var hideSubQButton = document.createElement('input');
  hideSubQButton.setAttribute('type', 'button');
  hideSubQButton.setAttribute('value','V');
  hideSubQButton.setAttribute('onClick', 'hideSubQuestions(this)');

  //append the button to the table
  rootQDiv.appendChild(hideSubQButton);


  // hide/show individual sub questions added. known error: edit root Q order does not work properly
  // a wrapper for sub questions
  var subQDiv = document.createElement('div');
  subQDiv.setAttribute('data-numOfSubQSoFar', '0');
  subQDiv.setAttribute('class', 'subQDiv');
  subQDiv.setAttribute('style', 'display: block;');
  subQDiv.setAttribute('id', 'subQDiv' + numOfRootQSoFar + '0');

  //hide/show individual sub questions added. known error: edit root Q order does not work properly


  var dragConfig = createDragConfig();

  //make the sub Q Div as the draggable container
  dragConfig.containers.push(subQDiv);

  //wrapper to contain subQDiv and button
  var subQDivWithButton = document.createElement('div');
  subQDivWithButton.setAttribute('class', 'subQDivWithButton');
  subQDivWithButton.setAttribute('style', 'display: block;');
  //append the subQdiv to the div with button
  subQDivWithButton.appendChild(subQDiv);


  //append 'add sub question' button to the wrapper
  var addSubQButton = document.createElement('input');

  addSubQButton.setAttribute('id', 'addSubQButton' + numOfRootQSoFar);
  addSubQButton.setAttribute('type', 'button');
  addSubQButton.setAttribute('value', '+');

  //set the onClick attribute (adding a sub question)
  addSubQButton.setAttribute('onClick', 'addSubQuestion(this)');
  addSubQButton.setAttribute('class', 'addSubQButton');


  //append the button to the div with button
  subQDivWithButton.appendChild(addSubQButton);


  var carrigeReturn1 = document.createElement('br');
  rootQDiv.appendChild(carrigeReturn1);


  //append the subQDiv with Button to the rootQDiv
  rootQDiv.appendChild(subQDivWithButton);

  //for some white space
  var carrigeReturn2 = document.createElement('br');
  rootQDiv.appendChild(carrigeReturn2);

  //append the wrapper right before where the button is situated
  givenButton.insertAdjacentElement('beforebegin', rootQDiv);



  return rootQTable;

} // add root Question


/*------------------------------------------------------------------------------
-------------------------------------------------------------------------------*/



//function for creating the rootQtable
//first argument required
//the others are optional
function createRootQTable(givenX, givenRootQText, givenRootQTime, givenRootQFeedback)
{
  var rootQTable = document.createElement('table');
  rootQTable.setAttribute('border', 1);
  rootQTable.setAttribute('id', 'rootQTable' + givenX);
  rootQTable.setAttribute('class', 'rootQTable');

  //attributes for implemenation of data transfer to the data base
  rootQTable.setAttribute('data-x', givenX);

  //y-coordinate is always zero
  rootQTable.setAttribute('data-y', '0');

  //index for the question
  rootQTable.setAttribute('data-index', 'Q' + givenX);

  // add header row
  var headerRow = rootQTable.insertRow(0);

  //add cells to the row


  var indexHeaderCell = headerRow.insertCell(0);

  //button for deleting the question
  var deleteRootQButton = document.createElement('input');
  deleteRootQButton.setAttribute('class', 'deleteRootQButton');
  deleteRootQButton.setAttribute('type', 'button');
  deleteRootQButton.setAttribute('value', 'X');
  deleteRootQButton.setAttribute('data-x', givenX);
  deleteRootQButton.setAttribute('data-y', '0');
  deleteRootQButton.setAttribute('onClick', 'deleteRootQuestion(this)');

  //append the button to the cell
  indexHeaderCell.appendChild(deleteRootQButton);

  var questionHeaderCell = headerRow.insertCell(1);
  questionHeaderCell.innerHTML = "<th>Question</th>";

  var timeLimitHeaderCell = headerRow.insertCell(2);
  timeLimitHeaderCell.innerHTML = "<th>Time(s)</th>";

  //another header for answers
  var answersHeaderCell = headerRow.insertCell(3);
  answersHeaderCell.innerHTML = "<th> Answers </th>"

  // add question Row
  var questionRow = rootQTable.insertRow(1);
  var indexCell = questionRow.insertCell(0);
  indexCell.innerHTML = "Q" + givenX;

  var questionCell = questionRow.insertCell(1);
  var questionField = document.createElement('textarea');
  questionField.setAttribute('type', 'text');
  questionField.setAttribute('class', 'questionField');
  questionField.setAttribute('placeholder', 'question (required)');


  if(givenRootQText != null)
    questionField.setAttribute('value', givenRootQText);

  questionCell.appendChild(questionField);

  var timeLimitCell = questionRow.insertCell(2);
  timeLimitCell.appendChild(createTimeLimitList(givenRootQTime));


  var answersCell = questionRow.insertCell(3);
  answersCell.appendChild(createAnswersTable(givenX, '0', givenRootQFeedback));

  return rootQTable;
} // function createQTable