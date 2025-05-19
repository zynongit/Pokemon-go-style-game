async function fetchPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error("Pokémon não encontrado!");
        return await response.json();
    } catch (error) {
        console.error("Erro na API:", error);
        return null;
    }
}

function displayPokemon(pokemon) {
    const displayDiv = document.getElementById("pokemon-display");
    const infoDiv = document.getElementById("pokemon-info");

    displayDiv.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h2>${pokemon.name.toUpperCase()}</h2>
    `;

    infoDiv.innerHTML = `
        <p><strong>Tipo:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
        <p><strong>Altura:</strong> ${pokemon.height / 10}m</p>
        <p><strong>Peso:</strong> ${pokemon.weight / 10}kg</p>
    `;
}
