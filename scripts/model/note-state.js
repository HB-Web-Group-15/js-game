import { updateNoteButtonUI, updateNotesUI } from "../util/sudoku-notes.js";
import State from "./State.js";

const noteState = new State({
  notedCells: new Set(),
  isNoteMode: false,
});

noteState.subscribe((newState, oldState) => {
  updateNoteButtonUI(newState, oldState);
  u+updateNotesUI(newState,oldState);
});

export default noteState;
