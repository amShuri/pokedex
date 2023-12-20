const $searchBar = document.querySelector('#search-bar');

function initPokemonSearch() {
  document.querySelector('#search-form').addEventListener('submit', (event) => {
    event.preventDefault();
    handleSearch($searchBar.value);
    $searchBar.value = '';
  });
}

function handleSearch(userInput) {
  const matchedPokemon = getMatchedPokemon(pokemonMap, userInput);
  const searchResults = getSearchResults(matchedPokemon);

  if (!searchResults.length) {
    displaySearchError(userInput);
  } else {
    createPageCards(searchResults);
  }

  $autocompleteList.textContent = '';
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

function getSearchResults(matchedPokemon) {
  return matchedPokemon.map((match) => {
    const { name, url } = pokemonMap[match];
    return { name, url };
  });
}

function getMatchedPokemon(pokemonList, userInput) {
  const lowerCaseInput = new RegExp(userInput, 'i');

  return Object.keys(pokemonList).filter((pokemon) => pokemon.match(lowerCaseInput));
}

function displaySearchError(userInput) {
  $pageCards.textContent = '';
  $pageCards.insertAdjacentHTML(
    'beforeend',
    `
    <div class="border border-danger p-3" role="alert">
      <h1 class="fs-2">Search results for: <em>${userInput}</em></h1>
      <p class="m-0 "><em>No matches found.</em></p>
    </div>
    `
  );
}
