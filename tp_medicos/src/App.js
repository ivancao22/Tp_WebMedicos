import './App.css';
import Header from './components/generics/Header.jsx';
import Footer from './components/generics/Footer.jsx';
import Landing from './pages/LandingPage.jsx';
import Login from './pages/LoginPage.jsx';
import CitasPage from './pages/CitasPage.jsx';
import ObrasSociales from './pages/ObrasSocialesPage.jsx';
import AboutUs from './pages/AboutUsPage.jsx';
import TerminosCondiciones from './pages/TerminosCondicionesPage.jsx';
import PoliticasPrivacidad from './pages/PoliticasPrivacidadPage.jsx';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from './auth/AuthContext.jsx';

// Este componente maneja las rutas y la lógica de mostrar/ocultar el footer.
function AppContent() {
  const location = useLocation();

  // Rutas donde NO se muestra el footer
  const hideFooterRoutes = [
    '/login',
    '/reservar-citas',
    '/obras-sociales',
    '/about-us',
    '/citas',
    '/terminos-condiciones',
    '/politicas-privacidad'
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Acá defino todas las páginas de la app */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/citas" element={<CitasPage />} />
          <Route path="/obras-sociales" element={<ObrasSociales />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
          <Route path="/politicas-privacidad" element={<PoliticasPrivacidad />} />
        </Routes>
      </main>
      {/* El footer aparece solo en las rutas que no están en hideFooterRoutes */}
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

// Componente principal: envuelve todo para que el Auth y el Router funcionen en toda la app.
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;