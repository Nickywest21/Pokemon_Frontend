import PokemonCard from "./pokemonCard";

function PokemonGrid({ pokemons, onPokemonClick }) {
    if (pokemons.length === 0) {
        return (
            <p className="no-results">
                No encontramos ningún Pokémon.
            </p>
        );
    }

    return (
        <section className="pokemon-grid">
            {pokemons.map((pokemon) => (
                <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    onClick={onPokemonClick}
                />
            ))}
        </section>
    );
}

export default PokemonGrid;