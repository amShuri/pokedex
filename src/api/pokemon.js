const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
export const POKEMON_PER_PAGE = 24;

export async function getPokemonList(offset, limit) {
  return fetch(`${BASE_URL}/?offset=${offset}&limit=${limit}`)
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

export async function getPokemon(pokemonNumber) {
  return fetch(`${BASE_URL}/${pokemonNumber}`)
    .then((response) => response.json())
    .catch((err) => console.log(err));
}
