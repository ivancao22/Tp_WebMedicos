import React, { useState, useEffect, useCallback } from "react";
import PopUpAlertas from "../utils/PopUpAlerta";
import {
  getTurnos,
  actualizarTurno
} from "../../services/turnosService";
import { getMedicos } from "../../services/medicosServices";
import { getObras } from "../../services/obrasServices";

// Simulación de persistencia en localStorage (fallback)
const LOCAL_KEY = "citas_mock_storage";

// Función para obtener la fecha de hoy en formato ISO (YYYY-MM-DD)
function getTodayISO() {
  const d = new Date();
  return d.toISOString().substring(0, 10);
}

// Función para obtener la fecha de una semana después
function getWeekLaterISO() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().substring(0, 10);
}

export default function GestionCitas() {
  // Datos mostrados (preferimos server, fallback a local storage)
  const [citas, setCitas] = useState([]);
  const [citasLocalFallback, setCitasLocalFallback] = useState(() => {
    const persisted = localStorage.getItem(LOCAL_KEY);
    return persisted ? JSON.parse(persisted) : [];
  });

  // Meta lists
  const [medicosList, setMedicosList] = useState([]);
  const [obrasList, setObrasList] = useState([]);

  // Loading / UI
  const [loading, setLoading] = useState(false);
  const [loadingMeta, setLoadingMeta] = useState(false);
  const [alerta, setAlerta] = useState({ open: false, message: "", type: "info" });

  // Fecha filtro
  const [fechaDesde, setFechaDesde] = useState(getTodayISO());
  const [fechaHasta, setFechaHasta] = useState(getWeekLaterISO());

  // Track updates in-flight to disable buttons during requests
  const [updatingIds, setUpdatingIds] = useState(new Set());

  // --- Helpers para mapear datos del backend / fallback ---
  const formatPacienteNombre = (c) => {
    const n = c.paciente_nombre ?? c.nombre ?? "";
    const a = c.paciente_apellido ?? c.apellido ?? "";
    return `${n} ${a}`.trim() || "Sin nombre";
  };
  const formatTelefono = (c) => c.paciente_telefono ?? c.telefono ?? "";
  const formatEmail = (c) => c.paciente_email ?? c.email ?? "";
  const formatFecha = (c) => {
    if (c.fecha_turno) return c.fecha_turno.substring(0, 10);
    if (c.fecha) return c.fecha;
    return "";
  };
  const formatHorario = (c) => {
    if (c.fecha_turno) return new Date(c.fecha_turno).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (c.horario) return c.horario;
    return "";
  };
  const findObraName = (c) => {
    const id = c.obra_social_id ?? c.obraSocial ?? c.obra;
    const found = obrasList.find(o => String(o.id) === String(id));
    return found ? (found.nombre || found.razon_social || found.id) : (c.obraSocial || c.obra || "");
  };
  const findMedicoName = (c) => {
    const id = c.medico_id ?? c.medico;
    const found = medicosList.find(m => String(m.id) === String(id));
    if (found) {
      return `${found.nombre || found.first_name || ""} ${found.apellido || found.lastName || ""}`.trim();
    }
    return c.medico_nombre ?? c.medicoName ?? c.medico ?? "";
  };

  // Guardar fallback local cada vez que cambia
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(citasLocalFallback));
  }, [citasLocalFallback]);

  // Cargar turnos y meta (medicos/obras) del servidor
  const loadData = useCallback(async (desdeParam = fechaDesde, hastaParam = fechaHasta) => {
    setLoading(true);
    setLoadingMeta(true);
    try {
      const desdeISO = `${desdeParam}T00:00:00Z`;
      const hastaISO = `${hastaParam}T23:59:59Z`;
      const [turnosArr, meds, obras] = await Promise.all([
        getTurnos({ desde: desdeISO, hasta: hastaISO }).catch(err => { throw err; }),
        getMedicos().catch(() => []),
        getObras().catch(() => [])
      ]);
      setCitas(Array.isArray(turnosArr) ? turnosArr : []);
      setMedicosList(meds || []);
      setObrasList(obras || []);
    } catch (err) {
      console.warn("No se pudieron cargar datos del servidor, usando fallback local:", err);
      setCitas(citasLocalFallback || []);
    } finally {
      setLoading(false);
      setLoadingMeta(false);
    }
  }, [fechaDesde, fechaHasta, citasLocalFallback]);

  // Cargar al montar y cuando cambian filtros de fecha
  useEffect(() => {
    loadData(fechaDesde, fechaHasta);
  }, [loadData, fechaDesde, fechaHasta]);

  // Acción: actualizar estado del turno (confirmar / cancelar)
  const handleUpdateEstado = async (id, nuevoEstado) => {
    setUpdatingIds(prev => new Set(prev).add(String(id)));
    try {
      const updated = await actualizarTurno(id, { estado: nuevoEstado });
      setCitas(prev => prev.map(c => {
        if (String(c.id) === String(id) || String(c.id) === String(updated.id)) {
          return updated;
        }
        return c;
      }));
      setCitasLocalFallback(prev => prev.map(c => (String(c.id) === String(id) ? { ...c, estado: nuevoEstado } : c)));
      setAlerta({
        open: true,
        message: nuevoEstado === "Confirmada"
          ? "Cita confirmada. Se notificará al paciente por correo electrónico."
          : "Cita cancelada. Se notificará al paciente por correo electrónico.",
        type: nuevoEstado === "Confirmada" ? "success" : "warning"
      });
    } catch (err) {
      console.error("Error actualizando estado del turno:", err);
      setAlerta({
        open: true,
        message: err.message || "Error al actualizar turno",
        type: "error"
      });
    } finally {
      setUpdatingIds(prev => {
        const copy = new Set(prev);
        copy.delete(String(id));
        return copy;
      });
    }
  };

  // Render
  return (
    <div style={{
      minHeight: "65vh",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      background: "#eff6ff",
      padding: "20px 0"
    }}>
      <PopUpAlertas
        open={alerta.open}
        message={alerta.message}
        type={alerta.type}
        onClose={() => setAlerta({ ...alerta, open: false })}
      />

      <div style={{
        width: "100%",
        maxWidth: 1280, // AGRANDAMOS un poco la grilla
        margin: "40px 0",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 24px #0001",
        padding: "28px 26px"
      }}>
        <h2 style={{ color: "#2563eb", marginBottom: 24 }}>Gestión de Citas</h2>

        {/* Filtros de fecha */}
        <div style={{ marginBottom: 18, display: "flex", gap: 18, alignItems: "center" }}>
          <div>
            <label>Desde: </label>
            <input type="date" value={fechaDesde} onChange={e => setFechaDesde(e.target.value)} />
          </div>
          <div>
            <label>Hasta: </label>
            <input type="date" value={fechaHasta} onChange={e => setFechaHasta(e.target.value)} />
          </div>
          <div style={{ marginLeft: "auto" }}>
            <button
              onClick={() => loadData(fechaDesde, fechaHasta)}
              style={{
                background: "#2563eb", color: "#fff", border: "none",
                borderRadius: 6, padding: "8px 14px", cursor: "pointer", fontWeight: 600
              }}
            >
              {loading ? "Cargando..." : "Refrescar"}
            </button>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 15,
            background: "#fff",
            minWidth: 1100 // ligeramente mayor que antes
          }}>
            <thead>
              <tr style={{ background: "#f7fbff" }}>
                <th style={{ ...th, width: 170 }}>Paciente</th>
                <th style={{ ...th, width: 110 }}>Teléfono</th>
                <th style={{ ...th, width: 170 }}>Email</th>
                <th style={{ ...th, width: 120 }}>Obra Social</th>
                <th style={{ ...th, width: 110 }}>Fecha</th>
                <th style={{ ...th, width: 90 }}>Horario</th>
                <th style={{ ...th, width: 160 }}>Médico</th>
                <th style={{ ...th, width: 130 }}>Motivo</th>
                <th style={{ ...th, width: 110 }}>Estado</th>
                <th style={{ ...th, width: 140 }}></th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={10} style={{ textAlign: "center", padding: 30 }}>
                    Cargando...
                  </td>
                </tr>
              )}
              {!loading && (!citas || citas.length === 0) && (
                <tr>
                  <td colSpan={10} style={{ textAlign: "center", padding: 30, color: "#888" }}>
                    No hay citas registradas.
                  </td>
                </tr>
              )}
              {!loading && citas && citas.map(cita => {
                const estado = (cita.estado || "").toString();
                const id = cita.id;
                const confirmDisabled = (estado.toLowerCase() === "confirmada") || (estado.toLowerCase() === "cancelada");
                const cancelDisabled = (estado.toLowerCase() === "cancelada");
                const updating = updatingIds.has(String(id)) || updatingIds.has(id);
                return (
                  <tr key={id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ ...td, width: 170 }}>{formatPacienteNombre(cita)}</td>
                    <td style={{ ...td, width: 110 }}>{formatTelefono(cita)}</td>
                    <td style={{ ...td, width: 170 }}>{formatEmail(cita)}</td>
                    <td style={{ ...td, width: 120 }}>{findObraName(cita)}</td>
                    <td style={{ ...td, width: 110 }}>{formatFecha(cita)}</td>
                    <td style={{ ...td, width: 90 }}>{formatHorario(cita)}</td>
                    <td style={{ ...td, width: 160 }}>{findMedicoName(cita)}</td>
                    <td style={{ ...td, width: 130 }}>{cita.motivo || "-"}</td>
                    <td style={{ ...td, width: 110 }}>
                      <span style={{
                        color: estado.toLowerCase() === "confirmada" ? "#16a34a"
                          : estado.toLowerCase() === "cancelada" ? "#dc2626" : "#eab308",
                        fontWeight: "bold"
                      }}>
                        {estado || "Solicitada"}
                      </span>
                    </td>
                    <td style={{ ...td, width: 140, textAlign: "center" }}>
                      {/* Contenedor de botones: inline, uno al lado del otro */}
                      <div style={{
                        display: "flex",
                        gap: 8,
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
                        <button
                          onClick={() => handleUpdateEstado(id, "Confirmada")}
                          style={{
                            background: confirmDisabled ? "#b3c7ef" : "#2563eb",
                            color: "#fff",
                            border: "none",
                            borderRadius: 6,
                            padding: "6px 10px",
                            cursor: confirmDisabled || updating ? "not-allowed" : "pointer",
                            minWidth: 86, // botones un poco más chicos
                            fontSize: 13,
                            opacity: confirmDisabled || updating ? 0.85 : 1,
                            fontWeight: 600
                          }}
                          disabled={confirmDisabled || updating}
                        >
                          Confirmar
                        </button>

                        <button
                          onClick={() => handleUpdateEstado(id, "Cancelada")}
                          style={{
                            background: cancelDisabled ? "#f3a6a6" : "#dc2626",
                            color: "#fff",
                            border: "none",
                            borderRadius: 6,
                            padding: "6px 10px",
                            cursor: cancelDisabled || updating ? "not-allowed" : "pointer",
                            minWidth: 86,
                            fontSize: 13,
                            opacity: cancelDisabled || updating ? 0.85 : 1,
                            fontWeight: 600
                          }}
                          disabled={cancelDisabled || updating}
                        >
                          Cancelar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Estilos para las celdas de la tabla (cabecera y datos)
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