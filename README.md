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

## Configurar la sincronización con Google Sheets

1. **Crea un proyecto y una cuenta de servicio en Google Cloud**
   - Entra a [console.cloud.google.com](https://console.cloud.google.com/).
   - Crea un proyecto (o usa uno existente) y habilita la API de Google Sheets.
   - En "APIs y servicios" → "Credenciales" crea una cuenta de servicio y descarga la clave JSON.

2. **Obtén las variables para el `.env`**
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` corresponde al campo `client_email` del JSON.
   - `GOOGLE_PRIVATE_KEY` es el valor de `private_key`. Sustituye cada salto de línea por `\n` y envuélvelo entre comillas dobles, por ejemplo:

     ```env
     GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIB...\n-----END PRIVATE KEY-----\n"
     ```

3. **Comparte la hoja de cálculo con la cuenta de servicio**
   - Abre la hoja que contiene las ventas.
   - Pulsa "Compartir" e introduce el correo de la cuenta de servicio (`...@...gserviceaccount.com`) con permiso de lector.
   - Copia el ID del documento (la cadena entre `/d/` y `/edit` en la URL) y colócalo en `GOOGLE_SHEETS_ID`.

4. **Verifica el rango esperado del script**
   - El script lee la pestaña `Ventas` desde `A2` hasta `L1000`. Ajusta el rango en `scripts/importFromSheets.ts` si tu hoja usa otro nombre o columnas.
   - El orden de las columnas debe coincidir con: número de contrato, cliente, identidad, fecha de contratación, fecha de instalación, paquete, tecnología, monto, estado, zona/ciudad, identidad del vendedor y código de aliado.

5. **Ejecuta la importación**
   - Con el `.env` configurado y las dependencias instaladas, ejecuta:

     ```bash
     npm run import:sheets
     ```

   - El script autentica con Google, descarga las filas y hace `upsert` en la tabla `ventas` de Supabase usando `SUPABASE_SERVICE_ROLE_KEY`.
   - Si falta alguna variable (`SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_PRIVATE_KEY`, etc.) verás un mensaje indicando exactamente cuál debes completar antes de reintentar.

6. **Programa sincronizaciones periódicas (opcional)**
   - Puedes ejecutar el comando manualmente cuando quieras refrescar datos.
   - Para automatizarlo, usa un cron job (por ejemplo, GitHub Actions, Supabase Edge Functions o un servidor propio) que ejecute `npm run import:sheets` con las mismas variables de entorno.

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
