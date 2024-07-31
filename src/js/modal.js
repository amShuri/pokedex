function setupPokemonModalButton() {
  const $pokemonList = document.querySelector("#pokemon-list");

  $pokemonList.addEventListener("click", (e) => {
    const $pokemonBox = e.target.closest(".pokemon-box");
    if (!$pokemonBox) return;

    const pokemonNumber = $pokemonBox.dataset.pokemonNumber;

    displayPokemonModal(pokemonNumber);
  });
}
