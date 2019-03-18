//javaScript for retrieving the editor
//assuming I have the two arrays (question array, and answers array)
//now what I want is retrieve exactly the same editor from these two arrays


var numOfRootQSoFarRe= 0;
var numOfSubQSoFarRe = 0;
var numOfQSoFarRe = 0;


//-------- lines of codes that are executed on accesing the page -------//

function retrieve()
{

//retrieve the root questions and sub questions
retrieveRootQ(qTableArray);
retrieveSubQ(qTableArray);

} // function retrieve





//----------------------------------------------------------------------//


function retrieveRootQ(givenQTableArray)
{

  //variable to store an array of root questions
  var arrayOfRootQ = [];

  //get an array upto to the point where the y-coord is zero
  for(var index = 0; index < givenQTableArray.length; index++)
  {
    if(givenQTableArray[index][2] == 0)
    {
      arrayOfRootQ.push(givenQTableArray[index]);

    } // if true part
  } // for loop


  //get the add root q button
  var addRootQButton = document.getElementById('addRootQButton');


  var rootQText;
  var rootQTime;
  var rootQTable;
  var rootQX;
  var rootQY;


  //for each root Q array, virtually 'push the button;
  for(var index = 0; index < arrayOfRootQ.length; index++)
  {
    //update the variables
    rootQText = arrayOfRootQ[index][0];

    rootQTime = arrayOfRootQ[index][3];

    rootQFeedback = arrayOfRootQ[index][4];

    //add root questions, while at the same time get the rootQTable element
    rootQTable = addRootQuestion(addRootQButton, rootQText, rootQTime, rootQFeedback);

    //retrive the ansers for this root q, if there is any
    retrieveQAns(rootQTable, aTableArrayAllTest);
  } // for loop

}// retrieveRootQ


function retrieveQAns(givenRootQTable, givenAnsTableArrayAll)
{
  var rootQX = givenRootQTable.getAttribute('data-x');
  var rootQY = givenRootQTable.getAttribute('data-y');
  var ansIndex;
  var ansRow;
  var ansText;
  var ansCorrect;
  var rootQAnsTable;


  // loop through the ansers
  for(var index = 0; index < givenAnsTableArrayAll.length; index++)
  {
    //the two coordinates must match
    if(aTableArrayAllTest[index][1] == rootQX
       && aTableArrayAllTest[index][2] == rootQY)
    {
      //match found
      // find the ansIndex
      ansIndex = aTableArrayAllTest[index][5];

      //find the row
      switch (ansIndex)
      {
        case "A": ansRow = 0;
          break;
        case "B": ansRow = 1;
          break;
        case "C": ansRow = 2;
          break;
        case "D": ansRow = 3;
          break;
        default:;
      } // switch statement to determine the row

      //get the text and correct value
      ansText = aTableArrayAllTest[index][3];

      if(aTableArrayAllTest[index][4] == "1")
        ansCorrect = true;
      else
        ansCorrect = false;

      //locate the ans table of the root Q
      rootQAnsTable = givenRootQTable.rows[1].cells[3].childNodes[0];

      //insert the the correct value (boolean) to the corresponding row
      rootQAnsTable.rows[ansRow].cells[1].childNodes[0].checked = ansCorrect;

      //the text as well
      rootQAnsTable.rows[ansRow].cells[2].childNodes[0].value = ansText;
    } // if statement
  } // for loop
} // function retrieveRootQAns


function retrieveSubQ(givenQTableArray)
{
  var arrayOfSubQ = [];

  //variables to store the coordinates
  var coordX;
  var maxCoordYSoFar = 0;



  //get an array from the point the y value is not zero
  for(var index = 0; index < givenQTableArray.length; index++)
  {
    if(givenQTableArray[index][2] != 0)
    {
      arrayOfSubQ.push(givenQTableArray[index]);
    } // if true part
  } // for loop

  var addSubQButton;
  var subQText;
  var subQTime;
  var subQFeedback;
  var subQTable;

  for(var index = 0; index < arrayOfSubQ.length; index++)
  {
    //first access the sub question, and..
    // figure out which root question it belongs to
    coordX = arrayOfSubQ[index][1];

    //grab the corresponding addsubquestion button
    addSubQButton = document.getElementById('addSubQButton' + coordX);

    //click the button (max y coord) times (it is 1-based)
    subQText = arrayOfSubQ[index][0];
    subQTime = arrayOfSubQ[index][3];
    subQFeedback = arrayOfSubQ[index][4];

    subQTable = addSubQuestion(addSubQButton, subQText, subQTime, subQFeedback);

    //retrive the ansers for this root q, if there is any
    retrieveQAns(subQTable, aTableArrayAllTest);
  } // outer for loop

} // retrieve sub question
