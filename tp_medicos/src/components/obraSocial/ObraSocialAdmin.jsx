import React, { useState } from "react";
import iniciales from '../../mock/ObraSocial'

// Esta página es el panel de administración de obras sociales.
// Permite agregar, editar y eliminar obras sociales de forma muy simple.
// Los cambios solo afectan a la sesión actual (no hay backend, se maneja todo en memoria).
export default function ObraSocialAdmin() {
  const [obras, setObras] = useState(iniciales); // Lista de obras sociales
  const [nuevo, setNuevo] = useState(""); // Nombre nuevo para agregar
  const [editId, setEditId] = useState(null); // ID de la obra que se está editando
  const [editNombre, setEditNombre] = useState(""); // Nombre editado
  const [mensaje, setMensaje] = useState(""); // Mensaje de confirmación

  // Agrega una obra social nueva
  const agregar = () => {
    if (!nuevo.trim()) return;
    setObras([...obras, { id: Date.now(), nombre: nuevo }]);
    setNuevo("");
    mostrarMensaje("Obra social agregada");
  };

  // Elimina una obra social por ID
  const eliminar = (id) => {
    setObras(obras.filter(o => o.id !== id));
    mostrarMensaje("Obra social eliminada");
  };

  // Prepara el modo edición para una obra social existente
  const empezarEditar = (id, nombre) => {
    setEditId(id);
    setEditNombre(nombre);
  };

  // Guarda los cambios de edición
  const guardarEdicion = () => {
    setObras(obras.map(o => o.id === editId ? { ...o, nombre: editNombre } : o));
    setEditId(null);
    setEditNombre("");
    mostrarMensaje("Obra social actualizada");
  };

  // Muestra un mensaje temporal en pantalla
  const mostrarMensaje = (msg) => {
    setMensaje(msg);
    setTimeout(() => setMensaje(""), 1800); // El mensaje desaparece después de 1.8 segundos
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
      {/* Título principal */}
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

      {/* Formulario para agregar una nueva obra social */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, justifyContent: "center" }}>
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
            boxShadow: "0 2px 8px rgba(30,64,175,0.06)"
          }}
        >
          Agregar
        </button>
      </div>

      {/* Lista de obras sociales con opciones de editar y eliminar */}
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
              {/* Si se está editando, muestra input y botones de guardar/cancelar */}
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
                      cursor: "pointer"
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
                      cursor: "pointer"
                    }}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  {/* Nombre de la obra social */}
                  <span style={{ flex: 1, fontWeight: 500, color: "#1e293b" }}>{obra.nombre}</span>
                  {/* Botón para editar */}
                  <button
                    style={{
                      background: "#f0f6ff",
                      color: "#2457A7",
                      border: "none",
                      borderRadius: 5,
                      padding: "7px 14px",
                      fontWeight: 500,
                      cursor: "pointer"
                    }}
                    onClick={() => empezarEditar(obra.id, obra.nombre)}
                  >
                    Editar
                  </button>
                  {/* Botón para eliminar */}
                  <button
                    style={{
                      background: "#ffe1e1",
                      color: "#c20000",
                      border: "none",
                      borderRadius: 5,
                      padding: "7px 14px",
                      fontWeight: 500,
                      cursor: "pointer"
                    }}
                    onClick={() => eliminar(obra.id)}
                  >
                    Eliminar
                  </button>
                </>
              )}
            </li>
          )}
        </ul>
        {/* Mensaje si no hay obras sociales cargadas */}
        {obras.length === 0 && (
          <div style={{ textAlign: "center", color: "#999" }}>
            No hay obras sociales cargadas.
          </div>
        )}
      </div>
      {/* Mensaje de confirmación de acción (agregado, editado, eliminado) */}
      {mensaje && (
        <div
          style={{
            marginTop: 18,
            textAlign: "center",
            color: "#18804b",
            fontWeight: 500,
            fontSize: "1rem"
          }}
        >
          {mensaje}
        </div>
      )}
    </div>
  );
}