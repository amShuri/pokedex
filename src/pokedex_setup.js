let pokemonMap;
let totalPages;

// getPokemonList() retrieves a list of all available Pokémon,
// which is used to initialize existing features, avoiding the
// need of making the same API call on different files.
getPokemonList().then((list) => {
  pokemonMap = mapPokemonByName(list);
  totalPages = Math.ceil(list.length / pokemonPerPage);

  initPagination();
  initPokemonSearch();
});

function mapPokemonByName(pokemonList) {
  const pokemonByName = {};

  Object.values(pokemonList).forEach((pokemon) => {
    const pokemonName = pokemon.name.replaceAll('-', ' ');
    const pokemonNumber = getPokemonNumber(pokemon.url);
    const pokemonSprite = getPokemonCardSprite(pokemonNumber);

    pokemonByName[pokemonName] = {
      name: pokemonName,
      number: pokemonNumber,
      sprite: pokemonSprite,
    };
  });

  return pokemonByName;
}
