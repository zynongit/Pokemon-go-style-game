// main.js
import { PokeAPI, displayPokemon } from './poke-api.js';

document.addEventListener('DOMContentLoaded', () => {
    const api = new PokeAPI();
    const searchBtn = document.getElementById('search-btn');
    const pokemonInput = document.getElementById('pokemon-input');

    // Busca ao clicar no botão
    searchBtn.addEventListener('click', async () => {
        const query = pokemonInput.value.trim();
        if (!query) return alert('Digite um nome ou número!');

        try {
            const pokemon = await api.getPokemonData(query);
            if (pokemon) {
                displayPokemon(pokemon);
            } else {
                alert('Pokémon não encontrado! Use o nome em inglês ou número.');
            }
        } catch (error) {
            alert('Erro na busca. Verifique o console para detalhes.');
            console.error(error);
        }
    });

    // Busca ao pressionar Enter
    pokemonInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchBtn.click();
    });
});
