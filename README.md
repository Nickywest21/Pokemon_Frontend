# Cliente Pokédex - Interfaz Web con React + Vite

Aplicación cliente interactiva desarrollada con React 19 y Vite para explorar el catálogo de Pokémon en tiempo real. La interfaz ofrece capacidades de búsqueda directa por nombre, filtrado modular por categorías elementales, visualización de datos normalizados y persistencia del tema de interfaz mediante almacenamiento local.

El proyecto está diseñado bajo una arquitectura desacoplada, consumiendo exclusivamente los datos procesados y reformados por nuestra propia API local construida en Express + TypeScript, garantizando una experiencia fluida, rápida y segura en el navegador.

## Cómo correrlo

Para ejecutar el proyecto necesitás tener instalado Node.js (versión 18 o superior).

Primero, descargá o cloná el proyecto y entrá a la subcarpeta donde reside la aplicación:

```bash
git clone https://github.com/Nickywest21/Pokemon_Frontend.git
cd Pokemon_Frontend/pokemon

```

Después, instalá las dependencias necesarias:

```bash
npm install

```

Finalmente, iniciá el servidor de desarrollo:

```bash
npm run dev

```

Vite mostrará una dirección local en la terminal similar a:

```text
http://localhost:5173/

```

Abrí esa dirección en tu navegador para visualizar el sitio.

> **Nota importante:** Para que las búsquedas y los filtros devuelvan información real, asegurate de tener en ejecución simultánea el servidor backend en `http://localhost:3000`.
> 
> 

## Cómo está armado

El proyecto está organizado de la siguiente manera:

```text
Pokemon_Frontend/
├── pokemon/
│   ├── src/
│   │   ├── components/
│   │   │   ├── filterBar.jsx
│   │   │   ├── pokemonCard.jsx
│   │   │   ├── pokemonGrid.jsx
│   │   │   └── searchBar.jsx
│   │   ├── sections/
│   │   │   ├── footer.jsx
│   │   │   ├── header.jsx
│   │   │   └── hero.jsx
│   │   ├── services/
│   │   │   └── pokemonApi.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── eslint.config.js
└── README.md

```

## Componentes principales

