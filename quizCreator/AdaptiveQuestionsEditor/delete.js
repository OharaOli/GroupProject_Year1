
//funciton for removing a question, given a button
function deleteRootQuestion(givenButton)
{
  //update the number of all questions
  numOfQSoFar--;
  var quizEditor = document.getElementById('quizEditor');
  quizEditor.setAttribute('data-numOfQuestions', numOfQSoFar);

  //update the total num of root questions
  numOfRootQSoFar--;


  // remove the parent root q div
  givenButton.parentNode.remove();

  //update the root Q index
  updateRootQIndex();

  //change the attri



} // deleteRootQuestion

function deleteSubQuestion(givenButton)
{
  //update the number of all questions
  numOfQSoFar--;
  var quizEditor = document.getElementById('quizEditor');
  quizEditor.setAttribute('data-numOfQuestions', numOfQSoFar);

  //update the num of sub questions so far
  var numOfSubQSoFar = parseInt(givenButton.parentNode.parentNode.getAttribute('data-numOfSubQSoFar'));
  numOfSubQSoFar--;

  givenButton.parentNode.parentNode.setAttribute('data-numOfSubQSoFar', numOfSubQSoFar);

  //get the parent x-coordinate
  var parentX = givenButton.parentNode.parentNode.parentNode.getAttribute('data-x');

  //delete the parent
  givenButton.parentNode.remove();

  //update the order
  updateSubQIndex(parentX);

} // deleteSubQuestion




//need a function that re-arranges the index of the question index
//after deleting a questions
function updateRootQIndex()
{
 //first get the array of all root questions
 //use get elements by class
 var arrayOfRootQ = document.getElementsByClassName('rootQTable');
 var rootQTable;


 //use for loop to loop through
 //use the index to update the number
 //index should start from 0, but the quesitons index is not zero-based
 for(var index = 0; index < arrayOfRootQ.length; index++)
 {
    //update the index of the rootQAnsTable
    //update the id, update the first cell index
    rootQTable = arrayOfRootQ[index];
    rootQTable.setAttribute('id', 'rootQTable' + (index + 1));
    rootQTable.rows[1].cells[0].innerHTML = "Q" + (index + 1);

    //update the rootQdiv as well
    rootQTable.parentNode.setAttribute('id', 'rootQDiv' + (index + 1));
    rootQTable.parentNode.setAttribute('data-QId', 'Q' + (index + 1));
 } // for loop
} // updateRootQIndex



function updateSubQIndex(givenParentX)
{
  //first get the array of all root questions
  //use get elements by class
  var arrayOfAllSubQTables = document.getElementsByClassName('subQTable');

  var arrayOfSubQTables = [];

  //loop through the sub questions whose parent's coordindate are as given
  for(var index = 0; index < arrayOfAllSubQTables.length; index++)
  {
    if(arrayOfAllSubQTables[index].getAttribute('data-x') == givenParentX)
    {
      // if match was found, push that table to the empty array
      arrayOfSubQTables.push(arrayOfAllSubQTables[index]);
    } // if statement
  } // for loop

  var subQTable;


  //use for loop to loop through
  //use the index to update the number
  //index should start from 0, but the quesitons index is not zero-based
  for(var index = 0; index < arrayOfSubQTables.length; index++)
  {
     //update the index of the rootQAnsTable
     //update the id, update the first cell index
     subQTable = arrayOfSubQTables[index];
     subQTable.setAttribute('id', 'subQTable' + givenParentX + "." + (index + 1));
     subQTable.rows[0].cells[0].innerHTML = 'Sub' + (index + 1);
     subQTable.rows[1].cells[0].innerHTML = "Q" + givenParentX + "." + (index + 1);

  } // for loop

} // updateSubQIndex
