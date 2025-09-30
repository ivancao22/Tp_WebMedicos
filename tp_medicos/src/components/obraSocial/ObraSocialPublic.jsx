import React, { useEffect, useState } from "react";
import mockObras from "../../mock/ObraSocial";

const STORAGE_KEY = "obrasSociales_v1";

export default function ObraSocialPublic() {
  // Carga inicial: localStorage -> fallback al mock
  const [obras, setObras] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(data) && data.length ? data : mockObras;
    } catch {
      return mockObras;
    }
  });

  // Si otra pestaña/ventana modifica localStorage, nos actualizamos
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        try {
          const data = JSON.parse(e.newValue);
          setObras(Array.isArray(data) && data.length ? data : mockObras);
        } catch {
          setObras(mockObras);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div
      style={{
        maxWidth: 700,
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
          fontSize: "1.6rem",
          textAlign: "center",
          marginBottom: 28,
          color: "#2457A7",
          fontWeight: 800,
          letterSpacing: ".01em",
        }}
      >
        Trabajamos con las siguientes obras sociales
      </h2>

      {/* Grid de obras desde estado (localStorage o mock) */}
      <div
        style={{
          display: "flex",
          gap: 18,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 26,
        }}
      >
        {obras.map((obra) => (
          <div
            key={obra.id}
            style={{
              background: "white",
              borderRadius: 12,
              padding: "14px 24px",
              minWidth: 140,
              textAlign: "center",
              fontWeight: 600,
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(30,64,175,0.06)",
              color: "#1e293b",
            }}
          >
            {obra.nombre}
          </div>
        ))}
      </div>

      <hr style={{ border: 0, height: 1, background: "#e5e7eb", margin: "6px 0 18px" }} />

      <h3
        style={{
          fontSize: "1.05rem",
          fontWeight: 600,
          color: "#2457A7",
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        ¿No encontrás tu obra social?
      </h3>

      <div
        style={{
          marginTop: 4,
          background: "#f4f8ff",
          borderRadius: 10,
          padding: "16px 18px",
          color: "#1e293b",
          textAlign: "center",
          fontWeight: 500,
          boxShadow: "0 2px 8px #0001",
        }}
      >
        <div style={{ marginBottom: 8 }}>
          Contáctanos por correo a{" "}
          <a href="mailto:drmartinez@gmail.com" style={{ color: "#2457A7", fontWeight: "bold" }}>
            drmartinez@gmail.com
          </a>
        </div>
        <div>
          O por WhatsApp/llamada al{" "}
          <a href="tel:+5491198128764" style={{ color: "#2457A7", fontWeight: "bold" }}>
            11-9812-8764
          </a>
        </div>
        <div style={{ fontSize: ".98rem", marginTop: 8 }}>¡Estamos para ayudarte!</div>
      </div>
    </div>
  );
}
