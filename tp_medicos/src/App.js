import './App.css';
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import CitaMedica from './pages/CitaMedica.jsx'
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Header/>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reservar-citas" element={<CitaMedica />} />
            {/* Puedes agregar más rutas aquí */}
          </Routes>
        </main>  

      <Footer/>
    </BrowserRouter>
  );
}

export default App;
