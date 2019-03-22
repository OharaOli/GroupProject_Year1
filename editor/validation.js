// code for valiation

//validate the number of checked boxes for each ans table
// if there are no correct answers at all, put error message below the answer table!
// it seems you should put p element in each cell! (right below the table)f

/*
function validateQuestions()
{
  var rootQTables = document.getElementsByClassName('rootQTable');
  var subQTables = document.getElementsByClassName('subQTable');


  for(var index = 0; index < rootQTables.length; index++)
  {
    if(rootQTables[index].rows[1].cells[1].childNodes[0].value.trim() == "")
      return false;
  }

  for(var index = 0; index < subQTables.length; index++)
  {
    if(subQTables[index].rows[1].cells[1].childNodes[0].value.trim() == "")
      return false;
  }

  return true;
}
*/

/*
function validateAnswers()
{
  var rootQAnsTables = document.getElementsByClassName('ansTableRoot');
  var subQAnsTables = document.getElementsByClassName('ansTableSub');


  for(var index = 0; index < rootQAnsTables.length; index++)
  {
    if(rootQAnsTables[index].rows[0].cells[2].childNodes[0].value.trim() == ""
      || rootQAnsTables[index].rows[1].cells[2].childNodes[0].value.trim() == "")
      return false;
  }

  for(var index = 0; index < subQAnsTables.length; index++)
  {
    if(subQAnsTables[index].rows[1].cells[1].childNodes[0].value.trim() == ""
       )
      return false;
  }

  return true;
}
*/

function validateRequiredInputs()
{
  var allQField = document.getElementsByClassName('questionField');
  console.log(JSON.stringify(allQField));
  var allAField = document.getElementsByClassName('answerField');
  console.log(JSON.stringify(allAField));

  var requiredOnes = [];

  for(var index = 0; index < allQField.length; index++)
  {
    if(allQField[index].getAttribute('required') != null)
    {
      requiredOnes.push(allQField[index].innerHTML);
    }
  } // for loop

  for(var index = 0; index < allAField.length; index++)
  {
    if(allAField[index].getAttribute('required') != null)
    {
      requiredOnes.push(allAField[index].getAttribute('value'));
    }
  } // for loop

  var includesEmpty = requiredOnes.includes("");
  console.log(requiredOnes);
  console.log(includesEmpty);
  if(includesEmpty)
    return false;
  else
    return true;

}


function validateCorrectCheckbox()
{
  var isCheckedValid;
  var numOfInvalidTableSoFar = 0;

  //first get all of the answer tables

  var ansTableArrayRoot = document.getElementsByClassName('ansTableRoot');
  //.log(ansTableArrayRoot);
  var ansTableArraySub = document.getElementsByClassName('ansTableSub');
  //.log(ansTableArraySub);


  //loop through the array, and check
  var numOfCheckedSoFar;


  for(var index1 = 0; index1 < ansTableArrayRoot.length; index1++)
  {
    numOfCheckedSoFar = 0;
    //get the ansTable
    ansTable = ansTableArrayRoot[index1];
    //now loop throgh the table row.
    //work out the numOfCheckedSoFar
    for(var index2 = 0; index2 < ansTable.rows.length; index2++)
    {
      if(ansTable.rows[index2].cells[1].childNodes[0].checked == true
         && ansTable.rows[index2].cells[1].childNodes[0].getAttribute('disabled') == null)
      {
       numOfCheckedSoFar++;
      }
    } // for loop - looping through eacch row

    //check the num checed
    if(numOfCheckedSoFar < 1)
    {
      ansTable.nextElementSibling.innerHTML = "You must provide at least 1 correct answer.";
      numOfInvalidTableSoFar++;
    }
    else
    {
      ansTable.nextElementSibling.style.display = 'none';
    }

  } // for loop - looping through each ansTable

  for(var index1 = 0; index1 < ansTableArraySub.length; index1++)
  {
    numOfCheckedSoFar = 0;
    //get the ansTable
    ansTable = ansTableArraySub[index1];
    //now loop throgh the table row.
    //work out the numOfCheckedSoFar
    for(var index2 = 0; index2 < ansTable.rows.length; index2++)
    {
      if(ansTable.rows[index2].cells[1].childNodes[0].checked == true
         && ansTable.rows[index2].cells[1].childNodes[0].getAttribute('disabled') == null)
      {
       numOfCheckedSoFar++;
      }
    } // for loop - looping through eacch row

    //check the num checed
    if(numOfCheckedSoFar < 1)
    {
      ansTable.nextElementSibling.innerHTML = "You must provide at least 1 correct answer.";
      numOfInvalidTableSoFar++;
    }
    else
    {
      ansTable.nextElementSibling.style.display = 'none';
    }

  } // for loop - looping through each ansTable

  //now change the message
  if(numOfInvalidTableSoFar < 1)
    isCheckedValid = true;
  else
    isCheckedValid = false;

  if(isCheckedValid)
  {
    //.log("is it valid?" + isCheckedValid);

    //make the message appear below the table

    var errorNotifiers = document.getElementsByClassName('errorNotifier');
    for(var index = 0; index < errorNotifiers.length; index++)
    {
      errorNotifiers[index].style.display = 'none';
      errorNotifiers[index].innerHTML = "";
    } // for loop
  } // true part
  else
  {
    //.log("is it valid?" + isCheckedValid);
    var errorNotifiers = document.getElementsByClassName('errorNotifier');
    for(var index = 0; index < errorNotifiers.length; index++)
    {
      errorNotifiers[index].style.display = 'inline-block';
      errorNotifiers[index].innerHTML = "Oops! Some questions have no correct answers!";
    } // for loop
  } // false part

  //return
  return isCheckedValid;
} // validateCorrectCheckbox



