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
