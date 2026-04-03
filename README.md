# Portfolio de Fernando Zárate

Aplicación web de portfolio personal construida con React + TypeScript + Vite.

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
md/
  architecture.md
```

## Documentación técnica
- Arquitectura y responsabilidades: [md/architecture.md](./md/architecture.md)
- Reglas internas de colaboración IA: [md/rules_ia.md](./md/rules_ia.md)

## Notas de diseño y consistencia
- El contenido de proyectos vive en `src/data/projects.ts`.
- El tipo compartido de proyecto vive en `src/types/project.ts`.
- Cards y modal reutilizan estilos de enlaces y stack para mantener identidad visual consistente.
- Los efectos visuales "glass" usan tokens globales definidos en `src/index.css`.
