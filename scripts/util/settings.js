    const DEFAULT_SETTINGS = {
        playerName: "",
        showTimer: true,
        checkSolutionDifficulty: "incorrect-cells",
    };

    export function loadSettings() {
        const saved = localStorage.getItem("settings");
        if(saved){
            return JSON.parse(saved);
        }
        return {...DEFAULT_SETTINGS};
    }

    export function saveSettings(settings) {
        localStorage.setItem("settings", JSON.stringify(settings));
    }

    