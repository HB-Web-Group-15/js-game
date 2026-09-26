import pageState from "../model/page-state.js";
const menuButtons = document.querySelectorAll(".menu-button");

/**
 * Shows the specified page and hides all other pages.
 * @param {string} pageId - The ID of the page to show.
 */
function showPage(pageId) {
  pageState.setState({ currentPage: pageId });
}

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetPage = button.id.replace("-menu-btn", "") + "-page";
    showPage(targetPage);
  });
});
