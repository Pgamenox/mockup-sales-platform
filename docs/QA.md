# QA checklist

## Estado comprobado — 2026-09-23
- Build reproducible con `package-lock.json` y dependencias fijadas.
- `npm run qa` comprueba que Auth y la aplicación usan el mismo cliente Supabase.
- Backend: RLS habilitado en todas las tablas públicas; Security Advisor sin alertas.
- Base vacía: 0 usuarios, 0 tenants y 0 operaciones. Por ello la prueba humana autenticada sigue pendiente y la beta aún no puede declararse estable para venta.
- La prueba final debe usar tres sesiones reales: administrador, vendedor y producción, además de una empresa secundaria para demostrar aislamiento.

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
