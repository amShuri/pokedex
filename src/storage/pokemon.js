export function storePokemonList(offset, list) {
  localStorage.setItem(`list_${offset}`, JSON.stringify(list));
}

export function storePokemon(number, pokemon) {
  localStorage.setItem(`pokemon_${number}`, JSON.stringify(pokemon));
}

export function getPokemonList(offset) {
  const pokemonList = JSON.parse(localStorage.getItem(`list_${offset}`));

  if (!pokemonList) {
    throw new Error(`List with offset "${offset}" was not found`);
  }

  return pokemonList;
}

export function getPokemon(number) {
  const pokemon = JSON.parse(localStorage.getItem(`pokemon_${number}`));

  if (!pokemon) {
    throw new Error(`Pokemon number "${number}" was not found`);
  }

  return pokemon;
}
