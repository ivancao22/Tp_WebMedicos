import React from "react";
import { useAuth } from "../auth/AuthContext";
import SolicitarCita from "../components/citas/SolicitarCita";
import GestionCitas from "../components/citas/GestionCitas";

// Si hay usuario logueado (medico/secretaria), muestra gestión administrativa
// Si NO hay usuario logueado, muestra formulario para paciente
export default function CitasPage() {
  const { user } = useAuth();

  return (
    <div className="bg-blue-50 min-h-screen"> 
      {user ? <GestionCitas /> : <SolicitarCita />}
    </div>
  );
}