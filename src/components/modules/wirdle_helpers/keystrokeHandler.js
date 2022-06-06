import checkGuess from "./checkGuess";
import animate from "./animate.js";

/**
 * useKeystrokeHandler - Vue Composable
 *
 * @export
 * @param { object } wirtleState - object containing state of game
 * @param { string } rightGuessString - The current word for the game
 */
export function useKeystrokeHandler(wirtleState, rightGuessString) {
  if (!wirtleState.newGame) {
    document.addEventListener("keyup", handleKeystroke.bind(null, wirtleState));
  }

  /**
   * handleKeystroke - callback function for the "keyup" Event Listener
   * @param {object} wirtleState
   * @param {object} e - event object
   * @return { wirtleState } - Game state
   */

  // ========== Keyboard event handler ======================= //
  function handleKeystroke(wirtleState, e) {
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
  /**
   * insertLetter - inserts pressed keyboard letter into DOM
   *
   * @param { string } pressedKey
   * @return {undefined}
   */
  function insertLetter(pressedKey) {
    if (wirtleState.nextLetter === 5) {
      return;
    }

    pressedKey = pressedKey.toLowerCase();

    let row =
      document.getElementsByClassName("letter-row")[
        6 - wirtleState.guessesRemaining
      ];

    if (row) {
      let box = row.children[wirtleState.nextLetter];
      animate(box, "pulse");
      box.textContent = pressedKey;
      box.classList.add("filled-box");
      wirtleState.currentGuess.push(pressedKey);
      wirtleState.nextLetter += 1;
    }
  }

  /**
   * deleteLetter- deletes letter from DOM on keypress Del
   *
   */
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
