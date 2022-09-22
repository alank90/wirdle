<template>
  <div id="game-board">
    <div v-for="n in Initial_Number_Of_Guesses" class="letter-row" :key="n">
      <div v-for="m in 5" class="letter-box" :key="m"></div>
    </div>
  </div>
</template>

<script setup>
/**
 * intializeBoard - Vue component
 * Creates the original Wirdle board in the DOM
 *
 *
 * @ref { integer } Initial_Number_Of_Guesses - set to 6
 * @importedby { @/components/modules/ } - Gameboard.vue, ResetGameboard.vue
 * @exports { initBoard function }
 */
import { ref } from "vue";
const Initial_Number_Of_Guesses = ref(6);
</script>

