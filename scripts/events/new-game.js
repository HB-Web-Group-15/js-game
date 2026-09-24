import { startNewGame } from "../util/sudoku.js";

/** @type {HTMLButtonElement}*/
const newGameBtn = document.getElementById("new-game-btn");

newGameBtn.addEventListener("click", function(){
    const difficulty = document.getElementById("difficulty-select").value;
    startNewGame(difficulty);
})