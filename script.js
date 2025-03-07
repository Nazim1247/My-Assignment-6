
let sortByPriceData = [];

const sortByPrice = () => {
    document.getElementById('spinner').style.display = 'block';
    const sortedByPrice = document.getElementById('pets-container');
    sortedByPrice.innerHTML = '';
    
    setTimeout(function () {

        fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
        .then(response => response.json())
        .then(data => {
            sortByPriceData = data.pets;

        displaySortByPrice();
        activeRemove();
        displayAllPets(sortByPriceData);
        })
        .catch(error => console.log(error));
         
}, 2000);
};

const displaySortByPrice = () => {

    sortByPriceData.sort(function (a, b) {
        return b.price - a.price;
    });

    const sortedByPrice = document.getElementById('pets-container');
    sortedByPrice.innerHTML = '';
    
    sortByPriceData.forEach(pet => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="p-4 border border-solid shadow-sm rounded-md">
                    <img class="w-full md:h-[150px] rounded-md" src="${pet.image}" alt="">
                    <h4 class="font-semibold mt-2">${pet.pet_name}</h4>
                    <p class="text-gray-400"><i class="fa-solid fa-border-all"></i> Breed: ${pet.breed ? `${pet.breed}` : 'Not available'}</p>
                    <p class="text-gray-400"><i class="fa-solid fa-cake-candles"></i> Birth: ${pet.date_of_birth ? `${pet.date_of_birth}` : 'Not available'}</p>
                    <p class="text-gray-400"><i class="fa-solid fa-mars-stroke-up"></i> Gender: ${pet.gender ? `${pet.gender}` : 'Not available'}</p>
                    <p class="text-gray-400">$ Price : ${pet.price ? `${pet.price}` : 'Not available'}</p>
                    <hr class="my-3" />
                    <div class="space-y-3 lg:space-y-0 lg:flex items-center gap-4 mt-2">
                        <button onclick="likeButton('${pet.image}')" class="btn btn-sm"><i class="fa-solid fa-thumbs-up text-[#0E7A81]"></i></button>
                        <button id="adopt-btn" onclick="adoptButton('${pet.petId}')" class="btn btn-sm text-[#0E7A81]">Adopt</button>
                        <button onclick="loadPetDetails('${pet.petId}')" class="btn btn-sm text-[#0E7A81]">Details</button>
                    </div>
                </div>
        `;
        sortedByPrice.appendChild(div);
    })
};

const loadAllPets = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    const data = await response.json()
    displayAllPets(data.pets);
};

const loadAllPetsCategories = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    const data = await response.json()
    displayAllPetsCategories(data.categories);  
};

const displayAllPets = (pets) => {
    document.getElementById('spinner').style.display = 'none';

    const petsContainer = document.getElementById('pets-container');
    petsContainer.innerHTML = '';
    if(pets.length === 0){   
        petsContainer.innerHTML = `
        <div class="grid col-span-1 md:col-span-3 text-center shadow-sm p-2 md:p-20 space-y-5 bg-slate-50">
        <img class="mx-auto" src="images/error.webp" />
        <h3 class="text-2xl font-bold">No Information Available</h3>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>
        `;
    return;
    } 
    pets.forEach(pet => {
        const div = document.createElement('div');
    div.innerHTML = `
    <div class="p-4 border border-solid shadow-sm rounded-md">
                    <img class="w-full md:h-[150px] rounded-md" src="${pet.image}" alt="">
                    <h4 class="font-semibold mt-2">${pet.pet_name}</h4>
                    <p class="text-gray-400"><i class="fa-solid fa-border-all"></i> Breed: ${pet.breed ? `${pet.breed}` : 'Not available'}</p>
                    <p class="text-gray-400"><i class="fa-solid fa-cake-candles"></i> Birth: ${pet.date_of_birth ? `${pet.date_of_birth}` : 'Not available'}</p>
                    <p class="text-gray-400"><i class="fa-solid fa-mars-stroke-up"></i> Gender: ${pet.gender ? `${pet.gender}` : 'Not available'}</p>
                    <p class="text-gray-400">$ Price : ${pet.price ? `${pet.price}` : 'Not available'}</p>
                    <hr class="my-3" />
                    <div class="space-y-3 lg:space-y-0 lg:flex items-center gap-4 mt-2">
                        <button onclick="likeButton('${pet.image}')" class="btn btn-sm"><i class="text-[#0E7A81] fa-solid fa-thumbs-up"></i></button>
                        <button id="adopt-btn" onclick="adoptButton('${pet.petId}')" class="btn btn-sm text-[#0E7A81]">Adopt</button>
                        <button onclick="loadPetDetails('${pet.petId}')" class="btn btn-sm text-[#0E7A81]">Details</button>
                    </div>
                </div>
                `;
                petsContainer.appendChild(div);
    })  
};

const displayAllPetsCategories = (categories) => {
    const petCategories = document.getElementById('btn-pets');
    categories.forEach((category) => {
        const button = document.createElement('button');
        button.innerHTML = `
        <button id="btn-${category.category}" onclick="showCategories('${category.category}')" class="btn-active w-11/12 mx-auto flex justify-center items-center gap-3 py-2 px-5 border border-solid rounded-lg">
        <img src="${category.category_icon}" />
        <p class="text-lg font-bold">${category.category}</p>
        </button>
        `;
        petCategories.appendChild(button);
    })
};

const likeButton = (image) => {
    const like = document.getElementById('like');
    const div = document.createElement('div');
    div.innerHTML = `
    <img class="p-1 rounded-lg" src="${image}" />
    `;
    like.appendChild(div);
};

const adoptButton = () => {

    document.getElementById('adoptModal').showModal();
    let countDown = 4;
    let countDownElement = document.getElementById('adopt-content');
    let countDownTime = setInterval(function () {
        countDown--;
        countDownElement.innerHTML = `
        <div class="text-center space-y-5 p-10 shadow-lg">
        <i class="text-4xl text-[#0E7A81] fa-solid fa-handshake"></i>
        <h3 class="text-4xl font-bold">Congrats</h3>
        <p class="text-lg">Adoption Process is Start For your Pet</p>
        <p class="text-5xl font-bold text-red-600">${countDown}</p>
        </div>
        `;
        if(countDown <= 0){
            document.getElementById('adoptModal').close();
            clearInterval(countDownTime);
            countDownElement.innerHTML = '';
        }
    }, 1000);
};

const loadPetDetails = (petId) => {   
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => displayPetDetails(data.petData))
    .catch((error) => console.log(error));
};

const displayPetDetails = (pet) => {
    const detailContainer = document.getElementById('pet-content');
    const div = document.createElement('div');
    div.innerHTML = `
    <div>
    <div class="p-4 border border-solid shadow-sm rounded-md">
                    <img class="w-full h-[220px] rounded-md" src="${pet.image}" alt="">
                    <h4 class="font-bold mt-2 py-2">${pet.pet_name}</h4>
                    <div class="grid grid-cols-2">
                    <p class="text-gray-400"><i class="fa-solid fa-border-all"></i> Breed: ${pet.breed ? `${pet.breed}` : 'Not available'}</p>
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
};

const activeRemove = () => {
    const buttons = document.getElementsByClassName('btn-active');
    for(let button of buttons){
        button.classList.remove('active');
    }
};

const showCategories = (id) => {
    const petsContainer = document.getElementById('pets-container');
    petsContainer.innerHTML = '';
    document.getElementById('spinner').style.display = 'block';
    setTimeout(function () {
        fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((response) => response.json())
    .then((data) => {
        activeRemove()
        const activeBtn = document.getElementById(`btn-${id}`)
        activeBtn.classList.add('active');
        displayAllPets(data.data)
    })
    .catch((error) => console.log(error));

    }, 2000)   
};

loadAllPets()
loadAllPetsCategories()