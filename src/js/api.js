function getPokemonList(offset, limit) {
  return fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`An error occured! Status: ${response.status}`);
      }

      return response.json();
    })
    .catch((err) => err);
}
