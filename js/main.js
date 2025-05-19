document.getElementById("search-btn").addEventListener("click", async () => {
    const pokemonId = document.getElementById("pokemon-id").value;
    if (!pokemonId || pokemonId < 1) {
        alert("Digite um número válido!");
        return;
}
    const pokemon = await fetchPokemon(pokemonId);
    if (pokemon) displayPokemon(pokemon);
});
