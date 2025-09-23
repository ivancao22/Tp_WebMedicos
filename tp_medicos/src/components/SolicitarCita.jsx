import React, { useState } from "react";

export default function SolicitarCita() {
  const [mensaje, setMensaje] = useState('');
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    obraSocial: '',
    fecha: '',
    motivo: ''
  });
  const [errores, setErrores] = useState({});

  // Simulación de obras sociales
  const obrasSociales = [
    "OSDE", "Swiss Medical", "Galeno", "Medicus", "Otra"
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!form.nombre) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!form.apellido) nuevosErrores.apellido = "El apellido es obligatorio";
    if (!form.telefono) nuevosErrores.telefono = "El teléfono es obligatorio";
    if (!form.email) nuevosErrores.email = "El correo es obligatorio";
    if (!form.obraSocial) nuevosErrores.obraSocial = "La obra social es obligatoria";
    if (!form.fecha) nuevosErrores.fecha = "La fecha es obligatoria";
    if (!form.motivo) nuevosErrores.motivo = "El motivo es obligatorio";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleReservar = (e) => {
    e.preventDefault();
    if (!validar()) return;
    setMensaje("¡Cita solicitada con éxito! Pronto nos pondremos en contacto para confirmar.");
    // Aquí deberías enviar los datos al backend, resetear formulario, etc...
  };

  return (
    <div style={{
      minHeight: "65vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f7fbff"
    }}>
      <form
        style={{
          width: 420,
          padding: "32px 28px",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 4px 24px #0001",
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleReservar}
        autoComplete="off"
      >
        <h2 style={{ textAlign: "center", marginBottom: 24, color: "#2563eb" }}>Solicitar Cita Médica</h2>
        {mensaje && (
          <div style={{
            color: "green",
            background: "#f5f6fa",
            borderRadius: 6,
            padding: "7px 0",
            marginBottom: 14,
            textAlign: "center",
            fontWeight: 500
          }}>{mensaje}</div>
        )}
        <div style={{ marginBottom: 14 }}>
          <label>Nombre</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange}
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #b0b0b0" }} />
          {errores.nombre && <span style={{ color: "red", fontSize: 13 }}>{errores.nombre}</span>}
        </div>
        <div style={{ marginBottom: 14 }}>
          <label>Apellido</label>
          <input type="text" name="apellido" value={form.apellido} onChange={handleChange}
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #b0b0b0" }} />
          {errores.apellido && <span style={{ color: "red", fontSize: 13 }}>{errores.apellido}</span>}
        </div>
        <div style={{ marginBottom: 14 }}>
          <label>Teléfono</label>
          <input type="tel" name="telefono" value={form.telefono} onChange={handleChange}
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #b0b0b0" }} />
          {errores.telefono && <span style={{ color: "red", fontSize: 13 }}>{errores.telefono}</span>}
        </div>
        <div style={{ marginBottom: 14 }}>
          <label>Correo electrónico</label>
          <input type="email" name="email" value={form.email} onChange={handleChange}
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #b0b0b0" }} />
          {errores.email && <span style={{ color: "red", fontSize: 13 }}>{errores.email}</span>}
        </div>
        <div style={{ marginBottom: 14 }}>
          <label>Obra Social</label>
          <select name="obraSocial" value={form.obraSocial} onChange={handleChange}
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #b0b0b0" }}>
            <option value="">Seleccione una obra social</option>
            {obrasSociales.map((os, i) => (
              <option key={i} value={os}>{os}</option>
            ))}
          </select>
          {errores.obraSocial && <span style={{ color: "red", fontSize: 13 }}>{errores.obraSocial}</span>}
        </div>
        <div style={{ marginBottom: 14 }}>
          <label>Fecha</label>
          <input type="date" name="fecha" value={form.fecha} onChange={handleChange}
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #b0b0b0" }} />
          {errores.fecha && <span style={{ color: "red", fontSize: 13 }}>{errores.fecha}</span>}
        </div>
        <div style={{ marginBottom: 18 }}>
          <label>Motivo</label>
          <input type="text" name="motivo" value={form.motivo} onChange={handleChange}
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #b0b0b0" }} />
          {errores.motivo && <span style={{ color: "red", fontSize: 13 }}>{errores.motivo}</span>}
        </div>
        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 17,
            border: "none",
            borderRadius: 6,
            padding: "12px 0",
            marginTop: 6,
            cursor: "pointer"
          }}
        >
          Solicitar cita
        </button>
      </form>
    </div>
  );
}