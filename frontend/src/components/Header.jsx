import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Load user from sessionStorage
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  

  // ✅ Logout
  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);0
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <h1
          className="text-lg font-semibold tracking-wide text-white cursor-pointer"
          onClick={() => navigate("/")}
        >
          🛍️ AI Shopping Assistant
        </h1>

        {/* NAV */}
        <nav className="hidden md:flex gap-8 text-sm text-slate-400 items-center">
          <button onClick={() => navigate("/assistant")} className="hover:text-blue-400">
            AI Assistant
          </button>

          <button onClick={() => navigate("/usecase")} className="hover:text-blue-400">
            Use Cases
          </button>

          <button onClick={() => navigate("/resources")} className="hover:text-blue-400">
            Resources
          </button>

          <button onClick={() => navigate("/checkout")} className="hover:text-blue-400">
            Checkout
          </button>

          {/* AUTH BUTTON */}
          {!user?.isLoggedIn ? (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-1 rounded-lg hover:text-blue-400 transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="px-4 py-1 rounded-lg hover:text-blue-400 transition"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}