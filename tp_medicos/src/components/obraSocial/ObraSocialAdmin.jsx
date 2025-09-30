import React, { useEffect, useState } from "react";
import iniciales from "../../mock/ObraSocial";

const STORAGE_KEY = "obrasSociales_v1";

// Panel de administración de obras sociales con persistencia en localStorage
export default function ObraSocialAdmin() {
  // 1) Cargar inicial desde localStorage (si existe) o desde el mock
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

  // 2) Guardar automáticamente en localStorage cuando cambie "obras"
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obras));
  }, [obras]);

  // helpers
  const mostrarMensaje = (msg) => {
    setMensaje(msg);
    setTimeout(() => setMensaje(""), 1800);
  };

  // acciones
  const agregar = () => {
    const nombre = nuevo.trim();
    if (!nombre) return;
    setObras((prev) => [...prev, { id: Date.now(), nombre }]);
    setNuevo("");
    mostrarMensaje("Obra social agregada");
  };

  const eliminar = (id) => {
    setObras((prev) => prev.filter((o) => o.id !== id));
    mostrarMensaje("Obra social eliminada");
  };

  const empezarEditar = (id, nombre) => {
    setEditId(id);
    setEditNombre(nombre);
  };

  const guardarEdicion = () => {
    const nombre = editNombre.trim();
    if (!nombre) return;
    setObras((prev) =>
      prev.map((o) => (o.id === editId ? { ...o, nombre } : o))
    );
    setEditId(null);
    setEditNombre("");
    mostrarMensaje("Obra social actualizada");
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
          marginBottom: 28,
        }}
      >
        Administración de Obras Sociales
      </h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 24, justifyContent: "center" }}>
        <input
          value={nuevo}
          onChange={(e) => setNuevo(e.target.value)}
          placeholder="Nueva obra social"
          style={{
            border: "1px solid #bcd0ef",
            borderRadius: 6,
            padding: "10px 12px",
            fontSize: "1rem",
            background: "#f4f8ff",
            minWidth: 180,
            outline: "none",
          }}
        />
        <button
          onClick={agregar}
          style={{
            background: "#2457A7",
            color: "white",
            border: "none",
            borderRadius: 6,
            padding: "10px 20px",
            fontWeight: 500,
            cursor: "pointer",
            transition: ".2s",
            boxShadow: "0 2px 8px rgba(30,64,175,0.06)",
          }}
        >
          Agregar
        </button>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: 12,
          border: "1px solid #e5e7eb",
          boxShadow: "0 2px 8px rgba(30,64,175,0.04)",
          padding: "18px 10px",
          minHeight: 120,
        }}
      >
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {obras.map((obra) => (
            <li
              key={obra.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 13,
                paddingBottom: 8,
                borderBottom: "1px solid #f2f2f2",
              }}
            >
              {editId === obra.id ? (
                <>
                  <input
                    value={editNombre}
                    onChange={(e) => setEditNombre(e.target.value)}
                    style={{
                      border: "1px solid #bcd0ef",
                      borderRadius: 5,
                      padding: "6px 10px",
                      fontSize: "1rem",
                      flex: 1,
                    }}
                  />
                  <button
                    onClick={guardarEdicion}
                    style={{
                      background: "#18804b",
                      color: "white",
                      border: "none",
                      borderRadius: 5,
                      padding: "7px 14px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    style={{
                      background: "#e5e7eb",
                      color: "#2457A7",
                      border: "none",
                      borderRadius: 5,
                      padding: "7px 14px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1, fontWeight: 500, color: "#1e293b" }}>
                    {obra.nombre}
                  </span>
                  <button
                    style={{
                      background: "#f0f6ff",
                      color: "#2457A7",
                      border: "none",
                      borderRadius: 5,
                      padding: "7px 14px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                    onClick={() => empezarEditar(obra.id, obra.nombre)}
                  >
                    Editar
                  </button>
                  <button
                    style={{
                      background: "#ffe1e1",
                      color: "#c20000",
                      border: "none",
                      borderRadius: 5,
                      padding: "7px 14px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                    onClick={() => eliminar(obra.id)}
                  >
                    Eliminar
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>

        {obras.length === 0 && (
          <div style={{ textAlign: "center", color: "#999" }}>
            No hay obras sociales cargadas.
          </div>
        )}
      </div>

      {mensaje && (
        <div
          style={{
            marginTop: 18,
            textAlign: "center",
            color: "#18804b",
            fontWeight: 500,
            fontSize: "1rem",
          }}
        >
          {mensaje}
        </div>
      )}
    </div>
  );
}
