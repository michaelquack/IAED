let timer;
let timeRemaining = 90; // Default to 1.5 minutes in seconds
let armStatus = false;
let enteredCode = "";
let disarmCode = generateCode();
const timerDisplay = document.getElementById('timerDisplay');
const inputDisplay = document.getElementById('inputDisplay');
const statusDisplay = document.getElementById('statusDisplay');
const codeDisplay = document.getElementById('codeDisplay');

function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(timeRemaining);
    inputDisplay.textContent = `Input: ${enteredCode}`;
    statusDisplay.textContent = `Status: ${armStatus ? 'Arm' : 'Disarm'}`;
    codeDisplay.textContent = `Disarm Code: ${disarmCode}`;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function enterNumber(num) {
    if (enteredCode.length < 6) {
        enteredCode += num.toString();
        updateDisplay();
    }
}

function clearInput() {
    enteredCode = "";
    updateDisplay();
}

function toggleArm() {
    if (enteredCode === disarmCode) {
        armStatus = !armStatus;
        if (armStatus) {
            startTimer();
        } else {
            stopTimer();
        }
        updateDisplay();
    }
}

function startTimer() {
    timer = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateDisplay();
        } else {
            alert("Timer finished!");
            stopTimer();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    timeRemaining = parseInt(document.getElementById('timerInterval').value);
    updateDisplay();
}

function openSettings() {
    document.getElementById('settingsMenu').style.display = 'block';
}

function closeSettings() {
    document.getElementById('settingsMenu').style.display = 'none';
}

// Change disarm code every 13 seconds
setInterval(() => {
    disarmCode = generateCode();
    enteredCode = "";
    updateDisplay();
}, 13000);

// Service Worker registration for offline capabilities
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(() => {
        console.log('Service Worker registered');
    });
}
