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

  /* you don't need to increase the indentation! they are indented within the wrapper.
  var nextIndentQ = parseInt(givenButton.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-indent")) + 5;
  ////alert("indent calculated:" + nextIndentQ)

  var nextIndentAnswers = nextIndentQ;

  */

  //obtain the num of link Q so far
  ////alert(givenButton.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-numOfLinkQSoFar"));
  var numOfLinkQSoFar = parseInt(givenButton.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-numOfLinkQSoFar"));

  numOfLinkQSoFar++;
  //update
  givenButton.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute('data-numOfLinkQSoFar', numOfLinkQSoFar);

  //obtain the hierarchy
  var previousHierarchy = givenButton.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-hierarchy");

  //get the previous node Id
  var previousNodeId = givenButton.parentNode.parentNode.parentNode.parentNode.id;

  //locate where the next question
  //the 3rd parent = Q#(A|B|C|D)DIv. append qWrapper to the child of it
  // while applying the indentation

  //get a new linkQuestion table
  var linkQTable = createLinkQTable(numOfQSoFar, previousNodeId, previousHierarchy, numOfLinkQSoFar);


  var qWrapper = document.createElement('div');
  qWrapper.setAttribute('style', createIndentStyle(35));

  var carrigeReturnHead = document.createElement('br');

  qWrapper.appendChild(carrigeReturnHead);
  qWrapper.appendChild(linkQTable);

  //answer wrapper
  var aWrapper = document.createElement('div');
  //aWrapper.setAttribute('style', createIndentStyle(nextIndentAnswers));
  aWrapper.setAttribute("data-indent", 20);
  ////alert('the indnentation of the new aWrapper is' + aWrapper.getAttribute('data-indent'))

  aWrapperA = document.createElement('div')
  aWrapperA.setAttribute('data-hierarchy', previousHierarchy + ">L" + numOfLinkQSoFar + ">Q" + numOfQSoFar + ">A")
  aWrapperA.setAttribute('data-numOfLinkQSoFar', '0')
  aWrapperA.appendChild(createATable( previousNodeId, 'A'));


  aWrapperB = document.createElement('div')
  aWrapperB.setAttribute('data-hierarchy', previousHierarchy + ">L" + numOfLinkQSoFar + ">Q" + numOfQSoFar + ">B")
  aWrapperB.setAttribute('data-numOfLinkQSoFar', '0')
  aWrapperB.appendChild(createATable( previousNodeId, 'B'));

  aWrapperC = document.createElement('div')
  aWrapperC.setAttribute('data-hierarchy', previousHierarchy + ">L" + numOfLinkQSoFar + ">Q" + numOfQSoFar + ">C")
  aWrapperC.setAttribute('data-numOfLinkQSoFar', '0')
  aWrapperC.appendChild(createATable( previousNodeId, 'C'));

  aWrapperD = document.createElement('div')
  aWrapperD.setAttribute('data-hierarchy', previousHierarchy + ">L" + numOfLinkQSoFar + ">Q" + numOfQSoFar + ">D")
  aWrapperD.setAttribute('data-numOfLinkQSoFar', '0')
  aWrapperD.appendChild(createATable( previousNodeId, 'D'));

  //append answers
  aWrapper.appendChild(aWrapperA);
  aWrapper.appendChild(aWrapperB);
  aWrapper.appendChild(aWrapperC);
  aWrapper.appendChild(aWrapperD);

  qWrapper.appendChild(aWrapper);

  var carrigeReturnTail = document.createElement('br');

  qWrapper.appendChild(carrigeReturnTail);

  //append the qWrapper
  givenButton.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(qWrapper);
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
function createLinkQTable(givenNumOfQSofar, ivenPreviousNodeId, givenHierarchy, givenNumOfLinkQSoFar)
{
  var lTable = document.createElement('table');
  lTable.setAttribute('border', '1');
  //insert linkRow
  var linkRow = lTable.insertRow(0);

  //insert hierarchyCell
  var hierarchyCell = linkRow.insertCell(0);
  hierarchyCell.innerHTML = givenHierarchy + ">L" + givenNumOfLinkQSoFar + ">Q" + givenNumOfQSofar;

  //insert linkDescriptionCell
  var linkDescriptionCell = linkRow.insertCell(1);
  var linkDescriptionField = document.createElement('input');
  linkDescriptionField.setAttribute('type', 'text');
  linkDescriptionField.setAttribute('placeholder', 'link description');
  linkDescriptionCell.appendChild(linkDescriptionField);
  linkDescriptionCell.setAttribute('colspan', '2');

  // add question Row
  var questionRow = lTable.insertRow(1);
  var indexCell2 = questionRow.insertCell(0);
  indexCell2.innerHTML = "Q" + givenNumOfQSofar;

  var questionCell2 = questionRow.insertCell(1);
  var questionField = document.createElement('input');
  questionField.setAttribute('type', 'text');
  questionCell2.appendChild(questionField);

  var timeLimitCell2 = questionRow.insertCell(2);
  var timeLimitField = document.createElement('input');
  timeLimitField.setAttribute('type', 'text');
  timeLimitCell2.appendChild(timeLimitField);

  return lTable;

} // function createLinkQTable


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
