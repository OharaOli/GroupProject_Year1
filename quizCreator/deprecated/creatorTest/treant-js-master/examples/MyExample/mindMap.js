//whenever there is a QtoQ or AtoQ link, always create intermediate node.
var numOfQSoFar = 1;

config = {
    container: "#tree-simple",
    hideRootNode: false,
    connectors: {type : "step"},
    nodeAlign: "BOTTOM",
    rootOrientation: "NORTH",
    animation: {
                nodeAnimation: "easeInOutCubic",
                nodeSpeed: 500,
                connectorsAnimation: "easeInOut",
                connectorsSpeed: 450
            }
};

root = {
        text: {name: "Quiz1",
               title: "root"},
        collapsable: true
       };

Q1 = {
    parent: root,
    text: { name: ">Q1",
            title: "Q1"},
    innerHTML: createQuestionTable('1'),
    collapsable: false,
     };


var simple_chart_config = [ config, root, Q1];


//testing the answer creator
appendFourAnswers(simple_chart_config, Q1);
appendLinkNode(simple_chart_config, Q1);


//alert(config2)
//myTree = new Treant(simple_chart_config, null, $);




//global varaible to keep track of the number of questions created so far
//initially set to 1 becase Q1 is hard-coded

//alert()

//function to find a node object that matches with the given title!
function findGivenNode(givenTitle)
{
  for(index = 1; index < simple_chart_config.length; index++)
  {
    if(simple_chart_config[index].text.title == givenTitle)
      return simple_chart_config[index];
  } // for loop

} //findQNode


function findParentAndChildTitles(givenHierarchy)
{
  var parentTitleFound = false;
  var childTitleFound = false;
  var firstArrowIndex;
  var secondArrowIndex;
  var parentTitle = "";
  var childTitle = "";
  //the the backward loop
  for(index1 = (givenHierarchy.length - 1); index1 >= 0; index1--)
  {
    if(childTitleFound != true && givenHierarchy[index1] == ">")
    {
      firstArrowIndex = index1;
      childTitleFound = true;
      for(index2 = (firstArrowIndex + 1); index2 < givenHierarchy.length; index2++)
      {
        //concatenate!
        childTitle = childTitle + givenHierarchy[index2];
      } // for loop
    } //first if statement
    else if(parentTitleFound != true && givenHierarchy[index1] == ">")
    {
      secondArrowIndex = index1;
      parentTitleFound = true;

      for(index2 = (secondArrowIndex + 1); index2 < firstArrowIndex; index2++)
      {
        //concatenate
        parentTitle = parentTitle + givenHierarchy[index2];
      } // for loop
    } //second if statement
  } // for loop

   var titleCollection = {
                           parent: parentTitle,
                           child: childTitle
                         }

  return titleCollection;
}

//************** code here is for creating the link button
// need a function for creating the add question button
function addLButtonAction(givenButton)
{
  //increment the number question so far
  numOfQSoFar++;
  //alert(numOfQSoFar);

  //get the parentNode of the button
  //how would you do this?

  //alert(parentNode);
  //change the button to a textfield


  //loop through the array to find the Qnode that is the parent node of the button
  //Now I need to find: the parent Node and the LinkNode object
  // first loop through the string from the end
  // until it finds the first ">"
  // record the index of it.
  // from this point again find the next ">"
  // record the index
  var titleCollection = findParentAndChildTitles(givenButton.name);
  alert("collection received");
  alert(titleCollection.parent);
  alert(titleCollection.child);

  var parentNode = findGivenNode(titleCollection.parent);
  var childNode = findGivenNode(titleCollection.child);

  //changeToLinkTable(givenButton, parentNode, numOfQSoFar);

  //Now append the question
  //to the link Table
  appendQuestion(simple_chart_config, childNode);
  //and also add another linknode to the question node


  alert("end action");

}

