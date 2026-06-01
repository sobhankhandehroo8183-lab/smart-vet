import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserDiagnoses } from '../api/diagnosisApi';
import { motion } from 'framer-motion';
import { FaStethoscope, FaLock, FaUnlockAlt, FaEye, FaCalendar, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DiagnosisHistoryPage: React.FC = () => {
  const { user } = useAuth();
  const [diagnoses, setDiagnoses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDiagnoses();
    }
  }, [user]);

  const loadDiagnoses = async () => {
    if (!user) return;
    const result = await getUserDiagnoses(user.id);
    if (result.success) {
      setDiagnoses(result.diagnoses);
    }
    setLoading(false);
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
        <h1 className="text-3xl font-bold text-gray-800">تاریخچه تشخیص‌ها</h1>
        <p className="text-gray-600 mt-2">مشاهده تمام تشخیص‌های انجام شده</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      ) : diagnoses.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-xl border">
          <FaStethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">هنوز تشخیصی انجام نداده‌اید</h3>
          <p className="text-gray-600 mb-6">برای شروع تشخیص بیماری حیوان خود، روی دکمه زیر کلیک کنید</p>
          <Link to="/diagnosis" className="btn-primary inline-block">شروع تشخیص جدید</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {diagnoses.map((diagnosis, index) => (
            <motion.div
              key={diagnosis.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <FaStethoscope className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        {diagnosis.isPaid ? diagnosis.result : 'تشخیص محدود - نیاز به پرداخت'}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center">
                      <FaCalendar className="w-4 h-4 ml-1" />
                      {new Date(diagnosis.createdAt).toLocaleDateString('fa-IR')}
                    </p>
                  </div>
                  <div>
                    {diagnosis.isPaid ? (
                      <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        <FaCheckCircle className="w-4 h-4 ml-1" />
                        پرداخت شده
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                        <FaLock className="w-4 h-4 ml-1" />
                        نیاز به پرداخت
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl mb-4">
                  <p className="text-gray-700">
                    <span className="font-medium">علائم ثبت شده:</span> {diagnosis.symptoms?.join('، ')}
                  </p>
                </div>

                {diagnosis.isPaid ? (
                  <Link
                    to={`/diagnosis/${diagnosis.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <FaEye className="ml-1" />
                    مشاهده جزئیات کامل تشخیص
                  </Link>
                ) : (
                  <Link
                    to={`/payment/diagnosis/${diagnosis.id}`}
                    className="inline-flex items-center text-yellow-600 hover:text-yellow-800"
                  >
                    <FaUnlockAlt className="ml-1" />
                    پرداخت برای مشاهده تشخیص کامل ({diagnosis.price?.toLocaleString() || '49,000'} تومان)
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiagnosisHistoryPage;