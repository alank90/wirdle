<template>
  <button @click="resetBoard" class="reset">Play Again</button>
</template>

<script setup>
import { reactive } from "vue";
import initBoard from "./modules/initializeBoard.js";
import { useKeystrokeHandler } from "./modules/wirdle_helpers/keystrokeHandler.js";

const resetBoard = () => {
  console.log("stop clicking me!");
  // Initialize Vars
  const Number_Of_Guesses = 6;

  const wirtleState = reactive({
    guessesRemaining: Number_Of_Guesses,
    currentGuess: [],
    nextLetter: 0,
    pressedKey: "",
    found: "",
    newGame: true,
  });
  // Need to remove all chidren of #gameBoard
  const el = document.getElementById("game-board");
  el.replaceChildren();

  // Then redraw board and pass initialized state back for
  // handleKeystroke() callback function in keystrokeHandler()
  initBoard(6);
  // Need this to return wirtleState to keyStrokeHandler
  // Make wirtleState a global reactive and prop it down...
  useKeystrokeHandler(wirtleState);
};
</script>
