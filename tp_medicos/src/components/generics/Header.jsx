import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import { useAuth } from "../../auth/AuthContext";
import { useState, useRef, useEffect } from "react";

// Header principal del sitio, muestra el logo, menú y login/logout según si hay usuario logueado.
export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLoginButton, setShowLoginButton] = useState(false); // Muestra/oculta el botón de login
  const [showUserMenu, setShowUserMenu] = useState(false); // Muestra/oculta el menú del usuario
  const loginZoneRef = useRef();

  // Si hacés click fuera del menú, lo cierra (para UX en mobile/desktop)
  useEffect(() => {
    function handleClick(e) {
      if (loginZoneRef.current && !loginZoneRef.current.contains(e.target)) {
        setShowLoginButton(false);
        setShowUserMenu(false); 
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Cierra sesión y te manda al login
  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="bg-blue-50 text-blue-900 flex items-center justify-between px-8 py-4 relative transition-all duration-300">
      <div className="flex items-center gap-3">
        {/* Logo SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8 text-blue-800" fill="currentColor">
          <path d="M23 20a1 1 0 0 0-1 1 6 6 0 0 1-12 0 1 1 0 0 0-2 0 8 8 0 0 0 7 7.94V30a2 2 0 0 0 4 0v-1.06A8 8 0 0 0 24 21a1 1 0 0 0-1-1Zm-5 9a1 1 0 0 1-2 0v-1.05a8.1 8.1 0 0 0 2 0Zm1-.13V28a1 1 0 0 1-2 0v-.13a6 6 0 0 1-5-5.87V21h12v1a6 6 0 0 1-5 5.87ZM19 18h-6a1 1 0 0 1-1-1v-7.22A7 7 0 0 1 19 10v7a1 1 0 0 1-1 1Zm-7-9a5 5 0 0 0-5 5v7a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-7a5 5 0 0 0-5-5Zm12.5 2A1.5 1.5 0 1 0 21 12.5 1.5 1.5 0 0 0 24.5 11ZM24 9.5A2.5 2.5 0 1 1 21.5 12 2.5 2.5 0 0 1 24 9.5Zm0 4a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 24 13.5Zm3 7A1.5 1.5 0 1 1 25.5 19 1.5 1.5 0 0 1 27 20.5ZM27 18a2.5 2.5 0 1 0 2.5 2.5A2.5 2.5 0 0 0 27 18Z"/>
        </svg>
        {/* Título del sitio, clickeable */}
        <span className="font-bold text-2xl tracking-wide">
          <Link to="/">
            Dr. Enrique Martínez
          </Link>
        </span>
      </div>

      {/* Menú de navegación principal */}
      <nav
        ref={loginZoneRef}
        className="
          flex flex-wrap items-center justify-start gap-x-4 gap-y-2 
          text-sm sm:text-base 
          sm:justify-end
        "
      >
        <Link to="/" className="hover:text-blue-600 transition">
          Menú
        </Link>
        <Link to="/citas" className="hover:text-blue-600 transition">
          {user ? "Ver Citas" : "Reservar Citas"}
        </Link>
        <Link to="/obras-sociales" className="hover:text-blue-600 transition">
          Obras Sociales
        </Link>
        <Link to="/about-us" className="hover:text-blue-600 transition">
          Sobre nosotros
        </Link>

        {/* Si hay usuario, muestra la inicial y el menú de logout */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu((v) => !v)}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-blue-700 text-white font-bold text-base sm:text-lg hover:opacity-90 transition"
              aria-label="Menú usuario"
            >
              {/* Inicial del nombre del usuario */}
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
          // Si no hay usuario, muestra el botón de login (y la pestañita)
          <button
            onClick={() => {
              setShowLoginButton(false);
              navigate("/login");
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