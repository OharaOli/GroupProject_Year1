// number of the root questions so far (those with no indentations)
var numOfQSoFar = 1;



/*  don;t need this function any more
//function for adding rules to the css
// the givenRule parameter is of string type
function addCSSRule(givenRule)
{
  var style = (function() {
      // Create the <style> tag
      var style = document.createElement("style");

      // WebKit hack
      style.appendChild(document.createTextNode(""));

      // Add the <style> element to the page
      document.head.appendChild(style);

      return style;
  })();
  //add CSS rule (string value)
  style.sheet.insertRule(givenRule, 0);
}// function addCSSRule
*/

function createIndentStyle(givenIndentation)
{

  var indentStyle = "margin-left: "+ givenIndentation +"px;"

  return indentStyle;
}


//function for adding a linkQuestion
function addLinkQuestion(givenButton)
{
  //update the numOfQSoFar
  numOfQSoFar++;

  //find the id of the parent question
  parentQId = givenButton.parentNode.getAttribute('data-QId');

  //create a new linkQuestion table
  var linkQTable = createLinkQTable(numOfQSoFar, parentQId);


  //append the table to the the parent rootQTableDiv
  givenButton.insertAdjacentElement('beforebegin', linkQTable);

  var carrigeReturn = document.createElement('br');

  givenButton.insertAdjacentElement('beforebegin', carrigeReturn);


} // function addLinkQuestion


//function for adding a root question
function addRootQuestion(givenButton)
{
  numOfQSoFar++;

  //add rule using the class attribute of the tableA
  // the class attribute is the same for 4 tables, so just using this one
  /* don't need this. not doing indentation for the answers
  var indentForAnswers = createIndentStyle(0); */


  //qWrapper
  var qWrapper = document.createElement('div');
  qWrapper.setAttribute('id', 'Q' + numOfQSoFar + "div");

  qWrapper.appendChild(createQTable(numOfQSoFar));

  //wrapper for answers
  var answersWrapper = document.createElement('div');
  answersWrapper.setAttribute('id', 'Q' + numOfQSoFar + "AnswersDiv");
  //answersWrapper.setAttribute('style', indentForAnswers);
  answersWrapper.setAttribute('data-indent', "10");

  //createWrapper for each answers

  var wrapperA = document.createElement('div');
  wrapperA.setAttribute('id', 'Q' + numOfQSoFar + 'A' + 'Div')
  wrapperA.setAttribute('data-hierarchy', 'Q'+ numOfQSoFar + ">A")
  wrapperA.setAttribute('data-numOfLinkQSoFar', '0')

  var wrapperB = document.createElement('div');
  wrapperB.setAttribute('id', 'Q' + numOfQSoFar + 'B' + 'Div')
  wrapperB.setAttribute('data-hierarchy', 'Q'+ numOfQSoFar + ">B")
  wrapperB.setAttribute('data-numOfLinkQSoFar', '0')

  var wrapperC = document.createElement('div');
  wrapperC.setAttribute('id', 'Q' + numOfQSoFar + 'C' + 'Div')
  wrapperC.setAttribute('data-hierarchy', 'Q'+ numOfQSoFar + ">C")
  wrapperC.setAttribute('data-numOfLinkQSoFar', '0')

  var wrapperD = document.createElement('div');
  wrapperD.setAttribute('id', 'Q' + numOfQSoFar + 'D' + 'Div')
  wrapperD.setAttribute('data-hierarchy', 'Q'+ numOfQSoFar + ">D")
  wrapperD.setAttribute('data-numOfLinkQSoFar', '0')


  wrapperA.appendChild(createATable(numOfQSoFar, 'A'));
  wrapperB.appendChild(createATable(numOfQSoFar, 'B'));
  wrapperC.appendChild(createATable(numOfQSoFar, 'C'));
  wrapperD.appendChild(createATable(numOfQSoFar, 'D'));

  answersWrapper.appendChild(wrapperA);
  answersWrapper.appendChild(wrapperB);
  answersWrapper.appendChild(wrapperC);
  answersWrapper.appendChild(wrapperD);

  qWrapper.appendChild(answersWrapper);

  givenButton.insertAdjacentElement('beforebegin', qWrapper);

  var carrigeReturn = document.createElement('br');
  givenButton.insertAdjacentElement('beforebegin', carrigeReturn);


} // addQuestion

