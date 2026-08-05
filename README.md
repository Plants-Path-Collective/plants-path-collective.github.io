# Plants Path Collective — sitio web

Sitio estático (GitHub Pages). Los devlogs se escriben en Markdown y se
generan a HTML automáticamente vía GitHub Actions cada vez que subís un
`.md` nuevo — no hace falta correr nada a mano en el día a día.

## Escribir un devlog nuevo

1. Creá un archivo `.md` en `/devlogs` (mirá `fracture-prototype.md` como
   ejemplo del formato: frontmatter + texto + imágenes).
2. Commiteá y subí ese único archivo con GitHub Desktop, como siempre.
3. GitHub Actions corre solo, genera `devlog/{slug}.html` y actualiza
   `data/devlogs.json`, y los commitea de vuelta al repo (vas a ver un
   segundo commit automático de "github-actions[bot]" aparecer poco
   después de tu push). Podés seguirlo en la pestaña **Actions** del repo.

## Qué NO tocar a mano

- `data/devlogs.json` y `devlog/*.html` — se regeneran solos, cualquier
  edición manual se pierde en el próximo build.

## Correr el build localmente (opcional)

Solo hace falta si querés previsualizar un devlog antes de subirlo, o
estás debugueando el generador en sí:

1. Instalá [Node.js](https://nodejs.org/) si no lo tenés.
2. Desde la raíz del repo:

   ```
   cd scripts
   npm install
   node build-devlogs.js
   ```