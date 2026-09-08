const API_URL = "/api";


export async function buscarPokemon(nombre) {
    const respuesta = await fetch(
        `${API_URL}/pokemon/${nombre.toLowerCase()}`
    );

    if (!respuesta.ok) {
        throw new Error("Pokémon no encontrado");
    }

    return await respuesta.json();
}


export async function buscarPorTipo(tipo) {

    const respuesta = await fetch(
        `${API_URL}/tipo/${tipo.toLowerCase()}`
    );

    if (!respuesta.ok) {
        throw new Error("Tipo no encontrado");
    }

    return await respuesta.json();
}