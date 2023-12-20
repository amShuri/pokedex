const API_URL = 'https://pokeapi.co/api/v2';
const $pageCards = document.querySelector('#page-cards');
let pokemonPerPage = 16;
let pageOffset = 0;

displayPage();

async function displayPage() {
  showPageLoading();
  const pokemonList = await getPokemonList(pokemonPerPage, pageOffset);
  createPageCards(pokemonList);
}

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

  const pokemonList = await fetchJson(`${API_URL}/pokemon-species?limit=${limit}&offset=${offset}`);
  localStorage.setItem(cacheKey, JSON.stringify(pokemonList.results));

  return pokemonList.results;
}

function createPageCards(pokemonList) {
  $pageCards.textContent = '';

  pokemonList.forEach((pokemon) => {
    const pokemonNumber = getPokemonNumber(pokemon.url);
    const pokemonSprite = getPokemonSprite(pokemonNumber);
    const paddedNumber = pokemonNumber.padStart(4, '0');

    $pageCards.insertAdjacentHTML(
      'beforeend',
      `
      <div class="col-lg-3 col-md-4 col-sm-4 col-6">
        <div class="pokemon-card" data-number="${pokemonNumber}">
          <a href="#" data-bs-toggle="modal" data-bs-target="#modal-pokemon">
            <img class="img-fluid" src="${pokemonSprite}" alt="Pokémon Sprite" />
            <div class="card-details">
              <p class="m-0 text-secondary" aria-hidden="true">#${paddedNumber}</p>
              <p class="m-0 text-muted fw-bold">${pokemon.name}</p>
            </div>
          </a>
        </div>
      </div>
      `
    );
  });
}

// Get the number from the pokemon's URL (e.g., '99' on https://pokeapi.co/api/v2/pokemon/99/)
function getPokemonNumber(pokemonUrl) {
  return pokemonUrl.match(/\/[0-9]+\//)[0].replaceAll('/', '');
}

function getPokemonSprite(pokemonNumber, isForModal = false) {
  const pageSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`;
  const modalSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`;

  return isForModal ? modalSprite : pageSprite;
}

function showPageLoading() {
  $pageCards.textContent = '';
  $pageCards.insertAdjacentHTML(
    'beforeend',
    `
    <div class="d-flex align-items-center gap-3 p-4 border border-secondary">
      <img src="img/page-loading.gif" alt="Page loading gif" />
      <span class="text-secondary">Loading Page ...</span>
    </div>
    `
  );
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
