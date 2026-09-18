# Seguridad y separación multiempresa

## Reglas
1. Nunca incluir service-role keys en el frontend.
2. Credenciales solo mediante variables de entorno.
3. Todo registro comercial debe incluir tenant_id.
4. RLS debe estar activa antes de cargar clientes reales.
5. Un usuario solo puede leer/escribir tenants donde sea miembro.
6. Archivos se separan por tenant y se validan tipo/tamaño.
7. Las vistas previas no son arte final.
8. No almacenar contraseñas manualmente; usar proveedor de autenticación.
9. Registrar cambios críticos: aprobación, precio, pedido y estado.
10. ClickOnMe y MockupSales deben permanecer en proyectos/repositorios/backend separados.

## Antes de conectar backend
El repositorio debe revisarse para confirmar que no contiene secretos. Si continúa público, no introducir credenciales privadas.
