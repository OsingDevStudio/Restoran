import Layout from "../components/Layout";

// Menambahkan props { onLogout } pada argumen komponen
const Transaksi = ({ onLogout }) => {
  const dataTransaksi = [
    { id: "TRX001", meja: "05", total: 45000, status: "Lunas" },
    { id: "TRX002", meja: "02", total: 30000, status: "Lunas" },
  ];

  return (
    // Mengoper props onLogout ke dalam komponen Layout
    <Layout onLogout={onLogout}>
      <h1 className="text-2xl font-bold mb-6">Riwayat Transaksi</h1>
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-sm border-b">
              <th className="pb-4">ID Transaksi</th>
              <th className="pb-4">Meja</th>
              <th className="pb-4">Total</th>
              <th className="pb-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {dataTransaksi.map((trx) => (
              <tr key={trx.id} className="text-sm">
                <td className="py-4 font-mono">{trx.id}</td>
                <td className="py-4 font-bold">{trx.meja}</td>
                <td className="py-4">Rp {trx.total.toLocaleString()}</td>
                <td className="py-4 text-emerald-600 font-bold">{trx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Transaksi;