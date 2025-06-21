import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo_SiMANGGIS.png";
import { useState } from "react";
import { UserCircle } from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const handleLogout = () => {
    const confirmed = window.confirm("Yakin ingin logout?");
    if (confirmed) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const toggleDropdown = () => {
  setDropdownOpen(!dropdownOpen);
};


  return (
    <div className="min-h-screen antialiased bg-gray-100 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              data-drawer-target="drawer-navigation"
              data-drawer-toggle="drawer-navigation"
              aria-controls="drawer-navigation"
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-blue-600 hover:bg-blue-50 focus:bg-blue-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 5h14M3 10h14M3 15h14"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Toggle Sidebar</span>
            </button>
            <Link to="/" className="flex items-center justify-between mr-4">
              <div className="flex items-center flex-shrink-0 text-white">
                <img src={Logo} alt="Company Logo" className="w-auto h-12" />
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
               onClick={toggleDropdown}
              className="flex mx-3 text-sm bg-blue-100 rounded-full dark:bg-blue-900 md:mr-0 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-600"
              id="user-menu-button"
            >
              <span className="sr-only">Open user menu</span>
              <UserCircle className="text-blue-600 w-7 h-7 dark:text-white" />
            </button>
            <span className="font-semibold text-gray-700 dark:text-gray-200">
             User
            </span>
            {dropdownOpen && (
              <div className="absolute right-0 z-50 mt-2 bg-white rounded shadow top-full w-44 dark:bg-gray-700">
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-100 dark:hover:bg-gray-600"
                    >
                      Logout
                    </button>
                     </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full bg-white border-r border-blue-300 pt-14 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidenav"
        id="drawer-navigation"
      >
        <div className="h-full px-3 py-5 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin"
                className="flex items-center p-2 text-base font-semibold text-blue-700 rounded-lg hover:bg-blue-100 dark:text-blue-200 dark:hover:bg-gray-700"
              >
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 15v4m6-16v16m6-10v10m6-14v14" />
                </svg>
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>

            <ul className="pt-5 mt-5 space-y-2 border-t border-blue-200">
              <li>
                <Link
                  to="/admin/schools"
                  className="flex items-center p-2 text-base font-semibold text-blue-700 rounded-lg hover:bg-blue-100 dark:text-blue-200 dark:hover:bg-gray-700"
                >
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 10l9-7 9 7-9 7-9-7z" />
                    <path d="M9 21V12h6v9" />
                  </svg>
                  <span className="ml-3">Data Sekolah</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/teachers"
                  className="flex items-center p-2 text-base font-semibold text-blue-700 rounded-lg hover:bg-blue-100 dark:text-blue-200 dark:hover:bg-gray-700"
                >
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span className="ml-3">Data Guru</span>
                </Link>
              </li>
            </ul>

            <li>
              <Link
                to="/admin/classes"
                className="flex items-center p-2 text-base font-semibold text-blue-700 rounded-lg hover:bg-blue-100 dark:text-blue-200 dark:hover:bg-gray-700"
              >
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M16 14c2.21 0 4 1.79 4 4v1H4v-1c0-2.21 1.79-4 4-4h8zM12 12a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
                <span className="ml-3">Data Kelas</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/students"
                className="flex items-center p-2 text-base font-semibold text-blue-700 rounded-lg hover:bg-blue-100 dark:text-blue-200 dark:hover:bg-gray-700"
              >
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8 16v1a4 4 0 004 4 4 4 0 004-4v-1M12 12a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
                <span className="ml-3">Data Murid</span>
              </Link>
            </li>
            
            <li>
              <Link
                to="/admin/meals"
                className="flex items-center p-2 text-base font-semibold text-blue-700 rounded-lg hover:bg-blue-100 dark:text-blue-200 dark:hover:bg-gray-700"
              >
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                </svg>
                <span className="ml-3">Data Distribusi</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <main className="h-auto p-4 pt-20 transition md:ml-64">
        <div className="h-auto px-4 pt-4 pb-6 bg-white border-2 border-blue-100 rounded-2xl dark:border-blue-900 dark:bg-gray-900">
          <Outlet />
        </div>
      </main>
    </div>
  );
}