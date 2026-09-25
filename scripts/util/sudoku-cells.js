import handleCellClick from "../events/cell-click.js";
import gameState from "../model/game-state.js";

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

export function getCell(row, col) {
	return document.getElementById(`cell-${row}-${col}`);
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
	const cell = getCell(row, col);
	if (cell) {
		return cell.querySelector(".cell-value").textContent;
	}
	return null;
}

export function updateCellValue(row, col, value) {
	const currentState = gameState.getState();
	const newBoard = currentState.board;
	newBoard[row][col] = value;
	gameState.setState({ board: newBoard });
}

export function selectCell(row, col) {
	gameState.setState({ selectedCell: { row, col } });
}

export function clearHighlightedCells() {
	const highlightedCells = document.querySelectorAll(".highlighted");
	highlightedCells.forEach((cell) => {
		cell.classList.remove("highlighted");
	});
}

export function clearSelectedCells() {
	const selectedCells = document.querySelectorAll(".selected");
	selectedCells.forEach((cell) => {
		cell.classList.remove("selected");
	});
}

export function clearNumbersHighlight() {
	const highlightedNumbers = document.querySelectorAll(".highlighted-number");
	highlightedNumbers.forEach((cell) => {
		cell.classList.remove("highlighted-number");
	});
}

export function highlightOtherCells({ row, col }) {
	const square = getCellSquare(row, col);
	const highlightedCells = [];
	highlightedCells.push(getSquareCells(square));
	highlightedCells.push(getRowCells(row));
	highlightedCells.push(getColCells(col));
	highlightedCells.flat().forEach(({ row, col }) => {
		const cell = getCell(row, col);
		if (cell) {
			cell.classList.add("highlighted");
		}
	});
}

export function highlightCellsWithValue(value) {
	const cellsWithValue = getCellsWithValue(value);
	cellsWithValue.forEach(({ row, col }) => {
		const cell = getCell(row, col);
		if (cell) {
			cell.classList.add("highlighted-number");
		}
	});
}
