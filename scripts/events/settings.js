import { saveSettings, loadSettings, applySettingsToForm, applyTimerVisibility } from "../util/settings.js"; 
import { updateMistakeFeedback } from "../util/mistakes.js";

document.getElementById("settings-apply").addEventListener("click", function() {
    const newSettings = {
        playerName: document.getElementById("player-name-input").value,
        showTimer: document.getElementById("timer-switch").checked,
        incorrectCells: document.getElementById("show-incorrect").value,
    };
    saveSettings(newSettings);
    applyTimerVisibility(newSettings);
    updateMistakeFeedback();
});

document.getElementById("settings-cancel").addEventListener("click", function() {
    applySettingsToForm(loadSettings());
});

