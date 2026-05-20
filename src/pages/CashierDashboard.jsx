import { useState } from "react";
import { ORDER_DATA } from "../data/orderData";
import CashierLogin from "./CashierLogin"; // 1. Import halaman login

const CashierDashboard = () => {
  const [orders, setOrders] = useState(ORDER_DATA);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 2. State untuk status login

  // Fungsi mengubah status pesanan
  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  // 3. JIKA BELUM LOGIN, HADANG DENGAN HALAMAN LOGIN
  if (!isLoggedIn) {
    return <CashierLogin onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  // 4. JIKA SUDAH LOGIN, TAMPILKAN DASHBOARD SEPERTI BIASA
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col font-sans">
      {/* ... sisa kode dashboard kasir kamu yang kemarin di bawah ini tetap sama ... */}
      <header className="bg-white border-b p-4 flex justify-between items-center px-8 shadow-sm">
         <div className="flex items-center gap-3">
           <span className="text-2xl">🖥️</span>
           <h1 className="text-xl font-bold text-gray-800">DASHBOARD KASIR</h1>
         </div>
         <div className="flex items-center gap-4">
           {/* Tombol Logout Tambahan */}
           <button 
             onClick={() => setIsLoggedIn(false)} 
             className="text-xs text-red-500 hover:underline font-semibold"
           >
             Keluar
           </button>
           <span className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full text-sm">● Kasir Aktif</span>
         </div>
      </header>

      {/* Main content tetap sama seperti kemarin */}
      <main className="p-6 flex-grow grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* ... isi kolom-kolom pesanan ... */}
         {/* ... (pastikan seluruh kode sisa kemarin tidak terhapus) ... */}
      </main>
    </div>
  );
};

export default CashierDashboard;