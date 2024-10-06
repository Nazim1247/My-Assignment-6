

const loadAllPets = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    const data = await response.json()
    displayAllPets(data.pets);
};

const loadAllPetsCategories = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    const data = await response.json()
    displayAllPetsCategories(data.categories);
    console.log(data.categories)
};

const displayAllPets = (pets) => {
    const petsContainer = document.getElementById('pets-container');
    pets.forEach(pet => {
        const div = document.createElement('div');
    div.innerHTML = `
    <div class="p-4 border border-solid shadow-sm rounded-md">
                    <img class="w-full md:h-[150px] rounded-md" src="${pet.image}" alt="">
                    <h4 class="font-semibold mt-2">${pet.category}</h4>
                    <p class="text-gray-400"><i class="fa-solid fa-vector-square"></i> Breed: ${pet.breed ? `${pet.breed}` : 'Not available'}</p>
                    <p class="text-gray-400"><i class="fa-solid fa-cake-candles"></i> Birth: ${pet.date_of_birth ? `${pet.date_of_birth}` : 'Not available'}</p>
                    <p class="text-gray-400"><i class="fa-solid fa-mars-stroke-up"></i> Gender: ${pet.gender ? `${pet.gender}` : 'Not available'}</p>
                    <p class="text-gray-400">$ Price : ${pet.price ? `${pet.price}` : 'Not available'}</p>
                    <hr class="my-3" />
                    <div class="space-y-3 lg:space-y-0 lg:flex items-center gap-5 mt-2">
                        <button class="btn btn-sm"><i class="fa-solid fa-thumbs-up"></i></button>
                        <button class="btn btn-sm">Adopt</button>
                        <button class="btn btn-sm">Details</button>
                    </div>
                </div>
                `;
                petsContainer.appendChild(div);
    })
    // const petCategories = document.getElementById('btn-pets')
    // pets.forEach((pet) => {
    //     console.log(pet);
    //     const button = document.createElement('button');
    //     button.classList = 'btn';
    //     button.innerText
    // })
};

const displayAllPetsCategories = (categories) => {
    const petCategories = document.getElementById('btn-pets');
    categories.forEach((category) => {
        const button = document.createElement('button');
        button.innerHTML = `
        <button class="w-11/12 mx-auto flex justify-center items-center gap-3 py-2 px-5 border border-solid rounded-lg">
        <img src="${category.category_icon}" />
        <p class="text-lg font-bold">${category.category}</p>
        </button>
        `;
        petCategories.appendChild(button);
    })
}

loadAllPets()
loadAllPetsCategories()