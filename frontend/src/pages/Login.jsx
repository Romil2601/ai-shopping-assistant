// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import Header from "../components/Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔐 Normal demo login
  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "123456") {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          email,
          role: "admin",
          isLoggedIn: true,
        }),
      );

      navigate("/assistant");
    } else {
      alert("Invalid credentials");
    }
  };

  // 🔐 Google login (Firebase)
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      sessionStorage.setItem(
        "user",
        JSON.stringify({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          isLoggedIn: true,
        }),
      );

      navigate("/assistant");
    } catch (error) {
      console.error(error);
      alert("Google login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Header />

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-8">
          {/* LEFT SIDE */}
          <div className="hidden md:flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4 text-blue-400">
              Welcome Back 👋
            </h1>

            <p className="text-slate-400 mb-6">
              Login to access your AI Shopping Assistant and get smart,
              personalized product recommendations.
            </p>

            <ul className="space-y-3 text-sm text-slate-300">
              <li>🤖 AI-powered shopping assistant</li>
              <li>⚡ Faster buying decisions</li>
              <li>🧠 Transparent AI explanations</li>
            </ul>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-center">
            <form
              onSubmit={handleLogin}
              className="w-full max-w-sm bg-slate-900/70 p-6 rounded-xl border border-white/10"
            >
              <h2 className="text-xl text-center font-semibold mb-6">Login</h2>

              <input
                type="email"
                placeholder="Email"
                className="w-full mb-4 p-2 rounded bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full mb-6 p-2 rounded bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition">
                Login
              </button>

              <p className="text-xs text-slate-400 mt-3 text-center">
                Demo: admin@gmail.com / 123456
              </p>

              <div className="my-4 border-t border-white/10" />

              {/* GOOGLE LOGIN */}
              <button
                type="button"
                onClick={googleLogin}
                className="w-full flex items-center justify-center gap-3 border border-white/20 py-2 rounded-lg hover:bg-white/10 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
