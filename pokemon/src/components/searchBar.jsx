function SearchBar({ busqueda, setBusqueda, onBuscar }) {

    const manejarSubmit = (e) => {
        e.preventDefault();
        onBuscar();
    };

    return (
        <form className="search-bar" onSubmit={manejarSubmit}>

            <input
                type="text"
                placeholder="Busca un Pokémon..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <button type="submit">
                Buscar
            </button>

        </form>
    );
}

export default SearchBar;