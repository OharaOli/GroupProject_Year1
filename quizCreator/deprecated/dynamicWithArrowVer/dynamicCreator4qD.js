//variables to keep track



//for different quizzes - why not create different tabs for different quizzes?
// here Q1.__proto__ === root.prototype
// and hence Q1.__proto__.__proto__ = root.prototype.__proto__
// === Oject.prototype === null

//variable to keep track of the question number
var numOfQCreatedSoFar = 1;

//variable to store the question hierarchy
//initaily has the root as its prototype
//why use prototype? potential benefit when you want to some questions





//now what I want is implementing the hierarchy chaining!


/*
function addAtoQRow(givenTableId, AtoQButtonRowIndex)
{
} // function addAtoQRo
*/

//fuction to access each column until it finds given String
// returns the row index
function firstStringRowIndex(givenTableId, questionString)
{
  //first get the Row
  var table = document.getElementById(givenTableId);

  for(i = 0; i < table.rows.length; i++)
  {
    //get the cell collections
    var cellsInTheRow = table.rows[i].cells;

    //alert(cellsInTheRow[0].innerText);
    //compare the first column with the givenQString
    if(cellsInTheRow[0].innerText == questionString)
    {
      //return the index of the row at which the string is found
      //alert(i);
      return i;
    }
  } // for loop

} // function searchEachRow

//function for adding Q-Q related question with a link row
//i.e. this function adds two rows at the same time
//giventableId (string) : the table I want to manipulate
//buttonRow (integer) : the row at which the QtoQButton is loated
// this variable is needed  in order to decide below which row a new -
// -row should be inserted. (it is a relative point)
function addQtoQRow(givenTableId, givenLinkCellId)
{
  //alert(givenTableId);
  //update the number of Q created so far
  //need this for consructing the next string value
  numOfQCreatedSoFar++;


  //you need a relative point
  //update the property of the nextQuestion
  //will be used to set the index
  var currentQuestionLinkCell = document.getElementById(givenLinkCellId);
  //alert(givenLinkCellId);

  var nextQuestionHierarchy = currentQuestionLinkCell.innerText + ">" + "Q" + numOfQCreatedSoFar;



  //if there already is QtoQlinkRowsalready, count the number of them and
  // insert a new row below the latest one
  //Now how would I count them...? - I need unique identifiers.. or any better way?
  //I need a way to access the first column value of every 1, 3, 5, ...  odd row.


  //if there is no QtoQLinkRow, inset the new Row right below the QtoQButtonRowIndex
  //Let's do this one first.

  //getting the table to a variable
  var table = document.getElementById(givenTableId);

  //Index to determine where to insert a new row
  //This is always right below the button row, so add  1 to the buttonRow
  // index.
  //relative point = the row where the button is placed at
  //need something safer way than this
  var indexOfQ = givenLinkCellId.indexOf("Q");
  var currentQString = "";
  for(index = indexOfQ; index < givenLinkCellId.length; index++)
  {
    currentQString = currentQString + givenLinkCellId.charAt(index);
  } // for loop


  var newRowIndex = parseInt(firstStringRowIndex(givenTableId, currentQString)) + 2;

  //Insert a new row for the link information onto the table at the newRowIndex
  var linkRow = table.insertRow(newRowIndex);

  //first cell of the linkRow is the link hierarchy
  var linkRowFirstCell = linkRow.insertCell(0);

  //set the index
  linkRowFirstCell.innerHTML = "" + nextQuestionHierarchy;

  //set the id
  linkRowFirstCell.setAttribute('id', 'linkCellQ' + numOfQCreatedSoFar);


  //second cell is for the description
  var linkRowSecondCell = linkRow.insertCell(1);
  linkRowSecondCell.setAttribute('colspan', '3');

  //create an input element which will be used as the text field
  var elementLinkDescription = document.createElement('input');

  // Set the input attributes type and value for the button
  elementLinkDescription.setAttribute('type','text');
  elementLinkDescription.setAttribute('placeholder','link description');

  //append this to the cell
  linkRowSecondCell.appendChild(elementLinkDescription);


  //inserts a row onto the table
  var questionRow = table.insertRow(newRowIndex + 1);

  //set to 3 because the table starts with 3 rows by default
  //var nextRowIndex = 3;



  //first cell represents the index for the question with id
  var indexCell = questionRow.insertCell(0);
  indexCell.innerHTML = "Q" + numOfQCreatedSoFar;




  //second cell represents the question
  var questionCell = questionRow.insertCell(1);
  var elementQuestionText = document.createElement('input');
  elementQuestionText.setAttribute('type', 'text');
  questionCell.appendChild(elementQuestionText);
  questionCell.setAttribute('rowspan', '2%');



  //inserts timeLimitCell with id
  var timeLimtCell = questionRow.insertCell(2);
  var elementTimeLimit = document.createElement('input');
  elementTimeLimit.setAttribute('type', 'text');
  timeLimtCell.appendChild(elementTimeLimit);
  timeLimtCell.setAttribute('rowspan', '2%');


  //inserts answer cell, which will be another table
  var answerCell = questionRow.insertCell(3);
  //create an input element which will be used as a button
  var elementHideShowButton = document.createElement('input');

  // Set the input attributes type and value for the button
  elementHideShowButton.setAttribute('type','button');
  elementHideShowButton.setAttribute('value','Hide/show answers');

  // ADD THE BUTTON's 'onclick' EVENT.
  elementHideShowButton.setAttribute('onclick', "hideORShow('hiddenPartQ" + numOfQCreatedSoFar + "')");

  //create div element (used for indexing the part that will be hidden whe -
  // - the show/hide button is pressed)
  var elementHiddenPart = document.createElement('div');
  elementHiddenPart.setAttribute('id',"hiddenPartQ" + numOfQCreatedSoFar);

  //create answers table element
  var elementAnswersTable = document.createElement('table');

  //set unique id for the answersTable
  elementAnswersTable.setAttribute('id', 'answersTableQ' + numOfQCreatedSoFar);

  //setting the attributes for the table
  elementAnswersTable.setAttribute('width' , '350px');
  elementAnswersTable.setAttribute('border', '1');


  //append the table to the hiddenPart
  elementHiddenPart.appendChild(elementAnswersTable);

  //append the button to the cell
  answerCell.appendChild(elementHideShowButton);

  //append the hidden part as the child of the cell
  answerCell.appendChild(elementHiddenPart);
  answerCell.setAttribute('rowspan', '2%');
  addAnswerRow('answersTableQ' + numOfQCreatedSoFar, numOfQCreatedSoFar);

  //separating the button with the index
  var buttonRow = table.insertRow(newRowIndex + 2);
  var buttonCell = buttonRow.insertCell(0);

  //creating the addQtoQLink
  var elementAddQtoQButton = document.createElement('input');
  elementAddQtoQButton.setAttribute('type', 'button');
  elementAddQtoQButton.setAttribute('value', 'addQtoQLink');
  elementAddQtoQButton.setAttribute('onClick', "addQtoQRow('creatorForQ1',"
                                    + "'linkCellQ" + (numOfQCreatedSoFar) + "')");
  buttonCell.appendChild(elementAddQtoQButton);


} // function addQtoQRow







