export default function initBoard(Initial_Number_Of_Guesses) {
  let board = document.getElementById("game-board");
  
  for (let i = 0; i < Initial_Number_Of_Guesses; i++) {
    let row = document.createElement("div");
    row.className = "letter-row";

    for (let j = 0; j < 5; j++) {
      let box = document.createElement("div");
      box.className = "letter-box";
      row.appendChild(box);
    }

    board.appendChild(row);
  }
}
