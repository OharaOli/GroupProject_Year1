//javaScript for retrieving the editor
//assuming I have the two arrays (question array, and answers array)
//now what I want is retrieve exactly the same editor from these two arrays





var numOfRootQSoFarRe= 0;
var numOfSubQSoFarRe = 0;
var numOfQSoFarRe = 0;


//-------- lines of codes that are executed on accesing the page -------//

function retrieve()
{

//retrieve the root questions
retrieveRootQ(qTableArrayTest);
retrieveSubQ(qTableArrayTest);

//retrieve the subquestions


//retrieve the answers for root Q


//retrieve the answers for the sub Q



} // function retrieve





//----------------------------------------------------------------------//


function retrieveRootQ(givenQTableArray)
{

  //variable to store an array of root questions
  var arrayOfRootQ = [];

  //get an array upto to the point where the y-coord is zero
  for(var index = 0; index < givenQTableArray.length; index++)
  {
    if(givenQTableArray[index][2] == 0)
    {
      arrayOfRootQ.push(givenQTableArray[index]);

    } // if true part
  } // for loop


  //get the add root q button
  var addRootQButton = document.getElementById('addRootQButton');


  var rootQText;
  var rootQTime;
  var rootQAnsIndex;
  var rootQAnsCorrect;



  //for each root Q array, virtually 'push the button;
  for(var index = 0; index < arrayOfRootQ.length; index++)
  {
    //update the variables
    rootQText = arrayOfRootQ[index][0];

    rootQTime = arrayOfRootQ[index][3];

    addRootQuestionRe(addRootQButton, rootQText, rootQTime);
  } // for loop

}// retrieveRootQ



function retrieveSubQ(givenQTableArray)
{
  var arrayOfSubQ = [];

  //variables to store the coordinates
  var coordX;
  var maxCoordYSoFar = 0;



  //get an array from the point the y value is not zero
  for(var index = 0; index < givenQTableArray.length; index++)
  {
    if(givenQTableArray[index][2] != 0)
    {
      arrayOfSubQ.push(givenQTableArray[index]);
    } // if true part
  } // for loop

  var addSubQButton;
  var subQText;
  var subQTime;

  for(var index = 0; index < arrayOfSubQ.length; index++)
  {
    //first access the sub question, and..
    // figure out which root question it belongs to
    coordX = arrayOfSubQ[index][1];

    //grab the corresponding addsubquestion button
    addSubQButton = document.getElementById('addSubQButton' + coordX);


    //click the button (max y coord) times (it is 1-based)
    subQText = arrayOfSubQ[index][0];
    subQTime = arrayOfSubQ[index][3];

    addSubQuestionRe(addSubQButton, subQText, subQTime);

  } // outer for loop

}



function retrieveRootQAnswers()
{



}

function retrieveSubQAnswers()
{




}







//-------------- function for handling buttons for retrieval ---------------
//function for adding a root question
function addRootQuestionRe(givenButton, givenRootQText, givenRootQTime)
{
  //update the number of questions
  numOfRootQSoFarRe++;
  numOfQSoFarRe++;

  //update the number of questions
  document.getElementById('quizEditor').setAttribute('data-numOfQuestions', numOfQSoFarRe);

  //wrapper to contain the root question and all of the sub questions
  var rootQDiv = document.createElement('div');
  rootQDiv.setAttribute('id', 'rootQDiv' + numOfRootQSoFarRe);
  rootQDiv.setAttribute('data-QId', 'Q' + numOfRootQSoFarRe);


  //button for deleting the question
  var deleteRootQButton = document.createElement('input');
  deleteRootQButton.setAttribute('class', 'deleteQButton');
  deleteRootQButton.setAttribute('type', 'button');
  deleteRootQButton.setAttribute('value', 'X');
  deleteRootQButton.setAttribute('onClick', 'deleteRootQuestion(this)');

  rootQDiv.appendChild(deleteRootQButton);

  //append the root question table to the wrapper
  rootQDiv.appendChild(createRootQTableRe(numOfRootQSoFarRe, givenRootQText, givenRootQTime));

  //button for hiding the subquesions
  var addSubQButton = document.createElement('input');
  addSubQButton.setAttribute('type', 'button');
  addSubQButton.setAttribute('value', 'V');
  addSubQButton.setAttribute('onClick', 'hideSubQButton(this)');

  rootQDiv.appendChild(addSubQButton);
  // a wrapper for sub questions
  var subQDiv = document.createElement('div');
  subQDiv.setAttribute('id', 'subQDiv' + numOfRootQSoFarRe);
  subQDiv.setAttribute('data-numOfSubQSoFar', '0');
  subQDiv.setAttribute('class', 'subQDiv');
  subQDiv.setAttribute('style', 'display: block;');
  subQDiv.setAttribute('data-x', numOfRootQSoFarRe);

  //append 'add sub question' button to the wrapper
  var addSubQButton = document.createElement('input');

  //set the onClick attribute (adding a sub question)
  addSubQButton.setAttribute('type', 'button');
  addSubQButton.setAttribute('value', '+');
  addSubQButton.setAttribute('onClick', 'addSubQuestion(this)');
  addSubQButton.setAttribute('class', 'addSubQButton');
  addSubQButton.setAttribute('id','addSubQButton' + numOfRootQSoFarRe)


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




} // add root Question





