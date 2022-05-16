<template>
  <button @click="resetBoard" class="reset">Play Again</button>
</template>

<script setup>
import { defineEmits } from "vue";
import initBoard from "./modules/initializeBoard.js";

const emit = defineEmits(["updateState"]);

const resetBoard = () => {
  // Need to remove all chidren of #gameBoard
  const el = document.getElementById("game-board");
  el.replaceChildren();

  // Then redraw board
  initBoard(6);

  // Finally, emit event "updateState" that is listened for in parent GameBoard component
  emit("updateState");
};
</script>
