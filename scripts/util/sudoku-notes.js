import noteState from "../model/note-state.js";
import { isCellPrefilled, getCellValue } from "./sudoku-cells.js";

export function toggleNote(row, col, value){
    if(isCellPrefilled(row, col)) return;
    if(getCellValue(row, col)) return;

    const { notedCells } = noteState.getState();
    const key = `${row}-${col}-${value}`;
    if(notedCells.has(key)){
        notedCells.delete(key);
    } else {
        notedCells.add(key);
    }
    noteState.setState({ notedCells });
}

export function clearNoteForCell(row,col){
    const {notedCells} = nodeState.getState();
    let changed = false;
    for(let value = 1; value <= 9; value++){
        const key = `${row}-${col}-${value}`;
        if(notedCells.delete(key)){
            changed = true;
        }
    }
    if(changed) {
        noteState.setState({notedCells});
    }
}

export function updateNotesUI(newState, oldState) {
    for(let row = 0; row < 9; row++){
        for(let col = 0; col < 9; col++){
            for(let value = 1; value <= 9; value++){
                const key = `${row}-${col}-${value}`;
                const noteElement = document.getElementById(`note-${row}-${col}-${value}`);
                if(!noteElement) continue;
                noteElement.classList.toggle("visible", newState.notedCells.has(key));
            }
        }
    }
}

export function updateNoteButtonUI(newState, oldState) {
    const noteButton = document.getElementById("note-button");
    if(!noteButton) return;
    noteButton.classList.toggle("active", newState.isNoteMode);
}