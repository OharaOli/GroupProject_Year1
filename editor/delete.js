
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
  updateRootQIndex(false);

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
function updateRootQIndex(isDueToDrop)
{
 //first get the array of all root questions
 //use get elements by class
 var arrayOfRootQ = document.getElementsByClassName('rootQTable');

 //use for loop to loop through
 //use the index to update the number
 //index should start from 0, but the quesitons index is not zero-based


 var rootQTable;

 if(isDueToDrop)
  var arrayOfRootQLength = arrayOfRootQ.length - 1;
 else
  var arrayOfRootQLength = arrayOfRootQ.length;



 for(var index = 0; index < arrayOfRootQLength; index++)
 {
    //update the index of the rootQAnsTable
    //update the id, update the first cell index
    rootQTable = arrayOfRootQ[index];
    rootQTable.setAttribute('id', 'rootQTable' + (index));
    rootQTable.setAttribute('data-x', (index));
    rootQTable.rows[1].cells[0].innerHTML = "Q" + (index + 1);

    //update the rootQdiv as well
    rootQTable.parentNode.setAttribute('id', 'rootQDiv' + (index ));
    rootQTable.parentNode.setAttribute('data-QId', 'Q' + (index + 1));
    rootQTable.parentNode.setAttribute('data-x', (index));

    //update the button as well
    rootQTable.rows[0].cells[1].childNodes[0].setAttribute('data-x', (index));

 } // for loop


  var newParentX;
  var parentXP;

  var numOfSubQSoFar;
  var subQTable;

  //now for each rootQDivs, update its subQTables
  // use grab them by id. just change the x coordinates
  for(var index1 = 0; index1 < arrayOfRootQLength; index1++)
  {
    newParentX = arrayOfRootQ[index1].getAttribute('data-x');
    parentXP = arrayOfRootQ[index1].getAttribute('data-xp');
    //once obtained, update the previous parent coord
    arrayOfRootQ[index1].setAttribute('data-xp', newParentX);

    console.log('previous x: ' + parentXP);
    console.log('new x: ' + newParentX);
    //get the subQDiv
    //alert("index1: " + index1);
    //alert('subQDiv' + parentXP + '0');
    subQDiv = document.getElementById('subQDiv' + parentXP + '0');
    console.log("subQDiv before update: ")
    console.log(subQDiv.id);

    subQDiv.setAttribute('id', 'subQDiv' + newParentX + '0');
    console.log("subQDiv after update");
    console.log(subQDiv.id);

    //get the num of subQSofar
    numOfSubQSoFar = subQDiv.childNodes.length;
    //alert(numOfSubQSoFar);
    console.log("length" + subQDiv.childNodes.length);
    //loop through each subQTable, and update the data-x coordinate
    for(var index2 = 0; index2 < subQDiv.childNodes.length; index2++)
    {
      //alert(subQDiv.childNodes[index].childNodes[0])
      subQDiv.childNodes[index2].setAttribute('id', 'subQDiv' + newParentX + index2);
      console.log("subQDIV each id:" + subQDiv.childNodes[index2].id);
      subQDiv.childNodes[index2].childNodes[0].setAttribute('id', 'subQTable' + newParentX + (index2 + 1));
      subQDiv.childNodes[index2].childNodes[0].setAttribute('data-x', newParentX);
    } // for loop
    console.log("new parentX: " + newParentX);
    updateSubQIndex(newParentX);

  } // for loop
} // updateRootQIndex


function updateSubQIndex(givenParentX)
{
  //first get the array of all root questions
  //use get elements by class
  var arrayOfAllSubQTables = $('.subQTable');
  console.log("all subQ array: ");
  console.log(arrayOfAllSubQTables.length);

  var arrayOfSubQTables = [];
  console.log("Length: " + arrayOfAllSubQTables.length)
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
  var parentX;



  //use for loop to loop through
  //use the index to update the number
  //index should start from 0, but the quesitons index is not zero-based
  for(var index = 0; index < arrayOfSubQTables.length - 1; index++)
  {
    console.log("sub q tables for " + givenParentX)
    console.log(arrayOfSubQTables);
     //update the index of the rootQAnsTable
     //update the id, update the first cell index
     subQTable = arrayOfSubQTables[index];
     console.log(subQTable);
     subQTable.setAttribute('id', 'subQTable' + givenParentX + (index + 1));
     subQTable.setAttribute('data-y', (index + 1));
     subQTable.rows[1].cells[0].innerHTML = "Q" + (parseInt(givenParentX) + 1) + "." + (index + 1);
     console.log('new parent q index: ' +(parseInt(givenParentX) + 1));

     //update the answers table as well
     parentX = subQTable.getAttribute('data-x');
     subQTable.rows[1].cells[3].childNodes[0].setAttribute('id','ansTable' + parentX + (index + 1));
     subQTable.rows[1].cells[3].childNodes[0].setAttribute('data-y', (index + 1));
  } // for loop

} // updateSubQIndex
