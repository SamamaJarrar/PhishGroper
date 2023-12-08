// A list of email links, some of which may be suspicious.
const emailLinks = [
  "https://www.example.com",
  "https://www.phishy-link.com",
  "https://www.secure-website.com",
  "http://malicious-site.org",
  "https://www.trusted-site.net",
  "http://suspicious-link.biz",
  "https://www.bank-login-legit.com",
  "https://www.safe-url.org",
  "http://fake-login-phish.com",
  "https://www.authentic-portal.net",
  "https://www.good-link.com",
  "http://phishing-attempt.xyz",
];

let score = 0;
let timer = 30;
let emailLink = "";

// Function to check if a link is suspicious.
function isPhishing(link) {
  // Phishing links have suspicious domains or use HTTP instead of HTTPS.
  const suspiciousDomains = ["phishy-link", "malicious-site", "suspicious-link", "fake-login-phish", "phishing-attempt"];
  for (const domain of suspiciousDomains) {
      if (link.toLowerCase().includes(domain)) {
          return true;
      }
  }
  return !link.startsWith("https://");
}

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
  const emailLinkElement = document.getElementById("email-link");
  const userInputElement = document.getElementById("user-input");
  const resultElement = document.getElementById("result");

  emailLinkElement.textContent = "Game Over!";
  userInputElement.setAttribute("readonly", "readonly");
  document.getElementById("check-button").disabled = true;
  resultElement.textContent = `Final Score: ${score}`;
}

// Function to generate a new email link.
function generateEmailLink() {
  const emailLinkElement = document.getElementById("email-link");
  const userInputElement = document.getElementById("user-input");
  const resultElement = document.getElementById("result");

  if (timer > 0) {
      emailLink = emailLinks[Math.floor(Math.random() * emailLinks.length)]; // Update the email link
      emailLinkElement.innerHTML = `Link: <a href="${emailLink}" target="_blank">${emailLink}</a>`;
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
  generateEmailLink();

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
          
          // Validate user input
          if (userInput === "yes" || userInput === "no") {
              if ((userInput === "yes" && isPhishing(emailLink)) ||
                  (userInput === "no" && !isPhishing(emailLink))) {
                  resultElement.textContent = "Correct! This link is safe.";
                  resultElement.style.color = "green";
                  score++;
                  document.getElementById("score-count").textContent = score;
              } else {
                  resultElement.textContent = "Oops! You made a mistake. This link is suspicious.";
                  resultElement.style.color = "red";
                  // Show a message for the wrong answer
                  setTimeout(function () {
                      resultElement.textContent = "";
                  }, 2000); // Hide the message after 2 seconds
              }
              generateEmailLink();
          } else {
              // Show an alert for wrong input
              alert("Please enter 'yes' or 'no'");
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
