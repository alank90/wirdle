import shadeKeyBoard from "./shadeKeyboard";
import { WORDS } from "../words";
import toastr from "toastr";
import animate from "./animate";

/**
 * checkGuess - Compares two strings and reacts accordingly
 *
 * @export
 * @param { object } wirtleState - Holds state info of wirtle game
 * @param { string } rightGuessString - The correct word
 * @return { wirtleState }
 */
export default function checkGuess(wirtleState, rightGuessString) {
  let row =
    document.getElementsByClassName("letter-row")[
      6 - wirtleState.guessesRemaining
    ];
  let guessString = "";
  let rightGuess = Array.from(rightGuessString);

  // toastr config options
  toastr.options.closeButton = true;
  toastr.options.closeMethod = "fadeOut";
  toastr.options.closeDuration = 350;
  toastr.options.closeEasing = "swing";
  toastr.options.showMethod = "slideDown";
  toastr.options.preventDuplicates = true;
  toastr.options.progressBar = true;

  // Convert to a string from an array
  for (const val of wirtleState.currentGuess) {
    guessString += val;
  }

  // Several basic validity checks on the guessString
  if (guessString.length != 5) {
    toastr.error("Not enough letters!.");
  }

  if (!WORDS.includes(guessString)) {
    // Clear DOM of guessString
    let box = null;
    for (let i = 0; i < row.children.length; i++) {
      box = row.children[i];
      box.textContent = "";
      box.classList.remove("filled-box");
      box.removeAttribute("style");
    }

    // Reset state
    wirtleState.currentGuess = [];
    wirtleState.nextLetter = 0;
    toastr.error("Sorry. Word is not in list!");
    return { wirtleState };
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
      // flip box
      animate(box, "flipInX");
      // shade the box
      box.style.backgroundColor = letterColor;
      // call shadeKeyBoard() to also shade bg of virtual keyboard
      shadeKeyBoard(letter, letterColor);
    }, delay);
  } // end for ... loop

  if (guessString === rightGuessString) {
    toastr.success("Alright!!! You guessed correctly. Game over!");
    wirtleState.guessesRemaining = 0;
    wirtleState.newGame = true;
    return { wirtleState };
  } else if (wirtleState.guessesRemaining > 1) {
    // Let's reset variables for next guess
    wirtleState.guessesRemaining -= 1;
    wirtleState.currentGuess = [];
    wirtleState.nextLetter = 0;
    // Got an extra guess. Need to increment gamesPlayed
    // This would normally be done in the resetGameboard component
    if (wirtleState.usedEasterEgg) {
      localStorage.setItem("gamesPlayed", 3);
    }
  } else {
    if (wirtleState.guessesRemaining === 1) {
      wirtleState.newGame = true;
      if (wirtleState.usedEasterEgg) {
        localStorage.setItem("gamesPlayed", 3);
      }
      toastr.info(
        `The correct word was: ${rightGuessString}`,
        "Game Over. Better luck next time.",
        { timeOut: 5000 }
      );
    } else {
      toastr.error("Sorry! Error. Please start again.");
    }
  }
  return { wirtleState };
}
