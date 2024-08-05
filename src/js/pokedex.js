import * as pokedex from "./api.js";
import {
  storeDataInLocalStorage,
  retrieveDataFromLocalStorage 
} from "./localStorage.js";

export const pokemonPerPage = 24;

export async function getPokemonList(offset) {
  const cacheKey = `list_${offset}`
  const baseCache = retrieveDataFromLocalStorage(cacheKey)
  if (baseCache) {
    return JSON.parse(baseCache);
  }

  const pokemonList = await pokedex.getPokemonList(offset, pokemonPerPage);
  storeDataInLocalStorage(cacheKey, pokemonList);

  return pokemonList;
}

export async function getPokemonInfo(pokemonNumber) {
  const cacheKey = `pokemon_${pokemonNumber}`;
  const baseCache = retrieveDataFromLocalStorage(cacheKey);
  if (baseCache) {
    return JSON.parse(baseCache);
  }

  const pokemonInfo = await pokedex.getPokemonInfo(pokemonNumber);
  storeDataInLocalStorage(cacheKey, pokemonInfo);

  return pokemonInfo;
}
