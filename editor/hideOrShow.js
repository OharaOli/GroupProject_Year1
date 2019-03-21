//boolean variables to represent hide and show
var isAllSubQHidden = false;
var isAddRootQButtonHidden = false;



//function for editing rootQOrder
function editRootQOrder(givenButton)
{
  var dragHandleArray;

  //first change the boolean state of all buttons.
  if(givenButton.getAttribute('data-editMode') == '0')
  {
    givenButton.setAttribute('data-editMode', '1');
    givenButton.style.backgroundColor = "#A9DFBF";

    //change the boolean state in all of the other buttons as well
    dragHandleArray = document.getElementsByClassName('dragHandleRoot');
    for(var index = 0; index < dragHandleArray.length; index++)
    {
      dragHandleArray[index].setAttribute('data-editMode', '1');
      dragHandleArray[index].style.backgroundColor = "#A9DFBF";
    } // for loop
  } // true part
  else
  {
    givenButton.setAttribute('data-editMode', '0');
    givenButton.style.backgroundColor = "buttonface";

    //change the boolean state in all of the other buttons as well
    dragHandleArray = document.getElementsByClassName('dragHandleRoot');
    for(var index = 0; index < dragHandleArray.length; index++)
    {
      dragHandleArray[index].setAttribute('data-editMode', '0');
      dragHandleArray[index].style.backgroundColor = "buttonface";

    } // for loop
  } // false part

  // on Click, it should hide all the subQDivWithHideOrShow
  hideORShowByClass('subQDivWithHideOrShow');


  //hide the add root question button
  hideAddRootQButton();

  //disable all of the delete question button
  //and re-enable it
  var deleteRootQButtonArray = document.getElementsByClassName('deleteRootQButton');

  for(var index =0; index < deleteRootQButtonArray.length; index++)
  {
    if(deleteRootQButtonArray[index].getAttribute('disabled') == null)
    {
      deleteRootQButtonArray[index].setAttribute("disabled", true);
    }
    else
    {
      deleteRootQButtonArray[index].disabled = null;
    }

  } // for loop
}



function hideAddRootQButton()
{
  hideOrShowById("addRootQButton");

  if(isAddRootQButtonHidden)
  {
    isAddRootQButtonHidden = false;
  }
  else
  {
    isAddRootQButtonHidden = true;
  }
} // function hideAddRootButton\



//function for the hideSubQButton
function hideSubQButton(givenButton)
{
  console.log(givenButton.value);
  hideSubQuestions(givenButton);

  if(givenButton.value == "Hide Sub Questions")
    givenButton.value = "Show Sub Questions";
  else
    givenButton.value = "Hide Sub Questions";

}


//function for hiding all the answers
//function for hiding all the sub questions
//hide/show individual sub questions added. known error: edit root Q order does not work properly
function hideAllSubQuestions()
{
  //grab all the elements by class name
  hideORShowByClass('subQDiv');

  if(isAllSubQHidden)
  {
    isAllSubQHidden = false;
  }
  else
  {
    isAllSubQHidden = true;
  }

} // function hideAllSubQuestions




//function for hiding sub questions of a root question
function hideSubQuestions(givenButton)
{

  //use the nextSibling property
  hideORShowByElement(givenButton.nextElementSibling);


  //change the shape of the button
  if(givenButton.value == "Hide Sub Questions")
  {
    givenButton.value = "Show Sub Questions";
  }
  else
  {
    givenButton.value = "Hide Sub Questions";
  }

} // function hideSubQuestions


function hideORShowByClass(givenClassId)
{

  var allElements = document.getElementsByClassName(givenClassId);

  for(index = 0; index < allElements.length; index ++)
  {

    if (allElements[index].style.display == "none")
    {
      allElements[index].style.display = "block";
    }
    else
    {
      allElements[index].style.display = "none";
    }

  } // for loop
}

function hideOrShowById(givenId)
{

  var element = document.getElementById(givenId);

  if(element.style.display == "block")
  {

    element.style.display = "none";

  }
  else
  {
    element.style.display = "block";
  }

}



function hideORShowByElement(givenElement)
{
  if(givenElement.style.display == "block")
  {

    givenElement.style.display = "none";

  }
  else
  {
    givenElement.style.display = "block";
  }

} // function hideOrShowByElement
