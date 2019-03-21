// code for valiation

//validate the number of checked boxes for each ans table
// if there are no correct answers at all, put error message below the answer table!
// it seems you should put p element in each cell! (right below the table)
function validateCorrectCheckbox(givenType)
{
  var ansTableArray;

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
  var isCheckedValid = true;


  for(var index1 = 0; index1 < ansTableArray.length; index1++)
  {
    numOfCheckedSoFar = 0;
    //get the ansTable
    ansTable = ansTableArray[index1];
    //now loop throgh the table row.
    //work out the numOfCheckedSoFar
    for(var index2 = 0; index2 < ansTable.rows.length; index2++)
    {
      if(ansTable.rows[index2].cells[1].childNodes[0].checked == true)
      {
       numOfCheckedSoFar++;
      }
    } // for loop - looping through eacch row

    //check the numof checed
    if(numOfCheckedSoFar < 1)
    {
      //if it is less than one, than printout an error message
      ansTable.nextElementSibling.style.display = "block";
      ansTable.nextElementSibling.innerHTML = "There must be at least 1 correct answer.";
      isCheckedValid = false;

      //put message on the save notifier as well
      saveNotifier = document.getElementById('saveNotifier');
      saveNotifier.innerHTML = "Oops! some questions have no correct answers."


    } // true part
    else
    {  // if greater than 1, remove the error message
      ansTable.nextElementSibling.style.display = "none";
      ansTable.nextElementSibling.innerHTML = "";
    } //false part
  } // for loop - looping through each ansTable

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

   //if C also has some value in it, activate D as well
   if(givenATable.rows[2].cells[2].childNodes[0].value != "")
   {
     givenATable.rows[3].cells[2].childNodes[0].removeAttribute('disabled');
   } // inner if
   else
   {
     //else , you have to disable D
     givenATable.rows[3].cells[2].childNodes[0].setAttribute('disabled', true);
   }
 } // outer if
 else
 {
   //if either A and B are not filled, disable C and D
   givenATable.rows[2].cells[2].childNodes[0].setAttribute('disabled',true);
   givenATable.rows[3].cells[2].childNodes[0].setAttribute('disabled',true);
 } //outer if false part
} // function activateCD
