# Arquitectura multiempresa

Cada registro de negocio llevará tenant_id. Ninguna empresa podrá consultar información de otra.

Entidades iniciales:
- tenants
- profiles
- tenant_members
- customers
- customer_assets
- products
- product_variants
- print_areas
- projects
- mockups
- quotes / quote_items
- approvals
- orders

Roles: platform_owner, tenant_admin, salesperson, designer, production.

El motor de mockup se mantendrá separado del motor de arte final y del flujo comercial.
