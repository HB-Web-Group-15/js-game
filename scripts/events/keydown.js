import gameState from "../model/game-state.js"
import noteState from "../model/note-state.js"
import { isCellPrefilled, selectCell, updateCellValue } from "../util/sudoku-cells.js"

document.addEventListener("keydown", (event) => {
    console.log("key:", event.key);
    const {key} = event;
    const {selectedCell} = gameState.getState();

    if(key >= "1" && key <= "9"){
        if(!selectedCell) return;
        const {row, col} = selectedCell;
        if(isCellPrefilled(row,col)) return;
        updateCellValue(row, col, key);
        return;
    }

    switch (key){
        case "Backspace":
        case "Delete":{
            if(!selectedCell) return;
            const {row, col} = selectedCell;
            if(isCellPrefilled(row,col)) return;
            updateCellValue(row,col,"0");
            break;
        }
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":{
            event.preventDefault();
            const {row = 0, col = 0} = selectedCell || {};
            let newRow = row, newCol = col;
            if(key === "ArrowUp") newRow = (row + 8) % 9;
            if(key === "ArrowDown") newRow = (row + 1) % 9;
            if(key === "ArrowLeft") newCol = (col + 8) % 9;
            if(key === "ArrowRight") newCol = (col + 1) % 9;
            selectCell(newRow, newCol);
            break;
        }
        case "n":
        case "N": {
            const { isNoteMode } = noteState.getState();
            noteState.setState({isNoteMode: !isNoteMode});
            break;
        }


    }
})