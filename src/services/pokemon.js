import * as pokemon from "../api/api.js";
import {
  storeDataInLocalStorage,
  retrieveDataFromLocalStorage,
} from "../storage/localStorage.js";

export const pokemonPerPage = 24;

export async function getPokemonList(offset) {
  const cacheKey = `list_${offset}`;
  const baseCache = retrieveDataFromLocalStorage(cacheKey);
  if (baseCache) {
    return JSON.parse(baseCache);
  }

  const pokemonList = await pokemon.getPokemonList(offset, pokemonPerPage);
  storeDataInLocalStorage(cacheKey, pokemonList);

  return pokemonList;
}

export async function getPokemonInfoForModal(pokemonNumber) {
  const cacheKey = `pokemon_${pokemonNumber}`;
  const baseCache = retrieveDataFromLocalStorage(cacheKey);
  if (baseCache) {
    return JSON.parse(baseCache);
  }

  const pokemonInfo = await pokemon.getPokemonInfoForModal(pokemonNumber);
  storeDataInLocalStorage(cacheKey, pokemonInfo);

  return pokemonInfo;
}
