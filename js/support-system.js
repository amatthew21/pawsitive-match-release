// support-system.js

// Function to handle the back button navigation
document.querySelector('.back-btn').addEventListener('click', function(event) {
    // Prevent default behavior and redirect the user to the homepage
    event.preventDefault();
    window.location.href = 'home.html';
});

// Simulating an emergency alert (could be triggered by some event in the real system)
function triggerEmergencyAlert() {
    alert("Emergency alert triggered! Staff has been notified.");
}

// This function could be invoked when specific conditions are met, such as detecting an emergency situation
function detectEmergencySituation() {
    // Example condition: If an urgent situation is detected (this is just a simulation)
    const isEmergency = true;

    if (isEmergency) {
        triggerEmergencyAlert();
    }
}

// Automatically check for emergencies when the page is loaded
window.addEventListener('load', function() {
    // Simulate emergency detection
    detectEmergencySituation();
});
