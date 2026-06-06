import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // فقط صفحات لاگین و ثبت‌نام سایدبار نداشته باشند
  // صفحه اصلی (/) باید سایدبار داشته باشد
  const noSidebarPages = ['/login', '/register'];
  const showSidebar = !noSidebarPages.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />
      <div className="flex">
        {showSidebar && <Sidebar />}
        <main className={`flex-1 p-6 ${!showSidebar ? 'w-full' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;