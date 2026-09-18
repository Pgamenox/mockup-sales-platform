# Mockup Sales Platform

Plataforma comercial multiempresa para crear mockups, cotizar y convertir propuestas aprobadas en pedidos.

## Estado actual
Frontend MVP en React + Vite. Persistencia local para demostración; todavía no usar datos sensibles ni credenciales reales.

## Flujo disponible
1. Configurar datos de la empresa.
2. Registrar clientes.
3. Administrar catálogo y precios.
4. Crear proyecto para un cliente.
5. Cargar logo y seleccionar producto.
6. Ajustar área, posición, tamaño, rotación y color.
7. Guardar propuesta y exportar vista previa.
8. Compartir por WhatsApp/correo.
9. Cotizar e imprimir/guardar como PDF.
10. Aprobar propuesta y convertirla en pedido.
11. Mover pedido por Nuevo → Producción → Listo → Entregado.

## Seguridad
El repositorio no debe contener claves privadas. Antes de conectar backend real, activar autenticación, RLS y almacenamiento separado por tenant. El proyecto es independiente de ClickOnMe.

## Próxima fase
Validar build, publicar demo controlada, sustituir prompts por formularios comerciales y después conectar un backend multiempresa separado.

