import { pokemonPerPage, getPokemonList, getPokemonInfo } from "./pokedex.js";
import { updatePageOffset, updatePageCount } from "./pagination.js";
import { formatPokemonList, formatPokemonInfo } from "./utils.js";

export async function displayPokemonList(offset = 0) {
  const pokemonList = await getPokemonList(offset);
  const formattedList = formatPokemonList(pokemonList.results);
  createPokemonList(formattedList);

  updatePageOffset(pokemonList.previous, pokemonList.next);
  updatePageCount(pokemonList.count, pokemonPerPage, offset)
}

export async function displayPokemonModal(pokemonNumber) {
  const pokemonInfo = await getPokemonInfo(pokemonNumber);
  const formattedInfo = formatPokemonInfo(pokemonInfo);
  createPokemonModal(formattedInfo);
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

function createPokemonModal(pokemon) {
  const $pokemonModal = document.querySelector("#pokemon-modal .modal-body");
  $pokemonModal.innerHTML = "";

  $pokemonModal.insertAdjacentHTML(
    "beforeend",
    `
    <div class="row align-items-center">
      <div class="col">
        <img 
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
            pokemon.number
          }.png" 
          class="img-fluid pokemon-img"
        >
      </div>
      <div class="col">
        <p class="text-capitalize">Name: ${pokemon.name}</p>

        <p>Number: #${pokemon.number}</p>

        <p>Height: ${pokemon.height}</p>

        <p>Weight: ${pokemon.weight}</p>
        
        ${
          pokemon.types
            ? `
              <p class="text-capitalize">Types: ${pokemon.types
                .map((type) => `<span class="${type}">${type}</span>`)
                .join(", ")}
              </p>
            `
            : ""
        }

        ${
          pokemon.ability
            ? `<p class="text-capitalize">Abilities: ${pokemon.ability}</p>`
            : ""
        }

        ${
          pokemon.heldItem
            ? `<p class="text-capitalize">Held Items: ${pokemon.heldItem}</p>`
            : ""
        }
      </div>
    </div>
    `
  );
}
