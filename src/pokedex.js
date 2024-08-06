import { displayPokemonList } from "./ui/list.js";
import { displayPokemonModal } from "./ui/modal.js";

export const $previousPageBtn = document.querySelector("#previous-page-btn");
export const $nextPageBtn = document.querySelector("#next-page-btn");

export function setupPreviousPage() {
  $previousPageBtn.addEventListener("click", (e) => {
    const previousPage = e.currentTarget.dataset.previousOffset;
    if (!previousPage) return;

    const offset = previousPage.match(/\b(\d+)/)[0];
    displayPokemonList(offset);
  });
}

export function setupNextPage() {
  $nextPageBtn.addEventListener("click", (e) => {
    const nextPage = e.currentTarget.dataset.nextOffset;
    if (!nextPage) return;

    const offset = nextPage.match(/\b(\d+)/)[0];
    displayPokemonList(offset);
  });
}

export function setupPokemonModal() {
  document.querySelector("#pokemon-list").addEventListener("click", (e) => {
    const $pokemonBox = e.target.closest(".pokemon-box");
    if (!$pokemonBox) return;

    displayPokemonModal($pokemonBox.dataset.pokemonNumber);
  });
}
