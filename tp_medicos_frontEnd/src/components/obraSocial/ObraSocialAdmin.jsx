import React, { useState, useEffect } from "react";
import iniciales from '../../mock/ObraSocial';
import {
  getObras,
  crearObra,
  actualizarObra,
  eliminarObra
} from '../../services/obrasServices';

const STORAGE_KEY = "obrasSociales_v1";

export default function ObraSocialAdmin() {
  // Estado inicial: intenta cargar de localStorage, luego mock (temporal) hasta que carguemos desde la API
  const [obras, setObras] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(data) && data.length ? data : iniciales;
    } catch {
      return iniciales;
    }
  });

  const [nuevo, setNuevo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [opInFlight, setOpInFlight] = useState(null); // id of obra being processed (create|update|delete)
  const [error, setError] = useState(null);

  // Guardar fallback local
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(obras)); } catch {}
  }, [obras]);

  // Cargar obras desde la API al montar
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const arr = await getObras();
        if (!mounted) return;
        if (Array.isArray(arr) && arr.length) {
          setObras(arr);
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); } catch {}
        } else {
          // si la API responde vacío, mantener fallback (no sobrescribir)
          console.warn("getObras: respuesta vacía, manteniendo fallback");
        }
      } catch (err) {
        console.warn("No se pudieron cargar las obras desde la API:", err?.message || err);
        setError(err?.message || "Error al cargar obras");
        // dejamos fallback que ya está en state
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  // Mensaje temporal
  const mostrarMensaje = (msg) => {
    setMensaje(msg);
    setTimeout(() => setMensaje(""), 2400);
  };

  // Agregar obra social -> intenta API, si falla hace fallback local
  const agregar = async () => {
    if (!nuevo.trim()) return;
    setOpInFlight("create");
    setError(null);
    try {
      // Intentar crear en servidor
      const created = await crearObra({ nombre: nuevo.trim() });
      // Si la API devolvió el objeto, lo insertamos
      if (created && created.id) {
        setObras(prev => [...prev, created]);
        mostrarMensaje("Obra social agregada correctamente.");
      } else {
        // Si la API no devolvió id, fallback: simulamos id local
        const localObj = { id: Date.now(), nombre: nuevo.trim() };
        setObras(prev => [...prev, localObj]);
        mostrarMensaje("Obra agregada localmente (respuesta inesperada del servidor).");
      }
      setNuevo("");
    } catch (err) {
      console.error("Error creando obra en servidor:", err);
      // fallback local
      const localObj = { id: Date.now(), nombre: nuevo.trim() };
      setObras(prev => [...prev, localObj]);
      mostrarMensaje("No se pudo crear en servidor — obra guardada localmente.");
      setError(err?.message || "Error al crear obra");
    } finally {
      setOpInFlight(null);
    }
  };

  // Empezar edición
  const empezarEditar = (id, nombre) => {
    setEditId(id);
    setEditNombre(nombre || "");
  };

  // Guardar edición -> intenta API, si falla hace fallback local
  const guardarEdicion = async () => {
    if (!editNombre.trim()) return;
    const id = editId;
    setOpInFlight(id);
    setError(null);
    try {
      const updated = await actualizarObra(id, { nombre: editNombre.trim() });
      if (updated && updated.id) {
        setObras(prev => prev.map(o => (String(o.id) === String(id) ? updated : o)));
        mostrarMensaje("Obra actualizada correctamente.");
      } else {
        // fallback local update
        setObras(prev => prev.map(o => (String(o.id) === String(id) ? { ...o, nombre: editNombre.trim() } : o)));
        mostrarMensaje("Obra actualizada localmente (respuesta inesperada del servidor).");
      }
      setEditId(null);
      setEditNombre("");
    } catch (err) {
      console.error("Error actualizando obra en servidor:", err);
      // fallback: actualizar local
      setObras(prev => prev.map(o => (String(o.id) === String(id) ? { ...o, nombre: editNombre.trim() } : o)));
      mostrarMensaje("No se pudo actualizar en servidor — cambio guardado localmente.");
      setError(err?.message || "Error al actualizar obra");
      setEditId(null);
      setEditNombre("");
    } finally {
      setOpInFlight(null);
    }
  };

  // Eliminar obra -> intenta API, si falla hace fallback local
  const eliminar = async (id) => {
    if (!window.confirm("¿Confirma eliminar esta obra social?")) return;
    setOpInFlight(id);
    setError(null);
    try {
      await eliminarObra(id);
      setObras(prev => prev.filter(o => String(o.id) !== String(id)));
      mostrarMensaje("Obra eliminada correctamente.");
    } catch (err) {
      console.error("Error eliminando obra en servidor:", err);
      // fallback local: eliminar igualmente
      setObras(prev => prev.filter(o => String(o.id) !== String(id)));
      mostrarMensaje("No se pudo eliminar en servidor — eliminación aplicada localmente.");
      setError(err?.message || "Error al eliminar obra");
    } finally {
      setOpInFlight(null);
    }
  };

  return (
    <div
      style={{
        maxWidth: 580,
        margin: "40px auto",
        background: "#f8fafc",
        borderRadius: 16,
        padding: 32,
        boxShadow: "0 2px 16px rgba(44,62,80,0.08)",
        minHeight: 420,
      }}
    >
      <h2
        style={{
          fontSize: "1.3rem",
          fontWeight: 700,
          color: "#2457A7",
          textAlign: "center",
          marginBottom: 18,
        }}
      >
        Administración de Obras Sociales
      </h2>

      {/* Mensajes / estado */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 14 }}>
        <div style={{ color: "#4b5563" }}>{loading ? "Cargando obras..." : ""}</div>
        {error && <div style={{ color: "#b91c1c" }}>{error}</div>}
        {mensaje && <div style={{ color: "#18804b", fontWeight: 600 }}>{mensaje}</div>}
      </div>

      {/* Formulario para agregar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18, justifyContent: "center" }}>
        <input
          value={nuevo}
          onChange={e => setNuevo(e.target.value)}
          placeholder="Nueva obra social"
          style={{
            border: "1px solid #bcd0ef",
            borderRadius: 6,
            padding: "10px 12px",
            fontSize: "1rem",
            background: "#f4f8ff",
            minWidth: 200,
            outline: "none",
          }}
          disabled={opInFlight === "create"}
        />
        <button
          onClick={agregar}
          style={{
            background: "#2457A7",
            color: "white",
            border: "none",
            borderRadius: 6,
            padding: "10px 18px",
            fontWeight: 500,
            cursor: "pointer",
            transition: ".2s",
            boxShadow: "0 2px 8px rgba(30,64,175,0.06)",
            opacity: opInFlight === "create" ? 0.7 : 1
          }}
          disabled={opInFlight === "create"}
        >
          {opInFlight === "create" ? "Creando..." : "Agregar"}
        </button>
      </div>

      {/* Lista */}
      <div style={{
        background: "white",
        borderRadius: 12,
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 8px rgba(30,64,175,0.04)",
        padding: "18px 10px",
        minHeight: 120,
      }}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {obras.map(obra =>
            <li
              key={obra.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 13,
                paddingBottom: 8,
                borderBottom: "1px solid #f2f2f2"
              }}
            >
              {editId === obra.id ? (
                <>
                  <input
                    value={editNombre}
                    onChange={e => setEditNombre(e.target.value)}
                    style={{
                      border: "1px solid #bcd0ef",
                      borderRadius: 5,
                      padding: "6px 10px",
                      fontSize: "1rem",
                      flex: 1
                    }}
                  />
                  <button
                    onClick={guardarEdicion}
                    style={{
                      background: "#18804b",
                      color: "white",
                      border: "none",
                      borderRadius: 5,
                      padding: "7px 12px",
                      fontWeight: 500,
                      cursor: "pointer",
                      opacity: opInFlight === obra.id ? 0.7 : 1
                    }}
                    disabled={opInFlight === obra.id}
                  >
                    {opInFlight === obra.id ? "Guardando..." : "Guardar"}
                  </button>
                  <button
                    onClick={() => { setEditId(null); setEditNombre(""); }}
                    style={{
                      background: "#e5e7eb",
                      color: "#2457A7",
                      border: "none",
                      borderRadius: 5,
                      padding: "7px 12px",
                      fontWeight: 500,
                      cursor: "pointer"
                    }}
                    disabled={opInFlight === obra.id}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1, fontWeight: 500, color: "#1e293b" }}>{obra.nombre}</span>

                  <button
                    style={{
                      background: "#f0f6ff",
                      color: "#2457A7",
                      border: "none",
                      borderRadius: 5,
                      padding: "7px 12px",
                      fontWeight: 500,
                      cursor: "pointer",
                      marginRight: 6,
                      opacity: opInFlight ? 0.9 : 1
                    }}
                    onClick={() => empezarEditar(obra.id, obra.nombre)}
                    disabled={Boolean(opInFlight)}
                  >
                    Editar
                  </button>

                  <button
                    style={{
                      background: "#ffe1e1",
                      color: "#c20000",
                      border: "none",
                      borderRadius: 5,
                      padding: "7px 12px",
                      fontWeight: 500,
                      cursor: "pointer",
                      opacity: opInFlight === obra.id ? 0.7 : 1
                    }}
                    onClick={() => eliminar(obra.id)}
                    disabled={Boolean(opInFlight)}
                  >
                    {opInFlight === obra.id ? "Eliminando..." : "Eliminar"}
                  </button>
                </>
              )}
            </li>
          )}
        </ul>

        {obras.length === 0 && (
          <div style={{ textAlign: "center", color: "#999" }}>
            No hay obras sociales cargadas.
          </div>
        )}
      </div>
    </div>
  );
}