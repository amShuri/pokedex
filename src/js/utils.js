export function formatPokemonList(pokemonList) {
  return pokemonList.map((pokemon) => {
    const idMatch = pokemon.url.match(/\d+\/$/);
    const pokemonNumber = idMatch ? idMatch[0].replace("/", "") : null;
    const pokemonName = pokemon.name;
    return {
      name: pokemonName,
      number: Number(pokemonNumber),
    };
  });
}

export function formatPokemonInfo(pokemonInfo) {
  return {
    name: pokemonInfo["name"],
    number: pokemonInfo["id"],
    height: pokemonInfo["height"],
    weight: pokemonInfo["weight"],
    types: pokemonInfo["types"].map((types) => types.type.name),
    ability: pokemonInfo["abilities"]
      .map((abilities) => abilities.ability.name)
      .join(", "),
    heldItem:
      pokemonInfo["held_items"].length > 0
        ? pokemonInfo["held_items"]
            .map((heldItem) => heldItem.item.name.replace("-", " "))
            .join(", ")
        : null,
  };
}
