<template>
  <div class="container">
    <img alt="Wirdle logo" src="../assets/img/wirdle.jpeg" />

    <h1>
      Wirdle -
      <span class="typed-text">{{ typeValue }}</span>
      <span class="blinking-cursor">|</span>
      <span class="cursor" :class="{ typing: typeStatus }">&nbsp;</span>
    </h1>
  </div>
  <GameBoard></GameBoard>
</template>

<script setup>
import { ref, onMounted } from "vue";
import GameBoard from "@/components/GameBoard.vue";

// Vars
let typeValue = ref("");
let typeStatus = false;
let displayTextArray = [
  "Play and Exercise Your Mind",
  "Guess the Wirdle in Six Tries",
  "Hit Enter to Submit Guess",
  "After each guess, the color of the tiles will change to show how close your guess was to the word.",
];
const typingSpeed = 100;
const erasingSpeed = 100;
const newTextDelay = 2000;
let displayTextArrayIndex = 0;
let charIndex = 0;

onMounted(() => {
  setTimeout(typeText, newTextDelay + 200);
});

// Methods
const typeText = () => {
  if (charIndex < displayTextArray[displayTextArrayIndex].length) {
    if (!typeStatus) typeStatus = true;
    typeValue.value +=
      displayTextArray[displayTextArrayIndex].charAt(charIndex);
    charIndex += 1;
    setTimeout(typeText, typingSpeed);
  } else {
    typeStatus = false;
    setTimeout(eraseText, newTextDelay);
  }
};

const eraseText = () => {
  if (charIndex > 0) {
    if (!typeStatus) typeStatus = true;
    typeValue.value = displayTextArray[displayTextArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex -= 1;
    setTimeout(eraseText, erasingSpeed);
  } else {
    typeStatus = false;
    displayTextArrayIndex += 1;
    if (displayTextArrayIndex >= displayTextArray.length)
      displayTextArrayIndex = 0;
    setTimeout(typeText, typingSpeed + 1000);
  }
};
</script>

<style scoped>
h1 {
  font-family: var(--playfair);
  font-size: 1.8em;
}

img[alt="Wirdle logo"] {
  width:100px;
  margin: 0 5px 2px;
}

/* ============= Typewriter effects stylings ============ */
.container {
  width: auto;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 span.typed-text {
  color: #1a9714;
}
.blinking-cursor {
  font-size: 2.5rem;
  color: #2c3e50;
  -webkit-animation: 1s blink step-end infinite;
  -moz-animation: 1s blink step-end infinite;
  -ms-animation: 1s blink step-end infinite;
  -o-animation: 1s blink step-end infinite;
  animation: 1s blink step-end infinite;
}
@keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: #2c3e50;
  }
}
@-moz-keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: #2c3e50;
  }
}
@-webkit-keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: #2c3e50;
  }
}
@-ms-keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: #2c3e50;
  }
}
@-o-keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: #2c3e50;
  }
}
</style>
