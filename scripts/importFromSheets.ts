import 'dotenv/config';
import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';

type SheetRow = [
  numeroContrato: string,
  cliente: string,
  identidad: string,
  fechaContratacion: string,
  fechaInstalacion: string,
  paquete: string,
  tecnologia: string,
  monto: string,
  estado: string,
  zona: string,
  vendedorIdentidad: string,
  aliadoCodigo?: string
];

const supabaseUrl = process.env.VITE_SUPABASE_URL ?? '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
const googleSheetsId = process.env.GOOGLE_SHEETS_ID ?? '';
const googleEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? '';
const googlePrivateKeyRaw = process.env.GOOGLE_PRIVATE_KEY ?? '';
const googlePrivateKey = googlePrivateKeyRaw.replace(/\\n/g, '\n');

const missingEnv: string[] = [];

if (!supabaseUrl) missingEnv.push('VITE_SUPABASE_URL');
if (!supabaseServiceRoleKey) missingEnv.push('SUPABASE_SERVICE_ROLE_KEY');
if (!googleSheetsId) missingEnv.push('GOOGLE_SHEETS_ID');
if (!googleEmail) missingEnv.push('GOOGLE_SERVICE_ACCOUNT_EMAIL');
if (!googlePrivateKeyRaw) missingEnv.push('GOOGLE_PRIVATE_KEY');

if (missingEnv.length) {
  console.error(
    `Missing environment variables for Sheets import: ${missingEnv.join(', ')}.`
  );
  console.error('Verifica tu archivo .env y vuelve a ejecutar "npm run import:sheets".');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function loadSheetData() {
  const auth = new google.auth.JWT({
    email: googleEmail,
    key: googlePrivateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const { data } = await sheets.spreadsheets.values.get({
    spreadsheetId: googleSheetsId,
    range: 'Ventas!A2:L1000'
  });

  return (data.values ?? []) as SheetRow[];
}

async function upsertSales(rows: SheetRow[]) {
  if (!rows.length) {
    console.log('No hay datos nuevos para importar.');
    return;
  }

  const payload = rows.map((row) => ({
    numero_contrato: row[0],
    cliente_nombre: row[1],
    cliente_identidad: row[2],
    fecha_contratacion: row[3],
    fecha_instalacion: row[4],
    tipo_paquete: row[5],
    tecnologia: row[6],
    monto: Number(row[7]),
    estado: row[8],
    ciudad: row[9],
    vendedor_identidad: row[10],
    aliado_codigo: row[11] ?? null
  }));

  const { error } = await supabase.from('ventas').upsert(payload, {
    onConflict: 'numero_contrato'
  });

  if (error) {
    throw error;
  }

  console.log(`Se importaron ${payload.length} registros de ventas.`);
}

async function main() {
  try {
    const rows = await loadSheetData();
    await upsertSales(rows);
  } catch (error) {
    console.error('Error al importar datos desde Google Sheets', error);
    process.exit(1);
  }
}

main();
