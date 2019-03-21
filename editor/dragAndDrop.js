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
    updateSubQIndex(parentX, true);
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
    updateRootQIndex(true);
  });

  return dragConfig;
} // function createDragCongfigRoot



//setting the container of the rootquestions draggable
var dragConfigRoot = createDragCongfigRoot();
dragConfigRoot.containers.push(document.getElementById('rootQDivAll'));
