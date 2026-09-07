function SearchBar({ busqueda, setBusqueda, onBuscar }) {

    const manejarSubmit = (e) => {
        e.preventDefault();
        onBuscar();
    };

    return (
        <form
            className="search-container"
            onSubmit={manejarSubmit}
        >

            <div className="search-input-container">

                <span className="search-icon">
                    
                </span>

                <input
                    type="text"
                    placeholder="Busca un Pokémon..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />

            </div>

            <button
                type="submit"
                className="search-button"
            >
                Buscar
            </button>

        </form>
    );
}

export default SearchBar;