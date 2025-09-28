import React, { useState, useEffect } from "react";
import { citasIniciales } from "../mock/Citas";
import PopUpAlertas from "./utils/PopUpAlerta";

// Simulación de persistencia en localStorage
const LOCAL_KEY = "citas_mock_storage";

function getTodayISO() {
  const d = new Date();
  return d.toISOString().substring(0, 10);
}
function getWeekLaterISO() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().substring(0, 10);
}

export default function GestionCitas() {
  // Cargar desde localStorage si existe, si no, mock
  const [citas, setCitas] = useState(() => {
    const persisted = localStorage.getItem(LOCAL_KEY);
    return persisted ? JSON.parse(persisted) : citasIniciales;
  });

  // Persistir cambios en "mock"
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(citas));
  }, [citas]);

  // PopUp alerta
  const [alerta, setAlerta] = useState({ open: false, message: "", type: "info" });

  // Filtro de fechas
  const [fechaDesde, setFechaDesde] = useState(getTodayISO());
  const [fechaHasta, setFechaHasta] = useState(getWeekLaterISO());

  // Confirmar cita
  const confirmarCita = (id) => {
    setCitas(citas =>
      citas.map(cita =>
        cita.id === id ? { ...cita, estado: "Confirmada" } : cita
      )
    );
    setAlerta({
      open: true,
      message: "Cita confirmada. Se notificará al paciente por correo electrónico.",
      type: "success"
    });
  };

  // Cancelar cita
  const cancelarCita = (id) => {
    setCitas(citas =>
      citas.map(cita =>
        cita.id === id ? { ...cita, estado: "Cancelada" } : cita
      )
    );
    setAlerta({
      open: true,
      message: "Cita cancelada. Se notificará al paciente por correo electrónico.",
      type: "warning"
    });
  };

  // Filtrar por fechas
  const citasFiltradas = citas.filter(cita =>
    cita.fecha >= fechaDesde && cita.fecha <= fechaHasta
  );

  return (
    <div style={{
      minHeight: "65vh",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      background: "#f7fbff"
    }}>
      <PopUpAlertas
        open={alerta.open}
        message={alerta.message}
        type={alerta.type}
        onClose={() => setAlerta({ ...alerta, open: false })}
      />
      <div style={{
        width: "100%",
        maxWidth: 1200, //!!! más ancho
        margin: "40px 0",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 24px #0001",
        padding: "32px 26px"
      }}>
        <h2 style={{ color: "#2563eb", marginBottom: 24 }}>Gestión de Citas</h2>
        {/* Filtro de fechas */}
        <div style={{ marginBottom: 18, display: "flex", gap: 18 }}>
          <div>
            <label>Desde: </label>
            <input type="date" value={fechaDesde} onChange={e => setFechaDesde(e.target.value)} />
          </div>
          <div>
            <label>Hasta: </label>
            <input type="date" value={fechaHasta} onChange={e => setFechaHasta(e.target.value)} />
          </div>
        </div>
        <div style={{overflowX: "auto"}}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 15,
          background: "#fff",
          minWidth: 1000 //!!! previene salto de renglón en mobile
        }}>
          <thead>
            <tr style={{ background: "#f7fbff" }}>
              <th style={{...th, width: 170}}>Paciente</th>
              <th style={{...th, width: 110}}>Teléfono</th>
              <th style={{...th, width: 170}}>Email</th>
              <th style={{...th, width: 120}}>Obra Social</th>
              <th style={{...th, width: 110}}>Fecha</th>
              <th style={{...th, width: 90}}>Horario</th>
              <th style={{...th, width: 160}}>Médico</th>
              <th style={{...th, width: 130}}>Motivo</th>
              <th style={{...th, width: 110}}>Estado</th>
              <th style={{...th, width: 90}}></th>
            </tr>
          </thead>
          <tbody>
            {citasFiltradas.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: "center", padding: 30, color: "#888" }}>
                  No hay citas registradas.
                </td>
              </tr>
            ) : (
              citasFiltradas.map(cita => (
                <tr key={cita.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{...td, width: 170}}>{cita.nombre} {cita.apellido}</td>
                  <td style={{...td, width: 110}}>{cita.telefono}</td>
                  <td style={{...td, width: 170}}>{cita.email}</td>
                  <td style={{...td, width: 120}}>{cita.obraSocial}</td>
                  <td style={{...td, width: 110}}>{cita.fecha}</td>
                  <td style={{...td, width: 90}}>{cita.horario}</td>
                  <td style={{...td, width: 160}}>{cita.medico}</td>
                  <td style={{...td, width: 130}}>{cita.motivo}</td>
                  <td style={{...td, width: 110}}>
                    <span style={{
                      color: cita.estado === "Confirmada" ? "#16a34a"
                        : cita.estado === "Cancelada" ? "#dc2626" : "#eab308",
                      fontWeight: "bold"
                    }}>
                      {cita.estado}
                    </span>
                  </td>
                  <td style={{...td, width: 90, textAlign:"center"}}>
                    {cita.estado === "Solicitada" && (
                      <button
                        onClick={() => confirmarCita(cita.id)}
                        style={{
                          background: "#2563eb", color: "#fff", border: "none",
                          borderRadius: 6, padding: "7px 14px", cursor: "pointer", fontWeight: 500
                        }}
                      >
                        Confirmar
                      </button>
                    )}
                    {cita.estado === "Confirmada" && (
                      <button
                        onClick={() => cancelarCita(cita.id)}
                        style={{
                          background: "#dc2626", color: "#fff", border: "none",
                          borderRadius: 6, padding: "7px 14px", cursor: "pointer", fontWeight: 500
                        }}
                      >
                        Cancelar
                      </button>
                    )}
                    {/* Si está cancelada, celda vacía */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
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