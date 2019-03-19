
//funciton for removing a question, given a button
function deleteRootQuestion(givenButton)
{
  //update the number of all questions
  numOfQSoFar--;
  var quizEditor = document.getElementById('quizEditor');
  quizEditor.setAttribute('data-numOfQuestions', numOfQSoFar);

  var rootX = givenButton.getAttribute('data-x');

  //update the total num of root questions
  numOfRootQSoFar--;

  // remove the parent root q div
  var rootQDiv = document.getElementById('rootQDiv' + rootX);
  rootQDiv.remove();

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

  //get the parent x-coordinate
  var parentX = givenButton.getAttribute('data-x');

  //get the sub Q Y-coordinate
  var subY = givenButton.getAttribute('data-y');

  //using the x and y coordinate, access the subQDiv
  var subQDiv = document.getElementById('subQDiv' + parentX + '0');

  //update the num of sub questions so far
  var numOfSubQSoFar = parseInt(subQDiv.getAttribute('data-numOfSubQSoFar'));
  numOfSubQSoFar--;
  subQDiv.setAttribute('data-numOfSubQSoFar', numOfSubQSoFar);


  //delete the parent subQDiv
  var parentSubQDiv = document.getElementById('subQDiv' + parentX + subY);
  parentSubQDiv.remove();

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

 //use for loop to loop through
 //use the index to update the number
 //index should start from 0, but the quesitons index is not zero-based


 var rootQTable;


 for(var index = 0; index < arrayOfRootQ.length; index++)
 {
    //update the index of the rootQAnsTable
    //update the id, update the first cell index
    rootQTable = arrayOfRootQ[index];
    rootQTable.setAttribute('id', 'rootQTable' + (index + 1));
    rootQTable.setAttribute('data-x', (index + 1));
    rootQTable.rows[1].cells[0].innerHTML = "Q" + (index + 1);

    //update the rootQdiv as well
    rootQTable.parentNode.setAttribute('id', 'rootQDiv' + (index + 1));
    rootQTable.parentNode.setAttribute('data-QId', 'Q' + (index + 1));
    rootQTable.parentNode.setAttribute('data-x', (index + 1));

    //update the button as well
    rootQTable.rows[0].cells[1].childNodes[0].setAttribute('data-x', (index + 1));

 } // for loop


  var parentX;
  var parentXP;

  var numOfSubQSoFar;
  var subQTable;

  //now for each rootQDivs, update its subQTables
  // use grab them by id. just change the x coordinates
  for(var index1 = 0; index1 < arrayOfRootQ.length - 1; index1++)
  {
    parentX = arrayOfRootQ[index1].getAttribute('data-x');
    parentXP = arrayOfRootQ[index1].getAttribute('data-xp');

    //get the subQDiv
    //alert("index1: " + index1);
    //alert('subQDiv' + parentXP + '0');
    subQDiv = document.getElementById('subQDiv' + parentXP + '0');

    //get the num of subQSofar
    numOfSubQSoFar = subQDiv.childNodes.length;
    //alert(numOfSubQSoFar);

    //loop through each subQTable, and update the data-x coordinate
    for(var index2 = 0; index2 < subQDiv.childNodes.length; index2++)
    {
      //alert(subQDiv.childNodes[index].childNodes[0])
      subQDiv.childNodes[index2].childNodes[0].setAttribute('id', 'subQTable' + parentX + index2);
      subQDiv.childNodes[index2].childNodes[0].setAttribute('data-x', parentX);
    } // for loop
    updateSubQIndex(parentX);
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
     subQTable.setAttribute('data-y', (index + 1));
     subQTable.rows[1].cells[0].innerHTML = "Q" + givenParentX + "." + (index + 1);
  } // for loop

} // updateSubQIndex
