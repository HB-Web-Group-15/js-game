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
