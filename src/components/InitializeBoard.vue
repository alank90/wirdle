<template>
  <div id="game-board">
    <div v-for="n in Initial_Number_Of_Guesses" class="letter-row" :key="n">
      <div v-for="m in 5" class="letter-box" :key="m"></div>
    </div>
  </div>
</template>

<script setup>
/**
 * intializeBoard - Vue component
 * Creates the original Wirtle board in the DOM
 *
 *
 * @ref { integer } Initial_Number_Of_Guesses - set to 6
 * @importedby { @/components/modules/ } - Gameboard.vue, ResetGameboard.vue
 * @exports { initBoard function }
 */
import { ref } from "vue";
const Initial_Number_Of_Guesses = ref(6);
</script>
<!-- export default function initBoard(Initial_Number_Of_Guesses) {
  let board = document.getElementById("game-board");

  for (let i = 0; i < Initial_Number_Of_Guesses; i++) {
    let row = document.createElement("div");
    row.className = "letter-row";

    for (let j = 0; j < 5; j++) {
      let box = document.createElement("div");
      box.className = "letter-box";
      row.appendChild(box);
    }

    board.appendChild(row);
  }
} -->
