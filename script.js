



const loadAllPets = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    const data = await response.json()
    displayAllPets(data.pets);
};


const loadAllPetsCategories = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    const data = await response.json()
    displayAllPetsCategories(data.categories);
    // console.log(data.categories)
    
};

const displayAllPets = (pets) => {
    const petsContainer = document.getElementById('pets-container');
    petsContainer.innerHTML = '';
    pets.forEach(pet => {
        const div = document.createElement('div');
    div.innerHTML = `
    <div class="p-4 border border-solid shadow-sm rounded-md">
                    <img class="w-full md:h-[150px] rounded-md" src="${pet.image}" alt="">
                    <h4 class="font-semibold mt-2">${pet.pet_name}</h4>
                    <p class="text-gray-400"><i class="fa-solid fa-vector-square"></i> Breed: ${pet.breed ? `${pet.breed}` : 'Not available'}</p>
                    <p class="text-gray-400"><i class="fa-solid fa-cake-candles"></i> Birth: ${pet.date_of_birth ? `${pet.date_of_birth}` : 'Not available'}</p>
                    <p class="text-gray-400"><i class="fa-solid fa-mars-stroke-up"></i> Gender: ${pet.gender ? `${pet.gender}` : 'Not available'}</p>
                    <p class="text-gray-400">$ Price : ${pet.price ? `${pet.price}` : 'Not available'}</p>
                    <hr class="my-3" />
                    <div class="space-y-3 lg:space-y-0 lg:flex items-center gap-4 mt-2">
                        <button onclick="likeButton('${pet.image}s')" class="btn btn-sm"><i class="fa-solid fa-thumbs-up"></i></button>
                        <button class="btn btn-sm">Adopt</button>
                        <button onclick="loadPetDetails('${pet.petId}')" class="btn btn-sm">Details</button>
                    </div>
                </div>
                `;
                petsContainer.appendChild(div);
    })  
};

const loadPetDetails = (petId) => {
    
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => displayPetDetails(data.petData))
    .catch((error) => console.log(error));
    

}

const displayPetDetails = (pet) => {
    console.log(pet);
    const detailContainer = document.getElementById('pet-content');
    const div = document.createElement('div');
    div.innerHTML = `
    <div>
    <div class="p-4 border border-solid shadow-sm rounded-md">
                    <img class="w-full h-[200px] rounded-md" src="${pet.image}" alt="">
                    <h4 class="font-bold mt-2 py-2">${pet.pet_name}</h4>
                    <div class="grid grid-cols-2">
                    <p class="text-gray-400"><i class="fa-solid fa-vector-square"></i> Breed: ${pet.breed ? `${pet.breed}` : 'Not available'}</p>
                    <p class="text-gray-400"><i class="fa-solid fa-cake-candles"></i> Birth: ${pet.date_of_birth ? `${pet.date_of_birth}` : 'Not available'}</p>
                    <p class="text-gray-400"><i class="fa-solid fa-mars-stroke-up"></i> Gender: ${pet.gender ? `${pet.gender}` : 'Not available'}</p>
                    <p class="text-gray-400"><i class="fa-solid fa-mars-stroke-up"></i> Vaccinated Status: ${pet.vaccinated_status ? `${pet.vaccinated_status}` : 'Not available'}</p>
                    <p class="text-gray-400">$ Price : ${pet.price ? `${pet.price}` : 'Not available'}</p>
                    </div>
                    <hr class="my-3" />
                    <h3 class="text-lg font-bold">Details Information</h3>
                    <h3>${pet.pet_details}</h3>
            </div>
    </div>
    `;
    detailContainer.appendChild(div);

    document.getElementById('customModal').showModal();
}

const likeButton = (image) => {
    const like = document.getElementById('like');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="grid grid-cols-2">
    <img class="p-1 rounded-lg" src="${image}" />
    </div>
    `;
    like.appendChild(div);
}


const showCategories = (id) => {
    document.getElementById('spinner').style.display = 'block';

    setTimeout(function () {
        // displayAllPets()
    },2000)
    
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((response) => response.json())
    .then((data) => displayAllPets(data.data))
    .catch((error) => console.log(error));

}

const displayAllPetsCategories = (categories) => {
    const petCategories = document.getElementById('btn-pets');
    
    categories.forEach((category) => {
        const button = document.createElement('button');
        button.innerHTML = `
        <button onclick="showCategories('${category.category}')" class="w-11/12 mx-auto flex justify-center items-center gap-3 py-2 px-5 border border-solid rounded-lg">
        <img src="${category.category_icon}" />
        <p class="text-lg font-bold">${category.category}</p>
        </button>
        `;
        petCategories.appendChild(button);
    })
}

loadAllPets()
loadAllPetsCategories()