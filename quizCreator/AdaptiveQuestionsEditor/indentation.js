// number of the root questions so far (those with no indentations)
var numOfRootQSoFar = 0;
var numOfSubQSoFar = 0;
var numOfQSoFar = 0;




var isAllSubQHidden = false;
var isAddRootQButtonHidden = false;


//function for adding a linkQuestion
function addSubQuestion(givenButton, givenSubQText, givenSubQTime)
{
  numOfSubQSoFar++;
  numOfQSoFar++;

  //update the number of questions
  document.getElementById('quizEditor').setAttribute('data-numOfQuestions', numOfQSoFar);

  //find the id of the parent question
  parentQId = givenButton.parentNode.parentNode.getAttribute('data-QId');

  //find the x coordinate of the parent question
  parentQX = givenButton.parentNode.getAttribute('data-x');

  //get the number of sub questions
  numOfSubQSoFar = parseInt(givenButton.parentNode.getAttribute('data-numOfSubQSoFar'));

  //increment one
  numOfSubQSoFar++;

  //update it
  givenButton.parentNode.setAttribute('data-numOfSubQSoFar', numOfSubQSoFar);

  //create a new linkQuestion table
  var subQTable = createSubQTable(parentQX, numOfSubQSoFar, givenSubQText, givenSubQTime);

  //create wrapper for this new subQ
  var individualSubQDiv = document.createElement('div');

  //create delete button and appen to the div
  var deleteSubQButton = document.createElement('input');
  deleteSubQButton.setAttribute('class', 'deleteSubQButton');
  deleteSubQButton.setAttribute('type', 'button');
  deleteSubQButton.setAttribute('value', 'X');
  deleteSubQButton.setAttribute('onClick', 'deleteSubQuestion(this)')

  individualSubQDiv.appendChild(deleteSubQButton);

  //append the table to the div
  individualSubQDiv.appendChild(subQTable);

  var carrigeReturn = document.createElement('br');

  individualSubQDiv.appendChild(carrigeReturn);

  givenButton.insertAdjacentElement('beforebegin', individualSubQDiv);

  return subQTable;

} // function addSubQuestion


//function for adding a root question
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


  //button for deleting the question
  var deleteRootQButton = document.createElement('input');
  deleteRootQButton.setAttribute('class', 'deleteRootQButton');
  deleteRootQButton.setAttribute('type', 'button');
  deleteRootQButton.setAttribute('value', 'X');
  deleteRootQButton.setAttribute('onClick', 'deleteRootQuestion(this)');

  deleteRootQButton.setAttribute('type', 'button');
  deleteRootQButton.setAttribute('value', 'X');

  //append the button to the wrapper
  // hide/show individual sub questions added. known error: edit root Q order does not work properly
  rootQDiv.appendChild(deleteRootQButton);


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
  subQDiv.setAttribute('id', 'subQDiv' + numOfRootQSoFar);
  subQDiv.setAttribute('data-numOfSubQSoFar', '0');
  subQDiv.setAttribute('class', 'subQDiv');
  subQDiv.setAttribute('style', 'display: block;');
  subQDiv.setAttribute('data-x', numOfRootQSoFar);
  subQDiv.setAttribute('style', 'display: block;')
  //hide/show individual sub questions added. known error: edit root Q order does not work properly

  //append 'add sub question' button to the wrapper
  var addSubQButton = document.createElement('input');

  //set the onClick attribute (adding a sub question)
  addSubQButton.setAttribute('type', 'button');
  addSubQButton.setAttribute('value', '+');
  addSubQButton.setAttribute('onClick', 'addSubQuestion(this)');
  addSubQButton.setAttribute('class', 'addSubQButton');
  addSubQButton.setAttribute('id', 'addSubQButton' + numOfRootQSoFar)


  //append the button to the wrapper
  subQDiv.appendChild(addSubQButton);


  var carrigeReturn1 = document.createElement('br');
  rootQDiv.appendChild(carrigeReturn1);

  //append the wrapper for sub question to the wrapper for the root question
  rootQDiv.appendChild(subQDiv);

  //for some white space
  var carrigeReturn2 = document.createElement('br');
  rootQDiv.appendChild(carrigeReturn2);

  //append the wrapper right before where the button is situated
  givenButton.insertAdjacentElement('beforebegin', rootQDiv);


  return rootQTable;

} // add root Question



