import { updateTimer } from "../util/sudoku.js";
import State from "./State.js";

const timerState = new State({
  timer: 0,
});

timerState.subscribe(({ newState, oldState }) => {
  updateTimer(newState, oldState);
});

export default timerState;
