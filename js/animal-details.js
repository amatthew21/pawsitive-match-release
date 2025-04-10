document.addEventListener("DOMContentLoaded", function () {
    let selectedAnimalName = localStorage.getItem("selectedAnimalId");
    let profiles = JSON.parse(localStorage.getItem("animalProfiles")) || [];
    
    let selectedAnimal = profiles.find(profile => profile.animalName === selectedAnimalName);

    if (selectedAnimal) {
        document.getElementById("animalImage").src = selectedAnimal.imageURL || "placeholder.jpg";
        document.getElementById("animalName").innerText = selectedAnimal.animalName;
        document.getElementById("animalSpecies").innerText = selectedAnimal.species;
        document.getElementById("animalBreed").innerText = selectedAnimal.breed;
        document.getElementById("animalAge").innerText = selectedAnimal.age || "Unknown";
        document.getElementById("animalWeight").innerText = selectedAnimal.weight || "Unknown";
        document.getElementById("animalMedical").innerText = selectedAnimal.medicalHistory || "No records";
        document.getElementById("animalBehavior").innerText = selectedAnimal.behavior || "No notes";
        document.getElementById("animalStatus").innerText = selectedAnimal.adoptionStatus;

        // Redirect to adoption form
        document.getElementById("adoptBtn").addEventListener("click", function () {
            localStorage.setItem("selectedAnimalId", selectedAnimal.animalName);
            window.location.href = "adoption-form.html";
        });
    } else {
        alert("Animal profile not found.");
        window.location.href = "profiles.html";
    }
});
