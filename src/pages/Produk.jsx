import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash, faXmark, faCamera, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

// Data bawaan awal (INITIAL_PRODUK) dengan menyertakan type "Ice" pada minuman bawaan
const INITIAL_PRODUK = [
  { id: "MAK-1", name: "Soto Khas Madiun", desc: "Soto berbumbu spesial", price: 25000, category: "Makanan", image: "/images/soto.jpg" },
  { id: "MAK-2", name: "Gulai Kambing", desc: "Daging sapi dengan keju", price: 35000, category: "Makanan", image: "/images/gulai kambing.jpg" },
  { id: "MAK-3", name: "Nasi Goreng Spesial", desc: "Sayap ayam goreng", price: 28000, category: "Makanan", image: "/images/nasi goreng.jpg" },
  { id: "MAK-4", name: "Sate Madura", desc: "Sayap ayam goreng", price: 28000, category: "Makanan", image: "/images/sate.jpg" },
  { id: "MIN-1", name: "Es jeruk", desc: "jeruk dengan foam", price: 18000, category: "Minuman", type: "Ice", image: "/images/es jeruk.png" },
  { id: "MIN-2", name: "Es Teh Manis", desc: "Teh manis segar", price: 5000, category: "Minuman", type: "Ice", image: "/images/es teh.png" },
  { id: "MIN-3", name: "Es Matcha", desc: "Matcha manis segar", price: 5000, category: "Minuman", type: "Ice", image: "/images/es matcha.png" },
  { id: "CEM-1", name: "French Fries", desc: "Kentang goreng crispy", price: 15000, category: "Cemilan", image: "/images/kentang goreng.jpg" },
  { id: "CEM-2", name: "Tahu Petis", desc: "Tahu Krispi sambal petis", price: 15000, category: "Cemilan", image: "/images/tahu petis.jpg" },
  { id: "DES-1", name: "Chocolate Cake", desc: "Kue coklat lembut", price: 35000, category: "Dessert", image: "/images/chocolate-cake.jpg" },
  { id: "DES-2", name: "Ice Cream Sundae", desc: "Es krim topping coklat", price: 20000, category: "Dessert", image: "/images/ice-cream.jpg" },
];

