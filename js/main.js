document.getElementById("search-btn").addEventListener("click", async () => {
    const input = document.getElementById("pokemon-id").value.trim();
    if (!input) {
        alert("Digite um número ou nome!");
        return;
    }

    const pokemon = await fetchPokemon(input.toLowerCase()); // Aceita nome ou ID
    if (pokemon) displayPokemon(pokemon);
    else alert("Pokémon não encontrado!");
});
