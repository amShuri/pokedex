const $form = document.querySelector('#search-form');
const $searchBar = document.querySelector('#search-bar');
let pokemonMap;

document.addEventListener('DOMContentLoaded', initPokemonListByName);

$form.addEventListener('submit', (e) => {
  const userInput = $searchBar.value;

  renderPokemonCard(userInput);
  $searchBar.value = '';

  e.preventDefault();
});

async function initPokemonListByName() {
  const allPokemon = await getPokemonList();
  pokemonMap = mapPokemonByName(allPokemon);
}

function renderPokemonCard(userInput) {
  emptyCardContainer();

  const lowerCaseInput = userInput.toLowerCase();
  const { name, number, sprite } = pokemonMap[lowerCaseInput];

  if (lowerCaseInput === name) {
    createPokemonCard(name, number, sprite);
  }
}

function mapPokemonByName(pokemonList) {
  const pokemonByName = {};

  for (const pokemon of Object.values(pokemonList)) {
    const pokemonName = pokemon.name;
    const pokemonNumber = getPokemonNumber(pokemon.url);
    const pokemonSprite = getPokemonSprite(pokemonNumber);

    pokemonByName[pokemonName] = {
      name: pokemonName,
      number: pokemonNumber,
      sprite: pokemonSprite,
    };
  }

  return pokemonByName;
}
