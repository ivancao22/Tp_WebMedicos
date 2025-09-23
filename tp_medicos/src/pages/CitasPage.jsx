import React from "react";
import { useAuth } from "../auth/AuthContext";
import SolicitarCita from "../components/SolicitarCita";
import GestionCitas from "../components/GestionCitas";

export default function CitasPage() {
  const { user } = useAuth();

  // Si hay usuario logueado (staff), mostrar gestión administrativa
  if (user) {
    return <GestionCitas />;
  }

  // Si NO hay usuario logueado, mostrar formulario para paciente
  return <SolicitarCita />;
}