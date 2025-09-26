import acidoHialuronicoImg from "../assets/landing/AcidoHialuronico.jpg";
import botoxImg from "../assets/landing/Botox.jpg";
import depilacionImg from "../assets/landing/Depilacion.jpg";
import mesoterapiaImg from "../assets/landing/Mesoterapia.jpg";
import peelingImg from "../assets/landing/Peeling.jpg";
import plasmaImg from "../assets/landing/Plasma.jpg";

const servicios = [
  {
    nombre: "Aplicación de Botox",
    descripcion: "Rejuvenecimiento facial y prevención de arrugas.",
    imagen: botoxImg,
  },
  {
    nombre: "Relleno con Ácido Hialurónico",
    descripcion: "Volumen y perfilado de labios, surcos y arrugas.",
    imagen: acidoHialuronicoImg,
  },
  {
    nombre: "Peeling Químico",
    descripcion: "Renovación de la piel, luminosidad y textura.",
    imagen: peelingImg,
  },
  {
    nombre: "Mesoterapia",
    descripcion: "Tratamientos corporales y faciales con microinyecciones.",
    imagen: mesoterapiaImg,
  },
  {
    nombre: "Plasma Rico en Plaquetas",
    descripcion: "Regeneración y rejuvenecimiento natural de la piel.",
    imagen: plasmaImg,
  },
  {
    nombre: "Depilación definitiva",
    descripcion: "Tecnología avanzada para eliminación permanente del vello.",
    imagen: depilacionImg,
  }
];

export default servicios;