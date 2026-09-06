import { useState } from "react";

const tipos = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy"
];


function FilterBar({ onFiltrar }) {

    const [mostrarTodos, setMostrarTodos] = useState(false);

    const tiposVisibles = mostrarTodos
        ? tipos
        : tipos.slice(0, 5);


    return (
        <div className="filter-container">

            <div className="filter-bar">

                <button
                    onClick={() => onFiltrar("normal")}
                >
                    Normal
                </button>

                {tiposVisibles.map((tipo) => (
                    <button
                        key={tipo}
                        onClick={() => onFiltrar(tipo)}
                    >
                        {tipo}
                    </button>
                ))}

            </div>


            <button
                className="load-button"
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