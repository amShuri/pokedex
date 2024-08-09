import {
  getPokemonList as getPokemonListFromApi,
  getPokemon as getPokemonFromApi,
  POKEMON_PER_PAGE,
} from "../api/pokemon.js";

import {
  storePokemon,
  storePokemonList,
  getPokemonList as getPokemonListFromStorage,
  getPokemon as getPokemonFromStorage,
} from "../storage/pokemon.js";

export async function getPokemonList(offset) {
  try {
    return getPokemonListFromStorage(offset);
  } catch (err) {
    const pokemonList = await getPokemonListFromApi(offset, POKEMON_PER_PAGE);
    storePokemonList(offset, pokemonList);
    return pokemonList;
  }
}

export async function getPokemon(pokemonNumber) {
  try {
    return getPokemonFromStorage(pokemonNumber);
  } catch (err) {
    const pokemon = await getPokemonFromApi(pokemonNumber);
    storePokemon(pokemonNumber, pokemon);
    return pokemon;
  }
}
