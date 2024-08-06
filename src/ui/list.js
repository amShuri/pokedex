import { getPokemonList, pokemonPerPage } from "../services/pokemon.js";
import { formatPokemonList } from "../utils/general.js";
import { updatePageOffset } from "../utils/pagination.js";
import { 
  updateTotalPages,
  updateCurrentPage,
  updatePageBtnState
} from "./pagination.js";

export async function displayPokemonList(offset = 0) {
  const pokemonList = await getPokemonList(offset);
  const formattedList = formatPokemonList(pokemonList.results);
  createPokemonList(formattedList);

  updatePageOffset(pokemonList.previous, pokemonList.next);
  updatePageBtnState(pokemonList.previous, pokemonList.next)
  updateTotalPages(pokemonList.count, pokemonPerPage);
  updateCurrentPage(offset, pokemonPerPage);
}

function createPokemonList(pokemonList) {
  const $pokemonContainer = document.querySelector("#pokemon-list");
  $pokemonContainer.innerHTML = "";

  Object.values(pokemonList).forEach((pokemon) => {
    const $pokemonBox = document.createElement("div");
    $pokemonBox.id = "pokemon-box";
    $pokemonBox.classList.add("pokemon-box");
    $pokemonBox.dataset.bsToggle = "modal";
    $pokemonBox.dataset.bsTarget = "#pokemon-modal";
    $pokemonBox.dataset.pokemonNumber = pokemon.number;

    $pokemonBox.insertAdjacentHTML(
      "beforeend",
      `
      <p class="pokemon-number m-0">#${pokemon.number}</p>
      <img 
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.number}.png" 
        class="img-fluid pokemon-img"
        alt="pokemon sprite"
        aria-label="Image of ${pokemon.name}"
        title="${pokemon.name}"
        height=100
        width=100
      >
      <p class="pokemon-name m-0 mt-1">
        ${pokemon.name}
      </p>
      `
    )

    $pokemonContainer.appendChild($pokemonBox);
  });
}
