import shadeKeyBoard from "./shadeKeyboard";
import { WORDS } from "../words";
import toastr from "toastr";
import animate from "./animate";
import assignBGColor from "./assignBGColor";

/**
 * checkGuess - Compares two strings and reacts accordingly
 *
 * @param { object } wirdleState - Holds state info of wirdle game
 * @param { string } wirdle - The correct word
 * @imported by keystrokeHandler.js
 * @return { wirdleState }
 */
export default function checkGuess(wirdleState, wirdle) {
  let row =
    document.getElementsByClassName("letter-row")[
      6 - wirdleState.guessesRemaining
    ];
  let guessString = "";
  let wirdleString = wirdle;
  wirdle = Array.from(wirdle);
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
    let currentBoxBGColor = "";
    let box = row.children[i];
    let letter = wirdleState.currentGuess[i];

    // Find the indexes in wirdle where current letter appear
    // in string
    const sourceStr = wirdleString;
    const searchStr = letter;
    // Get the position(s) where current letter appear in the wirdle
    const indexOfLettersInWirdle = [
      ...sourceStr.matchAll(new RegExp(searchStr, "gi")),
    ].map((a) => a.index);
    console.log(`Index(s) of matches in wirdle ${indexOfLettersInWirdle}`);
    // Check if current letter appears more then once in guessed word
    const indexOfLettersInGuessString = [
      ...guessString.matchAll(new RegExp(searchStr, "gi")),
    ].map((a) => a.index);
    console.log(
      `Index(s) of matches in guessString ${indexOfLettersInGuessString}`
    );

    // Check if the letter is in the wirdle array and if so,
    // Determine what color to assign to background of letter box
    if (indexOfLettersInWirdle.length === 0) {
      currentBoxBGColor = "grey";
    } else if (
      indexOfLettersInWirdle.length === 1 &&
      indexOfLettersInGuessString.length === 1
    ) {
      // Now, letter is definitely in wirdle and appears only once so,
      // if letter index and right guess index are the same
      // letter is in the right position
      if (letter === wirdle[i]) {
        // shade box green
        currentBoxBGColor = "green";
      } else {
        // shade box yellow
        currentBoxBGColor = "yellow";
      }
      // Mark the wirdle position as done
      wirdleString = wirdleString.replace(searchStr, "#");
    } else {
      currentBoxBGColor = assignBGColor(
        indexOfLettersInGuessString,
        indexOfLettersInWirdle,
        guessString,
        wirdleString,
        i
      );

      // Mark the wirdle position(s) as done
      if (currentBoxBGColor === "green" || currentBoxBGColor === "yellow") {
        if (indexOfLettersInWirdle.length === 1) {
          // Letter only appears once in wirdle, so we can blank
          // out any other appearences of letter further in the wirdle.
          for (let n = 0; n < indexOfLettersInGuessString.length; n++) {
            wirdleString = wirdleString.replace(searchStr, "#");
            guessString = guessString.replace(searchStr, "#");
          }
        } else {
          // Letter appears subsequent to this position, so we will
          // only blank out this entry.
          const regex = new RegExp("\\b([\\w])(\\w*?)\\1", "gm");
          const subst = `$1$2#`;
          wirdleString = wirdleString.replace(regex, subst);
          guessString = guessString.replace(regex, subst);
        }
      }
    }

    let delay = 250 * i;
    setTimeout(() => {
      // flip box
      animate(box, "flipInX");
      // shade the box
      box.style.backgroundColor = currentBoxBGColor;
      // call shadeKeyBoard() to also shade bg of virtual keyboard
      shadeKeyBoard(letter, currentBoxBGColor);
    }, delay);
  } // end for ... loop

  // have to reinitialize wirdleString
  wirdleString = wirdle.join("");
  if (guessString === wirdleString) {
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
        `The correct word was: ${wirdle}`,
        "Game Over. Better luck next time.",
        { timeOut: 5000 }
      );
    } else {
      toastr.error("Sorry! Error. Please start again.");
    }
  }
  return { wirdleState };
}
