let disarmCode = generateDisarmCode();
let typedInput = '';
let timerInterval;
let timeRemaining = 90; // Default to 1.5 minutes

document.getElementById("disarm-code").textContent = disarmCode;

function handleKeypadClick(key) {
  if (key === 'delete') {
    typedInput = typedInput.slice(0, -1);
  } else if (typedInput.length < 6) {
    typedInput += key;
  }
  document.getElementById("typed-input").textContent = typedInput;
}

function generateDisarmCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function resetDisarmCode() {
  disarmCode = generateDisarmCode();
  document.getElementById("disarm-code").textContent = disarmCode;
  typedInput = '';
  document.getElementById("typed-input").textContent = typedInput;
}

function toggleArm() {
  if (document.getElementById("status").textContent === "DISARM") {
    if (typedInput === disarmCode) {
      arm();
    } else {
      alert("Incorrect Code");
    }
  } else {
    disarm();
  }
}

function arm() {
  resetDisarmCode();
  timeRemaining = 90; // Reset to 1.5 minutes
  document.getElementById("status").textContent = "ARMED";
  timerInterval = setInterval(updateTimer, 1000);
}

function disarm() {
  clearInterval(timerInterval);
  document.getElementById("status").textContent = "DISARM";
}

function updateTimer() {
  if (timeRemaining <= 0) {
    clearInterval(timerInterval);
    alert("Time's up!");
    return;
  }
  timeRemaining--;
  document.getElementById("time-remaining").textContent = formatTime(timeRemaining);

  if (timeRemaining % 13 === 0) {
    resetDisarmCode();
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function openSettings() {
  alert("Settings menu will open here.");
}
