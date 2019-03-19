//javaScript for retrieving the editor
//assuming I have the two arrays (question array, and answers array)
//now what I want is retrieve exactly the same editor from these two arrays


var numOfRootQSoFarRe= 0;
var numOfSubQSoFarRe = 0;
var numOfQSoFarRe = 0;

var quizIDRe;




//-------- lines of codes that are executed on accesing the page -------//

function retrieve()
{
retrieveFromDB(1);

//retrieve the root questions and sub questions
retrieveRootQ(questionArray);
retrieveSubQ(questionArray);

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
    retrieveQAns(rootQTable, answerArray);
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
  for(var index = 0; index < answerArray.length; index++)
  {
    //the two coordinates must match
    if(answerArray[index][3] == rootQX
       && answerArray[index][4] == rootQY)
    {
      //match found
      // find the ansIndex
      ansIndex = answerArray[index][2];

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
      ansText = answerArray[index][0];

      if(answerArray[index][1] == "1")
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
    retrieveQAns(subQTable, answerArray);
  } // outer for loop

} // retrieve sub question




//****************************retrieve code ********************************
//Oliver O'Hara (part 2)

//JavaScript function intended to return a question and answer array for
//a given quiz when called. These arrays will be in the same form as
//those passed to the upload_quiz function above. This requires the ID
//of the quiz to be returned.


var appendAnswerIndex = 0;
var questionArray = [];
var answerArray = [];

//Return the questions from the given quiz and store them in the array
function retrieveFromDB(quiz_ID) {
   //Send the current question and then call the submit answer function for its answers
   $.ajax({
      async: false,
      url: "../tools/returnQuestions.php",
      cache: false,
      type: "get",
      data:
      {
         quiz_ID: quiz_ID
      }, //data
      success: function(data)
      {
         alert(data);
         var returnQTableArrayTemp = JSON.parse(data);
         var numberOfQuestions = returnQTableArrayTemp.length;
         //Convert the JASON into an array
         for (i = 0; i < numberOfQuestions; i++)
         {
            questionArray.push([returnQTableArrayTemp[i]["text"]]);
            questionArray[i][1] = returnQTableArrayTemp[i]["x_coord"];
            questionArray[i][2] = returnQTableArrayTemp[i]["y_coord"];
            questionArray[i][3] = returnQTableArrayTemp[i]["time"];
            questionArray[i][4] = returnQTableArrayTemp[i]["feedback"];
            questionArray[i][5] = returnQTableArrayTemp[i]["question_id"];
         } //for
         alert("Question array: " + JSON.stringify(questionArray));
         //////////////////////////////////////////////////////////////
         ///////////////// questionArray holds array //////////////////
         //////////////////////////////////////////////////////////////

         for (i = 0; i < numberOfQuestions; i++)
         {
            var question_ID = questionArray[i][5];
            //Ajax call to return the quiz id of the given quiz_name (and user id)
            $.ajax({
               async: false,
               url: "../tools/returnAnswers.php",
               cache: false,
               type: "get",
               data:
               {
                  question_ID: question_ID
               }, //data
               success: function(data)
               {
                  returnATableArray = JSON.parse(data);
                  var numberOfAnswers = returnATableArray.length;
                  //Convert the JASON into an array
                  for (k = 0; k < numberOfAnswers; k++)
                  {
                   answerArray.push([returnATableArray[k]["text"]]);
                   answerArray[appendAnswerIndex][1] = returnATableArray[k]["is_correct"];
                   answerArray[appendAnswerIndex][2] = returnATableArray[k]["letter"];
                   answerArray[appendAnswerIndex][3] = questionArray[i][1];
                   answerArray[appendAnswerIndex][4] = questionArray[i][2];
                   appendAnswerIndex++;
                   } //for
                 } //success function
            }) //ajax

            //Remove the question id from the array
            questionArray[i].pop();
         } //for

      alert("Answer array: " + JSON.stringify(answerArray));
      //////////////////////////////////////////////////////////////
      ////////////////// answerArray holds array ///////////////////
      //////////////////////////////////////////////////////////////

      } //success function
   }) //ajax
} //return_questions
