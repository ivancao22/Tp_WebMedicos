import React from "react";

export default function PopUpAlertas({ open, message, onClose, type = "info" }) {
  if (!open) return null;
  const colors = {
    info: "#2563eb",
    success: "#16a34a",
    error: "#dc2626",
    warning: "#eab308"
  };
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.12)", zIndex: 9999, display: "flex",
      alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        minWidth: 300, background: "#fff", borderRadius: 14,
        boxShadow: "0 4px 32px #0003", padding: "26px 22px 18px 22px",
        border: `2px solid ${colors[type]}`
      }}>
        <div style={{ marginBottom: 18, fontSize: 17, color: "#222" }}>
          {message}
        </div>
        <button
          onClick={onClose}
          style={{
            background: colors[type], color: "#fff", border: "none",
            borderRadius: 8, padding: "9px 24px", fontSize: 16,
            fontWeight: "bold", cursor: "pointer", marginTop: 6
          }}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}