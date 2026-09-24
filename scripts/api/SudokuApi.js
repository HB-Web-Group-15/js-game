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

export async function getNewBoard({ difficulty = "easy" }) {
	const puzzles = await loadPuzzles();

	const difficultyPuzzles = puzzles.filter(
		(puzzle) => puzzle.difficulty === difficulty,
	);

	const randomIndex = Math.floor(Math.random() * difficultyPuzzles.length);
	const puzzle = difficultyPuzzles[randomIndex];

	return { puzzle };
}