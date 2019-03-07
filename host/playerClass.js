// Written by Alex.

// Player class constructor.
function Player(screenName)
{
  // The name of the player which will be displayed on the screen.
  this.screenName = screenName;
  // The score which will be displayed on the screen. Always calculated but
  // may not be used.
  this.score = 0;
  // Determines if the player is connected.
  // This will be set false if the time difference is too much. 
  this.connected = true;
  // The answer to the most previous question. Initially this will be nothing.
  this.currentAnswer = "-";
  
  // Assigns the class methods.
  this.giveAnswer = giveAnswer;
} // Player constructor

// Calculates the score depending on if the correct answer was given.
function giveAnswer(correctAnswer)
{
  // Only increases the score if the correct answer given.
  if(correctAnswer.includes(this.currentAnswer))
    this.score += 1;
  // Clears the answer for the next question.
  this.currentAnswer = "-";
} // giveAnswer
