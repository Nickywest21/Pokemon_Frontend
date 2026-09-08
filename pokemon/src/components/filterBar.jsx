import { useState } from "react";

const tipos = [
<<<<<<< HEAD
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "posion",
    "ground",
    "flying",
    "bug",
    "rock",
    "ghost",
    "psychic",
    "dragon",
    "dark",
    "steel",
    "fairy"
=======
  { label: "Normal", valor: "normal" },
  { label: "Fuego", valor: "fire" },
  { label: "Agua", valor: "water" },
  { label: "Eléctrico", valor: "electric" },
  { label: "Planta", valor: "grass" },
  { label: "Hielo", valor: "ice" },
  { label: "Lucha", valor: "fighting" },
  { label: "Veneno", valor: "poison" },
  { label: "Tierra", valor: "ground" },
  { label: "Volador", valor: "flying" },
  { label: "Bicho", valor: "bug" },
  { label: "Roca", valor: "rock" },
  { label: "Fantasma", valor: "ghost" },
  { label: "Psíquico", valor: "psychic" },
  { label: "Dragón", valor: "dragon" },
  { label: "Siniestro", valor: "dark" },
  { label: "Acero", valor: "steel" },
  { label: "Hada", valor: "fairy" }
>>>>>>> Nicky
];

function FilterBar({ onFiltrar }) {
  const [mostrarTodos, setMostrarTodos] = useState(false);

  const tiposVisibles = mostrarTodos ? tipos : tipos.slice(0, 5);

  return (
    <div className="filter-container">
      <div className="filter-title">
        Filtrar por tipo
      </div>

      <div className="filter-bar">
        {tiposVisibles.map((tipo) => (
          <button
            key={tipo.valor}
            className="filter-button"
            onClick={() => onFiltrar(tipo.valor)}
          >
            {tipo.label}
          </button>
        ))}
      </div>

      <button
        className="show-more-button"
        onClick={() => setMostrarTodos(!mostrarTodos)}
      >
        {mostrarTodos ? "Mostrar menos" : "Mostrar más"}
      </button>
    </div>
  );
}

export default FilterBar;