import State from "./State.js";

const noteState = new State({
	notedCells: new Set(),
	isNoteMode: false,
});

noteState.subscribe(({ newState, oldState }) => {
	// TODO: Change the UI based on notes
});

export default noteState;
