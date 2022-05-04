import { WORDS } from "@/components/modules/words.js";
import shadeKeyBoard from "./shadeKeyboard";

export default function checkGuess(
  guessesRemaining,
  rightGuessString,
  currentGuess,
  nextLetter
) {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let guessString = "";
  let rightGuess = Array.from(rightGuessString);

  // Convert to a string from an array
  for (const val of currentGuess) {
    guessString += val;
  }

  // Several basic validity checks on the guessString
  if (guessString.length != 5) {
    alert("Not enough letters!.");
  }

  if (!WORDS.includes(guessString)) {
    alert("Sorry. Word is not in list!");
  }

  for (let i = 0; i < 5; i++) {
    let letterColor = "";
    let box = row.children[i];
    let letter = currentGuess[i];

    // Check if the letter is in the correct guess
    let letterPosition = rightGuess.indexOf(letter);

    // Now determine what color to assign to background of letter box
    if (letterPosition === -1) {
      letterColor = "grey";
    } else {
      // now, letter is definitely in word
      // if letter index and right guess index are the same
      // letter is in the right position
      if (letter === rightGuess[i]) {
        // shade box green
        letterColor = "green";
      } else {
        // shade box yellow
        letterColor = "yellow";
      }

      rightGuess[letterPosition] = "#";
    }

    let delay = 250 * i;
    setTimeout(() => {
      // shade the box
      box.style.backgroundColor = letterColor;
      shadeKeyBoard(letter, letterColor);
    }, delay);
  } // end for ... loop

  if (guessString === rightGuessString) {
    alert("Alright!!! You guessed correctly. Game over!");
    guessesRemaining = 0;
    return;
  } else {
    guessesRemaining -= 1;
    currentGuess = [];
    nextLetter = 0;

    if (guessesRemaining === 0) {
      alert("You've run out of guesses. Better luck next time. Game over!");
      alert("The correct word was: '${rightGuessString}");
    }
  }
}
