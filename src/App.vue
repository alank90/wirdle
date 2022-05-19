<template>
  <img alt="Wirdle logo" src="./assets/img/wirdle.jpeg" />
  <Home />
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
  position: absolute;
  width: 550px;
  margin: 0 auto;
  top: 300px;
  left: 0;
  right: 0;
  animation: 5s slidein;
  transform: translateY(-1200px);
  z-index: -99;
}

/* Keyframes */
@keyframes slidein {
  from {
    transform: translateY(-1200px);
  }

  50% {
    transform: translateY(300px);
  }

  to {
    transform: translateY(-1200px);
  }
}
</style>
