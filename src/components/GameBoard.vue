<template>
  <div id="game-board"></div>

  <VirtualKeyboard></VirtualKeyboard>

  <ResetGameboard @updateState="initVars"></ResetGameboard>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import initBoard from "@/components/modules/initializeBoard.js";
import { useKeystrokeHandler } from "./modules/wirdle_helpers/keystrokeHandler";
import VirtualKeyboard from "@/components/VirtualKeyboard.vue";
import ResetGameboard from "./ResetGameboard.vue";
import "@/assets/css/gameBoard.css";

// Initialize Vars
const Number_Of_Guesses = 6;
let wirtleState = reactive({});

// Function to intialize wirtleState object
const initVars = () => {
  wirtleState.guessesRemaining = Number_Of_Guesses;
  wirtleState.currentGuess = [];
  wirtleState.nextLetter = 0;
  wirtleState.pressedKey = "";
  wirtleState.found = "";
  wirtleState.newGame = false;
};

// Initialize Board
onMounted(() => {
  initBoard(6);
  initVars();
  useKeystrokeHandler(wirtleState, Number_Of_Guesses);
});
</script>

<style scoped>
div {
  font-family: var(--nanum);
}
</style>
