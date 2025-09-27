import React, { useState, useEffect } from "react";
import obrasSociales from "../mock/ObraSocial";
import {
  TextField, Button, MenuItem, Box, Typography, Paper, Grid
} from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

// Mock de turnos ocupados
const turnosOcupados = [
  { fecha: "2025-09-27", hora: "09:00" },
  { fecha: "2025-09-27", hora: "10:30" }
];

// Horarios disponibles entre 9:00 y 17:00 cada 30 min
const generarHorarios = () => {
  const horarios = [];
  for (let h = 9; h <= 17; h++) {
    horarios.push(`${h.toString().padStart(2, "0")}:00`);
    if (h !== 17) horarios.push(`${h.toString().padStart(2, "0")}:30`);
  }
  return horarios;
};

export default function SolicitarCita() {
  const [mensaje, setMensaje] = useState('');
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    obraSocial: '',
    fecha: null,
    hora: '',
    motivo: ''
  });
  const [errores, setErrores] = useState({});
  const [showMensaje, setShowMensaje] = useState(false);

  useEffect(() => {
    if (mensaje) {
      setShowMensaje(true);
      const timer = setTimeout(() => {
        setShowMensaje(false);
        setMensaje('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  const validar = () => {
    const nuevosErrores = {};
    if (!form.nombre.trim() || !/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(form.nombre)) nuevosErrores.nombre = "El nombre es obligatorio y solo debe tener letras";
    if (!form.apellido.trim() || !/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(form.apellido)) nuevosErrores.apellido = "El apellido es obligatorio y solo debe tener letras";
    if (!form.telefono.trim() || !/^\d{8,}$/.test(form.telefono)) nuevosErrores.telefono = "El teléfono es obligatorio y debe tener al menos 8 números";
    if (!form.email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) nuevosErrores.email = "El correo es obligatorio y debe tener formato válido";
    if (!form.obraSocial) nuevosErrores.obraSocial = "La obra social es obligatoria";
    if (!form.fecha) nuevosErrores.fecha = "La fecha es obligatoria";
    if (!form.hora) nuevosErrores.hora = "El horario es obligatorio";
    if (!form.motivo.trim()) nuevosErrores.motivo = "El motivo es obligatorio";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const horariosLibres = () => {
    if (!form.fecha) return [];
    const fechaStr = form.fecha.format("YYYY-MM-DD");
    return generarHorarios().filter(hora =>
      !turnosOcupados.some(t => t.fecha === fechaStr && t.hora === hora)
    );
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFecha = (date) => {
    setForm({ ...form, fecha: date, hora: "" });
  };

  const handleHora = (hora) => {
    setForm({ ...form, hora });
  };

  const handleReservar = (e) => {
    e.preventDefault();
    if (!validar()) return;
    setMensaje("¡Cita solicitada con éxito! Pronto nos pondremos en contacto para confirmar.");
    setForm({
      nombre: '',
      apellido: '',
      telefono: '',
      email: '',
      obraSocial: '',
      fecha: null,
      hora: '',
      motivo: ''
    });
    setErrores({});
  };

  // Solo días hábiles
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
      background: "#f7fbff"
    }}>
      <Paper elevation={8} sx={{
        width: { xs: "100vw", md: 900 },
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

        <Grid container spacing={3} sx={{ width: "100%" }}>
          {/* FORMULARIO - IZQUIERDA */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                error={!!errores.nombre}
                helperText={errores.nombre || " "}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Apellido"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                error={!!errores.apellido}
                helperText={errores.apellido || " "}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Teléfono"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                error={!!errores.telefono}
                helperText={errores.telefono || " "}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Correo electrónico"
                name="email"
                value={form.email}
                onChange={handleChange}
                error={!!errores.email}
                helperText={errores.email || " "}
                fullWidth
                variant="outlined"
              />
              <TextField
                select
                label="Obra Social"
                name="obraSocial"
                value={form.obraSocial}
                onChange={handleChange}
                error={!!errores.obraSocial}
                helperText={errores.obraSocial || " "}
                fullWidth
                variant="outlined"
              >
                <MenuItem value="">Seleccione una obra social</MenuItem>
                {obrasSociales.map((os) => (
                  <MenuItem key={os.id} value={os.nombre}>{os.nombre}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="Motivo"
                name="motivo"
                value={form.motivo}
                onChange={handleChange}
                error={!!errores.motivo}
                helperText={errores.motivo || " "}
                fullWidth
                variant="outlined"
              />
            </Box>
          </Grid>

          {/* CALENDARIO Y HORARIOS - DERECHA */}
          <Grid item xs={12} md={7}>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              width: "100%",
              mt: { xs: 3, md: 0 }
            }}>
              <Typography sx={{ fontWeight: 600, color: "#2563eb", mb: 1, textAlign: "center" }}>
                Seleccione día y horario
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={form.fecha}
                  onChange={handleFecha}
                  shouldDisableDate={disableWeekends}
                  minDate={dayjs()}
                  sx={{
                    width: "100%",
                    mx: "auto",
                  }}
                  views={['day']}
                />
              </LocalizationProvider>
              {/* Horarios solo aparecen si hay fecha */}
              {form.fecha && (
                <Box sx={{ width: "100%", mt: 2 }}>
                  <Typography sx={{ mb: 1, fontWeight: 600, color: "#2563eb", textAlign: "center" }}>
                    Horarios disponibles
                  </Typography>
                  {horariosLibres().length === 0
                    ? <Typography color="warning.main" align="center">No hay horarios disponibles para este día.</Typography>
                    : (
                      <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 1,
                        width: "100%",
                        justifyContent: "center"
                      }}>
                        {horariosLibres().map(hora => (
                          <Button
                            key={hora}
                            variant={form.hora === hora ? "contained" : "outlined"}
                            color="primary"
                            size="small"
                            sx={{
                              minWidth: 60,
                              borderRadius: 2,
                              fontWeight: 500,
                              background: form.hora === hora ? "#2563eb" : "#fff",
                              px: 0,
                              py: 1,
                            }}
                            onClick={() => handleHora(hora)}
                          >
                            {hora}
                          </Button>
                        ))}
                      </Box>
                    )}
                  <Typography color="error" fontSize={13} sx={{ minHeight: 20, textAlign: "center" }}>
                    {errores.hora || " "}
                  </Typography>
                  {/* Botón SIEMPRE visible y centrado */}
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
                      mt: 3,
                      boxShadow: "0 2px 8px #2563eb44",
                      width: "100%"
                    }}
                    fullWidth
                    onClick={handleReservar}
                  >
                    SOLICITAR CITA
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}