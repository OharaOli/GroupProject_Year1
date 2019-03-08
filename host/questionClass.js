// Written by Alex.

// Question class constructor.
function Question(text, answers, correctAnswers, timeLimit)
{
  this.text = text;
  this.answers = answers;
  this.correctAnswers = correctAnswers;
  this.timeLimit = timeLimit;
} // Question constructor

// Calculates the score depending on if the correct answer was given.
function giveAnswer(correctAnswer)
{
  // Only increases the score if the correct answer given.
  if(correctAnswer.includes(this.currentAnswer))
    this.score += 1;
  // Clears the answer for the next question.
  this.currentAnswer = "-";
} // giveAnswer
