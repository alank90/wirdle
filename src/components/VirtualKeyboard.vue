<template>
  <div id="keyboard-cont" @click="clickHandler">
    <div class="row">
      <button class="keyboard-button">q</button
      ><button class="keyboard-button">w</button
      ><button class="keyboard-button thin-letter">e</button
      ><button class="keyboard-button">r</button
      ><button class="keyboard-button">t</button
      ><button class="keyboard-button">y</button
      ><button class="keyboard-button">u</button
      ><button class="keyboard-button thin-letter">i</button
      ><button class="keyboard-button">o</button
      ><button class="keyboard-button">p</button>
    </div>
    <div class="row">
      <button class="keyboard-button">a</button
      ><button class="keyboard-button">s</button
      ><button class="keyboard-button">d</button
      ><button class="keyboard-button">f</button
      ><button class="keyboard-button">g</button
      ><button class="keyboard-button">h</button
      ><button class="keyboard-button thin-letter">j</button
      ><button class="keyboard-button">k</button
      ><button class="keyboard-button">l</button>
    </div>
    <div class="row">
      <button class="keyboard-button">Enter</button
      ><button class="keyboard-button">z</button
      ><button class="keyboard-button">x</button
      ><button class="keyboard-button">c</button
      ><button class="keyboard-button">v</button
      ><button class="keyboard-button thin-letter">b</button
      ><button class="keyboard-button">n</button
      ><button class="keyboard-button">m</button
      ><button class="keyboard-button">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
          <path
            fill="#000"
            d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
/**
    * clickHandler - On-screen Keyboard Input Generator
    * Description - To get your on-screen keyboard functioning, all you have
          to do is dispatch a key up event whenever any key on your 
          on-screen keyboard is clicked.
    * @importedby { @/src/components/GameBoard.vue } - GameBoard.vue 
    * @param { object } e - the event object
    */
const clickHandler = (e) => {
  const target = e.target;

  if (!target.closest(".keyboard-button")) {
    return;
  }
  let key = target.textContent;

  if (!key) {
    key = "Backspace";
  }

  document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
};
</script>

<style scoped>
#keyboard-cont {
  height: auto;
  margin: 0 8px;
}

#keyboard-cont .row {
  display: flex;
  width: 100%;
  margin: 8px auto 8px;
  justify-content: center;
  touch-action: manipulation;
}

.keyboard-button {
  text-align: center;
  border: 1px solid black;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.6rem;
  margin: 0 6px 0 0;
  cursor: pointer;
  border-radius: 4px;
  text-transform: uppercase;
  user-select: none;
}
.keyboard-button:last-of-type {
  margin: 0;
}

.thin-letter {
  flex: 0 0 40px; /* This enlarges small letters on VK ie, I,G etc */
}
</style>
