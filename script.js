let disarmCode = generateCode();
let timerInterval;
let isArmed = false;
let timeRemaining = 600; // e.g., 10 minutes

// Update display with time, status, and code
function updateDisplay() {
    const display = document.getElementById("display");
    display.textContent = `Timer: ${formatTime(timeRemaining)} | Status: ${isArmed ? 'Armed' : 'Disarmed'} | Code: ${disarmCode}`;
}

function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function formatTime(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
}

// Keypad input handling
let inputCode = '';
document.querySelectorAll('.key').forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('delete')) {
            inputCode = inputCode.slice(0, -1);
        } else if (inputCode.length < 6) {
            inputCode += button.textContent;
        }
        console.log("Current Code:", inputCode);
    });
});

// Start timer
document.getElementById("armButton").addEventListener("click", () => {
    if (inputCode === disarmCode) {
        isArmed = true;
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeRemaining--;
            updateDisplay();
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                // Play selected sound when timer ends
                playSound();
            }
        }, 1000);
    }
});

// Stop timer
document.getElementById("disarmButton").addEventListener("click", () => {
    if (inputCode === disarmCode) {
        isArmed = false;
        clearInterval(timerInterval);
        updateDisplay();
    }
});

// Settings button
document.getElementById("settingsButton").addEventListener("click", () => {
    document.getElementById("settingsMenu").classList.toggle("hidden");
});

// Sound playback based on selection
function playSound() {
    const sound = document.getElementById("sound").value;
    new Audio(`sounds/${sound}.mp3`).play();
}

// Timer updates every 13 seconds
setInterval(() => {
    disarmCode = generateCode();
    updateDisplay();
}, 13000);
