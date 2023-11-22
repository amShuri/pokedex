const $autocompleteList = document.querySelector('#autocomplete-list');

$searchBar.addEventListener('blur', () => {
  hideElement('#autocomplete-list');
});

$searchBar.addEventListener('focus', () => {
  showElement('#autocomplete-list');
});

$searchBar.addEventListener('input', (e) => {
  renderAutocompleteList(e.target.value);
});

$autocompleteList.addEventListener('mousedown', (e) => {
  const pickedPokemon = e.target.closest('.autocomplete-option').querySelector('input').value;
  $searchBar.value = pickedPokemon;
});

function renderAutocompleteList(userInput) {
  const pokemonNames = Object.keys(pokemonMap);
  const autocompleteList = getAutocompleteList(pokemonNames, userInput);

  removeContent('#autocomplete-list');

  if (autocompleteList) {
    createAutocompleteOptions(autocompleteList);
  }
}

function getAutocompleteList(pokemonList, userInput) {
  if (!userInput) return;

  const lowerCaseInput = new RegExp(userInput, 'i');

  return pokemonList.filter((pokemon) => pokemon.match(lowerCaseInput));
}

function createAutocompleteOptions(matchedPokemon) {
  for (let i = 0; i < matchedPokemon.length; i += 1) {
    $autocompleteList.insertAdjacentHTML(
      'beforeend',
      `
      <div class="autocomplete-option">
        <span>${matchedPokemon[i]}</span>
        <input type="hidden" value="${matchedPokemon[i]}">
      </div>
      `
    );
  }
}
