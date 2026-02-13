import api from './api'; // instancia axios central

// Crear turno
export async function crearTurno(data, token) {
  try {
    const config = {};
    if (token) config.headers = { Authorization: `Bearer ${token}` };
    const res = await api.post('/turnos', data, config);
    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      const serverMsg = err.response.data.error || err.response.data.message;
      const e = new Error(serverMsg || 'Error en la creación del turno');
      e.status = err.response.status;
      e.body = err.response.data;
      throw e;
    }
    throw err;
  }
}

// Actualizar turno (PUT /turnos/:id)
export async function actualizarTurno(id, updates, token) {
  try {
    const config = {};
    if (token) config.headers = { Authorization: `Bearer ${token}` };
    const res = await api.put(`/turnos/${encodeURIComponent(id)}`, updates, config);
    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      const serverMsg = err.response.data.error || err.response.data.message;
      const e = new Error(serverMsg || 'Error al actualizar el turno');
      e.status = err.response.status;
      e.body = err.response.data;
      throw e;
    }
    throw err;
  }
}

// Obtener turnos con filtros (GET /turnos?medico_id=&desde=&hasta=)
export async function getTurnos(params = {}) {
  try {
    const res = await api.get('/turnos', { params });
    return res.data; // array de turnos
  } catch (err) {
    if (err.response && err.response.data) {
      const serverMsg = err.response.data.error || err.response.data.message;
      const e = new Error(serverMsg || 'Error al obtener turnos');
      e.status = err.response.status;
      e.body = err.response.data;
      throw e;
    }
    throw err;
  }
}

// Obtener un turno por id (GET /turnos/:id)
export async function getTurnoById(id) {
  const res = await api.get(`/turnos/${encodeURIComponent(id)}`);
  return res.data;
}

// Fallback local para pruebas/offline
export function guardarTurnoLocal(data) {
  const LOCAL_KEY = 'citas_mock_storage';
  const persist = localStorage.getItem(LOCAL_KEY);
  let arr = [];
  try { arr = persist ? JSON.parse(persist) : []; } catch { arr = []; }
  const nueva = { id: Date.now(), ...data };
  arr.push(nueva);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(arr));
  return nueva;
}

// Export por nombre ya definido y default como objeto nombrado (evita la regla ESLint)
const turnosService = {
  crearTurno,
  actualizarTurno,
  getTurnos,
  getTurnoById,
  guardarTurnoLocal,
};

export default turnosService;