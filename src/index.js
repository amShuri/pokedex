import {
  changePage,
  setupNextPage,
  setupPreviousPage,
  setupPokemonModal,
} from "./pokedex.js";

function initialize() {
  changePage();
  setupPokemonModal();
  setupPreviousPage();
  setupNextPage();
}

initialize();
