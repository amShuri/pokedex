let currentPage = 1;

document.querySelector('#next-page').addEventListener('click', () => {
  handlePageChange('next');
});

document.querySelector('#prev-page').addEventListener('click', () => {
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
  displayPage();
}

function validatePageRange() {
  if (currentPage < 1) {
    currentPage = totalPages;
  } else if (currentPage > totalPages) {
    currentPage = 1;
  }
}

function updatePageData() {
  document.querySelector('#current-page').textContent = currentPage;
  pageOffset = pokemonPerPage * (currentPage - 1);
}

function showPageInfo() {
  document.querySelector('#pagination-info').insertAdjacentHTML(
    'beforeend',
    `
    <button class="page-link">
      <span id="current-page">${currentPage}</span>
      <span>of</span>
      <span id="last-page">${totalPages}</span>
    </button>
    `
  );
}
