import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Impor FontAwesome Core dan Ikon Keamanan Staff
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";

const CashierLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const akunAhmad = (username === "ahmad" && password === "kasir123");
    const akunBudi  = (username === "budi" && password === "gacoan456");
    const akunSiti  = (username === "siti" && password === "sitioke123");

    if (akunAhmad || akunBudi || akunSiti) {
      onLoginSuccess();
      navigate("/kasir/dashboard");
    } else {
      setError("Username atau Password salah!");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center font-sans px-4 bg-cover bg-[center_bottom] bg-no-repeat relative"
      style={{ backgroundImage: "url('/images/cafe.webp')" }}
    >
      {/* Tingkat kegelapan diatur tipis (bg-slate-950/30) agar gambar tetap hidup namun form putih di tengah tetap terbaca */}
      <div className="absolute inset-0 bg-slate-950/30 z-0"></div>

      {/* Kotak Card Login */}
      <div className="bg-white/95 p-8 rounded-2xl shadow-2xl max-w-sm w-full border border-white/20 z-10 backdrop-blur-md">
        <div className="text-center mb-8">
          
          {/* PERBAIKAN ICON: Mengganti emoji lama dengan badge lingkaran gradasi + FontAwesome Icon modern */}
          <div className="w-14 h-14 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/20">
            <FontAwesomeIcon icon={faUserLock} className="text-white text-xl" />
          </div>

          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Login Staff Kasir</h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">Silakan masuk menggunakan akun resmi kasir</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-center text-xs font-bold border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Username</label>
            <input 
              type="text" 
              placeholder="Masukkan username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium text-slate-700 bg-slate-50/50" 
              required 
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium text-slate-700 bg-slate-50/50" 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98] mt-2"
          >
            Masuk ke Dashboard
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-[10px] text-slate-400 font-medium">Point of Sale System &copy; 2026</p>
        </div>
      </div>
    </div>
  );
};

export default CashierLogin;