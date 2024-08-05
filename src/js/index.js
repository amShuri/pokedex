import { displayPokemonList } from "./ui.js";
import { setupPokemonModal } from "./modal.js";
import { setupNextPage, setupPreviousPage} from "./pagination.js"

function initialize() {
  displayPokemonList();
  setupPokemonModal();
  setupPreviousPage();
  setupNextPage();
}

initialize();
