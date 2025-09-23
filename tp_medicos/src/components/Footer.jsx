import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="bg-blue-50 text-slate-800 px-8 pt-10 pb-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 border-b border-slate-200 pb-8">
        {/* Logo + Nombre */}
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8 text-blue-800" fill="currentColor">
            <path d="M23 20a1 1 0 0 0-1 1 6 6 0 0 1-12 0 1 1 0 0 0-2 0 8 8 0 0 0 7 7.94V30a2 2 0 0 0 4 0v-1.06A8 8 0 0 0 24 21a1 1 0 0 0-1-1Zm-5 9a1 1 0 0 1-2 0v-1.05a8.1 8.1 0 0 0 2 0Zm1-.13V28a1 1 0 0 1-2 0v-.13a6 6 0 0 1-5-5.87V21h12v1a6 6 0 0 1-5 5.87ZM19 18h-6a1 1 0 0 1-1-1v-7.22A7 7 0 0 1 19 10v7a1 1 0 0 1-1 1Zm-7-9a5 5 0 0 0-5 5v7a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-7a5 5 0 0 0-5-5Zm12.5 2A1.5 1.5 0 1 0 21 12.5 1.5 1.5 0 0 0 24.5 11ZM24 9.5A2.5 2.5 0 1 1 21.5 12 2.5 2.5 0 0 1 24 9.5Zm0 4a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 24 13.5Zm3 7A1.5 1.5 0 1 1 25.5 19 1.5 1.5 0 0 1 27 20.5ZM27 18a2.5 2.5 0 1 0 2.5 2.5A2.5 2.5 0 0 0 27 18Z"/>
          </svg>
          <span className="font-bold text-xl tracking-wide text-blue-900">Dr. Enrique Martínez</span>
        </div>

        {/* Contacto */}
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <HiOutlinePhone className="w-5 h-5 text-blue-700" />
            <span>(+54) 11 5555-5555</span>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineMail className="w-5 h-5 text-blue-700" />
            <span>contacto@drmartinez.com</span>
          </div>
          {/* Redes */}
          <div className="flex gap-4 mt-2">
            <a href="https://wa.me/541155555555" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="w-8 h-8 text-green-500 hover:text-green-600 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="w-8 h-8 text-pink-500 hover:text-pink-600 transition" />
            </a>
          </div>
        </div>

        {/* Legales */}
        <div className="flex flex-col gap-2 text-sm mt-4 md:mt-0">
          <Link to="/terminos" className="hover:text-blue-700">Términos y Condiciones</Link>
          <Link to="/privacidad" className="hover:text-blue-700">Política de Privacidad</Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto text-center text-xs text-slate-500 pt-6">
        © {new Date().getFullYear()} Dr. Enrique Martínez. Todos los derechos reservados.
      </div>
    </footer>
  );
}