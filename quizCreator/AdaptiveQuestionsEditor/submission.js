//function for creating 2d array
function createTableArray(givenNumOfRows, givenNumOfColumns)
{
  var tableArray = new Array(givenNumOfRows);

  for(var index = 0; index < tableArray.length; index++)
  {
    tableArray[index] = new Array(givenNumOfColumns);
  } // for loop

  return tableArray;


  tableArray =
[1, "what is the capital city of london?", 1, 0, 20, "yellow yellow"],
[1, "what is the capital city of Korea?",  1, 1, 20, "green green"]]

} // function create2DArray

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

  //push the quiz id
  qArray.push(getQuizHeader().getAttribute('data-quizId'));

  //now locate the text, and push the text#
  qArray.push(givenQTable.rows[1].cells[1].childNode.innerHTML);

  //now find the x coordinate and y coordinate, push them
  qArray.push(givenQTable.getAttribute('data-x'));
  qArray.push(givenQTable.getAttribute('data-y'));

  //now to the feedback. for this you need to access the anserTable
  var answersTable = document.getElementById('answersTable' + givenQTable.getAttribute('data-index'));

  //locate the feedback field, and push the value to the array
  qArray.push(answersTable.rows[0].cells[3].childNode.innerHTML);

  // return the array
  return qArray;

} // function createQDiv



//function for creating the question table
function createQTableArray()
{
  //use push method to dynamically add the Q arrays.

  var qTableArray;

  return qTableArray;

} // function createQTableArray




//function for creating an array that stores information about
// the answers of a particular question
function createAnswerArray(givenATable)
{


    //now find the x coordinate and y coordinate, push them
  var aArray;

  return aArray;


} // function createAnswerArray


//function for creating an answer array table
function createATableArray()
{
    //now find the x coordinate and y coordinate, push them
} // function crateATableArray


//---------------------------------------------------------------------------







//----------------------- accessor methods -----------------------------//
//accessing the quiz header
function getQuizHeader()
{
  //access the quiz header by id
  var quizHeader = document.getElementById('quizHeader');

  //return the element
  return quizHeader;
}

//accessing the root question divs
function getRootQDiv()
{
  //access the rootQDiv by class name
  var rootQDivs = document.getElementsByClassName('rootQDiv');

  // return an arrray of a ll root q divs
  return rootQDivs;
}



//--------------------------------------------------------------------------
