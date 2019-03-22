// number of the root questions so far (those with no indentations)
var numOfRootQSoFar = 0;
var numOfSubQSoFar = 0;
var numOfQSoFar = 0;




//function for creating a table for the four answers
function createAnswersTable(givenX, givenY, givenQFeedback, isRoot)
{
  //create aTable
  var aTable = document.createElement('table');

  aTable.setAttribute('name', 'ansTable');

  //set attributes
  aTable.setAttribute('id', 'ansTable' + givenX + givenY);
  if(isRoot)
  {
    aTable.setAttribute('class', 'ansTableRoot');
  }
  else
  {
    aTable.setAttribute('class', 'ansTableSub');
  }

  aTable.setAttribute('border', 1);


  aTable.setAttribute('data-x', givenX);
  aTable.setAttribute('data-y', givenY);

  // row for the answer A
  var rowA = aTable.insertRow(0);
  var indexCellA = rowA.insertCell(0);
  indexCellA.innerHTML = "A";

  var correctCheckboxCellA = rowA.insertCell(1);
  var correctCheckboxA = document.createElement('input');
  correctCheckboxA.setAttribute('type', 'checkbox');
  correctCheckboxA.setAttribute('class', 'correctCheckbox')
  correctCheckboxCellA.appendChild(correctCheckboxA);


  var answerCellA = rowA.insertCell(2);
  var answerFieldA = document.createElement('input');
  answerFieldA.setAttribute('type', 'text');
  answerFieldA.setAttribute('placeholder', 'answer A *');
  answerFieldA.setAttribute('maxlength', 34);
  answerFieldA.setAttribute('class', 'answerField');
  answerFieldA.setAttribute('required', true);
  answerFieldA.setAttribute('oninvalid', "this.setCustomValidity('There must be at least 2 answers for the question.')");
  answerFieldA.setAttribute('oninput',"this.setCustomValidity('')");
  answerCellA.appendChild(answerFieldA);




  //description Cell - only for this row
  //need only one description Cell for the four cells
  var feedbackCell = rowA.insertCell(3);
  feedbackCell.setAttribute('rowspan', 4);
  var feedbackField = document.createElement('textarea');
  feedbackField.setAttribute('placeholder', 'feedback');
  feedbackField.setAttribute('type', 'text');
  feedbackField.setAttribute('class', 'feedbackField');
  feedbackField.setAttribute('maxlength', 100);
  feedbackField.setAttribute('onkeydown', 'return (event.keyCode!=13);');


  if(givenQFeedback != null)
  {
    feedbackField.innerHTML = givenQFeedback;
  }// if statement

  feedbackCell.appendChild(feedbackField);



  // row for the answer B
  var rowB = aTable.insertRow(1);

  var indexCellB = rowB.insertCell(0);
  indexCellB.innerHTML = "B";

  var correctCheckboxCellB = rowB.insertCell(1);
  var correctCheckboxB = document.createElement('input');
  correctCheckboxB.setAttribute('type', 'checkbox');
  correctCheckboxB.setAttribute('class', 'correctCheckbox')

  correctCheckboxCellB.appendChild(correctCheckboxB);


  var answerCellB = rowB.insertCell(2);
  var answerFieldB = document.createElement('input');
  answerFieldB.setAttribute('type', 'text');
  answerFieldB.setAttribute('placeholder', 'answer B *');
  answerFieldB.setAttribute('maxlength', 34);
  answerFieldB.setAttribute('class', 'answerField');
  answerFieldB.setAttribute('required', true);
  answerCellB.appendChild(answerFieldB);


  // row for the answer C
  var rowC = aTable.insertRow(2);

  var indexCellC = rowC.insertCell(0);
  indexCellC.innerHTML = "C";

  var correctCheckboxCellC = rowC.insertCell(1);
  var correctCheckboxC = document.createElement('input');
  correctCheckboxC.setAttribute('type', 'checkbox');
  correctCheckboxC.setAttribute('class', 'correctCheckbox');
  correctCheckboxC.setAttribute('disabled', true);

  // C is disabled until A and B are

  correctCheckboxCellC.appendChild(correctCheckboxC);


  var answerCellC = rowC.insertCell(2);
  var answerFieldC = document.createElement('input');
  answerFieldC.setAttribute('type', 'text');
  answerFieldC.setAttribute('maxlength', 34);
  answerFieldC.setAttribute('placeholder', 'answer C');
  answerFieldC.setAttribute('disabled', true);
  answerFieldC.setAttribute('class', 'answerField');
  answerFieldC.setAttribute('oninvalid', "this.setCustomValidity('You must fill in C in order to submit D.')");
  answerCellC.appendChild(answerFieldC);





  // row for the answer D
  var rowD = aTable.insertRow(3);

  var indexCellD = rowD.insertCell(0);
  indexCellD.innerHTML = "D";

  var correctCheckboxCellD = rowD.insertCell(1);
  var correctCheckboxD = document.createElement('input');
  correctCheckboxD.setAttribute('type', 'checkbox');
  correctCheckboxD.setAttribute('class', 'correctCheckbox')
  correctCheckboxD.setAttribute('disabled', true);

  correctCheckboxCellD.appendChild(correctCheckboxD);


  var answerCellD = rowD.insertCell(2);
  var answerFieldD = document.createElement('input');
  answerFieldD.setAttribute('type', 'text');
  answerFieldD.setAttribute('maxlength', 34);
  answerFieldD.setAttribute('placeholder', 'answer D');
  answerFieldD.setAttribute('disabled', true);
  answerFieldD.setAttribute('class', 'answerField');
  answerCellD.appendChild(answerFieldD);




  //adding eventlistener
  //whenever this input field is changed,
  //validation function is triggered
  answerFieldA.addEventListener('input', function(evt){
    activateCD(aTable);
  } );

  answerFieldB.addEventListener('input', function(evt){
    activateCD(aTable);
  } );


  answerFieldC.addEventListener('input', function(evt){
    activateCD(aTable);
  } );

  answerFieldD.addEventListener('input', function(evt){
    activateCD(aTable);
  } );


  //return the answer Table
  return aTable;

} // function createAnswersTable







