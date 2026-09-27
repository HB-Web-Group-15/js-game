    const DEFAULT_SETTINGS = {
        playerName: "",
        showTimer: true,
        incorrectCells: "incorrect-cells",
    };

    export function loadSettings() {
        const saved = localStorage.getItem("settings");
        if(saved){
            return {...DEFAULT_SETTINGS, ...JSON.parse(saved)};
        }
        return {...DEFAULT_SETTINGS};
    }

    export function saveSettings(settings) {
        localStorage.setItem("settings", JSON.stringify(settings));
    }

    export function applySettingsToForm(settings){
        document.getElementById("player-name-input").value = settings.playerName;
        document.getElementById("timer-switch").checked = settings.showTimer;
        document.getElementById("show-incorrect").value = settings.incorrectCells;
    }