//validation for the answers
//the answers C must be disabled until A and B are fully filled
//the answer D must be disabled until A B C are fully filled
//Use event listeners
function activateCD(givenATable)
{
 //check if A and B are both filled
 if(givenATable.rows[0].cells[2].childNodes[0].value != ""
    && givenATable.rows[1].cells[2].childNodes[0].value != "")
 {
   //activate C
   givenATable.rows[2].cells[2].childNodes[0].removeAttribute('disabled');
   givenATable.rows[2].cells[1].childNodes[0].removeAttribute('disabled');

   //if C also has some value in it, activate D as well
   if(givenATable.rows[2].cells[2].childNodes[0].value != "")
   {
     givenATable.rows[3].cells[2].childNodes[0].removeAttribute('disabled');
     givenATable.rows[3].cells[1].childNodes[0].removeAttribute('disabled');

   } // inner if
   else
   {
     //else , you have to disable D
     givenATable.rows[3].cells[2].childNodes[0].setAttribute('disabled', true);
     givenATable.rows[3].cells[1].childNodes[0].setAttribute('disabled', true);

   }
 } // outer if
 else
 {
   //if either A and B are not filled, disable C and D
   givenATable.rows[2].cells[2].childNodes[0].setAttribute('disabled',true);
   givenATable.rows[3].cells[2].childNodes[0].setAttribute('disabled',true);

   //the checkboxes as well
   givenATable.rows[2].cells[1].childNodes[0].setAttribute('disabled',true);
   givenATable.rows[3].cells[1].childNodes[0].setAttribute('disabled',true);

 } //outer if false part


 //separate if statement for dealing with the special case with C
 if(givenATable.rows[0].cells[2].childNodes[0].value != ""
    && givenATable.rows[1].cells[2].childNodes[0].value != ""
    && givenATable.rows[2].cells[2].childNodes[0].value == ""
    && givenATable.rows[3].cells[2].childNodes[0].value != "")
 {
   //for this special case, C must be required
   givenATable.rows[2].cells[2].childNodes[0].setAttribute('required', true);
 }
 else
 {
   if(givenATable.rows[2].cells[2].childNodes[0].getAttribute('required') != null)
     givenATable.rows[2].cells[2].childNodes[0].removeAttribute('required');
 }


 //For the C and D, when the texts are empty, the check box must be disabled
 if(givenATable.rows[2].cells[2].childNodes[0].value == "")
 {
   givenATable.rows[2].cells[1].childNodes[0].setAttribute('disabled', true);
 }
 else
 {
   if(givenATable.rows[2].cells[2].childNodes[0].getAttribute('disabled') != null)
     givenATable.rows[2].cells[1].childNodes[0].removeAttribute('disabled');
 } // if false part

 //same logic as above, but this time for D
 if(givenATable.rows[3].cells[2].childNodes[0].value == "")
 {
   givenATable.rows[3].cells[1].childNodes[0].setAttribute('disabled', true);
 }
 else
 {
   if(givenATable.rows[3].cells[2].childNodes[0].getAttribute('disabled') != null)
     givenATable.rows[3].cells[1].childNodes[0].removeAttribute('disabled');
 } // if false part
} // function activateCD
