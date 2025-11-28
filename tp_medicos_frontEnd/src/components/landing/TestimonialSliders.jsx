import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import testimonios from "../../mock/Testimonios";

// Este componente muestra los testimonios de pacientes en formato carrusel (slider).
// Usa la librería Swiper para que se puedan deslizar los testimonios y ver varios a la vez.
export default function TestimonialSlider() {
  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      {/* Título de la sección de testimonios */}
      <h3 className="text-xl font-semibold text-blue-800 mb-8 text-center">
        Testimonios de pacientes del Dr. Enrique Martínez
      </h3>
      {/* El slider: muestra 1, 2 o 3 testimonios a la vez según el tamaño de pantalla */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={32}
        slidesPerView={3}
        slidesPerGroup={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        style={{ paddingBottom: 40 }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {/* Mapea cada testimonio a una "slide" */}
        {testimonios.map((t, idx) => (
          <SwiperSlide key={idx}>
            {/* Tarjeta con la foto, el texto y el nombre del paciente */}
            <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-8 mx-2 transition-all duration-300 min-h-[320px] max-w-[340px] border border-blue-100">
              {/* Foto circular del paciente */}
              <img
                src={t.foto}
                alt={`Foto de ${t.nombre}`}
                className="w-20 h-20 rounded-full mb-4 object-cover ring-4 ring-blue-100 shadow"
                style={{ backgroundColor: "#e5edfa" }}
              />
              {/* Texto del testimonio, en cursiva */}
              <p className="text-gray-700 text-base italic mb-4 text-center">
                "{t.texto}"
              </p>
              {/* Nombre del paciente */}
              <span className="font-semibold text-blue-700">{t.nombre}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}