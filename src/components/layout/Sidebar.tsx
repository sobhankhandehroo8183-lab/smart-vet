import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaStethoscope, FaPaw, FaFileAlt, FaPills, FaComments, FaCog, FaQuestionCircle } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: FaHome, label: 'خانه', href: '/' },
    { icon: FaStethoscope, label: 'تشخیص بیماری', href: '/diagnosis' },
    { icon: FaPaw, label: 'حیوانات', href: '/animals' },
    { icon: FaFileAlt, label: 'پرونده‌ها', href: '/dashboard' },
    { icon: FaPills, label: 'داروها', href: '/medications' },
    { icon: FaComments, label: 'گفتگو', href: '/chat' },
  ];

  return (
    <aside className="w-64 bg-white border-l min-h-[calc(100vh-64px)] hidden md:block">
      <div className="p-6">
        <div className="mb-8 p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">د</span>
              </div>
              <div>
                <h3 className="font-semibold">دامپزشک مهمان</h3>
                <p className="text-sm text-gray-500">حساب آزمایشی</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-gray-500 text-sm mb-3 px-3 text-right">منو اصلی</h3>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors text-right ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span>{item.label}</span>
                    <Icon className="w-5 h-5" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t pt-6">
          <Link
            to="/settings"
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 text-gray-700 text-right"
          >
            <span>تنظیمات</span>
            <FaCog className="w-5 h-5" />
          </Link>
          <Link
            to="/help"
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 text-gray-700 text-right"
          >
            <span>راهنما و پشتیبانی</span>
            <FaQuestionCircle className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;