import toastr from "toastr";
import { WORDS } from "@/components/modules/words.js";

export default function useEasterEgg(
  wirtleState,
  rightGuessString,
  Number_Of_Guesses
) {
  // Vars
  let buffer = [];
  const data = false;
  const controlKeysArray = ["shift", "control", "alt", "escape"];

  // checks whether an element is in array
  const arrayCheck = (element) => buffer.includes(element);

  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();

    console.log(key);
    // We are only interested in Easter egg keys
    if (controlKeysArray.includes(key)) {
      buffer.push(key);
    }

    if (controlKeysArray.every(arrayCheck)) {
      console.log({ buffer });
      console.log("shift,alt ctrl,esc are all in buffer array");
      localStorage.setItem("gamesPlayed", 2);

      // ========= Reinitialize Gameboard.vue state ============== //
      rightGuessString.value = WORDS[Math.floor(Math.random() * WORDS.length)];
      wirtleState.guessesRemaining = Number_Of_Guesses;
      wirtleState.currentGuess = [];
      wirtleState.nextLetter = 0;
      wirtleState.pressedKey = "";
      wirtleState.found = "";
      wirtleState.newGame = data;

      const buttonElems = document.getElementsByClassName("keyboard-button");
      const color = "#d3d6da";

      for (const el of buttonElems) {
        el.style.backgroundColor = color;
      }

      toastr.success(
        "Congratulations!!! You found the Easter egg. You get a bonus game."
      );
      buffer = [];

      return;
    }
  });
}
