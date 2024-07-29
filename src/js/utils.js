function displayPokemonList(offset) {
  getPokemonList(offset).then((list) => {
    const pokemonList = formatPokemonList(list.results);
    const $pokemonContainer = document.querySelector("#pokemon-list");
    $pokemonContainer.innerHTML = "";

    Object.values(pokemonList).forEach((pokemon) => {
      createPokemonElement(pokemon, $pokemonContainer);
    });

    updatePreviousPageButton(list.previous);
    updateNextPageButton(list.next);
    updatePageCount(list.count);
  });
}

function formatPokemonList(pokemonList) {
  return pokemonList.map((pokemon) => {
    const idMatch = pokemon.url.match(/\d+\/$/);
    const pokemonNumber = idMatch ? idMatch[0].replace("/", "") : null;
    const pokemonName = pokemon.name;
    return {
      name: pokemonName,
      number: Number(pokemonNumber),
    };
  });
}
