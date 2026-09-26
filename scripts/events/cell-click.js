import { selectCell } from "../util/sudoku-cells.js";

/**
 * Handles the click event for a Sudoku cell.
 * @param {MouseEvent} event - The click event.
 * @returns {void}
 */
export default function handleCellClick(event) {
	const cell = event.target;
	if (!cell.classList.contains("sudoku-cell")) return;
	const row = parseInt(cell.dataset.row);
	const col = parseInt(cell.dataset.col);
	selectCell(row, col);
}
