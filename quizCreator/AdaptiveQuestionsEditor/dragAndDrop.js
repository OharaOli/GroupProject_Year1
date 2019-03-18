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
    updateRootQIndex();
  });

  return dragConfig;
} // function createDragCongfigRoot



//need a function to update the data-x of each sub questions.
//argument - given rootQDiv!
function updateParentXOfSubQdivs(givenRootQDiv, givenPreviousParentX)
{
  //get the parentX
  //this function is called after updateRootQIndex
  var previousParentX = givenPreviousParentX;
  var parentX = givenRootQDiv.getAttribute('data-x');
  var subY;
  //first get the array of all root questions
  //use get elements by class
  var arrayOfAllSubQTables = document.getElementsByClassName('subQTable');

  var arrayOfSubQTables = [];

  //loop through the sub questions whose parent's coordindate are as given
  for(var index = 0; index < arrayOfAllSubQTables.length; index++)
  {
    if(arrayOfAllSubQTables[index].getAttribute('data-x') == givenPreviousParentX)
    {
      // if match was found, push that table to the empty array
      arrayOfSubQTables.push(arrayOfAllSubQTables[index]);
    } // if statement
  } // for loop

  var subQTable;

  //use for loop to loop through
  //use the index to update the number
  //index should start from 0, but the quesitons index is not zero-based
  for(var index = 0; index < arrayOfSubQTables.length; index++)
  {
     //update the index of the rootQAnsTable
     //update the id, update the first cell index
     subQTable = arrayOfSubQTables[index];
     subQTable.setAttribute('id', 'subQTable' + parentX + "." + (index + 1));
     subQTable.setAttribute('data-x', parentX);
     subQTable.rows[1].cells[0].innerHTML = "Q" + parentX + "." + (index + 1);
  } // for loop

} // function updateParentX


//setting the container of the rootquestions draggable
var dragConfigRoot = createDragCongfigRoot();
dragConfigRoot.containers.push(document.getElementById('rootQDivAll'));
