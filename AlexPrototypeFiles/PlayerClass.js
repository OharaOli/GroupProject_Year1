// Written by Alex.

// The maximum time difference in milliseconds before a player is disconnected.
var MAX_TIME_DIFF = 4000; // Currently set to 4 seconds.

// Player class constructor.
function Player(screenName, initialTimeValue)
{
  // The name of the player which will be displayed on the screen.
  this.screenName = screenName;
  // Calculates the time when the player was created.
  this.startTime = Date.now() - initialTimeValue;
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
  this.checkTime = checkTime;
} // Player constructor

// Calculates the score depending on if the correct answer was given.
function giveAnswer(correctAnswer)
{
  // Only increases the score if the correct answer given.
  if(this.currentAnswer == correctAnswer)
    this.score += 1;
  // Clears the answer for the next question.
  this.currentAnswer = "-";
} // giveAnswer

// Determines if a player should be disconnected if their time difference
// is not as expected to a given range.
// Returns false if this difference is too great so that the host can
// disconnect the player within the database.
function checkTime(apparentDifference)
{
  // Calculates the time difference from the start and subtracts the 
  // apparent difference. This gives the difference between the expected
  // time and the database time. If this absolute value is greater than
  // the maximum then the player is disconnected.
  if(Math.abs(Date.now() - this.startTime - apparentDifference) 
     > MAX_TIME_DIFF)
  {
    // The player is considered disconnected.
    connected = false;
    // Returns false to signify the time difference is too great.
    return false; 
  }
  // If the time difference is acceptable then true is returned.
  return true;
} // checkTime
