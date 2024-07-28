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
