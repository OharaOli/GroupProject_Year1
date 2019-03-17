// javascript for implementing drag and drop
// using dragula libarry

function createDragConfig()
{
  var dragConfig = dragula({
    copy: false,
    moves: function (draggedElement, droppedSource, handle){
      //setting the drag handle
      return handle.classList.contains('dragHandle');
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
