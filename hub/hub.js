function placeQuiz(quizID, quizName)
{
  $(document).ready(function() {

  $("#Quiz_List").append("<p>" + quizName);
  $("#Quiz_List").append("<button id='host" + quizID + "'>Host</button> ");

 $("#host" + quizID).click(function() {
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "../host/");

     var input = document.createElement("input");
     input.setAttribute("type", "hidden");
     input.setAttribute("name", "quizID");
     input.setAttribute("value", quizID);

     form.appendChild(input);
     document.body.appendChild(form);
     form.submit();
} );

  $("#Quiz_List").append("<button id='edit" + quizID + "'>Edit</button> <br />");

 $("#edit" + quizID).click(function() {
    var form = document.createElement("form");
    form.setAttribute("method", "post");

    //THIS SHOULD BE CHANGED TO QUIZ EDITOR NOT LANDING PAGE
    form.setAttribute("action", "../");

     var input = document.createElement("input");
     input.setAttribute("type", "hidden");
     input.setAttribute("name", "quizID");
     input.setAttribute("value", quizID);

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

