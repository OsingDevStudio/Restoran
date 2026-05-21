// Pastikan komponen menerima props searchQuery dan setSearchQuery
const Navbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className="bg-white border-b border-slate-100 h-20 px-8 flex items-center justify-between sticky top-0 z-40">
      <div>
        <h1 className="font-bold text-xl text-slate-800">Kasir Pintar</h1>
        <p className="text-xs text-slate-400 mt-0.5">Rabu, 20 Mei 2026</p>
      </div>

      {/* BAGIAN INPUT PENCARIAN */}
      <div className="w-80 relative">
        <span className="absolute left-4 top-3.5 text-slate-400 text-sm">🔍</span>
        <input
          type="text"
          placeholder="Cari menu makanan di sini..."
          value={searchQuery} // Mengunci nilai input sesuai state di Dashboard
          onChange={(e) => setSearchQuery(e.target.value)} // Mengubah state setiap ada ketikan baru
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
        />
      </div>
    </nav>
  );
};

export default Navbar;