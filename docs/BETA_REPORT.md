# Beta funcional intensiva — Ronda 1

Fecha: 2026-09-17

## Alcance
Auditoría estática del flujo comercial y simulación lógica de operaciones repetidas sobre el modelo local: empresa, clientes, productos, mockups, propuestas, cotizaciones, aprobaciones, pedidos y estados.

## Pruebas superadas
- Estructura única de App y estado de catálogo.
- Cinco módulos comerciales presentes.
- Persistencia local de empresa, clientes, productos, propuestas y pedidos.
- Controles de tamaño, posición, rotación, color, área y notas.
- Cantidad mínima 1 y descuento limitado a 0–100%.
- Bloqueo de pedido duplicado desde una misma propuesta.
- Marca de agua en vista previa y exportación.
- Búsqueda de clientes y propuestas.
- Protección para no eliminar el último producto.

## Fallos encontrados y corregidos
- Clientes duplicados: añadido bloqueo por nombre + teléfono.
- Correo inválido: añadida validación básica.
- Logos sin control: añadido tipo de imagen/SVG y límite de 8 MB.
- Eliminación de clientes con historial: bloqueada si existen propuestas o pedidos.

## Pendientes de Beta
- Compilación real automatizada todavía no confirmada por GitHub Actions.
- Prueba visual en navegador/móvil.
- Formularios comerciales en lugar de prompts.
- Solicitud de cambios y versionado de propuesta.
- Eliminación/archivo seguro de propuestas.
- Backend multiempresa, autenticación, RLS y estrés concurrente quedan fuera de esta ronda.

## Resultado
Ronda 1: APROBADA CON PENDIENTES. El flujo lógico está más protegido, pero no se considera listo para producción ni para datos reales.


## 2026-09-23 — Flujo de aprobación y producción
### Implementado
- Aprobación de cotización transaccional en Supabase.
- Pedido, partida y trabajo de producción creados sin duplicados por la misma cotización.
- Módulo Producción conectado con proveedores y órdenes de compra.
- Alta rápida de proveedor para administración/producción.
- Orden a proveedor con folio, referencia, costo opcional y fecha esperada.
- Estados de recepción: Solicitado, Confirmado, Parcial y Recibido.
- Flujo productivo: Pendiente, Revisión, Esperando proveedor, Material recibido, En producción, Control calidad, Listo y Entregado.
- Sincronización del estado real del pedido hacia el módulo Pedidos.
- Vendedor consulta sus pedidos reales; administración/producción controlan el avance.
- Permisos de tablas y RPC endurecidos: anon sin acceso al flujo empresarial.

### Verificado
- RLS habilitado en tablas del flujo empresarial.
- Advisors de seguridad ejecutados después de cambios.
- Compilación CI se usa como requisito antes de considerar desplegada la versión.

### Pendiente de prueba operativa real
El proyecto Supabase aún no tiene usuarios reales registrados, por lo que falta ejecutar una prueba autenticada extremo a extremo con dos roles reales (vendedor y producción) y un proveedor real/de prueba. Esta prueba no se cuenta como aprobada hasta realizarse con sesiones auténticas.
