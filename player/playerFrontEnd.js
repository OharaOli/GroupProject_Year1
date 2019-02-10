// written by Praeveen


// function for the displaying questions to the player
function showQuestion(question)
{
   document.getElementById("playerQuestion").innerHTML = question;
} // showQuestion

// function thats the answers from the players 
function  showAnswer(answersDictionary)
 {
    var count = 0;
       for(var key in answersDictionary)
         count++;
     
      // sets all the answers to hidden, then set to visible based on the length of dictionary
      document.getElementById("answer1").style.visibility = "hidden";
      document.getElementById("answer2").style.visibility = "hidden";
      document.getElementById("answer3").style.visibility = "hidden";
      document.getElementById("answer4").style.visibility = "hidden";

      switch(count)
       {
         case 4:
           document.getElementById("answer4").style.visibility = "visible";
         case 3:
           document.getElementById("answer3").style.visibility = "visible";
         case 2:
           document.getElementById("answer2").style.visibility = "visible";
         case 1:
           document.getElementById("answer1").style.visibility = "visible";
     } // switch
  } // showAnswer
