let disarmCode = generateCode();
let timerInterval;
let isArmed = false;
let timeRemaining = 600; // e.g., 10 minutes
let inputCode = ''; // Store user input

// Update display
function updateDisplay() {
    const display = document.getElementById("display");
    const enteredCodeDisplay = document.getElementById("enteredCodeDisplay");
    display.textContent = `Timer: ${formatTime(timeRemaining)} | Status: ${isArmed ? 'Armed' : 'Disarmed'} | Code: ${disarmCode}`;
    enteredCodeDisplay.textContent = inputCode || '-';
}

// Generate a new code and clear previous input
function generateCode() {
    inputCode = ''; // Clear input when new code is generated
    updateDisplay(); // Show the cleared input in display
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Format time in mm:ss
function formatTime(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
}

// Handle keypad input
document.querySelectorAll('.key').forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('delete')) {
            inputCode = inputCode.slice(0, -1);
        } else if (inputCode.length < 6) {
            inputCode += button.textContent;
        }
        updateDisplay();
    });
});

// Arm the timer
document.getElementById("armButton").addEventListener("click", () => {
    if (inputCode === disarmCode) {
        isArmed = true;
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeRemaining--;
            updateDisplay();
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                playSound();
            }
        }, 1000);
    }
});

// Disarm the timer
document.getElementById("disarmButton").addEventListener("click", () => {
    if (inputCode === disarmCode) {
        isArmed = false;
        clearInterval(timerInterval);
        updateDisplay();
    }
});

// Refresh disarm code every 13 seconds
setInterval(() => {
    disarmCode = generateCode();
    updateDisplay();
}, 13000);

// Play sound on timer end (based on settings)
function playSound() {
    const sound = document.getElementById("sound").value;
    new Audio(`sounds/${sound}.mp3`).play();
}
