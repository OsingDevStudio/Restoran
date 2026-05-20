import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerMenu from "./pages/CustomerMenu";
import CashierDashboard from "./pages/CashierDashboard";
import AdminPanel from "./pages/AdminPanel";
import CartPage from "./pages/CartPage"; // <-- 1. IMPORT HALAMAN BARU INI

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/meja/:noMeja" element={<CustomerMenu />} />
        <Route path="/" element={<CustomerMenu />} />
        
        {/* 2. DAFTARKAN RUTE HALAMAN KERANJANG DI SINI */}
        <Route path="/keranjang" element={<CartPage />} />
        
        <Route path="/kasir" element={<CashierDashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;