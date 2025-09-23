import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Landing from './pages/LandingPage.jsx';
import Login from './pages/LoginPage.jsx';
import CitasPage from './pages/CitasPage.jsx';
import ObrasSociales from './pages/ObrasSocialesPage.jsx';
import AboutUs from './pages/AboutUsPage.jsx';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from './auth/AuthContext.jsx';

function AppContent() {
  const location = useLocation();
  const hideFooterRoutes = [
    '/login',
    '/reservar-citas',
    '/obras-sociales',
    '/about-us',
    '/citas'
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/citas" element={<CitasPage />} />
          <Route path="/obras-sociales" element={<ObrasSociales />} />
          <Route path="/about-us" element={<AboutUs />} />

        </Routes>
      </main>
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

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