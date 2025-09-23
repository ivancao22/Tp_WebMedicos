import { useState } from "react";

export default function ContactoForm() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Simula envío
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 rounded-lg shadow-lg p-6 flex flex-col gap-4 max-w-lg mx-auto"
      style={{backdropFilter: "blur(2px)"}}
    >
      <label className="text-left font-semibold">
        Nombre
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border rounded focus:outline-pink-600"
          placeholder="Tu nombre"
        />
      </label>
      <label className="text-left font-semibold">
        Email
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border rounded focus:outline-pink-600"
          placeholder="tu@email.com"
        />
      </label>
      <label className="text-left font-semibold">
        Mensaje
        <textarea
          name="mensaje"
          value={form.mensaje}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border rounded focus:outline-pink-600 min-h-[80px]"
          placeholder="¿En qué podemos ayudarte?"
        />
      </label>
      <button
        type="submit"
        className="bg-pink-600 text-white rounded px-6 py-2 font-semibold mt-2 hover:bg-pink-700 transition"
        disabled={enviado}
      >
        {enviado ? "¡Enviado!" : "Enviar"}
      </button>
      {enviado && (
        <p className="text-green-600 text-center text-sm mt-2 animate-fade-in">
          ¡Gracias por tu mensaje! Te responderemos pronto.
        </p>
      )}
    </form>
  );
}