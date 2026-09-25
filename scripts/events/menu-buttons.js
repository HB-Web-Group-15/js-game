const pages = document.querySelectorAll(".page");
const menuButtons = document.querySelectorAll(".menu-button");

/**
 * Shows the specified page and hides all other pages.
 * @param {string} pageId - The ID of the page to show.
 */
function showPage(pageId) {
	// TODO: Replace functionality with state management system
	pages.forEach((page) => {
		if (page.id === pageId) {
			page.classList.add("page-active");
		} else {
			page.classList.remove("page-active");
		}
	});
	menuButtons.forEach((button) => {
		if (button.id === pageId.replace("-page", "-menu-btn")) {
			button.classList.add("btn-active");
		} else {
			button.classList.remove("btn-active");
		}
	});
}

menuButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const targetPage = button.id.replace("-menu-btn", "") + "-page";
		showPage(targetPage);
	});
});
