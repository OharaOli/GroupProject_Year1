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
  dragConfig.on('drop', function(draggedElement)
  {
    var previousParentX = draggedElement.getAttribute('data-x');
    updateRootQIndex();
    updateParentXOfSubQdivs(draggedElement, previousParentX);
  })

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

  //locate all subQTables with their class names
  var subQTablesArray = document.getElementsByClassName('subQTable');

  for(var index = 0; subQTablesArray.length; index++)
  {
    if(subQTablesArray[index].getAttribute('data-x') == previousParentX)
    {
      subY = subQTablesArray[index].getAttribute('data-y');
      subQTablesArray[index].setAttribute('data-x', parentX);
      subQTablesArray[index].rows[1].cells[0].innerHTML = "Q" + parentX + "." + subY;
    } // if statement
  } // for loop
} // function updateParentX
//setting the container of the rootquestions draggable
var dragConfigRoot = createDragCongfigRoot();
dragConfigRoot.containers.push(document.getElementById('rootQDivAll'));
