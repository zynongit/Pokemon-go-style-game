async function fetchPokemon(query) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
        if (!response.ok) throw new Error("Pokémon não encontrado!");
        return await response.json();
    } catch (error) {
        console.error("Erro na API:", error);
        return null;
    }
}

function updateDisplay(pokemon) {
    const sprite = document.getElementById("pokemon-sprite");
    const name = document.getElementById("pokemon-name");
    const id = document.getElementById("pokemon-id");
    const type = document.getElementById("pokemon-type");
    const height = document.getElementById("pokemon-height");
    const weight = document.getElementById("pokemon-weight");
    const abilities = document.getElementById("pokemon-abilities");

    // Atualiza os dados
    sprite.src = pokemon.sprites.other["official-artwork"]?.front_default || pokemon.sprites.front_default;
    sprite.classList.remove("hidden");
    name.textContent = pokemon.name.toUpperCase();
    id.textContent = `Nº ${pokemon.id}`;
    type.textContent = pokemon.types.map(t => t.type.name).join(", ");
    height.textContent = `${pokemon.height / 10}m`;
    weight.textContent = `${pokemon.weight / 10}kg`;
    abilities.textContent = pokemon.abilities.map(a => a.ability.name).join(", ");
}
