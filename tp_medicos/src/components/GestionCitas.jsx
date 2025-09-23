import React, { useState } from "react";

// Simulación de datos de citas
const citasIniciales = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    telefono: "1134567890",
    email: "juanperez@mail.com",
    obraSocial: "OSDE",
    fecha: "2025-09-25",
    motivo: "Chequeo anual",
    estado: "Solicitada"
  },
  {
    id: 2,
    nombre: "Ana",
    apellido: "García",
    telefono: "1145678901",
    email: "anagarcia@mail.com",
    obraSocial: "Swiss Medical",
    fecha: "2025-09-26",
    motivo: "Consulta dolor",
    estado: "Confirmada"
  }
];

export default function GestionCitas() {
  const [citas, setCitas] = useState(citasIniciales);

  const confirmarCita = (id) => {
    setCitas(citas =>
      citas.map(cita =>
        cita.id === id ? { ...cita, estado: "Confirmada" } : cita
      )
    );
    // Aquí deberías enviar el cambio al backend y enviar el mail al paciente
    alert("Cita confirmada. Se notificará al paciente por correo electrónico.");
  };

  return (
    <div style={{
      minHeight: "65vh",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      background: "#f7fbff"
    }}>
      <div style={{
        width: "100%",
        maxWidth: 900,
        margin: "40px 0",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 24px #0001",
        padding: "32px 26px"
      }}>
        <h2 style={{ color: "#2563eb", marginBottom: 24 }}>Gestión de Citas</h2>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 15,
          background: "#fff"
        }}>
          <thead>
            <tr style={{ background: "#f7fbff" }}>
              <th style={th}>Paciente</th>
              <th style={th}>Teléfono</th>
              <th style={th}>Email</th>
              <th style={th}>Obra Social</th>
              <th style={th}>Fecha</th>
              <th style={th}>Motivo</th>
              <th style={th}>Estado</th>
              <th style={th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citas.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: 30, color: "#888" }}>
                  No hay citas registradas.
                </td>
              </tr>
            ) : (
              citas.map(cita => (
                <tr key={cita.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={td}>{cita.nombre} {cita.apellido}</td>
                  <td style={td}>{cita.telefono}</td>
                  <td style={td}>{cita.email}</td>
                  <td style={td}>{cita.obraSocial}</td>
                  <td style={td}>{cita.fecha}</td>
                  <td style={td}>{cita.motivo}</td>
                  <td style={td}>
                    <span style={{
                      color: cita.estado === "Confirmada" ? "#16a34a" : "#eab308",
                      fontWeight: "bold"
                    }}>
                      {cita.estado}
                    </span>
                  </td>
                  <td style={td}>
                    {cita.estado === "Solicitada" && (
                      <button
                        onClick={() => confirmarCita(cita.id)}
                        style={{
                          background: "#2563eb",
                          color: "#fff",
                          border: "none",
                          borderRadius: 6,
                          padding: "7px 14px",
                          cursor: "pointer",
                          fontWeight: 500
                        }}
                      >
                        Confirmar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th = {
  padding: "8px 6px",
  borderBottom: "1px solid #e0e7ef",
  textAlign: "left",
  fontWeight: 600,
  color: "#2563eb"
};
const td = {
  padding: "8px 6px",
  borderBottom: "1px solid #f3f3f3"
};