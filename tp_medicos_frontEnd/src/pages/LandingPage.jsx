import { motion } from "framer-motion";
import DoctorProfile from "../components/landing/DoctorProfile";
import Servicios from "../components/landing/Servicios";
import Beneficios from "../components/landing/Beneficios";
import TestimonialSlider from "../components/landing/TestimonialSliders";
import { Link } from "react-router-dom";

// Animación de aparición para los bloques 
const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

// Landing principal del sitio médico
export default function Landing() {
  return (
    <section className="flex flex-col items-center bg-blue-50 min-h-screen">

      {/* Presentación del doctor, con animación */}
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-14 w-full "
      >
        <DoctorProfile />
      </motion.div>

      {/* Sección de servicios médicos estéticos */}
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-full bg-blue-50 py-10 mb-14"
      >
        {/* El componente Servicios muestra las tarjetas de cada tratamiento */}
        <div className="max-w-6xl mx-auto">
          <Servicios />
        </div>
      </motion.div>

      {/* Beneficios de atenderse en el consultorio */}
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-full mb-14"
      >
        <div className="max-w-5xl w-full mx-auto px-4">
          <Beneficios />
        </div>
      </motion.div>

      {/* Carrusel de testimonios de pacientes */}
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-full flex justify-center mb-14"
      >
        <div className="max-w-5xl w-full px-4">
          <TestimonialSlider />
        </div>
      </motion.div>

      {/* Datos de contacto y ubicación del consultorio */}
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-full max-w-5xl mb-14 px-4"
      >
        <h3 className="text-xl font-semibold text-blue-800 mb-4 text-center">
          Encontranos
        </h3>

        {/* Card principal con datos y mapa */}
        <div className="rounded-2xl bg-white/95 backdrop-blur border border-blue-200 shadow-sm p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-2 items-start">
            {/* Columna izquierda: todos los datos clave y acciones */}
            <div className="space-y-4 text-blue-900">
              {/* Teléfono */}
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  {/* Ícono teléfono */}
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor"><path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3 7.18 2 2 0 0 1 5 5h4.09a2 2 0 0 1 2 1.72l.4 2.34a2 2 0 0 1-.57 1.86l-1.2 1.2a16 16 0 0 0 6.9 6.9l1.2-1.2a2 2 0 0 1 1.86-.57l2.34.4A2 2 0 0 1 22 16.92z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wide text-blue-600">Teléfono</div>
                  <a href="tel:1198128764" className="text-blue-700 hover:underline">
                    (+54) 11 9812-8764
                  </a>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  {/* Ícono mail */}
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="m22 6-10 7L2 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wide text-blue-600">Email</div>
                  <a href="mailto:drmartinez@gmail.com" className="text-blue-700 hover:underline">
                    drmartinez@gmail.com
                  </a>
                </div>
              </div>
              {/* Dirección */}
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  {/* Ícono ubicación */}
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wide text-blue-600">Consultorio</div>
                  <p>Edificio Polo Dot — Vedia 3626, CABA, Oficina 512</p>
                </div>
              </div>
              {/* Horarios */}
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  {/* Ícono reloj */}
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wide text-blue-600">Horarios</div>
                  <p>Lunes a Viernes, 9 a 18 hs</p>
                </div>
              </div>
              {/* Botones de acción: WhatsApp y cómo llegar */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://wa.me/5491198128764"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-sm font-semibold"
                >
                  Reservar por WhatsApp
                </a>
                <a
                  href="https://maps.google.com/?q=Vedia%203626%20CABA"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-blue-300 text-blue-700 hover:bg-blue-50 px-3 py-2 text-sm font-semibold"
                >
                  Cómo llegar
                </a>
              </div>
            </div>
            {/* Columna derecha: mapa embebido de Google Maps */}
            <div className="rounded-xl overflow-hidden border border-blue-200 shadow-sm bg-blue-50">
              <iframe
                title="Ubicación consultorio"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.618791076185!2d-58.49315438477092!3d-34.55337088046814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb6aa6c1dbe8b%3A0x8d339c2d7e8ef415!2sPolo%20Dot%20Office%20Park!5e0!3m2!1ses-419!2sar!4v1695596828386!5m2!1ses-419!2sar"
                className="w-full h-64 md:h-80"
                loading="lazy"
                style={{ border: 0 }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}