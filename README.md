# Portfolio de Fernando Zárate

Portfolio personal construido con React + TypeScript + Vite.

Este repositorio corresponde a una version anterior del portfolio y queda publicado como proyecto archivado de referencia.

La version actual es la v2 y vive en [ferz7e.me](https://ferz7e.me).

Este codigo se conserva en GitHub como muestra del enfoque visual y tecnico de esa etapa del proyecto.

## Stack
- React 19
- TypeScript
- Vite
- Three.js (fondo de partículas)
- CSS modular por archivo (`index.css` + `App.css`)

## Scripts
- `npm run dev`: entorno local
- `npm run build`: compilación de producción
- `npm run preview`: previsualización del build
- `npm run lint`: validación estática de código

## Estructura principal
```txt
src/
  components/
  data/
  types/
  App.tsx
  App.css
  index.css
  main.tsx
```

## Notas de diseño y consistencia
- El contenido de proyectos vive en `src/data/projects.ts`.
- El tipo compartido de proyecto vive en `src/types/project.ts`.
- Cards y modal reutilizan estilos compartidos de links y tags para mantener consistencia visual.
- Los efectos visuales tipo glass y los tokens base viven en `src/index.css`.

## Scripts
- `npm run dev`: entorno local
- `npm run build`: compilación de producción
- `npm run preview`: previsualización del build
- `npm run lint`: validación estática de código
