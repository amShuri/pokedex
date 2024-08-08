import { POKEMON_PER_PAGE } from "./api/pokemon.js";
import { getPokemonList, getPokemon } from "./services/pokemon.js";
import { renderPokemonList, showLoadingTextForList } from "./ui/list.js";
import { renderPokemonModal, showLoadingTextForModal } from "./ui/modal.js";
import { updatePageOffset, getPageOffsetFromUrl } from "./utils/pagination.js";

import {
  updateTotalPages,
  updateCurrentPage,
  updatePageBtnState,
} from "./ui/pagination.js";

export const $previousPageBtn = document.querySelector("#previous-page-btn");
export const $nextPageBtn = document.querySelector("#next-page-btn");

export async function changePage(offset = 0) {
  showLoadingTextForList();

  const pokemonList = await getPokemonList(offset);
  renderPokemonList(pokemonList);
  updatePageOffset(pokemonList.previous, pokemonList.next);
  updatePageBtnState(pokemonList.previous, pokemonList.next);
  updateTotalPages(pokemonList.count, POKEMON_PER_PAGE);
  updateCurrentPage(offset, POKEMON_PER_PAGE);
}

export function setupPreviousPage() {
  $previousPageBtn.addEventListener("click", (e) => {
    const previousPageUrl = e.currentTarget.dataset.previousOffset;
    if (!previousPageUrl) return;

    changePage(getPageOffsetFromUrl(previousPageUrl));
  });
}

export function setupNextPage() {
  $nextPageBtn.addEventListener("click", (e) => {
    const nextPageUrl = e.currentTarget.dataset.nextOffset;
    if (!nextPageUrl) return;

    changePage(getPageOffsetFromUrl(nextPageUrl));
  });
}

export function setupPokemonModal() {
  const $pokemonList = document.querySelector("#pokemon-list");

  $pokemonList.addEventListener("click", async (e) => {
    const $pokemonBox = e.target.closest(".pokemon-box");
    if (!$pokemonBox) return;

    showLoadingTextForModal();
    const pokemonNumber = $pokemonBox.dataset.pokemonNumber;
    const pokemonInfo = await getPokemon(pokemonNumber);
    renderPokemonModal(pokemonInfo);
  });
}
