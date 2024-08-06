import { formatPokemonInfo } from "../utils/general.js";

export function displayPokemonModal(pokemonInfo) {
  const formattedInfo = formatPokemonInfo(pokemonInfo);
  createPokemonModal(formattedInfo);
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