//function for creating the answer table with given index
//function for creating question Table
function createQTable(givenQIndex)
{
  var qTable = document.createElement('table');
  qTable.setAttribute('border', 1);
  qTable.setAttribute('id', 'Q' + givenQIndex + "Q");

  // add header row
  var headerRow = qTable.insertRow(0);

  //add cells to the row
  var indexCell = headerRow.insertCell(0);
  indexCell.innerHTML = "<th>Root</th>";

  var questionCell = headerRow.insertCell(1);
  questionCell.innerHTML = "<th>Question</th>";

  var timeLimitCell = headerRow.insertCell(2);
  timeLimitCell.innerHTML = "<th>Time limit</th>";

  // add question Row
  var questionRow = qTable.insertRow(1);
  var indexCell2 = questionRow.insertCell(0);
  indexCell2.innerHTML = "Q" + givenQIndex;

  var questionCell2 = questionRow.insertCell(1);
  var questionField = document.createElement('input');
  questionField.setAttribute('type', 'text');
  questionCell2.appendChild(questionField);

  var timeLimitCell2 = questionRow.insertCell(2);
  var timeLimitField = document.createElement('input');
  timeLimitField.setAttribute('type', 'text');
  timeLimitCell2.appendChild(timeLimitField);

  return qTable;
} // function createQTable




// function for creating answer table
function createATable(givenQIndex, givenAIndex)
{
  //craete table
  var answerTable = document.createElement('table');

  //set attributes
  answerTable.setAttribute('id', "Q" + givenQIndex + givenAIndex);
  answerTable.setAttribute('class', "Q" + givenQIndex + "Answers");
  answerTable.setAttribute('border', 1);


  //insert row
  var row = answerTable.insertRow(0);

  var collapseButtonCell = row.insertCell(0);

  var collapseButton = document.createElement('button')
  collapseButton.innerHTML = ">"

  collapseButtonCell.appendChild(collapseButton);


  //add cells to the row
  var indexCell = row.insertCell(1);
  indexCell.innerHTML = givenAIndex




  /* multiple rows view
  //insert Answer row
  var answerRow = answerTable.insertRow(1);

  //add cell to the row
  var answerCell = answerRow.insertCell(0);

  //create anserTextField
  var answerField = document.createElement('input');
  answerField.setAttribute('type', 'text');
  answerField.setAttribute('placeholder', 'answer');

  //append to the cell
  answerCell.appendChild(answerField);


  //insert description Row
  var descriptionRow = answerTable.insertRow(2);

  // insert a cell
  var descriptionCell = descriptionRow.insertCell(0);

  //create descriptionField
  var descriptionField = document.createElement('input');
  descriptionField.setAttribute('type', 'text');
  descriptionField.setAttribute('placeholder', 'description');


  //append to the cell
  descriptionCell.appendChild(descriptionField);

  // insert buttonRow
  var buttonRow = answerTable.insertRow(3);

  //insert a cell
  var linkButtonCell = buttonRow.insertCell(0);


  //create linkButton
  var linkButton = document.createElement('input');
  linkButton.setAttribute('type', 'button');
  linkButton.setAttribute('value', 'add link');
  linkButton.setAttribute('onClick', 'addLinkQuestion(this)')

  //apppend to the cell

  linkButtonCell.appendChild(linkButton);

  return answerTable; */

  //changing the shape of the answer Cells
  var answerCell = row.insertCell(2);

  //create anserTextField
  var answerField = document.createElement('input');
  answerField.setAttribute('type', 'text');
  answerField.setAttribute('placeholder', 'answer');

  //append to the cell
  answerCell.appendChild(answerField);



  //create the correctButton
  var correctButton = document.createElement('input');
  correctButton.setAttribute('type', 'checkbox');


  //append to the cell
  answerCell.appendChild(correctButton);


  var descriptionCell = row.insertCell(3);

  //create descriptionField
  var descriptionField = document.createElement('input');
  descriptionField.setAttribute('type', 'text');
  descriptionField.setAttribute('placeholder', 'description');


  //append to the cell
  descriptionCell.appendChild(descriptionField);


  var linkButtonCell = row.insertCell(4);

  //create linkButton
  var linkButton = document.createElement('input');
  linkButton.setAttribute('type', 'button');
  linkButton.setAttribute('value', 'add link');
  linkButton.setAttribute('onClick', 'addLinkQuestion(this)')

  //apppend to the cell

  linkButtonCell.appendChild(linkButton);

  //return the table
  return answerTable;

} // createATable


