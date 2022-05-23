<template>
  <div id="game-board"></div>

  <VirtualKeyboard></VirtualKeyboard>

  <ResetGameboard
    v-show="wirtleState.newGame"
    @updateState="initVars"
  ></ResetGameboard>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { WORDS } from "@/components/modules/words.js";
import initBoard from "@/components/modules/initializeBoard.js";
import { useKeystrokeHandler } from "./modules/wirdle_helpers/keystrokeHandler";
import VirtualKeyboard from "@/components/VirtualKeyboard.vue";
import ResetGameboard from "./ResetGameboard.vue";
import toastr from "toastr";
import "@/assets/css/gameBoard.css";

// Initialize Vars
const Number_Of_Guesses = 6;
let wirtleState = reactive({});
let rightGuessString = ref("");
let todaysDate = new Date().toDateString();

// Function to intialize wirtleState object & revert VK background colors to grey
const initVars = (data) => {
  const turns = localStorage.getItem("gamesPlayed");
  const lastPlayed = localStorage.getItem("dateLastPlayed");

  if (turns % 3 === 0 && lastPlayed === todaysDate) {
    wirtleState.newGame = false;
    localStorage.setItem("dateLastPlayed", todaysDate);
    toastr.error(
      "You've reached your daily limit for wirdle. Come back tomorrow!"
    );

    return;
  }
  rightGuessString.value = WORDS[Math.floor(Math.random() * WORDS.length)];
  wirtleState.guessesRemaining = Number_Of_Guesses;
  wirtleState.currentGuess = [];
  wirtleState.nextLetter = 0;
  wirtleState.pressedKey = "";
  wirtleState.found = "";
  wirtleState.newGame = data;

  const buttonElems = document.getElementsByClassName("keyboard-button");
  const color = "#d3d6da";

  for (const el of buttonElems) {
    el.style.backgroundColor = color;
  }
};

// Initialize Board
onMounted(() => {
  initBoard(6);
  initVars(false);
  useKeystrokeHandler(wirtleState, rightGuessString);
});
</script>

<style scoped>
div {
  font-family: var(--nanum);
}
</style>
