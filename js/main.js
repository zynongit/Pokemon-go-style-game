document.getElementById("search-btn").addEventListener("click", async () => {
    const pokemonId = document.getElementById("pokemon-id").value;
    if (!pokemonId || pokemonId < 1 || pokemonId > 151) {
        alert("Digite um número entre 1 e 151!");
        return;
    }

    const pokemon = await fetchPokemon(pokemonId);
    if (pokemon) displayPokemon(pokemon);
});
