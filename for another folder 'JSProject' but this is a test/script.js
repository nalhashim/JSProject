let dishes = [
   {
      name: "Burger",
      price: 20.99,
      category: "Fast Food",
      image: "https://img.com/dish_image.jpeg",
      ingredients: "Meat, Cheese, Onion, Bread"
   },
   // Add more dish objects here
];

const menuContainer = document.querySelector('.menu-container');

function renderMenu(dishes) {
    menuContainer.innerHTML = '';
    dishes.forEach(dish => {
        const dishCard = document.createElement('div');
        dishCard.className = 'dish-card';
        dishCard.innerHTML = `
            <h2>${dish.name}</h2>
            <img src="${dish.image}" alt="${dish.name}">
            <p>Category: ${dish.category}</p>
            <p>Price: $${dish.price}</p>
            <p>Ingredients: ${dish.ingredients}</p>
        `;
        menuContainer.appendChild(dishCard);
    });
}

renderMenu(dishes);

const searchInput = document.querySelector('#search');
const categoryDropdown = document.querySelector('#category');
const priceInput = document.querySelector('#price');

function applyFilters() {
    let filteredDishes = dishes.filter(dish => {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryDropdown.value.toLowerCase();
        const price = parseFloat(priceInput.value) || 0;

        return dish.name.toLowerCase().includes(searchTerm) &&
               dish.category.toLowerCase().includes(category) &&
               dish.price <= price;
    });
    renderMenu(filteredDishes);
}

searchInput.addEventListener('input', applyFilters);
categoryDropdown.addEventListener('change', applyFilters);
priceInput.addEventListener('input', applyFilters);

const newDishForm = document.querySelector('.new-dish-form');
const newDishBtn = document.querySelector('.new-dish-btn');

newDishBtn.addEventListener('click', () => {
    newDishForm.style.display = 'block';
});

newDishForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.querySelector('#new-dish-name').value;
    const category = document.querySelector('#new-dish-category').value;
    const image = document.querySelector('#new-dish-image').value;
    const price = parseFloat(document.querySelector('#new-dish-price').value);
    const ingredients = document.querySelector('#new-dish-ingredients').value;

    if (name && category && image && price && ingredients) {
        const newDish = {
            name,
            category,
            image,
            price,
            ingredients
        };

        dishes.push(newDish);
        renderMenu(dishes);
        newDishForm.reset();
        newDishForm.style.display = 'none';
    } else {
        alert('Please fill out all fields.');
    }
});