function createAddLButton(LinkNode)
{
  //create the wrapper
  var wrapper = document.createElement('div');

  //set the id for the wrapper
  //the pattern is : Q#L
  // wrapper.setAttribute('id', parentQNode.text.title + 'L');

  //create the button
  var addLButton = document.createElement('input');

  //alert(JSON.stringify(parentQNode));
  //set the attributes of the button
  // addQButton.setAttribute('onclick','addQuestion(...)');
  addLButton.setAttribute('type', 'button');
  //store the hierarchy within the name attribute of the button!
  addLButton.setAttribute('name', LinkNode.text.name);
  addLButton.setAttribute('value', 'add');
  addLButton.setAttribute('onClick', 'addLButtonAction(this)');
  // alert("listener added");
  //append the button to the wrapper
  wrapper.appendChild(addLButton);

  //setting the onclick attribute
  //what it should do is appending a question!
  // plus change the button to a text box
  // + add another linknode to it!
  //do this adding an eventListener, rather than setting an onClick attribute





  //create another wrapper
  var secondWrapper = document.createElement('div');

  //append the wrapper to the second wrapper
  secondWrapper.appendChild(wrapper);

  //return the button with the inner wrapper
  return secondWrapper.innerHTML;

} //createAddLButn



function changeToLinkTable(givenButton, parentQNode, nextQNum)
{
  //alert("begin change")
  //chnage the button to link table
 // alert(parentQNode.text.name);
 // alert(givenButton);
  givenButton.parentNode.parentNode.innerHTML = createLinkTable(parentQNode.text.name, nextQNum);


  //alert("change sucess")
} // function changeToTextBox



//*******************************code below is for dynamic building of the answers

//step case Q-Answers (to A, B, C, D)
function appendAnswerA(givenTreeArray, givenQNode)
{
  //create an answer A object node
  //then set the parent node to be the given Q object.
  answerA = {
              parent: givenQNode,
              text: {name: givenQNode.text.name + ">" + "A",
                     title: "A"},
              collapsable: true,
              innerHTML: createAnswerTable(givenQNode.text.name,'A'),
              //index: givenQNode.index + "A"
            };

 //then append the answer object to the tree array
 givenTreeArray.push(answerA);

 // alert(answerA.innerHTML);
} //appendAnswerA


function appendAnswerB(givenTreeArray, givenQNode)
{
  //create an answer A object node
  //then set the parent node to be the given Q object.
  answerB = {
              parent: givenQNode,
              text: {name: givenQNode.text.name + ">" + "B",
                     title:  "B"},
              collapsable: true,
              innerHTML: createAnswerTable(givenQNode.text.name,'B'),
              //index: givenQNode.index + "B"
            };

 //then append the answer object to the tree array
 givenTreeArray.push(answerB);

} // appendAnswerB



function appendAnswerC(givenTreeArray, givenQNode)
{
  //create an answer A object node
  //then set the parent node to be the given Q object.
  answerC = {
              parent: givenQNode,
              text: {name: givenQNode.text.name + ">" + "C",
                     title: "C"},
              collapsable: true,
              innerHTML: createAnswerTable(givenQNode.text.name,'C'),
              //index: givenQNode.index + "C"
            };

 //then append the answer object to the tree array
 givenTreeArray.push(answerC);

} // appendAnswerB

function appendAnswerD(givenTreeArray, givenQNode)
{
  //create an answer A object node
  //then set the parent node to be the given Q object.
  answerD = {
              parent: givenQNode,
              text: {name: givenQNode.text.name + ">" +"D",
                     title: "D"},
              collapsable: true,
              innerHTML: createAnswerTable(givenQNode.text.name,'D'),
              //index: givenQNode.index + "D"
            };

 //then append the answer object to the tree array
 givenTreeArray.push(answerD);

} // appendAnswerB


function appendFourAnswers(givenTreeArray, givenQnode)
{
  //append the four answers at the same time
  appendAnswerA(givenTreeArray, givenQnode);
  appendAnswerB(givenTreeArray, givenQnode);
  appendAnswerC(givenTreeArray, givenQnode);
  appendAnswerD(givenTreeArray, givenQnode);
} // appendFourAnswers

function LinkNode(parentNode)
{
  this.parent = parentNode;
  this.text = {name: parentNode.text.name + ">" + parentNode.text.title + "L",
               title: parentNode.text.title + "L"};
  this.innerHTML = createAddLButton(this);
  this.collapsable = false;

}

