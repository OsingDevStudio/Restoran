import { useState } from "react";

const ProdukCard = ({ item, onAddToCart }) => {
  const handleAddClick = () => {
    // Sesuai gambar referensi asli, langsung menambahkan 1 item ke keranjang belanja ketika di-klik
    onAddToCart(item);
  };

  return (
    // Struktur box vertikal ke bawah dengan flex-col
    <div className="bg-white p-3 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between w-full min-h-[320px]">
      
      {/* 1. BAGIAN ATAS: FOTO PRODUK PERSEGI */}
      <div className="w-full aspect-square max-h-44 bg-slate-50 rounded-2xl overflow-hidden shrink-0 border border-slate-100">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-medium">
            No Image
          </div>
        )}
      </div>

      {/* 2. BAGIAN TENGAH: INFO NAMA & DESKRIPSI MINIMALIS */}
      <div className="mt-3 flex-1 flex flex-col justify-start">
        <h4 className="font-bold text-base text-slate-800 line-clamp-1">
          {item.name}
        </h4>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
          {item.desc || "Menu pilihan spesial untuk Anda."}
        </p>
      </div>

      {/* 3. BAGIAN BAWAH: HARGA & TOMBOL PLUS BULAT HIJAU TOK */}
      <div className="mt-4 flex items-center justify-between pt-1">
        <span className="text-[#14B8A6] font-extrabold text-base">
          Rp {item.price.toLocaleString("id-ID")}
        </span>
        
        {/* Tombol bulat hijau dengan icon + */}
        <button
          type="button"
          onClick={handleAddClick}
          className="w-9 h-9 rounded-xl bg-[#14B8A6] hover:bg-[#0D9488] text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-teal-600/20 transition-all active:scale-90"
        >
          +
        </button>
      </div>

    </div>
  );
};

export default ProdukCard;