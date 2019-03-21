function placeQuiz(quizID, quizName, quizCode, user_id, count)
{
  $(document).ready(function() {
  // show the quiz based on the quizes present in the DB
  //var rowNumber = document.getElementById('quizzesTable').rows.length;
  //var table = document.getElementById("quizzesTable");


  //var rows = table.insertRow(rowNumber);
  //var firstCell = rows.insertCell(0);
  //firstCell.innerhtml = (''+ quizName);
  $("#row-" + count).append("<div class='col-8 col-12-medium'><h3>"
                            + quizName + "</h3></div>");
                            
  $("#row-" + count).append("<div class='col-1 col-12-medium'><button class = 'HostButton button small' id='host"
                            + quizID + "'>Host</button></div>");
                            
  $("#row-" + count).append("<div class='col-1 col-12-medium'><button class = 'EditButton button small' id='edit"
                            + quizID + "'>Edit</button></div>");
                            
  $("#row-" + count).append("<div class='col-1 col-12-medium'><button class = 'DeleteButton button small' id='delete"
                            + quizID + "'>X</button></div>");      
                                                 
  //var secondCell = rows.inseWrtCell(1);
  //secondCell.innerHTML = buttonHost;

 $("#host" + quizID).click(function() {
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "../host/");

     // when  the button is pressed, send the quiz ID to the host page
     var input = document.createElement("input");
     input.setAttribute("type", "hidden");
     input.setAttribute("name", "quizID");
     input.setAttribute("value", quizID);

     //when the button is pressed send the quiz code to host page
     var inputQuizCode = document.createElement("input");
     inputQuizCode.setAttribute("type", "hidden");
     inputQuizCode.setAttribute("name", "quizCode");
     inputQuizCode.setAttribute("value", quizCode);

    // when the button is pressed, send the
     form.appendChild(input);
     form.appendChild(inputQuizCode);
     document.body.appendChild(form);
     form.submit();
} );

  // when edit button is pressed, send the quiz id by post
 $("#edit" + quizID).click(function() {
    var formForEdit = document.createElement("form");
    formForEdit.setAttribute("method", "post");

    // quiz edito
    formForEdit.setAttribute("action", "../editor/");

     var inputTheQuizID = document.createElement("input");
     inputTheQuizID.setAttribute("type", "hidden");
     inputTheQuizID.setAttribute("name", "quizID");
     inputTheQuizID.setAttribute("value", quizID);
     
     var inputUserID = document.createElement("input");
     inputUserID.setAttribute("type", "hidden");
     inputUserID.setAttribute("name", "user_ID");
     inputUserID.setAttribute("value", user_id);

     formForEdit.appendChild(inputUserID);
     formForEdit.appendChild(inputTheQuizID);
     document.body.appendChild(formForEdit);
     formForEdit.submit();
} );

  // when edit button is pressed, send the quiz id by post
 $("#delete" + quizID).click(function() {
    var deleteForm = document.createElement("form");
    deleteForm.setAttribute("method", "post");

    // quiz edito
    deleteForm.setAttribute("action", "./");

     var inputTheQuizID = document.createElement("input");
     inputTheQuizID.setAttribute("type", "hidden");
     inputTheQuizID.setAttribute("name", "deleteQuiz");
     inputTheQuizID.setAttribute("value", quizID);
     
     var inputUserID = document.createElement("input");
     inputUserID.setAttribute("type", "hidden");
     inputUserID.setAttribute("name", "user_ID");
     inputUserID.setAttribute("value", user_id);

     deleteForm.appendChild(inputUserID);
     deleteForm.appendChild(inputTheQuizID);
     document.body.appendChild(deleteForm);
     deleteForm.submit();
} );

});

}//function placeQuiz

// function showQuizCodeForm()
// {
//
//     document.getElementById("quizCodeForm").style.display="block";
//
//      var input = document.createElement("input");
//      input.setAttribute("type", "text");
//      input.setAttribute("name", "quizCode");
//
//      var submit = document.createElement("input");
//      submit.setAttribute("type", "submit");
//      submit.setAttribute("name", "submitCode");
//      submit.setAttribute("value", "Change Quiz Code");
//
//      document.getElementById("quizCodeForm").appendChild(input);
//      document.getElementById("quizCodeForm").appendChild(submit);
//
//      $("#initialQuizCodeButton").remove();
//
// }
