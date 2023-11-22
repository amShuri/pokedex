const $prevBtn = document.querySelector('#prev-page');
const $nextBtn = document.querySelector('#next-page');
const $pageInfo = document.querySelector('#page-info');
const $currentPage = document.querySelector('#current-page');
const $lastPage = document.querySelector('#last-page');
let currentPage = 1;

$nextBtn.addEventListener('click', () => {
  handlePageChange('next');
});

$prevBtn.addEventListener('click', () => {
  handlePageChange('previous');
});

function handlePageChange(button) {
  if (button === 'next') {
    currentPage++;
  } else if (button === 'previous') {
    currentPage--;
  }

  changePage();
}

function changePage() {
  validatePageRange();
  updatePageData();
  renderPokemonPage();
}

function validatePageRange() {
  if (currentPage < 1) {
    currentPage = totalPages;
  } else if (currentPage > totalPages) {
    currentPage = 1;
  }
}

function updatePageData() {
  $currentPage.textContent = currentPage;
  pageOffset = pokemonPerPage * (currentPage - 1);
}

function initPagination() {
  $currentPage.textContent = currentPage;
  $lastPage.textContent = totalPages;
}
