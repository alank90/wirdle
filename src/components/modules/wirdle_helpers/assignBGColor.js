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
    // If exact match return green
    return "green";
  } else if (indexesOfGuess.length === indexesOfWirdle.length) {
    // Equal number of appearences guess && wirdle so we can just
    // return a yellow
    return "yellow";
  } else if (
    // If more guess letters then wirdle letters , either direct match or
    // or box should be grey and can defer to letters further in the
    // wirdle to determine box color.
    indexesOfGuess.length > indexesOfWirdle.length &&
    !indexesOfGuess.indexOf(indexesOfWirdle[0])
  ) {
    return guessStr[currentWordPosition] === wirdleStr[currentWordPosition]
      ? "green"
      : "grey";
  } else if (
    // If more wirdle letters then guess letter matches also return
    // green if direct match, else return grey.
    indexesOfWirdle.length > indexesOfGuess.length &&
    !indexesOfWirdle.indexOf(indexesOfGuess[0])
  ) {
    return guessStr[currentWordPosition] === wirdleStr[currentWordPosition]
      ? "green"
      : "grey";
  } else if (
    indexesOfGuess.length === 1 &&
    indexesOfWirdle.indexOf(indexesOfGuess[0])
  ) {
    // If only one current letter in guessStr and and it is in
    // wirdleStr but not a direct match, return yellow
    return "yellow";
  } else {
    // If we fell thru to here, default return grey
    return "grey";
  }
}
