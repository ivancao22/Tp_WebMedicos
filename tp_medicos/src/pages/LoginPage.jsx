import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState('');

  const validate = () => {
    if (!username || !password) {
      setError('Completa ambos campos.');
      return false;
    }
    if (username.length < 3) {
      setError('El usuario debe tener al menos 3 caracteres.');
      return false;
    }
    if (password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setError('');
    try {
      const res = await login({ username, password });
      if (res.status === 200) {
        setStatus('success');
        navigate('/reservar-citas'); // Redirige directo al área admin
      } else {
        setStatus('error');
        setError(res.message || 'Error desconocido');
      }
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Error desconocido');
    }
  };

  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <form
        style={{
          width: 350,
          padding: 24,
          background: '#f9fbff',
          borderRadius: 10,
          boxShadow: '0 2px 16px #0001',
        }}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Iniciar Sesión</h2>
        <div style={{ marginBottom: 16 }}>
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: 8,
              marginTop: 4,
              borderRadius: 6,
              border: '1px solid #b0b0b0'
            }}
            autoFocus
            disabled={status === 'loading'}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: 8,
              marginTop: 4,
              borderRadius: 6,
              border: '1px solid #b0b0b0'
            }}
            disabled={status === 'loading'}
          />
        </div>
        {error && (
          <div style={{ color: 'red', marginBottom: 12, textAlign: 'center' }}>
            {error}
          </div>
        )}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px 0',
            borderRadius: 6,
            border: 'none',
            background: '#2563eb',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16,
            cursor: status === 'loading' ? 'wait' : 'pointer',
            opacity: status === 'loading' ? 0.7 : 1
          }}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}

export default Login;