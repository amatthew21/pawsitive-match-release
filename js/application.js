// application.js

// Function to handle form submission
document.getElementById('foster-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting the traditional way
    
    // Get form input values
    const fullName = document.getElementById('full-name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const residence = document.getElementById('residence').value;
    const animalType = document.getElementById('animal-type').value;
    const experience = document.getElementById('experience').value;
    const availability = document.getElementById('availability').value;
    const duration = document.getElementById('duration').value;
    const references = document.getElementById('references').value;

    // Simple form validation
    if (!fullName || !phone || !email || !address || !residence || !animalType || !availability || !duration || !references) {
        document.getElementById('form-message').textContent = 'Please fill out all required fields.';
        return;
    }

    // Display a success message (this could be further developed to send data to a server)
    document.getElementById('form-message').textContent = 'Your application has been submitted successfully!';

    // Optional: Reset the form after submission
    document.getElementById('foster-form').reset();
});

// Toggle navigation menu for mobile view (hamburger menu)
document.querySelector('.hamburger-menu').addEventListener('click', function() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('hide');
});
