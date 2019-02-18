// written by Praeveen


// function for the displaying questions to the player
function showQuestion(question)
{
   $("#playerQuestion").html(question);
} // showQuestion

// function thats the answers from the players 
function  showAnswer(answersDictionary)
 {
    var count = 0;
       for(var key in answersDictionary)
         count++;
          
      // sets all the answers to hidden, then set display based on the length of dictionary
      $("#answer1").hide();
      $("#answer2").hide();
      $("#answer3").hide();
      $("#answer4").hide();

      // if there are 5 answers,  show the option for the 5 answers and put the value of answers to the buttons
      switch(count)
       {
         case 4:
         {
           $("#answer4").show();
           $("#answer4").html(answersDictionary['d']);
         } // case 4
         case 3:
         {
           $("#answer3").show();
           $("#answer3").html(answersDictionary['c']);
         }  // case 3
         case 2:
         {
           $("#answer2").show();
           $("#answer2").html(answersDictionary['b']);
         } // case 2 
        case 1:
        {
           $("#answer1").show();
           $("#answer1").html(answersDictionary['a']);
         } // case 1
     } // switch

  } // showAnswer
