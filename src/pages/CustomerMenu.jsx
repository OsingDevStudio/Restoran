import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MAKANAN_DATA } from "../data/makananData";
import { MINUMAN_DATA } from "../data/minumanData";
import { CEMILAN_DATA } from "../data/cemilanData";
import MenuCard from "../components/MenuCard";

const CustomerMenu = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const { noMeja } = useParams(); 
  const [activeCategory, setActiveCategory] = useState("Makanan");
  const categories = ["Makanan", "Minuman", "Cemilan"];

  const addToCart = (itemWithQty) => {
    let updatedCart = [];
    
    // Cari item di keranjang berdasarkan ID DAN NAMA agar tidak tabrakan antar kategori
    const itemDiKeranjang = cart.find(
      (cartItem) => cartItem.id === itemWithQty.id && cartItem.name === itemWithQty.name
    );

    // Jika kuantitas di-set ke 0 oleh user, hapus spesifik item tersebut
    if (itemWithQty.quantity === 0) {
      updatedCart = cart.filter(
        (cartItem) => !(cartItem.id === itemWithQty.id && cartItem.name === itemWithQty.name)
      );
    } else if (itemDiKeranjang) {
      // Jika sudah ada di keranjang, update jumlahnya
      updatedCart = cart.map((cartItem) =>
        cartItem.id === itemWithQty.id && cartItem.name === itemWithQty.name
          ? { ...cartItem, quantity: itemWithQty.quantity, tableNumber: noMeja || "Tanpa Meja" }
          : cartItem
      );
    } else {
      // Jika menu baru, masukkan ke dalam array keranjang
      updatedCart = [...cart, { ...itemWithQty, tableNumber: noMeja || "Tanpa Meja" }];
    }

    setCart(updatedCart);
    localStorage.setItem("keranjang_pelanggan", JSON.stringify(updatedCart));
  };

  const totalItemCounter = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPriceCounter = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  let currentMenuData = [];
  if (activeCategory === "Makanan") currentMenuData = MAKANAN_DATA;
  if (activeCategory === "Minuman") currentMenuData = MINUMAN_DATA;
  if (activeCategory === "Cemilan") currentMenuData = CEMILAN_DATA;

  return (
    <div 
      className="min-h-screen pb-32 font-sans text-slate-800 w-full relative bg-slate-50"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(226, 232, 240, 0.5) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(226, 232, 240, 0.5) 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px"
      }}
    >
      
      {/* HEADER BAR (Nama diganti menjadi CAFE CANTIKA) */}
      <header className="bg-white p-4 sticky top-0 z-20 flex flex-col justify-center items-center border-b border-gray-100 shadow-sm h-[65px]">
        <h1 className="text-2xl font-black text-orange-600 italic tracking-wider uppercase">
          CAFE CANTIKA
        </h1>
        {noMeja && (
          <span className="text-[10px] font-black uppercase bg-orange-100 text-orange-700 px-3 py-0.5 rounded-full tracking-wide shadow-inner absolute right-4">
            📍 Meja: {noMeja}
          </span>
        )}
      </header>

      {/* STICKY TAB KATEGORI */}
      <div className="bg-white/95 backdrop-blur-md sticky top-[65px] z-10 px-4 py-3 shadow-sm border-b border-gray-100 flex gap-2 overflow-x-auto scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold tracking-wide transition-all ${
              activeCategory === cat
                ? "bg-orange-500 text-white shadow-md shadow-orange-200 scale-105"
                : "bg-slate-50 text-slate-400 border border-slate-200/60 hover:bg-slate-100"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* DAFTAR MENU GRID */}
      <main className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {currentMenuData && currentMenuData.length > 0 ? (
          currentMenuData.map((item) => (
            <MenuCard 
              key={`${activeCategory}-${item.id}-${item.name}`} 
              item={item} 
              onAdd={addToCart} 
              cart={cart} 
            />
          ))
        ) : (
          <div className="col-span-2 md:col-span-4 text-center py-16 text-xs font-semibold text-slate-300 italic">
            Belum ada menu di kategori ini.
          </div>
        )}
      </main>
      
      {/* TOMBOL MELAYANG */}
      {totalItemCounter > 0 && (
        <div className="fixed bottom-6 left-0 right-0 px-4 z-30 max-w-md mx-auto">
           <button 
            onClick={() => navigate("/keranjang")}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-2xl font-bold shadow-[0_10px_30px_rgba(16,185,129,0.3)] flex justify-between items-center px-6 active:scale-95 transition-all duration-200 border border-emerald-500/20"
           >
             <div className="flex flex-col items-start text-left">
               <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest leading-none mb-0.5">Total Bayar</span>
               <span className="text-base font-black tracking-wide">
                 Rp {totalPriceCounter.toLocaleString()}
               </span>
             </div>
             <div className="flex items-center gap-2.5">
               <span className="text-xs font-black tracking-wider uppercase">Lihat Keranjang</span>
               <span className="bg-white text-emerald-600 text-xs font-black px-2.5 py-1 rounded-lg min-w-[24px] text-center shadow-md">
                 {totalItemCounter}
               </span>
             </div>
           </button>
        </div>
      )}
    </div>
  );
};

export default CustomerMenu;