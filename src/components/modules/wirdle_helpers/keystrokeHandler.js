import checkGuess from "./checkGuess";
import animate from "./animate.js";

/**
 * useKeystrokeHandler - Vue Composable
 *
 * @export
 * @param { object } wirdleState - object containing state of game
 * @param { string } rightGuessString - The current word for the game
 */
export function useKeystrokeHandler(wirdleState, rightGuessString) {
  if (!wirdleState.newGame) {
    document.addEventListener("keyup", handleKeystroke.bind(null, wirdleState));
  }

  /**
   * handleKeystroke - callback function for the "keyup" Event Listener
   * @param {object} wirdleState
   * @param {object} e - event object
   * @return { wirdleState } - Game state
   */

  // ========== Keyboard event handler ======================= //
  function handleKeystroke(wirdleState, e) {
    if (wirdleState.guessesRemaining === 0) {
      return { wirdleState };
    }

    wirdleState.pressedKey = String(e.key);

    if (
      wirdleState.pressedKey === "Backspace" &&
      wirdleState.nextLetter !== 0
    ) {
      deleteLetter();
      return { wirdleState };
    }

    if (wirdleState.pressedKey === "Enter") {
      wirdleState = checkGuess(wirdleState, rightGuessString.value) || {};
      return { wirdleState };
    }

    wirdleState.found = wirdleState.pressedKey.match(/[a-z]/gi);
    if (!wirdleState.found || wirdleState.found.length > 1) {
      return { wirdleState };
    } else {
      insertLetter(wirdleState.pressedKey);
      return { wirdleState };
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
    if (wirdleState.nextLetter === 5) {
      return;
    }

    pressedKey = pressedKey.toLowerCase();

    let row =
      document.getElementsByClassName("letter-row")[
        6 - wirdleState.guessesRemaining
      ];

    if (row) {
      let box = row.children[wirdleState.nextLetter];
      animate(box, "pulse");
      box.textContent = pressedKey;
      box.classList.add("filled-box");
      wirdleState.currentGuess.push(pressedKey);
      wirdleState.nextLetter += 1;
    }
  }

  /**
   * deleteLetter- deletes letter from DOM on keypress Del
   *
   */
  function deleteLetter() {
    let row =
      document.getElementsByClassName("letter-row")[
        6 - wirdleState.guessesRemaining
      ];
    let box = row.children[wirdleState.nextLetter - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
    wirdleState.currentGuess.pop();
    wirdleState.nextLetter -= 1;
  }
}
// ========================================================== //
// ============ End of default export ======================= //
// ========================================================== //
