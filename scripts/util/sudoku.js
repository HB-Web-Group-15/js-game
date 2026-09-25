import { getNewBoard } from "../api/SudokuApi.js";
import gameState from "../model/game-state.js";
import {
	clearHighlightedCells,
	clearNumbersHighlight,
	clearSelectedCells,
	createCell,
	getCell,
	highlightCellsWithValue,
	highlightOtherCells,
} from "./sudoku-cells.js";

export function createGrid({ puzzle, solution, difficulty }) {
	const grid = document.getElementById("sudoku-grid");
	grid.innerHTML = "";
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
	gameState.setState({
		board: puzzle,
		puzzle,
		solution,
		difficulty,
		gameActive: true,
	});
}

export function startNewGame(difficulty) {
	getNewBoard({ difficulty })
		.then((newBoard) => {
			createGrid(newBoard);
		})
		.catch((error) => console.error("Error fetching new board: ", error));
}

export function updateGrid(newState, oldState) {
	if (!newState.gameActive) return; // Only update the grid if the game is active
	if (!oldState || !oldState.board) return; // If there's no old state, we can't compare, so we skip the update
	if (JSON.stringify(newState.board) === JSON.stringify(oldState.board)) return; // If the board hasn't changed, we skip the update
	const cells = document.querySelectorAll("#sudoku-grid .cell");
	cells.forEach((cell) => {
		if (!cell) return;
		const row = parseInt(cell.dataset.row);
		const col = parseInt(cell.dataset.col);
		const newValue = newState.board[row][col];
		cell.querySelector(".cell-value").textContent = newValue;
	});
}

export function updateSelectedCell(newState, oldState) {
	if (
		JSON.stringify(newState.selectedCell) ===
		JSON.stringify(oldState.selectedCell)
	)
		return; // If the selected cell hasn't changed, we skip the update
	clearSelectedCells();
	clearHighlightedCells();
	clearNumbersHighlight();
	const { row, col } = newState.selectedCell;
	const selectedCell = getCell(row, col);
	if (selectedCell) {
		selectedCell.classList.add("selected");
		highlightOtherCells({ row, col });
		const selectedCellValue = newState.board[row][col];
		highlightCellsWithValue(selectedCellValue);
	}
}
