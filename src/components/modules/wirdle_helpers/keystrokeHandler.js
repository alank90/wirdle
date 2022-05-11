import { WORDS } from "@/components/modules/words.js";
import checkGuess from "./checkGuess";
import animate from "./animate.js";

// Initialize Vars
const Number_Of_Guesses = 6;

let wirtleState = {
  guessesRemaining: Number_Of_Guesses,
  currentGuess: [],
  nextLetter: 0,
  pressedKey: "",
  found: "",
  newGame: false,
};

let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(rightGuessString);

export function useKeystrokeHandler(e) {
  // Keyboard event handler
  // First check if it is a new game. If yes reset variables
  if (wirtleState.newGame) {
    wirtleState.guessesRemaining = Number_Of_Guesses;
    wirtleState.currentGuess = [];
    wirtleState.nextLetter = 0;
    wirtleState.pressedKey = "";
    wirtleState.found = "";
    wirtleState.newGame = false;
    rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
    console.log(rightGuessString);
  }
  if (wirtleState.guessesRemaining === 0) {
    return;
  }

  wirtleState.pressedKey = String(e.key);

  if (wirtleState.pressedKey === "Backspace" && wirtleState.nextLetter !== 0) {
    deleteLetter();
    return;
  }

  if (wirtleState.pressedKey === "Enter") {
    ({ wirtleState } = checkGuess(wirtleState, rightGuessString) || {});
    return;
  }

  wirtleState.found = wirtleState.pressedKey.match(/[a-z]/gi);
  if (!wirtleState.found || wirtleState.found.length > 1) {
    return;
  } else {
    insertLetter(wirtleState.pressedKey);
  }

  // ========== Functions ======================== //

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
