const $form = document.querySelector('#search-form');
const $searchBar = document.querySelector('#search-bar');

function initPokemonSearch() {
  $form.addEventListener('submit', (e) => {
    e.preventDefault();

    hideElement('#error-container');
    removeContent('#card-container');
    removeContent('#autocomplete-list');
    renderPokemonCard($searchBar.value);
    $searchBar.value = '';
    initBackButton();
  });
}

function renderPokemonCard(userInput) {
  const lowerCaseInput = new RegExp(userInput, 'i');
  const matchedPokemon = getMatchedPokemon(pokemonMap, lowerCaseInput);

  if (matchedPokemon.length > 0) {
    matchedPokemon.forEach((match) => {
      const { name, number, sprite } = pokemonMap[match];
      createPokemonCard(name, number, sprite);
    });
  } else {
    showElement('#error-container');
  }
}

function getMatchedPokemon(pokemonList, userInput) {
  return Object.keys(pokemonList).filter((pokemon) => pokemon.match(userInput));
}

function initBackButton() {
  const $backBtn = document.querySelector('#back-btn');
  $backBtn.textContent = `Back to Page #${currentPage}`;

  hideElement('#page-buttons');
  showElement('#back-container');

  $backBtn.addEventListener('click', () => {
    showElement('#page-buttons');
    hideElement('#back-container');
    removeContent('#card-container');
    renderPokemonPage();
  });
}
