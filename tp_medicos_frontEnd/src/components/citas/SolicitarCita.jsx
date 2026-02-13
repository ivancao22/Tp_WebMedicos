import React, { useState, useEffect } from "react";
import { crearTurno, guardarTurnoLocal, getTurnos } from "../../services/turnosService";
import { getMedicos } from "../../services/medicosServices";
import { getObras } from "../../services/obrasServices";
import motivosCita from "../../mock/MotivosCita"; // opcional: migrar luego a API
import {
  TextField, Button, MenuItem, Box, Typography, Paper, Grid, Tooltip, CircularProgress
} from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

// Clave para guardar citas en localStorage (fallback)
const LOCAL_KEY = "citas_mock_storage";

// Genera los horarios posibles cada 45 minutos, de 9:00 a 18:00
const generarHorarios = () => {
  const horarios = [];
  let h = 9, m = 0;
  while (h < 18 || (h === 18 && m === 0)) {
    const hora = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
    horarios.push(hora);
    m += 45;
    if (m >= 60) {
      h += 1;
      m = m - 60;
    }
  }
  return horarios;
};

export default function SolicitarCita() {
  // Fallback local: citas guardadas en localStorage
  const [citasLocal, setCitasLocal] = useState(() => {
    const persisted = localStorage.getItem(LOCAL_KEY);
    try {
      return persisted ? JSON.parse(persisted) : [];
    } catch {
      return [];
    }
  });

  // Listas desde API
  const [medicosList, setMedicosList] = useState([]);
  const [obrasList, setObrasList] = useState([]);
  const [loadingMeta, setLoadingMeta] = useState(true);

  // Turnos traídos del servidor para el médico/fecha seleccionados
  const [serverTurnos, setServerTurnos] = useState([]);
  const [loadingTurnos, setLoadingTurnos] = useState(false);

  // Mensajes y flags
  const [mensaje, setMensaje] = useState('');
  const [showMensaje, setShowMensaje] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    obraSocial: '',
    motivo: '',
    fecha: null,
    hora: '',
    medico: ''
  });
  const [errores, setErrores] = useState({});

  // Mostrar mensaje por 10s
  useEffect(() => {
    if (mensaje) {
      setShowMensaje(true);
      const timer = setTimeout(() => {
        setShowMensaje(false);
        setMensaje('');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  // Cargar médicos y obras sociales al montar
  useEffect(() => {
    let mounted = true;
    async function loadMeta() {
      setLoadingMeta(true);
      try {
        const [meds, obras] = await Promise.all([
          getMedicos().catch(() => []),
          getObras().catch(() => []),
        ]);
        if (!mounted) return;
        setMedicosList(meds || []);
        setObrasList(obras || []);
      } catch (err) {
        console.error('Error cargando médicos/obras:', err);
        setMedicosList([]);
        setObrasList([]);
      } finally {
        if (mounted) setLoadingMeta(false);
      }
    }
    loadMeta();
    return () => { mounted = false; };
  }, []);

  // Cuando cambia médico o fecha, traer turnos del servidor para esa fecha
  useEffect(() => {
    let mounted = true;
    async function fetchTurnos() {
      if (!form.medico || !form.fecha) {
        setServerTurnos([]);
        return;
      }
      setLoadingTurnos(true);
      try {
        const fechaStr = form.fecha.format("YYYY-MM-DD");
        const desde = `${fechaStr}T00:00:00Z`;
        const hasta = `${fechaStr}T23:59:59Z`;
        const params = { medico_id: form.medico, desde, hasta };
        const arr = await getTurnos(params);
        if (!mounted) return;
        setServerTurnos(arr || []);
      } catch (err) {
        console.error('Error obteniendo turnos del servidor:', err);
        setServerTurnos([]);
      } finally {
        if (mounted) setLoadingTurnos(false);
      }
    }
    fetchTurnos();
    return () => { mounted = false; };
  }, [form.medico, form.fecha]);

  // Validaciones del formulario
  const validar = () => {
    const nuevosErrores = {};
    if (!form.nombre.trim() || !/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(form.nombre)) nuevosErrores.nombre = "El nombre es obligatorio y solo debe tener letras";
    if (!form.apellido.trim() || !/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(form.apellido)) nuevosErrores.apellido = "El apellido es obligatorio y solo debe tener letras";
    if (!form.telefono.trim() || !/^\d{8,}$/.test(form.telefono)) nuevosErrores.telefono = "Teléfono obligatorio (mín. 8 dígitos)";
    if (!form.email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) nuevosErrores.email = "Correo obligatorio y válido";
    if (!form.obraSocial) nuevosErrores.obraSocial = "La obra social es obligatoria";
    if (!form.fecha) nuevosErrores.fecha = "La fecha es obligatoria";
    if (!form.hora) nuevosErrores.hora = "El horario es obligatorio";
    if (!form.medico) nuevosErrores.medico = "Debe elegir médico";
    if (!form.motivo) nuevosErrores.motivo = "El motivo es obligatorio";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Calcula horarios libres basándose en serverTurnos (fallback a local)
  const horariosLibres = () => {
    if (!form.fecha || !form.medico) return [];
    const fechaStr = form.fecha.format("YYYY-MM-DD");

    const ocupadosFromServer = serverTurnos
      .filter(t => {
        const estado = (t.estado || '').toString().toLowerCase();
        if (estado === 'cancelada' || estado === 'cancelado') return false;
        return dayjs(t.fecha_turno).format("YYYY-MM-DD") === fechaStr;
      })
      .map(t => dayjs(t.fecha_turno).format("HH:mm"));

    const ocupados = (serverTurnos && serverTurnos.length > 0)
      ? ocupadosFromServer
      : citasLocal.filter(c => c.fecha === fechaStr && c.medico === form.medico).map(c => c.horario);

    return generarHorarios().filter(hora => !ocupados.includes(hora));
  };

  // Handlers
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFecha = (date) => {
    setForm({ ...form, fecha: date, hora: "" });
  };
  const handleHora = (hora) => {
    setForm({ ...form, hora });
  };

  // Reservar: llamar a la API, fallback local si falla
  const handleReservar = async (e) => {
    e.preventDefault();
    if (!validar()) return;
    setSubmitting(true);
    try {
      const payload = {
        fecha: form.fecha.format("YYYY-MM-DD"),
        hora: form.hora,
        paciente_nombre: form.nombre,
        paciente_apellido: form.apellido,
        paciente_email: form.email,
        paciente_telefono: form.telefono,
        obra_social_id: form.obraSocial || null,
        medico_id: form.medico,
        motivo: form.motivo
      };
      const created = await crearTurno(payload);
      // actualizar turnos en memoria para bloquear inmediatamente el horario reservado
      setServerTurnos(prev => [...prev, created]);
      setMensaje("Cita agendada con éxito. Revise su correo electrónico para los datos de la cita.");
      // limpiar form
      setForm({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        obraSocial: '',
        motivo: '',
        fecha: null,
        hora: '',
        medico: ''
      });
      setErrores({});
    } catch (err) {
      console.error('Error creando turno (fallback local):', err);
      try {
        const local = guardarTurnoLocal({
          paciente_nombre: form.nombre,
          paciente_apellido: form.apellido,
          paciente_email: form.email,
          paciente_telefono: form.telefono,
          obraSocial: form.obraSocial,
          medico: form.medico,
          fecha: form.fecha.format("YYYY-MM-DD"),
          horario: form.hora,
          motivo: form.motivo,
          estado: 'Solicitada'
        });
        setCitasLocal(prev => [...prev, local]);
        setMensaje("No se pudo contactar al servidor — la cita se guardó localmente.");
        setForm({
          nombre: '',
          apellido: '',
          telefono: '',
          email: '',
          obraSocial: '',
          motivo: '',
          fecha: null,
          hora: '',
          medico: ''
        });
        setErrores({});
      } catch (err2) {
        console.error('Error fallback local:', err2);
        setMensaje('Error al guardar la cita. Intente nuevamente más tarde.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Only weekdays
  const disableWeekends = (date) => {
    const day = date.day();
    return day === 0 || day === 6;
  };

  return (
    <Box sx={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
    }}>
      <Paper elevation={8} sx={{
        width: { xs: "100vw", md: 1100 },
        maxWidth: "98vw",
        p: { xs: 2, md: 5 },
        borderRadius: 4,
        boxShadow: "0 8px 32px #0002",
      }}>
        <Typography variant="h5" align="center" sx={{ mb: 3, color: "#2563eb", fontWeight: 700 }}>
          Solicitar Cita Médica
        </Typography>

        {showMensaje && (
          <Box sx={{
            color: "#18804b",
            background: "#e8fff4",
            borderRadius: 1,
            py: 1,
            mb: 1,
            textAlign: "center",
            fontWeight: 500,
            fontSize: "1.15rem",
            width: "100%"
          }}>{mensaje}</Box>
        )}

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={3}>
            <TextField
              label="Nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              error={!!errores.nombre}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Apellido"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              error={!!errores.apellido}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Teléfono"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              error={!!errores.telefono}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Correo electrónico"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={!!errores.email}
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={4} sx={{ minWidth: 200 }}>
            <TextField
              select
              label="Obra Social"
              name="obraSocial"
              value={form.obraSocial}
              onChange={handleChange}
              error={!!errores.obraSocial}
              fullWidth
              variant="outlined"
            >
              {loadingMeta ? <MenuItem><em>Cargando...</em></MenuItem> :
                obrasList.length === 0 ? <MenuItem value=""><em>No hay obras</em></MenuItem> :
                  obrasList.map(os => (
                    <MenuItem key={os.id} value={os.id}>{os.nombre || os.razon_social || os.id}</MenuItem>
                  ))
              }
            </TextField>
          </Grid>
          <Grid item xs={12} md={4} sx={{ minWidth: 200 }}>
            <TextField
              select
              label="Motivo"
              name="motivo"
              value={form.motivo}
              onChange={handleChange}
              error={!!errores.motivo}
              fullWidth
              variant="outlined"
            >
              {motivosCita.map((motivo, idx) => (
                <MenuItem key={idx} value={motivo}>{motivo}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4} sx={{ minWidth: 200 }}>
            <TextField
              select
              label="Médico"
              name="medico"
              value={form.medico}
              onChange={handleChange}
              error={!!errores.medico}
              fullWidth
              variant="outlined"
            >
              {loadingMeta ? <MenuItem><em>Cargando...</em></MenuItem> :
                medicosList.length === 0 ? <MenuItem value=""><em>No hay médicos</em></MenuItem> :
                  medicosList.map(med => {
                    const nombreCompleto = `${med.nombre || med.first_name || ''} ${med.apellido || med.lastName || ''}`.trim();
                    return med.estado === "licencia" ? (
                      <Tooltip title="Médico en licencia" key={med.id} arrow>
                        <span>
                          <MenuItem value={med.id} disabled style={{ color: "#aaa" }}>
                            {nombreCompleto || med.nombre || med.id}
                          </MenuItem>
                        </span>
                      </Tooltip>
                    ) : (
                      <MenuItem key={med.id} value={med.id}>{nombreCompleto || med.nombre || med.id}</MenuItem>
                    )
                  })
              }
            </TextField>
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="flex-start" sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontWeight: 600, color: "#2563eb", mb: 1, textAlign: "center" }}>
              Seleccione día
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={form.fecha}
                onChange={handleFecha}
                shouldDisableDate={disableWeekends}
                minDate={dayjs()}
                maxDate={dayjs().add(14, 'day')}
                disabled={!form.medico}
                sx={{
                  width: "100%",
                  mx: "auto",
                  opacity: form.medico ? 1 : 0.6,
                  pointerEvents: form.medico ? "auto" : "none"
                }}
                views={['day']}
              />
            </LocalizationProvider>
            {loadingTurnos && <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}><CircularProgress size={20} /></Box>}
          </Grid>

          <Grid item xs={12} md={6}>
            {form.fecha && (
              <>
                <Typography sx={{ fontWeight: 600, color: "#2563eb", mb: 1, textAlign: "center" }}>
                  Horarios disponibles
                </Typography>
                {horariosLibres().length === 0
                  ? <Typography color="warning.main" align="center">No hay horarios disponibles para este día.</Typography>
                  : (
                    <Box sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 1,
                      width: "100%",
                      justifyContent: "center"
                    }}>
                      {generarHorarios().map(hora => {
                        const ocupado = !horariosLibres().includes(hora);
                        return (
                          <Button
                            key={hora}
                            variant={form.hora === hora ? "contained" : "outlined"}
                            color={ocupado ? "inherit" : "primary"}
                            size="small"
                            sx={{
                              minWidth: 90,
                              borderRadius: 2,
                              fontWeight: 500,
                              background: form.hora === hora && !ocupado ? "#2563eb" : "#fff",
                              color: ocupado ? "#aaa" : undefined,
                              px: 0,
                              py: 1,
                              cursor: ocupado ? "not-allowed" : "pointer"
                            }}
                            disabled={ocupado}
                            onClick={() => !ocupado && handleHora(hora)}
                          >
                            {hora}
                          </Button>
                        );
                      })}
                    </Box>
                  )}
                <Typography color="error" fontSize={13} sx={{ minHeight: 20, textAlign: "center" }}>
                  {errores.hora || " "}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              background: "#2563eb",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 17,
              borderRadius: 2,
              py: 1.5,
              boxShadow: "0 2px 8px #2563eb44",
              width: { xs: "100%", md: 300 }
            }}
            onClick={handleReservar}
            disabled={submitting}
          >
            {submitting ? "Reservando..." : "SOLICITAR CITA"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}