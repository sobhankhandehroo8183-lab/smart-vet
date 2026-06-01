const API_URL = 'http://localhost:5000';

// ثبت‌نام کاربر جدید
export const register = async (userData: {
  email: string;
  password: string;
  name: string;
  phone: string;
  address?: string;
}) => {
  try {
    // بررسی وجود ایمیل تکراری
    const users = await fetch(`${API_URL}/users?email=${userData.email}`).then(res => res.json());
    
    if (users.length > 0) {
      return { success: false, error: 'این ایمیل قبلاً ثبت نام کرده است' };
    }

    // ایجاد کاربر جدید
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
    
    // حذف رمز عبور از پاسخ
    const { password, ...userWithoutPassword } = user;
    
    // ذخیره در localStorage
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    return { success: true, user: userWithoutPassword };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ورود کاربر
export const login = async (email: string, password: string) => {
  try {
    const users = await fetch(`${API_URL}/users?email=${email}`).then(res => res.json());
    
    if (users.length === 0) {
      return { success: false, error: 'کاربر یافت نشد' };
    }

    const user = users[0];
    
    if (user.password !== password) {
      return { success: false, error: 'رمز عبور اشتباه است' };
    }

    // حذف رمز عبور از پاسخ
    const { password: _, ...userWithoutPassword } = user;
    
    // ذخیره در localStorage
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