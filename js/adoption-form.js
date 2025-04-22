document.addEventListener("DOMContentLoaded", function () {
    let adoptionForm = document.getElementById("adoptionForm");

    adoptionForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let adopterInfo = {
            fullName: document.getElementById("fullName").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            address: document.getElementById("address").value.trim(),
            adoptedAnimal: localStorage.getItem("selectedAnimalId")
        };

        if (!adopterInfo.fullName || !adopterInfo.email || !adopterInfo.phone || !adopterInfo.address) {
            alert("❌ Please fill out all required fields.");
            return;
        }

        // Retrieve existing requests or initialize an empty array
        let adoptionRequests = JSON.parse(localStorage.getItem("adoptionRequests")) || [];

        // Add new request to the list
        adoptionRequests.push(adopterInfo);

        // Save updated adoption requests
        localStorage.setItem("adoptionRequests", JSON.stringify(adoptionRequests));

        alert(`✅ Adoption request submitted for ${adopterInfo.adoptedAnimal}!`);
        window.location.href = "profiles.html"; // Redirect back to profiles
    });
});
