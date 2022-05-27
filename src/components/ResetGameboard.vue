<template>
  <button @click="resetBoard" class="reset-button">Play Again</button>
</template>

<script setup>
import { defineEmits } from "vue";
import initBoard from "./modules/initializeBoard.js";

// Vars
const emit = defineEmits(["updateState"]);
const data = false;
let todaysDate = new Date().toDateString();

let storedGamesPlayed = parseInt(localStorage.getItem("gamesPlayed")) || 0;

const resetBoard = () => {
  // Need to remove all chidren of #gameBoard
  const el = document.getElementById("game-board");
  el.replaceChildren();

  // Update # of games played
  // Check if this is first time. If it is need to setItem()
  storedGamesPlayed = parseInt(localStorage.getItem("gamesPlayed"))
    ? parseInt(localStorage.getItem("gamesPlayed"))
    : 0;

  storedGamesPlayed += 1;
  localStorage.setItem("gamesPlayed", parseInt(storedGamesPlayed));
  if (storedGamesPlayed % 3 === 0) {
    localStorage.setItem("dateLastPlayed", todaysDate);
  }

  // Then redraw board
  initBoard(6);

  // Finally, emit event "updateState" that is listened for in parent GameBoard component
  emit("updateState", data);
};
</script>

<style scoped>
.reset-button {
  background: rgb(0, 128, 0);
  background: linear-gradient(
    93deg,
    rgba(0, 128, 0, 1) 9%,
    rgba(122, 190, 97, 0.7812128819278785) 92%
  );
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  flex-shrink: 0;
  font-family: "Inter UI", "SF Pro Display", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  font-size: 18px;
  font-weight: 600;
  height: 4rem;
  padding: 0 1.6rem;
  text-align: center;
  text-shadow: rgba(0, 0, 0, 0.25) 0 3px 8px;
  transition: all 0.5s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-bottom: 20px;
}

.reset-button:hover {
  box-shadow: rgba(106, 192, 114, 0.5) 0 1px 30px;
  transition-duration: 0.1s;
}

@media (min-width: 768px) {
  .reset-button {
    padding: 0 2.6rem;
  }
}
</style>
