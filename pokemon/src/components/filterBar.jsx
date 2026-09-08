import { useState } from "react";

const tipos = [
    "normal",
    "fuego",
    "agua",
    "eléctrico",
    "planta",
    "hielo",
    "lucha",
    "veneno",
    "tierra",
    "volador",
    "bicho",
    "piedra",
    "fantasma",
    "psíquico",
    "dragón",
    "siniestro",
    "acero",
    "hada"
];

function FilterBar({ onFiltrar }) {

    const [mostrarTodos, setMostrarTodos] = useState(false);

    const tiposVisibles = mostrarTodos
        ? tipos
        : tipos.slice(0, 5);

    return (
        <div className="filter-container">

            <div className="filter-title">
                Filtrar por tipo
            </div>

            <div className="filter-bar">

                {tiposVisibles.map((tipo) => (
                    <button
                        key={tipo}
                        className="filter-button"
                        onClick={() => onFiltrar(tipo)}
                    >
                        {tipo}
                    </button>
                ))}

            </div>

            <button
                className="show-more-button"
                onClick={() => setMostrarTodos(!mostrarTodos)}
            >
                {mostrarTodos
                    ? "Mostrar menos"
                    : "Mostrar más"
                }
            </button>

        </div>
    );
}

export default FilterBar;