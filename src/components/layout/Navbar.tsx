import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaStethoscope, FaBell, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="p-2 bg-blue-50 rounded-lg">
            <FaStethoscope className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">دستیار دامپزشکی هوشمند</h1>
            <p className="text-xs text-gray-500">VetAI Assistant</p>
          </div>
        </div>

        {/* در صفحه اصلی، دکمه‌های متفاوت نشان بده */}
        <div className="flex items-center space-x-4 space-x-reverse">
          {isHomePage ? (
            <>
              <Link to="/login" className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                ورود
              </Link>
              <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                ثبت‌نام
              </Link>
            </>
          ) : (
            <>
              <button className="relative p-2 hover:bg-gray-100 rounded-full">
                <FaBell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <Link to="/profile" className="flex items-center space-x-2 space-x-reverse p-2 hover:bg-gray-100 rounded-lg">
                <span className="text-sm font-medium">حساب کاربری</span>
                <FaUser className="w-5 h-5 text-gray-600" />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;