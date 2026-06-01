import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login, register, logout, getCurrentUser, updateProfile } from '../api/authApi';
import { getUserAnimals } from '../api/animalsApi';
import { getWalletBalance } from '../api/paymentApi';

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address?: string;
  walletBalance: number;
  subscription: string;
  subscriptionExpiry: string | null;
  avatar: string | null;
  createdAt: string;
}

interface Animal {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  weight: number;
  gender: string;
  status: string;
  image?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  animals: Animal[];
  loginUser: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  registerUser: (data: any) => Promise<{ success: boolean; error?: string }>;
  logoutUser: () => void;
  updateUserProfile: (data: any) => Promise<{ success: boolean; error?: string }>;
  refreshUserData: () => Promise<void>;
  refreshAnimals: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  // بارگذاری اطلاعات کاربر هنگام شروع
  useEffect(() => {
    const loadUser = async () => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        await loadUserAnimals(currentUser.id);
        await loadUserBalance(currentUser.id);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  // بارگذاری حیوانات کاربر
  const loadUserAnimals = async (userId: string) => {
    const result = await getUserAnimals(userId);
    if (result.success) {
      setAnimals(result.animals);
    }
  };

  // بارگذاری موجودی کیف پول
  const loadUserBalance = async (userId: string) => {
    const result = await getWalletBalance(userId);
    if (result.success && user) {
      setUser({ ...user, walletBalance: result.balance });
    }
  };

  // رفرش اطلاعات کاربر
  const refreshUserData = async () => {
    if (user) {
      await loadUserAnimals(user.id);
      await loadUserBalance(user.id);
    }
  };

  // رفرش لیست حیوانات
  const refreshAnimals = async () => {
    if (user) {
      await loadUserAnimals(user.id);
    }
  };

  // ورود کاربر
  const loginUser = async (email: string, password: string) => {
    const result = await login(email, password);
    if (result.success && result.user) {
      setUser(result.user);
      await loadUserAnimals(result.user.id);
      await loadUserBalance(result.user.id);
    }
    return result;
  };

  // ثبت‌نام کاربر
  const registerUser = async (data: any) => {
    const result = await register(data);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  // خروج کاربر
  const logoutUser = () => {
    logout();
    setUser(null);
    setAnimals([]);
  };

  // به‌روزرسانی پروفایل
  const updateUserProfile = async (data: any) => {
    if (!user) return { success: false, error: 'کاربر یافت نشد' };
    const result = await updateProfile(user.id, data);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        animals,
        loginUser,
        registerUser,
        logoutUser,
        updateUserProfile,
        refreshUserData,
        refreshAnimals
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};