import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import CustomerMenu from "./pages/CustomerMenu";
import CashierDashboard from "./pages/CashierDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import CartPage from "./pages/CartPage";

function App() {
  // State untuk menyimpan status login admin secara persisten
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem("admin_authenticated") === "true";
  });

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem("admin_authenticated", "true");
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Pelanggan */}
        <Route path="/meja/:noMeja" element={<CustomerMenu />} />
        <Route path="/" element={<CustomerMenu />} />
        <Route path="/keranjang" element={<CartPage />} />
        
        {/* Rute Kasir */}
        <Route path="/kasir" element={<CashierDashboard />} />
        
        {/* Rute Admin dengan Proteksi */}
        <Route 
          path="/admin" 
          element={
            isAdminLoggedIn ? (
              <AdminPanel />
            ) : (
              <AdminLogin onLoginSuccess={handleLoginSuccess} />
            )
          } 
        />
        
        {/* Redirect jika ada url yang salah */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;