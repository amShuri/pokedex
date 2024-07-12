function displayPokemonList() {
  const $pokemonList = document.querySelector("#pokemon-list");

  getPokemonList(0, 30).then((list) => {
    const pokemonList = list.results;

    Object.keys(pokemonList).forEach((key) => {
      // Regex pattern to get the Pokemon's ID from the URL
      // Example: https://pokeapi.co/api/v2/pokemon/74/
      const idPattern = /\d+\/$/;
      const pokemonId = pokemonList[key].url
        .match(idPattern)[0]
        .replace("/", "");

      const spriteDefault = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`;

      $pokemonList.insertAdjacentHTML(
        "beforeend",
        `
          <div class="pokemon-container">
            <img 
              src="${spriteDefault}"
              class="pokemon-img"
              height="100"
              width="100"
            >
          </div>
        `
      );
    });
  });
}
