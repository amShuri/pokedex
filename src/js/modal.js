function setupPokemonModalButton() {
  const $pokemonList = document.querySelector("#pokemon-list");

  $pokemonList.addEventListener("click", (e) => {
    const $pokemonBox = e.target.closest(".pokemon-box");
    if (!$pokemonBox) return;

    const $pokemonImg = $pokemonBox.querySelector(".pokemon-img");
    const pokemonNumber = $pokemonImg.dataset.pokemonNumber;

    getPokemonInfo(pokemonNumber).then((pokemon) => {
      const pokemonInfo = formatPokemonInfo(pokemon);
      createPokemonModal(pokemonInfo);
    });
  });
}
