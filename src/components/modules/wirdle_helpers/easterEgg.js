export default function easterEgg() {
  let buffer = [];
  let lastKeyTime = Date.now();

  const controlKeysArray = ["shift", "control", "alt"];

  // checks whether an element is in array
  const arrayCheck = (element) => controlKeysArray.includes(element);

  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();

    if (e.shiftKey) {
      console.log("With shift, do something...");
      buffer.push(key);
      console.log({ buffer });
      console.log(buffer.every(arrayCheck));

      return;
    }

    // we are only interested in alphanumeric keys
    /*     if (charList.indexOf(key) === -1) return;
     */
    const currentTime = Date.now();

    if (currentTime - lastKeyTime > 10000) {
      buffer = [];
    }

    buffer.push(key);
    lastKeyTime = currentTime;

    console.log({ buffer });
  });
}
