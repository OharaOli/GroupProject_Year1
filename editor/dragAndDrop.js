// javascript for implementing drag and drop
// using dragula libarry

function createDragConfigSub()
{
  var dragConfig = dragula({
    copy: false,
    moves: function (draggedElement, droppedSource, handle)
    {
      //setting the drag handle
      return handle.classList.contains('dragHandleSub');
    }
  });

  //adding listener to the object
  dragConfig.on('drop', function(draggedElement)
  {
    //this drag config is jsut for the sub questions.
    //you first have to get the parentX
    var parentX = draggedElement.getAttribute('data-x');
    updateSubQIndex(parentX);
    updateRootQIndexDragAndDrop();
  })

  return dragConfig;
} // function create dragConfig



function createDragCongfigRoot()
{
  var dragConfig = dragula({
    copy: false,
    //initially not draggable
    moves: function (draggedElement, droppedSource, handle){
      //setting the drag handle
      return handle.classList.contains('dragHandleRoot')}
  });


  //adding listener to the object
  dragConfig.on('drop', function(el, target, source, sibling)
  {
    updateRootQIndexDragAndDrop();
  });

  return dragConfig;
} // function createDragCongfigRoot


//need a function that re-arranges the index of the question index
//after deleting a questions
function updateRootQIndexDragAndDrop()
{
 //first get the array of all root questions
 //use get elements by class
 var arrayOfRootQ = document.getElementsByClassName('rootQTable');

 //use for loop to loop through
 //use the index to update the number
 //index should start from 0, but the quesitons index is not zero-based


 var rootQTable;


 for(var index = 0; index < arrayOfRootQ.length - 1; index++)
 {
    //update the index of the rootQAnsTable
    //update the id, update the first cell index
    rootQTable = arrayOfRootQ[index];
    rootQTable.setAttribute('id', 'rootQTable' + (index + 1));
    rootQTable.setAttribute('data-x', (index + 1));
    rootQTable.rows[1].cells[0].innerHTML = "Q" + (index + 1);

    //update the rootQdiv as well
    rootQTable.parentNode.setAttribute('id', 'rootQDiv' + (index + 1));
    rootQTable.parentNode.setAttribute('data-QId', 'Q' + (index + 1));
    rootQTable.parentNode.setAttribute('data-x', (index + 1));

    //update the button as well
    rootQTable.rows[0].cells[1].childNodes[0].setAttribute('data-x', (index + 1));

 } // for loop


  var parentX;
  var parentXP;

  var numOfSubQSoFar;
  var subQTable;

  //now for each rootQDivs, update its subQTables
  // use grab them by id. just change the x coordinates
  for(var index1 = 0; index1 < arrayOfRootQ.length - 1; index1++)
  {
    parentX = arrayOfRootQ[index1].getAttribute('data-x');
    parentXP = arrayOfRootQ[index1].getAttribute('data-xp');

    //get the subQDiv
    //alert("index1: " + index1);
    //alert('subQDiv' + parentXP + '0');
    subQDiv = document.getElementById('subQDiv' + parentXP + '0');

    //get the num of subQSofar
    numOfSubQSoFar = subQDiv.childNodes.length;
    //alert(numOfSubQSoFar);

    //loop through each subQTable, and update the data-x coordinate
    for(var index2 = 0; index2 < subQDiv.childNodes.length; index2++)
    {
      //alert(subQDiv.childNodes[index].childNodes[0])
      subQDiv.childNodes[index2].childNodes[0].setAttribute('id', 'subQTable' + parentX + index2);
      subQDiv.childNodes[index2].childNodes[0].setAttribute('data-x', parentX);
      subQDiv.childNodes[index2].setAttribute('data-x', parentX);
    } // for loop
    updateSubQIndex(parentX);
  } // for loop
} // updateRootQIndex


//setting the container of the rootquestions draggable
var dragConfigRoot = createDragCongfigRoot();
dragConfigRoot.containers.push(document.getElementById('rootQDivAll'));
