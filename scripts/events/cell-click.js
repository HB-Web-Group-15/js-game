import { selectCell } from "../util/sudoku-cells.js";

export default function handleCellClick(event) {
	const cell = event.target;
	if (!cell.classList.contains("sudoku-cell")) return;
	const row = parseInt(cell.dataset.row);
	const col = parseInt(cell.dataset.col);
	console.log(`Cell clicked: row ${row}, col ${col}`);
	selectCell(row, col);
}
