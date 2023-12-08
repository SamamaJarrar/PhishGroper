// Level_4.js

// A list of scenarios where users must decide to enable or disable 2FA.
const scenarios = [
  "You receive a notification that someone attempted to access your email account.",
  "A social media platform alerts you about a login attempt from an unfamiliar location.",
  "Your online banking app notifies you of a failed login attempt.",
  "You get a security alert about an attempted login to your cloud storage account.",
  "An online shopping website detects suspicious activity on your account.",
  "Your work collaboration tool flags an unauthorized access attempt.",
  "A gaming platform notifies you of a login attempt from a new device.",
  "Your cryptocurrency exchange account reports suspicious login activity.",
  "You receive an email from a service provider asking you to enable 2FA for added security.",
  "A cybersecurity awareness message recommends enabling 2FA to enhance account protection.",
];


let score = 0;
let timer = 30;
let currentScenario = "";

// Function to update the timer.
function updateTimer() {
  const timeElement = document.getElementById("time");
  timeElement.textContent = timer;
  if (timer === 0) {
    endGame();
  } else {
    timer--;
    setTimeout(updateTimer, 1000);
  }
}

// Function to end the game.
function endGame() {
  const scenarioElement = document.getElementById("scenario");
  const userInputElement = document.getElementById("user-input");
  const resultElement = document.getElementById("result");

  scenarioElement.textContent = "Game Over!";
  userInputElement.setAttribute("readonly", "readonly");
  document.getElementById("check-button").disabled = true;
  resultElement.textContent = `Final Score: ${score}`;
}

// Function to generate a new scenario.
function generateScenario() {
  const scenarioElement = document.getElementById("scenario");
  const userInputElement = document.getElementById("user-input");
  const resultElement = document.getElementById("result");

  if (timer > 0) {
    currentScenario = scenarios[Math.floor(Math.random() * scenarios.length)]; // Update the current scenario
    scenarioElement.textContent = currentScenario;
    userInputElement.value = ""; // Clear the input field
    resultElement.textContent = "";
  }
}

// Function to reset the game state.
function resetGame() {
  score = 0;
  timer = 30;
  document.getElementById("time").textContent = timer; // Reset the timer display
  document.getElementById("check-button").disabled = false;
  document.getElementById("user-input").removeAttribute("readonly");
  document.getElementById("score-count").textContent = score;
}

// Function to play the game.
function playGame() {
  resetGame(); // Reset the game state
  updateTimer(); // Start the timer
  generateScenario();

  const userInputElement = document.getElementById("user-input");
  const resultElement = document.getElementById("result");
  const checkButton = document.getElementById("check-button");

  // Event listener for the Enter key press
  userInputElement.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      checkButton.click(); // Trigger a click on the "check" button
    }
  });

  checkButton.addEventListener("click", function () {
    if (timer > 0) {
      const userInput = userInputElement.value.toLowerCase();
      const isEnable2FA = scenarios.indexOf(currentScenario) % 2 === 0; // Check if the scenario suggests enabling 2FA

      // Validate user input
      if (userInput === "en" || userInput === "dis") {
        if ((userInput === "en" && isEnable2FA) || (userInput === "dis" && !isEnable2FA)) {
          resultElement.textContent = "Correct! You made the right decision.";
          resultElement.style.color = "green";
          score++;
          document.getElementById("score-count").textContent = score;
        } else {
          resultElement.textContent = "Oops! You made a mistake. Consider the scenario and try again.";
          resultElement.style.color = "red";
          // Show a message for the wrong answer
          setTimeout(function () {
            resultElement.textContent = "";
          }, 2000); // Hide the message after 2 seconds
        }
        generateScenario();
      } else {
        // Show an alert for wrong input
        alert("Please enter 'en' or 'dis'");
      }
    }
  });
}

// Start the game when the page loads.
window.onload = playGame;

// Restart button logic
document.getElementById("restart-button").addEventListener("click", function () {
  resetGame();
  playGame();
});
