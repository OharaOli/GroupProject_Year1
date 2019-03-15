// number of the root questions so far (those with no indentations)
var numOfRootQSoFar = 0;
var numOfSubQSoFar = 0;
var numOfQSoFar = 0;




var isAllSubQHidden = false;
var isAddRootQButtonHidden = false;








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
