# TP Web Médico

¡Hola!  
Este es el proyecto de front end del TP para el sitio web de gestión médica. La idea principal es crear una plataforma para que un médico (o su secretaria) pueda administrar su agenda de turnos, mostrar información profesional y gestionar las reservas de citas de manera fácil y rápida.  
Abajo te cuento cómo funciona cada parte y qué tecnologías usé para lograrlo.

---

##  Funcionalidades principales

### 1. Landing Page
- Es la página de inicio donde se muestra la información del médico: nombre, especialidad, formación, servicios que ofrece y datos de contacto.
- Desde acá, cualquier paciente puede ver el perfil y acceder directamente al formulario para reservar una cita.
- Para acceder a las funcionalidades protegidas es necesario iniciar sesión. El botón de login está oculto en el extremo superior derecho del header: una solapa celeste discreta que, al hacer clic, despliega el acceso al login.
- Una vez en la pantalla de ingreso, pueden utilizar las siguientes credenciales de prueba:

	Usuario 1:
	Nombre de usuario: PaulaS
	Mail: PaulaS@test.com
	Contraseña: Paula123
	
	Usuario 2:
	Nombre de usuario: FranciscoF
	Mail: FranciscoF@test.com
	Contraseña: Francisco123

- Si el usuario no está logueado (visitante/paciente), verá en el header:
  - "Reservar cita": permite solicitar una cita médica.
  - "Obras sociales": permite ver el listado de las obras sociales disponibles en el consultorio(solo informativo para el usuario).

- Si el usuario está logueado (médico o secretaria), el header cambia y muestra:
  - "Ver citas": acceso al panel administrativo para gestionar las citas (ver, filtrar por fecha, confirmar, cancelar).
  - "Obras sociales": acceso a la pantalla de administración donde se pueden ver, eliminar, editar o agregar nuevas obras sociales.

- El login es solo para el staff autorizado (médico/secretaria), no está habilitado el registro público.

### 2. Reserva de Citas
- Los pacientes pueden solicitar una cita completando un formulario con su nombre, apellido, teléfono, email, obra social, motivo de consulta y elegir el médico.
- Se incluye un calendario muy visual para seleccionar el día y ver los horarios disponibles.
- El calendario solo permite elegir fechas dentro de las próximas dos semanas y los horarios se actualizan automáticamente según la ocupación y el médico seleccionado.
- Al reservar, aparece un mensaje de confirmación para el paciente.

### 3. Login para Médico/Secretaria
- Hay una página de login donde el médico o la secretaria pueden ingresar con usuario y contraseña.
- Nota: No hay registro público, solo acceso con credenciales predefinidas (el registro de admin queda para la versión con backend, ahora esta mockeado).

### 4. Gestión de Citas
- En el área administrativa, el médico o la secretaria pueden ver todas las citas solicitadas.
- Se puede cambiar el estado de una cita de "Solicitada" a "Confirmada", y de "Confirmada" a "Cancelada" para llevar el control de la agenda.

### 5. Administración de Obras Sociales
- Hay una sección para gestionar las obras sociales que atiende el médico.
- Se pueden agregar, modificar o eliminar obras sociales (en esta versión solo simulado en front, pero ya preparado para el backend).

### 6. Notificaciones
- Cada vez que se agenda una cita, el sistema muestra una notificación visual en pantalla.
- (En la versión con backend, se va a agregar el envío de correos automáticos).

### 7. Políticas y Términos
- El sitio tiene sus páginas de Términos y Condiciones y Políticas de Privacidad, accesibles desde el footer.

---

## Tecnologías y librerías utilizadas

- React: Framework principal para construir la interfaz de usuario.
- Material UI (MUI): Para la estética, el diseño responsive y los componentes visuales como grids, botones, cards, calendarios, etc.
- React Router: Para la navegación entre páginas.
- Dayjs: Para trabajar con fechas fácilmente (especialmente en el calendario de citas).
- JavaScript : El lenguaje base de todo el desarrollo.
- CSS: Para algunos detalles de estilos propios.
- (Próximamente) Node.js y PostgreSQL: Para la segunda entrega, donde se conectará el backend y la base de datos.

---

## Estructura del proyecto

- `/src/components`: Componentes reutilizables y pantallas principales.
- `/src/pages`: Páginas independientes como Landing, Login, Citas, Obras Sociales, etc.
- `/src/mock`: Datos simulados (obras sociales, médicos, motivos de consulta, etc.) para probar la funcionalidad en front end.
- `/src/assets`: Imágenes y recursos gráficos.
- `/src/auth`: Lógica de autenticación básica.

---

## Criterios y detalles de desarrollo

- El sitio es totalmente responsive, funciona bien en computadoras, tablets y celulares.
- El diseño es limpio y moderno, con colores suaves y buena legibilidad.
- Se usaron buenas prácticas de organización y modularidad para que el código sea fácil de mantener y ampliar.
- No se implementó la parte de backend todavía, pero todo el front está listo para integrarse con APIs y base de datos.
- La UX está pensada tanto para pacientes como para el médico/secretaria, con navegación intuitiva y feedback visual en cada paso.

---

## Cómo usar el proyecto

1. Clona este repositorio.
2. Instala las dependencias con `npm install` o `yarn install`.
3. Ejecuta el proyecto con `npm start` o `yarn start`.
4. Accede a la app desde el navegador en `http://localhost:3000`.

---

## Próximos pasos

- Integrar el backend con Node.js y PostgreSQL.
- Agregar autenticación real, manejo de usuarios y persistencia de datos.
- Implementar envío de correos y notificaciones automáticas.
- Mejorar la gestión administrativa con más detalles y filtros.

---

¡Gracias por visitar el proyecto!  
Cualquier sugerencia o feedback es más que bienvenida 
