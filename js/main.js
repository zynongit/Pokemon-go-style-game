document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const pokemonInput = document.getElementById("pokemon-input");

    searchBtn.addEventListener("click", async () => {
        const query = pokemonInput.value.trim();
        if (!query) {
            alert("Digite um nome ou número!");
            return;
        }

        const pokemon = await fetchPokemon(query);
        if (pokemon) {
            updateDisplay(pokemon);
        } else {
            alert("Pokémon não encontrado!");
        }
    });

    // Busca ao pressionar Enter
    pokemonInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") searchBtn.click();
    });
});
