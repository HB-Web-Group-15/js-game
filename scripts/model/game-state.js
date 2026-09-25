import State from "./State.js";

const gameState = new State({
	board: undefined,
	puzzle: undefined,
	solution: undefined,
	difficulty: undefined,
	gameActive: false,
});

gameState.subscribe((newState) => {
	const { board, puzzle, solution, difficulty, gameActive } = newState;
	// TODO: Update board UI based on the new state
});

export default gameState;