| Archivo | Función |
| --- | --- |
| `App.jsx` | Componente raíz que orquesta los estados globales: búsqueda, resultados, indicadores de carga, errores y modo oscuro. |
| `pokemonApi.js` | Capa de servicios que centraliza y abstrae las llamadas asíncronas con `fetch` hacia los endpoints locales. |
| `searchBar.jsx` | Formulario controlado para capturar el término de búsqueda y disparar consultas sin recargar la página. |
| `filterBar.jsx` | Barra interactiva de tipos elementales con control de expansión visual (mostrar más / menos) y mapeo semántico. |
| `pokemonGrid.jsx` | Contenedor en cuadrícula que itera la lista de Pokémon o muestra mensajes de estado vacío e informativos. |
| `pokemonCard.jsx` | Tarjeta individual que renderiza la ilustración oficial, identificador formateado (#001), nombre y tipos. |

## Conexión con el Backend (Proxy Inverso)

Durante el ciclo de desarrollo local, la interfaz corre en el puerto `5173`, mientras que la API en Express atiende en el puerto `3000`. Para comunicar ambos servicios sin bloqueos de seguridad por políticas de origen cruzado (CORS) ni errores 404 ocasionados por URLs relativas, se configuró un **proxy inverso** en `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
    },
  },
}

```

Gracias a esta configuración, cualquier solicitud dirigida a `/api/pokemon/:nombre` o `/api/tipo/:tipo` es interceptada por Vite y redirigida de forma transparente hacia el servidor backend local.

## Búsqueda y validaciones en el cliente

Para ofrecer una experiencia de usuario sólida y prevenir errores de red innecesarios, la interfaz implementa las siguientes validaciones defensivas:

* **Control de entradas vacías:** Se valida mediante `!busqueda.trim()` para no disparar peticiones a la API si el usuario envía espacios en blanco.
* **Estandarización de texto:** Las cadenas de búsqueda se convierten a minúsculas (`toLowerCase()`) antes de enviarse al servicio, evitando desajustes con los nombres registrados en el servidor.
* **Manejo resiliente de errores 404:** Cuando el servidor responde con código 404 (*"No lo encontré"*), la aplicación intercepta la excepción en el bloque `catch` y presenta un aviso visual claro (*"No encontramos ese Pokémon."*) sin interrumpir la ejecución ni congelar la pantalla.



## Filtro por categorías elementales

El catálogo permite explorar criaturas por su afinidad elemental. Para balancear la usabilidad en pantallas pequeñas y de escritorio, la barra muestra inicialmente las 5 categorías principales y permite desplegar el listado completo mediante un botón interactivo.

Para resolver la discrepancia de idiomas entre la experiencia de usuario (en español) y los requerimientos del backend y PokéAPI (en inglés), el componente implementa un mapeo semántico bidireccional:

| Tipo visible (Español) | Valor técnico enviado a la API |
| --- | --- |
| Normal | `normal` |
| Fuego | `fire` |
| Agua | `water` |
| Eléctrico | `electric` |
| Planta | `grass` |
| Hielo | `ice` |
| Lucha | `fighting` |
| Veneno | `poison` |
| Tierra | `ground` |
| Volador | `flying` |
| Bicho | `bug` |
| Roca | `rock` |
| Fantasma | `ghost` |
| Psíquico | `psychic` |
| Dragón | `dragon` |
| Siniestro | `dark` |
| Acero | `steel` |
| Hada | `fairy` |

## Matriz de decisión técnica de Frontend

Para definir la tecnología del cliente web se evaluaron tres enfoques según las necesidades del proyecto:

| Criterio | React + Vite | HTML/JS Vanilla | Next.js (SSR) |
| --- | --- | --- | --- |
| Reactividad y manejo de estado | 5 | 2 | 5 |
| Velocidad del entorno de desarrollo | 5 | 4 | 3 |
| Modularidad de componentes reutilizables | 5 | 2 | 5 |
| Curva de configuración y simplicidad | 4 | 5 | 2 |
| **Puntuación total** | **19 / 20** | **13 / 20** | **15 / 20** |

### Justificación de elección

Se eligió **React 19 empaquetado con Vite** porque:

1. **Velocidad de recarga (HMR):** Vite utiliza módulos nativos de ES en el navegador, permitiendo actualizaciones instantáneas en pantalla sin compilar todo el árbol de archivos.
2. **Manejo de estado predecible:** Hooks como `useState` facilitan la sincronización de las búsquedas, filtros activos, respuestas del servidor y temas visuales.
3. **Escalabilidad de interfaz:** La arquitectura basada en componentes (`PokemonCard`, `FilterBar`, `SearchBar`) permite aislar la lógica de presentación y simplifica el mantenimiento.

## Preguntas de revisión (Compound Engineering)

Las siguientes reflexiones analizan los desafíos y decisiones de diseño tomadas durante la integración del frontend:

1. **¿Cuál fue la decisión técnica más difícil?**
Resolver la comunicación entre el puerto 5173 del cliente y el puerto 3000 del servidor. En lugar de modificar el backend instalando librerías adicionales de CORS, se optó por un proxy inverso en el servidor de desarrollo de Vite, resolviendo el problema enteramente desde el cliente sin comprometer la seguridad.


2. **¿Qué alternativas se descartaron?**
Se descartó consumir la PokéAPI directamente desde el cliente web. Aunque era técnicamente posible, rompía el contrato de la cátedra que requería un backend intermedio que reformara los datos para entregar únicamente información limpia y optimizada.


3. **¿De qué estamos menos seguros?**
De la estrategia de concurrencia al filtrar por tipo mediante `Promise.all` sobre los primeros 12 Pokémon. Si una sola de las peticiones falla con 404, toda la carga se interrumpe; una alternativa más tolerante a fallos para futuras versiones sería utilizar `Promise.allSettled`.

## Tecnologías utilizadas

| Tecnología / herramienta | Uso |
| --- | --- |
| React 19 | Biblioteca principal para el desarrollo de la interfaz de usuario basada en componentes reactivos. |
| Vite 8 | Servidor local de desarrollo rápido, empaquetador de módulos y gestor del proxy de red. |
| JavaScript (ESModules) | Lógica de la aplicación, control de eventos asíncronos y consumo de servicios con `fetch`. |
| CSS3 | Reglas de estilo modular, maquetación responsiva con CSS Grid/Flexbox y variables de color para tema oscuro. |
| Git / GitHub | Control de versiones distribuido y flujo de trabajo colaborativo mediante ramas y Pull Requests.

 |
