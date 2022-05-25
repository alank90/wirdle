import { defineEmits } from "vue";
import toastr from "toastr";

export default function easterEgg() {
  // Vars
  let buffer = [];
  let lastKeyTime = Date.now();
  const emit = defineEmits(["updateState"]);
  const data = false;
  const controlKeysArray = ["shift", "control", "alt", "w"];

  // checks whether an element is in array
  const arrayCheck = (element) => buffer.includes(element);
  emit("updateState", data);

  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    
    console.log(key);
    // We are only interested in Easter egg keys
    if (controlKeysArray.includes(key)) {
      buffer.push(key);
    }

    if (controlKeysArray.every(arrayCheck)) {
      console.log({ buffer });
      console.log("shift,alt ctrl,w are all in buffer array");
      localStorage.setItem("gamesPlayed", 2);
      // Finally, emit event "updateState" that is listened for in parent GameBoard component
      toastr.success(
        "Congratulations!!! You found the Easter egg. You get a bonus game."
      );
      buffer = [];

      return;
    }

   // const currentTime = Date.now();

    /* if (currentTime - lastKeyTime > 10000) {
      buffer = [];
    }
 */
    //buffer.push(key);
    //lastKeyTime = currentTime;
  });
}
