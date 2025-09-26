import { Link } from "react-router-dom";
import doctorPicture from '../assets/landing/Doctor.jpg'; // Ajusta la ruta si es necesario

export default function DoctorProfile() {
  return (
    <section className="w-full bg-gradient-to-r from-blue-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center min-h-[510px] md:min-h-[540px]">
        {/* Texto del doctor */}
        <div className="px-6 md:px-12 lg:px-16 py-10 order-2 md:order-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4">
            Dr. Enrique Martínez
          </h1>
          <h2 className="text-lg text-blue-700 font-semibold mb-6">
            Médico Estético · MN 123456
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Especialista en medicina estética, tratamientos faciales y corporales mínimamente invasivos.
            Más de 10 años ayudando a mejorar la salud, confianza y bienestar de mis pacientes en el corazón de Polo Dot, CABA.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/reservar-citas"
              className="bg-blue-700 text-white px-6 py-3 rounded-md font-semibold shadow hover:bg-blue-800 transition"
            >
              Reservar cita
            </Link>
            <Link
              to="/obras-sociales"
              className="border border-blue-700 text-blue-700 px-6 py-3 rounded-md font-semibold hover:bg-blue-50 transition"
            >
              Obras Sociales
            </Link>
          </div>
        </div>

        {/* Imagen del doctor, tamaño intermedio y difuminado lateral */}
        <div className="order-1 md:order-2 flex items-center justify-end px-6 md:px-0">
          <div className="relative w-full md:w-[90%] lg:w-[80%] h-[300px] md:h-[480px] overflow-hidden rounded-lg">
            <img
              src={doctorPicture}
              alt="Doctor profesional"
              className="w-full h-full object-cover object-right"
              loading="lazy"
            />
            {/* Difuminado lateral izquierdo */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-12 md:w-24 lg:w-32 pointer-events-none bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}