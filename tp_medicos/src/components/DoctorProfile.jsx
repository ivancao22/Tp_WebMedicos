import { Link } from "react-router-dom";
import doctorPicture from '../assets/landing/drMartinez.png'; // Ajusta la ruta si es necesario

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
            Soy especialista en medicina estética con más de 10 años de experiencia en tratamientos faciales y corporales mínimamente invasivos, ayudando a mis pacientes a mejorar su salud, confianza y bienestar con resultados naturales y seguros.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            En mi consultorio en Polo Dot, CABA, un espacio moderno con tecnología de vanguardia, trabajamos junto a un equipo de tres especialistas para brindar una atención integral, personalizada y de excelencia.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/citas"
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
          <div className="relative w-full md:w-[90%] lg:w-[80%] aspect-[3/4] overflow-hidden rounded-lg bg-blue-50">
            <img
              src={doctorPicture}
              alt="Doctor profesional"
              className="w-full h-full object-contain object-center"
              loading="lazy"
            />
            {/* Difuminado lateral izquierdo */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-12 md:w-24 lg:w-32 pointer-events-none bg-gradient-to-r from-blue-50 via-blue-50/90 to-transparent" />
            {/* Difuminado arriba */}
            <div className="absolute top-0 left-0 right-0 h-10 md:h-16 pointer-events-none bg-gradient-to-b from-blue-50/90 to-transparent" />
            {/* Difuminado abajo */}
            <div className="absolute bottom-0 left-0 right-0 h-12 md:h-20 pointer-events-none bg-gradient-to-t from-blue-50 via-blue-50/90 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}