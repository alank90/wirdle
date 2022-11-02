export default function shadeKeyBoard(letter, color) {
  const buttonElems = document.getElementsByClassName("keyboard-button");

  for (const el of buttonElems) {
    if (el.textContent === letter) {
      const oldColor = el.style.backgroundColor;
      if (oldColor === "green") {
        return;
      }

      if (oldColor === "yellow" && color !== "green") {
        return;
      }

      el.style.backgroundColor = color;
      break;
    }
  }
}
