<template>
  <button @click="hint">Hint</button>
</template>

<script setup>
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
  // generate a random number 0-4
  index = Math.floor(Math.random() * props.propRightGuessString.length);

  // Grab a random letter from the wirdle for the hint
  wirdleLetter = props.propRightGuessString[index];

  // Get the last GameBoard row from the DOM
  lastBoardRowIndex = -props.propGuessesRemaining + 6;
  gameBoard = document.querySelector("#game-board");
  gameBoardChildren = gameBoard.childNodes;
  currentRow = gameBoardChildren[lastBoardRowIndex];
  rowLetters = currentRow.childNodes;
  console.log(wirdleLetter);

  // Loop thru Row letters
  rowLetters.forEach(function (letter, index) {
    console.log(letter.innerHTML);
    if (letter.innerHTML === wirdleLetter) {
      console.log(`This letter is in wirdle ${letter.innerHTML}`);
    }
  });
}
</script>

<style scoped>
button {
  font-size: 24px;
  font-weight: 600;
}
</style>
