document.addEventListener("DOMContentLoaded", function () {
    let adoptionRequests = JSON.parse(localStorage.getItem("adoptionRequests")) || [];
    let approvedAdoptions = JSON.parse(localStorage.getItem("approvedAdoptions")) || [];
    let adoptionList = document.getElementById("adoptionRequests");
    adoptionList.innerHTML = "";

    if (adoptionRequests.length === 0) {
        adoptionList.innerHTML = "<p>No pending adoption requests.</p>";
    } else {
        adoptionRequests.forEach((request, index) => {
            let listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>Animal:</strong> ${request.adoptedAnimal} <br>
                <strong>Name:</strong> ${request.fullName} <br>
                <strong>Email:</strong> ${request.email} <br>
                <strong>Phone:</strong> ${request.phone} <br>
                <strong>Address:</strong> ${request.address} <br>
                <button class="approve-request" data-index="${index}">✅ Approve</button>
                <button class="delete-request" data-index="${index}">❌ Remove</button>
            `;
            adoptionList.appendChild(listItem);
        });

        // Approve Button Functionality
        document.querySelectorAll(".approve-request").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                let approvedRequest = adoptionRequests.splice(index, 1)[0]; // Remove from pending & approve

                approvedAdoptions.push(approvedRequest);
                localStorage.setItem("adoptionRequests", JSON.stringify(adoptionRequests));
                localStorage.setItem("approvedAdoptions", JSON.stringify(approvedAdoptions));

                alert(`✅ Adoption approved for ${approvedRequest.adoptedAnimal}!`);
                window.location.reload();
            });
        });

        // Delete Button Functionality
        document.querySelectorAll(".delete-request").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                adoptionRequests.splice(index, 1);
                localStorage.setItem("adoptionRequests", JSON.stringify(adoptionRequests));
                alert("Adoption request removed.");
                window.location.reload();
            });
        });
    }

    // Clear All Requests Button
    document.getElementById("clearAdoptionsBtn").addEventListener("click", function () {
        if (confirm("Are you sure you want to clear all adoption requests?")) {
            localStorage.removeItem("adoptionRequests");
            alert("All adoption requests have been cleared.");
            window.location.reload();
        }
    });
});
