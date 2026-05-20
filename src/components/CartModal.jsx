import { useState } from "react";

const CartModal = ({ isOpen, onClose, cartItems }) => {
  // State untuk menyimpan nama pelanggan dan nomor meja
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  // Jika status modal ditutup, jangan tampilkan apa-apa
  if (!isOpen) return null;

  // Hitung total harga seluruh belanjaan
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Fungsi saat tombol "Pesan Sekarang" diklik
  const handleCheckout = (e) => {
    e.preventDefault();

    if (!customerName || !tableNumber) {
      alert("Silakan isi Nama dan Nomor Meja terlebih dahulu!");
      return;
    }

    // Tampilkan rangkuman pesanan (Simulasi sebelum kirim ke database)
    alert(`
      🎉 PESANAN BERHASIL DIKIRIM! 🎉
      ---------------------------------
      Nama: ${customerName}
      Meja: ${tableNumber}
      Total Bayar: Rp ${totalPrice.toLocaleString()}
      
      Pesananmu sudah diteruskan ke komputer Kasir. Silakan tunggu di meja ya!
    `);

    // Reset form dan tutup modal setelah memesan
    setCustomerName("");
    setTableNumber("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 font-sans text-slate-800">
      
      {/* KOTAK MODAL */}
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl max-h-[85vh] flex flex-col">
        
        {/* HEADER MODAL */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
            📋 Ringkasan Pesanan
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        {/* ISI LIST KERANJANG */}
        <div className="flex-grow overflow-y-auto space-y-4 pr-1">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div>
                <h4 className="font-bold text-sm text-gray-800">{item.name}</h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Rp {item.price.toLocaleString()} x {item.quantity}
                </p>
              </div>
              <span className="font-extrabold text-orange-600 text-sm">
                Rp {(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}

          {/* INPUT DATA PELANGGAN */}
          <div className="border-t pt-4 mt-4 space-y-3">
            <h3 className="font-bold text-sm text-gray-700">📍 Informasi Meja</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Nama Kamu</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Andi"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:border-orange-500 transition"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Nomor Meja</label>
                <input 
                  type="number" 
                  placeholder="Contoh: 05"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:border-orange-500 transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* TOTAL HARGA & TOMBOL UTAMA */}
        <div className="border-t pt-4 mt-4 space-y-3">
          <div className="flex justify-between items-center px-1">
            <span className="text-sm font-bold text-gray-500">Total Pembayaran:</span>
            <span className="text-xl font-black text-red-500">
              Rp {totalPrice.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white py-4 rounded-xl font-extrabold text-center tracking-wide transition shadow-lg"
          >
            🚀 PESAN SEKARANG
          </button>
        </div>

      </div>
    </div>
  );
};

export default CartModal;