//step case node(which could be either A or Q) to link
//code below is for dynamically building the linkNode(either) - for now don't really care about the hierarchy
//givenNode can be either an answer or question
function appendLinkNode(givenTreeArray, parentNode)
{
  //this should be just a button initially.
  //when you click it, it turns into a textbox, and append the next question to it
  //alert("append");
  /*
  linkNode = {
               parent: parentNode,
               text: {name: parentNode.text.name + ">" + "L",
                      title: parentNode.text.title + "L"},
               //for now leave the hierarchy argument empty
               // the number also has no meaning yet
               innerHTML:createAddLButton(parentNode),
               collapsable: false,
             }; */
  linkNode = new LinkNode(parentNode);
  givenTreeArray.push(linkNode);

  //button.addEventListener('click', function(){});
 // button.setAttribute('value', 'testPassed');
} //appendLinkNode


//step case link to question
//code below is for dynamically adding question (num >1)
//it invokes all the necessary peripherals needed for this
function appendQuestion(givenTreeArray, givenLinkNode)
{

  question = {
               parent: givenLinkNode,
               text: {name: givenLinkNode.text.name + ">Q" + numOfQSoFar,
                      title: "Q" + numOfQSoFar},
               innerHTML: createQuestionTable(numOfQSoFar),
             };
  //append the question to the tree
  givenTreeArray.push(question);

  //now I need to the add the four answers as well
  appendFourAnswers(givenTreeArray, question);

  //and also the linknode (Q to Q)
  appendLinkNode(givenTreeArray, question);


  newtree = updateTree();

  alert("question has been appended");

  //and then link node below each answer as well
  //appendLinkNode()
} //appendQuestion

//function to update the tree

function destroyTree()
{
  delete window.my_tree;
}

function updateTree()
{

  return new Treant(simple_chart_config);
  //tree updated
  alert("tree updated")
}

//function for building the four answers - dynamic bit, have to implement it later.

//*************** the functions below are the utilities to find index
/*
//I need a function that returns the most recent question node created in the tree array
function theMostRecentQuestion(givenTreeArray)
{

  //use for loop, but from the end of the array, and decrement from it
  for(index = givenTreeArray.length - 1; index > 0; index--);
    // I think It'll be better to define a function with regular expression to match the hierarchy
    // if(givenTreeArray[index].text.name.[] )
    // for loop for finding the most recent question node object
    // the string right after the last '>' should be 'Q'.

    //the alphabet - {>, L, and positive integers greater than 1}

} //theMostRecentQuestion

//function to


//returns an object that contains the four answer objects

*/








//****************************** code below is for creating the tables ***************************
//function to create input textBox
//returns html String for the element
function createLinkTable(previousHierarchy, nextQNum)
{
  //alert("begin createLink")
  //wrapper for the box
  var wrapper = document.createElement('div');

  // create a table, which will have a single row
  var linkTable = document.createElement('table');

  //set unique id to the linkTable
  linkTable.setAttribute('id', 'linkTable' + 'Q' + nextQNum);

  //insert a linkRow
  var linkRow = linkTable.insertRow(0);

  //insert two cells - one for the hierarchy, the other for the description
  var hierarchyCell = linkRow.insertCell(0);
  var descriptionCell = linkRow.insertCell(1);

  //determine the hierarchy, and store it in the cell
  hierarchyCell.innerHTML = previousHierarchy + ">" + "Q" + nextQNum;

  //create textbox for the description
  var elementTextBox = document.createElement('input');
  elementTextBox.setAttribute('type', 'text');
  elementTextBox.setAttribute('placeHolder', 'link Description');

  //append the description box to the next Cell
  descriptionCell.appendChild(elementTextBox);

  //append the table to the wrapper
  wrapper.appendChild(linkTable);

  //alert("end link table");
  return wrapper.innerHTML;
}

