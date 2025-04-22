document.addEventListener("DOMContentLoaded", function () {
    let profiles = JSON.parse(localStorage.getItem("animalProfiles")) || [];
    let profileList = document.getElementById("adoptableProfiles");
    profileList.innerHTML = "";

    profiles.forEach(profile => {
        if (profile.adoptionStatus !== "Adopted") {
            let listItem = document.createElement("div");
            listItem.classList.add("profile-card");
            listItem.innerHTML = `
                <img src="${profile.imageURL || 'placeholder.jpg'}" alt="${profile.animalName}">
                <h3>${profile.animalName}</h3>
            `;

            // Redirect to animal-details.html with the selected profile
            listItem.addEventListener("click", function () {
                localStorage.setItem("selectedAnimalId", profile.animalName); // Use name as identifier
                window.location.href = "animal-details.html";
            });

            profileList.appendChild(listItem);
        }
    });
});
