document.getElementById("volunteerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let availability = document.getElementById("availability").value;
    let experience = document.getElementById("experience").value;

    // Store volunteer data (for now, just logging)
    let volunteerData = {
        name: name,
        email: email,
        phone: phone,
        availability: availability,
        experience: experience
    };

    console.log("New Volunteer Sign-Up:", volunteerData); // Placeholder for backend integration

    // Show confirmation message
    document.getElementById("volunteerConfirmation").style.display = "block";

    // Clear form
    document.getElementById("volunteerForm").reset();
});
