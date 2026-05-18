const CartModal = ({ isOpen, onClose, cartItems }) => {
  if (!isOpen) return null; // Jika tidak terbuka, jangan tampilkan apa-apa

  // Menghitung total harga belanjaan
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      {/* Area putih modal */}
      <div className="bg-white w-full max-h-[80vh] rounded-t-3xl p-6 overflow-y-auto animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Pesanan Kamu</h2>
          <button onClick={onClose} className="text-gray-400 text-2xl">&times;</button>
        </div>

        {/* Daftar Item di Keranjang */}
        <div className="space-y-4 mb-8">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 py-10">Keranjang masih kosong nih...</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Rp {item.price.toLocaleString()}</p>
                </div>
                <span className="text-orange-600 font-bold">x1</span>
              </div>
            ))
          )}
        </div>

        {/* Ringkasan Harga */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between font-bold text-lg">
            <span>Total Pembayaran</span>
            <span className="text-orange-600">Rp {totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Tombol Aksi */}
        <button 
          onClick={() => alert("Pesanan Terkirim ke Kasir!")}
          className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold mt-6 shadow-lg shadow-orange-200"
        >
          Pesan Sekarang
        </button>
      </div>
    </div>
  );
};

export default CartModal;