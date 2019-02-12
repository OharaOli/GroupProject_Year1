
//for different quizzes - why not create different tabs for different quizzes?

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


  //first cell represents the index for the question
  var indexCell = row.insertCell(0);
  indexCell.innerHTML = lastRowIndex - 1;
  indexCell.id = "i" + (lastRowIndex - 1);

  //second cell represents the question
  var questionCell = row.insertCell(1);
  questionCell.innerHTML = "<input type='text' name='Question'>";
  questionCell.id = ("q" + (lastRowIndex-1));

  //inserts relations cell
  var nodesCell = row.insertCell(2);
  nodesCell.innerHTML = "<input type='text' name='RelatedNodes'>";
  nodesCell.id = ("rn" + (lastRowIndex-1));

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

  // create addAnswer & deleteAnswer buttons!
  var elementAddAnswerButton = document.createElement("input");
  elementAddAnswerButton.setAttribute('type', 'button');
  elementAddAnswerButton.setAttribute('value', 'Add answer');
  elementAddAnswerButton.setAttribute('onclick', "addAnswerRow('answersTableQ" + (lastRowIndex - 1) + "', '" + (lastRowIndex - 1) + "')");

  var elementDeleteAnswerButton = document.createElement("input");
  elementDeleteAnswerButton.setAttribute('type', 'button');
  elementDeleteAnswerButton.setAttribute('value', 'Delete answer');
  elementDeleteAnswerButton.setAttribute('onclick', "deleteQuestionRow('answersTableQ" + (lastRowIndex - 1) + "')");


  //append the two buttons to the hiddenpart
  elementHiddenPart.appendChild(elementAddAnswerButton);
  elementHiddenPart.appendChild(elementDeleteAnswerButton);

  //append the table to the hiddenPart
  elementHiddenPart.appendChild(elementAnswersTable);


  //append the button to the cell
  answerCell.appendChild(elementHideShowButton);

  //append the hidden part as the child of the cell
  answerCell.appendChild(elementHiddenPart);

  addAnswerRow('answersTableQ' + (lastRowIndex -1));



  /* these code - not required for now.
  //then add four answer cells
  var ansCell1 = row.insertCell(2);
  ansCell1.innerHTML = "<input type='text' name='Answer1'>";
  ansCell1.id = ("ans" + (lastRowIndex-1) + "0");

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

//method to add a row onto quiz maker table
function deleteQuestionRow(givenTable)
{
  //put quiz maker table into a variable
  var table = document.getElementById(givenTable);
  //put last row index into a varibale
  var lastRowIndex = table.rows.length;

  //delete a row from the table
  table.deleteRow(lastRowIndex-1);
}



function addAnswerRow(givenTable, givenQuestionNum)
{
  //put answer table into a variable
  var table = document.getElementById(givenTable);
  //put last row index into a varibale
  var lastRowIndex = table.rows.length;


  if(lastRowIndex <= 3)
  {
    //inserts a row onto the table
    var row = table.insertRow(lastRowIndex);

    //first cell is the index for the answer
    var indexCell = row.insertCell(0);
    indexCell.innerHTML = lastRowIndex;
    indexCell.id = "indexAnsQ" + givenQuestionNum + (lastRowIndex);

    //second Cell is just an answer
    var answerCell = row.insertCell(1);
    answerCell.innerHTML = "<input type='text' name='Answer'>";
    answerCell.id = ("ansQ" + givenQuestionNum + (lastRowIndex));

    //third cell is the switch
    var switchCell = row.insertCell(2);
    switchCell.innerHTML = "<input type='checkbox'> ";

    //the last cell is for the descriptions
    var descriptionCell = row.insertCell(3);
    descriptionCell.innerHTML = "<input type='text' name='Description'>";
  }
  else;

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
