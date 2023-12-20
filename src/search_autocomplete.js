const $autocompleteList = document.querySelector('#autocomplete-list');

$searchBar.addEventListener('blur', hideAutocompleteList);

$searchBar.addEventListener('focus', showAutocompleteList);

$searchBar.addEventListener('input', (event) => {
  const searchInput = event.target.value;
  displayAutocompleteList(searchInput);
});

$autocompleteList.addEventListener('mousedown', (e) => {
  const $autocompleteOption = e.target.closest('.autocomplete-option');
  if (!$autocompleteOption) return;

  $searchBar.value = $autocompleteOption.dataset.pokemonName;
});

function displayAutocompleteList(userInput) {
  $autocompleteList.textContent = '';

  const autocompleteList = getAutocompleteList(Object.keys(pokemonMap), userInput);

  if (autocompleteList) {
    createAutocompleteOptions(autocompleteList);
  }
}

function getAutocompleteList(pokemonNames, userInput) {
  if (!userInput) return;

  const lowerCaseInput = new RegExp(userInput, 'i');

  return pokemonNames.filter((names) => names.match(lowerCaseInput));
}

function createAutocompleteOptions(matchList) {
  matchList.forEach((match) => {
    $autocompleteList.insertAdjacentHTML(
      'beforeend',
      `
      <div class="autocomplete-option" data-pokemon-name="${match}">
        <span>${match}</span>
      </div>
      `
    );
  });
}

function showAutocompleteList() {
  $autocompleteList.classList.remove('visually-hidden', 'invisible');
}

function hideAutocompleteList() {
  $autocompleteList.classList.add('visually-hidden', 'invisible');
}