//funciton for removing a question, given a button
function deleteRootQuestion(givenButton)
{

  //update the total num of root questions
  numOfRootQSoFar--;

  // remove the parent root q div
  givenButton.parentNode.remove();




} // deleteRootQuestion


function deleteSubQuestion(givenButton)
{
  //update the num of sub questions so far
  var numOfSubQSoFar = parseInt(givenButton.parentNode.parentNode.getAttribute('data-numOfSubQSoFar'));
  numOfSubQSoFar--;

  givenButton.parentNode.parentNode.setAttribute('data-numOfSubQSoFar', numOfSubQSoFar);

  //delete the parent
  givenButton.parentNode.remove();
} // deleteSubQuestion

//function for creating the answer table with given index
//function for creating question Table
function createRootQTable(givenX, givenRootQText, givenRootQTime, givenRootQFeedback)
{
  var rootQTable = document.createElement('table');
  rootQTable.setAttribute('border', 1);
  rootQTable.setAttribute('id', 'rootQTable' + "Q" + givenX);
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
  indexHeaderCell.innerHTML = "<th>Root</th>";

  var questionHeaderCell = headerRow.insertCell(1);
  questionHeaderCell.innerHTML = "<th>Question</th>";

  var timeLimitHeaderCell = headerRow.insertCell(2);
  timeLimitHeaderCell.innerHTML = "<th>Time limit</th>";

  //another header for answers
  var answersHeaderCell = headerRow.insertCell(3);
  answersHeaderCell.innerHTML = "<th> Answers </th>"

  // add question Row
  var questionRow = rootQTable.insertRow(1);
  var indexCell = questionRow.insertCell(0);
  indexCell.innerHTML = "Q" + givenX;

  var questionCell = questionRow.insertCell(1);
  var questionField = document.createElement('input');
  questionField.setAttribute('type', 'text');
  questionField.setAttribute('class', 'questionField');
  questionField.setAttribute('placeholder', 'question');


  if(givenRootQText != null)
    questionField.setAttribute('value', givenRootQText);

  questionCell.appendChild(questionField);

  var timeLimitCell = questionRow.insertCell(2);
  timeLimitCell.appendChild(createTimeLimitList(givenRootQTime));


  var answersCell = questionRow.insertCell(3);
  answersCell.appendChild(createAnswersTable(givenX, '0', givenRootQFeedback));

  return rootQTable;
} // function createQTable




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
  hierarchyCell.innerHTML = "<th> Sub" + givenY + "</th>";

  //insert question header
  var questionHeaderCell = headerRow.insertCell(1);
  questionHeaderCell.innerHTML = "<th>Question </th>";


  //insert cell for the time limit
  var timeLimitHeaderCell = headerRow.insertCell(2);
  timeLimitHeaderCell.innerHTML = "<th> Time Limit </th>";

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


