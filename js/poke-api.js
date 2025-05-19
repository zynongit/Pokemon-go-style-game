class PokeAPI {
    constructor() {
        this.baseUrl = 'https://pokeapi.co/api/v2';
        this.cache = new Map();
    }

    async getPokemon(query) {
        const cacheKey = `pokemon-${query}`;
        
        // Verifica cache
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000); // Timeout de 8 segundos

        try {
            const response = await fetch(`${this.baseUrl}/pokemon/${query.toLowerCase()}`, {
                signal: controller.signal
            });
            
            clearTimeout(timeout);
            
            if (!response.ok) {
                throw new Error(`Pokémon não encontrado: ${query}`);
            }

            const data = await response.json();
            this.cache.set(cacheKey, data); // Armazena no cache
            return data;
            
        } catch (error) {
            clearTimeout(timeout);
            console.error(`Erro ao buscar ${query}:`, error);
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

// Função para criar badges de tipo
function createTypeBadge(type) {
    const badge = document.createElement('span');
    badge.className = `type-badge type-${type}`;
    badge.textContent = type.toUpperCase();
    return badge;
}

// Exibe os dados do Pokémon na tela
function displayPokemon(pokemon) {
    if (!pokemon || !pokemon.sprites) {
        alert("Dados inválidos do Pokémon!");
        return;
    }

    // Elementos DOM
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

    // Nome e ID
    nameDisplay.textContent = pokemon.name.toUpperCase();
    idDisplay.textContent = `Nº ${pokemon.id}`;

    // Tipos (limpa e adiciona novos)
    typeDisplay.innerHTML = '';
    pokemon.types.forEach(type => {
        typeDisplay.appendChild(createTypeBadge(type.type.name));
        typeDisplay.appendChild(document.createTextNode(' '));
    });

    // Altura e Peso
    heightDisplay.textContent = `${(pokemon.height / 10).toFixed(1)} m`;
    weightDisplay.textContent = `${(pokemon.weight / 10).toFixed(1)} kg`;

    // Habilidades
    abilitiesDisplay.textContent = pokemon.abilities
        .map(a => a.ability.name.replace(/-/g, ' '))
        .join(', ');

    // Estatísticas
    statsDisplay.textContent = pokemon.stats
        .map(stat => `${stat.stat.name}: ${stat.base_stat}`)
        .join(' | ');
}

export { PokeAPI, displayPokemon };
