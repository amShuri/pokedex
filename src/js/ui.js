function displayPokemonList(offset) {
  const pokemonPerPage = 30;
    getPokemonList(offset, pokemonPerPage).then((pokemonList) => {
      storeObjectToLocalStorage(offset, pokemonList);
      createPokemonList(pokemonList);
      updatePageBtnOffset(pokemonList);
      updatePageCount(pokemonList.count, pokemonPerPage, offset);
    });
}

function createPokemonList(pokemonList) {
  const $pokemonContainer = document.querySelector("#pokemon-list");
  $pokemonContainer.innerHTML = "";

  const formattedList = formatPokemonList(pokemonList.results);

  Object.values(formattedList).forEach((pokemon) => {
    createPokemonElement(pokemon, $pokemonContainer);
  });
}

function createPokemonElement(pokemon, pokemonContainer) {
  const $pokemonEl = document.createElement("div");
  $pokemonEl.classList.add("pokemon-box");
  $pokemonEl.id = "pokemon-box";
  $pokemonEl.dataset.bsToggle = "modal";
  $pokemonEl.dataset.bsTarget = "#pokemon-modal";

  $pokemonEl.insertAdjacentHTML(
    "beforeend",
    `
      <p class="pokemon-number m-0">#${pokemon.number}</p>
      <img 
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.number}.png" 
        class="img-fluid pokemon-img"
        alt="pokemon sprite"
        aria-label="Image of ${pokemon.name}"
        data-pokemon-name="${pokemon.name}"
        data-pokemon-number="${pokemon.number}"
        title="${pokemon.name}"
        height=100
        width=100
      >
      <p class="pokemon-name m-0 mt-1">
        ${pokemon.name}
      </p>
    `
  );

  pokemonContainer.appendChild($pokemonEl);
}

function createPokemonModal(pokemon) {
  const $pokemonModal = document.querySelector("#pokemon-modal .modal-body");
  $pokemonModal.innerHTML = "";

  const pokemonHTML = `
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
`;

  $pokemonModal.insertAdjacentHTML("beforeend", pokemonHTML);
}
