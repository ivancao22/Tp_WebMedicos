import React from "react";
import equipoMedico from "../assets/aboutUs/grupoMedico.png";
import medica1 from "../assets/aboutUs/medica1.png";
import medica2 from "../assets/aboutUs/medica2.png";
import medico3 from "../assets/aboutUs/medico3.png";

export function AboutUs() {
  // Tarjeta reutilizable para cada integrante
const MemberCard = ({ photo, name, role }) => (
  <div
    style={{
      background: "#f9fbff",
      borderRadius: 12,
      padding: 22,
      boxShadow: "0 2px 10px #0001",
      flex: "1 1 240px",
      maxWidth: 260,
      minWidth: 200,
      textAlign: "center",
      transition: "transform .2s ease, box-shadow .2s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "0 6px 20px #0002";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 10px #0001";
    }}
  >
    <div
      style={{
        width: 96,
        height: 96,
        margin: "0 auto 12px",
        borderRadius: "50%",
        overflow: "hidden",
        boxShadow: "0 0 0 4px #e6efff inset",
      }}
    >
      <img
        src={photo}
        alt={name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top", // cara bien centrada
          display: "block",
        }}
      />
    </div>

    <h3 style={{ margin: "8px 0 6px", color: "#2563eb", fontWeight: 600 }}>
      {name}
    </h3>
    <p style={{ fontSize: 15, margin: 0, color: "#0f1f3d" }}>{role}</p>
  </div>
);

   return (
    // FONDO DE TODA LA PÁGINA
    <div style={{ background: "#eff6ff", minHeight: "100vh", padding: "40px 0" }}>
      
      {/* CARD BLANCA */}
      <div
        style={{
          maxWidth: 900,
          margin: "40px auto",
          padding: "40px 30px",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 6px 32px #0002",
          fontFamily: "Segoe UI, Arial, sans-serif",
        }}
      >
        {/* PRESENTACIÓN + MISIÓN */}
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 32,
            marginBottom: 32,
          }}
        >
          {/* Texto */}
         {/* Texto */}
<div style={{ flex: "1 1 360px", minWidth: 300 }}>
  <h1 style={{ color: "#2563eb", fontSize: 38, marginBottom: 14 }}>
    Sobre Nosotros
  </h1>

  <p style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 14 }}>
    Hola, soy el Dr. Enrique Martínez, médico estético y fundador de este estudio. 
    Hace más de 30 años inicié mis estudios de medicina en la Universidad de Buenos Aires, 
    y pronto descubrí mi pasión por la estética y la cirugía plástica.
  </p>

  <p style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 14 }}>
    Tuve la oportunidad de formarme y adquirir experiencia en el Hospital de Clínicas 
    "José de San Martín" y en el Hospital Italiano de Buenos Aires, lo que me permitió 
    crecer junto a grandes profesionales.
  </p>

  <p style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 14 }}>
    En 2010 cumplí el sueño de crear el Estudio Médico Enrique Martínez, con la misión 
    de ofrecer un espacio cercano y confiable donde cada paciente reciba una atención 
    personalizada. Hoy, a mis 56 años, sigo trabajando con la misma vocación, acompañado 
    por un equipo comprometido en brindar resultados seguros y naturales.
  </p>
</div>


  {/* Imagen de grupo */}
<div
  style={{
    flex: "1 1 320px",
    minWidth: 260,
    textAlign: "center",
    marginTop: "45px", // 👈 bajamos la imagen respecto al título
  }}
>
  <img
    src={equipoMedico}
    alt="Equipo médico"
    style={{
      width: "95%",
      maxWidth: 380,
      height: "500px",
      objectFit: "cover",
      borderRadius: 16,
      boxShadow: "0 2px 16px #0001",
    }}
  />
</div>


        </section>

        {/* NUESTRO EQUIPO */}
        <section style={{ marginBottom: 38 }}>
          <h2 style={{ color: "#2563eb", marginBottom: 16 }}>Nuestro Equipo</h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              justifyContent: "flex-start",
            }}
          >
            <MemberCard
              photo={medica1}
              name="Dra. Julieta Pérez"
              role="Médica Estética - Especialista en tratamientos faciales y corporales"
            />
            <MemberCard
              photo={medica2}
              name="Lic. Carla Gómez"
              role="Dermatóloga Clínica - Asesoría integral en cuidado de la piel"
            />
            <MemberCard
              photo={medico3}
              name="Dr. Facundo Guzman"
              role="Cirujano Plástico - Experto en procedimientos mínimamente invasivos"
            />
          </div>
        </section>

       {/* CONTACTO (similar al landing, pero sin mapa) */}
<section style={{ marginTop: 8 }}>
  <div
    style={{
      background: "#f7fbff",          // celeste suave
      border: "1px solid #d7e6ff",
      borderRadius: 14,
      boxShadow: "0 4px 18px #0001",
      padding: 20,
    }}
  >
    {/* Cabecera con badge */}
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <span
        style={{
          background: "#e9f1ff",
          color: "#2563eb",
          border: "1px solid #cfe0ff",
          padding: "6px 10px",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 0.3,
        }}
      >
        Datos de contacto
      </span>
      <h3 style={{ margin: 0, color: "#2563eb", fontSize: 18, fontWeight: 700 }}>
        Estamos para ayudarte
      </h3>
    </div>

    {/* Solo datos, sin mapa */}
    <div>
      <p style={{ fontSize: 15, marginBottom: 8 }}>
        <b>Teléfono:</b>{" "}
        <a href="tel:1198128764" style={{ color: "#2563eb", textDecoration: "none" }}>
          (+54) 11 9812-8764
        </a>
      </p>
      <p style={{ fontSize: 15, marginBottom: 8 }}>
        <b>Email:</b>{" "}
        <a href="mailto:contacto@turnosmedicos.com" style={{ color: "#2563eb", fontWeight: 600, textDecoration: "none" }}>
          drmartinez@gmail.com
        </a>
      </p>
      <p style={{ fontSize: 15, marginBottom: 8 }}>
        <b>Dirección:</b> Edificio Polo Dot – Vedia 3626, CABA, Oficina 512
      </p>
      <p style={{ fontSize: 15 }}>
        <b>Horarios:</b> Lunes a Viernes, 9 a 18 hs.
      </p>

      {/* Botones CTA */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
        <a
          href="https://wa.me/5491198128764"
          target="_blank"
          rel="noreferrer"
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 2px 8px #2563eb55",
          }}
        >
          Escribir por WhatsApp
        </a>
        <a
          href="https://maps.google.com/?q=Vedia%203626%20CABA"
          target="_blank"
          rel="noreferrer"
          style={{
            border: "1px solid #cfe0ff",
            color: "#2563eb",
            padding: "8px 12px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            background: "#fff",
          }}
        >
          Cómo llegar
        </a>
      </div>
    </div>
  </div>
</section>
      </div> {/* cierre card blanca */}

    </div> // cierre fondo pÃ¡gina 
  );
}

export default AboutUs;
