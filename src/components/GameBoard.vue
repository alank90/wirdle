<template>
  <InitializeBoard :key="forceReRender"></InitializeBoard>

  <VirtualKeyboard></VirtualKeyboard>

  <ResetGameboard
    v-show="wirtleState.newGame && !wirtleState.usedEasterEgg"
    @updateState="initVars"
  ></ResetGameboard>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { WORDS } from "@/components/modules/words.js";
import InitializeBoard from "@/components/InitializeBoard.vue";
import { useKeystrokeHandler } from "./modules/wirdle_helpers/keystrokeHandler";
import VirtualKeyboard from "@/components/VirtualKeyboard.vue";
import ResetGameboard from "./ResetGameboard.vue";
import toastr from "toastr";
import "@/assets/css/gameBoard.css";
import useEasterEgg from "@/components/modules/wirdle_helpers/useEasterEgg.js";

// Initialize Vars
const Number_Of_Guesses = 6;
let wirtleState = reactive({});
let rightGuessString = ref("");
let todaysDate = new Date().toDateString();
let forceReRender = ref(0);

/**
 * Function to intialize wirtleState object & revert VK background colors to grey
 * @param {boolean} data - Holds state of whether new game has begun
 *
 * @returns {undefined}
 */

const initVars = (data) => {
  // Vars
  const turns = localStorage.getItem("gamesPlayed");
  const lastPlayed = localStorage.getItem("dateLastPlayed");

  if (turns >= 3 && lastPlayed === todaysDate) {
    wirtleState.newGame = false;
    localStorage.setItem("dateLastPlayed", todaysDate);
    if (!wirtleState.usedEasterEgg) {
      useEasterEgg(wirtleState, rightGuessString, Number_Of_Guesses);
    }
    toastr.error(
      "You've reached your daily limit for wirdle. Come back tomorrow!"
    );

    // Force <InitializeBoard> to rerender
    forceReRender.value += 1;

    return;
  }
  
  // Executes if we haven't exceeded our # of turns for the day
  rightGuessString.value = WORDS[Math.floor(Math.random() * WORDS.length)];
  wirtleState.guessesRemaining = Number_Of_Guesses;
  wirtleState.currentGuess = [];
  wirtleState.nextLetter = 0;
  wirtleState.pressedKey = "";
  wirtleState.found = "";
  wirtleState.newGame = data;
  wirtleState.usedEasterEgg = false;

  const buttonElems = document.getElementsByClassName("keyboard-button");
  const color = "#d3d6da";

  for (const el of buttonElems) {
    el.style.backgroundColor = color;
  }

  // Force <InitializeBoard> to rerender
  forceReRender.value += 1;
};

// Initialize Board
onMounted(() => {
  initVars(false);
  useKeystrokeHandler(wirtleState, rightGuessString);
});
</script>

<style scoped>
div {
  font-family: var(--nanum);
}
</style>
