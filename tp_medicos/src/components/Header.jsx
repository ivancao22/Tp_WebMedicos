import { Link } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";

export default function Header() {
  return (
    <header className="bg-blue-50 text-blue-900 flex items-center justify-between px-8 py-4 shadow">
      <div className="flex items-center gap-3">
        {/* Logo SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8 text-blue-800" fill="currentColor">
          <path d="M23 20a1 1 0 0 0-1 1 6 6 0 0 1-12 0 1 1 0 0 0-2 0 8 8 0 0 0 7 7.94V30a2 2 0 0 0 4 0v-1.06A8 8 0 0 0 24 21a1 1 0 0 0-1-1Zm-5 9a1 1 0 0 1-2 0v-1.05a8.1 8.1 0 0 0 2 0Zm1-.13V28a1 1 0 0 1-2 0v-.13a6 6 0 0 1-5-5.87V21h12v1a6 6 0 0 1-5 5.87ZM19 18h-6a1 1 0 0 1-1-1v-7.22A7 7 0 0 1 19 10v7a1 1 0 0 1-1 1Zm-7-9a5 5 0 0 0-5 5v7a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-7a5 5 0 0 0-5-5Zm12.5 2A1.5 1.5 0 1 0 21 12.5 1.5 1.5 0 0 0 24.5 11ZM24 9.5A2.5 2.5 0 1 1 21.5 12 2.5 2.5 0 0 1 24 9.5Zm0 4a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 24 13.5Zm3 7A1.5 1.5 0 1 1 25.5 19 1.5 1.5 0 0 1 27 20.5ZM27 18a2.5 2.5 0 1 0 2.5 2.5A2.5 2.5 0 0 0 27 18Z"/>
        </svg>
        <span className="font-bold text-2xl tracking-wide">Dr. Enrique Martínez</span>
      </div>
      <nav className="flex items-center gap-6 text-md">
        <Link to="/menu" className="hover:text-blue-600 transition">Menú</Link>
        <Link to="/reservar-citas" className="hover:text-blue-600 transition">Reservar Citas</Link>
        <Link to="/obras-sociales" className="hover:text-blue-600 transition">Obras Sociales</Link>
        <Link to="/about" className="hover:text-blue-600 transition">Sobre mí</Link>
        <Link 
          to="/login" 
          className="flex items-center gap-2 px-3 py-1 rounded-full border border-blue-700 bg-white text-blue-700 hover:bg-blue-100 transition shadow-sm"
        >
          <HiOutlineUser className="w-5 h-5" />
          <span className="hidden sm:inline">Login</span>
        </Link>
      </nav>
    </header>
  );
}