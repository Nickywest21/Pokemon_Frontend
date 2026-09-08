import { useState } from "react";

import Header from "./sections/header";
import Hero from "./sections/hero";
import Footer from "./sections/footer";

import SearchBar from "./components/searchBar";
import FilterBar from "./components/filterBar";
import PokemonGrid from "./components/pokemonGrid";
import PokemonModal from "./components/pokemonModal";

import {
    buscarPokemon,
    buscarPorTipo
} from "./services/pokemonApi";

import "./App.css";


function App() {

    const [busqueda, setBusqueda] = useState("");
    const [pokemons, setPokemons] = useState([]);

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    // Pokémon seleccionado para mostrar el modal
    const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);

    // Modo oscuro
    const [modoOscuro, setModoOscuro] = useState(() => {
        const guardado = localStorage.getItem("modoOscuro");
        return guardado === "true";
    });


    // MOSTRAR INFORMACIÓN DEL POKÉMON
    const mostrarPokemon = async (pokemon) => {

        try {

            setCargando(true);
            setError("");

            // Pedimos nuevamente la información completa
            // incluyendo habilidades y estadísticas
            const datos = await buscarPokemon(pokemon.nombre);

            setPokemonSeleccionado(datos);

        } catch (error) {

            console.error(error);

            setError(
                "No pudimos cargar la información del Pokémon."
            );

        } finally {

            setCargando(false);

        }
    };


    // BUSCAR POKÉMON POR NOMBRE
    const buscar = async () => {

        if (!busqueda.trim()) {
            return;
        }

        try {

            setCargando(true);
            setError("");

            const pokemon = await buscarPokemon(busqueda);

            setPokemons([pokemon]);

        } catch (error) {

            console.error(error);

            setPokemons([]);

            setError("No encontramos ese Pokémon.");

        } finally {

            setCargando(false);

        }
    };


    // FILTRAR POKÉMON POR TIPO
    const filtrarPorTipo = async (tipo) => {

        if (!tipo) {
            return;
        }

        try {

            setCargando(true);
            setError("");

            const resultado = await buscarPorTipo(tipo);

            const nombres = resultado.pokemon;

            const datosPokemon = await Promise.all(
                nombres
                    .slice(0, 12)
                    .map((nombre) => buscarPokemon(nombre))
            );

            setPokemons(datosPokemon);

        } catch (error) {

            console.error(error);

            setPokemons([]);

            setError(
                "No pudimos cargar los Pokémon de este tipo."
            );

        } finally {

            setCargando(false);

        }
    };


    // ALTERNAR MODO OSCURO
    const alternarModoOscuro = () => {

        setModoOscuro((anterior) => {

            const nuevoValor = !anterior;

            localStorage.setItem(
                "modoOscuro",
                nuevoValor
            );

            return nuevoValor;
        });
    };


    return (

        <div className={`app${modoOscuro ? " dark" : ""}`}>

            <Header
                modoOscuro={modoOscuro}
                alternarModoOscuro={alternarModoOscuro}
            />

            <main>

                <Hero />

                <section
                    className="pokedex-section"
                    id="pokedex"
                >

                    <div className="section-header">

                        <h2>Pokédex</h2>

                        <p>
                            Busca un Pokémon o filtra por tipo.
                        </p>

                    </div>


                    <SearchBar
                        busqueda={busqueda}
                        setBusqueda={setBusqueda}
                        onBuscar={buscar}
                    />


                    <FilterBar
                        onFiltrar={filtrarPorTipo}
                    />


                    {cargando && (
                        <p className="loading">
                            Cargando Pokémon...
                        </p>
                    )}


                    {error && (
                        <p className="error">
                            {error}
                        </p>
                    )}


                    {!cargando && !error && (
                        <PokemonGrid
                            pokemons={pokemons}
                            onPokemonClick={mostrarPokemon}
                        />
                    )}


                    {/* MODAL DEL POKÉMON */}
                    {pokemonSeleccionado && (
                        <PokemonModal
                            pokemon={pokemonSeleccionado}
                            onCerrar={() =>
                                setPokemonSeleccionado(null)
                            }
                        />
                    )}

                </section>

            </main>

            <Footer />

        </div>
    );
}

export default App;