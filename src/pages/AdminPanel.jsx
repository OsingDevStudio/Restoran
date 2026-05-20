import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const AdminPanel = () => {
  const [jumlahMeja, setJumlahMeja] = useState(30); // Default awal 5 meja
  const qrRefs = useRef([]);

  // Fungsi untuk mengunduh QR Code menjadi file gambar .png
  const downloadQR = (noMeja, index) => {
    const canvas = qrRefs.current[index]?.querySelector("canvas");
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `QR_Meja_${noMeja}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  // Dapatkan URL domain website saat ini secara dinamis (localhost atau tautan Vercel nanti)
  const baseUrl = window.location.origin;

  return (
    <div className="bg-slate-50 min-h-screen font-sans p-6 text-slate-800">
      
      {/* HEADER ADMIN */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <h1 className="text-2xl font-black text-slate-900">🎛️ PANEL UTAMA ADMIN</h1>
        <p className="text-xs text-slate-400 mt-1">Kelola menu dan generate QR Code unik per meja restoran</p>
        
        {/* INPUT JUMLAH MEJA */}
        <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-gray-200/60 max-w-sm">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
            Atur Jumlah Meja Restoran:
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              value={jumlahMeja}
              onChange={(e) => setJumlahMeja(parseInt(e.target.value) || 1)}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm font-bold focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      {/* GRID DAFTAR QR CODE MEJA */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
          Daftar QR Code Siap Cetak
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: jumlahMeja }).map((_, index) => {
            const nomorMeja = index + 1;
            // Alamat link unik per meja, contoh: http://localhost:5173/meja/1
            const linkMeja = `${baseUrl}/meja/${nomorMeja}`;

            return (
              <div 
                key={nomorMeja} 
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-between text-center gap-4 hover:shadow-md transition"
              >
                <div>
                  <span className="bg-orange-100 text-orange-700 text-xs font-black px-3 py-1 rounded-full">
                    MEJA NO: {nomorMeja}
                  </span>
                  <p className="text-[10px] text-slate-400 font-mono mt-2 truncate max-w-[150px]">
                    {linkMeja}
                  </p>
                </div>

                {/* AREA GAMBAR QR CODE */}
                <div 
                  ref={(el) => (qrRefs.current[index] = el)} 
                  className="p-3 bg-slate-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center"
                >
                  <QRCodeCanvas
                    value={linkMeja}
                    size={130}
                    level={"H"} // High error correction (bagus kalau dicetak kertas)
                    includeMargin={true}
                  />
                </div>

                {/* TOMBOL DOWNLOAD */}
                <button
                  onClick={() => downloadQR(nomorMeja, index)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold py-2 rounded-xl transition shadow-sm active:scale-95"
                >
                  📥 Unduh Gambar
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default AdminPanel;