//function for creating a table for the four answers
function createAnswersTable(givenX, givenY, givenQFeedback)
{
  //create aTable
  var aTable = document.createElement('table');

  //set attributes
  aTable.setAttribute('id', 'answersTable' + givenX + "." + givenY);
  aTable.setAttribute('border', 1);
  //To distinguish between answers for the root and answers for the sub
  if(givenY == 0)
  {
    aTable.setAttribute('class', 'answersTableRoot');
  }
  else
  {
    aTable.setAttribute('class', 'answersTableSub');
  }

  aTable.setAttribute('data-x', givenX);
  aTable.setAttribute('data-y', givenY);

  // row for the answer A
  var rowA = aTable.insertRow(0);

  var indexCellA = rowA.insertCell(0);
  indexCellA.innerHTML = "A";

  var correctCheckboxCellA = rowA.insertCell(1);
  var correctCheckboxA = document.createElement('input');
  correctCheckboxA.setAttribute('type', 'checkbox');
  correctCheckboxA.setAttribute('class', 'correctCheckbox')
  correctCheckboxCellA.appendChild(correctCheckboxA);


  var answerCellA = rowA.insertCell(2);
  var answerFieldA = document.createElement('input');
  answerFieldA.setAttribute('type', 'text');
  answerFieldA.setAttribute('placeholder', 'answer');
  answerFieldA.setAttribute('class', 'answerField');
  answerCellA.appendChild(answerFieldA);

  //description Cell - only for this row
  //need only one description Cell for the four cells
  var descriptionCell = rowA.insertCell(3);
  descriptionCell.setAttribute('rowspan', 4);
  var descriptionField = document.createElement('textarea');
  descriptionField.setAttribute('placeholder', 'feedback');
  descriptionField.setAttribute('type', 'text');
  descriptionField.setAttribute('class', 'answerDescriptionField');

  if(givenQFeedback != null)
  {
    descriptionField.innerHTML = givenQFeedback;
  }// if statement

  descriptionCell.appendChild(descriptionField);



  // row for the answer B
  var rowB = aTable.insertRow(1);

  var indexCellB = rowB.insertCell(0);
  indexCellB.innerHTML = "B";

  var correctCheckboxCellB = rowB.insertCell(1);
  var correctCheckboxB = document.createElement('input');
  correctCheckboxB.setAttribute('type', 'checkbox');
  correctCheckboxB.setAttribute('class', 'correctCheckbox')

  correctCheckboxCellB.appendChild(correctCheckboxB);


  var answerCellB = rowB.insertCell(2);
  var answerFieldB = document.createElement('input');
  answerFieldB.setAttribute('type', 'text');
  answerFieldB.setAttribute('placeholder', 'answer');
  answerFieldB.setAttribute('class', 'answerField');
  answerCellB.appendChild(answerFieldB);



  // row for the answer C
  var rowC = aTable.insertRow(2);

  var indexCellC = rowC.insertCell(0);
  indexCellC.innerHTML = "C";

  var correctCheckboxCellC = rowC.insertCell(1);
  var correctCheckboxC = document.createElement('input');
  correctCheckboxC.setAttribute('type', 'checkbox');
  correctCheckboxC.setAttribute('class', 'correctCheckbox')

  correctCheckboxCellC.appendChild(correctCheckboxC);


  var answerCellC = rowC.insertCell(2);
  var answerFieldC = document.createElement('input');
  answerFieldC.setAttribute('type', 'text');
  answerFieldC.setAttribute('placeholder', 'answer');
  answerFieldC.setAttribute('class', 'answerField');
  answerCellC.appendChild(answerFieldC);



  // row for the answer D
  var rowD = aTable.insertRow(3);

  var indexCellD = rowD.insertCell(0);
  indexCellD.innerHTML = "D";

  var correctCheckboxCellD = rowD.insertCell(1);
  var correctCheckboxD = document.createElement('input');
  correctCheckboxD.setAttribute('type', 'checkbox');
  correctCheckboxD.setAttribute('class', 'correctCheckbox')

  correctCheckboxCellD.appendChild(correctCheckboxD);


  var answerCellD = rowD.insertCell(2);
  var answerFieldD = document.createElement('input');
  answerFieldD.setAttribute('type', 'text');
  answerFieldD.setAttribute('placeholder', 'answer');
  answerFieldD.setAttribute('class', 'answerField');
  answerCellD.appendChild(answerFieldD);

  //return the answer Table
  return aTable;

} // function createAnswersTable



