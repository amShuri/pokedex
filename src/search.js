const $form = document.querySelector('#search-form');
const $searchBar = document.querySelector('#search-bar');

function initPokemonSearch() {
  $form.addEventListener('submit', (e) => {
    e.preventDefault();

    hideElement('#error-card-container');
    removeContent('#card-container');
    renderPokemonCard($searchBar.value);
    removeContent('#search-bar');
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
    showElement('#error-card-container');
  }
}

function getMatchedPokemon(pokemonList, userInput) {
  return Object.keys(pokemonList).filter((pokemon) => pokemon.match(userInput));
}
