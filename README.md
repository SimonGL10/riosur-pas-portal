# RíoSur Seguros — Portal PAS local

Portal funcional de demostración para productores asesores. No utiliza servicios externos ni datos reales.

## Inicio

```powershell
cd C:\Users\Pablo\riosur-pas
npm install
npm run dev
```

Abrir `http://localhost:3000`.

### Credenciales exactas

- Email: `productor@riosurseguros.demo`
- Contraseña: `Demo2026!`

Las credenciales incorrectas muestran un error de login. La sesión se persiste en `localStorage`; el botón de logout tiene `data-testid="logout"`.

## Rutas

- `/dashboard` — métricas y accesos rápidos.
- `/clientes` — 30 clientes mock.
- `/polizas` — 48 pólizas mock con estados vigentes, vencidas y suspendidas.
- `/documentos` — 50 documentos, búsqueda, filtros, paginación de 10 y estados.
- `/actividad` — actividad operativa.

## API local

- `GET /api/clients`
- `GET /api/policies`
- `GET /api/documents`
- `GET /api/documents/:id`
- `GET /api/documents/:id/download`
- `GET /api/data` (compatibilidad)

Los endpoints de documentos devuelven PDFs reales descargables. Al descargar desde la UI el documento queda marcado como `Descargado` y se conserva en `localStorage`.

## Desarrollo y pruebas

Los datos se generan determinísticamente en `app/lib/mock.ts` e incluyen clientes y pólizas inconsistentes para probar estados. La simulación es local y persistente; no modifica sistemas externos.

```powershell
npm run build
```

También existen atributos `data-testid` estables para login, error, navegación, búsqueda, filtros, descargas y logout.
