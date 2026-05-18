import { useState } from "react";
import { MENU_DATA } from "../data/menuData";
import MenuCard from "../components/MenuCard";
import CartModal from "../components/CartModal"; // 1. Import Modal

const CustomerMenu = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // 2. State untuk buka/tutup modal

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24 font-sans">
      <header className="bg-white p-4 shadow-sm sticky top-0 z-20 flex justify-between items-center">
        <h1 className="text-xl font-extrabold text-orange-600 italic">MIE GACOAN KW</h1>
        <div className="bg-orange-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
          🛒 <span className="font-bold">{cart.length}</span>
        </div>
      </header>

      <main className="p-4 grid grid-cols-2 gap-4">
        {MENU_DATA.map((item) => (
          <MenuCard key={item.id} item={item} onAdd={() => addToCart(item)} />
        ))}
      </main>
      
      {/* Tombol Melayang untuk Buka Modal */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-0 right-0 px-4 z-30">
           <button 
            onClick={() => setIsCartOpen(true)} // 3. Set jadi true saat diklik
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold shadow-2xl flex justify-between px-6 active:scale-95 transition"
           >
              <span>{cart.length} Item</span>
              <span>Lihat Pesanan →</span>
           </button>
        </div>
      )}

      {/* 4. Panggil Komponen Modal */}
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart} 
      />
    </div>
  );
};

export default CustomerMenu;