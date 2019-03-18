//creating the undo manager
// this one has two instance methods for un-doing and re-doing things
var undoMang = new UndoManager();

//grab the buttons
var undoButton = document.getElementById('undoButton');
var redoButton = document.getElementById('redoButton');

undoMang.add({
  undo: function(){  
  },
  redo: function(){

  }
})

undoButton.addEventListener('click', function()
{
  alert("undo button clicked");
  undoMang.undo();
});

redoButton.addEventListener('click', function()
{
  alert("redo button cliked")
  undoMang.redo();
});
