import { useAuth } from "../auth/AuthContext";
import ObraSocialAdmin from "../components/ObraSocialAdmin";
import ObraSocialPublic from "../components/ObraSocialPublic";

export default function ObrasSocialesPage() {
  const { user } = useAuth();
  // Si hay usuario logueado, muestra admin, si no, vista pública
  return user ? <ObraSocialAdmin /> : <ObraSocialPublic />;
}