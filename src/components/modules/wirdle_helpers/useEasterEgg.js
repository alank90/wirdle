import toastr from "toastr";
import { WORDS } from "@/components/modules/words.js";

/**
 * useEasterEgg - Function for adding extra turns for playing wirdle
 * @importedby { @/components/GameBoard.vue } GameBoard.vue component
 * @export
 * @param { object } wirtleState - Keeps track of certain App state values
 * @param { string } rightGuessString
 * @param { integer } Number_Of_Guesses
 * @return { undefined }
 */

export default function useEasterEgg(
  wirtleState,
  rightGuessString,
  Number_Of_Guesses
) {
  // Vars
  let buffer = [];
  const data = false;
  const controlKeysArray = ["shift", "control", "alt", "@"];

  // toastr config options
  toastr.options.closeButton = true;
  toastr.options.closeMethod = "fadeOut";
  toastr.options.closeDuration = 350;
  toastr.options.closeEasing = "swing";
  toastr.options.showMethod = "slideDown";
  toastr.options.preventDuplicates = true;
  toastr.options.progressBar = true;

  // checks whether an element is in array
  const arrayCheck = (element) => buffer.includes(element);

  document.addEventListener("keydown", function easterEgg(e) {
    const key = e.key.toLowerCase();

    // We are only interested in Easter egg keys
    if (controlKeysArray.includes(key)) {
      buffer.push(key);
    }

    if (controlKeysArray.every(arrayCheck)) {
      localStorage.setItem("gamesPlayed", 2);

      // ========= Reinitialize Gameboard.vue Vue state ============== //
      rightGuessString.value = WORDS[Math.floor(Math.random() * WORDS.length)];
      wirtleState.guessesRemaining = Number_Of_Guesses;
      wirtleState.currentGuess = [];
      wirtleState.nextLetter = 0;
      wirtleState.pressedKey = "";
      wirtleState.found = "";
      wirtleState.newGame = data;
      wirtleState.usedEasterEgg = true;

      const buttonElems = document.getElementsByClassName("keyboard-button");
      const color = "#d3d6da";

      for (const el of buttonElems) {
        el.style.backgroundColor = color;
      }

      toastr.success(
        "Congratulations!!! You found the Easter egg. You get a bonus game."
      );
      buffer = [];

      document.removeEventListener("keydown", easterEgg);

      return;
    }
  });
}
