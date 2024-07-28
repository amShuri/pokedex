function formatPokemonList(pokemonList) {
  return pokemonList.map((pokemon) => {
    const idMatch = pokemon.url.match(/\d+\/$/);
    const pokemonId = idMatch ? idMatch[0].replace("/", "") : null;
    const pokemonName = pokemon.name;
    return {
      name: pokemonName,
      id: Number(pokemonId),
    };
  });
}
