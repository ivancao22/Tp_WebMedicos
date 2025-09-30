import { useAuth } from "../auth/AuthContext";
import ObraSocialAdmin from "../components/obraSocial/ObraSocialAdmin";
import ObraSocialPublic from "../components/obraSocial/ObraSocialPublic";

export default function ObrasSocialesPage() {
  const { user } = useAuth();
  return (
    // Si hay usuario logueado, muestra admin, si no, vista pública
    <div style={{ background: "#eff6ff", minHeight: "100vh", padding: "40px 0" }}>
      {user ? <ObraSocialAdmin /> : <ObraSocialPublic />}
    </div>
  );
}