//method to add a row onto quiz maker table
function addQuestionRow(givenTable) {
  //put quiz maker table into a variable
  var table = document.getElementById(givenTable);
  //put last row index into a varibale
  var lastRowIndex = table.rows.length;

  //inserts a row onto the table
  var row = table.insertRow(lastRowIndex);

  //set to 3 because the table starts with 3 rows by default
  //var nextRowIndex = 3;


  //first cell represents the index for the question with id
  var indexCell = row.insertCell(0);
  indexCell.innerHTML = "<name='IndexCell' id='i" + (lastRowIndex-1) + "'>"
                          + (lastRowIndex);

  //second cell represents the question with id
  var questionCell = row.insertCell(1);
  questionCell.innerHTML = "<input type='text' name='Question' id='q"
                            + (lastRowIndex-1) + "'>";

  //inserts relations cell with id
  var nodesCell = row.insertCell(2);
  nodesCell.innerHTML = "<input type='text' name='RelatedNodes' id='rn"
                            + (lastRowIndex-1) + "'>";

  //inserts answer cell, which will be another table
  var answerCell = row.insertCell(3);
  //create an input element which will be used as a button
  var elementHideShowButton = document.createElement('input');

  // Set the input attributes type and value for the button
  elementHideShowButton.setAttribute('type','button');
  elementHideShowButton.setAttribute('value','Hide/show answers');

  // ADD THE BUTTON's 'onclick' EVENT.
  elementHideShowButton.setAttribute('onclick', "hideORShow('hiddenPartQ" + (lastRowIndex - 1) + "')");

  //create div element (used for indexing the part that will be hidden whe -
  // - the show/hide button is pressed)
  var elementHiddenPart = document.createElement('div');
  elementHiddenPart.setAttribute('id',"hiddenPartQ" + (lastRowIndex - 1));

  //create answers table element
  var elementAnswersTable = document.createElement("table");

  //set unique id for the answersTable
  elementAnswersTable.setAttribute('id', 'answersTableQ' + (lastRowIndex - 1));

  //setting the attributes for the table
  elementAnswersTable.setAttribute('width' , '350px');
  elementAnswersTable.setAttribute('border', '1');



  //append the two buttons to the hiddenpart
  elementHiddenPart.appendChild(elementAddAnswerButton);
  elementHiddenPart.appendChild(elementDeleteAnswerButton);


  //append the table to the hiddenPart
  elementHiddenPart.appendChild(elementAnswersTable);


  //append the button to the cell
  answerCell.appendChild(elementHideShowButton);

  //append the hidden part as the child of the cell
  answerCell.appendChild(elementHiddenPart);


  //variable storing current answer table
  var answerTableName = "answersTableQ" + (lastRowIndex-1);

  addAnswerRow(answerTableName,lastRowIndex);


  /*
  //then add four answer cells
  var ansCell1 = row.insertCell(2);
  ansCell1.innerHTML = "<input type='text' name='Answer' id='ans22'>"
  ansCell1.id = ("ans" + (lastRowIndex-1) + "0");
  elementAnswersTable.appendChild(ansCell1);


  var ansCell2 = row.insertCell(3);
  ansCell2.innerHTML = "<input type='text' name='Answer2'>";
  ansCell2.id = ("ans" + (lastRowIndex-1) + "1");

  var ansCell3 = row.insertCell(4);
  ansCell3.innerHTML = "<input type='text' name='Answer3'>";
  ansCell3.id = ("ans" + (lastRowIndex-1) + "2");

  var ansCell4 = row.insertCell(5);
  ansCell4.innerHTML = "<input type='text' name='Answer4'>";
  ansCell4.id = ("ans" + (lastRowIndex-1) + "3");
  */
}

