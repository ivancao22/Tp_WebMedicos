# TP Web Médico

¡Hola!  
Este repo contiene la entrega completa del TP: la parte Frontend (React) y la parte Backend (Node.js + Postgres). Abajo tenés la documentación separada en dos secciones claras: "Parte Frontend" y "Parte Backend". Intenté mantener todo sencillo y en lenguaje coloquial para que cualquiera lo entienda rápido.

---

## PARTE 1 — FRONTEND (ENTREGA FRONT)

Breve: una interfaz en React pensada para pacientes y staff. Visual, responsiva y lista para conectarse a la API.

### Qué hace (de forma práctica)
1. Landing Page
- Muestra datos del médico, servicios y contacto.
- Desde ahí el paciente puede pedir una cita.
- Login de staff en el header (credenciales de prueba incluidas abajo).

2. Solicitar Cita
- Form con nombre, apellido, teléfono, mail, obra social, motivo y elección de médico.
- Calendario visual (solo próximas 2 semanas).
- Horarios se bloquean según ocupación (consulta al backend).

3. Login (médico / secretaria)
- Login sencillo; usuarios de prueba para testing.

4. Gestión de Citas
- Panel para ver, filtrar, confirmar y cancelar turnos (hace llamadas reales a la API).

5. Administración de Obras Sociales
- Panel para listar, crear, editar y eliminar obras (ahora integrado al backend con endpoints protegidos).

6. Notificaciones visuales
- Toastr / mensajes locales para confirmar acciones.

7. Páginas legales
- Políticas y términos accesibles desde el footer.

### Tecnologías
- React, hooks
- Material UI (MUI)
- React Router
- Dayjs
- Axios (servicio central)
- JavaScript / CSS

### Estructura principal
- `/src/components` — componentes reutilizables
- `/src/pages` — páginas (Landing, Login, Citas, Obras)
- `/src/services` — axios + servicios (turnos, medicos, obras)
- `/src/mock` — datos de prueba (usados como fallback)
- `/src/auth` — helpers auth

### Detalles útiles
- Responsive (desktop / tablet / mobile).
- Los mocks están listos para reemplazo y ya fueron reemplazados progresivamente por servicios REST.
- Hay fallback local (localStorage) por si el backend no responde.

### Cómo correr el frontend (rápido)
1. Clonar repo.
2. Ir a la carpeta del front (si aplica): `cd tp_medicos_frontEnd`
3. Instalar: `npm install` o `yarn install`
4. Levantar: `npm start` o `yarn start`
5. Abrir: `http://localhost:3000`

---

## PARTE 2 — BACKEND (ENTREGA BACK)

Breve: API en Node.js + Express + Postgres para manejar autenticación, médicos, obras sociales y turnos. Tiene Swagger para probar endpoints.

### Qué hace (resumen rápido)
1. Auth (JWT)
- `POST /auth/login` → `{ token, user }`
- Usar `Authorization: Bearer <token>` para rutas protegidas.

2. Médicos
- `GET /medicos` — lista con nombre, apellido, especialidad, estado, email, teléfono.

3. Obras Sociales
- `GET /obras` — listar (usado por el frontend público).
- `POST /obras` — crear (protegido, roles admin/secretaria).
- `PATCH /obras/:id` — actualizar (protegido).
- `DELETE /obras/:id` — eliminar (protegido).

4. Turnos
- `GET /turnos` — listar con filtros: `medico_id`, `desde`, `hasta`.
- `GET /turnos/:id` — obtener por id.
- `POST /turnos` — crear (valida solapamiento de 45 min; devuelve 409 si ocupado).
- `PUT /turnos/:id` — actualizar (p. ej. cambiar estado).
- `DELETE /turnos/:id` — eliminar.

5. Emails
- Integración con SendGrid (opcional — requiere API key). La API envía notificaciones al crear/cambiar estado de turnos.

6. Docs
- Swagger UI: `http://localhost:4000/docs` (usar `swagger.yaml` en la raíz).

### Tecnologías
- Node.js + Express
- PostgreSQL (pg)
- express-validator
- dotenv
- swagger-ui-express + yamljs
- bcryptjs (hash)
- jsonwebtoken (JWT)
- @sendgrid/mail (opcional para emails)

### Estructura principal (backend)
- `/src`
  - `/db` — pool.js (conexion)
  - `/middleware` — auth.js, validators.js
  - `/routes` — auth.js, medicos.js, obras.js, turnos.js
  - `app.js`, `server.js`, `swagger.js`
