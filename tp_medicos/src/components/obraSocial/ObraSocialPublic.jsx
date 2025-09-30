import React from "react";
import obrasEjemplo from '../../mock/ObraSocial';

// Esta página muestra la lista de obras sociales con las que trabaja el consultorio.
// Es solo informativa, para que los pacientes puedan consultar si su cobertura está incluida.
// Si no la encuentran, les damos los datos de contacto para que puedan consultar.
export default function ObraSocialPublic() {
  return (
    <div
      style={{
        maxWidth: 520,
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
          fontSize: "1.4rem",
          textAlign: "center",
          marginBottom: 28,
          color: "#2457A7",
          fontWeight: 700,
          letterSpacing: ".01em"
        }}
      >
        Trabajamos con las siguientes obras sociales
      </h2>
      {/* Grid de obras sociales, cada una en su tarjetita */}
      <div
        style={{
          display: "flex",
          gap: 18,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 20,
        }}
      >
        {obrasEjemplo.map((obra) => (
          <div
            key={obra.id}
            style={{
              background: "white",
              borderRadius: 10,
              padding: "16px 24px",
              minWidth: 120,
              textAlign: "center",
              fontWeight: 500,
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(30,64,175,0.06)",
              color: "#1e293b",
              marginBottom: 12,
            }}
          >
            {obra.nombre}
          </div>
        ))}
      </div>

      {/* Si el paciente no encuentra su obra social, mostramos los datos de contacto */}
      <div
        style={{
          borderTop: "1px solid #d1d5db",
          paddingTop: 18,
          marginTop: 18,
        }}
      >
        <h3
          style={{
            fontSize: "1.05rem",
            fontWeight: 500,
            color: "#2457A7",
            marginBottom: 10,
            textAlign: "center"
          }}
        >
          ¿No encontrás tu obra social?
        </h3>
        <div
          style={{
            marginTop: 4,
            background: "#f4f8ff",
            borderRadius: 8,
            padding: "16px 18px",
            color: "#1e293b",
            textAlign: "center",
            fontWeight: 500,
            fontSize: "1.07rem",
            boxShadow: "0 2px 8px #0001",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div style={{ marginBottom: 8 }}>
            Contáctanos por correo a{" "}
            <a href="mailto:drmartinez@gmail.com" style={{ color: "#2457A7", fontWeight: "bold" }}>
              drmartinez@gmail.com
            </a>
          </div>
          <div style={{ marginBottom: 2 }}>
            O por WhatsApp/llamada al{" "}
            <a href="tel:+5491198128764" style={{ color: "#2457A7", fontWeight: "bold" }}>
              11-9812-8764
            </a>
          </div>
          <div style={{ fontSize: "0.97rem", marginTop: 5 }}>
            ¡Estamos para ayudarte!
          </div>
        </div>
      </div>
    </div>
  );
}