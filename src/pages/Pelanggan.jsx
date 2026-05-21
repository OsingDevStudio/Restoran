import Layout from "../components/Layout";

// Menambahkan props { onLogout } pada argumen komponen
const Pelanggan = ({ onLogout }) => {
  return (
    // Mengoper props onLogout ke dalam komponen Layout
    <Layout onLogout={onLogout}>
      <h1 className="text-2xl font-bold mb-6">Daftar Pelanggan</h1>
      <p className="text-slate-500">Data manajemen pelanggan tetap.</p>
    </Layout>
  );
};

export default Pelanggan;