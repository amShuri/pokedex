const API_URL = 'https://pokeapi.co/api/v2';
let limitPerPage = 12;
let startOfPage = 0;

document.addEventListener('DOMContentLoaded', renderPokemonPage);

async function fetchJson(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

async function getPokemonList(limit = 100000, offset = 0) {
  const cacheKey = `offset[${offset}]_limit[${limit}]`;
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const pokemonList = await fetchJson(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`);
  localStorage.setItem(cacheKey, JSON.stringify(pokemonList.results));

  return pokemonList.results;
}

async function renderPokemonPage() {
  const pokemonList = await getPokemonList(limitPerPage, startOfPage);

  pokemonList.forEach((pokemon) => {
    const pokemonName = pokemon.name;
    const pokemonNumber = getPokemonNumber(pokemon.url);
    const pokemonSprite = getPokemonSprite(pokemonNumber);

    createPokemonCard(pokemonName, pokemonNumber, pokemonSprite);
  });
}

function createPokemonCard(pokemonName, pokemonNumber, pokemonSprite) {
  const $cardContainer = document.querySelector('#card-container');
  const paddedNumber = pokemonNumber.padStart(4, '0');

  $cardContainer.insertAdjacentHTML(
    'beforeend',
    `
    <div class="col-lg-3 col-md-4 col-sm-4 col-6">
      <a href="#">
        <div class="pokemon-card">
          <img class="img-fluid" src="${pokemonSprite}" alt="Sprite of ${pokemonName}" />
          <div class="pokemon-info">
            <p class="number">#${paddedNumber}</p>
            <h5 class="name">${pokemonName}</h5>
          </div>
        </div>
      </a>
    </div>
    `
  );
}

// Get the number from the pokemon's URL (e.g., https://pokeapi.co/api/v2/pokemon/99/)
function getPokemonNumber(pokemonUrl) {
  // Match the pattern (e.g., '/99/') and remove the slashes.
  return pokemonUrl.match(/\/[0-9]+\//)[0].replaceAll('/', '');
}

function getPokemonSprite(pokemonNumber) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`;
}

function removeContent(element) {
  document.querySelector(element).textContent = '';
}
