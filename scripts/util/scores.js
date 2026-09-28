export function loadScores() {
  const saved = JSON.parse(localStorage.getItem("scores"));
  if (saved) {
    return saved;
  }
  return [];
}

export function saveScore(name, time) {
  const score = { name, time };
  const loaded = loadScores();
  loaded.push(score);
  localStorage.setItem("scores", JSON.stringify(loaded));
}
