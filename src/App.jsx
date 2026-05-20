import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerMenu from "./pages/CustomerMenu";
import CashierDashboard from "./pages/CashierDashboard";
import AdminPanel from "./pages/AdminPanel"; // 1. Import AdminPanel

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerMenu />} />
        <Route path="/kasir" element={<CashierDashboard />} />
        {/* 2. Tambahkan Pintu Admin */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;