import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"; // Iconos hamburguesa y cerrar
import { useAuth } from "../../auth/AuthContext";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNavMobile, setShowNavMobile] = useState(false); // NUEVO estado hamburguesa
  const loginZoneRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (loginZoneRef.current && !loginZoneRef.current.contains(e.target)) {
        setShowLoginButton(false);
        setShowUserMenu(false);
        setShowNavMobile(false); // Cierra hamburguesa si haces click afuera
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="bg-blue-50 text-blue-900 flex items-center justify-between px-8 py-4 relative transition-all duration-300">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8 text-blue-800" fill="currentColor">
          <path d="M23 20a1 1 0 0 0-1 1 6 6 0 0 1-12 0 1 1 0 0 0-2 0 8 8 0 0 0 7 7.94V30a2 2 0 0 0 4 0v-1.06A8 8 0 0 0 24 21a1 1 0 0 0-1-1Zm-5 9a1 1 0 0 1-2 0v-1.05a8.1 8.1 0 0 0 2 0Zm1-.13V28a1 1 0 0 1-2 0v-.13a6 6 0 0 1-5-5.87V21h12v1a6 6 0 0 1-5 5.87ZM19 18h-6a1 1 0 0 1-1-1v-7.22A7 7 0 0 1 19 10v7a1 1 0 0 1-1 1Zm-7-9a5 5 0 0 0-5 5v7a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-7a5 5 0 0 0-5-5Zm12.5 2A1.5 1.5 0 1 0 21 12.5 1.5 1.5 0 0 0 24.5 11ZM24 9.5A2.5 2.5 0 1 1 21.5 12 2.5 2.5 0 0 1 24 9.5Zm0 4a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 24 13.5Zm3 7A1.5 1.5 0 1 1 25.5 19 1.5 1.5 0 0 1 27 20.5ZM27 18a2.5 2.5 0 1 0 2.5 2.5A2.5 2.5 0 0 0 27 18Z"/>
        </svg>
        <span className="font-bold text-2xl tracking-wide">
          <Link to="/">Dr. Enrique Martínez</Link>
        </span>
      </div>

      {/* Botón hamburguesa solo en mobile*/}
      <button
        className="sm:hidden ml-2"
        onClick={() => setShowNavMobile((v) => !v)}
        aria-label="Abrir menú"
      >
        {showNavMobile ? (
          <HiOutlineX className="w-8 h-8" />
        ) : (
          <HiOutlineMenu className="w-8 h-8" />
        )}
      </button>

      {/* Menú de navegación principal */}
      <nav
        ref={loginZoneRef}
        className={`
          flex-col sm:flex-row
          flex
          items-start sm:items-center
          gap-4
          text-sm sm:text-base
          absolute sm:static top-full sm:top-auto left-0 sm:left-auto w-full sm:w-auto bg-blue-50 sm:bg-transparent
          z-40
          shadow-lg sm:shadow-none
          transition-all duration-300
          ${showNavMobile ? "flex" : "hidden sm:flex"}
        `}
      >
        <Link to="/" className="hover:text-blue-600 transition" onClick={() => setShowNavMobile(false)}>
          Menú
        </Link>
        <Link to="/citas" className="hover:text-blue-600 transition" onClick={() => setShowNavMobile(false)}>
          {user ? "Ver Citas" : "Reservar Citas"}
        </Link>
        <Link to="/obras-sociales" className="hover:text-blue-600 transition" onClick={() => setShowNavMobile(false)}>
          Obras Sociales
        </Link>
        <Link to="/about-us" className="hover:text-blue-600 transition" onClick={() => setShowNavMobile(false)}>
          Sobre nosotros
        </Link>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu((v) => !v)}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-blue-700 text-white font-bold text-base sm:text-lg hover:opacity-90 transition"
              aria-label="Menú usuario"
            >
              {user && user.nombre ? user.nombre[0].toUpperCase() : ""}
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <p className="px-4 py-2 text-sm text-gray-700 border-b truncate">
                  {user.nombre}
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => {
              setShowLoginButton(false);
              navigate("/login");
              setShowNavMobile(false);
            }}
            className={`flex items-center gap-2 px-3 py-1 rounded-full border border-blue-700 bg-white text-blue-700 hover:bg-blue-100 shadow-sm font-bold transition-all duration-300 ${
              showLoginButton ? "inline-flex" : "hidden"
            }`}
          >
            <HiOutlineUser className="w-5 h-5 shrink-0" />
            <span className="hidden sm:inline">Login</span>
          </button>
        )}
      </nav>

      {/* Pestañita para mostrar login (solo si no hay usuario) */}
      {!user && !showLoginButton && (
        <div
          style={{
            width: 6,
            height: 28,
            background: "#2563eb",
            borderRadius: "3px 0 0 3px",
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            zIndex: 20,
            transition: "opacity .2s",
            opacity: 0.5,
          }}
          title="Mostrar login"
          onClick={() => setShowLoginButton(true)}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.5)}
        />
      )}
    </header>
  );
}