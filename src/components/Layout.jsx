import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, onLogout }) => {
  return (
    <div className="flex w-full min-h-screen bg-slate-50">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 ml-64 w-full">
        <Navbar />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
};
export default Layout;