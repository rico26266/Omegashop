
async function fetchProduit() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const res = await fetch('/api/tissus/' + id);
  const tissu = await res.json();

  const container = document.getElementById('produit-container');
  container.innerHTML = `
    <img src="${tissu.image}" alt="${tissu.numero}" class="w-full h-80 object-cover rounded-lg shadow" />
    <div>
      <h1 class="text-3xl font-bold text-purple-700 mb-2">${tissu.numero}</h1>
      <p class="mb-2 text-gray-600">Catégorie : <strong>${tissu.categorie}</strong></p>
      <p class="mb-4">${tissu.description}</p>
      <p class="text-2xl font-bold text-green-600">${tissu.prix} €</p>
      <button onclick="toggleFavori(${JSON.stringify(tissu).replace(/"/g, '&quot;')})"
        class="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
        Ajouter aux favoris
      </button>
    </div>
  `;

  const comDiv = document.getElementById('commentaires');
  comDiv.innerHTML = `
    <h2 class="text-xl font-bold text-purple-600 mb-2">Commentaires</h2>
    <div id="comment-container"></div>
    <form id="comment-form" class="mt-4">
      <input name="nom" placeholder="Votre nom" class="border p-2 rounded mr-2" required>
      <input name="note" type="number" min="1" max="5" value="5" class="border p-2 rounded mr-2" required>
      <input name="message" placeholder="Votre commentaire" class="border p-2 rounded mr-2" required>
      <button type="submit" class="bg-purple-600 text-white px-4 py-2 rounded">Envoyer</button>
    </form>
  `;

  const commentContainer = document.getElementById('comment-container');
  fetchCommentaires(id, commentContainer);

  const form = document.getElementById('comment-form');
  form.onsubmit = (e) => {
    e.preventDefault();
    envoyerCommentaire(form, id, commentContainer);
  };
}

fetchProduit();

function toggleFavori(tissu) {
  let favs = JSON.parse(localStorage.getItem('favoris')) || [];
  const index = favs.findIndex(f => f._id === tissu._id);
  if (index > -1) {
    favs.splice(index, 1);
  } else {
    favs.push(tissu);
  }
  localStorage.setItem('favoris', JSON.stringify(favs));
  alert('Favori mis à jour !');
}
