//javaScript for retrieving the editor from the database
// essentially 'regenerates' the quiz editor.


//base case (root questions)
//hiearchy pattern: Q#
// regular expression syntax; /pattern/modifiers;
//g is for global search. doesn't stop after finding the first one
//use constructor to allow concatenation within it.
var rootQPattern = /^Q[0-9]*[0-9]$/i

var test1 = 'Q1'
var test2 = 'Q22'
var test3 = 'Q5>A>L2>Q12'

//alert(rootQPattern.test(test1));
//alert(rootQPattern.test(test2));
//alert(rootQPattern.test(test3));




//step cases (for each root)
// (Root|Link)Q to A
//hierarchy pattern: Q#>A

function createQtoAPattern(givenQNum, givenAIndex)
{
  var qtoAPattern = new RegExp( 'Q' + givenQNum + '>' + givenAIndex +'$', 'i')
//reg

  return qtoAPattern;
} // function questiontoA

var test4 = 'Q3>A'
var test5 = 'Q23>B>L1'

//alert(createQtoAPattern(3,'A').test(test5))

// (Root|Link)Q to B
//hierarchy pattern: Q#>B

// (Root|Link)Q to C
//hierarchy pattern: Q#>C

// (Root|Link)Q to D
//hierarchy pattern: Q#>D



//A to LinkQ
//hierarchy pattern:
// Q#>A>L#(from the least numnber)>Q#
//recognize

//function createAtoLQPattern(givenAIndex, given)
//{




//} // function createAtoLQPattern

//B to linkQ
// Q#>B>L#(from the least numnber)>Q#


//C to linkQ
// Q#>B>L#(from the least numnber)>Q#


//D to linkQ
// Q#>B>L#(from the least numnber)>Q#
// given Parent answerDDiv, append the questtion!



//need a function that finds a row(a question) that matches with a given pattern
function findRowMatchingPattern(givenTable, columnNum)
{




  return;


} // function findRowMatchingPattern


// a function for retrieving quiz Editor from a html database
function retrieveEditor(givenTableId)
{
  var currentRow;
  var currentColumn;

  var rootQCollection = [];
  //empty array
  // first it has to read the table.
  // starting with the hierarchy column
  // first figure out the indices for the root questions

  var dataTable = document.getElementById('dataTable');


  //JQuery to collect all the hierarchies of the root questions
  $('tr').each(function()
        {
          //(($(this).find("td").eq(1).html()));
        }
      );

  //(rootQCollection.length);


} // function retrieveEditor


retrieveEditor('dataTable')
