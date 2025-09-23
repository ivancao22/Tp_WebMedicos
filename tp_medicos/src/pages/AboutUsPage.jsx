import React from "react";

export function AboutUs() {
  return (
    <div style={{
      maxWidth: 900,
      margin: "40px auto",
      padding: "40px 30px",
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 6px 32px #0002",
      fontFamily: "Segoe UI, Arial, sans-serif"
    }}>
      <section style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginBottom: 32 }}>
        <div style={{ flex: "1 1 320px", minWidth: 300, paddingRight: 32 }}>
          <h1 style={{ color: "#2563eb", fontSize: 38, marginBottom: 18 }}>Sobre Nosotros</h1>
          <p style={{ fontSize: 20, lineHeight: 1.5 }}>
            Somos un equipo dedicado a transformar la experiencia de gestión y reserva de turnos médicos, uniendo tecnología y calidez humana para llevar la salud al alcance de todos.
          </p>
        </div>
        <div style={{ flex: "1 1 260px", minWidth: 240, textAlign: "center" }}>
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
            alt="Estudio médico moderno"
            style={{ width: "90%", maxWidth: 340, borderRadius: 12, boxShadow: "0 2px 16px #0001" }}
          />
        </div>
      </section>

      <section style={{
        display: "flex", flexWrap: "wrap", gap: 36, alignItems: "center", marginBottom: 38
      }}>
        <div style={{ flex: "1 1 270px", minWidth: 260, order: 2 }}>
          <img
            src="https://images.unsplash.com/photo-1588776814546-ec7e8b0c7aa8?auto=format&fit=crop&w=600&q=80"
            alt="Equipo médico colaborando"
            style={{ width: "100%", maxWidth: 320, borderRadius: 12, boxShadow: "0 2px 16px #0001" }}
          />
        </div>
        <div style={{ flex: "2 1 340px", minWidth: 290, order: 1 }}>
          <h2 style={{ color: "#2563eb", marginBottom: 10 }}>Nuestra Misión</h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, marginBottom: 10 }}>
            <b>Facilitar y optimizar el acceso al sistema de salud</b> a través de una plataforma eficiente, intuitiva y segura, donde pacientes y profesionales puedan gestionar sus turnos, historias clínicas y comunicaciones en un solo lugar.
          </p>
          <ul style={{ fontSize: 16, marginLeft: 20 }}>
            <li>Agendas online siempre disponibles</li>
            <li>Notificaciones automáticas y recordatorios</li>
            <li>Privacidad y protección de datos</li>
            <li>Atención personalizada y soporte constante</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: 38 }}>
        <h2 style={{ color: "#2563eb", marginBottom: 16 }}>Nuestro Equipo</h2>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 30,
          justifyContent: "flex-start"
        }}>
          <div style={{
            background: "#f9fbff",
            borderRadius: 10,
            padding: 20,
            boxShadow: "0 1px 6px #0001",
            flex: "1 1 220px",
            maxWidth: 230,
            minWidth: 180,
            textAlign: "center"
          }}>
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Iván Cao"
              style={{ borderRadius: "50%", width: 80, height: 80, marginBottom: 10, objectFit: "cover", border: "3px solid #2563eb22" }}
            />
            <h3 style={{ margin: "8px 0 4px", color: "#2563eb" }}>Iván Cao</h3>
            <p style={{ fontSize: 15, margin: 0 }}>Full Stack Developer & Project Leader</p>
          </div>
          <div style={{
            background: "#f9fbff",
            borderRadius: 10,
            padding: 20,
            boxShadow: "0 1px 6px #0001",
            flex: "1 1 220px",
            maxWidth: 230,
            minWidth: 180,
            textAlign: "center"
          }}>
            <img
              src="https://randomuser.me/api/portraits/men/85.jpg"
              alt="Stefano Cutri"
              style={{ borderRadius: "50%", width: 80, height: 80, marginBottom: 10, objectFit: "cover", border: "3px solid #2563eb22" }}
            />
            <h3 style={{ margin: "8px 0 4px", color: "#2563eb" }}>Stefano Cutri</h3>
            <p style={{ fontSize: 15, margin: 0 }}>Backend Developer</p>
          </div>
          <div style={{
            background: "#f9fbff",
            borderRadius: 10,
            padding: 20,
            boxShadow: "0 1px 6px #0001",
            flex: "1 1 220px",
            maxWidth: 230,
            minWidth: 180,
            textAlign: "center"
          }}>
            <img
              src="https://randomuser.me/api/portraits/women/50.jpg"
              alt="Equipo"
              style={{ borderRadius: "50%", width: 80, height: 80, marginBottom: 10, objectFit: "cover", border: "3px solid #2563eb22" }}
            />
            <h3 style={{ margin: "8px 0 4px", color: "#2563eb" }}>Colaboradores</h3>
            <p style={{ fontSize: 15, margin: 0 }}>QA & Testers</p>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ color: "#2563eb", marginBottom: 12 }}>Contacto</h2>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 32
        }}>
          <div style={{ flex: "2 1 300px", minWidth: 250 }}>
            <p style={{ fontSize: 17 }}>
              ¿Tienes dudas, sugerencias o te gustaría sumarte al equipo?<br />
              <b>¡Queremos escucharte!</b>
              <br /><br />
              Envía tu mensaje a:<br />
              <a href="mailto:contacto@turnosmedicos.com" style={{ color: "#2563eb", fontWeight: "bold" }}>
                contacto@turnosmedicos.com
              </a>
            </p>
          </div>
          <div style={{ flex: "1 1 190px", minWidth: 160, textAlign: "center" }}>
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd21?auto=format&fit=crop&w=400&q=80"
              alt="Mesa de trabajo colaborativa"
              style={{ width: "100%", maxWidth: 170, borderRadius: 12, boxShadow: "0 2px 8px #0001" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;