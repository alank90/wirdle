<template>
  <button @click="hint">Hint</button>
</template>

<script setup>
const props = defineProps({
  propRightGuessString: String,
  propGuessesRemaning: Number,
});

function hint() {
  console.log(props.propGuessesRemaining);
}
</script>

<style scoped>
button {
  font-size: 24px;
  font-weight: 600;
}
</style>
