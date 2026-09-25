import handleCellClick from "../events/cell-click.js";
import gameState from "../model/game-state.js";

/**
 * Creates a new Sudoku cell element.
 * @param {{row: number, col: number, value: string, prefilled: boolean}} options - The options for creating the cell.
 * @returns {HTMLDivElement} The created cell element.
 */
export function createCell({ row, col, value = "", prefilled = false }) {
	const cell = document.createElement("div");
	// Set cell ID and data attributes for easier access later
	cell.id = `cell-${row}-${col}`;
	cell.dataset.row = row;
	cell.dataset.col = col;
	cell.classList.add("sudoku-cell");
	// Use a span for the cell value to separate it from the cell container, allowing for easier styling and manipulation
	const valueElement = document.createElement("span");
	valueElement.classList.add("cell-value");
	valueElement.textContent = value !== "0" ? value : "";
	cell.appendChild(valueElement);
	// Create a container for notes (small numbers) in the cell
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
	// If the cell is at the start of a 3x3 square, add a thicker border to visually separate the squares
	if (row % 3 === 0 && row !== 0) {
		cell.classList.add("top-border");
	}
	if (col % 3 === 0 && col !== 0) {
		cell.classList.add("left-border");
	}
	// Add an event listener for cell clicks to handle selection and interaction
	cell.addEventListener("click", handleCellClick);
	// If the cell is prefilled, mark it as such to prevent user edits
	if (prefilled) {
		cell.dataset.prefilled = "true";
	}
	return cell;
}

/**
 * Gets a Sudoku cell element by its row and column.
 * @param {number} row - The row of the cell.
 * @param {number} col - The column of the cell.
 * @returns {HTMLDivElement | null} The cell element, or null if not found.
 */
export function getCell(row, col) {
	return document.getElementById(`cell-${row}-${col}`);
}

/**
 * Checks if a Sudoku cell exists and is prefilled by its row and column.
 * @param {number} row - The row of the cell.
 * @param {number} col - The column of the cell.
 * @returns {boolean} True if the cell exists and is prefilled, false otherwise.
 */
export function isCellPrefilled(row, col) {
	const cell = getCell(row, col);
	return cell ? cell.dataset.prefilled === "true" : false;
}

/**
 * Gets the square index of a Sudoku cell by its row and column.
 *
 * Square indexes are numbered from 0 to 8, starting from the top-left square
 * and moving left to right, top to bottom.
 *
 * @example
 * For a cell at (row, col), the square index can be calculated
 * 0 1 2
 * 3 4 5
 * 6 7 8
 *
 * @param {number} row - The row of the cell.
 * @param {number} col - The column of the cell.
 * @returns {number} The square index of the cell.
 */
export function getCellSquare(row, col) {
	const squareRow = Math.floor(row / 3);
	const squareCol = Math.floor(col / 3);
	return squareRow * 3 + squareCol;
}

/**
 * Gets the cells in a Sudoku square by its index.
 *
 * @param {number} squareIndex - The index of the square.
 * @example
 * For a square index, the cells can be calculated as follows:
 * 0 1 2
 * 3 4 5
 * 6 7 8
 * @returns {Array<{row: number, col: number}>} The cells in the square.
 */
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

/**
 * Gets the cells in a Sudoku row by its index.
 * @param {number} row - The index of the row.
 * @returns {Array<{row: number, col: number}>} The cells in the row.
 */
export function getRowCells(row) {
	const cells = [];
	for (let col = 0; col < 9; col++) {
		cells.push({ row, col });
	}
	return cells;
}

/**
 * Gets the cells in a Sudoku column by its index.
 * @param {number} col - The index of the column.
 * @returns {Array<{row: number, col: number}>} The cells in the column.
 */
export function getColCells(col) {
	const cells = [];
	for (let row = 0; row < 9; row++) {
		cells.push({ row, col });
	}
	return cells;
}

/**
 * Gets the cells in a Sudoku grid that have a specific value.
 * @param {string} value - The value to search for.
 * @returns {Array<{row: number, col: number}>} The cells with the specified value.
 */
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

/**
 * Gets the value of a Sudoku cell by its row and column.
 * @param {number} row - The row of the cell.
 * @param {number} col - The column of the cell.
 * @returns {string | null} The value of the cell, or null if not found.
 */
export function getCellValue(row, col) {
	const cell = getCell(row, col);
	if (cell) {
		return cell.querySelector(".cell-value").textContent;
	}
	return null;
}

/**
 * Updates the value of a Sudoku cell in game state by its row and column.
 * @param {number} row - The row of the cell.
 * @param {number} col - The column of the cell.
 * @param {string} value - The new value for the cell.
 */
export function updateCellValue(row, col, value) {
	const currentState = gameState.getState();
	const newBoard = currentState.board;
	newBoard[row][col] = value;
	gameState.setState({ board: newBoard });
}

/**
 * Selects a Sudoku cell via game state by its row and column.
 * @param {number} row - The row of the cell.
 * @param {number} col - The column of the cell.
 */
export function selectCell(row, col) {
	gameState.setState({ selectedCell: { row, col } });
}

/**
 * Clears all highlighted cells in the Sudoku grid.
 */
export function clearHighlightedCells() {
	const highlightedCells = document.querySelectorAll(".highlighted");
	highlightedCells.forEach((cell) => {
		cell.classList.remove("highlighted");
	});
}

/**
 * Clears all selected cells in the Sudoku grid.
 */
export function clearSelectedCells() {
	const selectedCells = document.querySelectorAll(".selected");
	selectedCells.forEach((cell) => {
		cell.classList.remove("selected");
	});
}

/**
 * Clears all highlighted numbers in the Sudoku grid.
 */
export function clearNumbersHighlight() {
	const highlightedNumbers = document.querySelectorAll(".highlighted-number");
	highlightedNumbers.forEach((cell) => {
		cell.classList.remove("highlighted-number");
	});
}

/**
 * Highlights other cells in the Sudoku grid based on the selected cell.
 * @param {{row: number, col: number}} selectedCell - The row and column of the selected cell.
 */
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

/**
 * Highlights all cells in the Sudoku grid that contain a specific value.
 * @param {string} value - The value to highlight.
 */
export function highlightCellsWithValue(value) {
	const cellsWithValue = getCellsWithValue(value);
	cellsWithValue.forEach(({ row, col }) => {
		const cell = getCell(row, col);
		if (cell) {
			cell.classList.add("highlighted-number");
		}
	});
}
