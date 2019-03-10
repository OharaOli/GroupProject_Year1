// number of the root questions so far (those with no indentations)
var numOfRootQSoFar = 1;

var isAllSubQHidden = false;
var isAddRootQButtonHidden = false;



//function for adding a linkQuestion
function addSubQuestion(givenButton)
{

  //find the id of the parent question
  parentQId = givenButton.parentNode.parentNode.getAttribute('data-QId');

  //get the number of sub questions
  numOfSubQSoFar = parseInt(givenButton.parentNode.getAttribute('data-numOfSubQSoFar'));

  //increment one
  numOfSubQSoFar++;

  //update it
  givenButton.parentNode.setAttribute('data-numOfSubQSoFar', numOfSubQSoFar);

  //create a new linkQuestion table
  var linkQTable = createSubQTable(parentQId, numOfSubQSoFar);


  //append the table to the the parent rootQTableDiv
  givenButton.insertAdjacentElement('beforebegin', linkQTable);

  var carrigeReturn = document.createElement('br');

  givenButton.insertAdjacentElement('beforebegin', carrigeReturn);


} // function addSubQuestion


//function for adding a root question
function addRootQuestion(givenButton)
{
  numOfRootQSoFar++;


  //wrapper to contain the root question and all of the sub questions
  var rootQDiv = document.createElement('div');
  rootQDiv.setAttribute('id', 'rootQDiv' + numOfRootQSoFar);
  rootQDiv.setAttribute('data-QId', 'Q' + numOfRootQSoFar);

  //append the root question table to the wrapper
  rootQDiv.appendChild(createRootQTable(numOfRootQSoFar));

  // a wrapper for sub questions
  var subQDiv = document.createElement('div');
  subQDiv.setAttribute('id', 'subQDiv' + 'Q' + numOfRootQSoFar);
  subQDiv.setAttribute('data-numOfSubQSoFar', '0');
  subQDiv.setAttribute('class', 'subQDiv');

  //append 'add sub question' button to the wrapper
  var addSubQButton = document.createElement('input');

  //set the onClick attribute (adding a sub question)
  addSubQButton.setAttribute('type', 'button');
  addSubQButton.setAttribute('value', '+');
  addSubQButton.setAttribute('onClick', 'addSubQuestion(this)');
  addSubQButton.setAttribute('class', 'addSubQButton');


  //append the button to the wrapper
  subQDiv.appendChild(addSubQButton);

  //if all of the sub questions are hidden, this should also come out as hidden
  if(isAllSubQHidden)
  {
    //all of the subquestions are hidden
    subQDiv.style.display = "none";

  }

  var carrigeReturn1 = document.createElement('br');
  rootQDiv.appendChild(carrigeReturn1);

  //append the wrapper for sub question to the wrapper for the root question
  rootQDiv.appendChild(subQDiv);

  //append the wrapper right before where the button is situated
  givenButton.insertAdjacentElement('beforebegin', rootQDiv);

  //for some white space
  var carrigeReturn2 = document.createElement('br');
  givenButton.insertAdjacentElement('beforebegin', carrigeReturn2);


} // addQuestion

//function for creating the answer table with given index
//function for creating question Table
function createRootQTable(givenNumOfRootQSoFar)
{
  var rootQTable = document.createElement('table');
  rootQTable.setAttribute('border', 1);
  rootQTable.setAttribute('id', 'rootQTable' + "Q" + givenNumOfRootQSoFar);

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
  indexCell.innerHTML = "Q" + givenNumOfRootQSoFar;

  var questionCell = questionRow.insertCell(1);
  var questionField = document.createElement('input');
  questionField.setAttribute('type', 'text');
  questionField.setAttribute('class', 'questionField');
  questionCell.appendChild(questionField);

  var timeLimitCell = questionRow.insertCell(2);
  var timeLimitField = document.createElement('input');
  timeLimitField.setAttribute('type', 'text');
  timeLimitField.setAttribute('class', 'timeLimitField');
  timeLimitCell.appendChild(timeLimitField);


  var answersCell = questionRow.insertCell(3);
  answersCell.appendChild(createAnswersTable('Q' + givenNumOfRootQSoFar));

  return rootQTable;
} // function createQTable




//function for creeating linkQuestionTable
function createSubQTable(givenParentQId, givenNumOfSubQSoFar)
{
  var subQTable = document.createElement('table');

  //set the class (for styling)
  subQTable.setAttribute('class', 'subQTable')

  //set the border
  subQTable.setAttribute('border', '1');



  //insert headerRow
  var headerRow = subQTable.insertRow(0);

  //insert hierarchyCell
  var hierarchyCell = headerRow.insertCell(0);
  hierarchyCell.innerHTML = "Sub" + givenNumOfSubQSoFar;

  //insert question header
  var questionHeaderCell = headerRow.insertCell(1);
  var questionHeader = document.createElement('th');
  questionHeader.innerHTML = "Question";
  questionHeaderCell.appendChild(questionHeader);


  //insert cell for the time limit
  var timeLimitHeaderCell = headerRow.insertCell(2);
  var timeLimitHeader = document.createElement('th');
  timeLimitHeader.innerHTML = "Time Limit";
  timeLimitHeaderCell.appendChild(timeLimitHeader);

  //insertCell for the answers header
  var answersHeaderCell = headerRow.insertCell(3);
  var answersHeader = document.createElement('th');
  answersHeader.innerHTML = "Answers";
  answersHeaderCell.appendChild(answersHeader);


  // now the second row
  // add question Row
  var questionRow = subQTable.insertRow(1);
  var indexCell = questionRow.insertCell(0);
  var subQIndex = givenParentQId + "." + givenNumOfSubQSoFar;

  indexCell.innerHTML = subQIndex;

  var questionCell = questionRow.insertCell(1);
  var questionField = document.createElement('input');
  questionField.setAttribute('type', 'text');
  questionField.setAttribute('class', 'questionField');
  questionCell.appendChild(questionField);


  var timeLimitCell = questionRow.insertCell(2);
  var timeLimitField = document.createElement('input');
  timeLimitField.setAttribute('type', 'text');
  timeLimitField.setAttribute('class', 'timeLimitField');
  timeLimitCell.appendChild(timeLimitField);


  var answerCell = questionRow.insertCell(3);

  //create an answer table and append it to the cell
  answerCell.appendChild(createAnswersTable(subQIndex));

  return subQTable;

} // function createSubQTable


//function for creating a table for the four answers
function createAnswersTable(givenQIndex)
{
  //create aTable
  var aTable = document.createElement('table');

  //set attributes
  aTable.setAttribute('id', 'answersTable' + givenQIndex);
  aTable.setAttribute('border', 1);
  aTable.setAttribute('class', 'answersTable');

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
  var descriptionField = document.createElement('input');
  descriptionField.setAttribute('type', 'text');
  descriptionField.setAttribute('placeholder', 'description');
  descriptionField.setAttribute('class', 'answerDescriptionField');
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
  hideORShowById("addRootQButton");

  if(isAddRootQButtonHidden)
  {
    isAddRootQButtonHidden = false;
  }
  else
  {
    isAddRootQButtonHidden = true;
  }
} // function hideAddRootButton\



//function for hiding all the answers
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

function hideORShowById(givenId)
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