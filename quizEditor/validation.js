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
      ansTable.nextElementSibling.innerHTML = "There must be at least 1 correct answer."
      isCheckedValid = false;
    } // true part
    else
    {  // if greater than 1, remove the error message
      ansTable.nextElementSibling.innerHTML = "";
    } //false part
  } // for loop - looping through each ansTable

  //return
  return isCheckedValid;
} // validateCorrectCheckbox
