let isArmed = false;
let disarmCode = generateCode();
let typedCode = '';
let timerInterval;
const codeInterval = 13000;

document.getElementById("code-display").textContent = `Code: ${disarmCode}`;

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function typeKey(num) {
  if (typedCode.length < 6) {
    typedCode += num;
    updateDisplay();
  }
}

function deleteKey() {
  typedCode = typedCode.slice(0, -1);
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("typed-display").textContent = `Typed: ${typedCode}`;
}

function toggleArm() {
  if (typedCode === disarmCode) {
    isArmed = !isArmed;
    document.getElementById("status").textContent = `Status: ${isArmed ? 'Arm' : 'Disarm'}`;
    if (isArmed) {
      startTimer();
    } else {
      stopTimer();
    }
    typedCode = '';
    updateDisplay();
  }
}

function startTimer() {
  const timeDisplay = document.getElementById("time-display");
  let timeLeft = parseInt(document.getElementById("timer-interval").value);
  timerInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      playSound();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function playSound() {
  const soundOption = document.getElementById("sound-option").value;
  alert(`Playing sound: ${soundOption}`);
}

function openSettings() {
  document.getElementById("settings-modal").style.display = 'flex';
}

function closeSettings() {
  document.getElementById("settings-modal").style.display = 'none';
}

// Update Disarm Code every 13 seconds
setInterval(() => {
  disarmCode = generateCode();
  typedCode = '';
  document.getElementById("code-display").textContent = `Code: ${disarmCode}`;
  updateDisplay();
}, codeInterval);
