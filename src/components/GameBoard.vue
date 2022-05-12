<template>
  <div id="game-board"></div>

  <VirtualKeyboard></VirtualKeyboard>

  <ResetGameboard></ResetGameboard>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import initBoard from "@/components/modules/initializeBoard.js";
import { useKeystrokeHandler } from "./modules/wirdle_helpers/keystrokeHandler";
import VirtualKeyboard from "@/components/VirtualKeyboard.vue";
import ResetGameboard from "./ResetGameboard.vue";
import "@/assets/css/gameBoard.css";

// Initialize Board
onMounted(() => {
  // Initialize Vars
  const Number_Of_Guesses = 6;

  const wirtleState = reactive({
    guessesRemaining: Number_Of_Guesses,
    currentGuess: [],
    nextLetter: 0,
    pressedKey: "",
    found: "",
    newGame: false,
  });
  initBoard(6);
  useKeystrokeHandler(wirtleState, Number_Of_Guesses);
});
</script>

<style scoped>
div {
  font-family: var(--nanum);
}
</style>
