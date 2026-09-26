import gameState from "../model/game-state.js"
import noteState from "../model/note-state.js"
import { isCellPrefilled, updateCellValue, getCell} from "../util/sudoku-cells.js"

document.querySelectorAll(".game-button").forEach((button) => {
    button.addEventListener("click", (event) => {
        const id = event.currentTarget.id;
        const {selectedCell} = gameState.getState();

        if(id.startsWith("number-")){
            const [,value] = id.split("-");
            if(!selectedCell) return;
            const {row,col} = selectedCell;
            if(isCellPrefilled(row,col)) return;
            updateCellValue(row,col,value);
            return;
        }

        switch(id){
            case "note-button": {
                const {isNoteMode} = noteState.getState();
                noteState.setState({isNoteMode: !isNoteMode});
                break;
            }
            case "eraser-button": {
                if(!selectedCell) return;
                const {row,col} = selectedCell;
                if(isCellPrefilled(row,col)) return;
                updateCellValue(row,col,"0");
                break;
            }
            case "check-button": {
                    const {board,solution} = gameState.getState;
                    if (!board || !solution) return;
                    let isComplete = true;
                    for(let row = 0; row < 9; row++){
                        for(let col = 0; col < 9; col++){
                            const cell = getCell(row,col);
                            if(!cell) continue;
                            const value = board[row,col];
                            const isFilled = value !== "0";
                            const isCorrect = value === solution[row,col];
                            cell.classList.toggle("incorrect", isFilled && !isCorrect);
                            if(!isCorrect) isComplete = false;
                    }
                }
                if(isComplete)alert("Congratulations, you solved the puzzle!");
                break;
            }
            case "reset-button":{
                const {puzzle} = gameState.getState();
                if(!puzzle) return;
                gameState.setState({
                    board: puzzle.map((row) => [...row]),
                });
                noteState.setState({noteCells: new Set() });
                break;
            }
        }
    });
});