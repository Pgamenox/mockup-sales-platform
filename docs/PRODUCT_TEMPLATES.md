# Product template specification

Cada producto comercial debe poder definir una plantilla visual independiente del logo del cliente.

## Campos
- id
- tenant_id
- catalog_id opcional
- brand / marca
- model_number / número de modelo o ID
- source_page opcional
- nombre
- categoría
- SKU
- imagen base
- colores disponibles
- precio base
- áreas imprimibles

## Área imprimible
Cada zona puede incluir:
- nombre (pecho, espalda, manga, frente, etc.)
- x / y
- ancho / alto máximo
- rotación permitida
- método (impresión, sublimación, bordado, vinil)
- máscara opcional
- perspectiva opcional

## Regla
El logo se compone sobre la plantilla del producto. La IA no debe inventar el producto estándar. IA se reserva para propuestas creativas o generación de conceptos.

## Gran formato
Lonas y piezas similares además requieren ancho/alto reales, unidades, sangrado y resolución objetivo. El mockup comercial permanece separado del arte final.


## Activos maestros v1
Para el catálogo demo de MockuPro se consideran aprobados como base visual v1:
- Playera blanca frontal: maestra v1 para textil plano. Requiere máscara/área de impresión frontal.
- Taza blanca 11 oz: maestra v1 para cerámica. Requiere curvatura/perspectiva específica de superficie cilíndrica.
- Gorra blanca frontal: maestra v1 para bordado/transfer. Requiere máscara curva sobre el panel frontal.

Estas imágenes sirven como plantillas demostrativas y no sustituyen la fotografía exacta del modelo de un proveedor. Cuando un producto provenga de un catálogo PDF, su ficha deberá conservar marca y número de modelo y, si existe una foto oficial utilizable, asociarla como referencia del producto.
