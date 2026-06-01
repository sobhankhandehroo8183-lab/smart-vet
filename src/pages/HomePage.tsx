import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBrain, FaShieldAlt, FaClock, FaArrowLeft, FaStethoscope, FaHeart, FaUsers, FaAward } from 'react-icons/fa';

const HomePage: React.FC = () => {
  const features = [
    { icon: FaBrain, title: 'تشخیص هوشمند', desc: 'آنالیز علائم با الگوریتم‌های پیشرفته AI', color: 'blue', delay: 0.1 },
    { icon: FaShieldAlt, title: 'توصیه دارویی', desc: 'تجویز دقیق بر اساس تشخیص بیماری', color: 'green', delay: 0.2 },
    { icon: FaClock, title: 'پیگیری مداوم', desc: 'مدیریت پرونده و سوابق درمانی', color: 'orange', delay: 0.3 },
    { icon: FaHeart, title: 'پشتیبانی ۲۴/۷', desc: 'پاسخگویی شبانه‌روزی به سوالات شما', color: 'purple', delay: 0.4 },
  ];

  const stats = [
    { value: '۱۰,۰۰۰+', label: 'تشخیص موفق', icon: FaStethoscope },
    { value: '۵,۰۰۰+', label: 'حیوان تحت درمان', icon: FaUsers },
    { value: '۹۴%', label: 'دقت تشخیص', icon: FaAward },
    { value: '۹۹%', label: 'رضایت کاربران', icon: FaHeart },
  ];

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-l from-blue-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white text-right"
      >
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            به دستیار دامپزشکی هوشمند خوش آمدید
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            تشخیص و درمان بیماری‌های حیوانات با استفاده از هوش مصنوعی پیشرفته
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/diagnosis"
              className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all shadow-lg inline-flex items-center justify-center space-x-2 space-x-reverse"
            >
              <span>شروع تشخیص بیماری</span>
              <FaArrowLeft className="w-5 h-5" />
            </Link>
            <Link
              to="/animals"
              className="bg-white/20 backdrop-blur-sm text-white font-semibold py-3 px-8 rounded-xl hover:bg-white/30 transition-all inline-flex items-center justify-center space-x-2 space-x-reverse border border-white/30"
            >
              <span>مدیریت حیوانات</span>
              <FaUsers className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center border border-gray-200 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all group"
            >
              <div className={`p-3 bg-${feature.color}-100 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-8 h-8 text-${feature.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-l from-gray-900 to-black rounded-3xl p-8 text-white text-right"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">آماده شروع هستید؟</h2>
            <p className="text-gray-300">اولین تشخیص بیماری حیوان خود را با کمک هوش مصنوعی انجام دهید</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/diagnosis"
              className="bg-gradient-to-l from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
            >
              شروع تشخیص جدید
            </Link>
            <button className="border border-gray-600 text-gray-300 py-3 px-8 rounded-xl hover:bg-gray-800 transition-all">
              مشاهده آموزش‌ها
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;