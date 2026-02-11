const journeyStart = new Date("2024-02-13T00:00:00");

function formatTimer() {
  const now = new Date();
  const diff = now.getTime() - journeyStart.getTime();

  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
}

function updateTimer() {
  const timerEl = document.querySelector("[data-timer]");
  if (!timerEl) return;
  timerEl.textContent = formatTimer();
}

updateTimer();
setInterval(updateTimer, 1000);
