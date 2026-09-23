import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
const auth = readFileSync(new URL('../src/AuthGate.jsx', import.meta.url), 'utf8');
const client = readFileSync(new URL('../src/supabaseClient.js', import.meta.url), 'utf8');
const checks = [
  ['cliente Supabase único', app.includes("from'./supabaseClient'") && !app.includes('createClient(')],
  ['acceso autenticado', auth.includes('signInWithPassword') && auth.includes('signUp')],
  ['aislamiento por empresa', app.includes("from('tenant_members')") && app.includes("eq('tenant_id',tid)")],
  ['catálogo administrable', app.includes('addProduct') && app.includes('deleteProduct') && app.includes('replaceProductPhoto')],
  ['flujo comercial', app.includes('approveAndOrder') && app.includes('production_jobs')],
  ['persistencia real', app.includes("from('products')") && app.includes("from('orders')")],
  ['catálogos compartidos', app.includes("from('catalogs')") && app.includes("from('catalog_pages')")],
  ['credencial sólo publicable', client.includes('sb_publishable_') && !client.includes('service_role')],
];

let failed = false;
for (const [name, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`);
  failed ||= !ok;
}
if (failed) process.exit(1);
