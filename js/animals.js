document.addEventListener('DOMContentLoaded', function () {
    let animalsData = [];

    async function fetchAnimals() {
        try {
            const response = await fetch('http://localhost:5000/animals');
            animalsData = await response.json();
            displayAnimals(animalsData);
        } catch (err) {
            console.error('Error fetching animals:', err);
        }
    }

    function displayAnimals(animals) {
        const container = document.getElementById('animals-container');
        container.innerHTML = '';

        animals.forEach(animal => {
            const card = document.createElement('div');
            card.className = 'animal-card';
            card.innerHTML = `
                <img src="${animal.imgpath}" alt="${animal.animalname}">
                <h2>${animal.animalname}</h2>
                <p>Species: ${animal.species}</p>
                <p>Breed: ${animal.breed}</p>
                <p>Age: ${animal.age} years</p>
                <p>Weight: ${animal.weight} kg</p>
                <p>Status: ${animal.adoptionstatus ? 'Adopted' : 'Unadopted'}</p>
            `;
            container.appendChild(card);
        });
    }

    function filterAnimals() {
        const searchTerm = document.getElementById('search-box').value.toLowerCase();
        const filterCat = document.getElementById('filter-cat').checked;
        const filterDog = document.getElementById('filter-dog').checked;
        const filterUnadopted = document.getElementById('filter-unadopted').checked;
        const filterAdopted = document.getElementById('filter-adopted').checked;
        const minWeight = parseFloat(document.getElementById('filter-weight-min').value) || 0;
        const maxWeight = parseFloat(document.getElementById('filter-weight-max').value) || Infinity;
    
        let filteredAnimals = animalsData.filter(animal => {
            const matchesSearch = animal.species.toLowerCase().includes(searchTerm) || animal.breed.toLowerCase().includes(searchTerm);
            const matchesSpecies = (!filterCat && !filterDog) || (filterCat && animal.species.toLowerCase() === 'cat') || (filterDog && animal.species.toLowerCase() === 'dog');
            const matchesAdoption = (!filterUnadopted && !filterAdopted) || (filterUnadopted && !animal.adoptionstatus) || (filterAdopted && animal.adoptionstatus);
            const matchesWeight = animal.weight >= minWeight && animal.weight <= maxWeight;
    
            return matchesSearch && matchesSpecies && matchesAdoption && matchesWeight;
        });
    
        displayAnimals(filteredAnimals);
    }
    

    document.getElementById('search-box').addEventListener('input', filterAnimals);
    document.getElementById('filter-cat').addEventListener('change', filterAnimals);
    document.getElementById('filter-dog').addEventListener('change', filterAnimals);
    document.getElementById('filter-unadopted').addEventListener('change', filterAnimals);
    document.getElementById('filter-adopted').addEventListener('change', filterAnimals);
    document.getElementById('filter-weight-min').addEventListener('input', filterAnimals);
    document.getElementById('filter-weight-max').addEventListener('input', filterAnimals);


    fetchAnimals();
});

document.getElementById('back-button').addEventListener('click', function () {
    window.location.href = '../html/home.html';
});

