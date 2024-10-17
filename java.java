let timeRemaining = 30;
let interval;
let enteredCode = '';
let currentCode = '';
const codeLength = 6;

// Generate a new random defusal code
function generateCode() {
  currentCode = '';
  for (let i = 0; i < codeLength; i++) {
    currentCode += Math.floor(Math.random() * 10);
  }
  document.getElementById("code").innerText = "Code: " + currentCode;

  // Clear the entered code when a new code is generated
  resetEnteredCode();
}

// Start the timer
function startTimer() {
  interval = setInterval(() => {
    if (timeRemaining <= 0) {
      clearInterval(interval);
      alert("BOOM! You failed to defuse the bomb.");
      resetGame();
    } else {
      timeRemaining--;
      document.getElementById("timer").innerText = formatTime(timeRemaining);
      if (timeRemaining <= 10) {
        document.getElementById("timer").style.color = "red";
      }
    }
  }, 1000);
}

// Format the time display
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Enter a number into the code
function enterNumber(num) {
  if (enteredCode.length < codeLength) { // Limit code length to 6
    enteredCode += num;
    document.getElementById("enteredCodeDisplay").innerText = "Entered Code: " + enteredCode; // Display entered code
  }
}

// ARM the bomb and start the timer if the code is correctly entered
function armBomb() {
  if (enteredCode === currentCode) {
    startTimer(); // Start the timer
    alert("Bomb armed! You have " + formatTime(timeRemaining) + " to defuse it.");
  } else {
    alert("Please enter the correct code before arming.");
  }
}

// Check if the defusal was successful
function defuseBomb() {
  if (enteredCode === currentCode) {
    clearInterval(interval);
    alert("Bomb defused!");
    resetGame();
  } else {
    alert("Wrong code! Try again.");
    resetGame();
  }
}

// Open the settings menu
function openSettings() {
  document.getElementById("settingsMenu").style.display = "block";
}

// Close the settings menu
function closeSettings() {
  document.getElementById("settingsMenu").style.display = "none";
}

// Set the timer from the select field
function setTimer() {
  const input = document.getElementById("timerInput").value;
  if (input) {
    timeRemaining = parseInt(input);
    document.getElementById("timer").innerText = formatTime(timeRemaining);
    closeSettings();
    resetEnteredCode(); // Reset the entered code when settings are changed
  }
}

// Reset the entered code display
function resetEnteredCode() {
  enteredCode = '';
  document.getElementById("enteredCodeDisplay").innerText = "Entered Code: "; // Reset display
}

// Reset the game state
function resetGame() {
  clearInterval(interval); // Clear any existing interval
  resetEnteredCode(); // Reset entered code display
}

// Start the game
window.onload = function() {
  generateCode(); // Generate an initial code
};

// Change the defusal code every 10 seconds
setInterval(generateCode, 10000);
