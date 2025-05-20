import { PokeAPI, displayPokemon } from './poke-api.js';

document.addEventListener('DOMContentLoaded', () => {
    const api = new PokeAPI();
    const searchBtn = document.getElementById('search-btn');
    const pokemonInput = document.getElementById('pokemon-input');
    const sprite = document.getElementById('pokemon-sprite');

    // Função para mostrar erro
    function showError(message) {
        sprite.classList.add('hidden');
        document.getElementById('pokemon-name').textContent = 'ERRO';
        document.getElementById('pokemon-id').textContent = message;
    }

    // Busca Pokémon
    async function searchPokemon() {
        const query = pokemonInput.value.trim();
        if (!query) {
            showError('Digite algo!');
            return;
        }

        // Estado de carregamento
        searchBtn.disabled = true;
        searchBtn.textContent = "Buscando...";

        try {
            console.log(`Buscando: ${query}`);
            const pokemon = await api.getPokemonData(query);
            
            if (pokemon) {
                displayPokemon(pokemon);
                console.log('Pokémon encontrado:', pokemon.name);
            } else {
                showError('Não encontrado!');
                console.warn('Pokémon não encontrado');
            }
        } catch (error) {
            showError('Erro na busca');
            console.error('Erro completo:', error);
        } finally {
            // Restaura o botão
            searchBtn.disabled = false;
            searchBtn.textContent = "BUSCAR";
        }
    }

    // Eventos
    searchBtn.addEventListener('click', searchPokemon);
    pokemonInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchPokemon();
    });

    // Focar no input ao carregar
    pokemonInput.focus();
});
