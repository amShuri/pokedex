function updatePreviousPageButton(previousPage) {
  const $previousPageBtn = document.querySelector("#previous-page-btn");

  if (previousPage) {
    $previousPageBtn.dataset.previousPage = previousPage;
  }
}

function updateNextPageButton(nextPage) {
  const $nextPageBtn = document.querySelector("#next-page-btn");

  if (nextPage) {
    $nextPageBtn.dataset.nextPage = nextPage;
  }
}

function setupPreviousPageButton() {
  const $previousPageBtn = document.querySelector("#previous-page-btn");

  $previousPageBtn.addEventListener("click", (e) => {
    const previousPage = e.currentTarget.dataset.previousPage;
    if (!previousPage) return;

    const offset = previousPage.match(/\b(\d+)/)[0];
    document.querySelector("#current-page").dataset.currentPage--;
    displayPokemonList(offset);

    // Remove the data-previous-page attribute to reset the button state
    $previousPageBtn.removeAttribute("data-previous-page");
  });
}

function setupNextPageButton() {
  const $nextPageBtn = document.querySelector("#next-page-btn");

  $nextPageBtn.addEventListener("click", (e) => {
    const nextPage = e.currentTarget.dataset.nextPage;
    if (!nextPage) return;

    const offset = nextPage.match(/\b(\d+)/)[0];
    displayPokemonList(offset);
    document.querySelector("#current-page").dataset.currentPage++;

    // Remove the data-next-page attribute to reset the button state
    $nextPageBtn.removeAttribute("data-next-page");
  });
}

function updatePageCount(pokemonCount) {
  const limitPerPage = 30;
  const pageCount = Math.ceil(pokemonCount / limitPerPage);

  const $currentPage = document.querySelector("#current-page");
  const $lastPage = document.querySelector("#last-page");
  const currentPage = $currentPage.dataset.currentPage;

  if (currentPage > 0 && currentPage <= pageCount) {
    $currentPage.textContent = $currentPage.dataset.currentPage;
  }

  $lastPage.textContent = pageCount;
}
