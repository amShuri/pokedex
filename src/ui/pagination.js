import { $previousPageBtn, $nextPageBtn } from "../pokedex.js";

export function updateTotalPages(pokemonCount, pokemonPerPage) {
  const pageCount = Math.ceil(pokemonCount / pokemonPerPage);
  document.querySelector("#total-pages").textContent = pageCount;
}

export function updateCurrentPage(offset, pokemonPerPage) {
  // "offset" starts at 0 so we have to add 1 to the current page.
  const currentPage = Math.floor(offset / pokemonPerPage) + 1;
  document.querySelector("#current-page").textContent = currentPage;
}

export function updatePageBtnState(previousOffset, nextOffset) {
  previousOffset
  ? $previousPageBtn.disabled = false
  : $previousPageBtn.disabled = true
  
  nextOffset
  ? $nextPageBtn.disabled = false
  : $nextPageBtn.disabled = true
}
