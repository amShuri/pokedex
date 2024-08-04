function updatePrevPageBtn(prevPageOffset) {
  const $previousBtn = document.querySelector("#previous-page-btn");

  if (prevPageOffset) {
    $previousBtn.disabled = false;
    $previousBtn.dataset.previousOffset = prevPageOffset;
  } else {
    $previousBtn.disabled = true;
  }
}

function updateNextPageBtn(nextPageOffset) {
  const $nextBtn = document.querySelector("#next-page-btn");
  if (nextPageOffset) {
    $nextBtn.disabled = false;
    $nextBtn.dataset.nextOffset = nextPageOffset;
  } else {
    $nextBtn.disabled = true;
  }
}

function updatePageBtnOffset(pokemonList) {
  updatePrevPageBtn(pokemonList.previous);
  updateNextPageBtn(pokemonList.next);
}

function updateTotalPages(pokemonCount, pokemonPerPage) {
  const pageCount = Math.ceil(pokemonCount / pokemonPerPage);
  const $totalPages = document.querySelector("#total-pages");
  $totalPages.textContent = pageCount;
}

function updateCurrentPage(offset, pokemonPerPage) {
  const $currentPage = document.querySelector("#current-page");
  $currentPage.textContent = Math.floor(offset / pokemonPerPage) + 1;
}

function updatePageCount(pokemonCount, pokemonPerPage, offset) {
  updateTotalPages(pokemonCount, pokemonPerPage);
  updateCurrentPage(offset, pokemonPerPage);
}

function setupPreviousPageButton() {
  const $previousPageBtn = document.querySelector("#previous-page-btn");

  $previousPageBtn.addEventListener("click", (e) => {
    const previousPage = e.currentTarget.dataset.previousOffset;
    if (!previousPage) return;

    const offset = previousPage.match(/\b(\d+)/)[0];
    displayPokemonList(offset);
  });
}

function setupNextPageButton() {
  const $nextPageBtn = document.querySelector("#next-page-btn");

  $nextPageBtn.addEventListener("click", (e) => {
    const nextPage = e.currentTarget.dataset.nextOffset;
    if (!nextPage) return;

    const offset = nextPage.match(/\b(\d+)/)[0];
    displayPokemonList(offset);
  });
}
