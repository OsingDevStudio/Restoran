import { useState } from "react"; // 1. Tambahkan import useState
import { REPORT_SUMMARY, RECENT_SALES } from "../data/reportData";
import { MENU_DATA } from "../data/menuData";
import AdminLogin from "./AdminLogin"; // 2. Import AdminLogin

const AdminPanel = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // 3. State untuk login admin

  // 4. HADANG KALAU BELUM LOGIN
  if (!isAdminLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsAdminLoggedIn(true)} />;
  }

  // 5. TAMPILAN DASHBOARD UTAMA JIKA SUDAH BERHASIL MASUK
  return (
    <div className="bg-slate-50 min-h-screen flex font-sans text-slate-800">
      
      {/* SIDEBAR ADMIN */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 sticky top-0 h-screen">
        <h2 className="text-2xl font-black text-orange-500 mb-10 italic">Lestoran Pro</h2>
        <nav className="space-y-4 flex-grow">
          <button className="w-full text-left p-3 rounded-lg bg-slate-800 border-l-4 border-orange-500">📊 Dashboard</button>
          <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800 transition">🍔 Atur Menu</button>
          <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800 transition">📅 Laporan</button>
          <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800 transition">🪑 Kelola Meja</button>
        </nav>
        {/* Tombol keluar diganti agar bisa mengubah state menjadi false */}
        <button 
          onClick={() => setIsAdminLoggedIn(false)}
          className="text-slate-400 text-sm hover:text-white transition text-left"
        >
          Keluar Akun
        </button>
      </aside>

      {/* Sisa kode konten utama di bawah ini tetap sama seperti kemarin... */}
      <main className="flex-grow p-8 overflow-y-auto">
         {/* ... isi statistik dan tabel menu ... */}
      </main>
    </div>
  );
};

export default AdminPanel;