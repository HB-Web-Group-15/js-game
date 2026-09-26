import { getNewBoard } from "../api/SudokuApi.js";
import gameState from "../model/game-state.js";
import timerState from "../model/timer-state.js";
import {
  clearHighlightedCells,
  clearNumbersHighlight,
  clearSelectedCells,
  createCell,
  getCell,
  highlightCellsWithValue,
  highlightOtherCells,
} from "./sudoku-cells.js";
import { formatTime } from "./text.js";

/**
 * Creates a new Sudoku grid.
 * @param {{puzzle: string[][], solution: string[][], difficulty: string}} gameData - The game data containing the puzzle, solution, and difficulty.
 */
export function createGrid({ puzzle, solution, difficulty }) {
  const grid = document.getElementById("sudoku-grid");
  grid.innerHTML = ""; // Clear existing grid
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = createCell({
        row,
        col,
        value: puzzle[row][col],
        prefilled: puzzle[row][col] !== "0",
      });
      grid.appendChild(cell);
    }
  }
  grid.removeAttribute("data-completed"); // Remove the completed attribute when creating a new grid
  grid.removeAttribute("data-paused"); // Remove the paused attribute when creating a new grid
  // Update the game state with the new puzzle, solution, and difficulty
  gameState.setState({
    board: puzzle,
    puzzle,
    solution,
    difficulty,
    selectedCell: null,
    gameActive: true,
    paused: false,
  });
  timerState.setState({ timer: 0 }); // Reset the timer when a new game starts
}

/**
 * Starts a new Sudoku game with the specified difficulty.
 * @param {string} difficulty - The difficulty level of the new game.
 */
export function startNewGame(difficulty) {
  getNewBoard({ difficulty })
    .then((newBoard) => {
      createGrid(newBoard);
    })
    .catch((error) => console.error("Error fetching new board: ", error));
}

/**
 * Updates the Sudoku grid based on the new game state.
 * @param {{board: string[][]}} newState - The new game state.
 * @param {{board: string[][]}} oldState - The old game state.
 * @returns {void}
 */
export function updateGrid(newState, oldState) {
  if (!newState.gameActive || newState.paused) return; // Only update the grid if the game is active
  if (!oldState || !oldState.board) return; // If there's no old state, we can't compare, so we skip the update
  if (JSON.stringify(newState.board) === JSON.stringify(oldState.board)) return; // If the board hasn't changed, we skip the update
  const cells = document.querySelectorAll("#sudoku-grid .sudoku-cell");
  cells.forEach((cell) => {
    if (!cell) return;
    if (cell.classList.contains("incorrect"))
      cell.classList.remove("incorrect"); // Clear incorrect highlight when updating the grid
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const newValue = newState.board[row][col];
    cell.querySelector(".cell-value").textContent =
      newValue !== "0" ? newValue : "";
  });
  clearNumbersHighlight();
  highlightCellsWithValue(
    newState.selectedCell
      ? newState.board[newState.selectedCell.row][newState.selectedCell.col]
      : null,
  );
}

/**
 * Updates the selected cell in the Sudoku grid based on the new game state.
 * @param {{board: string[][], selectedCell: {row: number, col: number}}} newState - The new game state.
 * @param {{board: string[][], selectedCell: {row: number, col: number}}} oldState - The old game state.
 * @returns {void}
 */
export function updateSelectedCell(newState, oldState) {
  if (
    JSON.stringify(newState.selectedCell) ===
    JSON.stringify(oldState.selectedCell)
  )
    return; // If the selected cell hasn't changed, we skip the update
  if (newState.paused || !newState.gameActive) return; // If the game is paused or not active, we skip the update
  clearSelectedCells();
  clearHighlightedCells();
  clearNumbersHighlight();
  if (!newState.selectedCell) return; // If there's no selected cell, we skip the update
  const { row, col } = newState.selectedCell;
  const selectedCell = getCell(row, col);
  if (selectedCell) {
    selectedCell.classList.add("selected");
    highlightOtherCells({ row, col });
    const selectedCellValue = newState.board[row][col];
    highlightCellsWithValue(selectedCellValue);
  }
}

export function updatePauseState(newState, oldState) {
  if (newState.paused === oldState.paused) return; // If the pause state hasn't changed, we skip the update
  const grid = document.getElementById("sudoku-grid");
  if (newState.paused) {
    grid.setAttribute("data-paused", "true");
  } else {
    grid.removeAttribute("data-paused");
  }
  const pauseButtonIcon = document
    .getElementById("pause-btn")
    .querySelector("i.fa-solid");
  const gameButtons = document.querySelectorAll(".game-button");
  gameButtons.forEach((button) => (button.disabled = newState.paused));
  if (newState.paused) {
    pauseButtonIcon.classList.remove("fa-pause");
    pauseButtonIcon.classList.add("fa-play");
  } else {
    pauseButtonIcon.classList.remove("fa-play");
    pauseButtonIcon.classList.add("fa-pause");
  }
}

export function updateActiveState(newState, oldState) {
  if (newState.gameActive === oldState.gameActive) return;
  const gameButtons = document.querySelectorAll(".game-button");
  gameButtons.forEach((button) => (button.disabled = !newState.gameActive));
  const pauseButton = document.getElementById("pause-btn");
  if (pauseButton) pauseButton.disabled = !newState.gameActive;
}

export function updateTimer(newState, oldState) {
  if (parseInt(newState.timer / 1000) === parseInt(oldState.timer / 1000))
    return; // If the timer hasn't changed by at least a second, we skip the update
  const timerElement = document.getElementById("game-timer");
  timerElement.textContent = formatTime(parseInt(newState.timer / 1000));
}
