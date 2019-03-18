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
  rootQDiv.setAttribute('data-x', numOfRootQSoFar);
  rootQDiv.setAttribute('data-y', '0');


  var rootQTable = createRootQTable(numOfRootQSoFar, givenRootQText, givenRootQTime, givenRootQFeedback);
  //append the root question table to the wrapper
  rootQDiv.appendChild(rootQTable);

  //wrapper that includes hideOrShow
  var subQDivWithHideOrShow = document.createElement('div');
  subQDivWithHideOrShow.setAttribute('class', 'subQDivWithHideOrShow');
  subQDivWithHideOrShow.style.display = 'block';

  //button for hide/show sub questions
  var hideSubQButton = document.createElement('input');
  hideSubQButton.setAttribute('type', 'button');
  hideSubQButton.setAttribute('value','V');
  hideSubQButton.setAttribute('onClick', 'hideSubQuestions(this)');

  subQDivWithHideOrShow.appendChild(hideSubQButton);


  // hide/show individual sub questions added. known error: edit root Q order does not work properly
  // a wrapper for sub questions
  var subQDiv = document.createElement('div');
  subQDiv.setAttribute('data-numOfSubQSoFar', '0');
  subQDiv.setAttribute('class', 'subQDiv');
  subQDiv.setAttribute('style', 'display: block;');
  subQDiv.setAttribute('id', 'subQDiv' + numOfRootQSoFar + '0');

  //hide/show individual sub questions added. known error: edit root Q order does not work properly


  var dragConfig = createDragConfigSub();

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

  subQDivWithHideOrShow.appendChild(subQDivWithButton);

  //append the subQDiv with Button to the rootQDiv
  rootQDiv.appendChild(subQDivWithHideOrShow);

  //for some white space
  var carrigeReturn2 = document.createElement('br');
  rootQDiv.appendChild(carrigeReturn2);

  //append the wrapper right before where the button is situated
  givenButton.previousElementSibling.appendChild(rootQDiv);



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
  rootQTable.setAttribute('data-xp', givenX);

  //index for the question
  rootQTable.setAttribute('data-index', 'Q' + givenX);

  // add header row
  var headerRow = rootQTable.insertRow(0);

  //add cells to the row

  //add dragHandleCell
  var dragHandleCell = headerRow.insertCell(0);
  dragHandleCell.setAttribute('rowspan', 2);

  //this cell is initially inivisible

  //when 'edit root question order' is pressed, this should appear

  //add drag handle to it
  var dragHandle = document.createElement('button');
  dragHandle.setAttribute('class', 'dragHandleRoot');
  dragHandle.setAttribute('data-editMode', '0');
  dragHandle.setAttribute('onClick', 'editRootQOrder(this)');

  dragHandleCell.appendChild(dragHandle);

  var indexHeaderCell = headerRow.insertCell(1);

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

  var questionHeaderCell = headerRow.insertCell(2);
  questionHeaderCell.innerHTML = "<th>Question</th>";

  var timeLimitHeaderCell = headerRow.insertCell(3);
  timeLimitHeaderCell.innerHTML = "<th>Time(s)</th>";

  //another header for answers
  var answersHeaderCell = headerRow.insertCell(4);
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
    questionField.innerHTML = givenRootQText;

  questionCell.appendChild(questionField);

  var timeLimitCell = questionRow.insertCell(2);
  timeLimitCell.appendChild(createTimeLimitList(givenRootQTime));


  var answersCell = questionRow.insertCell(3);
  answersCell.appendChild(createAnswersTable(givenX, '0', givenRootQFeedback));

  return rootQTable;
} // function createQTable



/*------------------------------------------------------------------------------
-------------------------------------------------------------------------------*/