const Produk = ({ onLogout }) => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("datastore_products");
    return savedProducts ? JSON.parse(savedProducts) : INITIAL_PRODUK;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // State untuk Modal Konfirmasi Hapus Custom
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // States Form Input
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Makanan");
  const [type, setType] = useState("Ice"); // State baru untuk tipe Ice / Hot
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    localStorage.setItem("datastore_products", JSON.stringify(products));
  }, [products]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setName(item.name);
    setCategory(item.category);
    setType(item.type || "Ice"); // Ambil data type yang ada, jika tidak ada default ke "Ice"
    setPrice(item.price);
    setDesc(item.desc);
    setImagePreview(item.image);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item) => {
    setProductToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();

    if (editingId) {
      setProducts(products.map((p) => {
        if (p.id === editingId) {
          return {
            ...p,
            name,
            desc,
            price: parseInt(price) || 0,
            category,
            // Simpan tipe hanya jika kategorinya adalah Minuman
            type: category === "Minuman" ? type : undefined,
            image: imagePreview,
          };
        }
        return p;
      }));
    } else {
      const prefix = category.substring(0, 3).toUpperCase();
      const count = products.filter((p) => p.category === category).length + 1;
      const newId = `${prefix}-${count}`;

      const newProduct = {
        id: newId,
        name,
        desc,
        price: parseInt(price) || 0,
        category,
        // Tambahkan properti type jika kategori yang dipilih adalah Minuman
        ...(category === "Minuman" && { type: type }),
        image: imagePreview || "https://placehold.co/100x100?text=" + name.replace(/ /g, "+"),
      };
      setProducts([newProduct, ...products]);
    }

    resetForm();
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setDesc("");
    setCategory("Makanan");
    setType("Ice"); // Reset tipe ke default "Ice"
    setImagePreview("");
    setEditingId(null);
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout searchQuery={searchQuery} setSearchQuery={setSearchQuery} onLogout={onLogout}>
      <div className="w-full">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Manajemen Produk</h2>
            <p className="text-sm text-slate-500">Kelola daftar menu makanan dan minuman tokomu ({products.length} produk)</p>
          </div>
          <button 
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all"
          >
            <FontAwesomeIcon icon={faPlus} />
            Tambah Produk
          </button>
        </div>

        {/* Tabel */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 uppercase text-xs font-bold border-b border-slate-100">
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-6">Produk</th>
                  <th className="py-4 px-6">Kategori</th>
                  <th className="py-4 px-6">Harga</th>
                  <th className="py-4 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {filteredProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs text-slate-400">{item.id}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-100"
                          onError={(e) => { e.target.src = "https://placehold.co/100x100?text=No+Image"; }}
                        />
                        <div>
                          <p className="font-bold text-slate-800">{item.name}</p>
                          <p className="text-xs text-slate-400 line-clamp-1">{item.desc}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                        {item.category}
                        {/* Menampilkan informasi tambahan (Ice/Hot) khusus untuk produk minuman */}
                        {item.category === "Minuman" && item.type && ` (${item.type})`}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-800">
                      Rp {item.price.toLocaleString("id-ID")}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleEditClick(item)} className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors" title="Edit Produk">
                          <FontAwesomeIcon icon={faPen} className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDeleteClick(item)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                          <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= MODAL FORM (TAMBAH / EDIT) ================= */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl border border-slate-100 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">{editingId ? "Edit Produk Kasir" : "Tambah Produk Baru"}</h3>
                <button onClick={resetForm} className="text-slate-400 hover:text-slate-600 p-1">
                  <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                {/* Upload Gambar */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Upload Gambar Produk</label>
                  <div className="flex items-center gap-4 p-4 border border-dashed border-slate-200 rounded-xl bg-slate-50">
                    <div className="relative w-16 h-16 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center overflow-hidden shrink-0">
                      {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" /> : <div className="flex flex-col items-center justify-center text-slate-400"><FontAwesomeIcon icon={faCamera} className="text-base mb-0.5" /><span className="text-[9px] font-medium">No Image</span></div>}
                    </div>
                    <div className="flex-1">
                      <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer" />
                      <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, JPEG (Maks. 2MB)</p>
                    </div>
                  </div>
                </div>

                {/* Nama Produk */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Nama Produk</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Contoh: Es Kopi Susu" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-teal-600 transition" required />
                </div>

                {/* Kategori & Harga */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Kategori</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} disabled={!!editingId} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:border-teal-600 transition disabled:bg-slate-100 disabled:text-slate-400">
                      <option value="Makanan">Makanan</option>
                      <option value="Minuman">Minuman</option>
                      <option value="Cemilan">Cemilan</option>
                      <option value="Dessert">Dessert</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Harga (Rp)</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="20000" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-teal-600 transition" required />
                  </div>
                </div>

                {/* PILIHAN TYPE ICE / HOT (Hanya muncul jika kategori adalah Minuman) */}
                {category === "Minuman" && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase">Tipe Minuman</label>
                    <div className="flex gap-6 pt-1">
                      <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer font-semibold select-none">
                        <input 
                          type="radio" 
                          name="drinkType" 
                          value="Ice" 
                          checked={type === "Ice"} 
                          onChange={() => setType("Ice")} 
                          className="w-4 h-4 accent-teal-700 cursor-pointer"
                        />
                        ❄️ Ice (Dingin)
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer font-semibold select-none">
                        <input 
                          type="radio" 
                          name="drinkType" 
                          value="Hot" 
                          checked={type === "Hot"} 
                          onChange={() => setType("Hot")} 
                          className="w-4 h-4 accent-teal-700 cursor-pointer"
                        />
                        ☕ Hot (Panas)
                      </label>
                    </div>
                  </div>
                )}

                {/* Deskripsi */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Deskripsi</label>
                  <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Tulis deskripsi singkat... " rows="2" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-teal-600 transition resize-none"></textarea>
                </div>

                {/* Tombol Aksi */}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={resetForm} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-2.5 rounded-xl text-sm transition">Batal</button>
                  <button type="submit" className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2.5 rounded-xl text-sm transition shadow-md">{editingId ? "Perbarui" : "Simpan Produk"}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Konfirmasi Hapus Custom */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-xl border border-slate-100 text-center">
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-xl" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Hapus Produk?</h3>
              <p className="text-sm text-slate-500 mb-6">
                Apakah Anda yakin ingin menghapus <span className="font-bold text-slate-700">"{productToDelete?.name}"</span>? Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex gap-3">
                <button type="button" onClick={() => { setIsDeleteModalOpen(false); setProductToDelete(null); }} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-2.5 rounded-xl text-sm transition">Batal</button>
                <button type="button" onClick={confirmDelete} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl text-sm transition shadow-md">Ya, Hapus</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Produk;