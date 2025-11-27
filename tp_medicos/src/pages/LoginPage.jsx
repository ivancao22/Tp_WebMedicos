import React, { useMemo, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

// Login simple para el sitio. Validaciones, muestra errores y permite mostrar/ocultar la contraseña.
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Estados para usuario, contraseña y flags varios
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);

  // Estados para errores, estado del form y si se tocó cada input
  const [touched, setTouched] = useState({ u: false, p: false });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  // Validación de usuario
  const userError = useMemo(() => {
    if (!touched.u) return "";
    if (!username) return "Ingresá el usuario o email.";
    if (username.length < 3) return "El usuario debe tener al menos 3 caracteres.";
    return "";
  }, [username, touched.u]);

  // Validación de contraseña
  const passError = useMemo(() => {
    if (!touched.p) return "";
    if (!password) return "Ingresá la contraseña.";
    if (password.length < 8) return "Mínimo 8 caracteres.";
    if (!/[A-Za-z]/.test(password) || !/\d/.test(password))
      return "Debe incluir letras y números.";
    return "";
  }, [password, touched.p]);

  const formValid = username && password && !userError && !passError;

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ u: true, p: true });
    if (!formValid || status === "loading") return;

    setStatus("loading");
    setError("");

    try {
      const res = await login({ username, password, remember });
      if (res?.status === 200) {
        setStatus("success");
        navigate("/");
      } else {
        throw new Error(res?.message || "Credenciales inválidas");
      }
    } catch (err) {
      setStatus("error");
      setError(err?.message || "No se pudo iniciar sesión.");
    } finally {
      setStatus((s) => (s === "success" ? s : "idle"));
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eff6ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        paddingBottom: 100,
      }}
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="on"
        style={{
          width: 360,
          padding: 24,
          background: "#f9fbff",
          borderRadius: 10,
          boxShadow: "0 2px 16px #0001",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 16 }}>Iniciar sesión</h2>

        {error && (
          <div
            role="alert"
            style={{
              background: "#fee2e2",
              border: "1px solid #fecaca",
              color: "#991b1b",
              borderRadius: 8,
              padding: "8px 10px",
              marginBottom: 12,
              fontSize: 14,
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="login-user" style={{ fontSize: 14 }}>
            Usuario o email
          </label>
          <input
            id="login-user"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (error) setError("");
            }}
            onBlur={() => setTouched((t) => ({ ...t, u: true }))} 
            placeholder="usuario o email"
            autoComplete="username"
            disabled={status === "loading"}
            style={{
              width: "100%",
              padding: 10,
              marginTop: 4,
              borderRadius: 6,
              border: `1px solid ${userError ? "#fca5a5" : "#b0b0b0"}`,
              outline: "none",
            }}
          />
          {userError && (
            <div style={{ color: "#b91c1c", fontSize: 12, marginTop: 4 }}>
              {userError}
            </div>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="login-pass" style={{ fontSize: 14 }}>
            Contraseña
          </label>
          <div style={{ position: "relative" }}>
            <input
              id="login-pass"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              onBlur={() => setTouched((t) => ({ ...t, p: true }))} 
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={status === "loading"}
              style={{
                width: "100%",
                padding: "10px 38px 10px 10px",
                marginTop: 4,
                borderRadius: 6,
                border: `1px solid ${passError ? "#fca5a5" : "#b0b0b0"}`,
                outline: "none",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                color: "#555",
                cursor: "pointer",
              }}
              disabled={status === "loading"}
            >
              {showPass ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          {passError && (
            <div style={{ color: "#b91c1c", fontSize: 12, marginTop: 4 }}>
              {passError}
            </div>
          )}
          <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>
            Mínimo 8 caracteres, con letras y números.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <label style={{ fontSize: 14, display: "inline-flex", gap: 6 }}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              disabled={status === "loading"}
            />
            Recordarme
          </label>
        </div>

        <button
          type="submit"
          disabled={!formValid || status === "loading"}
          style={{
            width: "100%",
            padding: "10px 0",
            borderRadius: 6,
            border: "none",
            background: !formValid || status === "loading" ? "#93c5fd" : "#2563eb",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
            cursor: !formValid || status === "loading" ? "not-allowed" : "pointer",
            opacity: status === "loading" ? 0.85 : 1,
            transition: "background .15s",
          }}
        >
          {status === "loading" ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