//method to delete a row
function deleteQuestionRow(givenTable)
{
  //put quiz maker table into a variable
  var table = document.getElementById(givenTable);
  //put last row index into a varibale
  var lastRowIndex = table.rows.length;

  if(lastRowIndex >= 3)
  {
  //delete a row from the table
  table.deleteRow(lastRowIndex-1);
  }
  else;

}



function addAnswerRow(givenTable, givenQuestionNum)
{
  //put answer table into a variable
  var table = document.getElementById(givenTable);
  //put last row index into a varibale
  var lastRowIndex = table.rows.length;

  var ansLabelArray = ['a','b','c','d'];


  for(i=3; i>=0; i--)
  {
    //inserts a row onto the table
    var row = table.insertRow(lastRowIndex);

    //first cell is the index for the answer
    var indexCell = row.insertCell(0);
    indexCell.innerHTML = ansLabelArray[i];
    indexCell.id = "indexAnsQ" + givenQuestionNum + (lastRowIndex);

    //second Cell is just an answer
    var answerCell = row.insertCell(1);
    answerCell.innerHTML = "<input type='text' name='Answer' id='ans"
                            + givenQuestionNum + i + "' placeholder='Type answer here'>"

    //third cell is the switch
    var switchCell = row.insertCell(2);
    switchCell.innerHTML = "<input type='checkbox' id='swc"
                            + givenQuestionNum + i + "'>"

    //the last cell is for the descriptions
    var descriptionCell = row.insertCell(3);
    descriptionCell.innerHTML = "<input type='text' name='Description' id='dc"
                            + givenQuestionNum + i + "' placeholder='Type description here'>"
  }

} // function addAnswerRow for given table id


//javascript for making an element disappear/appear
function hideORShow(givenId)
{
  var x = document.getElementById(givenId);
  if (x.style.display === "none")
  {
    x.style.display = "block";
  }
  else
  {
    x.style.display = "none";
  }
}
// function to open the creator for each tab
function openCreator(givenQuiz) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(givenQuiz).style.display = "block";
  evt.currentTarget.className += " active";
}
