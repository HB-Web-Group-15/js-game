import State from "./State.js";

const noteState = new State({
  notedCells: new Set(),
  isNoteMode: false,
});

noteState.subscribe(({ newState, oldState }) => {
  // TODO: Change the UI based on notes
  const noteButton = document.getElementById("note-button");
  if (newState.isNoteMode !== oldState.isNoteMode) {
    noteButton.classList.toggle("active", newState.isNoteMode);
  }
});

export default noteState;
