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
  guessStr,
  wirdleStr,
  currentWordPosition
) {
  if (guessStr[currentWordPosition] === wirdleStr[currentWordPosition]) {
    console.log(wirdleStr, currentWordPosition, guessStr);
    return "green";
  } else if (guessStr[currentWordPosition] !== "#") {
    return "yellow";
  } else {
    return "grey";
  }
}
