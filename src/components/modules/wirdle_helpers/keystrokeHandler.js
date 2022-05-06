import { WORDS } from "@/components/modules/words.js";
import checkGuess from "./checkGuess";

const Number_Of_Guesses = 6;
let guessesRemaining = Number_Of_Guesses;
let currentGuess = [];
let nextLetter = 0;
let pressedKey = null;
let found = null;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(rightGuessString);

export default function () {
  // Keyboard event handler
  document.addEventListener("keyup", (e) => {
    if (guessesRemaining === 0) {
      return;
    }

    pressedKey = String(e.key);

    if (pressedKey === "Backspace" && nextLetter !== 0) {
      deleteLetter();
      return;
    }

    if (pressedKey === "Enter") {
      ({ guessesRemaining, currentGuess, nextLetter } = checkGuess(
        guessesRemaining,
        currentGuess,
        nextLetter,
        rightGuessString
      ));
      return;
    }

    found = pressedKey.match(/[a-z]/gi);
    if (!found || found.length > 1) {
      return;
    } else {
      insertLetter(pressedKey);
    }
  });
}
// ========================================================== //
// ============ End of default export ======================= //
// ========================================================== //

// ========== Functions ======================== //

function insertLetter(pressedKey) {
  if (nextLetter === 5) {
    return;
  }

  pressedKey = pressedKey.toLowerCase();

  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = row.children[nextLetter];
  box.textContent = pressedKey;
  box.classList.add("filled-box");
  currentGuess.push(pressedKey);
  nextLetter += 1;
}

function deleteLetter() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = row.children[nextLetter - 1];
  box.textContent = "";
  box.classList.remove("filled-box");
  currentGuess.pop();
  nextLetter -= 1;
}
