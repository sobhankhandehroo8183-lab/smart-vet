import React from 'react';
import { FaStethoscope, FaBell, FaUser } from 'react-icons/fa';
import { MdLanguage } from 'react-icons/md';

const Navbar: React.FC = () => {
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

        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <FaBell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2 space-x-reverse p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <span className="text-sm font-medium">ورود / ثبت‌نام</span>
            <FaUser className="w-5 h-5 text-gray-600" />
          </div>
          
          <select className="border rounded-lg px-3 py-1 text-sm bg-white text-right">
            <option value="fa">فارسی</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;