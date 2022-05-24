import checkGuess from "./checkGuess";
import animate from "./animate.js";
import easterEgg from "./easterEgg.js";

easterEgg();

export function useKeystrokeHandler(
  wirtleState,
  rightGuessString
) {
  console.log(rightGuessString.value);

  if (!wirtleState.newGame) {
    document.addEventListener("keyup", handleKeystroke.bind(null, wirtleState));
  }

  function handleKeystroke(wirtleState, e) {
    // ========== Keyboard event handler ======================= //
    console.log(rightGuessString.value);

    if (wirtleState.guessesRemaining === 0) {
      return { wirtleState };
    }

    wirtleState.pressedKey = String(e.key);

    if (
      wirtleState.pressedKey === "Backspace" &&
      wirtleState.nextLetter !== 0
    ) {
      deleteLetter();
      return { wirtleState };
    }

    if (wirtleState.pressedKey === "Enter") {
      wirtleState = checkGuess(wirtleState, rightGuessString.value) || {};
      return { wirtleState };
    }

    wirtleState.found = wirtleState.pressedKey.match(/[a-z]/gi);
    if (!wirtleState.found || wirtleState.found.length > 1) {
      return { wirtleState };
    } else {
      insertLetter(wirtleState.pressedKey);
      return { wirtleState };
    }
  } // end handleKeystroke

  // ============================================= //
  // ========== Functions ======================== //
  // ============================================= //
  function insertLetter(pressedKey) {
    if (wirtleState.nextLetter === 5) {
      return;
    }

    pressedKey = pressedKey.toLowerCase();

    let row =
      document.getElementsByClassName("letter-row")[
        6 - wirtleState.guessesRemaining
      ];

    let box = row.children[wirtleState.nextLetter];
    animate(box, "pulse");
    box.textContent = pressedKey;
    box.classList.add("filled-box");
    wirtleState.currentGuess.push(pressedKey);
    wirtleState.nextLetter += 1;
  }

  function deleteLetter() {
    let row =
      document.getElementsByClassName("letter-row")[
        6 - wirtleState.guessesRemaining
      ];
    let box = row.children[wirtleState.nextLetter - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
    wirtleState.currentGuess.pop();
    wirtleState.nextLetter -= 1;
  }
}
// ========================================================== //
// ============ End of default export ======================= //
// ========================================================== //
