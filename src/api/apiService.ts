// تغییر API_URL برای دمو آنلاین
// برای اجرا روی Vercel، باید از JSON Server استفاده نکنی
// می‌توانی از Mock Data استفاده کنی

const API_URL = import.meta.env.VITE_API_URL || '';

// اگر در محیط development هستیم از localhost استفاده کن
export const getBaseUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:5000';
  }
  return ''; // در حالت production، از داده‌های mock استفاده کن
};