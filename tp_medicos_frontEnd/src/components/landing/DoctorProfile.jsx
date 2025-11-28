import { Link } from "react-router-dom";
import doctorPicture from '../../assets/landing/drMartinez.png'; 
import { useAuth } from "../../auth/AuthContext";

// Este componente muestra el perfil del doctor en la landing.
// Si el usuario NO está logueado, muestra los botones para reservar cita y ver obras sociales.
export default function DoctorProfile() {
  const { user } = useAuth();

  return (
    <section className="w-full bg-gradient-to-r from-blue-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center min-h-[510px] md:min-h-[540px]">
        
        {/* Columna de texto: info del doctor, formación y acciones */}
        <div className="px-6 md:px-12 lg:px-16 py-10 order-2 md:order-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4">
            Dr. Enrique Martínez
          </h1>
          <h2 className="text-lg text-blue-700 font-semibold mb-6">
            Médico Estético · MN 123456
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Soy médico estético con más de 15 años de experiencia en tratamientos
            faciales y corporales. Mi objetivo es que cada paciente se sienta
            acompañado y seguro, logrando resultados naturales que mejoren su
            bienestar y confianza.
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            Atiendo en mi estudio médico en Polo Dot, CABA, un espacio moderno donde
            trabajamos junto a un equipo médico de confianza para ofrecer una
            atención integral, cercana y personalizada.
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed font-medium">
            Si querés conocerme más o saber más sobre mi experiencia y mi equipo, 
            podés visitar la sección{" "}
            <Link to="/about-us" className="text-blue-700 hover:text-blue-600 transition">
              Sobre Nosotros
            </Link>.
          </p>

          {/* Formación académica, en un recuadro azul clarito */}
          <div className="mt-6 bg-blue-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Formación Académica
            </h3>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>Médico graduado en la Universidad de Buenos Aires (UBA).</li>
              <li>Postgrado en Cirugía Plástica y Reparadora en la Asociación Médica Argentina.</li>
            </ul>
          </div>

          {/* Botones para reservar cita y ver obras sociales (solo si NO hay usuario logueado) */}
          {!user && (
            <div className="mt-6 flex gap-4">
              <Link
                to="/citas"
                className="px-5 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700"
              >
                Reservar cita
              </Link>
              <Link
                to="/obras-sociales"
                className="px-5 py-3 rounded-md border border-blue-600 text-blue-700 bg-white hover:bg-blue-50"
              >
                Obras Sociales
              </Link>
            </div>
          )}
        </div>

        {/* Columna de imagen: foto del doctor con efectos de difuminado */}
        <div className="order-1 md:order-2 flex items-center justify-end px-6 md:px-0">
          <div className="relative w-full md:w-[90%] lg:w-[80%] aspect-[3/4] overflow-hidden rounded-lg bg-blue-50">
            {/* Foto del doctor, centrada y con objeto contenedor */}
            <img
              src={doctorPicture}
              alt="Doctor profesional"
              className="w-full h-full object-contain object-center"
              loading="lazy"
            />
            {/* Efectos visuales: difuminado en los bordes para que la imagen se integre con el fondo */}
            {/* Izquierda */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-12 md:w-24 lg:w-32 pointer-events-none bg-gradient-to-r from-blue-50 via-blue-50/90 to-transparent" />
            {/* Arriba */}
            <div className="absolute top-0 left-0 right-0 h-10 md:h-16 pointer-events-none bg-gradient-to-b from-blue-50/90 to-transparent" />
            {/* Abajo */}
            <div className="absolute bottom-0 left-0 right-0 h-12 md:h-20 pointer-events-none bg-gradient-to-t from-blue-50 via-blue-50/90 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}