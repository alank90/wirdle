<template>
  <h1>Wirtle - {{ props.msg }}</h1>
  <GameBoard></GameBoard>
</template>

<script setup>
import { defineProps } from "vue";
import GameBoard from "@/components/GameBoard.vue";

const props = defineProps({
  msg: String,
});
</script>

<style scoped>
h1 {
  font-family: var(--playfair);
  font-size: 1.8em;
}
</style>
