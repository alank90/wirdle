<template>
  <div id="game-board"></div>

  <KeyboardLayout></KeyboardLayout>
</template>

<script setup>
import { onMounted } from "vue";
import init from "@/components/modules/initializeBoard.js";
import KeyboardLayout from "@/components/KeyboardLayout.vue";
import keystrokeHandler from "@/components/modules/wirdle_helpers/keystrokeHandler.js";
import "@/assets/css/gameBoard.css";


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
