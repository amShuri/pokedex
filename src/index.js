import { displayPokemonList } from "./ui/list.js";
import { 
  setupNextPage,
  setupPreviousPage,
  setupPokemonModal
} from "./pokedex.js"

function initialize() {
  displayPokemonList();
  setupPokemonModal();
  setupPreviousPage();
  setupNextPage();
}

initialize();
