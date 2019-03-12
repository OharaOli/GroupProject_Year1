// function for the submit button
function submit()
{
  alert(JSON.stringify(createQTableArray()));
  alert(JSON.stringify(createATableArrayAll()));

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
  qArray.push(givenQTable.rows[1].cells[1].childNodes[1].value);

  //now find the x coordinate and y coordinate, push them
  qArray.push(givenQTable.getAttribute('data-x'));
  qArray.push(givenQTable.getAttribute('data-y'));

  //now to the feedback. for this you need to access the anserTable
  var answersTable = document.getElementById('answersTable' + givenQTable.getAttribute('data-index'));

  //locate the feedback field, and push the value to the array
  qArray.push(answersTable.rows[0].cells[3].childNodes[1].value);

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
// the answers of a particular question
function createATableArray(givenATable)
{

  //empty array for the rows
  var aArray = [];

  //have to loop through the table to figure out which answers have
  //the inputs
  for(var index=0; index < givenATable.rows.length; index++)
  {
    //look up the text cell
    //store the information in the cell only if the cell is not empty
    // if it is empty, just ignore that cell
    if(givenTable.rows[index].cells[2].childNode.value != "")
    {
      aArray.push([givenTable.getAttribute('data-x'),
                        givenTable.getAttribute('data-y'),
                        givenTable.rows[index].cells[2].childNodes[1].value,
                        givenTable.rows[index].cells[1].childNodes[1].checked,
                        givenTable.rows[index].cells[0].innerHTML]);
    } // if true part
  } // for loop

  //return the table
  return aArray;


} // function createATableArray



function createATableArrayAll()
{
  var aTableArrayAll = [];

  //get all of the answer tables
  var aTables = document.getElementsByClassName('answersTable');

  //concatenate all of the answer tables
  for(var index = 0; index < aTables.length; index++)
  {
    aTableArrayAll.concat(createaArray(aTables[index]));
  } // for loop


  return aTableArrayAll;

} // function createATableArray
//---------------------------------------------------------------------------







//validation:
/*

all of the questionFields and feedBackField must be filled
There must be at least 2 answer fields submitted
For those answer cells with given text, the checkbox must be cheked.


*/
