<template>
  <h1>Wirtle - {{ props.msg }}</h1>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  msg: String,
});
</script>

<style scoped>
h1 {
  font-size: 1.8em;
}
</style>
