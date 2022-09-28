<template>
  <Transition>
    <GameHint
      v-if="showHint"
      :propRightGuessString="rightGuessString"
      :propGuessesRemaining="wirdleState.guessesRemaining"
    />
  </Transition>

  <InitializeBoard :key="forceReRender" />

  <VirtualKeyboard></VirtualKeyboard>

  <ResetGameboard
    v-show="wirdleState.newGame && !wirdleState.usedEasterEgg"
    @updateState="initVars"
  ></ResetGameboard>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { WORDS } from "@/components/modules/words.js";
import InitializeBoard from "@/components/InitializeBoard.vue";
import { useKeystrokeHandler } from "./modules/wirdle_helpers/keystrokeHandler";
import VirtualKeyboard from "@/components/VirtualKeyboard.vue";
import ResetGameboard from "./ResetGameboard.vue";
import GameHint from "./GameHint.vue";
import toastr from "toastr";
import "@/assets/css/gameBoard.css";
import useEasterEgg from "@/components/modules/wirdle_helpers/useEasterEgg.js";

// Initialize Vars
const Number_Of_Guesses = 6;
let wirdleState = reactive({});
let rightGuessString = ref("");
let todaysDate = new Date().toDateString();
let forceReRender = ref(0);
let showHint = ref(false);

// This watcher will display hint button
watch(
  () => wirdleState.guessesRemaining,
  () => {
    if (wirdleState.guessesRemaining < 5) {
      showHint.value = true;
    }
  }
);

/**
 * Function to intialize wirdleState object & revert VK background colors to grey
 * @param {boolean} data - Holds state of whether new game has begun
 *
 * @returns {undefined}
 */

const initVars = (data) => {
  // Vars
  const turns = localStorage.getItem("gamesPlayed");
  const lastPlayed = localStorage.getItem("dateLastPlayed");

  if (turns >= 3 && lastPlayed === todaysDate) {
    wirdleState.newGame = false;
    localStorage.setItem("dateLastPlayed", todaysDate);
    if (!wirdleState.usedEasterEgg) {
      useEasterEgg(wirdleState, rightGuessString, Number_Of_Guesses);
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
  wirdleState.guessesRemaining = Number_Of_Guesses;
  wirdleState.currentGuess = [];
  wirdleState.nextLetter = 0;
  wirdleState.pressedKey = "";
  wirdleState.found = "";
  wirdleState.newGame = data;
  wirdleState.usedEasterEgg = false;
  localStorage.setItem("todays_word", rightGuessString.value);

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
  useKeystrokeHandler(wirdleState, rightGuessString);
});
</script>

<style scoped>
div {
  font-family: var(--nanum);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
