import gameState from "../model/game-state.js";
import { getCell } from "./sudoku-cells.js";
import { loadSettings } from "./settings.js";

export function updateMistakeFeedback(){
    const {board, solution} = gameState.getState();
    if(!board || !solution) return;

    const {incorrectCells: checkMode} = loadSettings();

    let incorrectCount = 0;
    for(let row = 0; row < 9; row++){
        for(let col = 0; col < 9; col++){
            const cell = getCell(row, col);
            if(!cell) continue;
            const value = board[row][col];
            const isFilled = value !== "0";
            const isCorrect = value === solution[row][col];
            const isWrong = isFilled && !isCorrect;
            if (isWrong) incorrectCount++;
            cell.classList.toggle(
                "incorrect",
                checkMode === "incorrect-cells" && isWrong,
            );
        }
    }

    const counterElement = document.getElementById("mistake-counter");
    if (counterElement) {
        counterElement.style.display = checkMode === "incorrect-count" ? "" : "none";
        counterElement.textContent = incorrectCount;
    }
}