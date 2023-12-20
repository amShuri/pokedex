const $modal = document.querySelector('.modal-body');

$pageCards.addEventListener('click', (e) => {
  const $pokemonCard = e.target.closest('.pokemon-card');
  if ($pokemonCard) {
    const pokemonNumber = $pokemonCard.dataset.number;
    displayModal(pokemonNumber);
  }
});

async function displayModal(pokemonNumber) {
  showModalLoading();
  const pokemonData = await getPokemonData(pokemonNumber);
  populateModal(pokemonData, getPokemonSprite(pokemonNumber, true));

  showFormsLoading();
  const pokemonForms = await getPokemonSpecies(pokemonData.forms);
  populateFormsRow(pokemonForms, displayModal);
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
    number: getPokemonNumber(pokemon.species.url).padStart(4, '0'),
    type: getPokemonType(pokemon.types),
    height: convertUnit(pokemon.height, 'm'),
    weight: convertUnit(pokemon.weight, 'kg'),
    abilities: getPokemonAbilities(pokemon.abilities),
    ['held items']: getPokemonHeldItems(pokemon.held_items),
    forms: pokemon.species.name,
  };

  localStorage.setItem(cacheKey, JSON.stringify(pokemonData));
  return pokemonData;
}

async function getPokemonSpecies(pokemonName) {
  const cacheKey = `species_${pokemonName}`;
  const cachedPokemon = localStorage.getItem(cacheKey);

  if (cachedPokemon) {
    return JSON.parse(cachedPokemon);
  }

  const pokemon = await fetchJson(`${API_URL}/pokemon-species/${pokemonName}`);
  const pokemonForms = getPokemonForms(pokemon.varieties);

  localStorage.setItem(cacheKey, JSON.stringify(pokemonForms));
  return pokemonForms;
}

function populateModal(pokemonData, spriteUrl) {
  $modal.textContent = '';
  $modal.insertAdjacentHTML(
    'beforeend',
    `
    <img src="${spriteUrl}" class="img-fluid" id="modal-img">
    <table class="table m-0">
      <tbody id="modal-table"></tbody>
    </table>
    `
  );

  for (const property in pokemonData) {
    const values = pokemonData[property];
    document.querySelector('#modal-table').insertAdjacentHTML(
      'beforeend',
      `
      <tr>
        <th scope="row" class="text-secondary">${property}</th>
        <td class="${property}">
          ${Array.isArray(values) ? createArrayContent(values) : values}
        </td>
      </tr>
      `
    );
  }
}

function populateFormsRow(pokemonForms, updateModalCallback) {
  const $forms = document.querySelector('.forms');
  $forms.textContent = '';

  if (pokemonForms.length <= 1) {
    $forms.textContent = 'no additional forms';
    return;
  }

  pokemonForms.forEach((form) => {
    $forms.insertAdjacentHTML(
      'beforeend',
      `
      <a href='#' class="text-secondary link-offset-2" data-number="${form.number}">${form.name}</a>
      `
    );
  });

  $forms.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.tagName !== 'A') return;

    const pokemonNumber = event.target.dataset.number;

    updateModalCallback(pokemonNumber);
  });
}

function createArrayContent(pokemonInfo) {
  const html = pokemonInfo.map((info) => `<div class="${info}">${info}</div>`);
  return html.join('');
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

function getPokemonForms(pokemonProperties) {
  return pokemonProperties.map((pokemonForm) => {
    const name = pokemonForm.pokemon.name;
    const number = getPokemonNumber(pokemonForm.pokemon.url);
    return { name, number };
  });
}

// Convert the API values (in decimeters) to meters.
function convertUnit(value, unit) {
  const LENGTH_SCALE = 10;
  return `${value / LENGTH_SCALE} ${unit}`;
}

function showModalLoading() {
  $modal.textContent = '';
  $modal.insertAdjacentHTML(
    'beforeend',
    `
    <div class="d-flex align-items-center gap-3 p-2">
      <div class="spinner-grow text-secondary" role="status"></div>
      <span class="text-secondary">Loading Pokémon ...</span>
    </div>
    `
  );
}

function showFormsLoading() {
  document.querySelector('.forms').textContent = 'Loading...';
}
