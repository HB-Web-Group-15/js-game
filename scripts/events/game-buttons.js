import gameState from "../model/game-state.js";
import noteState from "../model/note-state.js";
import timerState from "../model/timer-state.js";
import { toggleNote, clearNoteForCell } from "../util/sudoku-notes.js";
import { isCellPrefilled, updateCellValue } from "../util/sudoku-cells.js";

document.querySelectorAll(".game-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const id = event.currentTarget.id;
    const { selectedCell } = gameState.getState();

    if (id.startsWith("number-")) {
      const [, value] = id.split("-");
      if (!selectedCell) return;
      const { row, col } = selectedCell;
      if (isCellPrefilled(row, col)) return;

      const {isNoteMode} = noteState.getState();
      if (isNoteMode) {
        toggleNote(row, col, value);
      } else {
        updateCellValue(row, col, value);
        clearNoteForCell(row,col)
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
        const { board, solution } = gameState.getState();
        if (!board || !solution) return;

        const isComplete = board.every((rowValues, row) =>
          rowValues.every((value, col) => value === solution[row][col]),
        );

        if (isComplete) {
          gameState.setState({ gameActive: false });
          document.getElementById("sudoku-grid").dataset.completed = "true";
          // TODO: Save the time to localStorage
          console.log(timerState.getState().timer);
        }
        break;
      }
      case "reset-button": {
        const { puzzle } = gameState.getState();
        if (!puzzle) return;
        gameState.setState({
          board: puzzle.map((row) => [...row]),
        });
        noteState.setState({ notedCells: new Set() });
        break;
      }
    }
  });
});

document.querySelector("#pause-btn").addEventListener("click", () => {
  const { paused } = gameState.getState();
  gameState.setState({ paused: !paused });
});
