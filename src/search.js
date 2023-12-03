const $form = document.querySelector('#search-form');
const $searchBar = document.querySelector('#search-bar');
let matchedPokemon;

function initPokemonSearch() {
  $form.addEventListener('submit', (e) => {
    e.preventDefault();

    handleSearch();
  });
}

function handleSearch() {
  removeContent('#card-container');
  removeContent('#autocomplete-list');
  matchedPokemon = getMatchedPokemon(pokemonMap, $searchBar.value);

  if (!matchedPokemon.length) {
    showElement('#error-container');
  } else {
    hideElement('#error-container');
    renderPokemonCards($searchBar.value);
  }

  $searchBar.value = '';
  initBackButton();
}

function renderPokemonCards() {
  matchedPokemon.forEach((match) => {
    const { name, number, sprite } = pokemonMap[match];
    createPokemonCard(name, number, sprite);
  });
}

function getMatchedPokemon(pokemonList, userInput) {
  const lowerCaseInput = new RegExp(userInput, 'i');

  return Object.keys(pokemonList).filter((pokemon) => pokemon.match(lowerCaseInput));
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
