let animalProfiles = JSON.parse(localStorage.getItem("animalProfiles")) || [];

function saveAnimalProfile() {
    let animalName = document.getElementById("animalName").value.trim();
    let species = document.getElementById("species").value.trim();
    let breed = document.getElementById("breed").value.trim();
    let age = document.getElementById("age").value.trim();
    let weight = document.getElementById("weight").value.trim();
    let medicalHistory = document.getElementById("medicalHistory").value.trim();
    let behavior = document.getElementById("behavior").value.trim();
    let adoptionStatus = document.getElementById("adoptionStatus").value;
    let imageUpload = document.getElementById("imageUpload").files[0];

    if (!animalName || !species || !breed) {
        alert("❌ Please fill in required fields: Animal Name, Species, and Breed.");
        return;
    }

    if (age && (isNaN(age) || age < 0)) {
        alert("❌ Age must be a valid non-negative number.");
        return;
    }

    if (weight && (isNaN(weight) || weight < 0)) {
        alert("❌ Weight must be a valid non-negative number.");
        return;
    }

    let imageURL = "";
    if (imageUpload) {
        let reader = new FileReader();
        reader.onload = function (e) {
            imageURL = e.target.result;
            saveProfileToStorage(animalName, species, breed, age, weight, medicalHistory, behavior, adoptionStatus, imageURL);
        };
        reader.readAsDataURL(imageUpload);
    } else {
        saveProfileToStorage(animalName, species, breed, age, weight, medicalHistory, behavior, adoptionStatus, "");
    }
}

function saveProfileToStorage(animalName, species, breed, age, weight, medicalHistory, behavior, adoptionStatus, imageURL) {
    let existingIndex = animalProfiles.findIndex(profile => profile.animalName === animalName);
    let newProfile = { animalName, species, breed, age, weight, medicalHistory, behavior, adoptionStatus, imageURL };

    if (existingIndex > -1) {
        animalProfiles[existingIndex] = newProfile;
    } else {
        animalProfiles.push(newProfile);
    }

    localStorage.setItem("animalProfiles", JSON.stringify(animalProfiles));
    displayAnimalProfiles();
    clearForm();
}


function displayAnimalProfiles() {
    let profileList = document.getElementById("animalProfiles");
    profileList.innerHTML = "";

    animalProfiles.forEach((profile, index) => {
        let listItem = document.createElement("div");
        listItem.classList.add("profile-card");
        listItem.innerHTML = `
            <img src="${profile.imageURL || 'placeholder.jpg'}" alt="${profile.animalName}">
            <h3>${profile.animalName}</h3>
            <p><strong>Species:</strong> ${profile.species}</p>
            <p><strong>Breed:</strong> ${profile.breed}</p>
            <p><strong>Age:</strong> ${profile.age || "Unknown"} | <strong>Weight:</strong> ${profile.weight || "Unknown"} kg</p>
            <p><strong>Medical:</strong> ${profile.medicalHistory || "No records"}</p>
            <p><strong>Behavior:</strong> ${profile.behavior || "No notes"}</p>
            <p class="status"><strong>Status:</strong> ${profile.adoptionStatus}</p>
            <div class="buttons">
                <button class="edit-btn" onclick="editProfile(${index})">✏ Edit</button>
                <button class="delete-btn" onclick="deleteProfile(${index})">🗑 Delete</button>
            </div>`;
        profileList.appendChild(listItem);
    });
}


function deleteProfile(index) {
    if (confirm(`Are you sure you want to delete ${animalProfiles[index].animalName}'s profile?`)) {
        animalProfiles.splice(index, 1);
        localStorage.setItem("animalProfiles", JSON.stringify(animalProfiles));
        displayAnimalProfiles();
    }
}

function clearForm() {
    document.getElementById("animalForm").reset();
    document.getElementById("imagePreview").classList.add("hidden");
}

window.onload = displayAnimalProfiles;
