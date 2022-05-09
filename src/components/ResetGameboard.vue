<template>
  <button @click="resetBoard" class="reset">Play Again</button>
</template>

<script setup>
import initBoard from "./modules/initializeBoard.js";

const resetBoard = () => {
  console.log("stop clicking me!");
  // Need to remove all chidren of #gameBoard
  // *** Code here ****

  // Then redraw board
  initBoard(6);
};
</script>
