import { displayPokemonModal } from "./ui.js";

export function setupPokemonModal() {
  document.querySelector("#pokemon-list").addEventListener("click", (e) => {
    const $pokemonBox = e.target.closest(".pokemon-box");
    if (!$pokemonBox) return;

    displayPokemonModal($pokemonBox.dataset.pokemonNumber);
  });
}
