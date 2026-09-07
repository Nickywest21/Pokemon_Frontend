import pokemonLogo from "../assets/Pokemon-logo.png";

function Header({ modoOscuro, alternarModoOscuro }) {
    return (
        <header className="header">
            <div className="header-container">
                <a href="/" className="logo" aria-label="Pokédex, ir al inicio">
                    <img
                        src={pokemonLogo}
                        alt="Pokémon"
                        className="logo-img"
                    />
                </a>

                <nav className="nav" aria-label="Navegación principal">
                    <ul className="nav-list">
                        <li>
                            <a href="#inicio">Inicio</a>
                        </li>
                        <li>
                            <a href="#pokedex">Pokédex</a>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="theme-toggle"
                                onClick={alternarModoOscuro}
                                aria-pressed={modoOscuro}
                                aria-label={
                                    modoOscuro
                                        ? "Desactivar modo oscuro"
                                        : "Activar modo oscuro"
                                }
                            >
                                <span className="visually-hidden">
                                    {modoOscuro
                                        ? "Desactivar modo oscuro"
                                        : "Activar modo oscuro"}
                                </span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;