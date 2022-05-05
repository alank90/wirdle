export default function shadeKeyBoard(letter, color) {
  const buttonElems = document.getElementsByClassName("keyboard-button");
  /* const alphabet = [...Array(26)].map((_x, i) => String.fromCharCode(i + 97));
  console.table(alphabet); */

  for (const el of buttonElems) {
    if (el.textContent === letter) {
      let oldColor = el.style.backgroundColor;
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
