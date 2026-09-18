# QA checklist

## Vendedor
- Crear cliente
- Seleccionar producto
- Cargar PNG/JPG/SVG
- Ajustar escala y posición
- Guardar propuesta
- Exportar vista previa
- Compartir WhatsApp/correo
- Cambiar cantidad y descuento

## Comercial
- Aprobar propuesta
- Evitar pedido duplicado
- Crear pedido
- Cambiar estado: Nuevo → Producción → Listo → Entregado
- Verificar totales del dashboard

## Persistencia
- Recargar navegador y comprobar empresa, clientes, propuestas y pedidos
- Confirmar que ningún secreto se almacena en el repositorio

## Responsive
- 360 px
- 768 px
- Escritorio

## Antes de producción
- Auth
- RLS multiempresa
- almacenamiento de archivos
- límites de carga
- sanitización
- auditoría
- backups
- exportación PDF/PNG
- pruebas automatizadas
