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
          
      // sets all the answers to hidden, then set display based on the length of dictionary
      document.getElementById("answer1").style.display = "none";
      document.getElementById("answer2").style.display = "none";
      document.getElementById("answer3").style.display = "none";
      document.getElementById("answer4").style.display = "none";
      document.getElementById("answer5").style.display = "none";

      // if there are 5 answers,  show the option for the 5 answers and put the value of answers to the buttons
      switch(count)
       {
         case 5:
         {
           document.getElementById("answer5").style.display = "block";
           document.getElementById("answer5").innerHTML = answersDictionary['e'];
         } // case 5
         case 4:
         {
           document.getElementById("answer4").style.display = "block";
           document.getElementById("answer4").innerHTML = answersDictionary['d'];
         } // case 4
         case 3:
         {
           document.getElementById("answer3").style.display = "block";
          document.getElementById("answer3").innerHTML = answersDictionary['c'];
         }  // case 3
         case 2:
         {
           document.getElementById("answer2").style.display = "block";
           document.getElementById("answer2").innerHTML = answersDictionary['b'];
         } // case 2 
        case 1:
        {
           document.getElementById("answer1").style.display = "block";
           document.getElementById("answer1").innerHTML = answersDictionary['a'];
         } // case 1
     } // switch

  } // showAnswer
