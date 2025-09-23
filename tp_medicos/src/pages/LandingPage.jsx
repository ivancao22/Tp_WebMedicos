import { motion } from "framer-motion";
import DoctorProfile from "../components/DoctorProfile";
import Servicios from "../components/Servicios";
import Beneficios from "../components/Beneficios";
import TestimonialSlider from "../components/TestimonialSliders";
import ContactoForm from "../components/ContactForm";
import { Link } from "react-router-dom";

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function Landing() {
  return (
    <section className="flex flex-col items-center bg-gradient-to-b from-blue-50 via-white to-white min-h-screen">
      {/* Presentación del doctor */}
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-14"
      >
        <DoctorProfile />
      </motion.div>

      {/* Servicios */}
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-full bg-[#f6f9ff] py-10 mb-14"
      >
        <div className="max-w-6xl mx-auto">
          <Servicios />
        </div>
      </motion.div>

      {/* Beneficios */}
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-full mb-14"
      >
        <div className="max-w-5xl w-full mx-auto px-4 text-align-center">
          <Beneficios />
        </div>
      </motion.div>

      {/* Testimonios */}
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

      {/* Contacto */}
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-full max-w-2xl mb-14 px-4"
      >
        <h3 className="text-xl font-semibold text-pink-600 mb-2 text-center">Contacto</h3>
        <ContactoForm />
        <div className="mt-6 text-center">
          <p>Tel: <a href="tel:1122334455" className="text-pink-700">11 2233-4455</a></p>
          <p>Email: <a href="mailto:dra.estetica@ejemplo.com" className="text-pink-700">dra.estetica@ejemplo.com</a></p>
          <p>Consultorio: Edificio Polo Dot - Vedia 3626, CABA, Oficina 512</p>
          <p>Horarios: Lunes a Viernes 9 a 18 hs.</p>
        </div>
      </motion.div>

      {/* Mapa embebido */}
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-14 w-full px-4 flex justify-center"
      >
        <iframe
          title="Ubicación consultorio"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.618791076185!2d-58.49315438477092!3d-34.55337088046814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb6aa6c1dbe8b%3A0x8d339c2d7e8ef415!2sPolo%20Dot%20Office%20Park!5e0!3m2!1ses-419!2$ar!4v1695596828386!5m2!1ses-419!2$ar"
          width="340"
          height="200"
          style={{ border: 0, borderRadius: "16px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>

      {/* Login administrativo */}
      <div className="mb-8">
        <Link to="/login" className="text-sm text-gray-500 hover:text-pink-600 underline">
          Acceso para médico/secretaría
        </Link>
      </div>
      {/* Footer */}
      <footer className="w-full py-4 bg-pink-50 text-pink-600 text-center text-xs border-t">
        &copy; {new Date().getFullYear()} Dra. Julieta Pérez | Medicina Estética | Todos los derechos reservados
      </footer>
    </section>
  );
}