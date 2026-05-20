import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [namaPelanggan, setNamaPelanggan] = useState("");

  // Ambil data keranjang saat halaman ini pertama kali dibuka
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("keranjang_pelanggan")) || [];
    setCartItems(savedCart);
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleProsesPesanan = () => {
    if (cartItems.length === 0) return;
    
    if (!namaPelanggan.trim()) {
      alert("⚠️ Silakan masukkan nama kamu terlebih dahulu sebelum memesan!");
      return;
    }

    const pesananLama = JSON.parse(localStorage.getItem("antrean_kasir")) || [];

    const pesananBaru = {
      id_pesanan: "ORDER-" + Date.now(),
      waktu: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      meja: cartItems[0]?.tableNumber || "Tanpa Meja",
      nama_pelanggan: namaPelanggan,
      items: cartItems,
      total_harga: totalPrice,
      status: "Belum Bayar"
    };

    // Kirim data ke antrean kasir
    const totalAntreanTerbaru = [...pesananLama, pesananBaru];
    localStorage.setItem("antrean_kasir", JSON.stringify(totalAntreanTerbaru));

    // Bersihkan keranjang belanja lokal milik pelanggan setelah dipesan
    localStorage.removeItem("keranjang_pelanggan");

    alert(`🚀 Pesanan atas nama ${namaPelanggan} berhasil dikirim ke kasir!`);
    
    // Alihkan rute kembali ke halaman meja asal
    const nomorMeja = cartItems[0]?.tableNumber;
    if (nomorMeja && nomorMeja !== "Tanpa Meja") {
      navigate(`/meja/${nomorMeja}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800 p-4 max-w-2xl mx-auto">
      
      {/* STICKY HEADER KERANJANG */}
      <div className="flex items-center gap-4 border-b pb-4 mb-6 bg-white -mx-4 px-4 pt-2 shadow-sm sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="bg-slate-100 hover:bg-slate-200 p-2.5 rounded-xl text-xs font-bold transition"
        >
          ⬅️ Kembali
        </button>
        <div>
          <h1 className="text-lg font-black text-slate-900">Detail Keranjang</h1>
          <p className="text-[10px] text-slate-400">Periksa kembali pesanan kuliner Anda</p>
        </div>
      </div>

      {cartItems.length > 0 ? (
        <>
          {/* DAFTAR ITEM DENGAN GAMBAR FOTO MENU */}
          <div className="space-y-3 mb-6">
            <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider px-1">Menu Terpilih</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm gap-3">
                
                {/* SISI KIRI: GAMBAR + NAMA KETERANGAN */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-14 h-14 rounded-xl object-cover bg-slate-100 border border-slate-100 flex-shrink-0"
                  />
                  <div className="truncate">
                    <h4 className="font-bold text-slate-800 text-sm truncate">{item.name}</h4>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Rp {item.price.toLocaleString()} × {item.quantity}
                    </p>
                  </div>
                </div>

                {/* SISI KANAN: TOTAL SUB-HARGA */}
                <span className="font-black text-slate-900 text-sm whitespace-nowrap">
                  Rp {(item.price * item.quantity).toLocaleString()}
                </span>

              </div>
            ))}
          </div>

          {/* INPUT FORM NAMA PELANGGAN */}
          <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
              Nama Pemesan (Wajib Diisi):
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-sm">👤</span>
              <input
                type="text"
                placeholder="Ketik namamu di sini..."
                value={namaPelanggan}
                onChange={(e) => setNamaPelanggan(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs font-bold focus:outline-none focus:border-orange-500 focus:bg-white text-slate-700"
              />
            </div>
          </div>

          {/* TOTAL BAYAR */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-24">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-bold text-slate-400">Total Pembayaran</span>
              <span className="text-xl font-black text-orange-600">Rp {totalPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* BOTTOM BUTTON */}
          <div className="fixed bottom-6 left-0 right-0 px-4 max-w-2xl mx-auto z-10">
            <button 
              onClick={handleProsesPesanan}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl text-xs font-black tracking-wider uppercase shadow-[0_10px_30px_rgba(16,185,129,0.3)] active:scale-95 transition"
            >
              🚀 KIRIM PESANAN KE KASIR
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 text-slate-400 text-xs italic font-medium">
          Keranjang belanja Anda masih kosong.
        </div>
      )}
    </div>
  );
};

export default CartPage;