//function for creating time Limit list(drop-down selection)
function createTimeLimitList(givenTimeLimit)
{
  var timeLimitList = document.createElement('select');
  timeLimitList.setAttribute('class', 'timeLimitList');

  var option1 = document.createElement('option');
  option1.setAttribute('value', '10');
  option1.innerHTML = "10sec";

  var option2 = document.createElement('option');
  option2.setAttribute('value', '20');
  option2.innerHTML = "20sec";


  var option3 = document.createElement('option');
  option3.setAttribute('value', '30');
  option3.innerHTML = "30sec";

  var option4 = document.createElement('option');
  option4.setAttribute('value', '45');
  option4.innerHTML = "45sec";

  var option5 = document.createElement('option');
  option5.setAttribute('value', '60');
  option5.innerHTML = "1min";


  var option6 = document.createElement('option');
  option6.setAttribute('value', '120');
  option6.innerHTML = "2min";

  var option7 = document.createElement('option');
  option7.setAttribute('value', '180');
  option7.innerHTML = "3min";

  var option8 = document.createElement('option');
  option8.setAttribute('value', '240');
  option8.innerHTML = "4min";

  //append the iptions to the list
  timeLimitList.appendChild(option1);
  timeLimitList.appendChild(option2);
  timeLimitList.appendChild(option3);
  timeLimitList.appendChild(option4);
  timeLimitList.appendChild(option5);
  timeLimitList.appendChild(option6);
  timeLimitList.appendChild(option7);
  timeLimitList.appendChild(option8);


  if(givenTimeLimit != null)
    timeLimitList.value = givenTimeLimit;
  else
    timeLimitList.value = "30";

  //return the list
  return timeLimitList;

}
