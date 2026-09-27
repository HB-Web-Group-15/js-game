import gameState from "../model/game-state.js";
import noteState from "../model/note-state.js";
import { isCellPrefilled, updateCellValue } from "../util/sudoku-cells.js";
import { clearNoteForCell, toggleNote } from "../util/sudoku-notes.js";
import { checkSolution, resetGame } from "../util/sudoku.js";

document.querySelectorAll(".game-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const id = event.currentTarget.id;
    const { selectedCell } = gameState.getState();

    if (id.startsWith("number-")) {
      const [, value] = id.split("-");
      if (!selectedCell) return;
      const { row, col } = selectedCell;
      if (isCellPrefilled(row, col)) return;

      const { isNoteMode } = noteState.getState();
      if (isNoteMode) {
        toggleNote(row, col, value);
      } else {
        updateCellValue(row, col, value);
        clearNoteForCell(row, col);
      }
      return;
    }

    switch (id) {
      case "note-button": {
        const { isNoteMode } = noteState.getState();
        noteState.setState({ isNoteMode: !isNoteMode });
        break;
      }
      case "eraser-button": {
        if (!selectedCell) return;
        const { row, col } = selectedCell;
        if (isCellPrefilled(row, col)) return;
        updateCellValue(row, col, "0");
        break;
      }
      case "check-button": {
        checkSolution();
        break;
      }
      case "reset-button": {
        resetGame();
        break;
      }
    }
  });
});

document.querySelector("#pause-btn").addEventListener("click", () => {
  const { paused } = gameState.getState();
  gameState.setState({ paused: !paused });
});
