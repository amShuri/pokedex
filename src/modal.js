let pickedPokemon;

$cardContainer.addEventListener('click', (e) => {
  const $pokemonCard = e.target.closest('.pokemon-card');
  if (!$pokemonCard) return;

  pickedPokemon = $pokemonCard.dataset.pokemonNumber;

  renderPokemonModal();
});

async function renderPokemonModal() {
  try {
    hideElement('#modal-data');
    showElement('#modal-loading');

    const pokemonData = await getPokemonData(pickedPokemon);
    createPokemonModal(pokemonData);
  } catch (error) {
    console.log(error);
  } finally {
    showElement('#modal-data');
    hideElement('#modal-loading');
  }
}

async function getPokemonData(pokemonNumber) {
  const cacheKey = `pokemon_${pokemonNumber}`;
  const cachedPokemon = localStorage.getItem(cacheKey);

  if (cachedPokemon) {
    return JSON.parse(cachedPokemon);
  }

  const pokemon = await fetchJson(`${API_URL}/pokemon/${pokemonNumber}`);
  const pokemonData = {
    name: pokemon.name,
    number: getPokemonNumber(pokemon.species.url),
    type: getPokemonType(pokemon.types),
    height: convertUnit(pokemon.height, 'm'),
    weight: convertUnit(pokemon.weight, 'kg'),
    abilities: getPokemonAbilities(pokemon.abilities),
    ['held items']: getPokemonHeldItems(pokemon.held_items),
    forms: await getPokemonForms(pokemon.species.name),
  };

  localStorage.setItem(cacheKey, JSON.stringify(pokemonData));
  return pokemonData;
}

function createPokemonModal(pokemonData) {
  // Empty the modal before populating it
  removeModalContent();

  const $table = document.querySelector('tbody');

  Object.keys(pokemonData).forEach((key) => {
    const $tableRow = document.createElement('tr');
    const $titleCell = document.createElement('th');
    const $dataCell = document.createElement('td');
    const dataProperty = key;
    const dataValues = pokemonData[key];

    $titleCell.scope = 'row';
    $titleCell.textContent = dataProperty;

    if (!Array.isArray(dataValues)) {
      populateContent($dataCell, dataProperty, dataValues);
    } else {
      populateArrayContent($dataCell, dataProperty, dataValues);
    }

    $tableRow.append($titleCell, $dataCell);
    $table.appendChild($tableRow);
  });

  createPokemonSprite(pickedPokemon);
}

function createPokemonSprite(pokemonNumber) {
  const spriteUrl = getPokemonSprite(pokemonNumber, true);
  const $spriteContainer = document.querySelector('#pokemon-sprite');
  const $spriteImg = document.createElement('img');

  $spriteImg.src = spriteUrl;
  $spriteImg.classList.add('modal-sprite', 'img-fluid');

  $spriteContainer.appendChild($spriteImg);
}

function populateContent($element, property, propertyValues) {
  const $dataCell = $element;
  const NUMBER_PROPERTY = 'number';

  if (property === NUMBER_PROPERTY) {
    const paddedNumber = propertyValues.toString().padStart(4, '0');
    $dataCell.textContent = paddedNumber;
  } else {
    $dataCell.textContent = propertyValues;
  }
}

function populateArrayContent($element, property, propertyValues) {
  const $dataCell = $element;
  const TYPE_PROPERTY = 'type';
  const FORMS_PROPERTY = 'forms';

  // The 'forms' property will always be an array. It is the only property that uses the <a>
  // HTML element because it links to other pokemon, so this conditional is necessary.
  if (property === FORMS_PROPERTY) {
    $dataCell.classList.add(property);
    setupEventListeners($dataCell);

    propertyValues.forEach((propertyValue) => {
      const { name, number, is_default } = propertyValue;
      const $formLink = createPokemonLink(name, number, is_default);

      $dataCell.appendChild($formLink);
    });
  } else {
    propertyValues.forEach((propertyValue) => {
      const $pokemonInfo = document.createElement('span');

      // Replace hyphens with a white-space for better readability.
      // (The API uses hyphens to separate words in properties).
      $pokemonInfo.textContent = propertyValue.replaceAll('-', ' ');

      // Set specific classes for each Pokémon type to apply individual styles.
      property === TYPE_PROPERTY
        ? $pokemonInfo.classList.add(property, propertyValue)
        : $pokemonInfo.classList.add('d-block');

      $dataCell.appendChild($pokemonInfo);
    });
  }
}

function createPokemonLink(formName, formNumber, formDefault) {
  const $link = document.createElement('a');
  $link.href = '#';
  $link.dataset.number = formNumber;
  $link.textContent = formDefault ? `${formName} (default)` : formName;
  $link.classList.add('link-secondary', 'link-offset-2', 'link-underline-opacity-50');
  return $link;
}

function setupEventListeners(formsElement) {
  formsElement.addEventListener('click', (e) => {
    if (e.target.tagName !== 'A' || pickedPokemon === e.target.dataset.number) return;

    pickedPokemon = e.target.dataset.number;

    renderPokemonModal();
  });
}

function removeModalContent() {
  removeContent('#pokemon-details');
  removeContent('#pokemon-sprite');
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

async function getPokemonForms(pokemonName) {
  const pokemonForm = await fetchJson(`${API_URL}/pokemon-species/${pokemonName}`);
  if (pokemonForm.varieties.length === 1) return 'no additional forms';

  return pokemonForm.varieties.map((form) => {
    const name = form.pokemon.name;
    const number = getPokemonNumber(form.pokemon.url);
    const { is_default } = form;

    return {
      name,
      number,
      is_default,
    };
  });
}

// Convert the API values (in decimeters) to meters.
function convertUnit(value, unit) {
  const LENGTH_SCALE = 10;
  return `${value / LENGTH_SCALE} ${unit}`;
}
