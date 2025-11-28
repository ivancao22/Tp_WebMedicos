import servicios from "../../mock/Servicios";

// Esta página muestra todos los servicios estéticos que ofrece el consultorio.
// Los servicios se muestran en tarjetas, cada una con su imagen y descripción.
// Hay animaciones de hover para que se vea más "prolijo" y moderno.
export default function Servicios() {
  return (
    <section className="w-full max-w-6xl px-4 mb-14">
      {/* Título principal de la sección */}
      <h3 className="text-2xl font-bold text-blue-800 mb-10 text-center tracking-tight">
        Servicios Estéticos
      </h3>
      {/* Grid responsiva: se adapta a una, dos o tres columnas según el tamaño de pantalla */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {servicios.map((servicio, idx) => (
          <div
            key={idx}
            className="group relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            {/* Imagen del servicio, se agranda un poco al hacer hover */}
            <img
              src={servicio.imagen}
              alt={servicio.nombre}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="p-6">
              {/* Nombre del servicio en negrita y azul */}
              <h4 className="font-extrabold text-lg text-blue-900 mb-2">
                {servicio.nombre}
              </h4>
              {/* Descripción del tratamiento */}
              <p className="text-gray-600 text-sm">{servicio.descripcion}</p>
            </div>
            {/* Overlay para efecto de hover (podés activarlo si querés más sombra/efecto) */}
            {/* <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
          </div>
        ))}
      </div>
    </section>
  );
}