import { displayPokemonList } from "./ui.js";

const $previousPageBtn = document.querySelector("#previous-page-btn");
const $nextPageBtn = document.querySelector("#next-page-btn");

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

export function updatePageOffset(previousOffset, nextOffset) {
  updatePreviousPageOffset(previousOffset);
  updateNextPageOffset(nextOffset);
}

export function updatePageCount(pokemonCount, pokemonPerPage, offset) {
  updateTotalPages(pokemonCount, pokemonPerPage);
  updateCurrentPage(offset, pokemonPerPage);
}

function updateNextPageOffset(nextOffset) {
  if (nextOffset) {
    $nextPageBtn.disabled = false;
    $nextPageBtn.dataset.nextOffset = nextOffset;
  } else {
    $nextPageBtn.disabled = true;
  }
}

function updatePreviousPageOffset(previousOffset) {
  if (previousOffset) {
    $previousPageBtn.disabled = false;
    $previousPageBtn.dataset.previousOffset = previousOffset;
  } else {
    $previousPageBtn.disabled = true;
  }
}

function updateTotalPages(pokemonCount, pokemonPerPage) {
  const pageCount = Math.ceil(pokemonCount / pokemonPerPage);
  document.querySelector("#total-pages").textContent = pageCount;
}

function updateCurrentPage(offset, pokemonPerPage) {
  // "offset" starts at 0 so we have to add 1 to the current page.
  const currentPage = Math.floor(offset / pokemonPerPage) + 1;
  document.querySelector("#current-page").textContent = currentPage;
}
