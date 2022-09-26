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
  let checkHint = true;
  let i = 0;
  // generate a random number 0-4
  index = randomNumber();

  // Grab a random letter from the wirdle for the hint
  wirdleLetter = props.propRightGuessString[index - 1];

  // Get the last GameBoard row from the DOM
  lastBoardRowIndex = -props.propGuessesRemaining + 6;
  gameBoard = document.querySelector("#game-board");
  gameBoardChildren = gameBoard.childNodes;
  currentRow = gameBoardChildren[lastBoardRowIndex];
  rowLetters = currentRow.childNodes;
  console.log(rowLetters[1].innerHTML);

  while (checkHint) {
    // In this loop we will check the css background color
    // to see if it is green. If it is not we will print out
    // the hint. If it is green we will get another letter from
    // last guess(rowLetters) and check it and so on...
    console.log(`Loop ======> ${i}`);
    console.log(`The random index number is ${index}`);
    console.log(
      `The guessed Letter is: ${rowLetters[index].innerHTML.toUpperCase()}`
    );
    console.log(`The wirdle letter is ${wirdleLetter.toUpperCase()}`);

    // rowLetters[index] should be a ternary rowletters[index ? index : 1] if zero
    // make index 1 because rowLetters is a nodeList which is not zero-based
    if (
      rowLetters[index].innerHTML.toUpperCase() !== wirdleLetter.toUpperCase()
    ) {
      console.log(
        `The hint letter ${rowLetters[index].innerHTML} is in position ${index}`
      );
      checkHint = false; // break while loop
      console.log(`Breaking out of loop checkHint is ${checkHint}`);
    } else {
      // if we already have correct position of current letter
      // let's get another wirdle letter and check it's status
      index = randomNumber();
      wirdleLetter = props.propRightGuessString[index - 1];
      console.log(`New wirdle letter ${wirdleLetter} & position ${index}`);
      i++;
      // Safety valve. If we checked more then 10 times
      // something I think went wrong.
      if (i > 10) {
        checkHint = false;
      }
    }
  }

  console.log("OK out of loop..");
}

/**
 * Description - Simple random number generator for numbers 0-4
 *
 */
function randomNumber() {
  return Math.floor(Math.random() * props.propRightGuessString.length);
}
</script>

<style scoped>
button {
  font-size: 24px;
  font-weight: 600;
}
</style>
