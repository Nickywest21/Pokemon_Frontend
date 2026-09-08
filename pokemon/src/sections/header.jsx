import { useState, useEffect, useRef } from "react";
import pokemonLogo from "../assets/Pokemon-logo.png";

function Header({ modoOscuro, alternarModoOscuro }) {

    const [menuAbierto, setMenuAbierto] = useState(false);
    const [esMobil, setEsMobil] = useState(false);
    const navRef = useRef(null);

    // Detectar si estamos en pantalla móvil
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 600px)");

        const actualizar = (e) => {
            setEsMobil(e.matches);

            // Si pasamos a escritorio, cerramos el menú móvil
            if (!e.matches) {
                setMenuAbierto(false);
            }
        };

        actualizar(mediaQuery);

        mediaQuery.addEventListener("change", actualizar);

        return () => {
            mediaQuery.removeEventListener("change", actualizar);
        };
    }, []);

    // Cerrar el menú al hacer clic fuera o presionar Escape
    useEffect(() => {
        if (!menuAbierto) {
            return;
        }

        const manejarClickFuera = (evento) => {
            if (
                navRef.current &&
                !navRef.current.contains(evento.target)
            ) {
                setMenuAbierto(false);
            }
        };

        const manejarEscape = (evento) => {
            if (evento.key === "Escape") {
                setMenuAbierto(false);
            }
        };

        document.addEventListener("mousedown", manejarClickFuera);
        document.addEventListener("keydown", manejarEscape);

        return () => {
            document.removeEventListener("mousedown", manejarClickFuera);
            document.removeEventListener("keydown", manejarEscape);
        };
    }, [menuAbierto]);

    // Botón principal:
    // - En móvil abre/cierra el menú
    // - En escritorio cambia el modo oscuro
    const manejarClicBoton = () => {
        if (esMobil) {
            setMenuAbierto((anterior) => !anterior);
        } else {
            alternarModoOscuro();
        }
    };

    // Cerrar menú después de seleccionar una opción
    const cerrarMenu = () => {
        setMenuAbierto(false);
    };

    // Texto accesible para el botón
    const etiquetaBoton = esMobil
        ? (menuAbierto ? "Cerrar menú" : "Abrir menú")
        : (modoOscuro
            ? "Desactivar modo oscuro"
            : "Activar modo oscuro");

    return (
        <header className="header">
            <div className="header-container">

                {/* LOGO */}
                <a
                    href="/"
                    className="logo"
                    aria-label="Pokédex, ir al inicio"
                >
                    <img
                        src={pokemonLogo}
                        alt="Pokémon"
                        className="logo-img"
                    />
                </a>

                {/* NAVEGACIÓN */}
                <nav
                    className="nav"
                    aria-label="Navegación principal"
                    ref={navRef}
                >
                    <ul className="nav-list">

                        {/* INICIO */}
                        <li className="nav-item-link">
                            <a href="#inicio">
                                Inicio
                            </a>
                        </li>

                        {/* POKÉDEX */}
                        <li className="nav-item-link">
                            <a href="#pokedex">
                                Pokédex
                            </a>
                        </li>

                        {/* BOTÓN DE MODO / MENÚ */}
                        <li className="nav-item-toggle">

                            <div className="toggle-wrapper">

                                <button
                                    type="button"
                                    className="theme-toggle"
                                    onClick={manejarClicBoton}
                                    aria-pressed={
                                        esMobil
                                            ? undefined
                                            : modoOscuro
                                    }
                                    aria-haspopup={
                                        esMobil
                                            ? "menu"
                                            : undefined
                                    }
                                    aria-expanded={
                                        esMobil
                                            ? menuAbierto
                                            : undefined
                                    }
                                    aria-controls={
                                        esMobil
                                            ? "menu-movil"
                                            : undefined
                                    }
                                    aria-label={etiquetaBoton}
                                >
                                    <span className="visually-hidden">
                                        {etiquetaBoton}
                                    </span>
                                </button>

                                {/* Flecha del menú móvil */}
                                {esMobil && (
                                    <span
                                        className={`menu-caret${
                                            menuAbierto
                                                ? " menu-caret--abierto"
                                                : ""
                                        }`}
                                        aria-hidden="true"
                                    />
                                )}

                            </div>

                            {/* MENÚ MÓVIL */}
                            {esMobil && menuAbierto && (
                                <ul
                                    className="mobile-menu"
                                    id="menu-movil"
                                    role="menu"
                                >

                                    {/* INICIO */}
                                    <li role="none">
                                        <a
                                            href="#inicio"
                                            role="menuitem"
                                            onClick={cerrarMenu}
                                        >
                                            Inicio
                                        </a>
                                    </li>

                                    {/* POKÉDEX */}
                                    <li role="none">
                                        <a
                                            href="#pokedex"
                                            role="menuitem"
                                            onClick={cerrarMenu}
                                        >
                                            Pokédex
                                        </a>
                                    </li>

                                    {/* MODO OSCURO */}
                                    <li
                                        role="none"
                                        className="mobile-menu-theme-item"
                                    >
                                        <button
                                            type="button"
                                            role="menuitem"
                                            className="mobile-menu-theme-btn"
                                            onClick={() => {
                                                alternarModoOscuro();
                                                cerrarMenu();
                                            }}
                                        >
                                            {modoOscuro
                                                ? "Modo claro"
                                                : "Modo oscuro"}
                                        </button>
                                    </li>

                                </ul>
                            )}

                        </li>

                    </ul>
                </nav>

            </div>
        </header>
    );
}

export default Header;