function getPokemonList(offset = 0) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=30`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`An error occured! Status: ${response.status}`);
      }

      return response.json();
    })
    .catch((err) => console.log(err));
}
