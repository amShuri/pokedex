function displayPokemonList() {
  getPokemonList(0, 30).then((list) => {
    const pokemonList = formatPokemonList(list.results);
    const $pokemonContainer = document.querySelector("#pokemon-list");
    Object.values(pokemonList).forEach((pokemon) => {
      createPokemonElement(pokemon, $pokemonContainer);
    });
  });
}

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

function createPokemonElement(pokemon, pokemonContainer) {
  const $pokemonEl = document.createElement("div");
  $pokemonEl.classList.add("pokemon-box");
  $pokemonEl.id = "pokemon-box";

  $pokemonEl.insertAdjacentHTML(
    "beforeend",
    `
      <p class="pokemon-id m-0">#${pokemon.id}</p>
      <img 
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" 
        class="img-fluid pokemon-img"
        alt="pokemon sprite"
        aria-label="Image of ${pokemon.name}"
        data-name="${pokemon.name}"
        data-id="${pokemon.id}"
        title="${pokemon.name}"
        height=100
        width=100
      >
      <p class="pokemon-name m-0 mt-1">
        ${pokemon.name}
      </p>
    `
  );

  pokemonContainer.appendChild($pokemonEl);
}
