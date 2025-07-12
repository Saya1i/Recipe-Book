const API_KEY = 'e1f4676e664f400882b53a38ddf15d3c'; // <- Replace with your real API key
const recipeGrid = document.getElementById('recipe-grid');
const catButtons = document.querySelectorAll('#categories button');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalSummary = document.getElementById('modal-summary');
const modalLink = document.getElementById('modal-link');

async function fetchRecipes(mealType) {
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&type=${mealType}&addRecipeInformation=true`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results || [];
}

function showRecipes(recipes) {
  recipeGrid.innerHTML = '';
  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <h3>${recipe.title}</h3>
    `;
    card.onclick = () => {
      openModal(recipe);
    };
    recipeGrid.appendChild(card);
  });
}

function openModal(recipe) {
  modalImg.src = recipe.image;
  modalTitle.textContent = recipe.title;
  modalSummary.innerHTML = recipe.summary;
  modalLink.href = recipe.sourceUrl;
  modal.style.display = 'flex';
}

closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = 'none';
};

catButtons.forEach(btn => {
  btn.addEventListener('click', async () => {
    catButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const mealType = btn.dataset.meal;
    const recipes = await fetchRecipes(mealType);
    showRecipes(recipes);
  });
});

// Default: show breakfast
catButtons[0].click();
