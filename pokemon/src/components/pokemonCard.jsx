function PokemonCard({ pokemon, onClick }) {
    return (
        <article
            className="pokemon-card"
            onClick={() => onClick(pokemon)}
        >
            <img
                src={pokemon.imagen}
                alt={`Imagen de ${pokemon.nombre}`}
            />

            <h3>{pokemon.nombre}</h3>

            <div className="pokemon-types">
                {pokemon.tipos.map((tipo) => (
                    <span key={tipo}>
                        {tipo}
                    </span>
                ))}
            </div>
        </article>
    );
}

export default PokemonCard;