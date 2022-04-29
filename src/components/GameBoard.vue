<template>
  <div id="game-board"></div>

  <KeyboardLayout></KeyboardLayout>
</template>

<script setup>
import { onMounted } from "vue";
import { WORDS } from "@/components/modules/words.js";
import init from "@/components/modules/initializeBoard.js";
import KeyboardLayout from "@/components/KeyboardLayout.vue";
import keystrokeHandler from "@/components/modules/keystrokeHandler.js";
import "@/assets/css/gameBoard.css";

const Number_Of_Guesses = 6;
let guessesRemaining = Number_Of_Guesses;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(rightGuessString);

// Initialize Board
onMounted(() => {
  init(6);
  keystrokeHandler();
});
</script>

<style scoped>
div {
  font-family: var(--nanum);
}
</style>
