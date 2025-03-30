
AOS.init();

const container = document.getElementById('tissu-container');
const searchBar = document.createElement('input');
searchBar.type = 'text';
searchBar.placeholder = 'Rechercher un tissu...';
searchBar.className = 'w-full p-3 my-4 border border-purple-300 rounded shadow-sm focus:outline-none focus:ring focus:border-purple-500';
container.before(searchBar);

// Section favoris
const favSection = document.createElement('div');
favSection.innerHTML = '<h2 class="text-2xl font-bold text-pink-600 mb-4">Vos favoris</h2>';
const favContainer = document.createElement('div');
favContainer.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10';
favSection.appendChild(favContainer);
container.before(favSection);

let allTissus = [];

searchBar.addEventListener('input', () => {
  afficherTissus(searchBar.value.trim().toLowerCase());
});

async function fetchTissus() {
  const res = await fetch('/api/tissus');
  allTissus = await res.json();
  afficherTissus('');
}

function toggleFavori(tissu) {
  let favs = JSON.parse(localStorage.getItem('favoris')) || [];
  const index = favs.findIndex(f => f._id === tissu._id);
  if (index > -1) {
    favs.splice(index, 1);
  } else {
    favs.push(tissu);
  }
  localStorage.setItem('favoris', JSON.stringify(favs));
  afficherTissus(searchBar.value.trim().toLowerCase());
}

function afficherFavoris() {
  favContainer.innerHTML = '';
  const favoris = JSON.parse(localStorage.getItem('favoris')) || [];
  favoris.forEach(tissu => {
    const card = creerCarteTissu(tissu, true);
    favContainer.appendChild(card);
  });
}

function creerCarteTissu(tissu, isFavoriSection = false) {
  const card = document.createElement('div');
  card.className = "card bg-white rounded-2xl shadow-md overflow-hidden fade-in pulse";
  card.setAttribute("data-aos", "fade-up");

  const favoris = JSON.parse(localStorage.getItem('favoris')) || [];
  const estFavori = favoris.some(f => f._id === tissu._id);

  card.innerHTML = `
    <div class="relative">
      <img src="${tissu.image}" alt="${tissu.numero}" class="w-full h-48 object-cover hover:scale-105 transition duration-500 ease-in-out" />
      <button class="absolute top-2 right-2 text-2xl ${estFavori ? 'text-red-500' : 'text-gray-400'} favoris-btn">♥</button>
    </div>
    <div class="p-4">
      <h2 class="text-xl font-bold text-yellow-600">${tissu.numero}</h2>
      <p class="mt-1 text-gray-700">${tissu.description}</p>
      <p class="mt-2 text-lg font-semibold text-green-700">${tissu.prix} €</p>
    </div>
  `;

  card.querySelector('.favoris-btn').onclick = () => toggleFavori(tissu);

  if (!isFavoriSection) {
    const commentContainer = document.createElement('div');
    commentContainer.className = "mt-4";

    const form = document.createElement('form');
    form.innerHTML = `
      <input type="text" name="nom" placeholder="Votre nom" class="border p-1 rounded mr-2" required>
      <input type="number" name="note" min="1" max="5" value="5" class="border p-1 rounded mr-2" required>
      <input type="text" name="message" placeholder="Votre commentaire" class="border p-1 rounded mr-2" required>
      <button type="submit" class="bg-yellow-500 text-white px-2 py-1 rounded">Envoyer</button>
    `;
    form.onsubmit = (e) => {
      e.preventDefault();
      envoyerCommentaire(form, tissu._id, commentContainer);
    };

    card.appendChild(form);
    card.appendChild(commentContainer);
    fetchCommentaires(tissu._id, commentContainer);
  }

  return card;
}

function afficherTissus(filtre) {
  container.innerHTML = '';

  const categories = {};
  allTissus
    .filter(t => t.numero.toLowerCase().includes(filtre) || t.description.toLowerCase().includes(filtre) || t.categorie.toLowerCase().includes(filtre))
    .forEach(tissu => {
      if (!categories[tissu.categorie]) {
        categories[tissu.categorie] = [];
      }
      categories[tissu.categorie].push(tissu);
    });

  for (const [categorie, tissusList] of Object.entries(categories)) {
    const section = document.createElement('div');
    section.className = 'mb-10';
    section.innerHTML = `<h2 class="text-2xl font-bold text-purple-700 mb-4">${categorie}</h2>`;

    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';

    tissusList.forEach(tissu => {
      const card = creerCarteTissu(tissu);
      grid.appendChild(card);
    });

    section.appendChild(grid);
    container.appendChild(section);
  }

  afficherFavoris();
}

fetchTissus();
