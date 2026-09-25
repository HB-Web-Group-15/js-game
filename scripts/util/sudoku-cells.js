import handleCellClick from "../events/cell-click.js";

export function createCell({ row, col, value = "", prefilled = false }) {
	const cell = document.createElement("div");
	cell.id = `cell-${row}-${col}`;
	cell.dataset.row = row;
	cell.dataset.col = col;
	cell.classList.add("sudoku-cell");
	const valueElement = document.createElement("span");
	valueElement.classList.add("cell-value");
	valueElement.textContent = value !== "0" ? value : "";
	cell.appendChild(valueElement);
	const noteContainer = document.createElement("div");
	noteContainer.classList.add("note-container");
	noteContainer.id = `note-container-${row}-${col}`;
	for (let i = 1; i <= 9; i++) {
		const noteNumber = document.createElement("div");
		noteNumber.textContent = i;
		noteNumber.classList.add("note-number");
		noteNumber.id = `note-${row}-${col}-${i}`;
		noteContainer.appendChild(noteNumber);
	}
	cell.appendChild(noteContainer);
	if (row % 3 === 0 && row !== 0) {
		cell.classList.add("top-border");
	}
	if (col % 3 === 0 && col !== 0) {
		cell.classList.add("left-border");
	}
	cell.addEventListener("click", handleCellClick);
	if (prefilled) {
		cell.dataset.prefilled = "true";
	}
	return cell;
}

export function getCellSquare(row, col) {
	const squareRow = Math.floor(row / 3);
	const squareCol = Math.floor(col / 3);
	return squareRow * 3 + squareCol;
}

export function getSquareCells(squareIndex) {
	const squareRow = Math.floor(squareIndex / 3);
	const squareCol = squareIndex % 3;
	const cells = [];
	for (let row = squareRow * 3; row < squareRow * 3 + 3; row++) {
		for (let col = squareCol * 3; col < squareCol * 3 + 3; col++) {
			cells.push({ row, col });
		}
	}
	return cells;
}

export function getRowCells(row) {
	const cells = [];
	for (let col = 0; col < 9; col++) {
		cells.push({ row, col });
	}
	return cells;
}

export function getColCells(col) {
	const cells = [];
	for (let row = 0; row < 9; row++) {
		cells.push({ row, col });
	}
	return cells;
}

export function getCellsWithValue(value) {
	const cells = [];
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			const cellValue = getCellValue(row, col);
			if (cellValue === value) {
				cells.push({ row, col });
			}
		}
	}
	return cells;
}

export function getCellValue(row, col) {
	const cell = document.getElementById(`cell-${row}-${col}`);
	if (cell) {
		return cell.querySelector(".cell-value").textContent;
	}
	return null;
}
