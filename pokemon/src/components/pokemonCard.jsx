function PokemonCard({ pokemon }) {
    return (
        <article className="pokemon-card">

            <div className="pokemon-image">
                <img
                    src={pokemon.imagen}
                    alt={`Imagen de ${pokemon.nombre}`}
                />
            </div>

            <div className="pokemon-info">

                <span className="pokemon-id">
                    #{String(pokemon.id).padStart(3, "0")}
                </span>

                <h2>
                    {pokemon.nombre}
                </h2>

                <div className="pokemon-types">
                    {pokemon.tipos.map((tipo) => (
                        <span
                            key={tipo}
                            className={`type type-${tipo}`}
                        >
                            {tipo}
                        </span>
                    ))}
                </div>

            </div>

        </article>
    );
}

export default PokemonCard;