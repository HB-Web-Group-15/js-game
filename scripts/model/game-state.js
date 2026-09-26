import {
  updateActiveState,
  updateGrid,
  updatePauseState,
  updateSelectedCell,
} from "../util/sudoku.js";
import State from "./State.js";

const gameState = new State({
  board: undefined,
  puzzle: undefined,
  solution: undefined,
  difficulty: undefined,
  selectedCell: undefined,
  gameActive: false,
  paused: false,
});

gameState.subscribe(updateGrid);
gameState.subscribe(updateSelectedCell);
gameState.subscribe(updatePauseState);
gameState.subscribe(updateActiveState);

export default gameState;
