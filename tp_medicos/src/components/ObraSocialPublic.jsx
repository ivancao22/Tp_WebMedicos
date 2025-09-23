import React, { useState } from "react";

import obrasEjemplo from '../mock/ObraSocial'
export default function ObraSocialPublic() {
  const [consulta, setConsulta] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setConsulta("");
    // Aquí podrías enviar la consulta a un mail/backend
  };

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
            marginBottom: 8,
            textAlign: "center"
          }}
        >
          ¿No encontrás tu obra social?
        </h3>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: 6,
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <input
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder="Escribí el nombre de tu obra social"
            style={{
              flex: 1,
              border: "1px solid #bcd0ef",
              borderRadius: 6,
              padding: "8px 10px",
              fontSize: "1rem",
              outline: "none",
              background: "#f4f8ff",
              maxWidth: 270
            }}
          />
          <button
            type="submit"
            style={{
              background: "#2457A7",
              color: "white",
              border: "none",
              borderRadius: 6,
              padding: "8px 16px",
              fontWeight: 500,
              cursor: "pointer",
              transition: ".2s",
              boxShadow: "0 2px 8px rgba(30,64,175,0.05)"
            }}
          >
            Consultar
          </button>
        </form>
        {enviado && (
          <p
            style={{
              color: "#18804b",
              marginTop: 10,
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            ¡Gracias por tu consulta!
          </p>
        )}
      </div>
    </div>
  );
}