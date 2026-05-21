import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ProdukCard from "../components/ProdukCard";
// Impor FontAwesome Core dan Ikon yang dibutuhkan
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnowflake, faMugHot } from "@fortawesome/free-solid-svg-icons";

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

const Dashboard = ({ onLogout }) => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("datastore_products");
    return savedProducts ? JSON.parse(savedProducts) : INITIAL_PRODUK;
  });

  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Menu");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [{ name: "All Menu" }, { name: "Makanan" }, { name: "Minuman" }, { name: "Cemilan" }, { name: "Dessert" }];

  useEffect(() => {
    const savedProducts = localStorage.getItem("datastore_products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === item.id);
      if (idx > -1) {
        const newCart = [...prev];
        newCart[idx].qty += 1;
        return newCart;
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  // 1. FILTER UTAMA BERDASARKAN INPUT PENCARIAN (SEARCH BAR)
  const searchedProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 2. LOGIKA PEMISAHAN DATA SECARA MANDIRI DAN AMAN (CASE-INSENSITIVE)
  const nonMinumanProducts = searchedProducts.filter(
    (p) => p.category.toLowerCase() !== "minuman" && (activeCategory === "All Menu" || p.category === activeCategory)
  );

  const iceDrinks = searchedProducts.filter(
    (p) => p.category.toLowerCase() === "minuman" && 
           (p.type?.toLowerCase() === "ice" || !p.type) && 
           (activeCategory === "All Menu" || activeCategory === "Minuman")
  );

  const hotDrinks = searchedProducts.filter(
    (p) => p.category.toLowerCase() === "minuman" && 
           p.type?.toLowerCase() === "hot" && 
           (activeCategory === "All Menu" || activeCategory === "Minuman")
  );

  return (
    <Layout searchQuery={searchQuery} setSearchQuery={setSearchQuery} onLogout={onLogout}>
      <div className="w-full">
        
        {/* Pilihan Kategori Atas */}
        <div className="mb-8">
          <h3 className="font-bold text-slate-800 mb-4 text-base">Choose Category</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-6 py-3 rounded-xl border text-sm font-bold transition-all ${
                  activeCategory === cat.name 
                    ? "bg-slate-900 text-white shadow-md" 
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* ================= AREA GRID PRODUK YANG SUDAH TERPISAH ================= */}
        <div className="space-y-10">
          
          {/* BLOK 1: RENDER PRODUK SELAIN MINUMAN (Makanan, Cemilan, Dessert) */}
          {nonMinumanProducts.length > 0 && activeCategory !== "Minuman" && (
            <div>
              <h3 className="font-bold text-slate-800 mb-6 text-base">
                {activeCategory === "All Menu" ? "Menu / Produk Utama" : `Menu / Produk (${activeCategory})`}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {nonMinumanProducts.map((item) => (
                  <ProdukCard key={item.id} item={item} onAddToCart={addToCart} />
                ))}
              </div>
            </div>
          )}

          {/* BLOK 2: BARIS MANDIRI KHUSUS MINUMAN ICE (MENGGUNAKAN FONTAWESOME) */}
          {iceDrinks.length > 0 && (
            <div>
              <h3 className="font-bold text-teal-600 mb-6 text-base flex items-center gap-2 border-b border-slate-100 pb-2">
                <FontAwesomeIcon icon={faSnowflake} className="text-teal-500 text-sm" /> 
                Minuman Ice
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {iceDrinks.map((item) => (
                  <ProdukCard key={item.id} item={item} onAddToCart={addToCart} />
                ))}
              </div>
            </div>
          )}

          {/* BLOK 3: BARIS MANDIRI KHUSUS MINUMAN HOT (MENGGUNAKAN FONTAWESOME) */}
          {hotDrinks.length > 0 && (
            <div>
              <h3 className="font-bold text-amber-700 mb-6 text-base flex items-center gap-2 border-b border-slate-100 pb-2">
                <FontAwesomeIcon icon={faMugHot} className="text-amber-600 text-sm" /> 
                Minuman Hot / Panas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {hotDrinks.map((item) => (
                  <ProdukCard key={item.id} item={item} onAddToCart={addToCart} />
                ))}
              </div>
            </div>
          )}

          {/* Tampilan Jika Semua Hasil Pencarian Kosong */}
          {nonMinumanProducts.length === 0 && iceDrinks.length === 0 && hotDrinks.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">
              Tidak ada produk yang cocok dengan pencarian Anda.
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;