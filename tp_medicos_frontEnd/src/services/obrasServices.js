import api from './api';

// Obtener lista de obras sociales (GET /obras)
export async function getObras() {
  try {
    const res = await api.get('/obras');
    return res.data; // array de obras [{id,nombre}, ...]
  } catch (err) {
    if (err.response && err.response.data) {
      const message = err.response.data.error || err.response.data.message || 'Error al obtener obras sociales';
      const e = new Error(message);
      e.status = err.response.status;
      e.body = err.response.data;
      throw e;
    }
    throw err;
  }
}

// Crear obra social (POST /obras) - protegido (requiere token)
export async function crearObra(payload) {
  try {
    const res = await api.post('/obras', payload);
    return res.data; // objeto creado
  } catch (err) {
    if (err.response && err.response.data) {
      const message = err.response.data.error || err.response.data.message || 'Error al crear obra';
      const e = new Error(message);
      e.status = err.response.status;
      e.body = err.response.data;
      throw e;
    }
    throw err;
  }
}

// Actualizar obra social (PATCH /obras/:id) - protegido (requiere token)
export async function actualizarObra(id, payload) {
  try {
    const res = await api.patch(`/obras/${encodeURIComponent(id)}`, payload);
    return res.data; // objeto actualizado
  } catch (err) {
    if (err.response && err.response.data) {
      const message = err.response.data.error || err.response.data.message || 'Error al actualizar obra';
      const e = new Error(message);
      e.status = err.response.status;
      e.body = err.response.data;
      throw e;
    }
    throw err;
  }
}

// Eliminar obra social (DELETE /obras/:id) - protegido (requiere token)
export async function eliminarObra(id) {
  try {
    const res = await api.delete(`/obras/${encodeURIComponent(id)}`);
    return res.data; // { ok: true } u objeto de respuesta
  } catch (err) {
    if (err.response && err.response.data) {
      const message = err.response.data.error || err.response.data.message || 'Error al eliminar obra';
      const e = new Error(message);
      e.status = err.response.status;
      e.body = err.response.data;
      throw e;
    }
    throw err;
  }
}

const obrasService = {
  getObras,
  crearObra,
  actualizarObra,
  eliminarObra,
};

export default obrasService;