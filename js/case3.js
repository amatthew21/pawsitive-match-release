document.addEventListener("DOMContentLoaded", function () {
    let profiles = JSON.parse(localStorage.getItem("animalProfiles")) || [];
    let profileList = document.getElementById("transportProfiles");
    let selectedPetInput = document.getElementById("selectedPet");

    profileList.innerHTML = "";

    profiles.forEach(profile => {
        let listItem = document.createElement("div");
        listItem.classList.add("profile-card");
        listItem.innerHTML = `
            <img src="${profile.imageURL || 'placeholder.jpg'}" alt="${profile.animalName}">
            <h3>${profile.animalName}</h3>
        `;

        listItem.addEventListener("click", function () {
            document.querySelectorAll(".profile-card").forEach(card => card.classList.remove("selected"));
            listItem.classList.add("selected");
            selectedPetInput.value = profile.animalName;
            localStorage.setItem("selectedTransportAnimal", profile.animalName);
        });

        profileList.appendChild(listItem);
    });
});

function toggleAddressField() {
    let destination = document.getElementById("destination").value;
    let addressField = document.getElementById("addressField");

    if (destination) {
        addressField.style.display = "block";
    } else {
        addressField.style.display = "none";
    }
}

function submitTransportRequest() {
    let petName = document.getElementById("selectedPet").value;
    let destination = document.getElementById("destination").value;
    let driver = document.getElementById("driver").value;
    let destinationAddress = document.getElementById("destinationAddress").value;

    if (!petName || !destination || !driver) {
        alert("❌ Please fill all required fields.");
        return;
    }

    let transportData = {
        petName,
        destination,
        driver,
        address: destinationAddress || "N/A",
        status: "Pending Review"
    };

    let transportRequests = JSON.parse(localStorage.getItem("transportRequests")) || [];
    transportRequests.push(transportData);
    localStorage.setItem("transportRequests", JSON.stringify(transportRequests));

    alert(`✅ Transport request for ${petName} has been submitted.`);
    
    // Clear form fields after submission
    document.getElementById("selectedPet").value = "";
    document.getElementById("destination").value = "";
    document.getElementById("driver").value = "";
    document.getElementById("destinationAddress").value = "";

}

function reviewTransport() {
    let transportRequests = JSON.parse(localStorage.getItem("transportRequests")) || [];
    let reviewList = document.getElementById("reviewList");
    reviewList.innerHTML = "";

    if (transportRequests.length === 0) {
        reviewList.innerHTML = "<p>No pending transport requests.</p>";
    } else {
        transportRequests.forEach((request, index) => {
            if (request.status === "Pending Review") {
                let listItem = document.createElement("li");
                listItem.innerHTML = `
                    <strong>${request.petName}</strong> → ${request.destination}  
                    ${request.address !== "N/A" ? `(Address: ${request.address})` : ""}  
                    <button onclick="approveTransport(${index})">✔ Approve</button>
                `;
                reviewList.appendChild(listItem);
            }
        });
    }
}

function approveTransport(index) {
    let transportRequests = JSON.parse(localStorage.getItem("transportRequests")) || [];
    transportRequests[index].status = "Transport Approved";

    let transportList = document.getElementById("transportList");
    let listItem = document.createElement("li");

    listItem.innerHTML = `<strong>${transportRequests[index].petName}</strong> → ${transportRequests[index].destination}  
        (Driver: ${transportRequests[index].driver})  
        ${transportRequests[index].address !== "N/A" ? `(Address: ${transportRequests[index].address})` : ""}
        <button onclick="markAsCompleted(${index}, this)">✔ Transport Complete</button>`;

    transportList.appendChild(listItem);

    // Update localStorage and refresh review list
    localStorage.setItem("transportRequests", JSON.stringify(transportRequests));
    reviewTransport();
}

function markAsCompleted(index, button) {
    let transportRequests = JSON.parse(localStorage.getItem("transportRequests")) || [];
    let listItem = button.parentElement;
    listItem.style.textDecoration = "line-through";
    button.remove();

    let completedList = document.getElementById("completedList");
    let completedItem = document.createElement("li");
    completedItem.innerHTML = `<strong>${transportRequests[index].petName}</strong> successfully transported to ${transportRequests[index].destination}.`;

    completedList.appendChild(completedItem);

    if (transportRequests[index].destination === "Foster Home" || transportRequests[index].destination === "Another Shelter") {
        alert("✅ Placement record updated: Pet successfully placed.");
    }

    // Remove completed request from pending list
    transportRequests.splice(index, 1);
    localStorage.setItem("transportRequests", JSON.stringify(transportRequests));
}
