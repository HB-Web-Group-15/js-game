import { showPage } from "../util/pages.js";
import { loadSettings, applySettingsToForm } from "../util/settings.js";
import gameState from "./game-state.js";
import State from "./State.js";

const pageState = new State({
  currentPage: "main-page",
});

pageState.subscribe((newState, oldState) => {
  if (newState.currentPage !== oldState.currentPage)
    showPage(newState.currentPage);
  if (newState.currentPage !== "main-page")
    gameState.setState({
      gameActive: false,
      selectedCell: undefined,
    });
  else if (
    newState.currentPage === "main-page" &&
    oldState.currentPage !== "main-page" &&
    document.getElementById("sudoku-grid").dataset.completed !== "true"
  )
    gameState.setState({ gameActive: true });
  
    if(newState.currentPage === "settings-page") {
      applySettingsToForm(loadSettings());
    }
});

export default pageState;
