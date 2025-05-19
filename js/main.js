document.getElementById("search-btn").addEventListener("click", async () => {
    const input = document.getElementById("pokemon-input").value.trim().toLowerCase(); // Garante minúsculas
    if (!input) {
        alert("Digite um nome ou número!");
        return;
    }

    try {
        const pokemon = await fetchPokemon(input);
        if (pokemon) {
            updateDisplay(pokemon);
        } else {
            alert("Pokémon não encontrado! Use o nome em inglês (ex: mimikyu) ou número.");
        }
    } catch (error) {
        alert("Erro na busca. Verifique o console (F12) para detalhes.");
        console.error(error);
    }
});
