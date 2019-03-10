//JSon approach
numOfQSoFar = 1;

var chart_config =
{
  chart:
  {
    container: "#basic-example",
    connectors:
    {
        type: 'step'
    },
    node:
    {
        HTMLclass: 'nodeExample1'
    },
    nodeAlign: "BOTTOM",
    levelSeparation: 20,
    animation: {
                nodeAnimation: "easeInOutCubic",
                nodeSpeed: 500,
                connectorsAnimation: "easeInOut",
                connectorsSpeed: 450
            }
  },//chart
  nodeStructure:
  {
    text: {name: "Quiz1",
           title: "root"},
    collapsable: true,
    children:
    [
      {
        text: {name: ">Q1",
              title: "Q1",
              data: {numOfLinkNodes: 0}},
        innerHTML: createQuestionTable('1'),
        collapsable: true,
        children:[]
      } // collapsable
    ] //children array
  } // nodeStructure
}; // chart_config



/*
var chart =
    {
        container: "#basic-example",
        connectors:
        {
            type: 'step'
        },
        node:
        {
            HTMLclass: 'nodeExample1'
        },
        nodeAlign: "BOTTOM"
    };

   nodeStructure = {
            text: {name: "Quiz1",
                   title: "root"},
            collapsable: true
         };

    Q1 = {
        parent: nodeStructure,
        text: { name: ">Q1",
                title: "Q1"},
        innerHTML: createQuestionTable('1'),
        collapsable: true
         };
*/// array approach


