<template>
  <Transition>
    <h1 class="main-title" v-show="!typeWriterEffectVisible">
      <img
        v-show="!typeWriterEffectVisible"
        alt="Wirdle logo"
        src="../assets/img/wirdle.jpeg"
      />
      Wirdle
    </h1>
  </Transition>
  <div class="container">
    <Transition name="fade">
      <h1 v-show="typeWriterEffectVisible">
        <img
          v-show="typeWriterEffectVisible"
          alt="Wirdle logo"
          src="../assets/img/wirdle.jpeg"
        />
        Wirdle -
        <span class="typed-text">{{ typeValue }}</span>
        <span class="blinking-cursor">|</span>
        <span class="cursor" :class="{ typing: typeStatus }">&nbsp;</span>
      </h1>
    </Transition>
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
let typeWriterEffectVisible = ref(true);
let typeWriterEffectRunning = true;

onMounted(() => {
  setTimeout(typeText, newTextDelay + 200);
  resetGamesPlayed();

  // Add event listener to toggle type writer effect
  document.addEventListener(
    "keydown",
    () => {
      typeWriterEffectRunning = false;
      typeWriterEffectVisible.value = false;
    },
    { once: true }
  );
});

// Methods
const typeText = () => {
  if (typeWriterEffectRunning) {
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
  }
};

const eraseText = () => {
  if (typeWriterEffectRunning) {
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
  }
};

const resetGamesPlayed = () => {
  let todaysDate = new Date().toDateString();
  todaysDate = new Date(todaysDate);
  todaysDate = todaysDate.getTime(todaysDate);

  let storedDate = localStorage.getItem("dateLastPlayed");
  storedDate = new Date(storedDate);
  storedDate = storedDate.getTime(storedDate);

  if (todaysDate > storedDate) {
    localStorage.setItem("dateLastPlayed", new Date(todaysDate).toDateString());
    localStorage.setItem("gamesPlayed", 0);
  }
};
</script>

<style scoped>
h1 {
  font-family: var(--playfair);
  font-size: 1.8em;
}

h1.main-title {
  font-family: var(--playfair);
  font-size: 2.8em;
  border-bottom: #2c3e50 solid 1.5px;
  margin-top: -50px;
  margin-bottom: 20px;
}

img[alt="Wirdle logo"] {
  width: 100px;
  margin: 0 5px -20px 2px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ============= Typewriter effects stylings ============ */
.container {
  width: auto;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

span.typed-text {
  color: #1a9714;
  font-family: var(--playfair);
}

.blinking-cursor {
  font-size: 1.5rem;
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
