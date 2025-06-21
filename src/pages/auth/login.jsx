import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.access_token);
        navigate("/admin/schools", { replace: true });
      } else {
        setError(data.error || "Login gagal. Periksa kembali email dan password Anda.");
      }
    } catch {
      setError("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
    }
    setLoading(false);
  };

  return (
    <div 
      className="relative flex items-center justify-center min-h-screen px-4 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #fdf2f8 50%, #e0e7ff 100%)' }}
    >
      <button
        onClick={() => navigate('/')}
        aria-label="Kembali ke halaman utama"
        className="absolute z-20 flex items-center justify-center w-12 h-12 transition-all duration-300 transform rounded-full shadow-lg bg-white/50 top-8 left-8 backdrop-blur-md hover:bg-white/75 hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      <div className="absolute w-32 h-32 bg-pink-200 rounded-full opacity-50 -bottom-10 -right-5 animate-bounce"></div>
      <div className="absolute w-24 h-24 bg-indigo-200 rounded-full top-20 -left-5 opacity-40 animate-pulse"></div>

      <div className="relative w-full max-w-md p-8 space-y-4 transition-all duration-300 shadow-xl bg-white/70 backdrop-blur-xl rounded-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Selamat Datang Kembali</h2>
          <p className="mt-2 text-gray-600">
            Login sebagai Admin.
          </p>
        </div>

        {error && <div className="px-4 py-3 text-center text-red-800 bg-red-200 border border-red-300 rounded-lg">{error}</div>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="Alamat Email" 
            value={form.email} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-3 border border-purple-200 rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-purple-200 rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-3 mt-2 font-semibold text-white transition-all duration-300 transform rounded-full shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-70 disabled:scale-100" 
            style={{ background: 'linear-gradient(to right, #7c3aed, #4f46e5)' }}
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>

        {/* --- TAMBAHAN: Divider dan Tombol Login Guru --- */}
        <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-purple-200"></div>
            <span className="flex-shrink px-4 text-xs text-gray-500 uppercase">Atau</span>
            <div className="flex-grow border-t border-purple-200"></div>
        </div>

        <Link
          to="https://simanggis.pro/login" // <-- GANTI DENGAN URL WEBSITE LOGIN GURU
          className="block w-full py-3 font-semibold text-center text-purple-600 transition-all duration-300 transform border-2 border-purple-500 rounded-full hover:bg-purple-500 hover:text-white hover:scale-105"
        >
          Login sebagai Guru
        </Link>
        
        <p className="pt-2 text-center text-gray-600">
          Belum punya akun Admin?{" "}
          <button onClick={() => navigate("/register")} className="font-semibold text-purple-600 transition hover:text-purple-800 hover:underline focus:outline-none">
            Daftar di sini
          </button>
        </p>
      </div>
    </div>
  );
}