import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaStethoscope, FaCalendar, FaChartLine } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const DashboardPage: React.FC = () => {
  const stats = [
    { title: 'حیوانات تحت درمان', value: '۱۲۷', icon: FaUsers, color: 'bg-blue-500', change: '+۱۲٪' },
    { title: 'تشخیص‌های موفق', value: '۸۹٪', icon: FaStethoscope, color: 'bg-green-500', change: '+۵٪' },
    { title: 'ویزیت‌های امروز', value: '۲۴', icon: FaCalendar, color: 'bg-purple-500', change: '-۲٪' },
    { title: 'میانگین بهبود', value: '۴.۲ روز', icon: FaChartLine, color: 'bg-orange-500', change: '+۸٪' },
  ];

  const chartData = [
    { month: 'فروردین', تشخیص: 42, بهبود: 38 },
    { month: 'اردیبهشت', تشخیص: 38, بهبود: 34 },
    { month: 'خرداد', تشخیص: 56, بهبود: 48 },
    { month: 'تیر', تشخیص: 47, بهبود: 42 },
    { month: 'مرداد', تشخیص: 63, بهبود: 55 },
    { month: 'شهریور', تشخیص: 52, بهبود: 47 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">داشبورد</h1>
        <p className="text-gray-600 mt-2">بررسی عملکرد کلی سیستم و آمار حیوانات</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-green-600 text-sm">{stat.change} نسبت به ماه قبل</div>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">آمار تشخیص و بهبود</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorDiagnosis" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRecovery" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
              <Tooltip />
              <Area type="monotone" dataKey="تشخیص" stroke="#3B82F6" strokeWidth={3} fill="url(#colorDiagnosis)" />
              <Area type="monotone" dataKey="بهبود" stroke="#10B981" strokeWidth={3} fill="url(#colorRecovery)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;