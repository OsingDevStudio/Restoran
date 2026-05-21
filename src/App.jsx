import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

// Import Semua Halaman Pelanggan & Admin
import CustomerMenu from "./pages/CustomerMenu";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import CartPage from "./pages/CartPage";

// Import Semua Halaman Kasir
import Dashboard from "./pages/Dashboard";
import CashierLogin from "./pages/CashierLogin";
import Produk from "./pages/Produk";
import Transaksi from "./pages/Transaksi";
import Laporan from "./pages/Laporan";
import Pelanggan from "./pages/Pelanggan";

const AppRoutes = () => {
  const navigate = useNavigate();

  // State Login Kasir
  const [isCashierLoggedIn, setIsCashierLoggedIn] = useState(() => {
    return localStorage.getItem("cashier_authenticated") === "true";
  });

  // State Login Admin
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem("admin_authenticated") === "true";
  });

  // Fungsi Login & Logout Kasir
  const handleCashierLogin = () => {
    setIsCashierLoggedIn(true);
    localStorage.setItem("cashier_authenticated", "true");
  };

  const handleCashierLogout = () => {
    localStorage.removeItem("cashier_authenticated");
    setIsCashierLoggedIn(false);
    navigate("/kasir/dashboard");
  };

  // Fungsi Login Admin
  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem("admin_authenticated", "true");
  };

  return (
    <Routes>
      {/* 1. RUTE PELANGGAN */}
      <Route path="/" element={<CustomerMenu />} />
      <Route path="/meja/:noMeja" element={<CustomerMenu />} />
      <Route path="/keranjang" element={<CartPage />} />

      {/* 2. RUTE KASIR (DENGAN PROTEKSI LOGOUT & LOGIN) */}
      <Route path="/kasir" element={<Navigate to="/kasir/dashboard" />} />
      
      <Route 
        path="/kasir/dashboard" 
        element={isCashierLoggedIn ? <Dashboard onLogout={handleCashierLogout} /> : <CashierLogin onLoginSuccess={handleCashierLogin} />} 
      />
      <Route 
        path="/kasir/produk" 
        element={isCashierLoggedIn ? <Produk onLogout={handleCashierLogout} /> : <Navigate to="/kasir/dashboard" />} 
      />
      <Route 
        path="/kasir/transaksi" 
        element={isCashierLoggedIn ? <Transaksi onLogout={handleCashierLogout} /> : <Navigate to="/kasir/dashboard" />} 
      />
      <Route 
        path="/kasir/laporan" 
        element={isCashierLoggedIn ? <Laporan onLogout={handleCashierLogout} /> : <Navigate to="/kasir/dashboard" />} 
      />
      <Route 
        path="/kasir/pelanggan" 
        element={isCashierLoggedIn ? <Pelanggan onLogout={handleCashierLogout} /> : <Navigate to="/kasir/dashboard" />} 
      />

      {/* 3. RUTE ADMIN */}
      <Route 
        path="/admin" 
        element={isAdminLoggedIn ? <AdminPanel /> : <AdminLogin onLoginSuccess={handleAdminLoginSuccess} />} 
      />

      {/* 4. REDIRECT JIKA PATH SALAH */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;