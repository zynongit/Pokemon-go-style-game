// poke-api.js
class PokeAPI {
    constructor() {
        this.baseUrl = 'https://pokeapi.co/api/v2';
    }

    async getPokemon(query) {
        try {
            const response = await fetch(`${this.baseUrl}/pokemon/${query.toLowerCase()}`);
            if (!response.ok) throw new Error('Pokémon não encontrado!');
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar Pokémon:', error);
            return null;
        }
    }

    async getPokemonSpecies(id) {
        try {
            const response = await fetch(`${this.baseUrl}/pokemon-species/${id}`);
            if (!response.ok) throw new Error('Espécie não encontrada!');
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar espécie:', error);
            return null;
        }
    }

    async getPokemonData(query) {
        const pokemon = await this.getPokemon(query);
        if (!pokemon) return null;

        const species = await this.getPokemonSpecies(pokemon.id);
        
        return {
            ...pokemon,
            speciesData: species
        };
    }
}

// Utilitários para exibição
function createTypeBadge(type) {
    const badge = document.createElement('span');
    badge.className = `type-badge type-${type}`;
    badge.textContent = type.toUpperCase();
    return badge;
}

function displayPokemon(pokemon) {
    if (!pokemon) return;

    // Elementos da DOM
    const sprite = document.getElementById('pokemon-sprite');
    const nameDisplay = document.getElementById('pokemon-name');
    const idDisplay = document.getElementById('pokemon-id');
    const typeDisplay = document.getElementById('pokemon-type');
    const heightDisplay = document.getElementById('pokemon-height');
    const weightDisplay = document.getElementById('pokemon-weight');
    const abilitiesDisplay = document.getElementById('pokemon-abilities');
    const statsDisplay = document.getElementById('pokemon-stats');

    // Sprite (prioriza artwork oficial)
    const officialArt = pokemon.sprites.other?.['official-artwork']?.front_default;
    const defaultSprite = pokemon.sprites.front_default;
    sprite.src = officialArt || defaultSprite || 'assets/placeholder.png';
    sprite.classList.remove('hidden');

    // Informações básicas
    nameDisplay.textContent = pokemon.name.toUpperCase();
    idDisplay.textContent = `Nº ${pokemon.id}`;

    // Tipos
    typeDisplay.innerHTML = '';
    pokemon.types.forEach(type => {
        typeDisplay.appendChild(createTypeBadge(type.type.name));
        typeDisplay.appendChild(document.createTextNode(' '));
    });

    // Características físicas
    heightDisplay.textContent = `${pokemon.height / 10}m`;
    weightDisplay.textContent = `${pokemon.weight / 10}kg`;

    // Habilidades
    abilitiesDisplay.textContent = pokemon.abilities
        .map(a => a.ability.name.replace('-', ' '))
        .join(', ');

    // Estatísticas
    statsDisplay.textContent = pokemon.stats
        .map(stat => `${stat.stat.name}: ${stat.base_stat}`)
        .join(' | ');
}

export { PokeAPI, displayPokemon };
