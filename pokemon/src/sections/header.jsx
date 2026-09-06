function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <a href="/" className="logo">
                    Pokédex
                </a>

                <nav className="nav">
                    <a href="#inicio">Inicio</a>
                    <a href="#pokedex">Pokédex</a>
                </nav>
            </div>
        </header>
    );
}

export default Header;