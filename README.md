# Scope ISM Dashboard

Dashboard administrativo inspirado en Power BI para centralizar la operación de ventas de Claro Honduras para Inversiones y Soluciones Montecristo (ISM).

## Características principales

- **Frontend** con React + Vite + Tailwind CSS.
- **Integración con Supabase** para autenticación, base de datos y almacenamiento.
- **Componentes visuales** utilizando Recharts, Shadcn-like primitives y Lucide Icons.
- **Módulos** para dashboard general, vendedores, clientes, metas, comisiones, aliados y planilla imprimible.
- **Script de importación** desde Google Sheets a la tabla `ventas` en Supabase.

## Requisitos previos

- Node.js 18+
- Cuenta de Supabase con las tablas mencionadas en la documentación del proyecto.
- Hoja de cálculo en Google Sheets con acceso de servicio.

## Configuración inicial

1. Copia el archivo `.env.example` a `.env` y completa los valores:

   ```bash
   cp .env.example .env
   ```

   Variables necesarias:

   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SHEETS_ID`

2. Instala las dependencias (requiere acceso a npm):

   ```bash
   npm install
   ```

3. Ejecuta el entorno de desarrollo:

   ```bash
   npm run dev
   ```

4. Importa datos desde Google Sheets cuando necesites sincronizar:

   ```bash
   npm run import:sheets
   ```

## Scripts disponibles

- `npm run dev` – Inicia Vite en modo desarrollo.
- `npm run build` – Genera el build de producción.
- `npm run preview` – Previsualiza el build.
- `npm run lint` – Ejecuta ESLint sobre los archivos TypeScript/TSX.
- `npm run format` – Formatea con Prettier.
- `npm run import:sheets` – Sincroniza datos desde Google Sheets a Supabase.

## Estructura de carpetas

```
src/
  components/
    charts/           # Gráficas Recharts
    common/           # UI reutilizable (botones, cards)
    dashboard/        # Componentes específicos del dashboard
    layout/           # Sidebar, topbar y layout principal
    tables/           # Tablas por módulo
  data/               # Datos mock y fixtures
  hooks/              # Hooks personalizados (e.g. sincronización)
  lib/                # Clientes y configuraciones (Supabase)
  pages/              # Páginas por módulo
  styles/             # Estilos globales (Tailwind)
  main.tsx            # Entrada de React
  App.tsx             # Rutas principales
scripts/
  importFromSheets.ts # Script para importar datos desde Google Sheets
```

## Notas

- Los datos mostrados en la UI son mock para ilustrar la propuesta de diseño.
- Ajusta los componentes para conectarlos con las tablas reales de Supabase.
- La página de planilla usa `react-to-print` para generar una vista imprimible/PDF.
- Tailwind CSS está configurado con colores corporativos de ISM.
