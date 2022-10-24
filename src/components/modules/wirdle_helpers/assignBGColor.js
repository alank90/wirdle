/**
 * Description - Determines background color of current box
 * when the current letter appears more then once in the guessed
 * string or the wirdle
 * @param {Array} indexesOfGuess - positions where letter appears in guess
 * @param {Array} indexesOfWirdle
 * @return {String} Background color to assign to box
 */

export default function assignBGColor(
  indexesOfGuess,
  indexesOfWirdle,
  guessString,
  wirdleString,
  currentWordPosition
) {
  console.log(indexesOfGuess, indexesOfWirdle);
  if (guessString[currentWordPosition] === wirdleString[currentWordPosition]) {
    console.log(wirdleString, currentWordPosition, guessString);
    return "green";
  } else {
    return "grey";
  }
}