//function for creating the questionTable
function createQuestionTable(givenQNum)
{
  var questionTable = document.createElement('table');

  //set the questionTable id
  questionTable.setAttribute('id', 'Creator' + givenQNum);

  //insert header row
  var headerRow = questionTable.insertRow(0);


  //create cells - I need three columns
  var indexCell = headerRow.insertCell(0);
  indexCell.innerHTML = "index";
  var questionCell = headerRow.insertCell(1);
  questionCell.innerHTML = "question";
  var timeLimitCell = headerRow.insertCell(2);
  timeLimitCell.innerHTML = "TimeLimit";


  //create new Row for the linkRow
  //currently set to empty. later will be filled with hierarchy
  var linkRow = questionTable.insertRow(1);

  //create new row for the question data
  var questionRow = questionTable.insertRow(2);

  //first cell represents the index for the question with id
  var indexCell = questionRow.insertCell(0);
  indexCell.innerHTML = "Q" + givenQNum;

  //second cell represents the question
  var questionCell = questionRow.insertCell(1);
  var elementQuestionText = document.createElement('input');
  elementQuestionText.setAttribute('type', 'text');
  questionCell.appendChild(elementQuestionText);


  //inserts timeLimitCell with id
  var timeLimtCell = questionRow.insertCell(2);
  var elementTimeLimit = document.createElement('input');
  elementTimeLimit.setAttribute('type', 'text');
  timeLimtCell.appendChild(elementTimeLimit);

  //wrapper for the table
  var wrapper = document.createElement('div');
  wrapper.appendChild(questionTable);

  //return the HTML value
  return wrapper.innerHTML;
}

//function for creating individual anserTable
function createAnswerTable(givenQNum, givenAnswerIndex)
{
  // need a table which has...
  // 1 column, 4 rows - index (A|B|C|D) / answer (String) / correct button / description

  //create the table
  var answerTable = document.createElement('table');

  //set the unique ID
  // in the form - answerTable + Q + Qnum + answerIndex
  answerTable.setAttribute('id', 'answerTable' + givenQNum + givenAnswerIndex)


  //fix the table width
  /*
  answerTable.setAttribute('class', 'fixed'); */

  //insert 4 rows
  var indexRow = answerTable.insertRow(0);
  var answerRow = answerTable.insertRow(1);
  var buttonRow = answerTable.insertRow(2);
  var descriptionRow = answerTable.insertRow(3);

  //for each row, a cell with approprate object is added
  //first the indexCell
  var indexCell = indexRow.insertCell(0);
  indexCell.innerHTML = "" + givenAnswerIndex ;
  indexCell.setAttribute('align', 'center');

  //secondly the answerCell
  var answerCell = answerRow.insertCell(0);
  answerCell.setAttribute('align', 'center');

  //create textbox
  var elementAnswerTextbox = document.createElement('input');
  elementAnswerTextbox.setAttribute('type', 'text');
  elementAnswerTextbox.setAttribute('placeHolder', 'Type answer');
  elementAnswerTextbox.style.width = "90px";

  //append to the answer cell
  answerCell.appendChild(elementAnswerTextbox);

  //for third the button Cell
  var buttonCell = buttonRow.insertCell(0);

  //create Button
  var elementButton = document.createElement('input');
  elementButton.setAttribute('type', 'checkBox');

  //append to the button Cell
  buttonCell.appendChild(elementButton);
  buttonCell.setAttribute('align', 'center');

  //lastly the descrption cell
  var descriptionCell = descriptionRow.insertCell(0);

  //create textbox
  var elementDescriptionTextbox = document.createElement('input');
  elementDescriptionTextbox.setAttribute('type', 'text');
  elementDescriptionTextbox.setAttribute('placeHolder', 'Type description');
  elementDescriptionTextbox.style.width = "90px";

  //append to the description cell
  descriptionCell.appendChild(elementDescriptionTextbox);

  //create wrapper
  var wrapper = document.createElement('div');

  //append the answer table to the wrapper
  wrapper.appendChild(answerTable);

  return wrapper.innerHTML;

} // function createAnswerTable



//how would you retrieve data from the table?
// well I thought grabbing the table DOM object will work.
var element = document.getElementById('addL');
element.addEventListener('click', function(){alert("Hello");});
