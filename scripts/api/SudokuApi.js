const jsonPuzzles = [];

async function loadPuzzles() {
	if (jsonPuzzles.length === 0) {
		const response = await fetch("/assets/json/sudoku.json");

		if (!response.ok) {
			throw new Error(`Unable to load sudoku.json: ${response.status}`);
		}

		const data = await response.json();
		jsonPuzzles.push(...data);
	}

	return jsonPuzzles;
}

/**
 * Retrieves a new Sudoku board with the specified difficulty.
 * @param {{difficulty: string}} options - The parameters for the new board.
 * @returns {Promise<{board: string[][]}>} A promise that resolves to the new Sudoku board.
 */
export async function getNewBoard({ difficulty = "easy" }) {
	const puzzles = await loadPuzzles();

	const difficultyPuzzles = puzzles.filter(
		(puzzle) => puzzle.difficulty === difficulty,
	);

	const randomIndex = Math.floor(Math.random() * difficultyPuzzles.length);
	const puzzle = difficultyPuzzles[randomIndex];

	return puzzle;
}
