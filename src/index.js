const API_URL = 'https://pokeapi.co/api/v2';
const $cardContainer = document.querySelector('#card-container');
let pokemonPerPage = 16;
let pageOffset = 0;

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
  try {
    showElement('#page-loading');
    hideElement('#card-container');

    const pokemonList = await getPokemonList(pokemonPerPage, pageOffset);

    pokemonList.forEach((pokemon) => {
      const pokemonName = pokemon.name;
      const pokemonNumber = getPokemonNumber(pokemon.url);
      const pokemonSprite = getPokemonSprite(pokemonNumber);

      createPokemonCard(pokemonName, pokemonNumber, pokemonSprite);
    });
  } catch (error) {
    console.log(error);
  } finally {
    hideElement('#page-loading');
    showElement('#card-container');
  }
}

function createPokemonCard(pokemonName, pokemonNumber, pokemonSprite) {
  const paddedNumber = pokemonNumber.padStart(4, '0');
  if ($cardContainer.children.length >= pokemonPerPage) {
    removeContent('#card-container');
  }

  $cardContainer.insertAdjacentHTML(
    'beforeend',
    `
    <div class="col-lg-3 col-md-4 col-sm-4 col-6">
      <div class="pokemon-card" data-pokemon-number="${pokemonNumber}">
        <a href="#" data-bs-toggle="modal" data-bs-target="#modal-pokemon">
          <img class="img-fluid" src="${pokemonSprite}" alt="Pokémon Sprite" />
          <div class="pokemon-info">
            <span class="number" aria-hidden="true">#${paddedNumber}</span>
            <h5 class="name">${pokemonName.replaceAll('-', ' ')}</h5>
          </div>
        </a>
      </div>
    </div>
    `
  );
}

// Get the number from the pokemon's URL (e.g., https://pokeapi.co/api/v2/pokemon/99/)
function getPokemonNumber(pokemonUrl) {
  // Match the pattern (e.g., '/99/') and remove the slashes.
  return pokemonUrl.match(/\/[0-9]+\//)[0].replaceAll('/', '');
}

function getPokemonSprite(pokemonNumber, isForModal = false) {
  const pageSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`;
  const modalSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`;

  return isForModal ? modalSprite : pageSprite;
}

function removeContent(element) {
  document.querySelector(element).textContent = '';
}

function showElement(element) {
  const $elementToShow = document.querySelector(element);

  $elementToShow.classList.remove('visually-hidden', 'invisible');
}

function hideElement(element) {
  const $elementToHide = document.querySelector(element);

  $elementToHide.classList.add('visually-hidden', 'invisible');
}