/*
    ceo = {
        text: {
            name: "Mark Hill",
            title: "Chief executive officer",
            contact: "Tel: 01 213 123 134",
        },
        image: "../headshots/2.jpg"
    },

    cto = {
        parent: ceo,
        text:{
            name: "Joe Linux",
            title: "Chief Technology Officer",
        },
        stackChildren: true,
        image: "../headshots/1.jpg"
    },
    cbo = {
        parent: ceo,
        stackChildren: true,
        text:{
            name: "Linda May",
            title: "Chief Business Officer",
        },
        image: "../headshots/5.jpg"
    },
    cdo = {
        parent: ceo,
        text:{
            name: "John Green",
            title: "Chief accounting officer",
            contact: "Tel: 01 213 123 134",
        },
        image: "../headshots/6.jpg"
    },
    cio = {
        parent: cto,
        text:{
            name: "Ron Blomquist",
            title: "Chief Information Security Officer"
        },
        image: "../headshots/8.jpg"
    },
    ciso = {
        parent: cto,
        text:{
            name: "Michael Rubin",
            title: "Chief Innovation Officer",
            contact: {val: "we@aregreat.com", href: "mailto:we@aregreat.com"}
        },
        image: "../headshots/9.jpg"
    },
    cio2 = {
        parent: cdo,
        text:{
            name: "Erica Reel",
            title: "Chief Customer Officer"
        },
        link: {
            href: "http://www.google.com"
        },
        image: "../headshots/10.jpg"
    },
    ciso2 = {
        parent: cbo,
        text:{
            name: "Alice Lopez",
            title: "Chief Communications Officer"
        },
        image: "../headshots/7.jpg"
    },
    ciso3 = {
        parent: cbo,
        text:{
            name: "Mary Johnson",
            title: "Chief Brand Officer"
        },
        image: "../headshots/4.jpg"
    },
    ciso4 = {
        parent: cbo,
        text:{
            name: "Kirk Douglas",
            title: "Chief Business Development Officer"
        },
        image: "../headshots/11.jpg"
    }
*/
/*
    chart_config = [
        chart,
        nodeStructure,
        Q1
    ];
*/ // array approach


    //appendFourAnswers(chart_config, Q1);
    //appendLinkNode(chart_config, Q1);

    //alert("begin");

    //figuring out the parent should be able to be found by a relative point,
    //not by an absolute path.
    // here I just need to figure out the parent node which has an empty
    // children array.

    //use findNode("root",currentNode)
    appendFourAnswers(chart_config.nodeStructure.children[0]);
    appendLinkNode(chart_config.nodeStructure.children[0]);
    var myTree = new Treant(chart_config, null, $);
    //myTree.onAfterAddNode(chart_config.nodeStructure.children, {1:"2"});

    myTree.tree.reload();

    //appendLinkNode(chart_config, Q1);
    //appendLinkNode(chart_config, Q1);
    //appendLinkNode(chart_config, Q1);
    //appendLinkNode(chart_config, Q1);

    //appendFourAnswers(chart_config.nodeStructure.children[0]);
    //myTree.tree.reload();
    //yTree.tree.reset(chart_config, "0");


    //testing the answer creator


    //myTree.tree.reload();
    //testing the answer creator
    //myTree.tree.addNode(Q0, Q1);
    //myTree.tree.addNode(Q0, Q1);


    //myTree.tree.reset();
    //myTree.tree.reload();
  //  //alert(chart_config)
  //  //alert(chart_config)

    //alert("end");

    ////alert("testing the findNode function starts");
    //findNodeWithTitle("Q1E", chart_config.nodeStructure);

    //global variable for the function below
    var matchFound;
    //function to find a node object that matches with the given title!
    //returns the node in search (the object) if it was found
    //returns false if there was no node with such a title
    function findNodeWithTitle(givenTitle, currentNode)
    {
      var result;

      //alert("function is called. current Node: " + currentNode.text.title);

      if(currentNode.text.title == givenTitle)
      {
        ////alert the hierarchy  of the found node for testing purpose
        //alert("node was found" + currentNode.text.name);
        matchFound = true;
        // return the node found (the object)
        return currentNode;
      }
      else
      {
        if(currentNode.children.length >= 1)
        {
          for(var index = 0; index < currentNode.children.length; index++)
          {
            //alert("Now we are gonna look at the " + index + "th child of " + currentNode.text.title);

            result = findNodeWithTitle(givenTitle, currentNode.children[index]);
            if(matchFound == true)
              return result;

          } // for loop
          //match was not found
          matchFound = false;
          return result;
        } // inner if true part
        else
        {
          matchFound = false;
          //if nothing is found at all, the function wil return false
          return false;
        }
      }// outer if false part
    } //findQNode


    //given the hierarchy string of the currentNode
    //returns the titles of the currentNode and the parentNode of it
    function findParentAndChildTitles(givenHierarchy)
    {
      //alert("find parent and child function called")
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

      //alert("parent and child title compelte")
      return titleCollection;
    }

    //************** code here is for creating the link button
    // need a function for creating the add question button
    function addLButtonAction(givenButton)
    {
      //alert("button clicked. hierarchy:" + givenButton.name)
      //increment the number question so far
      numOfQSoFar++;
      ////alert(numOfQSoFar);

      //get the parentNode of the button
      //how would you do this?

      ////alert(parentNode);
      //change the button to a textfield


      //loop through the array to find the Qnode that is the parent node of the button
      //Now I need to find: the parent Node and the LinkNode object
      // first loop through the string from the end
      // until it finds the first ">"
      // record the index of it.
      // from this point again find the next ">"
      // record the index
      var titleCollection = findParentAndChildTitles(givenButton.name);
      //alert("collection received");
      //alert(titleCollection.parent);
      //alert(titleCollection.child);

      parentNode = findNodeWithTitle(titleCollection.parent, chart_config.nodeStructure.children[0]);
      var childNode = findNodeWithTitle(titleCollection.child, chart_config.nodeStructure.children[0]);

      //Now append the question
      //to the link Table
      //alert(childNode);

      appendQuestion(childNode);
      //and also add another linknode to the question node
      //alert("append question complete")

      appendLinkNode(parentNode);
      myTree.tree.reload();
      //alert("tree reloaded");

    }

    function createAddLButton(givenLinkNode)
    {
      //alert("add l button function called")
      //alert(givenLinkNode.text.name);
      //create the wrapper
      var wrapper = document.createElement('div');

      //set the id for the wrapper
      //the pattern is : Q#L
      // wrapper.setAttribute('id', parentQNode.text.title + 'L');

      //create the button
      var addLButton = document.createElement('input');

      ////alert(JSON.stringify(parentQNode));
      //set the attributes of the button
      // addQButton.setAttribute('onclick','addQuestion(...)');
      addLButton.setAttribute('type', 'button');
      //store the hierarchy within the name attribute of the button!
      addLButton.setAttribute('name', givenLinkNode.text.name);
      addLButton.setAttribute('value', 'add');
      addLButton.setAttribute('onClick', 'addLButtonAction(this)');
      // //alert("listener added");
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

      //alert("creation complete")
      //return the button with the inner wrapper
      return secondWrapper.innerHTML;


    } //createAddLButn


    /// function appendLinkNode
    function appendLinkNode(givenParentObject)
    {
      //now the child is an array which includes objects
      //create the child object
      //need to keep track of the nunber of linkNodes\
      var linkNode =
        {
          text:
          {
            name: givenParentObject.text.name + ">" + givenParentObject.text.title + "L"
                  + givenParentObject.text.data.numOfLinkNodes,
            title: givenParentObject.text.title + "L"
                  + givenParentObject.text.data.numOfLinkNodes
          },
          //innerHTML: createAddLButton(linkNode),
          collapsable: true,
          collapsed: false,
          children: [],
        }; //linkNodeObject

      linkNode["innerHTML"] = createAddLButton(linkNode);

      //append this array as  element of  the parent object
      // the property must be 'children'
      ////alert("property set complete")
      givenParentObject.children.push(linkNode);

      //update the num of linkNodes
      givenParentObject.text.data.numOfLinkNodes += 1;


      //alert("appending linknode complete")
    } // appendLinkNode


    function changeToLinkTable(givenButton, parentQNode, nextQNum)
    {
      ////alert("begin change")
      //chnage the button to link table
     // //alert(parentQNode.text.name);
     // //alert(givenButton);
      givenButton.parentNode.parentNode.innerHTML = createLinkTable(parentQNode.text.name, nextQNum);


      ////alert("change sucess")
    } // function changeToTextBox



    //*******************************code below is for dynamic building of the answers

    //step case Q-Answers (to A, B, C, D)
    function appendAnswerA(givenParentQObject)
    {
      //create an answer A object node
      //then set the parent node to be the given Q object.
      answerA =
      {
        text: {name: givenParentQObject.text.name + ">" + givenParentQObject.text.title + "A",
               title: givenParentQObject.text.title + "A"},
        collapsable: true,
        innerHTML: createAnswerTable(givenParentQObject.text.name,'A'),
        children:[],
        //index: givenQNode.index + "A"
      };


     //then append the answer array to the Qobject
     givenParentQObject.children.push(answerA);

     // //alert(answerA.innerHTML);
    } //appendAnswerA


    //step cBse Q-Bnswers (to A, B, C, D)
    function appendAnswerB(givenParentQObject)
    {
      //create an answer A object node
      //then set the parent node to be the given Q object.
      answerB =
      {
        text: {name: givenParentQObject.text.name + ">" + givenParentQObject.text.title + "B",
               title: givenParentQObject.text.title + "B"},
        collapsable: true,
        innerHTML: createAnswerTable(givenParentQObject.text.name,'B'),
        children:[],
        //index: givenQNode.index + "A"
      };


     //then append the answer array to the Qobject
     givenParentQObject.children.push(answerB);

     // //alert(answerA.innerHTML);
    } //appendAnswerA




    //step cBse Q-Bnswers (to A, B, C, D)
    function appendAnswerC(givenParentQObject)
    {
      //create an answer A object node
      //then set the parent node to be the given Q object.
      answerC =
      {
        text: {name: givenParentQObject.text.name + ">" + givenParentQObject.text.title + "C",
               title: givenParentQObject.text.title + "C"},
        collapsable: true,
        innerHTML: createAnswerTable(givenParentQObject.text.name,'C'),
        children:[],
        //index: givenQNode.index + "A"
      };


     //then append the answer array to the Qobject
     givenParentQObject.children.push(answerC);

     // //alert(answerA.innerHTML);
    } //appendAnswerA



    //step cBse Q-Bnswers (to A, B, C, D)
    function appendAnswerD(givenParentQObject)
    {
      //create an answer A object node
      //then set the parent node to be the given Q object.
      answerD =
      {
        text: {name: givenParentQObject.text.name + ">" + givenParentQObject.text.title + "D",
               title: givenParentQObject.text.title + "D"},
        collapsable: true,
        innerHTML: createAnswerTable(givenParentQObject.text.name,'D'),
        children:[],
        //index: givenQNode.index + "A"
      };


     //then append the answer array to the Qobject
     givenParentQObject.children.push(answerD);

     // //alert(answerA.innerHTML);
    } //appendAnswerA



    function appendFourAnswers(givenParentQObject)
    {
      //append the four answers at the same time
      appendAnswerA(givenParentQObject);
      appendAnswerB(givenParentQObject);
      appendAnswerC(givenParentQObject);
      appendAnswerD(givenParentQObject);
    } // appendFourAnswers


    //constructor for the link node
    function LinkNode(parentNode)
    {
      this.parent = parentNode;
      this.text = {name: parentNode.text.name + ">" + parentNode.text.title + "L",
                   title: parentNode.text.title + "L"};
      this.innerHTML = createAddLButton(this);
      this.collapsable = false;
      this.children = [];

    }

    /*
    //----array version
    //step case node(which could be either A or Q) to link
    //code below is for dynamically building the linkNode(either) - for now don't really care about the hierarchy
    //givenNode can be either an answer or question
    function appendLinkNode(givenTreeArray, parentNode)
    {
      //this should be just a button initially.
      //when you click it, it turns into a textbox, and append the next question to it

      linkNode = new LinkNode(parentNode);
      givenTreeArray.push(linkNode);

      //button.addEventListener('click', function(){});
     // button.setAttribute('value', 'testPassed');
    } //appendLinkNode
    */



    //step case link to question
    //code below is for dynamically adding question (num >1)
    //it invokes all the necessary peripherals needed for this
    function appendQuestion(givenParentObject)
    {
      //alert("append question called")
      question = {
                   text: {name: givenParentObject.text.name + ">Q" + numOfQSoFar,
                          title: "Q" + numOfQSoFar,
                          data: {numOfLinkNodes: 0}},
                   innerHTML: createQuestionTable(numOfQSoFar),
                   children: []
                 };

      //now I need to the add the four answers as well
      appendFourAnswers(question);

      //and also the linknode (Q to Q)
      appendLinkNode(question);

      //append the question to the tree
      //alert(givenParentObject.children)
      givenParentObject.children.push(question);
      //alert("question has been appended");

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

      return new Treant(chart_config);
      //tree updated
      //alert("tree updated")
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
      ////alert("begin createLink")
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




    // Another approach, same result
    // JSON approach

/*
    var chart_config = {
        chart: {
            container: "#basic-example",

            connectors: {
                type: 'step'
            },
            node: {
                HTMLclass: 'nodeExample1'
            }
        },
        nodeStructure: {
            text: {
                name: "Mark Hill",
                title: "Chief executive officer",
                contact: "Tel: 01 213 123 134",
            },
            image: "../headshots/2.jpg",
            children: [
                {
                    text:{
                        name: "Joe Linux",
                        title: "Chief Technology Officer",
                    },
                    stackChildren: true,
                    image: "../headshots/1.jpg",
                    children: [
                        {
                            text:{
                                name: "Ron Blomquist",
                                title: "Chief Information Security Officer"
                            },
                            image: "../headshots/8.jpg"
                        },
                        {
                            text:{
                                name: "Michael Rubin",
                                title: "Chief Innovation Officer",
                                contact: "we@aregreat.com"
                            },
                            image: "../headshots/9.jpg"
                        }
                    ]
                },
                {
                    stackChildren: true,
                    text:{
                        name: "Linda May",
                        title: "Chief Business Officer",
                    },
                    image: "../headshots/5.jpg",
                    children: [
                        {
                            text:{
                                name: "Alice Lopez",
                                title: "Chief Communications Officer"
                            },
                            image: "../headshots/7.jpg"
                        },
                        {
                            text:{
                                name: "Mary Johnson",
                                title: "Chief Brand Officer"
                            },
                            image: "../headshots/4.jpg"
                        },
                        {
                            text:{
                                name: "Kirk Douglas",
                                title: "Chief Business Development Officer"
                            },
                            image: "../headshots/11.jpg"
                        }
                    ]
                },
                {
                    text:{
                        name: "John Green",
                        title: "Chief accounting officer",
                        contact: "Tel: 01 213 123 134",
                    },
                    image: "../headshots/6.jpg",
                    children: [
                        {
                            text:{
                                name: "Erica Reel",
                                title: "Chief Customer Officer"
                            },
                            link: {
                                href: "http://www.google.com"
                            },
                            image: "../headshots/10.jpg"
                        }
                    ]
                }
            ]
        }
    };

*/
