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
   
---

## Estructura de carpetas

```markdown
plants-path-collective.github.io/
├── assets/
│   ├── devlogs/
│   │   └── hunters-fracture/
│   ├── misc/
│   │   ├── avatars/
│   │   │   └── marchel.gif
│   │   ├── icon.webp
│   │   ├── logo_nav.webp
│   │   └── logo_x3.webp
│   └── projects/
│       ├── break-bubble/
│       │   ├── break-bubble_bg.webp
│       │   └── break-bubble_thumbnail.webp
│       ├── car-loop/
│       │   ├── car-loop_bg.webp
│       │   └── car-loop_thumbnail.webp
│       ├── hunters-awakening/
│       │   └── hunters-awakening_thumbnail.webp
│       └── hunters-fracture/
│           └── hunters-fracture_thumbnail.webp
├── css/
│   └── styles.css
├── data/
│   ├── data.json
│   └── devlogs.json
├── devlog/
│   └── devlog-template.html
├── devlogs/
│   └── devlog-template.md
├── js/
│   └── script.js
├── scripts/
│   ├── node_modules/
│   │   ├── argparse/
│   │   │   ├── lib/
│   │   │   │   ├── action/
│   │   │   │   │   ├── append/
│   │   │   │   │   │   └── constant.js
│   │   │   │   │   ├── store/
│   │   │   │   │   │   ├── constant.js
│   │   │   │   │   │   ├── false.js
│   │   │   │   │   │   └── true.js
│   │   │   │   │   ├── append.js
│   │   │   │   │   ├── count.js
│   │   │   │   │   ├── help.js
│   │   │   │   │   ├── store.js
│   │   │   │   │   ├── subparsers.js
│   │   │   │   │   └── version.js
│   │   │   │   ├── argument/
│   │   │   │   │   ├── error.js
│   │   │   │   │   ├── exclusive.js
│   │   │   │   │   └── group.js
│   │   │   │   ├── help/
│   │   │   │   │   ├── added_formatters.js
│   │   │   │   │   └── formatter.js
│   │   │   │   ├── action.js
│   │   │   │   ├── action_container.js
│   │   │   │   ├── argparse.js
│   │   │   │   ├── argument_parser.js
│   │   │   │   ├── const.js
│   │   │   │   ├── namespace.js
│   │   │   │   └── utils.js
│   │   │   ├── CHANGELOG.md
│   │   │   ├── LICENSE
│   │   │   ├── README.md
│   │   │   ├── index.js
│   │   │   └── package.json
│   │   ├── esprima/
│   │   │   ├── bin/
│   │   │   │   ├── esparse.js
│   │   │   │   └── esvalidate.js
│   │   │   ├── dist/
│   │   │   │   └── esprima.js
│   │   │   ├── ChangeLog
│   │   │   ├── LICENSE.BSD
│   │   │   ├── README.md
│   │   │   └── package.json
│   │   ├── extend-shallow/
│   │   │   ├── LICENSE
│   │   │   ├── README.md
│   │   │   ├── index.js
│   │   │   └── package.json
│   │   ├── gray-matter/
│   │   │   ├── lib/
│   │   │   │   ├── defaults.js
│   │   │   │   ├── engine.js
│   │   │   │   ├── engines.js
│   │   │   │   ├── excerpt.js
│   │   │   │   ├── parse.js
│   │   │   │   ├── stringify.js
│   │   │   │   ├── to-file.js
│   │   │   │   └── utils.js
│   │   │   ├── CHANGELOG.md
│   │   │   ├── LICENSE
│   │   │   ├── README.md
│   │   │   ├── gray-matter.d.ts
│   │   │   ├── index.js
│   │   │   └── package.json
│   │   ├── is-extendable/
│   │   │   ├── LICENSE
│   │   │   ├── README.md
│   │   │   ├── index.js
│   │   │   └── package.json
│   │   ├── js-yaml/
│   │   │   ├── bin/
│   │   │   │   └── js-yaml.js
│   │   │   ├── dist/
│   │   │   │   ├── js-yaml.js
│   │   │   │   └── js-yaml.min.js
│   │   │   ├── lib/
│   │   │   │   ├── js-yaml/
│   │   │   │   │   ├── schema/
│   │   │   │   │   │   ├── core.js
│   │   │   │   │   │   ├── default_full.js
│   │   │   │   │   │   ├── default_safe.js
│   │   │   │   │   │   ├── failsafe.js
│   │   │   │   │   │   └── json.js
│   │   │   │   │   ├── type/
│   │   │   │   │   │   ├── js/
│   │   │   │   │   │   │   ├── function.js
│   │   │   │   │   │   │   ├── regexp.js
│   │   │   │   │   │   │   └── undefined.js
│   │   │   │   │   │   ├── binary.js
│   │   │   │   │   │   ├── bool.js
│   │   │   │   │   │   ├── float.js
│   │   │   │   │   │   ├── int.js
│   │   │   │   │   │   ├── map.js
│   │   │   │   │   │   ├── merge.js
│   │   │   │   │   │   ├── null.js
│   │   │   │   │   │   ├── omap.js
│   │   │   │   │   │   ├── pairs.js
│   │   │   │   │   │   ├── seq.js
│   │   │   │   │   │   ├── set.js
│   │   │   │   │   │   ├── str.js
│   │   │   │   │   │   └── timestamp.js
│   │   │   │   │   ├── common.js
│   │   │   │   │   ├── dumper.js
│   │   │   │   │   ├── exception.js
│   │   │   │   │   ├── loader.js
│   │   │   │   │   ├── mark.js
│   │   │   │   │   ├── schema.js
│   │   │   │   │   └── type.js
│   │   │   │   └── js-yaml.js
│   │   │   ├── LICENSE
│   │   │   ├── README.md
│   │   │   ├── index.js
│   │   │   └── package.json
│   │   ├── kind-of/
│   │   │   ├── CHANGELOG.md
│   │   │   ├── LICENSE
│   │   │   ├── README.md
│   │   │   ├── index.js
│   │   │   └── package.json
│   │   ├── marked/
│   │   │   ├── bin/
│   │   │   │   ├── main.js
│   │   │   │   └── marked.js
│   │   │   ├── lib/
│   │   │   │   ├── marked.d.ts
│   │   │   │   ├── marked.esm.js
│   │   │   │   ├── marked.esm.js.map
│   │   │   │   ├── marked.umd.js
│   │   │   │   └── marked.umd.js.map
│   │   │   ├── man/
│   │   │   │   ├── marked.1
│   │   │   │   └── marked.1.md
│   │   │   ├── LICENSE
│   │   │   ├── README.md
│   │   │   └── package.json
│   │   ├── section-matter/
│   │   │   ├── LICENSE
│   │   │   ├── README.md
│   │   │   ├── index.js
│   │   │   └── package.json
│   │   ├── sprintf-js/
│   │   │   ├── demo/
│   │   │   │   └── angular.html
│   │   │   ├── dist/
│   │   │   │   ├── angular-sprintf.min.js
│   │   │   │   ├── angular-sprintf.min.js.map
│   │   │   │   ├── angular-sprintf.min.map
│   │   │   │   ├── sprintf.min.js
│   │   │   │   ├── sprintf.min.js.map
│   │   │   │   └── sprintf.min.map
│   │   │   ├── src/
│   │   │   │   ├── angular-sprintf.js
│   │   │   │   └── sprintf.js
│   │   │   ├── test/
│   │   │   │   └── test.js
│   │   │   ├── LICENSE
│   │   │   ├── README.md
│   │   │   ├── bower.json
│   │   │   ├── gruntfile.js
│   │   │   └── package.json
│   │   └── strip-bom-string/
│   │       ├── LICENSE
│   │       ├── README.md
│   │       ├── index.js
│   │       └── package.json
│   ├── build-devlogs.js
│   ├── devlog-template.html
│   ├── package-lock.json
│   └── package.json
├── LICENSE
├── README.md
└── index.html

```