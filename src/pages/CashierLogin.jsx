import { useState } from "react";

const CashierLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ----------------------------------------------------------------
    // TEMPAT MENGGANTI DAN MENAMBAHKAN AKUN KASIR (MOCK DATA)
    // Kamu bisa ubah teks di dalam tanda kutip sesuai keinginanmu
    // ----------------------------------------------------------------
    const akunAhmad = (username === "ahmad" && password === "kasir123");
    const akunBudi  = (username === "budi" && password === "gacoan456");
    const akunSiti  = (username === "siti" && password === "sitioke123");
    // Contoh kalau mau nambah akun ke-4:
    // const akunBaru = (username === "user_kamu" && password === "pass_kamu");

    // VALIDASI LOGIKANYA
    // Jika salah satu akun di bawah ini benar, pintu dashboard terbuka
    if (akunAhmad || akunBudi || akunSiti) {
      onLoginSuccess(); // Sukses masuk
    } else {
      setError("Username atau Password salah! Hubungi Admin."); // Gagal masuk
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
        
        {/* LOGO & JUDUL */}
        <div className="text-center mb-8">
          <span className="text-4xl">🖥️</span>
          <h2 className="text-2xl font-bold text-gray-800 mt-3">Login Staff Kasir</h2>
          <p className="text-gray-400 text-sm mt-1">Silakan masuk untuk mengelola pesanan toko</p>
        </div>

        {/* NOTIFIKASI ERROR (MUNCUL KALAU SALAH KETIK) */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-semibold mb-4 text-center border border-red-100 animate-pulse">
            ⚠️ {error}
          </div>
        )}

        {/* FORM LOGIN */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
            <input 
              type="text" 
              placeholder="Masukkan username kasir"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 transition text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 transition text-sm"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow-md shadow-orange-100 mt-2"
          >
            Masuk ke Sistem
          </button>
        </form>

        {/* BUKU PETUNJUK AKUN (Bisa kamu hapus/ganti teksnya agar sesuai dengan akun di atas) */}
        <div className="mt-6 bg-slate-50 p-3 rounded-xl border border-dashed text-left">
          <p className="text-[11px] text-slate-500 font-bold mb-1 text-center">💡 DAFTAR AKUN STAFF (UNTUK DEMO):</p>
          <ul className="text-[11px] text-slate-500 space-y-0.5 list-disc list-inside">
            <li>User: <span className="font-semibold text-slate-700">ahmad</span> | Pass: <span className="font-semibold text-slate-700">kasir123</span></li>
            <li>User: <span className="font-semibold text-slate-700">budi</span> | Pass: <span className="font-semibold text-slate-700">gacoan456</span></li>
            <li>User: <span className="font-semibold text-slate-700">siti</span> | Pass: <span className="font-semibold text-slate-700">sitioke123</span></li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default CashierLogin;