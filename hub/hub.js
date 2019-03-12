function placeQuiz(quizID, quizName, quizCode, count)
{
  $(document).ready(function() {
  // show the quiz based on the quizes present in the DB
  //var rowNumber = document.getElementById('quizzesTable').rows.length;
  //var table = document.getElementById("quizzesTable");

  
  //var rows = table.insertRow(rowNumber);
  //var firstCell = rows.insertCell(0);
  //firstCell.innerhtml = (''+ quizName);

  $("#row-" + count).append("<td><h3>"+ quizName + " </h3></td>");
  $("#row-" + count).append("<td><button class = 'HostButton' id='host" + quizID + "'>Host</button></td>");
    $("#row-" + count).append("<td><button class = 'EditButton' id='edit" + quizID + "'>Edit</button> </td>");
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

 $("#edit" + quizID).click(function() {
    var form = document.createElement("form");
    form.setAttribute("method", "post");

    //THIS SHOULD BE CHANGED TO QUIZ EDITOR NOT LANDING PAGE
    form.setAttribute("action", "../quizEditor");

     var input = document.createElement("input");
     input.setAttribute("type", "hidden");
     input.setAttribute("name", "quizID");
     input.setAttribute("value", quizID);
     
     //when the button is pressed send the quiz code to edit page
     var inputQuizCode = document.createElement("input");
     inputQuizCode.setAttribute("type", "hidden");
     inputQuizCode.setAttribute("name", "quizCode");
     inputQuizCode.setAttribute("value", quizCode);

     form.appendChild(input);
     document.body.appendChild(form);
     form.submit();
} );

});

}//function placeQuiz

function showQuizCodeForm()
{

    document.getElementById("quizCodeForm").style.display="block";

     var input = document.createElement("input");
     input.setAttribute("type", "text");
     input.setAttribute("name", "quizCode");
    
     var submit = document.createElement("input");
     submit.setAttribute("type", "submit");
     submit.setAttribute("name", "submitCode");
     submit.setAttribute("value", "Change Quiz Code");

     document.getElementById("quizCodeForm").appendChild(input);
     document.getElementById("quizCodeForm").appendChild(submit);

     $("#initialQuizCodeButton").remove();

}

