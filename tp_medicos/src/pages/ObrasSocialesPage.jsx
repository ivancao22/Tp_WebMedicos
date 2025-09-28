import { useAuth } from "../auth/AuthContext";
import ObraSocialAdmin from "../components/obraSocial/ObraSocialAdmin";
import ObraSocialPublic from "../components/obraSocial/ObraSocialPublic";

export default function ObrasSocialesPage() {
  const { user } = useAuth();
  // Si hay usuario logueado, muestra admin, si no, vista pública
  return user ? <ObraSocialAdmin /> : <ObraSocialPublic />;
}