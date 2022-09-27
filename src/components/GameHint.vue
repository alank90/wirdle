<template>
  <button @click="hint">Hint</button>
</template>

<script setup>
import toastr from "toastr";

const props = defineProps({
  propRightGuessString: String,
  propGuessesRemaining: Number,
});

/**
 * hint - Function to generate a wordle hint on click
 * Description -To get a hint as to wirdle, this function
 * will use value of propGuessesRemaining to determine which row
 * to check letters in and generate a hint
 * @importedby { @/src/components/GameBoard.vue } - GameBoard.vue
 * @param {} None
 * @returns {undefined}
 */
function hint() {
  // Vars
  let gameBoard = null;
  let gameBoardChildren = null;
  let currentRow = null;
  let rowLetters = null;
  let wirdleLetter = "";
  let index = null;
  let lastBoardRowIndex = null;
  let checkHint = true;
  let i = 0;
  // generate a random number 0-4
  index = randomNumber();

  // Grab a random letter from the wirdle for the hint
  wirdleLetter = props.propRightGuessString[index];

  // Get the last GameBoard row from the DOM
  lastBoardRowIndex = -props.propGuessesRemaining + 6;
  gameBoard = document.querySelector("#game-board");
  gameBoardChildren = gameBoard.childNodes;
  currentRow = gameBoardChildren[lastBoardRowIndex];
  rowLetters = currentRow.childNodes;

  while (checkHint) {
    // In this while loop we will check the letter in the last guessed
    // word pointed to by index and its coresponding letter in the wirdle.
    // If the two don't match then we can generate a hint using the current
    // index value. If the two letters match then we know that letter already
    // and we want to check another position. Thus the else block will get a new
    // random index and start again with a new wirdle letter. Loop continues until
    // if condition is met or we reach 10 tries.

    console.log(`Loop ======> ${i}`);
    console.log(`The letter position we are checking is ${index + 1}`);
    console.log(
      `The guessed Letter is: ${rowLetters[index + 1].innerHTML.toUpperCase()}`
    );
    console.log(`The wirdle letter is ${wirdleLetter.toUpperCase()}`);

    if (
      rowLetters[index + 1].innerHTML.toUpperCase() !==
      wirdleLetter.toUpperCase()
    ) {
      console.log(
        `The hint is: the letter ${wirdleLetter.toUpperCase()} is in position ${
          index + 1
        }`
      );
      // Reveal a hint
      toastr["info"](
        `The letter ${wirdleLetter.toUpperCase()} is in position ${index + 1}`,
        "Hint:",
        {
          timeOut: 10000,
          positionClass: "toast-top-center",
          preventDuplicates: true,
        }
      );
      checkHint = false; // break while loop
    } else {
      // if we already have correct position of current letter
      // let's get another wirdle letter and check it's status
      index = randomNumber();
      wirdleLetter = props.propRightGuessString[index];
      i++;
      // Safety valve. If we checked more then 10 times
      // something I think went wrong.
      if (i > 10) {
        toastr["Attention"]("Sorry, No hints available.", "Message");
        checkHint = false;
      }
    }
  }
}

/**
 * Description - Simple random number generator for numbers 0-4
 *
 */
function randomNumber() {
  return Math.floor(Math.random() * 4);
}
</script>

<style scoped>
button {
  font-size: 24px;
  font-weight: 600;
}
</style>
