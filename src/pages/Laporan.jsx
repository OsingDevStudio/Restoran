import Layout from "../components/Layout";

// Menambahkan props { onLogout } pada argumen komponen
const Laporan = ({ onLogout }) => { 
  return (
    // Mengoper props onLogout ke dalam komponen Layout
    <Layout onLogout={onLogout}>
      <h1 className="text-2xl font-bold mb-6">Laporan Penjualan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#0F766E] text-white p-6 rounded-2xl">
          <p className="opacity-80 text-sm">Total Pendapatan</p>
          <h2 className="text-2xl font-black mt-2">Rp 1.250.000</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-slate-500 text-sm">Total Transaksi</p>
          <h2 className="text-2xl font-black mt-2">24</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-slate-500 text-sm">Menu Terlaris</p>
          <h2 className="text-2xl font-black mt-2">Mie Gacoan</h2>
        </div>
      </div>
    </Layout>
  );
};

export default Laporan;