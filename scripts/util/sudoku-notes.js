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