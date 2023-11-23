// A list of email subjects, some of which are phishing attempts.
const emailSubjects = [
    "Congratulations! You've won a prize!",
    "Urgent: Your account needs verification",
    "Important company meeting notice",
    "Click here to claim your gift card",
    "Your bank account has been compromised",
    "Free vacation for you and your family",
    "Update your password immediately",
    "Your package is on its way",
    "Invoice for your recent purchase",
    "Weekly newsletter - Stay updated!",
    "Appointment confirmation for tomorrow",
    "Reminder: Pay your utility bill",
];

let score = 0;
let timer = 30;
let emailSubject = "";

// Function to check if an email is a phishing attempt.
function isPhishing(emailSubject) {
    // Phishing emails have suspicious keywords like "prize" or "verification."
    const keywords = ["prize", "verification", "gift card", "compromised", "free", "password", "package"];
    for (const keyword of keywords) {
        if (emailSubject.toLowerCase().includes(keyword)) {
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
    const emailSubjectElement = document.getElementById("email-subject");
    const userInputElement = document.getElementById("user-input");
    const resultElement = document.getElementById("result");

    emailSubjectElement.textContent = "Game Over!";
    userInputElement.setAttribute("readonly", "readonly");
    document.getElementById("check-button").disabled = true;
    resultElement.textContent = `Final Score: ${score}`;
}

// Function to generate a new email subject.
function generateEmailSubject() {
    const emailSubjectElement = document.getElementById("email-subject");
    const userInputElement = document.getElementById("user-input");
    const resultElement = document.getElementById("result");

    if (timer > 0) {
        emailSubject = emailSubjects[Math.floor(Math.random() * emailSubjects.length)]; // Update the email subject
        emailSubjectElement.textContent = `Email Subject: ${emailSubject}`;
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
    generateEmailSubject();

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
            if ((userInput === "yes" && isPhishing(emailSubject)) ||
                (userInput === "no" && !isPhishing(emailSubject))) {
                resultElement.textContent = "Correct! This email is not a phishing attempt.";
                resultElement.style.color = "green";
                score++;
                document.getElementById("score-count").textContent = score;
            } else {
                resultElement.textContent = "Oops! You made a mistake. This was a phishing attempt.";
                resultElement.style.color = "red";
                // Show a message for the wrong answer
                setTimeout(function () {
                    resultElement.textContent = "";
                }, 2000); // Hide the message after 2 seconds
            }
            generateEmailSubject();
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
