-- Diseño futuro para PostgreSQL/Supabase. NO ejecutar aún.
create table tenants(id uuid primary key, name text not null, slug text unique not null);
create table tenant_members(id uuid primary key, tenant_id uuid references tenants, user_id uuid not null, role text not null);
create table customers(id uuid primary key, tenant_id uuid references tenants, name text not null, phone text, email text);
create table products(id uuid primary key, tenant_id uuid references tenants, name text not null, category text, base_price numeric default 0, active boolean default true);
create table projects(id uuid primary key, tenant_id uuid references tenants, customer_id uuid references customers, title text, status text default 'draft');
create table mockups(id uuid primary key, tenant_id uuid references tenants, project_id uuid references projects, product_id uuid references products, preview_url text, placement jsonb, status text default 'draft');
create table quotes(id uuid primary key, tenant_id uuid references tenants, project_id uuid references projects, subtotal numeric, discount numeric, tax numeric, total numeric, status text default 'draft');
create table orders(id uuid primary key, tenant_id uuid references tenants, quote_id uuid references quotes, status text default 'new');