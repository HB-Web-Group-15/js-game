import { updateGrid, updateSelectedCell } from "../util/sudoku.js";
import State from "./State.js";

const gameState = new State({
	board: undefined,
	puzzle: undefined,
	solution: undefined,
	difficulty: undefined,
	selectedCell: undefined,
	gameActive: false,
});

gameState.subscribe(({ newState, oldState }) => {
	updateGrid(newState, oldState);
	updateSelectedCell(newState, oldState);
});

export default gameState;
