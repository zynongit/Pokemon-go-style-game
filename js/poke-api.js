function displayPokemon(pokemon) {
    const displayDiv = document.getElementById("pokemon-display");
    const infoDiv = document.getElementById("pokemon-info");

    // Pega a imagem oficial (ou uma alternativa se não existir)
    const sprite = pokemon.sprites.other["official-artwork"]?.front_default 
                || pokemon.sprites.front_default;

    displayDiv.innerHTML = `
        <img src="${sprite}" alt="${pokemon.name}" class="pokemon-sprite">
        <h2>${pokemon.name.toUpperCase()}</h2>
        <p>Nº ${pokemon.id}</p>
    `;

    infoDiv.innerHTML = `
        <p><strong>Tipo:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
        <p><strong>Altura:</strong> ${pokemon.height / 10}m</p>
        <p><strong>Peso:</strong> ${pokemon.weight / 10}kg</p>
        <p><strong>Habilidades:</strong> ${pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
    `;
}
