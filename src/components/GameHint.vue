<template>
  <div v-if="showHint" class="dialog-box" ref="dialogBox">
    <p>Would you like a hint?</p>
    <button @click="hint">Yes</button
    ><button @click="showHint = false">No</button>
  </div>
</template>

<script setup>
import toastr from "toastr";
import { ref, watch } from "vue";

const props = defineProps({
  propRightGuessString: String,
  propGuessesRemaining: Number,
});
let showHint = ref(false);

// This watcher will display hint button
watch(
  () => props.propGuessesRemaining,
  () => {
    if (props.propGuessesRemaining < 3) {
      showHint.value = true;
    }
  }
);

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

  // Dissolve hint dialog
  showHint.value = false;
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

    if (
      rowLetters[index + 1].innerHTML.toUpperCase() !==
      wirdleLetter.toUpperCase()
    ) {
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
/* CSS */
.dialog-box {
  position: absolute;
  opacity: 0.8;
  width: 250px;
  height: 100px;
  font-weight: 700;
  background-color: aliceblue;
  transition: opacity 0.5s;
  /* Position div in center */
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.dialog-box:hover {
  opacity: 0.9;
}

p {
  margin-top: 8px;
}

button {
  background-image: linear-gradient(#0dccea, #58aac2);
  border: 0;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 5px 15px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: Montserrat, sans-serif;
  font-size: 0.9em;
  margin: 5px;
  padding: 10px 15px;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
</style>
