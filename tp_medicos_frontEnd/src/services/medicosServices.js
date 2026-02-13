import api from './api';

// Obtener lista de médicos (GET /medicos)
export async function getMedicos() {
  try {
    const res = await api.get('/medicos');
    return res.data; // array de medicos [{id,nombre,apellido,...}, ...]
  } catch (err) {
    // normalize error
    if (err.response && err.response.data) {
      const message = err.response.data.error || err.response.data.message || 'Error al obtener médicos';
      const e = new Error(message);
      e.status = err.response.status;
      e.body = err.response.data;
      throw e;
    }
    throw err;
  }
}

const medicosService = { getMedicos };
export default medicosService;