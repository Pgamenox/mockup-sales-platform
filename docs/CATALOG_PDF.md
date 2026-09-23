# Módulo de catálogos PDF

## Objetivo
Permitir que cada empresa cargue varios catálogos PDF de diferentes marcas o proveedores y encuentre productos rápidamente desde un buscador unificado.

## Flujo del vendedor
1. Subir catálogo PDF.
2. Asignar proveedor y/o marca.
3. MockuPro procesa páginas y crea un índice de productos.
4. El vendedor busca por marca, nombre, número de modelo, ID, SKU, categoría o palabra clave.
5. El resultado muestra producto, marca, modelo/ID, página del catálogo y miniatura si está disponible.
6. El vendedor selecciona el producto.
7. Si existe plantilla de mockup, abre directamente el editor.
8. Si no existe, puede crear o asociar una plantilla visual al producto.

## Campos mínimos de índice
- tenant_id
- catalog_id
- provider
- brand
- product_name
- model_number
- sku
- category
- subcategory
- description
- source_page
- image_reference
- product_template_id opcional

## Búsqueda
Debe tolerar búsquedas como:
- "Bic pluma 102"
- "taza blanca 11 oz"
- "llavero modelo K45"
- "playera Yazbek 0200"
- "termo negro"

La búsqueda debe priorizar coincidencia exacta de modelo/ID/SKU y después marca + nombre + descripción.

## Escalabilidad
El módulo no debe asumir categorías fijas. Debe aceptar textiles, gorras, tazas, plumas, llaveros, termos, bolsas, papelería, señalización y nuevos tipos de producto.

## Regla de origen
Una ficha importada conserva siempre el catálogo y página de donde salió. La información del PDF sirve para localizar y cotizar el producto; la plantilla de mockup se administra por separado.
