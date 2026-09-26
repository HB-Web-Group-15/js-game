import gameState from "../model/game-state.js";
import timerState from "../model/timer-state.js";

let currentTime = performance.now();

function tick() {
  const now = performance.now();
  const delta = now - currentTime;
  currentTime = now;

  if (gameState.getState().gameActive && !gameState.getState().paused) {
    const newTimerValue = timerState.getState().timer + delta;
    timerState.setState({ timer: newTimerValue });
  }

  requestAnimationFrame(tick);
}

tick();
