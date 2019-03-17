var numOfQSoFarSubmit;



var qTableArrayTest;
var aTableArrayAllTest;

var deleteRootQButtons;


// function for the submit button
function submit()
{
  if(validation())
  {
    numOfQSoFarSubmit = 0;
    qTableArrayTest = createQTableArray();
    aTableArrayAllTest = createATableArrayAll();

    alert("submission complete");
    alert("2D array of questions: "
          + "\n" + JSON.stringify(qTableArrayTest));
    alert("2D array of answers: "
          + "\n" + JSON.stringify(aTableArrayAllTest));
  } // if statement
}

function deleteAll()
{
  deleteRootQButtons = document.getElementsByClassName('deleteRootQButton');

  //delete them all
  for(var index = 0; index < deleteRootQButtons.length; index++)
  {
    deleteRootQuestion(deleteRootQButtons[index]);
  }

}


//------------------ array constructor methods --------------------------//
//function for creating an array that stores all the information about a question
//e.g.
/*QArray =
[1, "what is the capital city of london?", 1, 0, 20, "yellow yellow"]*/
function createQArray(givenQTable)
{
  //given Q table is either root Q or sub Q, but doesn't matter.
  //since I#ve assigned 'data-x' and 'data-y' properties to each table.
  //just simply need to access them
  var qArray = [];



  //locate the text, and push the text
  qArray.push(givenQTable.rows[1].cells[1].childNodes[0].value);

  //now find the x coordinate and y coordinate, push them
  qArray.push(givenQTable.getAttribute('data-x'));
  qArray.push(givenQTable.getAttribute('data-y'));

  //now store the timelimit
  qArray.push(givenQTable.rows[1].cells[2].childNodes[0].value);


  var answersTable = document.getElementById('answersTable' + givenQTable.getAttribute('data-x')
                                                            + "."
                                                            + givenQTable.getAttribute('data-y'));

  //locate the feedback field, and push the value to the array
  qArray.push(answersTable.rows[0].cells[3].childNodes[0].value);

  // return the array
  return qArray;

} // function createQDiv



//function for creating the question table
function createQTableArray()
{
  //use push method to dynamically add the Q arrays.

  var qTableArray = [];

  //now fill up the table using the createQArray function
  // get all of the root Q tables
  var rootQTables = document.getElementsByClassName('rootQTable');

  //push the root QTables to the table array using for loop
  for(var index= 0; index < rootQTables.length; index++)
  {
    qTableArray.push(createQArray(rootQTables[index]));
  }// for loop


  //get all of the sub Q tables
  var subQTables = document.getElementsByClassName('subQTable');

  //push the sub QTables to the table array using for loop
  for(var index= 0; index < subQTables.length; index++)
  {
    qTableArray.push(createQArray(subQTables[index]));
  }// for loop

  return qTableArray;

} // function createQTableArray




//function for creating an array that stores information about
// the answers of a particular questione array
function createATableArray(givenATable)
{

  //empty array for the rows
  var aArray = [];

  //have to loop through the table to figure out which answers have
  //the inputs
  for(var index= 0; index < givenATable.rows.length; index++)
  {
    //look up the text cell
    //store the information in the cell only if the cell is not empty
    // if it is empty, just ignore that cell
    if(givenATable.rows[index].cells[2].childNodes[0].value != "")
    {

      var workArray = [numOfQSoFarSubmit,
                      givenATable.getAttribute('data-x'),
                      givenATable.getAttribute('data-y'),
                       givenATable.rows[index].cells[2].childNodes[0].value];
      //transform the true and false to 1 and zero
      if(givenATable.rows[index].cells[1].childNodes[0].checked == true)
      {
        workArray.push("1");
      }
      else
      {
        workArray.push("0");
      }

      //now push the index
      workArray.push(givenATable.rows[index].cells[0].innerHTML);

      //push the workarray to the whole array
      aArray.push(workArray);
    } // if true part
  } // for loop

  //return the table
  return aArray;


} // function createATableArray



function createATableArrayAll()
{
  var aTableArrayAll = [];

  //get all of the answer tables for the root questions
  var aTablesRoot = document.getElementsByClassName('answersTableRoot');
  //concatenate all of the answer tables
  for(var index = 0; index < aTablesRoot.length; index++)
  {
    aTableArrayAll = aTableArrayAll.concat(createATableArray(aTablesRoot[index]));
    numOfQSoFarSubmit++;
  } // for loop


  //get all of the answers table for the sub questions
  var aTablesSub = document.getElementsByClassName('answersTableSub');
  //concatenate all of the answer tables
  for(var index = 0; index < aTablesSub.length; index++)
  {
    aTableArrayAll = aTableArrayAll.concat(createATableArray(aTablesSub[index]));
    numOfQSoFarSubmit++;
  } // for loop


  return aTableArrayAll;

} // function createATableArray
//---------------------------------------------------------------------------



function validation()
{
 //validation to check if question feedback boxes are filled.
    valid = true;
    //get all the question boxes created
    var checkQuestion = document.getElementsByClassName('questionField');
    //get all the feedback boxes created
    var checkFeedback = document.getElementsByClassName('feedbackField');

    //for loop through each question bo see if empty
    for (var i = 0; i < checkQuestion.length; i++) {
      if (checkQuestion[i].value == "")
      {
        valid = false;
        document.getElementById('question_validation').innerHTML = "You must fill in ALL the question boxes";
        break;
      }
      else {
        document.getElementById('question_validation').innerHTML = "";
        valid = true;
      }

    }
    //for loop through each feedback box see if empty
    for (var i = 0; i < checkFeedback.length; i++) {
      if (checkFeedback[i].value == "")
      {
        valid = false;
        document.getElementById('feedback_validation').innerHTML = "You must fill in ALL the feedback boxes";
        break;
      }
      else {
        document.getElementById('feedback_validation').innerHTML = "";
        valid = true;

    }

}
  return valid;
}




//validation:
/*

all of the questionFields and feedBackField must be filled
There must be at least 2 answer fields submitted
For those answer cells with given text, the checkbox must be cheked.


*/
