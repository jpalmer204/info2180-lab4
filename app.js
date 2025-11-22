document.getElementById('searchBtn').addEventListener('click', () => {
  fetch('superheroes.php')
    .then(resp => resp.text())
    .then(text => {
      alert(text); 
    })
    .catch(err => console.error(err));
});