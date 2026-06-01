import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaWallet, FaCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await updateUserProfile(formData);
    if (result.success) {
      setMessage('اطلاعات با موفقیت به‌روزرسانی شد');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('خطا در به‌روزرسانی اطلاعات');
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">لطفاً وارد حساب کاربری خود شوید</p>
        <Link to="/login" className="btn-primary mt-4 inline-block">ورود به حساب</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">پروفایل کاربری</h1>
        <p className="text-gray-600 mt-2">مدیریت اطلاعات شخصی و حساب کاربری</p>
      </div>

      {/* کارت اطلاعات کاربر */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ستون اطلاعات اصلی */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl border p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">اطلاعات شخصی</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                {isEditing ? <FaTimes className="ml-2" /> : <FaEdit className="ml-2" />}
                {isEditing ? 'انصراف' : 'ویرایش'}
              </button>
            </div>

            {message && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-xl">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="flex items-center border-b pb-3">
                  <FaUser className="w-5 h-5 text-gray-400 ml-3" />
                  <div className="flex-1">
                    <label className="block text-sm text-gray-500">نام کامل</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    ) : (
                      <p className="text-gray-800">{user.name}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center border-b pb-3">
                  <FaEnvelope className="w-5 h-5 text-gray-400 ml-3" />
                  <div className="flex-1">
                    <label className="block text-sm text-gray-500">ایمیل</label>
                    <p className="text-gray-800">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center border-b pb-3">
                  <FaPhone className="w-5 h-5 text-gray-400 ml-3" />
                  <div className="flex-1">
                    <label className="block text-sm text-gray-500">شماره موبایل</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800">{user.phone}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center border-b pb-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-gray-400 ml-3" />
                  <div className="flex-1">
                    <label className="block text-sm text-gray-500">آدرس</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800">{user.address || 'ثبت نشده'}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center border-b pb-3">
                  <FaCalendar className="w-5 h-5 text-gray-400 ml-3" />
                  <div className="flex-1">
                    <label className="block text-sm text-gray-500">تاریخ عضویت</label>
                    <p className="text-gray-800">{new Date(user.createdAt).toLocaleDateString('fa-IR')}</p>
                  </div>
                </div>
              </div>

              {isEditing && (
                <button
                  type="submit"
                  className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <FaSave />
                  <span>ذخیره تغییرات</span>
                </button>
              )}
            </form>
          </motion.div>
        </div>

        {/* ستون کیف پول و اشتراک */}
        <div className="space-y-6">
          {/* کارت کیف پول */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-green-100 text-sm">موجودی کیف پول</p>
                <p className="text-3xl font-bold">{user.walletBalance.toLocaleString()} تومان</p>
              </div>
              <FaWallet className="w-10 h-10 opacity-50" />
            </div>
            <Link
              to="/wallet"
              className="block text-center mt-4 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all"
            >
              شارژ کیف پول
            </Link>
          </motion.div>

          {/* کارت اشتراک */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border p-6"
          >
            <h3 className="font-semibold text-gray-800 mb-4">اشتراک فعلی</h3>
            <div className="mb-4">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                user.subscription === 'vip' 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {user.subscription === 'vip' ? 'VIP' : 'رایگان'}
              </span>
            </div>
            {user.subscription === 'free' && (
              <Link
                to="/subscription"
                className="block text-center py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all"
              >
                ارتقا به VIP
              </Link>
            )}
          </motion.div>

          {/* آمار سریع */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl border p-6"
          >
            <h3 className="font-semibold text-gray-800 mb-4">آمار</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">تعداد حیوانات</span>
                <span className="font-bold text-gray-800">{user.animals?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">تشخیص‌های انجام شده</span>
                <span className="font-bold text-gray-800">-</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;