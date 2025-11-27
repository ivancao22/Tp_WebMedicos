// src/services/api.js
const API_URL = 'http://localhost:4000/api'; // cambiá el puerto si el back escucha en otro

// OBRAS SOCIALES
export const getObrasSociales = async () => {
  const res = await fetch(`${API_URL}/obras-sociales`);
  if (!res.ok) {
    throw new Error('Error obteniendo obras sociales');
  }
  return res.json();
};

// CITAS
export const crearCita = async (body) => {
  const res = await fetch(`${API_URL}/citas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    throw new Error('Error creando la cita');
  }
  return res.json();
};

// CITAS (para el panel de gestión)
export const getCitas = async () => {
  const res = await fetch(`${API_URL}/citas`);
  if (!res.ok) {
    throw new Error('Error obteniendo citas');
  }
  return res.json();
};

export const confirmarCitaApi = async (id) => {
  const res = await fetch(`${API_URL}/citas/${id}/confirmar`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) {
    throw new Error('Error confirmando cita');
  }
  return res.json();
};

export const cancelarCitaApi = async (id) => {
  const res = await fetch(`${API_URL}/citas/${id}/cancelar`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) {
    throw new Error('Error cancelando cita');
  }
  return res.json();
};

// OBRAS SOCIALES - ABM ADMIN

export const crearObraSocial = async (body) => {
  const res = await fetch(`${API_URL}/obras-sociales`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // si más adelante tienen auth, acá se agrega Authorization
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error('Error creando obra social');
  }
  return res.json(); // obra social creada
};

export const actualizarObraSocial = async (id, body) => {
  const res = await fetch(`${API_URL}/obras-sociales/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error('Error actualizando obra social');
  }
  return res.json(); // obra social actualizada
};

export const eliminarObraSocial = async (id) => {
  const res = await fetch(`${API_URL}/obras-sociales/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Error eliminando obra social');
  }
  return res.json(); // { message: '...' }
};

// LOGIN
export const loginApi = async (username, password) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      // si el back devuelve error 401 o similar
      let msg = 'Usuario o contraseña incorrectos';
      try {
        const errData = await res.json();
        if (errData?.message) msg = errData.message;
      } catch {
        // ignoramos error parseando el json
      }
      return { status: res.status, message: msg };
    }

    const data = await res.json(); // debería traer { token: '...' }
    return { status: 200, token: data.token };
  } catch (err) {
    return { status: 500, message: 'Error de red o servidor.' };
  }
};
