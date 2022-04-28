<template>
  <div id="game-board">GameBoard here.</div>
</template>

<script setup>
import { onMounted } from "vue";
import { WORDS } from "@/components/modules/words.js";
import init from "@/components/modules/initializeBoard.js";

const Number_Of_Guesses = 6;
let guessesRemaining = Number_Of_Guesses;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.randow() * WORDS.length)];
console.log(rightGuessString);

// Initialize Board
onMounted(() => {
  init(6);
});
</script>

<style scoped>
#game-board {
  margin-top: 40px;
}

div {
  font-family: var(--nanum);
}
</style>
