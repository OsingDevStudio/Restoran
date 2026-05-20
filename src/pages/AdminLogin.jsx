import { useState } from "react";

const AdminLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // DAFTAR AKUN ADMIN / OWNER (MOCK DATA)
    const akunOwner = (username === "owner" && password === "bosgacoan123");
    const akunManager = (username === "manager" && password === "sukses2026");

    if (akunOwner || akunManager) {
      onLoginSuccess(); // Pintu masuk terbuka
    } else {
      setError("Akses Ditolak! Anda bukan Admin/Owner.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center font-sans px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-slate-100">
        
        {/* LOGO & JUDUL (Nuansa Premium/Gelap untuk Admin) */}
        <div className="text-center mb-8">
          <span className="text-4xl">📊</span>
          <h2 className="text-2xl font-bold text-slate-800 mt-3">Admin Panel Login</h2>
          <p className="text-slate-400 text-sm mt-1">Gunakan akun Owner/Manager untuk melihat laporan keuangan</p>
        </div>

        {/* NOTIFIKASI ERROR */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-semibold mb-4 text-center border border-red-100 animate-pulse">
            ⚠️ {error}
          </div>
        )}

        {/* FORM LOGIN */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Username Admin</label>
            <input 
              type="text" 
              placeholder="Masukkan username admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-slate-900 transition text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-slate-900 transition text-sm"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition shadow-md mt-2"
          >
            Masuk ke Panel Kontrol
          </button>
        </form>

        {/* PETUNJUK DEMO */}
        <div className="mt-6 bg-slate-50 p-3 rounded-xl border border-dashed text-left">
          <p className="text-[11px] text-slate-500 font-bold mb-1 text-center">💡 AKUN ADMIN (UNTUK DEMO):</p>
          <ul className="text-[11px] text-slate-500 space-y-0.5 list-disc list-inside">
            <li>User: <span className="font-semibold text-slate-700">owner</span> | Pass: <span className="font-semibold text-slate-700">bosgacoan123</span></li>
            <li>User: <span className="font-semibold text-slate-700">manager</span> | Pass: <span className="font-semibold text-slate-700">sukses2026</span></li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;