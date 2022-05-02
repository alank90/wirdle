import { WORDS } from "@/components/modules/words.js";
const Number_Of_Guesses = 6;
let guessesRemaining = Number_Of_Guesses;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(rightGuessString);

export default function () {
  document.addEventListener("keyup", (e) => {
    if (guessesRemaining === 0) {
      return;
    }

    let pressedKey = String(e.key);
    console.log(pressedKey);
    if (pressedKey === "Backspace" && nextLetter !== 0) {
      deleteLetter();
      return;
    }

    if (pressedKey === "Enter") {
      checkGuess();
      return;
    }

    let found = pressedKey.match(/[a-z]/gi);
    if (!found || found.length > 1) {
      return;
    } else {
      insertLetter(pressedKey);
    }
  });

  // ========== Functions ======================== //

  function insertLetter(pressedKey) {
    if (nextLetter === 5) {
      return;
    }

    pressedKey = pressedKey.toLowercase();
  }
}
