function createPokemonElement(pokemon, pokemonContainer) {
  const $pokemonEl = document.createElement("div");
  $pokemonEl.classList.add("pokemon-box");
  $pokemonEl.id = "pokemon-box";

  $pokemonEl.insertAdjacentHTML(
    "beforeend",
    `
      <p class="pokemon-number m-0">#${pokemon.number}</p>
      <img 
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.number}.png" 
        class="img-fluid pokemon-img"
        alt="pokemon sprite"
        aria-label="Image of ${pokemon.name}"
        data-pokemon-name="${pokemon.name}"
        data-pokemon-number="${pokemon.number}"
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
