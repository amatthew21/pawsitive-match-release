document.getElementById("notificationsForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload

    let adoptionUpdates = document.getElementById("adoptionUpdates").checked;
    let eventNotifications = document.getElementById("eventNotifications").checked;
    let volunteerUpdates = document.getElementById("volunteerUpdates").checked;

    // Store subscription preferences (for now, just logging)
    let preferences = {
        adoptionUpdates: adoptionUpdates,
        eventNotifications: eventNotifications,
        volunteerUpdates: volunteerUpdates
    };

    console.log("User Subscribed to:", preferences); // Placeholder for backend integration

    // Show confirmation message
    document.getElementById("confirmationMessage").style.display = "block";
});
