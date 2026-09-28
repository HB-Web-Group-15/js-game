export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const msecs = Math.floor((seconds % 1) * 1000);
  return `${mins.toString().padStart(2, "0")}:${parseInt(secs).toString().padStart(2, "0")}${msecs > 0 ? `.${msecs.toString().padStart(3, "0")}` : ""}`;
}
