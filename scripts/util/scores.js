import { formatTime } from "./text.js";

export function loadScores() {
  try {
    const saved = JSON.parse(localStorage.getItem("scores"));
    if (saved) {
      return saved;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function saveScore(name, time, difficulty) {
  const score = { name, time, difficulty };
  const loaded = loadScores();
  loaded.push(score);
  localStorage.setItem("scores", JSON.stringify(loaded));
}

export function populateScoreboard(scores) {
  const scoreboard = document.getElementById("scoreboard");
  scoreboard.innerHTML =
    "<tr><th>Rank</th><th>Name</th><th>Time</th><th>Difficulty</th></tr>";
  if (!scores || scores.length === 0) {
    const noScoresRow = document.createElement("tr");
    const noScoresCell = document.createElement("td");
    noScoresCell.setAttribute("colspan", "4");
    noScoresCell.textContent = "No scores yet.";
    noScoresRow.appendChild(noScoresCell);
    scoreboard.appendChild(noScoresRow);
    return;
  }
  const sorted = scores.toSorted((a, b) => a.time - b.time);
  sorted.forEach((element, i) => {
    const scoreRow = document.createElement("tr");
    const scoreRank = document.createElement("td");
    scoreRank.textContent = i + 1;
    scoreRow.appendChild(scoreRank);
    const scoreName = document.createElement("td");
    scoreName.textContent = element.name;
    scoreRow.appendChild(scoreName);
    const scoreTime = document.createElement("td");
    scoreTime.textContent = formatTime(element.time / 1000);
    scoreRow.appendChild(scoreTime);
    const scoreDifficulty = document.createElement("td");
    scoreDifficulty.textContent = element.difficulty;
    scoreDifficulty.style.textTransform = "capitalize";
    scoreRow.appendChild(scoreDifficulty);
    scoreboard.appendChild(scoreRow);
  });
}
