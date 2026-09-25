import { getNewBoard } from "../api/SudokuApi.js";
import { createCell } from "./sudoku-cells.js";

export function createGrid({ puzzle }) {
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
}

export function startNewGame(difficulty) {
	getNewBoard({ difficulty })
		.then((newBoard) => {
			createGrid(newBoard);
		})
		.catch((error) => console.error("Error fetching new board: ", error));
}
