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
      {/* PRESENTACIÓN + MISIÓN (unificados) */}
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 32,
          marginBottom: 32,
        }}
      >
        {/* Texto (presentación + misión) */}
        <div style={{ flex: "1 1 360px", minWidth: 300 }}>
          <h1 style={{ color: "#2563eb", fontSize: 38, marginBottom: 14 }}>
            Sobre Nosotros
          </h1>

          <p style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 14 }}>
            Somos un equipo de profesionales apasionados por transformar la forma en que los pacientes acceden a la atención médica. Combinamos tecnología de vanguardia con un trato cercano y humano, creando un espacio confiable y accesible para gestionar turnos médicos de manera ágil y segura.
          </p>

          <h2 style={{ color: "#2563eb", fontSize: 20, margin: "14px 0 8px" }}>
            Nuestra Misión
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.6, marginBottom: 10 }}>
            Nuestra misión es facilitar el acceso al sistema de salud a través de una plataforma moderna, intuitiva y eficiente, que conecta a pacientes y especialistas en un mismo lugar. Ofrecemos herramientas digitales que simplifican la gestión de turnos, historias clínicas y recordatorios, siempre priorizando la seguridad, la privacidad y la atención personalizada.
          </p>
        </div>

        {/* Imagen de grupo */}
        <div style={{ flex: "1 1 260px", minWidth: 240, textAlign: "center" }}>
          <img
            src={equipoMedico}
            alt="Equipo médico"
            style={{
              width: "90%",
              maxWidth: 340,
              borderRadius: 12,
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
      name="Dr. Enrique Martínez"
      role="Cirujano Plástico - Experto en procedimientos mínimamente invasivos"
    />
  </div>
</section>



      {/* CONTACTO (igual) */}
      <section>
        <h2 style={{ color: "#2563eb", marginBottom: 12 }}>Contacto</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 32,
          }}
        >
          <div style={{ flex: "2 1 300px", minWidth: 250 }}>
            <p style={{ fontSize: 17 }}>
              ¿Tienes dudas, sugerencias o te gustaría sumarte al equipo?
              <br />
              <b>¡Queremos escucharte!</b>
              <br />
              <br />
              Envía tu mensaje a:
              <br />
              <a
                href="mailto:contacto@turnosmedicos.com"
                style={{ color: "#2563eb", fontWeight: "bold" }}
              >
                contacto@turnosmedicos.com
              </a>
            </p>
          </div>
          {/* (se quitó la imagen secundaria aquí, como pediste) */}
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
