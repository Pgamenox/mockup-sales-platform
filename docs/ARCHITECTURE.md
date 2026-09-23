# Arquitectura multiempresa

Cada registro de negocio llevará tenant_id. Ninguna empresa podrá consultar información de otra.

Entidades iniciales:
- tenants
- profiles
- tenant_members
- customers
- customer_assets
- catalogs
- catalog_pages
- catalog_products
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


## Catálogos PDF
Cada tenant podrá tener múltiples catálogos de diferentes marcas y proveedores. La importación debe conservar:
- catálogo / proveedor / marca
- nombre de producto
- número de modelo, ID o SKU
- categoría y subcategoría
- página de origen
- imagen de referencia cuando pueda extraerse
- descripción y variantes
- vínculo opcional a una plantilla de mockup editable

El buscador comercial debe consultar el índice unificado sin importar si el producto es textil, taza, pluma, llavero, termo, bolsa, papelería u otro promocional.

La ficha importada desde PDF es referencia comercial. La plantilla de mockup y el arte final siguen siendo entidades separadas.
