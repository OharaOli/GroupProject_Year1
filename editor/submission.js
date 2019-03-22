var numOfQSoFarSubmit;

var answerIndex;

var qTableArray;
var returnQTableArray;

var aTableArrayAll;
var returnATableArray;

var deleteRootQButtons;

var username;


// function for the submit button
function save()
{
  var rootCheckValid = validateCorrectCheckbox("root");
  var subCheckValid = validateCorrectCheckbox("sub");

  if(rootCheckValid && subCheckValid)
  {
    numOfQSoFarSubmit = 0;
    qTableArray = createQTableArray();
    aTableArrayAll = createATableArrayAll();

    //JSON stringify
    console.log(JSON.stringify(aTableArrayAll));


    upload_quiz();
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
[1, "what is the capital city of london?", 1, 0,
  parentQX = givenButton.parentNode.parentNode.parentNode.getAttribute('data-x');
  //get the number of sub questions for this root (before pressing the button)
  var numOfSubQSoFarRoot = parseInt(givenButton.previousElementSibling.getAttribute('data-numOfSubQSoFar'));
20, "yellow yellow"]*/
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


  var answersTable = document.getElementById('ansTable' + givenQTable.getAttribute('data-x')
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
    console.log("the value: ");
    console.log(givenATable.rows[index].cells[2].childNodes[0].value);
    console.log("disability: ");
    console.log(givenATable.rows[index].cells[2].childNodes[0].getAttribute('disabled'));
    if(givenATable.rows[index].cells[2].childNodes[0].value.trim() != ""
       && givenATable.rows[index].cells[2].childNodes[0].getAttribute('disabled') == null);
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
  var aTablesRoot = document.getElementsByClassName('ansTableRoot');
  //concatenate all of the answer tables
  for(var index = 0; index < aTablesRoot.length; index++)
  {
    aTableArrayAll = aTableArrayAll.concat(createATableArray(aTablesRoot[index]));
    numOfQSoFarSubmit++;
  } // for loop


  //get all of the answers table for the sub questions
  var aTablesSub = document.getElementsByClassName('ansTableSub');
  //concatenate all of the answer tables
  for(var index = 0; index < aTablesSub.length; index++)
  {
    aTableArrayAll = aTableArrayAll.concat(createATableArray(aTablesSub[index]));
    numOfQSoFarSubmit++;
  } // for loop


  return aTableArrayAll;

} // function createATableArray
//---------------------------------------------------------------------------
//sorry Yamin I don't need your code anymore..

//-------------------------------submission -----------------------------//
//Oliver O'Hara (part 1)

//JavaScript function intended to run when the submit button is pressed
//The function will retrieve the data for each row in turn and send it to the
//database via an ajax call to a php function.



//Store the name of the quiz and return the ID where its stored to store the questions
function upload_quiz() {
   //Return the name of the quiz being submitted
   var quizName = $("#quizHeader").text().trim();
   //Ajax call to store the quiz name (and temp account id) and call submit question with the id
   $.ajax({
      async: false,
      url: "../tools/insertQuizName.php",
      cache: false,
      type: "post",
      data:
      {
         quizName: quizName,
         username: username,
         oldQuizID: quizIDRe
      }, //data
      success: function(data)
      {
        if(quizIDRe == "0")
          quizIDRe = data;
        upload_questions(quizIDRe);
      } //success function
   }) //ajax
} //upload_quiz


//Store the questions one at a time using the quiz ID, storing the answers after each one
function upload_questions(quizID) {
   //Store the number of questions in the quiz
   numberOfQuestions = document.getElementById("quizEditor").getAttribute("data-numOfQuestions");
   numberOfQuestions = parseInt(numberOfQuestions);
   var questionID = null;
   answerIndex = 0;
   //Loop through the number of questions
   for (i = 0; i < numberOfQuestions; i++)
   {
      //Access the array storing the data for this question
      var questionText = qTableArray[i][0];
      var xCoord = qTableArray[i][1];
      var yCoord = qTableArray[i][2];
      var time = qTableArray[i][3];
      var feedback = qTableArray[i][4];

      //Send the current question and then call the submit answer function for its answers
      $.ajax({
         async: false,
         url: "../tools/insertQuestions.php",
         cache: false,
         type: "post",
         data:
         {
            quizID: quizID,
            questionText: questionText,
            xCoord: xCoord,
            yCoord: yCoord,
            time: time,
            feedback: feedback
         }, //data
         success: function(data)
         {
            questionID = data;
            upload_answers(data);
         } //success function
      }) //ajax
   } //for
   //this code is triggered when the save is successfully done.
   $("#saveNotifier").finish().fadeIn("fast").css({"display": "inline-block"}).delay(2000).fadeOut("slow");
   $("#saveNotifier2").finish().fadeIn("fast").css({"display": "inline-block"}).delay(2000).fadeOut("slow");
} //upload_questions

//Store the answers under the given question ID
function upload_answers(question_ID) {
   //While to check how many answers there are for the given question
   while (answerIndex < aTableArrayAll.length && aTableArrayAll[answerIndex][0] == i)
   {
      //Access the array storing the data for this answer
      var answerText = aTableArrayAll[answerIndex][3];
      var isCorrect = aTableArrayAll[answerIndex][4];
      var letter = aTableArrayAll[answerIndex][5];
      answerIndex += 1;

      //Send each answer individually, storing it with the correct question id
      $.ajax({
    async: false,
         url: "../tools/insertAnswers.php",
         cache: false,
         type: "post",
         data:
         {
            question_ID: question_ID,
            answerText: answerText,
            isCorrect: isCorrect,
            letter: letter
         }, //data
      }) //ajax
   } //while
} //upload_questions

//Oliver O'Hara (part 2)

//JavaScript function intended to return a question and answer array for
//a given quiz when called. These arrays will be in the same form as
//those passed to the upload_quiz function above.



//Store the name of the quiz and return the ID where its stored to store the questions
function return_quiz(quizName) {
   //Ajax call to return the quiz id of the given quiz_name (and user id)
   $.ajax({
      async: false,
      url: "../tools/returnQuizID.php",
      cache: false,
      type: "get",
      data:
      {
         quizName: quizName
      }, //data
      success: function(data)
      {
         quizID = data;
         return_questions(data);
      } //success function
   }) //ajax
} //return_quiz


//Return the questions from the given quiz and store them in the array
function return_questions(quiz_ID) {
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
         returnQTableArray = data;
         var numberOfQuestions = returnQTableArray.length;
         for (i = 0; i < numberOfQuestions; i++)
         {
       var question_ID = returnQTableArray[i][5];
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
                  returnATableArray.push(data);
               } //success function
            }) //ajax

            //Remove the question id from the array
            returnQTableArray = returnQTableArray.slice(i, 5);

            //Adding the x and y coords to the answer array
            returnATableArray[i][5] = returnQTableArray[i][1];
            returnATableArray[i][6] = returnQTableArray[i][2];
         } //for
      } //success function
   }) //ajax
} //return_questions



//validation:
/*

all of the questionFields and feedBackField must be filled
There must be at least 2 answer fields submitted
For those answer cells with given text, the checkbox must be cheked.


*/
