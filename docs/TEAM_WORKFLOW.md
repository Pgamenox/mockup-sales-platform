# MockuPro — Flujo multiusuario de empresa

## Objetivo
Permitir que una empresa opere MockuPro con un administrador y múltiples vendedores, diseño y producción, manteniendo catálogos, clientes, ventas, compras a proveedor y producción dentro del mismo tenant.

## Roles

### tenant_admin — Administrador
- Administra usuarios y roles.
- Invita vendedores, diseño, producción y encargado de catálogos.
- Puede retirar accesos.
- Ve toda la operación de la empresa.
- Administra proveedores.
- Supervisa catálogos, ventas, producción y compras.

### catalog_manager — Encargado de catálogos
- Sube nuevos catálogos PDF.
- Reemplaza/archiva catálogos anteriores.
- Revisa productos extraídos.
- Vincula productos del proveedor con plantillas de mockup.
- No administra usuarios ni finanzas generales.

### salesperson — Vendedor
- Consulta todos los catálogos activos de la empresa.
- Busca por marca, modelo, ID, SKU y categoría.
- Registra clientes.
- Crea mockups, cotizaciones y pedidos.
- Ve el avance de sus pedidos.
- No elimina catálogos ni accede a compras internas del proveedor.

### designer — Diseño / Mockups
- Atiende mockups que requieren ajuste.
- Confirma áreas imprimibles.
- Revisa imágenes y plantillas.
- Puede apoyar pedidos de cualquier vendedor de la misma empresa.

### production — Producción
- Recibe pedidos aprobados.
- Revisa partidas, cantidades y personalización.
- Gestiona proveedores y órdenes de compra.
- Actualiza estados: esperando proveedor, material recibido, producción, control de calidad, listo y entregado.

## Catálogos
Una empresa puede tener múltiples marcas/proveedores, pero sólo un catálogo activo por marca.
Al subir una nueva edición de una marca, el catálogo anterior se archiva antes de activar el nuevo.

El PDF conserva:
- empresa
- marca/proveedor
- versión
- archivo original
- páginas indexadas
- productos extraídos
- modelo / ID / SKU
- página fuente
- imágenes extraídas
- vínculo con plantilla MockuPro

## Flujo de venta
Vendedor → Cliente → Búsqueda en catálogo → Producto → Mockup → Cotización → Aprobación → Pedido.

El pedido conserva siempre al vendedor que lo originó.

## Flujo de producción
Pedido aprobado → Cola de producción → Revisión → Compra/solicitud a proveedor → Recepción de material → Personalización → Control de calidad → Listo → Entrega.

## Compras a proveedor
Producción o administración puede generar una orden de compra ligada al pedido del cliente.
La orden interna conserva proveedor, artículos, cantidades, costo, referencia del proveedor y estado de recepción.

El vendedor puede conocer el avance de su pedido, pero no necesita ver costos internos de compra.

## Escenario ejemplo
Empresa con:
- 1 administrador
- 1 encargado de catálogos
- 10 vendedores
- 2 diseñadores
- 3 usuarios de producción

Los 10 vendedores comparten los mismos catálogos y plantillas aprobadas, pero cada venta conserva vendedor y cliente.
Cuando una venta es aprobada, llega al mismo departamento de producción, que puede agrupar compras por proveedor sin perder qué pedido pertenece a qué vendedor/cliente.

## Regla operativa
MockuPro no debe usar una cuenta compartida por empresa. Cada persona usa su propio acceso y su rol determina lo que puede ver o modificar.


## Estado implementado — flujo producción/proveedor
La versión actual conecta:
1. Aprobación de cotización.
2. Creación de pedido y partidas.
3. Creación automática de trabajo en Producción.
4. Revisión del pedido.
5. Selección/alta de proveedor.
6. Generación idempotente de orden de compra al proveedor.
7. Estados de proveedor: Solicitado → Confirmado/Parcial → Recibido.
8. Al recibir todo el material, el trabajo pasa a Material recibido.
9. Producción avanza: En producción → Control calidad → Listo → Entregado.
10. El estado del pedido se sincroniza para que el vendedor vea Producción, Listo o Entregado.

Los costos de proveedor permanecen restringidos a Administración/Producción mediante RLS.
