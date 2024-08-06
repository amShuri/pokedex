import { displayPokemonList } from "./ui/list.js";
import { displayPokemonModal } from "./ui/modal.js";
import { updatePageOffset } from "./utils/pagination.js";
import {
  getPokemonList,
  getPokemonInfoForModal,
  pokemonPerPage
} from "./services/pokemon.js";
import {
  updateTotalPages,
  updateCurrentPage,
  updatePageBtnState
} from "./ui/pagination.js";

export const $previousPageBtn = document.querySelector("#previous-page-btn");
export const $nextPageBtn = document.querySelector("#next-page-btn");

export async function changePage(offset = 0) {
  const pokemonList = await getPokemonList(offset);

  displayPokemonList(pokemonList);
  updatePageOffset(pokemonList.previous, pokemonList.next)
  updatePageBtnState(pokemonList.previous, pokemonList.next)
  updateTotalPages(pokemonList.count, pokemonPerPage)
  updateCurrentPage(offset, pokemonPerPage);
}

export function setupPreviousPage() {
  $previousPageBtn.addEventListener("click", (e) => {
    const previousPage = e.currentTarget.dataset.previousOffset;
    if (!previousPage) return;

    const offset = previousPage.match(/\b(\d+)/)[0];
    changePage(offset);
  });
}

export function setupNextPage() {
  $nextPageBtn.addEventListener("click", (e) => {
    const nextPage = e.currentTarget.dataset.nextOffset;
    if (!nextPage) return;

    const offset = nextPage.match(/\b(\d+)/)[0];
    changePage(offset);
  });
}

export function setupPokemonModal() {
  const $pokemonList = document.querySelector("#pokemon-list");

  $pokemonList.addEventListener("click", async (e) => {
    const $pokemonBox = e.target.closest(".pokemon-box");
    if (!$pokemonBox) return;

    const pokemonNumber = $pokemonBox.dataset.pokemonNumber;
    const pokemonInfo = await getPokemonInfoForModal(pokemonNumber)
    displayPokemonModal(pokemonInfo);
  });
}