function createRootQTableRe(givenX, givenRootQText, givenRootQTime)
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
  //set the value to be the text given
  questionField.setAttribute('value', givenRootQText);

  questionCell.appendChild(questionField);

  var timeLimitCell = questionRow.insertCell(2);
  timeLimitCell.appendChild(createTimeLimitListRe(givenRootQTime));


  var answersCell = questionRow.insertCell(3);
  answersCell.appendChild(createAnswersTable(givenX, '0'));

  return rootQTable;
} // function createQTable for retrieval



//function for creating time Limit list(drop-down selection)
function createTimeLimitListRe(givenQTime)
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

  //set the value to be the given input
  timeLimitList.value = givenQTime;

  //return the list
  return timeLimitList;

}



//function for adding a linkQuestion
function addSubQuestionRe(givenButton, givenSubQText, givenSubQTime)
{
  numOfSubQSoFarRe++;
  numOfQSoFarRe++;

  //update the number of questions
  document.getElementById('quizEditor').setAttribute('data-numOfQuestions', numOfQSoFarRe);

  //find the id of the parent question
  parentQId = givenButton.parentNode.parentNode.getAttribute('data-QId');

  //find the x coordinate of the parent question
  parentQX = givenButton.parentNode.getAttribute('data-x');

  //get the number of sub questions
  numOfSubQSoFarRe = parseInt(givenButton.parentNode.getAttribute('data-numOfSubQSoFar'));

  //increment one
  numOfSubQSoFarRe++;

  //update it
  givenButton.parentNode.setAttribute('data-numOfSubQSoFar', numOfSubQSoFarRe);

  //create a new linkQuestion table
  var linkQTable = createSubQTableRe(parentQX, numOfSubQSoFarRe, givenSubQText, givenSubQTime);

  //create wrapper for this new subQ
  var individualSubQDiv = document.createElement('div');

  //create delete button and appen to the div
  var deleteSubQButton = document.createElement('input');
  deleteSubQButton.setAttribute('class', 'deleteQButton');
  deleteSubQButton.setAttribute('type', 'button');
  deleteSubQButton.setAttribute('value', 'X');
  deleteSubQButton.setAttribute('onClick', 'deleteSubQuestion(this)')

  individualSubQDiv.appendChild(deleteSubQButton);

  //append the table to the div
  individualSubQDiv.appendChild(linkQTable);

  var carrigeReturn = document.createElement('br');

  individualSubQDiv.appendChild(carrigeReturn);

  givenButton.insertAdjacentElement('beforebegin', individualSubQDiv);


} // function addSubQuestion


//function for creeating linkQuestionTable
function createSubQTableRe(givenX, givenY, givenSubQText, givenSubQTime)
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
  questionField.setAttribute('value', givenSubQText);
  questionCell.appendChild(questionField);


  var timeLimitCell = questionRow.insertCell(2);
  timeLimitCell.appendChild(createTimeLimitListRe(givenSubQTime));


  var answerCell = questionRow.insertCell(3);

  //create an answer table and append it to the cell
  answerCell.appendChild(createAnswersTable(givenX, givenY));

  return subQTable;

} // function createSubQTable
