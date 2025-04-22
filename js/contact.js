document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const modal = document.getElementById("contactModal");
    const closeBtn = document.querySelector(".close");

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent actual form submission

            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let message = document.getElementById("message").value;

            if (name === "" || email === "" || message === "") {
                alert("Please fill out all fields.");
            } else {
                modal.style.display = "flex"; // Show the modal only on successful submission
                contactForm.reset(); // Clear the form fields
            }
        });
    }

    // Close modal when clicking the close button
    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    // Close modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Ensure the modal is hidden when the page loads
    modal.style.display = "none";
});

