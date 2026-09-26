import { showPage } from "../util/pages.js";
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
    oldState.currentPage !== "main-page"
  )
    gameState.setState({ gameActive: true });
});

export default pageState;
