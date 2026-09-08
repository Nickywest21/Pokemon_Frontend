function PokemonModal({ pokemon, onCerrar }) {
    if (!pokemon) return null;

    return (
        <div className="modal-overlay" onClick={onCerrar}>
            <div
                className="pokemon-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="modal-close"
                    onClick={onCerrar}
                    aria-label="Cerrar"
                >
                    ×
                </button>

                <img
                    src={pokemon.imagen}
                    alt={`Imagen de ${pokemon.nombre}`}
                    className="modal-image"
                />

                <h2>{pokemon.nombre}</h2>

                <div className="modal-section">
                    <h3>Habilidades</h3>

                    <div className="abilities">
                        {pokemon.habilidades?.map((habilidad) => (
                            <span
                                key={habilidad}
                                className="ability"
                            >
                                {habilidad}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="modal-section">
                    <h3>Estadísticas</h3>

                    <div className="stats">
                        {pokemon.estadisticas?.map((estadistica) => (
                            <div
                                className="stat"
                                key={estadistica.nombre}
                            >
                                <div className="stat-header">
                                    <span>
                                        {estadistica.nombre}
                                    </span>

                                    <strong>
                                        {estadistica.valor}
                                    </strong>
                                </div>

                                <div className="stat-bar">
                                    <div
                                        className="stat-fill"
                                        style={{
                                            width: `${Math.min(
                                                estadistica.valor,
                                                100
                                            )}%`
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonModal;