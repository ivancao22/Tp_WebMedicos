import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUser, HiUserCircle } from "react-icons/hi";
import { useAuth } from "../auth/AuthContext";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false); // 👈 nuevo estado
  const loginZoneRef = useRef();

  // Ocultar login si haces click fuera de la zona
  useEffect(() => {
    function handleClick(e) {
      if (loginZoneRef.current && !loginZoneRef.current.contains(e.target)) {
        setShowLoginButton(false);
        setShowUserMenu(false); // 👈 también cerrar el menú del usuario
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="bg-blue-50 text-blue-900 flex items-center justify-between px-8 py-4 relative transition-all duration-300">
      <div className="flex items-center gap-3">
        {/* Logo SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-8 h-8 text-blue-800"
          fill="currentColor"
        >
          {/* ...icon... */}
        </svg>
        <span className="font-bold text-2xl tracking-wide">
          Dr. Enrique Martínez
        </span>
      </div>

      {/* NAV PRINCIPAL */}
      <nav className="flex items-center gap-6 text-md" ref={loginZoneRef}>
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
          About us
        </Link>

        {/* Usuario logueado */}
        {user ? (
          <div className="relative">
            {/* Avatar redondito */}
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white font-bold text-lg hover:opacity-90 transition"
              aria-label="Menú usuario"
            >
              {user.username[0].toUpperCase()}
            </button>

            {/* Popup menú */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <p className="px-4 py-2 text-sm text-gray-700 border-b">
                  {user.username}
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
          /* Botón Login */
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

      {/* Pestañita discreta */}
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
        ></div>
      )}
    </header>
  );
}
