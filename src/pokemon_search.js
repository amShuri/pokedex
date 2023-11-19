const $form = document.querySelector('#search-form');
const $searchBar = document.querySelector('#search-bar');
let pokemonMap;

document.addEventListener('DOMContentLoaded', async () => {
  await initPokemonListByName();

  $form.addEventListener('submit', (e) => {
    e.preventDefault();

    renderPokemonCard($searchBar.value);
    removeContent('#search-bar');
  });
});

async function initPokemonListByName() {
  const allPokemon = await getPokemonList();
  pokemonMap = mapPokemonByName(allPokemon);
}

function renderPokemonCard(userInput) {
  removeContent('#card-container');
  hideElement('#error-card-container');

  const lowerCaseInput = new RegExp(userInput, 'i');
  const matchedPokemon = getMatchedPokemon(pokemonMap, lowerCaseInput);

  if (matchedPokemon.length > 0) {
    matchedPokemon.forEach((match) => {
      const { name, number, sprite } = pokemonMap[match];
      createPokemonCard(name, number, sprite);
    });
  } else {
    showElement('#error-card-container');
  }
}

function getMatchedPokemon(pokemonMap, userInput) {
  return Object.keys(pokemonMap).filter((pokemon) => pokemon.match(userInput));
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
