// A list of email attachments, some of which may pose risks.
const emailAttachments = [
  "Important_Document.pdf",
  "Prize_Claim_Form.exe",
  "Meeting_Details.doc",
  "Invoice_Payment.js",
  "Vacation_Offers.pdf",
  "Survey_Questions.doc",
  "Security_Update.exe",
  "Confidential_Report.pdf",
  "Gift_Card_Offers.js",
  "Account_Statement.pdf",
];

document.getElementById('home-button').addEventListener('click', function() {
  // Redirect to the home screen
  window.location.href = '../Main Page/PhishGroper_MainPage.html';});

let score = 0;
let timer = 30;
let emailAttachment = "";

// Function to check if an email attachment poses a risk.
function isRiskAttachment(emailAttachment) {
  // Risky attachments may include executable files or scripts.
  const riskyExtensions = [".exe", ".js"];
  for (const extension of riskyExtensions) {
      if (emailAttachment.toLowerCase().endsWith(extension)) {
          return true;
      }
  }
  return false;
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
  const emailAttachmentElement = document.getElementById("email-attachment");
  const userInputElement = document.getElementById("user-input");
  const resultElement = document.getElementById("result");

  emailAttachmentElement.textContent = "Game Over!";
  userInputElement.setAttribute("readonly", "readonly");
  document.getElementById("check-button").disabled = true;
  resultElement.textContent = `Final Score: ${score}`;
}

// Function to generate a new email attachment.
function generateEmailAttachment() {
  const emailAttachmentElement = document.getElementById("email-attachment");
  const userInputElement = document.getElementById("user-input");
  const resultElement = document.getElementById("result");

  if (timer > 0) {
      emailAttachment = emailAttachments[Math.floor(Math.random() * emailAttachments.length)]; // Update the email attachment
      emailAttachmentElement.textContent = `Attachment: ${emailAttachment}`;
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
  generateEmailAttachment();

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
              if ((userInput === "yes" && isRiskAttachment(emailAttachment)) ||
                  (userInput === "no" && !isRiskAttachment(emailAttachment))) {
                  resultElement.textContent = "Correct! This attachment may pose a risk.";
                  resultElement.style.color = "green";
                  score++;
                  document.getElementById("score-count").textContent = score;
              } else {
                  resultElement.textContent = "Oops! You made a mistake. This attachment is not a significant risk.";
                  resultElement.style.color = "red";
                  // Show a message for the wrong answer
                  setTimeout(function () {
                      resultElement.textContent = "";
                  }, 2000); // Hide the message after 2 seconds
              }
              generateEmailAttachment();
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
