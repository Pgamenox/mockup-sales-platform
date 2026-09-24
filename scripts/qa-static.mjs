import { readFileSync } from "node:fs";

const app = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
const auth = readFileSync(
  new URL("../src/AuthGate.jsx", import.meta.url),
  "utf8",
);
const client = readFileSync(
  new URL("../src/supabaseClient.js", import.meta.url),
  "utf8",
);
const checks = [
  [
    "cliente Supabase único",
    app.includes("./supabaseClient") && !app.includes("createClient("),
  ],
  [
    "acceso autenticado",
    auth.includes("signInWithPassword") && auth.includes("signUp"),
  ],
  [
    "acceso protegido contra doble envío",
    auth.includes("submitting") &&
      auth.includes("disabled={submitting || sendingLink}") &&
      auth.includes("authMessage"),
  ],
  [
    "aislamiento por empresa",
    app.includes('from("tenant_members")') &&
      app.includes('.eq("tenant_id", tid)'),
  ],
  [
    "catálogo administrable",
    app.includes("addProduct") &&
      app.includes("deleteProduct") &&
      app.includes("replaceProductPhoto"),
  ],
  [
    "navegación por rol",
    app.includes("roleModules") &&
      app.includes("visibleModules.map") &&
      app.includes('active !== "Inicio"'),
  ],
  [
    "edición de producto por rol",
    app.includes("if (!canManageProducts)") &&
      app.includes("{canManageProducts ?") &&
      app.includes("{canManageProducts &&"),
  ],
  [
    "clientes protegidos por rol",
    app.includes("if (!canManageClients)") &&
      app.includes("{canManageClients &&"),
  ],
  [
    "cotización protegida por rol",
    app.includes("canCreateQuotes") && app.includes("{canCreateQuotes &&"),
  ],
  [
    "flujo comercial",
    app.includes("approveAndOrder") &&
      app.includes('"approve_quote_to_production"') &&
      app.includes("production_jobs"),
  ],
  [
    "clientes compartidos",
    app.includes('from("customers")') &&
      app.includes('.insert({') &&
      app.includes("deleteClient"),
  ],
  [
    "cotizaciones compartidas",
    app.includes('from("quotes")') &&
      app.includes("saveProposal") &&
      app.includes("setProposalStatus"),
  ],
  [
    "persistencia real",
    app.includes('from("products")') &&
      app.includes('from("customers")') &&
      app.includes('from("quotes")') &&
      app.includes('from("orders")'),
  ],
  [
    "catálogos compartidos",
    app.includes('from("catalogs")') && app.includes('from("catalog_pages")'),
  ],
  [
    "credencial sólo publicable",
    client.includes("sb_publishable_") && !client.includes("service_role"),
  ],
];

let failed = false;
for (const [name, ok] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"} ${name}`);
  failed ||= !ok;
}
if (failed) process.exit(1);

