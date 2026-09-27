import { updateNoteButtonUI, updateNotesUI } from "../util/sudoku-notes.js";
import State from "./State.js";

const noteState = new State({
  notedCells: new Set(),
  isNoteMode: false,
});

noteState.subscribe((newState, oldState) => {
  const noteButton = document.getElementById("note-button");
  if (newState.isNoteMode !== oldState.isNoteMode) {
    noteButton.classList.toggle("active", newState.isNoteMode);
  }
  updateNotesUI(newState, oldState);
});

export default noteState;
