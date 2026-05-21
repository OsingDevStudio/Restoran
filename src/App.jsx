import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
// ... semua import halaman tetap di sini
import CustomerMenu from "./pages/CustomerMenu";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import CartPage from "./pages/CartPage";
import Dashboard from "./pages/Dashboard";
import CashierLogin from "./pages/CashierLogin";
import Produk from "./pages/Produk";
import Transaksi from "./pages/Transaksi";
import Laporan from "./pages/Laporan";
import Pelanggan from "./pages/Pelanggan";

const AppRoutes = () => {
  const navigate = useNavigate(); // SEKARANG INI AKAN BERJALAN DENGAN BENAR
  
  const [isCashierLoggedIn, setIsCashierLoggedIn] = useState(() => localStorage.getItem("cashier_authenticated") === "true");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => localStorage.getItem("admin_authenticated") === "true");

  const handleCashierLogin = () => {
    setIsCashierLoggedIn(true);
    localStorage.setItem("cashier_authenticated", "true");
    navigate("/kasir/dashboard");
  };

  const handleCashierLogout = () => {
    localStorage.removeItem("cashier_authenticated");
    setIsCashierLoggedIn(false);
    navigate("/kasir");
  };

  return (
    <Routes>
      <Route path="/" element={<CustomerMenu />} />
      <Route path="/kasir" element={<CashierLogin onLoginSuccess={handleCashierLogin} />} />
      <Route path="/kasir/dashboard" element={isCashierLoggedIn ? <Dashboard onLogout={handleCashierLogout} /> : <Navigate to="/kasir" />} />
      <Route path="/kasir/produk" element={isCashierLoggedIn ? <Produk onLogout={handleCashierLogout} /> : <Navigate to="/kasir" />} />
      <Route path="/kasir/transaksi" element={isCashierLoggedIn ? <Transaksi onLogout={handleCashierLogout} /> : <Navigate to="/kasir" />} />
      <Route path="/kasir/laporan" element={isCashierLoggedIn ? <Laporan onLogout={handleCashierLogout} /> : <Navigate to="/kasir" />} />
      <Route path="/kasir/pelanggan" element={isCashierLoggedIn ? <Pelanggan onLogout={handleCashierLogout} /> : <Navigate to="/kasir" />} />
      <Route path="/admin" element={isAdminLoggedIn ? <AdminPanel /> : <AdminLogin onLoginSuccess={() => setIsAdminLoggedIn(true)} />} />
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