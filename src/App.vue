<template>
  <img alt="Wirdle logo" src="./assets/img/wirdle.jpeg" />
  <Home msg="A Wordle clone" />
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Home from "./views/Home.vue";
import "./assets/css/main.css";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img[alt="Wirdle logo"] {
  width: 450px;
  margin-bottom: 30px;
  margin-top: -30px;
}
</style>
