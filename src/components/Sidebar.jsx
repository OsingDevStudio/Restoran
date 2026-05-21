import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faBox, faFileLines, faChartLine, faUsers, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  const menus = [
    { name: "Dashboard", path: "/kasir/dashboard", icon: faGauge },
    { name: "Produk", path: "/kasir/produk", icon: faBox },
    { name: "Transaksi", path: "/kasir/transaksi", icon: faFileLines },
    { name: "Laporan", path: "/kasir/laporan", icon: faChartLine },
    { name: "Pelanggan", path: "/kasir/pelanggan", icon: faUsers },
  ];

  return (
    <aside className="w-64 bg-[#0F766E] text-white p-6 h-screen fixed flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold mb-10">Areacode Kasir</h1>
        <nav className="space-y-2">
          {menus.map((menu) => (
            <Link 
              key={menu.name} 
              to={menu.path} 
              className={`flex items-center gap-3 py-3 px-4 rounded-xl transition ${
                location.pathname === menu.path ? "bg-[#115E59]" : "hover:bg-[#0D685F]"
              }`}
            >
              <FontAwesomeIcon icon={menu.icon} className="w-4" />
              {menu.name}
            </Link>
          ))}
        </nav>
      </div>

      <button 
        onClick={onLogout} 
        className="flex items-center gap-3 text-red-200 hover:text-white py-3 px-4 rounded-xl hover:bg-red-800/50 transition w-full text-left"
      >
        <FontAwesomeIcon icon={faRightFromBracket} /> 
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;