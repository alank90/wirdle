import shadeKeyBoard from "./shadeKeyboard";
import { WORDS } from "../words";
import toastr from "toastr";
import animate from "./animate";

/**
 * checkGuess - Compares two strings and reacts accordingly
 *
 * @param { object } wirdleState - Holds state info of wirdle game
 * @param { string } rightGuessString - The correct word
 * @imported by keystrokeHandler.js
 * @return { wirdleState }
 */
export default function checkGuess(wirdleState, rightGuessString) {
  let row =
    document.getElementsByClassName("letter-row")[
      6 - wirdleState.guessesRemaining
    ];
  let guessString = "";
  let rightGuess = Array.from(rightGuessString);
  const endGameMessage = [
    "Whoa! Just made it.",
    "Cutting it a little close.",
    "Not bad.",
    "Very Impressive.",
    "Excellent. You must do this alot.",
    "Wow! Your're a genius.",
  ];

  // toastr config options
  toastr.options.closeButton = true;
  toastr.options.closeMethod = "fadeOut";
  toastr.options.closeDuration = 350;
  toastr.options.closeEasing = "swing";
  toastr.options.showMethod = "slideDown";
  toastr.options.preventDuplicates = true;
  toastr.options.progressBar = true;

  // Convert to a string from an array
  for (const val of wirdleState.currentGuess) {
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
    wirdleState.currentGuess = [];
    wirdleState.nextLetter = 0;
    toastr.error("Sorry. Word is not in list!");
    return { wirdleState };
  } // End if

  for (let i = 0; i < 5; i++) {
    let letterColor = "";
    let box = row.children[i];
    let letter = wirdleState.currentGuess[i];

    // Check if the letter is in the rightGuess array
    let letterPosition = rightGuess.indexOf(letter);
    // Check how many times letter appears in the rightGuess string
    const regex = new RegExp(letter, "g");
    const letterMatchesInWord = guessString.match(regex).length;
    console.log(letterMatchesInWord);
    // Now determine what color to assign to background of letter box
    if (letterPosition === -1) {
      letterColor = "grey";
    } else if (letterMatchesInWord > 1) {
      console.log("Im in letter that appears more then once");
      // Loop thru the rightGuess Array
      while (letterMatchesInWord) {
        console.log("test");
        letterMatchesInWord - 1;
      }
    } else {
      // now, letter is definitely in word so,
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
    toastr.success(endGameMessage[wirdleState.guessesRemaining - 1]);
    wirdleState.guessesRemaining = 0;
    wirdleState.newGame = true;
    return { wirdleState };
  } else if (wirdleState.guessesRemaining > 1) {
    // Let's reset variables for next guess
    wirdleState.guessesRemaining -= 1;
    wirdleState.currentGuess = [];
    wirdleState.nextLetter = 0;
    // Got an extra guess. Need to increment gamesPlayed
    // This would normally be done in the resetGameboard component
    if (wirdleState.usedEasterEgg) {
      localStorage.setItem("gamesPlayed", 3);
    }
  } else {
    if (wirdleState.guessesRemaining === 1) {
      wirdleState.newGame = true;
      if (wirdleState.usedEasterEgg) {
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
  return { wirdleState };
}