//function for creeating linkQuestionTable
function createLinkQTable(givenNumOfQSofar, givenParentQId)
{
  var lTable = document.createElement('table');

  //set the class (for styling)
  lTable.setAttribute('class', 'linkQTable')

  //set the border
  lTable.setAttribute('border', '1');

  //set the hierarchy (implementation purpose)
  lTable.setAttribute('data-hierarchy', givenParentQId + '>Q' + givenNumOfQSofar)


  //insert headerRow
  var headerRow = lTable.insertRow(0);

  //insert hierarchyCell
  var hierarchyCell = headerRow.insertCell(0);
  hierarchyCell.innerHTML = givenParentQId + '>Q' + givenNumOfQSofar;

  //insert question header
  var questionHeaderCell = headerRow.insertCell(1);
  var questionHeader = document.createElement('th');
  questionHeader.innerHTML = "Question";
  questionHeaderCell.appendChild(questionHeader);


  //insert cell for the time limit
  var timeLimitHeaderCell = headerRow.insertCell(2);
  var timeLimitHeader = document.createElement('th');
  timeLimitHeader.innerHTML = "Time Limit";
  timeLimitHeaderCell.appendChild(timeLimitHeader);

  //insertCell for the answers header
  var answersHeaderCell = headerRow.insertCell(3);
  var answersHeader = document.createElement('th');
  answersHeader.innerHTML = "Answers";
  answersHeaderCell.appendChild(answersHeader);


  // now the second row
  // add question Row
  var questionRow = lTable.insertRow(1);
  var indexCell = questionRow.insertCell(0);
  indexCell.innerHTML = "Q" + givenNumOfQSofar;

  var questionCell = questionRow.insertCell(1);
  var questionField = document.createElement('input');
  questionField.setAttribute('type', 'text');
  questionCell.appendChild(questionField);


  var timeLimitCell = questionRow.insertCell(2);
  var timeLimitField = document.createElement('input');
  timeLimitField.setAttribute('type', 'text');
  timeLimitCell.appendChild(timeLimitField);


  var answerCell = questionRow.insertCell(3);

  //create an answer table and append it to the cell
  answerCell.appendChild(createAnswersTable(givenNumOfQSofar));

  return lTable;

} // function createLinkQTable


//function for creating a table for the four answers
function createAnswersTable(givenQNum)
{
  //create aTable
  var aTable = document.createElement('table');

  //set attributes
  aTable.setAttribute('id', 'answersTableQ' + givenQNum);
  aTable.setAttribute('border', 1);
  aTable.setAttribute('class', 'answersTable');

  // row for the answer A
  var rowA = aTable.insertRow(0);

  var indexCellA = rowA.insertCell(0);
  indexCellA.innerHTML = "A";

  var correctCheckboxCellA = rowA.insertCell(1);
  var correctCheckboxA = document.createElement('input');
  correctCheckboxA.setAttribute('type', 'checkbox');
  correctCheckboxCellA.appendChild(correctCheckboxA);


  var answerCellA = rowA.insertCell(2);
  var answerFieldA = document.createElement('input');
  answerFieldA.setAttribute('type', 'text');
  answerFieldA.setAttribute('placeholder', 'answer');
  answerCellA.appendChild(answerFieldA);

  //description Cell - only for this row
  //need only one description Cell for the four cells
  var descriptionCell = rowA.insertCell(3);
  descriptionCell.setAttribute('rowspan', 4);
  var descriptionField = document.createElement('input');
  descriptionField.setAttribute('type', 'text');
  descriptionField.setAttribute('placeholder', 'description');
  descriptionCell.appendChild(descriptionField);



  // row for the answer B
  var rowB = aTable.insertRow(1);

  var indexCellB = rowB.insertCell(0);
  indexCellB.innerHTML = "B";

  var correctCheckboxCellB = rowB.insertCell(1);
  var correctCheckboxB = document.createElement('input');
  correctCheckboxB.setAttribute('type', 'checkbox');
  correctCheckboxCellB.appendChild(correctCheckboxB);


  var answerCellB = rowB.insertCell(2);
  var answerFieldB = document.createElement('input');
  answerFieldB.setAttribute('type', 'text');
  answerFieldB.setAttribute('placeholder', 'answer');
  answerCellB.appendChild(answerFieldB);



  // row for the answer C
  var rowC = aTable.insertRow(2);

  var indexCellC = rowC.insertCell(0);
  indexCellC.innerHTML = "C";

  var correctCheckboxCellC = rowC.insertCell(1);
  var correctCheckboxC = document.createElement('input');
  correctCheckboxC.setAttribute('type', 'checkbox');
  correctCheckboxCellC.appendChild(correctCheckboxC);


  var answerCellC = rowC.insertCell(2);
  var answerFieldC = document.createElement('input');
  answerFieldC.setAttribute('type', 'text');
  answerFieldC.setAttribute('placeholder', 'answer');
  answerCellC.appendChild(answerFieldC);




  // row for the answer D
  var rowD = aTable.insertRow(3);

  var indexCellD = rowD.insertCell(0);
  indexCellD.innerHTML = "D";

  var correctCheckboxCellD = rowD.insertCell(1);
  var correctCheckboxD = document.createElement('input');
  correctCheckboxD.setAttribute('type', 'checkbox');
  correctCheckboxCellD.appendChild(correctCheckboxD);


  var answerCellD = rowD.insertCell(2);
  var answerFieldD = document.createElement('input');
  answerFieldD.setAttribute('type', 'text');
  answerFieldD.setAttribute('placeholder', 'answer');
  answerCellD.appendChild(answerFieldD);

  //return the answer Table
  return aTable;

} // function createAnswersTable


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
