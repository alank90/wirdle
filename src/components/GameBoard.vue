<template>
  <div id="game-board"></div>

  <VirtualKeyboard></VirtualKeyboard>

  <ResetGameboard></ResetGameboard>
</template>

<script setup>
import { onMounted } from "vue";
import initBoard from "@/components/modules/initializeBoard.js";
import VirtualKeyboard from "@/components/VirtualKeyboard.vue";
import { useKeystrokeHandler } from "@/components/modules/wirdle_helpers/keystrokeHandler.js";
import ResetGameboard from "./ResetGameboard.vue";
import "@/assets/css/gameBoard.css";

// Initialize Board
onMounted(() => {
  initBoard(6);
  document.addEventListener("keyup", useKeystrokeHandler);
});
</script>

<style scoped>
div {
  font-family: var(--nanum);
}
</style>