- `swagger.yaml` — OpenAPI
- `credenciales.example` — variables de entorno de ejemplo

### Buenas prácticas y notas de implementación
- Validaciones mínimas para entradas.
- Roles y JWT para rutas protegidas.
- No exponer stack en producción.
- Para la creación de turnos se hace un chequeo de solapamiento (45 minutos); para alta concurrencia conviene mejorar con locks/transacciones o un sistema de slots.

### Variables de entorno (ejemplo)
- PORT=4000
- DATABASE_URL=postgresql://user:pass@host:5432/dbname
- JWT_SECRET=super_secret_jwt_key
- SENDGRID_API_KEY=tu_key_sendgrid (opcional)
- EMAIL_FROM=medico@tu-dominio.com (opcional)

> No subas `credenciales.env` al repo. Usá `credenciales.example` como plantilla.

### Cómo correr el backend (rápido)
1. Clonar repo.
2. Ir a la carpeta del backend (si aplica).
3. Instalar: `npm install`
4. Crear `credenciales.env` (usar `credenciales.example`).
5. Levantar en dev: `npm run dev` (o `node src/server.js`)
6. Ver Swagger: `http://localhost:4000/docs`

### Ejemplos curl
- Login:
```
curl -s -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"PaulaS@test.com","password":"Paula123"}'
```
- Crear obra (protegido):
```
curl -X POST http://localhost:4000/obras \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"OSECAC"}'
```
- Crear turno:
```
curl -X POST http://localhost:4000/turnos \
  -H "Content-Type: application/json" \
  -d '{"fecha_turno":"2025-12-03T12:00:00.000Z","paciente_nombre":"Ivan","paciente_apellido":"Cao","paciente_email":"ivan@example.com","medico_id":1,"obra_social_id":1,"motivo":"Chequeo"}'
```

---

## Qué cambiamos en esta entrega (resumen de integración)
- Añadí servicios axios en frontend: `turnosService`, `medicosService`, `obrasService`.
- Reemplacé progresivamente los mocks por llamadas reales en:
  - SolicitarCita (GET medicos/obras, GET turnos, POST crear turno).
  - GestionCitas (GET turnos, PUT actualizar estado).
  - Páginas de obras (publica y admin) usando GET/POST/PATCH/DELETE.
- SendGrid: probada con 202 OK; la UI de SendGrid puede tardar en mostrar actividad (ya verificada).
- Fallback local por si el backend no responde (localStorage).

---

## Próximos pasos (sugeridos)
- Incluir scripts SQL (schema + seed).
- Exportar Postman Collection desde `swagger.yaml`.
- Añadir tests de integración (supertest) para flujos críticos.
- Revisar concurrencia al crear turnos (transacción/lock o modelo de slots).
- Hacer CI básico (lint + tests) antes de merge a `main`.

---

## Levantar el proyecto (paso a paso) + respaldo y script inicial de la BD

Abajo te dejo instrucciones prácticas para levantar todo en tu máquina. En la raíz del proyecto podés encontrar un archivo de respaldo/bkp de la base de datos y además el script SQL inicial que usamos para crear las tablas y los seeds. Si preferís, en vez de restaurar el backup podés ejecutar el script SQL (schema + inserts).

IMPORTANTE: ajustá los comandos según tus credenciales/entorno (usuario de Postgres, host, puerto).

1) Crear la base de datos (ejemplo local)
```bash
# crea la base (nombre sugerido: ConsultorioMedicoBd)
createdb tp_medicos
```

2) Usando la interfaz gráfica (pgAdmin)
Desde pgAdmin, estos son los pasos:
-Abrí pgAdmin.
-En el panel izquierdo, hacé clic derecho sobre Databases → Create → Database…
-Creá una base llamada tp_medicos.
-Una vez creada, clic derecho sobre la base → Restore…
-En Filename, buscá y seleccioná el archivo de backup del proyecto (.sql, .backup o .dump).
-Hacé clic en Restore.
-Cuando termine, la base quedará lista con todas las tablas y datos incluidos en el backup.

3) Si no levanto el backUp disponible en la carpeta del proyecto y eligio la opcion 1 de crear una db, debe ejecutar el script inicial (schema + seed) manualmente
A continuación está el SQL que usamos como base (puedes copiarlo a `db/schema_seed.sql` y ejecutarlo si no querés restaurar el bkp):

