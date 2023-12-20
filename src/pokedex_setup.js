let pokemonMap;
let totalPages;

// getPokemonList() retrieves a list of all available Pokémon,
// which is used to initialize existing features, avoiding the
// need of making the same API call on different files.
getPokemonList().then((list) => {
  pokemonMap = mapPokemonByName(list);
  totalPages = Math.ceil(list.length / pokemonPerPage);

  showPageInfo();
  initPokemonSearch();
});

function mapPokemonByName(pokemonList) {
  const pokemonByName = {};

  Object.values(pokemonList).forEach((pokemon) => {
    const { name, url } = pokemon;
    pokemonByName[pokemon.name] = { name, url };
  });

  return pokemonByName;
}
