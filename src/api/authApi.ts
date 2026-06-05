import { API_URL, isApiAvailable } from './apiService';

// داده‌های Mock برای دمو آنلاین
const mockUsers = [
  {
    id: '1',
    email: 'test@test.com',
    password: '123456',
    name: 'کاربر تست',
    phone: '09123456789',
    address: 'تهران',
    walletBalance: 150000,
    subscription: 'free',
    subscriptionExpiry: null,
    createdAt: new Date().toISOString(),
    avatar: null
  },
  {
    id: '2',
    email: 'sara@gmail.com',
    password: '123456',
    name: 'سارا محمدی',
    phone: '09121234567',
    address: 'اصفهان',
    walletBalance: 50000,
    subscription: 'vip',
    subscriptionExpiry: '2025-01-01T00:00:00.000Z',
    createdAt: new Date().toISOString(),
    avatar: null
  }
];

// ثبت‌نام کاربر جدید
export const register = async (userData: {
  email: string;
  password: string;
  name: string;
  phone: string;
  address?: string;
}) => {
  // اگر در گیت‌هاب پیجز هستیم، از Mock استفاده کن
  if (!isApiAvailable()) {
    // بررسی ایمیل تکراری در Mock
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, error: 'این ایمیل قبلاً ثبت نام کرده است' };
    }

    // ایجاد کاربر جدید در Mock
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      walletBalance: 0,
      subscription: 'free',
      subscriptionExpiry: null,
      createdAt: new Date().toISOString(),
      avatar: null
    };
    
    // حذف رمز عبور
    const { password, ...userWithoutPassword } = newUser;
    
    // ذخیره در localStorage
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('mockUsers', JSON.stringify([...mockUsers, newUser]));
    
    return { success: true, user: userWithoutPassword };
  }

  // کد اصلی برای لوکال هاست
  try {
    const users = await fetch(`${API_URL}/users?email=${userData.email}`).then(res => res.json());
    
    if (users.length > 0) {
      return { success: false, error: 'این ایمیل قبلاً ثبت نام کرده است' };
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      walletBalance: 0,
      subscription: 'free',
      subscriptionExpiry: null,
      createdAt: new Date().toISOString(),
      avatar: null
    };

    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });

    const user = await response.json();
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    return { success: true, user: userWithoutPassword };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ورود کاربر
export const login = async (email: string, password: string) => {
  // اگر در گیت‌هاب پیجز هستیم، از Mock استفاده کن
  if (!isApiAvailable()) {
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      return { success: false, error: 'کاربر یافت نشد' };
    }
    
    if (user.password !== password) {
      return { success: false, error: 'رمز عبور اشتباه است' };
    }
    
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    return { success: true, user: userWithoutPassword };
  }

  // کد اصلی برای لوکال هاست
  try {
    const users = await fetch(`${API_URL}/users?email=${email}`).then(res => res.json());
    
    if (users.length === 0) {
      return { success: false, error: 'کاربر یافت نشد' };
    }

    const user = users[0];
    
    if (user.password !== password) {
      return { success: false, error: 'رمز عبور اشتباه است' };
    }

    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    return { success: true, user: userWithoutPassword };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// خروج از حساب
export const logout = () => {
  localStorage.removeItem('user');
  return { success: true };
};

// دریافت کاربر فعلی
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// به‌روزرسانی پروفایل کاربر
export const updateProfile = async (userId: string, data: any) => {
  // اگر در گیت‌هاب پیجز هستیم، از Mock استفاده کن
  if (!isApiAvailable()) {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return { success: false, error: 'کاربر یافت نشد' };
    
    const currentUser = JSON.parse(storedUser);
    const updatedUser = { ...currentUser, ...data };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    return { success: true, user: updatedUser };
  }

  // کد اصلی برای لوکال هاست
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const updatedUser = await response.json();
    const { password, ...userWithoutPassword } = updatedUser;
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    return { success: true, user: userWithoutPassword };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};