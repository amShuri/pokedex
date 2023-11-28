const $pokemonModal = document.querySelector('.modal-pokemon');
let pickedPokemon;

$cardContainer.addEventListener('click', (e) => {
  const $pokemonCard = e.target.closest('.pokemon-card');
  if (!$pokemonCard) return;

  pickedPokemon = $pokemonCard.querySelector('.name').textContent;

  renderPokemonModal();
});

async function renderPokemonModal() {
  removeContent('.modal-pokemon');
  removeContent('.modal-sprite');

  const pokemonData = await getPokemonData(pickedPokemon);
  const pokemonSprite = getPokemonSprite(pokemonData.number);

  createPokemonModal(pokemonData, pokemonSprite);
}

async function getPokemonData(pokemonName) {
  const cacheKey = `pokemon_${pokemonName}`;
  const cachedPokemon = localStorage.getItem(cacheKey);

  if (cachedPokemon) {
    return JSON.parse(cachedPokemon);
  }

  const pokemon = await fetchJson(`${API_URL}/pokemon/${pokemonName}`);
  const pokemonData = {
    name: pokemon.name,
    number: pokemon.id,
    type: getPokemonType(pokemon.types),
    height: `${pokemon.height / 10}m`,
    weight: `${pokemon.weight / 10}kg`,
    abilities: getPokemonAbilities(pokemon.abilities),
    ['held items']: getPokemonHeldItems(pokemon.held_items),
  };

  localStorage.setItem(cacheKey, JSON.stringify(pokemonData));
  return pokemonData;
}

function createPokemonModal(pokemonData, pokemonSprite) {
  createPokemonSprite(pokemonSprite);

  Object.keys(pokemonData).forEach((key) => {
    const $tableRow = document.createElement('tr');
    const $titleCell = document.createElement('th');
    const $dataCell = document.createElement('td');

    $titleCell.scope = 'row';
    $titleCell.textContent = key;

    if (!Array.isArray(pokemonData[key])) {
      populateContent($dataCell, key, pokemonData[key]);
    } else {
      populateArrayContent($dataCell, key, pokemonData[key]);
    }

    $tableRow.append($titleCell, $dataCell);
    $pokemonModal.appendChild($tableRow);
  });
}

function createPokemonSprite(spriteUrl) {
  const $modalSprite = document.querySelector('.modal-sprite');
  const $sprite = document.createElement('img');

  $sprite.src = spriteUrl;
  $sprite.className = 'img-fluid modal-sprite';

  $modalSprite.appendChild($sprite);
}

function populateContent($element, propertyName, propertyValue) {
  const $dataCell = $element;

  if (propertyName === 'number') {
    const paddedNumber = propertyValue.toString().padStart(4, '0');
    $dataCell.textContent = paddedNumber;
  } else {
    $dataCell.textContent = propertyValue;
  }
}

function populateArrayContent($element, propertyName, propertyValues) {
  const $dataCell = $element;

  propertyValues.forEach((value) => {
    const $pokemonInfo = document.createElement('span');

    // Replace hyphens with a white-space for better readability.
    // (The API uses hyphens to separate words in properties).
    $pokemonInfo.textContent = value.replaceAll('-', ' ');

    // Set specific classes for each Pokémon type to apply individual styles.
    propertyName === 'type'
      ? $pokemonInfo.classList.add(propertyName, value)
      : $pokemonInfo.classList.add('d-block');

    $dataCell.appendChild($pokemonInfo);
  });
}

// Helper functions to get specific Pokémon data.
function getPokemonAbilities(pokemonProperties) {
  return pokemonProperties.map((pokemonAbility) => {
    const { ability, is_hidden } = pokemonAbility;
    return is_hidden ? `${ability.name} (hidden ability)` : ability.name;
  });
}

function getPokemonType(pokemonProperties) {
  return pokemonProperties.map((pokemonType) => {
    const { type } = pokemonType;
    return type.name;
  });
}

function getPokemonHeldItems(pokemonProperties) {
  const itemList = pokemonProperties.map((pokemonItem) => pokemonItem.item.name);
  return itemList.length > 0 ? itemList : 'no held items';
}
