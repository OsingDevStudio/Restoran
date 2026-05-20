import { useState, useEffect } from "react";

const MenuCard = ({ item, onAdd, cart = [] }) => {
  
  // SOLUSI CRITICAL: Jika ID bawaan data sama (misal sama-sama 1), 
  // kita bedakan berdasarkan gabungan ID dan nama/deskripsi agar benar-benar unik global.
  const itemDiKeranjang = cart.find(
    (cartItem) => cartItem.id === item.id && cartItem.name === item.name
  );

  // State lokal porsi
  const [porsi, setPorsi] = useState(0);

  // Sinkronisasikan porsi berdasarkan ID dan nama makanan saat ganti kategori
  useEffect(() => {
    if (itemDiKeranjang) {
      setPorsi(itemDiKeranjang.quantity);
    } else {
      setPorsi(0);
    }
  }, [item.id, item.name, itemDiKeranjang]); // Memantau perubahan nama dan ID menu

  const tambahPorsi = () => {
    setPorsi(porsi + 1);
  };

  const kurangPorsi = () => {
    if (porsi > 0) {
      setPorsi(porsi - 1);
    }
  };

  const handleKirimKeKeranjang = () => {
    if (onAdd) {
      // Kirim data porsi terbaru ke keranjang utama
      onAdd({ ...item, quantity: porsi });
    }
  };

  // Otomatis sinkronkan isi keranjang saat user menekan tombol minus/plus
  useEffect(() => {
    if (itemDiKeranjang && porsi !== itemDiKeranjang.quantity) {
      onAdd({ ...item, quantity: porsi });
    }
  }, [porsi]);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col justify-between min-h-[380px]">
      {/* BAGIAN ATAS: GAMBAR DAN DETAIL */}
      <div>
        <img src={item.image} alt={item.name} className="w-full h-40 object-cover bg-slate-50" />
        <div className="p-4 pb-1">
          <h3 className="text-base font-bold text-gray-800 line-clamp-1">{item.name}</h3>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.description}</p>
        </div>
      </div>

      {/* BAGIAN BAWAH: HARGA, WIDGET KUANTITAS, DAN TOMBOL */}
      <div className="p-4 pt-0 mt-auto space-y-3">
        {/* TAMPILAN HARGA */}
        <div className="flex justify-between items-center border-t pt-2 border-gray-50">
          <span className="text-xs font-semibold text-gray-400">Harga</span>
          <span className="font-extrabold text-red-500 text-sm">
            Rp {item.price.toLocaleString()}
          </span>
        </div>

        {/* WIDGET KUANTITAS */}
        <div className="flex items-center justify-between bg-gray-50 p-1.5 rounded-xl border border-gray-200/60 shadow-inner">
          <button
            onClick={kurangPorsi}
            className="w-8 h-8 rounded-lg bg-white shadow-sm font-bold text-gray-800 flex items-center justify-center hover:bg-gray-100 text-lg transition active:scale-90"
          >
            -
          </button>
          <span className="font-extrabold text-gray-800 text-base">{porsi}</span>
          <button
            onClick={tambahPorsi}
            className="w-8 h-8 rounded-lg bg-white shadow-sm font-bold text-gray-800 flex items-center justify-center hover:bg-gray-100 text-lg transition active:scale-90"
          >
            +
          </button>
        </div>

        {/* TOMBOL UTAMA "TAMBAH PESANAN" */}
        {porsi > 0 ? (
          <button
            onClick={handleKirimKeKeranjang}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-3 rounded-xl transition active:scale-95 shadow-md shadow-orange-100"
          >
            TAMBAH PESANAN
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-100 text-gray-400 text-xs font-bold py-3 rounded-xl cursor-not-allowed"
          >
            PILIH KUANTITAS DULU
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuCard;