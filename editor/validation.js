// code for valiation

//validate the number of checked boxes for each ans table
// if there are no correct answers at all, put error message below the answer table!
// it seems you should put p element in each cell! (right below the table)



function validateCorrectCheckbox(givenType)
{
  var isCheckedValid;
  var ansTableArray;
  var numOfInvalidTableSoFar = 0;

  //first get all of the answer tables
  if(givenType == "root")
  {
    ansTableArray = document.getElementsByClassName('ansTableRoot');
  }
  else
  {
    ansTableArray = document.getElementsByClassName('ansTableSub');
  }

  //loop through the array, and check
  var numOfCheckedSoFar;
  var ansTable;


  for(var index1 = 0; index1 < ansTableArray.length; index1++)
  {
    numOfCheckedSoFar = 0;
    //get the ansTable
    ansTable = ansTableArray[index1];
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

  } // for loop - looping through each ansTable

  //now change the message
  if(numOfInvalidTableSoFar < 1)
    isCheckedValid = true;
  else
    isCheckedValid = false;

  if(isCheckedValid)
  {
    console.log("is it valid?" + isCheckedValid);

    //make the message appear below the table

    var errorNotifiers = document.getElementsByClassName('errorNotifier');
    for(var index = 0; index < errorNotifiers.length; index++)
    {
      errorNotifiers[index].style.display = 'none';
      errorNotifiers[index].innerHTML = "";
    } // for loop
  }
  else
  {
    console.log("is it valid?" + isCheckedValid);
    var errorNotifiers = document.getElementsByClassName('errorNotifier');
    for(var index = 0; index < errorNotifiers.length; index++)
    {
      errorNotifiers[index].style.display = 'inline-block';
      errorNotifiers[index].innerHTML = "Oops! Some questions have no correct answers!";
    } // for loop
  }

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