function editRootQOrder()
{
  //first hide all of the sub questions
  hideAllSubQuestions();

  // adding root question should be blocked at this point
  hideAddRootQButton();

}


function hideAddRootQButton()
{
  hideOrShowById("addRootQButton");

  if(isAddRootQButtonHidden)
  {
    isAddRootQButtonHidden = false;
  }
  else
  {
    isAddRootQButtonHidden = true;
  }
} // function hideAddRootButton\



//function for the hideSubQButton
function hideSubQButton(givenButton)
{
  hideSubQuestions(givenButton);

  if(givenButton.value == "V")
    givenButton.value = ">";
  else
    givenButton.value = "V";

}


//function for hiding all the answers
//function for hiding all the sub questions
//hide/show individual sub questions added. known error: edit root Q order does not work properly
function hideAllSubQuestions()
{
  //grab all the elements by class name
  hideORShowByClass('subQDiv');

  if(isAllSubQHidden)
  {
    isAllSubQHidden = false;
  }
  else
  {
    isAllSubQHidden = true;
  }

} // function hideAllSubQuestions


//function for individually hiding the sub questions
function hideSubQuestions(givenButton)
{
  hideOrShowByElement(givenButton.nextElementSibling.nextElementSibling)

  //update the value
  //if(givenButton.value == "V")
  //  givenButton.value = "V";
//  else
  //  givenButton.value = ">";

}


//function for hiding sub questions of a root question
function hideSubQuestions(givenButton)
{

  //use the nextSibling property
  hideORShowByElement(givenButton.nextElementSibling.nextElementSibling);


  //change the shape of the button
  if(givenButton.value == "V")
  {
    givenButton.value = ">";
  }
  else
  {
    givenButton.value = "V";
  }

} // function hideSubQuestions


function hideORShowByClass(givenClassId)
{

  var allElements = document.getElementsByClassName(givenClassId);

  for(index = 0; index < allElements.length; index ++)
  {

    if (allElements[index].style.display == "none")
    {
      allElements[index].style.display = "block";
    }
    else
    {
      allElements[index].style.display = "none";
    }

  } // for loop
}

function hideOrShowById(givenId)
{

  var element = document.getElementById(givenId);

  if(element.style.display == "block")
  {

    element.style.display = "none";

  }
  else
  {
    element.style.display = "block";
  }

}



function hideORShowByElement(givenElement)
{
  if(givenElement.style.display == "block")
  {

    givenElement.style.display = "none";

  }
  else
  {
    givenElement.style.display = "block";
  }

} // function hideOrShowByElement


//function for creating time Limit list(drop-down selection)
function createTimeLimitList(givenTimeLimit)
{
  var timeLimitList = document.createElement('select');
  timeLimitList.setAttribute('class', 'timeLimitList');

  var option1 = document.createElement('option');
  option1.setAttribute('value', '10');
  option1.innerHTML = "10";

  var option2 = document.createElement('option');
  option2.setAttribute('value', '15');
  option2.innerHTML = "15";


  var option3 = document.createElement('option');
  option3.setAttribute('value', '20');
  option3.innerHTML = "20";


  var option4 = document.createElement('option');
  option4.setAttribute('value', '25');
  option4.innerHTML = "25";


  var option5 = document.createElement('option');
  option5.setAttribute('value', '30');
  option5.innerHTML = "30";


  //append the iptions to the list
  timeLimitList.appendChild(option1);
  timeLimitList.appendChild(option2);
  timeLimitList.appendChild(option3);
  timeLimitList.appendChild(option4);
  timeLimitList.appendChild(option5);

  if(givenTimeLimit != null)
    timeLimitList.value = givenTimeLimit;

  //return the list
  return timeLimitList;

}






// need a function that loops through all of the sub questions and updates the
// ids with respect to the new order
function updateSubQuestions()
{




} // function updateSubQuestions



function updateSubQuestionTableIndex(givenSubQTable, givenNewIndex)
{




} // function update subquestionTable
