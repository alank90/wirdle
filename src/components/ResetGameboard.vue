<template>
  <button @click="resetBoard" class="reset">Play Again</button>
</template>

<script setup>
import initBoard from "./modules/initializeBoard.js";
import { useKeystrokeHandler } from "./modules/wirdle_helpers/keystrokeHandler.js";

const resetBoard = () => {
  console.log("stop clicking me!");
  // Need to remove all chidren of #gameBoard
  const el = document.getElementById("game-board");
  el.replaceChildren();

  // Then redraw board
  initBoard(6);
  useKeystrokeHandler();
};
</script>
