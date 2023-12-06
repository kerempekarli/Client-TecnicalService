// components/Layout.js
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-800 p-4">
      <nav className="flex items-center justify-between">
        <div className="text-white font-bold text-xl">
          <Link href="/customer/dashboard">
            <div>Dashboard</div>
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/customer/dashboard">
            <div className="text-white">Ana Sayfa</div>
          </Link>
          <Link href="/customer/dashboard/repair-status">
            <div className="text-white">Onarım Durumu</div>
          </Link>
          <Link href="/customer/dashboard/profile">
            <div className="text-white">Profil</div>
          </Link>
        </div>
      </nav>
      <div className="p-4 text-white">{children}</div>
    </div>
  );
};

export default Layout;
