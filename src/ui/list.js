import { formatPokemonList } from "../utils/general.js";

const $pokemonContainer = document.querySelector("#pokemon-list");

export function renderPokemonList(pokemonList) {
  const formattedList = formatPokemonList(pokemonList.results);
  createPokemonList(formattedList);
}

export function showLoadingTextForList() {
  $pokemonContainer.innerHTML = "Loading Page...";
}

function createPokemonList(pokemonList) {
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
