//javaScript for retrieving the editor
//assuming I have the two arrays (question array, and answers array)
//now what I want is retrieve exactly the same editor from these two arrays

var qTableArray = createQTableArray();
var aTableArrayAll = createATableArrayAll();


var numOfRootQSoFarRe= 0;
var numOfSubQSoFarRe = 0;
var numOfQSoFarRe = 0;


//-------- lines of codes that are executed on accesing the page -------//

function retrieve()
{


//retrieve the root questions


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
    if(qTableArray[index][2] == 0)
    {
      arrayOfRootQ.push(qTableArray[index]);

    } // if true part
  } // for loop


}



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
function addRootQuestionRetrieve(givenButton)
{
  //update the number of questions
  numOfRootQSoFarRe++;
  numOfQSoFarRe++;

  //update the number of questions
  document.getElementById('quizEditor').setAttribute('data-numOfQuestions', numOfQSoFar);

  //wrapper to contain the root question and all of the sub questions
  var rootQDiv = document.createElement('div');
  rootQDiv.setAttribute('id', 'rootQDiv' + numOfRootQSoFar);
  rootQDiv.setAttribute('data-QId', 'Q' + numOfRootQSoFar);


  //button for deleting the question
  var deleteRootQButton = document.createElement('input');
  deleteRootQButton.setAttribute('class', 'deleteQButton');
  deleteRootQButton.setAttribute('type', 'button');
  deleteRootQButton.setAttribute('value', 'X');
  deleteRootQButton.setAttribute('onClick', 'deleteRootQuestion(this)');

  rootQDiv.appendChild(deleteRootQButton);

  //append the root question table to the wrapper
  rootQDiv.appendChild(createRootQTable(numOfRootQSoFar));

  //button for hiding the subquesions
  var addSubQButton = document.createElement('input');
  addSubQButton.setAttribute('type', 'button');
  addSubQButton.setAttribute('value', 'V');
  addSubQButton.setAttribute('onClick', 'hideSubQButton(this)');

  rootQDiv.appendChild(addSubQButton);
  // a wrapper for sub questions
  var subQDiv = document.createElement('div');
  subQDiv.setAttribute('id', 'subQDiv' + 'Q' + numOfRootQSoFar);
  subQDiv.setAttribute('data-numOfSubQSoFar', '0');
  subQDiv.setAttribute('class', 'subQDiv');
  subQDiv.setAttribute('style', 'display: block;');
  subQDiv.setAttribute('data-x', numOfRootQSoFar);

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
