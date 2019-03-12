//javaScript for retrieving the editor
//assuming I have the two arrays (question array, and answers array)
//now what I want is retrieve exactly the same editor from these two arrays

var qTableArray = createQTableArray();
alert(qTableArray)
var aTableArrayAll = createATableArrayAll();


var numOfRootQSoFarRe= 0;
var numOfSubQSoFarRe = 0;
var numOfQSoFarRe = 0;


//-------- lines of codes that are executed on accesing the page -------//

function retrieve()
{


//retrieve the root questions
retrieveRootQ();
alert("button clicked")

//retrieve the subquestions


//retrieve the answers for root Q


//retrieve the answers for the sub Q



} // function retrieve





//----------------------------------------------------------------------//


function retrieveRootQ()
{

  //variable to store an array of root questions
  var arrayOfRootQ = [];

  //get an array upto to the point where the y-coord is zero
  for(var index = 0; index < qTableArray.length; index++)
  {
    alert(qTableArray[index][2])
    if(qTableArray[index][2] == 0)
    {
      arrayOfRootQ.push(qTableArray[index]);

    } // if true part
  } // for loop

  alert(arrayOfRootQ);

  //get the add root q button
  var addRootQButton = document.getElementById('addRootQButton');


  var rootQText;
  var rootQTime;


  //for each root Q array, virtually 'push the button;
  for(var index = 0; index < arrayOfRootQ.length; index++)
  {
    //update the variables
    rootQText = arrayOfRootQ[index][1];
    rootQTime = arrayOfRootQ[index][2];

    addRootQuestionRe(addRootQButton, rootQText, rootQTime);
  } // for loop

}// retrieveRootQ



function retrieveSubQ()
{
  //variable to store an array of root questions
  var arrayOfSubQ = [];

  //get an array from the point the y value is not zero
  for(var index = 0; index < qTableArray.length; index++)
  {
    if(qTableArray[index][2] != 0)
    {
      arrayOfRootQ.push(qTableArray[index]);
    } // if true part
  } // for loop


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
  subQDiv.setAttribute('id', 'subQDiv' + 'Q' + numOfRootQSoFarRe);
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
function createTimeLimitListRe(givenRootQTime)
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
  timeLimitList.value = givenRootQTime;

  //return the list
  return timeLimitList;

}
