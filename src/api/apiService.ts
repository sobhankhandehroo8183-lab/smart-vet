// تشخیص محیط (محلی یا آنلاین)
const isLocalhost = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1';

// تعیین API_URL
export const API_URL = isLocalhost 
  ? 'http://localhost:5000' 
  : '';

// بررسی در دسترس بودن API
export const isApiAvailable = () => {
  return isLocalhost;
};

// تابع برای گرفتن آدرس پایه
export const getBaseUrl = () => {
  if (isLocalhost) {
    return 'http://localhost:5000';
  }
  return '';
};