```sql
-- Tabla usuarios (login)
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(200) UNIQUE,
  password_hash VARCHAR(200) NOT NULL, -- almacenar hash bcrypt
  rol VARCHAR(30) NOT NULL, -- 'medico', 'secretaria', 'admin'
  nombre VARCHAR(100),
  apellido VARCHAR(100),
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla medicos
CREATE TABLE medicos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  especialidad VARCHAR(100),
  estado VARCHAR(50) DEFAULT 'activo', -- 'en licencia', 'activo', 'inactivo'
  email VARCHAR(200) UNIQUE,
  telefono VARCHAR(50),
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla obras sociales
CREATE TABLE obras_sociales (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL UNIQUE,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla turnos
CREATE TABLE turnos (
  id SERIAL PRIMARY KEY,
  paciente_nombre VARCHAR(100) NOT NULL,
  paciente_apellido VARCHAR(100) NOT NULL,
  paciente_email VARCHAR(200) NOT NULL,
  paciente_telefono VARCHAR(50),
  obra_social_id INTEGER REFERENCES obras_sociales(id) ON DELETE SET NULL,
  medico_id INTEGER REFERENCES medicos(id) ON DELETE SET NULL,
  fecha_turno TIMESTAMP WITH TIME ZONE NOT NULL,
  motivo TEXT,
  estado VARCHAR(30) DEFAULT 'pendiente',
  confirmado_por INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
  cancelado_por INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Índices útiles (apuntan a fecha_turno)
CREATE INDEX IF NOT EXISTS idx_turnos_medico_fecha ON turnos(medico_id, fecha_turno);
CREATE INDEX IF NOT EXISTS idx_turnos_fecha ON turnos(fecha_turno);

-- Inserts iniciales de usuarios (las contraseñas deben almacenarse con hash bcrypt)
-- Para generar el hash en tu máquina:
-- 1) npm install bcryptjs
-- 2) node -e "console.log(require('bcryptjs').hashSync('Paula2025', 10))"
-- 3) node -e "console.log(require('bcryptjs').hashSync('Francisco2025', 10))"

INSERT INTO usuarios (username, password_hash, rol, nombre, apellido) 
VALUES
('PaulaS@test.com', '$2b$10$JtDJtLIx87Tjyk.Cew/ug.HcxAQBW1TuWre3Qt8j1UQ.gqNGFQFkG', 'admin', 'PaulaS', ''),
('FranciscoF@test.com', '$2b$10$8Opk9FJHU9j2XZFAOU54LOC3ziNTrqW/UNkD7KssVOa1VYhEf6lLy', 'admin', 'FranciscoF', '');

INSERT INTO medicos (nombre, apellido, especialidad, estado, email, telefono)
VALUES
  ('Enrique', 'Martínez', 'Médico estético', 'disponible', NULL, NULL),
  ('Carla', 'Gómez', 'Dermatóloga Clínica', 'licencia', NULL, NULL),
  ('Facundo', 'Guzman', 'Cirujano Plástico', 'licencia', NULL, NULL),
  ('Julieta', 'Pérez', 'Médica Estética', 'licencia', NULL, NULL);

INSERT INTO obras_sociales (nombre)
VALUES
('OSDE'),
('Swiss Medical'),
('Galeno'),
('Particular');
```

4) Variables de entorno
- Crea `credenciales.env` en la raíz del backend.
- Rellená como en `credenciales.example`, por ejemplo:
```
PORT=4000
DATABASE_URL=postgresql://tu_usuario:tu_pass@localhost:5432/tp_medicos
JWT_SECRET=clave_larga_secreta
SENDGRID_API_KEY=tu_sendgrid_key_opcional
EMAIL_FROM=medico@tu-dominio.com
```

5) Levantar backend y frontend
- Backend:
```bash
cd backend_folder  # o la raíz si está todo junto
npm install
npm run dev       # o node src/server.js
```
- Frontend:
```bash
cd tp_medicos_frontEnd
npm install
npm start
```

6) Acceder
- Frontend: `http://localhost:3000`
- Backend / Swagger: `http://localhost:4000/docs`


---

## Cuentas de prueba (creadas en la BD)
En la base inicial incluimos dos usuarios con permisos (admin) para probar la parte protegida:

- Usuario 1:
  - username: PaulaS@test.com
  - email: PaulaS@test.com
  - password (texto plano para login de prueba): `Paula2025`
  - rol: admin

- Usuario 2:
  - username: FranciscoF@test.com
  - email: FranciscoF@test.com
  - password (texto plano para login de prueba): `Francisco2025`
  - rol: admin
---
