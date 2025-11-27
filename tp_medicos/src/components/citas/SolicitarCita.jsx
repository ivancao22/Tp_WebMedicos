import React, { useState, useEffect } from "react";
import obrasSocialesMock from "../../mock/ObraSocial";
import medicos from "../../mock/Medicos";
import motivosCita from "../../mock/MotivosCita";
import {
  TextField, Button, MenuItem, Box, Typography, Paper, Grid, Tooltip
} from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

// 🔴 NUEVO: importo funciones que hablan con el back
import { getObrasSociales, crearCita } from "../../services/api";

// Clave para guardar citas en localStorage, simulando una base de datos local
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
  // 🔴 NUEVO: obras sociales que vienen del backend (o mock si falla)
  const [obrasSociales, setObrasSociales] = useState([]);

  // Lee las citas guardadas para evitar solapamiento de horarios (en este navegador)
  const [citas, setCitas] = useState(() => {
    const persisted = localStorage.getItem(LOCAL_KEY);
    try {
      return persisted ? JSON.parse(persisted) : [];
    } catch {
      return [];
    }
  });

  // Mensaje de éxito cuando se agenda una cita
  const [mensaje, setMensaje] = useState('');
  const [showMensaje, setShowMensaje] = useState(false);

  // Estado del formulario, guarda todos los datos del paciente
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    obraSocial: '',      // acá vamos a guardar el ID de la obra social
    motivo: '',
    fecha: null,
    hora: '',
    medico: ''
  });
  const [errores, setErrores] = useState({});

  // 🔴 NUEVO: cargar obras sociales desde el backend (con fallback al mock)
  useEffect(() => {
    const cargarObras = async () => {
      try {
        const data = await getObrasSociales();      // viene del back
        setObrasSociales(data);                    // se espera [{ _id, nombre, ... }]
      } catch (err) {
        console.error("Error obteniendo obras sociales del back, usando mock:", err.message);
        // fallback al mock
        const adaptadas = obrasSocialesMock.map(os => ({
          _id: os.id,
          nombre: os.nombre
        }));
        setObrasSociales(adaptadas);
      }
    };
    cargarObras();
  }, []);

  // Muestra el mensaje de éxito por 10 segundos
  useEffect(() => {
    if (mensaje) {
      setShowMensaje(true);
      const timer = setTimeout(() => {
        setShowMensaje(false);
        setMensaje('');
      }, 10000); // 10 segundos
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  // Validaciones del formulario, chequea que todo esté bien antes de agendar
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

  // Filtra los horarios ocupados para cada médico y fecha (en este navegador)
  const horariosLibres = () => {
    if (!form.fecha || !form.medico) return [];
    const fechaStr = form.fecha.format("YYYY-MM-DD");
    const ocupados = citas
      .filter(c => c.fecha === fechaStr && c.medico === form.medico)
      .map(c => c.horario);
    return generarHorarios().filter(hora => !ocupados.includes(hora));
  };

  // Handlers de los campos del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFecha = (date) => {
    setForm({ ...form, fecha: date, hora: "" });
  };
  const handleHora = (hora) => {
    setForm({ ...form, hora });
  };

  // 🔴 MODIFICADO: ahora también manda la cita al backend
  const handleReservar = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    const fechaFormateada = form.fecha.format("YYYY-MM-DD");
    const nuevaCita = {
      id: Date.now(),
      nombre: form.nombre,
      apellido: form.apellido,
      telefono: form.telefono,
      email: form.email,
      obraSocial: form.obraSocial,   // acá está el ID
      motivo: form.motivo,
      fecha: fechaFormateada,
      horario: form.hora,
      medico: form.medico,
      estado: "Solicitada"
    };

    // Guarda local (como ya tenías)
    const nuevasCitas = [...citas, nuevaCita];
    setCitas(nuevasCitas);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(nuevasCitas));

    // 🔴 NUEVO: enviar al backend
    try {
      const fechaISO = dayjs(`${fechaFormateada}T${form.hora}`).toISOString();
      await crearCita({
        nombreResponsable: `${form.nombre} ${form.apellido}`.trim(),
        nombrePaciente: `${form.nombre} ${form.apellido}`.trim(),
        telefono: form.telefono,
        email: form.email,
        obraSocialId: form.obraSocial,  // ID de la obra social
        motivo: form.motivo,
        medico: form.medico,
        fecha: fechaISO
      });
    } catch (err) {
      console.error("Error enviando la cita al backend:", err.message);
      // no corto el flujo, igual queda guardada en local; si querés podés mostrar un error aparte
    }

    setMensaje("Cita agendada con éxito. Revise su correo electrónico para los datos de la cita.");
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
  };

  // Solo permite seleccionar días hábiles (lunes a viernes)
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
        {/* Mensaje de éxito, aparece si la cita se agenda bien */}
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

        {/* Primera fila: nombre, apellido, telefono, correo */}
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

        {/* Segunda fila: Obra Social, Motivo, Médico */}
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
              {/* Muestra todas las obras sociales disponibles */}
              {obrasSociales.map((os) => (
                <MenuItem key={os._id} value={os._id}>{os.nombre}</MenuItem>
              ))}
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
              {/* Muestra todos los motivos de consulta disponibles */}
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
              {/* Los médicos en licencia aparecen deshabilitados */}
              {medicos.map(medico => (
                medico.estado === "licencia" ? (
                  <Tooltip title="Médico en licencia" key={medico.id} arrow>
                    <span>
                      <MenuItem value={medico.nombre} disabled style={{ color: "#aaa" }}>
                        {medico.nombre}
                      </MenuItem>
                    </span>
                  </Tooltip>
                ) : (
                  <MenuItem key={medico.id} value={medico.nombre}>{medico.nombre}</MenuItem>
                )
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Debajo: izquierda calendario, derecha horarios */}
        <Grid container spacing={2} alignItems="flex-start" sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontWeight: 600, color: "#2563eb", mb: 1, textAlign: "center" }}>
              Seleccione día
            </Typography>
            {/* Calendario, solo habilita días hábiles y solo si se eligió médico */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={form.fecha}
                onChange={handleFecha}
                shouldDisableDate={disableWeekends}
                minDate={dayjs()}
                maxDate={dayjs().add(14, 'day')} // Solo dos semanas disponibles
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
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Horarios disponibles para el día y médico elegido */}
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
                      {/* Botones de horarios, los ocupados aparecen deshabilitados */}
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
                {/* Mensaje de error si no eligió horario */}
                <Typography color="error" fontSize={13} sx={{ minHeight: 20, textAlign: "center" }}>
                  {errores.hora || " "}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>

        {/* Botón para enviar la solicitud de cita, centrado */}
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
          >
            SOLICITAR CITA
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
