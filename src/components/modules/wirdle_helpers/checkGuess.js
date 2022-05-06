import { WORDS } from "@/components/modules/words.js";
import shadeKeyBoard from "./shadeKeyboard";
import toastr from "toastr";

export default function checkGuess(
  guessesRemaining,
  currentGuess,
  nextLetter,
  rightGuessString
) {
  let wirtleState = {
    guessesRemaining: guessesRemaining,
    currentGuess: currentGuess,
    nextLetter: nextLetter,
  };
  let row =
    document.getElementsByClassName("letter-row")[
      6 - wirtleState.guessesRemaining
    ];
  let guessString = "";
  let rightGuess = Array.from(rightGuessString);

  // Convert to a string from an array
  for (const val of wirtleState.currentGuess) {
    guessString += val;
  }

  // Several basic validity checks on the guessString
  if (guessString.length != 5) {
    toastr.error("Not enough letters!.");
  }

  if (!WORDS.includes(guessString)) {
    toastr.error("Sorry. Word is not in list!");
  }

  for (let i = 0; i < 5; i++) {
    let letterColor = "";
    let box = row.children[i];
    let letter = wirtleState.currentGuess[i];

    // Check if the letter is in the correctGuess array
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
      // call shadeKeyBoard() to also shade bg of virtual keyboard
      shadeKeyBoard(letter, letterColor);
    }, delay);
  } // end for ... loop

  if (guessString === rightGuessString) {
    toastr.success("Alright!!! You guessed correctly. Game over!");
    wirtleState.guessesRemaining = 0;
    return;
  } else if (wirtleState.guessesRemaining !== 0) {
    // Let's reset variables for next guess
    wirtleState.guessesRemaining -= 1;
    wirtleState.currentGuess = [];
    wirtleState.nextLetter = 0;
  } else {
    if (wirtleState.guessesRemaining === 0) {
      toastr.error("You've run out of guesses. Better luck next time. Game over!");
      toastr.info("The correct word was: '${rightGuessString}");
    }
  }
  return wirtleState;
}