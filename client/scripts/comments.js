
async function fetchCommentaires(tissuId, container) {
  const res = await fetch(`/api/commentaires/${tissuId}`);
  const commentaires = await res.json();

  const comDiv = document.createElement('div');
  comDiv.className = "mt-2 p-2 bg-gray-50 rounded text-sm";
  comDiv.innerHTML = "<h4 class='font-bold mb-2 text-yellow-600'>Commentaires :</h4>";

  commentaires.forEach(c => {
    const item = document.createElement('div');
    item.className = "mb-2 border-b pb-1";
    item.innerHTML = `
      <p class="text-gray-800"><strong>${c.nom}</strong> ${"★".repeat(c.note)}${"☆".repeat(5 - c.note)}</p>
      <p>${c.message}</p>
    `;
    comDiv.appendChild(item);
  });

  container.appendChild(comDiv);
}

async function envoyerCommentaire(form, tissuId, container) {
  const formData = new FormData(form);
  const data = {
    tissuId,
    nom: formData.get('nom'),
    message: formData.get('message'),
    note: parseInt(formData.get('note'))
  };
  await fetch('/api/commentaires', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  form.reset();
  container.innerHTML = '';
  fetchCommentaires(tissuId, container);
}
