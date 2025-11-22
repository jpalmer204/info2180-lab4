function sanitizeInput(str) {
  return str.replace(/<[^>]*>?/gm, '').trim();
}
document.getElementById('searchBtn').addEventListener('click', () => {
  const raw = document.getElementById('query').value;
  const query = encodeURIComponent(sanitizeInput(raw));
  const url = query ? `superheroes.php?query=${query}` : 'superheroes.php';
  
  fetch(url)
    .then(resp => resp.json()) 
    .then(data => {
      const result = document.getElementById('result');
      if (!data) {
        result.innerHTML = '<p>Superhero not found</p>';
        return;
      }
      if (Array.isArray(data)) {
        result.innerHTML = '<ul>' + data.map(s => `<li>${s.alias} (${s.name})</li>`).join('') + '</ul>';
      } else {
        result.innerHTML = `<h3>${escapeHtml(data.alias)}</h3>
                    <h4>${escapeHtml(data.name)}</h4>
                    ${data.biography}`;
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById('result').innerHTML = '<p>Error loading data</p>';
    });
});


function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"'\/]/g, function (s) {
    const entityMap = { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;' };
    return entityMap[s];
  });
}