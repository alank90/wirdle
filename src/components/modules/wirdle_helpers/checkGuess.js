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
  // ====== Vars ======================= //
  let row =
    document.getElementsByClassName("letter-row")[
      6 - wirdleState.guessesRemaining
    ];
  let guessStr = "";
  let wirdleStr = wirdle;
  let box = null;
  let letter = "";
  let i = 0;
  let currentBoxBGColor = "";
  let counter = 0;
  const endGameMessage = [
    "Whoa! Just made it.",
    "Cutting it a little close.",
    "Not bad.",
    "Very Impressive.",
    "Excellent. You must do this alot.",
    "Wow! Your're a genius.",
  ];

  // ============================================ //
  // ============== Methods ===================== //
  // ============================================ //

  const boxAnimation = function (box, currentBoxBGColor, letter) {
    let delay = 250 * i;
    setTimeout(() => {
      // flip box
      animate(box, "flipInX");
      // shade the box
      box.style.backgroundColor = currentBoxBGColor;
      // call shadeKeyBoard() to also shade bg of virtual keyboard
      shadeKeyBoard(letter, currentBoxBGColor);
    }, delay);
  };

  // =========================================== //
  // ==========End of Method(s)================= //
  // =========================================== //

  const wirdleArr = Array.from(wirdle);

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
    guessStr += val;
  }

  // Several basic validity checks on the guessStr
  if (guessStr.length != 5) {
    toastr.error("Not enough letters!.");
  }

  if (!WORDS.includes(guessStr)) {
    // Clear DOM of guessStr
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
    currentBoxBGColor = "";
    box = row.children[i];
    letter = wirdleState.currentGuess[i];

    // Find the indexes in wirdleArr where current letter appear
    // in string
    const sourceStr = wirdleStr;
    const searchStr = letter;
    // Get the position(s) where current letter appear in the wirdle
    const indexOfLettersInWirdleStr = [
      ...sourceStr.matchAll(new RegExp(searchStr, "gi")),
    ].map((a) => a.index);
    // Check if current letter appears more then once in guessed word
    const indexOfLettersInGuessStr = [
      ...guessStr.matchAll(new RegExp(searchStr, "gi")),
    ].map((a) => a.index);

    // Check if the letter is in the wirdle array and if so,
    // Determine what color to assign to background of letter box
    if (indexOfLettersInWirdleStr.length === 0) {
      currentBoxBGColor = "grey";
      boxAnimation(box, currentBoxBGColor, letter);
      // Mark this letter as done in guessStr.
      guessStr = guessStr.replace(searchStr, "#");

      continue;
    } else if (
      indexOfLettersInWirdleStr.length === 1 &&
      indexOfLettersInGuessStr.length === 1
    ) {
      // Now, letter is definitely in wirdle and appears only once so,
      // if letter index and right guess index are the same, then
      // letter is in the right position
      if (letter === wirdleArr[i]) {
        // shade box green
        currentBoxBGColor = "green";
        // Mark the wirdle & guessStr position's as done
        wirdleStr = wirdleStr.replace(searchStr, "#");
        guessStr = guessStr.replace(searchStr, "#");
      } else {
        // shade box yellow
        currentBoxBGColor = "yellow";
        // Mark the wirdle & guessStr position's as done
        wirdleStr = wirdleStr.replace(searchStr, "#");
        guessStr = guessStr.replace(searchStr, "#");
      }

      boxAnimation(box, currentBoxBGColor, letter);
      continue;
    }

    // The current letter in wirdle appears more then once in either
    // wirdle/guessStr. So we must check ahead in this situation.
    else if (
      indexOfLettersInWirdleStr.length > 1 ||
      indexOfLettersInGuessStr.length > 1
    ) {
      currentBoxBGColor = assignBGColor(
        indexOfLettersInGuessStr,
        indexOfLettersInWirdleStr,
        guessStr,
        wirdleStr,
        i
      );

      // Now let's check what color we've assigned the box background
      // and take the appropriate action(s)
      if (currentBoxBGColor === "green") {
        // Letter only appears once in wirdle, so we can blank
        // out any other appearences of letter further in the wirdle.

        wirdleStr = wirdleStr.replace(searchStr, "#");
        guessStr = guessStr.replace(searchStr, "#");
      } else if (
        currentBoxBGColor === "yellow" ||
        currentBoxBGColor === "grey"
      ) {
        // Letter appears at least once subsequent to this position, so we will
        // blank out this entry only.
        counter = 0;
        wirdleStr = Array.from(wirdleStr)
          .map((char) => {
            if (char === letter && counter === 0) {
              counter++;
              return "#";
            } else {
              return char;
            }
          })
          .join("");

        counter = 0;
        guessStr = Array.from(guessStr)
          .map((char) => {
            if (char === letter && counter === 0) {
              counter++;
              return "#";
            } else {
              return char;
            }
          })
          .join("");
      }

      boxAnimation(box, currentBoxBGColor, letter);
    } else {
      console.log("Error: No conditions met in checkGuess.js for loop.");
    }
  } // ====== end for... loop ============================== //

  // Have to reinitialize wirdleStr & guessStr
  guessStr = wirdleState.currentGuess.join("");
  wirdleStr = wirdleArr.join("");
  if (guessStr === wirdleStr) {
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
        `The correct word was: ${wirdleArr.join("")}`,
        "Game Over. Better luck next time.",
        { timeOut: 5000 }
      );
    } else {
      toastr.error("Sorry! Error. Please start again.");
    }
  }

  return { wirdleState };
}
