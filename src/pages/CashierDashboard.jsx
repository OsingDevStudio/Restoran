import { useState } from "react";
import { MAKANAN_DATA } from "../data/makananData";
import { MINUMAN_DATA } from "../data/minumanData";

const CashierDashboard = () => {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const addToCart = (item) => {
    setCart([...cart, { ...item, cartId: Date.now() }]);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      {/* 1. SIDEBAR NAVIGASI (KIRI) - Pengaturan dihapus */}
      <aside className="w-64 bg-emerald-800 text-white p-6 flex flex-col">
        <h1 className="text-xl font-bold mb-10">Areacode Kasir</h1>
        <nav className="space-y-6 flex-1">
          {["Dashboard", "Produk", "Transaksi", "Laporan"].map((menu) => (
            <button key={menu} className="flex items-center gap-3 w-full opacity-80 hover:opacity-100 font-medium">
              {menu}
            </button>
          ))}
        </nav>
      </aside>

      {/* 2. AREA MENU PRODUK (TENGAH) */}
      <main className="flex-1 p-8 overflow-y-auto">
        <input type="text" placeholder="Cari produk..." className="w-full p-3 rounded-xl border mb-6 shadow-sm" />
        
        <div className="flex gap-4 mb-8">
          {["All", "Makanan", "Minuman", "Snack"].map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className="p-4 bg-white rounded-2xl shadow-sm border w-24 text-center text-xs font-bold">
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...MAKANAN_DATA, ...MINUMAN_DATA].map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border hover:border-emerald-500 transition">
              <div className="h-32 bg-slate-100 rounded-xl mb-3"></div>
              <p className="font-bold text-sm">{item.name}</p>
              <p className="text-emerald-700 font-bold text-sm mb-4">Rp {item.price.toLocaleString()}</p>
              <button onClick={() => addToCart(item)} className="w-full bg-emerald-100 text-emerald-700 font-bold py-2 rounded-lg text-sm hover:bg-emerald-200">
                + Tambah
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* 3. KERANJANG & CHECKOUT (KANAN) */}
      <aside className="w-80 bg-white border-l p-6 flex flex-col shadow-lg">
        <h2 className="font-bold text-lg mb-6">Order Details</h2>
        
        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm">
              <span>{item.name}</span>
              <span className="font-bold">Rp {item.price.toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-6 space-y-4">
          <input type="text" placeholder="Nomor Meja" className="w-full p-2 border rounded-lg text-sm" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>Rp {subtotal.toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-slate-200 py-3 rounded-xl font-bold">Print</button>
            <button className="bg-emerald-600 text-white py-3 rounded-xl font-bold">Place Order</button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CashierDashboard;